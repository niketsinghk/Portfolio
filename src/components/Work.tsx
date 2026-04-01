import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "RAG AI Chatbot",
    category: "GenAI / RAG",
    tools: "n8n, Gemini, Qdrant, Google Drive, Webhooks",
    image: "/images/project-rag-chatbot.webp",
    link: "https://github.com/niketsinghk/Rag-Ai-ChatBot",
  },
  {
    title: "Blog Automation",
    category: "Content Workflow",
    tools: "n8n, Google Sheets, AI Content, WordPress API",
    image: "/images/project-blog-automation.webp",
    link: "https://github.com/niketsinghk/Blog-Automation",
  },
  {
    title: "Twitter Automation",
    category: "Social Automation",
    tools: "n8n, Google Sheets, AI Prompts, Posting Logic",
    image: "/images/project-twitter-automation.webp",
    link: "https://github.com/niketsinghk/Twitter-Automation",
  },
  {
    title: "LinkedIn Automation",
    category: "Publishing System",
    tools: "n8n, AI Content, Google Sheets, Scheduling",
    image: "/images/project-linkedin-automation.webp",
    link: "https://github.com/niketsinghk/Linkedin-Automation",
  },
  {
    title: "Task Reminder AI Agent",
    category: "Agentic Workflow",
    tools: "n8n, Reminders, AI Agent, Notifications",
    image: "/images/project-task-agent.webp",
    link: "https://github.com/niketsinghk/Task-Remainder--Ai--Agent",
  },
  {
    title: "YouTube Automation",
    category: "Video Publishing",
    tools: "n8n, Gemini, Google Sheets, YouTube API",
    image: "/images/project-youtube-automation.webp",
    link: "https://github.com/niketsinghk/Youtube-Automation",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.title}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{String(index + 1).padStart(2, "0")}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
