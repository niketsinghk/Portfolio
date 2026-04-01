import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { setSmoother } from "./utils/smoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    const smoothInstance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    setSmoother(smoothInstance);
    smoothInstance.scrollTop(0);
    smoothInstance.paused(true);

    const links = Array.from(document.querySelectorAll(".header ul a"));
    const clickHandlers = links.map((elem) => {
      const handler = (e: Event) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section = target.getAttribute("data-href");
          smoothInstance.scrollTo(section, true, "top top");
        }
      };

      elem.addEventListener("click", handler);
      return { elem, handler };
    });

    const onResize = () => {
      ScrollSmoother.refresh(true);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clickHandlers.forEach(({ elem, handler }) => {
        elem.removeEventListener("click", handler);
      });
      window.removeEventListener("resize", onResize);
      smoothInstance.kill();
      setSmoother(null);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Niket
        </a>
        <a
          href="mailto:nikksingh73@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          nikksingh73@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
