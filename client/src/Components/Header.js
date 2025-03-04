import { useNavigate } from "react-router-dom"; 

const Header = () => {
  const navigate = useNavigate(); 

  const navig = () => {
    navigate("/home"); 
  };

  return (
    <header className="hero-section">
      <div className="video-container">
        <video autoPlay muted loop className="bg-video">
          <source src="/video/perform.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="hero-content">
        <button className="fit-button" onClick={navig}>
          Welcome To Peak Perform
        </button>
      </div>
    </header>
  );
};

export default Header;
