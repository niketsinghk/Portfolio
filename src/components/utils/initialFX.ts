import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { getSmoother } from "./smoother";

const revealFallback = () => {
  gsap.set(
    [
      ".landing-info h3",
      ".landing-intro h2",
      ".landing-intro h1",
      ".landing-info h2",
      ".landing-info-h2",
      ".header",
      ".icons-section",
      ".nav-fade",
    ],
    { opacity: 1, y: 0, clearProps: "transform,filter" }
  );
};

export function initialFX() {
  document.body.style.overflowY = "auto";
  getSmoother()?.paused(false);
  document.getElementsByTagName("main")[0]?.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  try {
    const landingText = new SplitText(
      [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
      {
        type: "chars,lines",
        linesClass: "split-line",
      }
    );

    gsap.fromTo(
      landingText.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );

    const textProps = { type: "chars,lines", linesClass: "split-h2" };

    const landingText2 = new SplitText(".landing-h2-info", textProps);
    gsap.fromTo(
      landingText2.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".landing-info-h2",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        y: 0,
        delay: 0.8,
      }
    );
    gsap.fromTo(
      [".header", ".icons-section", ".nav-fade"],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 0.1,
      }
    );

    const landingText3 = new SplitText(".landing-h2-info-1", textProps);
    const landingText4 = new SplitText(".landing-h2-1", textProps);
    const landingText5 = new SplitText(".landing-h2-2", textProps);

    loopText(landingText2, landingText3);
    loopText(landingText4, landingText5);
  } catch (error) {
    console.error("Landing text animation failed:", error);
    revealFallback();
  }
}

function loopText(text1: SplitText, text2: SplitText) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay,
    },
    0
  )
    .fromTo(
      text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay,
      },
      0
    )
    .to(
      text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
