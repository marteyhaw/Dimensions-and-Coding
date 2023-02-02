import { useState } from "react";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { useGetCharacterDetailsQuery } from "./store/charApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CharacterDetailsTwo(props) {
  const { active_character } = useSelector((state) => state.character);
  const { data: charDetails } = useGetCharacterDetailsQuery(active_character);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [toggleIconStyle, setToggleIconStyle] = useState({
    maxHeight: "110px",
    float: "left",
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
    if (open) {
      setToggleIconStyle({
        maxHeight: "110px",
        float: "left",
        filter: "grayscale(100%)",
      });
    } else {
      setToggleIconStyle({
        maxHeight: "110px",
        float: "left",
      });
    }
  };

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Link className="ms-5" to="#">
            <img
              onClick={toggleDrawer(anchor, true)}
              src={require("./img/char-details-icon-wborder.png")}
              alt=""
              style={toggleIconStyle}
              className="d-inline-block align-top navbar-brand"
            />
          </Link>
          <Drawer
            PaperProps={{
              sx: {
                backgroundColor: "#6c757d",
              },
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="card bg-secondary">
              <div className="card-body" style={{ width: "350px" }}>
                <ul className="list-group list-group-flush">
                  {charDetails ? (
                    <>
                      <li
                        className="h2 list-group-item bg-secondary text-white"
                        style={{ textAlign: "center" }}
                      >
                        {charDetails.character_name}
                      </li>
                      <li className="list-group-item bg-secondary">
                        <img
                          style={{
                            objectFit: "cover",
                            maxHeight: "200px",
                            maxWidth: "auto",
                          }}
                          src={require(`./img/${charDetails.img_url}`)}
                          className="img-thumbnail"
                          alt="class-img"
                        />
                      </li>
                      <li
                        className="list-group-item bg-secondary text-white"
                        style={{ textAlign: "center" }}
                      >
                        Class: {charDetails.class_id?.name}
                      </li>
                      <li
                        className="list-group-item bg-secondary text-white"
                        style={{ textAlign: "center" }}
                      >
                        Health: {charDetails.health}
                      </li>
                      <li
                        className="list-group-item bg-secondary text-white"
                        style={{ textAlign: "center" }}
                      >
                        Currency: {charDetails.currency}
                      </li>
                      <li
                        className="list-group-item bg-secondary text-white"
                        style={{ textAlign: "center" }}
                      >
                        Current Quest: {charDetails.quest_id?.name}
                      </li>
                      <li
                        className="list-group-item bg-secondary text-white"
                        style={{ textAlign: "center" }}
                      >
                        Inventory:
                      </li>
                      <div
                        className="container"
                        // style={{maxHeight:"300px", overflowY:"scroll"}}
                      >
                        <div
                          className="row"
                          style={{ marginTop: "15px", justifyContent: "start" }}
                        >
                          {charDetails.character_inventory?.map(
                            (items, index) => (
                              <div className="col-4 p-1" key={index}>
                                <div
                                  style={{
                                    textAlign: "center",
                                  }}
                                >
                                  <img
                                    style={{
                                      height: "50px",
                                      width: "50px",
                                    }}
                                    src={require(`./img/items/${items.img}`)}
                                    className="img-thumbnail"
                                    alt="class-img"
                                  />
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    "Please select a character"
                  )}
                </ul>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default CharacterDetailsTwo;
