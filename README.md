# Himanshu Singh Portfolio Website

Welcome to the official repository for my personal portfolio website! This website showcases my skills, projects, and achievements in software development, machine learning, and web technologies.


## About

This portfolio website serves as an online professional presence for Himanshu Singh. It highlights:

- My technical skills and expertise  
- Key projects and achievements  
- Contact information for professional opportunities  
- A clean, interactive, and responsive UI  
- skills in GenAI 
It is designed to be **modern, fast, and mobile-friendly**, providing visitors a smooth experience across devices.

---

## Features

- Fully **responsive design** for desktop, tablet, and mobile  
- **Interactive sections** for Skills, Projects, and About Me  
- **Project showcase** with descriptions, links, and technologies used  
- **Contact form** for reaching out directly  
- Smooth **animations and transitions** for better UX  
- A chatbot build using langGraph,langchain 

---

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, Framer Motion, Lucide React  
- **Deployment:** Vercel
- **Backend**: fastapi,langchain,langgraph for chatbot

---


## 📦 Installation & setup
### configure enviroment variables
```bash
# Frontend env setup
VITE_PUBLIC_MAIL_KEY = 
VITE_MAIL_SERVICE_ID = 
VITE_MAIL_TEMPLATE_ID = 
VITE_ASK_HIMANSHU = 

# Backend env setup 
GOOGLE_API_KEY =
TAVILY_API_KEY =

GITHUB_ACCESS_TOKEN = 
GITHUB_USERNAME =

# optional for tracking in langsmith
export LANGSMITH_TRACING=true
export LANGSMITH_ENDPOINT=
export LANGSMITH_API_KEY=
export LANGSMITH_PROJECT=

```


```bash
# Clone repo
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website

# Install dependencies
pnpm install

# Start development server
pnpm run dev

```
## 🤖 Customize Your Own AskHimanshu Bot!

AskHimanshu is an AI-powered chatbot that provides intelligent, real-time responses to user queries. Built using modern web technologies, it integrates OpenAI's GPT model for natural language understanding, making it easy to extend and personalize.

## 🧠 Architecture

![AskHimanshu Architecture](https://dragonforest.in/wp-content/uploads/2024/12/output-150x175.png)

## 🛠 How to Customize

1. **Add or Remove Tools**  
   - Open the `tools/` folder.  
   - Add new tools by writing functions and using the `@tool` decorator.  
   - Add your tool functions to the `tools` list.

2. **Configure Credentials**  
   - Open `utils/helper.py` and add your own data.

3. **Run Your Bot**  
   - Start the chatbot and it’s ready to go with your custom tools and configurations.

Now you have your own personalized AskXYZ bot up and running! 



## 👨‍💻 Author

**Himanshu Singh** - A 3rd year B.tech student at IIITU

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Himanshu0518)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/himanshu-singh23226/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:himanshu.iiitu2027@gmail.com)


