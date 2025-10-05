# workflow/graph.py
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage, SystemMessage
from typing import TypedDict, List, Annotated
import operator
import aiosqlite

from .tools import tools
from utils.prompt import SYSTEM_PROMPT
from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver

load_dotenv()

# Define chat state
class ChatState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    skills_cached: bool

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

# Global memory instance - initialized at startup
_db_connection = None
_memory_instance = None

async def get_checkpointer():
    """Get or create the async checkpointer"""
    global _db_connection, _memory_instance
    
    if _memory_instance is None:
        # Create aiosqlite connection
        _db_connection = await aiosqlite.connect("checkpoint.sqlite", check_same_thread=False)
        # Create memory instance with the connection
        _memory_instance = AsyncSqliteSaver(_db_connection)
        # Setup database tables
        await _memory_instance.setup()
    
    return _memory_instance

# ---- Streaming Runner function ----
async def run_workflow_stream(user_input: str, id: str):
    """Stream the workflow execution"""
    # Get checkpointer instance
    mem = await get_checkpointer()
    
    app = workflow.compile(checkpointer=mem)
    
    config = {"configurable": {"thread_id": id}}

    # Check if there's already state stored for this conversation
    previous_state = await app.aget_state(config)

    if not previous_state or not previous_state.values:
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

    # Stream the workflow
    async for event in app.astream(state, config=config, stream_mode="values"):
        # Get the last message in the current state
        if "messages" in event and len(event["messages"]) > 0:
            last_message = event["messages"][-1]
            
            if isinstance(last_message, AIMessage):
                yield last_message.content

