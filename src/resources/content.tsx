import { About, Home, Newsletter, Person, Projects, Publications, Social, Work } from "@/types";
import { Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Tin-Yu",
  lastName: "Leu",
  name: "Magnus Leu",
  role: "ML Engineer & Agentic AI Developer",
  avatar: "/images/portfolio_img.jpeg",
  email: "lutinyu@gmail.com",
  location: "Los Angeles, CA",
  languages: ["English", "Mandarin"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates on ML, agentic AI, and engineering projects</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/rxthlessbeats",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/magnus-tinyu-lu/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/thumbnail.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio showcasing ML, agentic AI, and full-stack work by ${person.name}`,
  headline: <>Building intelligent systems with ML and agentic AI</>,
  featured: {
    display: true,
    title: (
      <Row gap="8" vertical="center">
        <strong className="ml-4">MenTeR</strong>
        <Text marginRight="4" onBackground="brand-medium">
          IEEE ICLAD 2025
        </Text>
      </Row>
    ),
    href: "/publications/menter-rf-analog-multi-agent-netlist-design",
  },
  subline: (
    <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
      I'm Magnus, an ML engineer pursuing an MS in Machine Learning and Data Science at{" "}
      <Text as="span" size="xl" weight="strong">
        USC
      </Text>
      . I build machine learning and deep learning models, LLM agent systems and production full-stack platforms.
    </Text>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in Los Angeles`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        A USC graduate student whose work focuses on applying machine learning and deep learning 
        to computer vision, natural language processing, and quantitative trading. 
        I have also worked on multi-agent LLM workflows and RAG systems, 
        and I am interested in building practical AI-driven systems that combine research, 
        software engineering, and real-world applications.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "MediaTek Inc.",
        timeframe: "Oct 2024 – Feb 2025",
        role: "LLM-Based Agentic System Developer",
        achievements: [
          <>
            Researched and built an LLM-based agent system with AutoGen for robust SPICE code
            generation using CoT, MoE, and RAG—achieving nearly 100% accuracy vs. the prior
            state-of-the-art of 76.1%.
          </>,
          <>
            Implemented an automatic agentic-workflow generation system, improving domain-specific
            task accuracy by 6% on average across six benchmarks.
          </>,
          <>
            Contributed to DaVinci, a generative AI platform used by 50+ companies, by improving
            multi-agent communication and implementing CI/CD pipelines for reliable deployment.
          </>,
          <>
            Integrated 5+ language models into the platform to better meet diverse user needs.
          </>,
        ],
        images: [],
      },
      {
        company: "Industrial Technology Research Institute",
        timeframe: "Jul 2023 – Feb 2025",
        role: "Data Scientist & AI Software Engineer",
        achievements: [
          <>
            Achieved British Hypertension Society (BHS) Grade A using a CNN-LSTM model to predict
            blood pressure from ECG and PPG signals on the MIMIC database.
          </>,
          <>
            Built a U-Net-based sleep-state detection model, improving precision in sleep-pattern
            analysis.
          </>,
          <>
            Developed and deployed three React.js and Vue.js dynamic web platforms to production.
          </>,
          <>
            Integrated AutoML pipelines to streamline machine learning deployment in research
            projects.
          </>,
        ],
        images: [],
      },
      {
        company: "National Tsing Hua University — Institute of Service Science",
        timeframe: "Aug 2023 – Oct 2024",
        role: "LLM Knowledge Management Researcher & Full Stack Developer",
        achievements: [
          <>
            Boosted GPT-4 precision by 50% using Retrieval-Augmented Generation, Chain-of-Thought
            prompting, and vector databases.
          </>,
          <>
            Developed a knowledge-management system with Langchain and AutoGen; adopted by 100+
            researchers to improve cross-domain knowledge sharing.
          </>,
          <>
            Built and deployed full-stack infrastructure with Django, SQL, RESTful APIs, and a
            Next.js frontend for scalable multi-agent collaborative reasoning.
          </>,
        ],
        images: [],
      },
      {
        company: "Deloitte",
        timeframe: "Jul 2022 – Sep 2022",
        role: "Financial Advisory Intern",
        achievements: [
          <>
            Developed a Know Your Client (KYC) process that enhanced operational efficiency by 50%
            across the organization.
          </>,
          <>
            Conducted in-depth analyses of the real estate industry to facilitate informed
            decision-making.
          </>,
          <>
            Assisted managers with collecting financial data and conducting fundamental analysis of
            publicly traded companies.
          </>,
          <>
            Executed 50+ KYC identification projects with precision and attention to detail.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "University of Southern California",
        timeframe: "Aug 2025 – Present",
        department: "MS in Machine Learning and Data Science (ECE MLDS) · Los Angeles, CA",
        achievements: [
          <>Relevant Courses: Machine Learning, Deep Learning, Linear Algebra, Probability and Statistics, Data Structures and Algorithms</>,
        ],
      },
      {
        name: "National Tsing Hua University",
        timeframe: "Sep 2020 – Jan 2025",
        department: "BBA in Quantitative Finance & Data Science · Hsinchu, Taiwan",
        achievements: [
          <>Relevant Courses: Data Mining, Text Mining, Financial Engineering, Mathematical Statistics, Advanced Calculus</>,
        ],
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Machine learning & data science",
        description: (
          <>
            Deep learning for biomedical signals, computer vision, and predictive modeling with
            PyTorch and production ML workflows.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "PyTorch", icon: "pytorch" },
          { name: "Computer Vision", icon: "opencv" },
          { name: "NLP", icon: "huggingface" },
          { name: "C++", icon: "cplusplus" },
          { name: "R", icon: "r" },
          { name: "SQL", icon: "postgresql" },
        ],
        images: [],
      },
      {
        title: "Agentic AI & LLM systems",
        description: (
          <>
            Multi-agent orchestration, RAG, and workflow automation for domain-specific code and
            knowledge management.
          </>
        ),
        tags: [
          { name: "AutoGen", icon: "rocket" },
          { name: "Langchain", icon: "langchain" },
          { name: "LLM", icon: "openai" },
          { name: "RAG", icon: "elasticsearch" },
          { name: "Vector DB", icon: "milvus" },
          { name: "Pydantic", icon: "pydantic" },
        ],
        images: [],
      },
      {
        title: "Full-stack & MLOps",
        description: (
          <>
            End-to-end web platforms, REST APIs, containerized deployment, and CI/CD on cloud
            infrastructure.
          </>
        ),
        tags: [
          { name: "React.js", icon: "react" },
          { name: "Vue.js", icon: "vue" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Git", icon: "git" },
          { name: "FastAPI", icon: "fastapi" },
          { name: "Django", icon: "django" },
          { name: "Docker", icon: "docker" },
          { name: "AWS", icon: "amazonwebservices" },
          { name: "CI/CD", icon: "githubactions" },
          { name: "MySQL", icon: "mysql" },
        ],
        images: [],
      },
    ],
  },
};

const projects: Projects = {
  path: "/projects",
  label: "Projects",
  title: `Latest projects by ${person.name}`,
  description: `ML, agentic AI, and engineering projects by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Websites",
  title: `Websites by ${person.name}`,
  description: `ML, agentic AI, and software projects by ${person.name}`,
};

const publications: Publications = {
  path: "/publications",
  label: "Publications",
  title: `Publications by ${person.name}`,
  description: `Research papers and write-ups by ${person.name}`,
};

export { person, social, newsletter, home, about, projects, publications, work };
