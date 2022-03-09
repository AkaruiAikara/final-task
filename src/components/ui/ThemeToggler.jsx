import { useContext, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import toggledata from "../../assets/json/theme-toggle.json";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggler() {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleRef = useRef(null);
  toggleRef.current?.setSpeed(3);
  useEffect(() => {
    if (theme && theme === "dark") {
      toggleRef.current.playSegments([1, 90], true);
    }
  }, []); // eslint-disable-line
  // handle theme toggle
  const handleToggle = () => {
    // play lottie animation
    toggleRef.current.playSegments(
      theme === "light" ? [1, 90] : [91, 180],
      true
    );
    // toggle theme
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <Lottie
      lottieRef={toggleRef}
      animationData={toggledata}
      autoplay={false}
      loop={false}
      className="h-30 cursor-pointer"
      onClick={() => handleToggle()}
    />
  );
}
