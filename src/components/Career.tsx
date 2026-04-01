import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in AI & Data Science</h4>
                <h5>Arya College of Engineering and IT</h5>
              </div>
              <h3>2021-25</h3>
            </div>
            <p>
              Built a strong foundation in machine learning, NLP, Python, and
              applied AI while graduating with a CGPA of 8.33.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science Intern</h4>
                <h5>Celebal Technologies</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Developed a salary prediction model using Python and
              scikit-learn, improving accuracy through preprocessing,
              evaluation, and model tuning.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI & Automation Executive</h4>
                <h5>HCA Automation Affordable</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building AI chatbots, Google API integrations, and agentic n8n
              workflows to automate processes, improve response handling, and
              deliver practical business value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
