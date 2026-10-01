export const site = {
  url: "https://fantastic-portfolio-five.vercel.app",
  title: "Magnus Leu — Learn deep. Build wide.",
  description:
    "Portfolio showcasing ML/DL, Agentic AI, Quant Trading and full-stack work by Magnus Leu",
};

export const person = {
  firstName: "Tin-Yu",
  lastName: "Leu",
  name: "Magnus Leu",
  role: "ML Engineer & Agentic AI Developer",
  avatar: "/images/portfolio_img.jpeg",
  email: "lutinyu@gmail.com",
  location: "Los Angeles, CA",
  languages: ["English", "Mandarin"],
};

export const social = [
  { name: "GitHub", href: "https://github.com/rxthlessbeats" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/magnus-tinyu-lu/" },
  { name: "Email", href: "mailto:lutinyu@gmail.com" },
];

export const home = {
  headline: ["Learn deep.", "Build wide."],
  subline:
    "I'm Magnus, an ML engineer pursuing an MS in Machine Learning and Data Science at USC. Experienced in machine learning, deep learning, agentic AI, quant trading, and full-stack development.",
};

export const about = {
  title: "Introduction",
  description:
    "A USC graduate student whose work focuses on machine learning, natural language processing, and Agentic AI. Experienced in building practical AI-driven systems that combine research, software engineering, and real-world applications.",
};

export const openSource = {
  name: "Agent Cowork Memory",
  repository: "https://github.com/rxthlessbeats/agent-cowork-memory",
  summary: "Shared task memory and delegation for Codex, Claude Code, Cursor, and OpenCode. Carry context between agents and collaborate on the same project.",
};

export const jobs = [
  {
    company: "Synopsys Inc.",
    timeframe: "Jul 2026 – Aug 2026",
    role: "Agentic AI R&D Intern",
    achievements: [
      "Architected an end-to-end swarm-graph multi-agent langgraph workflow and evaluation harness for autonomously resolving 500+ real world Jira issues across 5M+ lines of production code.",
      "Achieved 1000% token cost optimization and 200% faster execution compared with a Cursor Skills-based solution.",
      "Designed Chain-of-Nudge, an agent-control strategy combining iterative guidance and state management to anti-divergence and improve 20% accuracy across 3 different benchmarks.",
      "Built a production inference serving stack for three LLMs using vLLM, managing model deployment, GPU resource allocation, and API integration on NVIDIA A100 SXM GPUs.",
    ],
  },
  {
    company: "MediaTek Inc.",
    timeframe: "Oct 2024 – Feb 2025",
    role: "Agentic AI R&D Intern",
    achievements: [
      "Researched and built an LLM-based agent system with AutoGen for robust SPICE code generation using CoT, MoE, and RAG—achieving nearly 100% accuracy vs. the prior state-of-the-art of 76.1%.",
      "Implemented an automatic agentic-workflow generation system, improving domain-specific task accuracy by 6% on average across six benchmarks.",
      "Contributed to DaVinci, a generative AI platform used by 50+ companies, by improving multi-agent communication and implementing CI/CD pipelines for reliable deployment.",
      "Integrated 5+ language models into the platform to better meet diverse user needs.",
    ],
  },
  {
    company: "Industrial Technology Research Institute",
    timeframe: "Jul 2023 – Feb 2025",
    role: "Data Scientist & AI Software Engineer",
    achievements: [
      "Achieved British Hypertension Society (BHS) Grade A using a CNN-LSTM model to predict blood pressure from ECG and PPG signals on the MIMIC database.",
      "Built a U-Net-based sleep-state detection model, improving precision in sleep-pattern analysis.",
      "Developed and deployed three React.js and Vue.js dynamic web platforms to production.",
      "Integrated AutoML pipelines to streamline machine learning deployment in research projects.",
    ],
  },
  {
    company: "National Tsing Hua University — Institute of Service Science",
    timeframe: "Aug 2023 – Oct 2024",
    role: "LLM Knowledge Management Researcher & Full Stack Developer",
    achievements: [
      "Boosted GPT-4 precision by 50% using Retrieval-Augmented Generation, Chain-of-Thought prompting, and vector databases.",
      "Developed a knowledge-management system with Langchain and AutoGen; adopted by 100+ researchers to improve cross-domain knowledge sharing.",
      "Built and deployed full-stack infrastructure with Django, SQL, RESTful APIs, and a Next.js frontend for scalable multi-agent collaborative reasoning.",
    ],
  },
  {
    company: "Deloitte",
    timeframe: "Jul 2022 – Sep 2022",
    role: "Financial Advisory Intern",
    achievements: [
      "Developed a Know Your Client (KYC) process that enhanced operational efficiency by 50% across the organization.",
      "Conducted in-depth analyses of the real estate industry to facilitate informed decision-making.",
      "Assisted managers with collecting financial data and conducting fundamental analysis of publicly traded companies.",
      "Executed 50+ KYC identification projects with precision and attention to detail.",
    ],
  },
];

export const studies = [
  {
    name: "University of Southern California",
    timeframe: "Aug 2025 – Present",
    department: "MS in Machine Learning and Data Science (ECE MLDS) · Los Angeles, CA",
    achievements: [
      "Relevant Courses: Machine Learning, Deep Learning, Linear Algebra, Probability and Statistics, Data Structures and Algorithms",
    ],
  },
  {
    name: "National Tsing Hua University",
    timeframe: "Sep 2020 – Jan 2025",
    department: "BBA in Quantitative Finance & Data Science · Hsinchu, Taiwan",
    achievements: [
      "Relevant Courses: Data Mining, Text Mining, Financial Engineering, Mathematical Statistics, Advanced Calculus",
    ],
  },
];

export const skills = [
  {
    title: "Machine learning & data science",
    description:
      "Deep learning for biomedical signals, computer vision, and predictive modeling with PyTorch and production ML workflows.",
    tags: ["Python", "PyTorch", "Computer Vision", "NLP", "C++", "R", "SQL"],
  },
  {
    title: "Agentic AI & LLM systems",
    description:
      "Multi-agent orchestration, RAG, and workflow automation for domain-specific code and knowledge management.",
    tags: ["AutoGen", "Langchain", "LLM", "RAG", "Vector DB", "Pydantic"],
  },
  {
    title: "Full-stack & MLOps",
    description:
      "End-to-end web platforms, REST APIs, containerized deployment, and CI/CD on cloud infrastructure.",
    tags: ["React.js", "Vue.js", "Next.js", "Git", "FastAPI", "Django", "Docker", "AWS", "CI/CD", "MySQL"],
  },
];
