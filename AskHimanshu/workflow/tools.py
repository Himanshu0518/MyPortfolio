from langchain_core.tools import tool
import requests
import base64
from dotenv import load_dotenv
import os 
from utils.helper import work_experience, achievements
from langchain_tavily import TavilySearch
load_dotenv()

USERNAME = os.getenv("GITHUB_USERNAME")
GITHUB_ACCESS_TOKEN = os.getenv("GITHUB_ACCESS_TOKEN")

HEADERS = {
    "Accept": "application/vnd.github+json"
}

@tool("fetch_repos")
def fetch_repos() -> list:
    """
    Fetch all GitHub repos with details, links, and topics.
    Call this when the user asks about projects, repos, or code.
    """
    repos_url = "https://api.github.com/user/repos"
    repos_response = requests.get(
        repos_url, auth=(USERNAME, GITHUB_ACCESS_TOKEN), headers=HEADERS
    )

    if repos_response.status_code != 200:
        return {"error": f"Failed to fetch repos: {repos_response.text}"}

    response = repos_response.json()
    details = []
    for repo in response:
        details.append({
            "repo_name": repo.get("name"),
            "repo_url": repo.get("html_url"),
            "repo_description": repo.get("description"),
            "demo_link": repo.get("homepage"),
            "topics": repo.get("topics", [])
        })
    return {"repos": details}


@tool("fetch_skills_and_education")
def fetch_skills_and_education() -> dict:
    """
    Fetch Introduction
    Fetch GitHub profile README (skills, education, tech stack, summary).
    Call this when the user asks about skills, education, tech stack, or background.
    """
    readme_url = f"https://api.github.com/repos/{USERNAME}/{USERNAME}/readme"
    
    try:
        response = requests.get(readme_url, auth=(USERNAME, GITHUB_ACCESS_TOKEN), headers=HEADERS)
        
        if response.status_code != 200:
            return {"error": f"Failed to fetch README: {response.text}"}
        
        data = response.json()
        readme_content = base64.b64decode(data["content"]).decode("utf-8")
        
        return {"readme": readme_content}
    except Exception as e:
        return {"error": f"Error fetching skills: {str(e)}"}

@tool("fetch_work_experience")
def fetch_work_experience() -> dict:
    """
    Fetch work experience
    Call this when the user asks about work experience.
    """
    return {"work_experience": work_experience}

@tool("fetch_acheivements")
def fetch_acheivements() -> dict:
    """
   Fetch acheivements 
    Call this when the user asks about acheivements.
    """
    return {"acheivements": achievements}

search_tool =  TavilySearch()

tools = [fetch_repos, fetch_skills_and_education, fetch_work_experience,fetch_acheivements,search_tool ]
