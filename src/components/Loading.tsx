import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/loadingContext";
import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent < 100 || loaded) {
      return;
    }

    const loadedTimeout = window.setTimeout(() => {
      setLoaded(true);
      const isLoadedTimeout = window.setTimeout(() => {
        setIsLoaded(true);
      }, 1000);

      return () => clearTimeout(isLoadedTimeout);
    }, 600);

    return () => clearTimeout(loadedTimeout);
  }, [loaded, percent, setIsLoading]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    let cancelled = false;
    setClicked(true);

    const animationTimeout = window.setTimeout(async () => {
      try {
        const module = await import("./utils/initialFX");

        if (cancelled) {
          return;
        }

        module.initialFX?.();
      } catch (error) {
        console.error("Initial animation failed:", error);
        document.body.style.overflowY = "auto";
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 900);

    return () => {
      cancelled = true;
      clearTimeout(animationTimeout);
    };
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          Niket
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> AI Automation Executive</span> <span>Workflow Builder</span>
            <span> RAG Chatbot Developer</span> <span>n8n Automation</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={handleMouseMove}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
