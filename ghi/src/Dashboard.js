import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashBoard(props) {
  const navigate = useNavigate();

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
                    navigate("/characterDetails");
                  }}
                  className="btn btn-dark me-4"
                >
                  Character Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/provider/update");
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
                navigate("/provider/update");
              }}
              className="btn btn-dark me-4"
            >
              Inventory
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/provider/update");
              }}
              className="btn btn-dark me-4"
            >
              Quest
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
