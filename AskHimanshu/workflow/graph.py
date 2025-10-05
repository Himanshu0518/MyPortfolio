from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage, SystemMessage
from typing import TypedDict, List, Annotated
import operator
import sqlite3

from .tools import tools
from utils.prompt import SYSTEM_PROMPT
from langgraph.checkpoint.sqlite import SqliteSaver

load_dotenv()

# Define chat state
class ChatState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    skills_cached: bool  # For caching GitHub skills (avoid refetch)

# SQLite checkpointer for persistence
sqlite_conn = sqlite3.connect("checkpoint.sqlite", check_same_thread=False)
memory = SqliteSaver(sqlite_conn)

# Setup LLM
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")
llm_with_tools = llm.bind_tools(tools=tools)

# Decide next step
def tool_router(state: ChatState):
    last_message = state["messages"][-1]
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"
    return "end"


# Chat node
def chat_node(state: ChatState):
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}

# Tool node
tool_node = ToolNode(tools=tools)

# Build graph
workflow = StateGraph(ChatState)

workflow.add_node("agent", chat_node)
workflow.add_node("tools", tool_node)

workflow.add_conditional_edges(
    "agent",
    tool_router,
    {
        "tools": "tools",
        "end": END,
    }
)

workflow.add_edge("tools", "agent")

workflow.set_entry_point("agent")

# ---- Runner function ----
def run_workflow(user_input: str, id: str):
    app = workflow.compile(checkpointer=memory)

    config = {"configurable": {"thread_id": id}}

    # Check if there’s already state stored for this conversation
    previous_state = app.get_state(config)

    if not previous_state:
        # First turn → inject system prompt
        state = {
            "messages": [
                SystemMessage(content=SYSTEM_PROMPT),
                HumanMessage(content=user_input),
            ]
        }
    else:
        # Continuing conversation → only add new message
        state = {
            "messages": [HumanMessage(content=user_input)]
        }

    result = app.invoke(state, config=config)
    return result
