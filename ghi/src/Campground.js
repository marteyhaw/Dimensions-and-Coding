import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetTokenQuery } from "./store/authApi";

export default function Campground(props) {
  // Start of Token and Active character check
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const navigate = useNavigate();

  const { active_character } = useSelector((state) => state.character);
  useEffect(() => {
    if (!token && !tokenLoading) {
      navigate("/ground-7-rule/login");
    }
    if (token && !active_character) {
      navigate("/ground-7-rule/selectCharacter");
    }
  }, [token, tokenLoading, active_character, navigate]);
  // End of Token and Active character check

  return (
    <>
      <div className="snow_wrap">
        <div className="snow">
          <div className="container no-hover  text-center">
            <div
              style={{ width: "650px" }}
              className="row border no-hover Campground  border-secondary border-3 justify-content-center p-2 mt-4 rounded mx-auto text-muted"
            >
              <div style={{}} className="col  no-hover">
                <h1 className=""> </h1>
              </div>
            </div>
          </div>

          <div className="container text-center">
            <div className="row justify-content-center p-2 mt-4 mb-4 mx-auto">
              <div style={{}} className="col">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/ground-7-rule/map");
                  }}
                  className="btn btn-dark me-4"
                >
                  Map
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/ground-7-rule/selectCharacter");
                  }}
                  className="btn btn-dark me-4"
                >
                  Select Character
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                navigate("/ground-7-rule/characterDetails");
              }}
              className="btn btn-dark me-4"
            >
              Inventory
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/ground-7-rule/shop");
              }}
              className="btn btn-dark me-4"
            >
              Shop
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
