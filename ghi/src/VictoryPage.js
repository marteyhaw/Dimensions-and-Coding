import React from "react";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "./store/authApi";
import { useSelector } from "react-redux";

export default function VictoryPage() {
  // Start of Token and Active character check
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const navigate = useNavigate();

  const { stored_char_details } = useSelector((state) => state.character);
  useEffect(() => {
    if (!token && !tokenLoading) {
      navigate("/ground-7-rule/login");
    }
    if (token && stored_char_details?.quest_id?.id !== 9) {
      navigate("/ground-7-rule/selectCharacter");
    }
  }, [token, tokenLoading, stored_char_details?.quest_id?.id, navigate]);
  // End of Token and Active character check

  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      window.addEventListener("resize", resizeHandler);
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, []);
    const resizeHandler = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    return windowSize;
  };

  const attemptSubmit = async (e) => {
    e.preventDefault();
    navigate("/ground-7-rule/selectCharacter");
  };

  const { width, height } = useWindowSize();
  return (
    <div className="victory-page-bg">
      <Confetti width={width} height={height} />
      <div>
        <h1
          className="display-1 form-bg"
          style={{ color: "white", paddingTop: "40px", textAlign: "center" }}
        >
          Victory!!!
        </h1>
      </div>
      <footer style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <button
          onClick={(e) => attemptSubmit(e)}
          align="center"
          className="btn btn-primary  btn-lg btn-block position-absolute bottom-0 end-0"
        >
          Play Again!
        </button>
      </footer>
    </div>
  );
}
