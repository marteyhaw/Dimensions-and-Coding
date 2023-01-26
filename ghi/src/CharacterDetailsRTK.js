import { useState, useEffect } from "react";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useGetCharacterDetailsQuery } from "./store/charApi";
import { useSelector } from "react-redux";

function CharacterDetailsTwo(props) {
  const { token } = props;
  const { active_character } = useSelector((state) => state.character);
  const { data: charDetails } = useGetCharacterDetailsQuery(active_character);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    console.log(token);
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant="contained" onClick={toggleDrawer(anchor, true)}>
            Character Details
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="card card-body" style={{ width: "300px" }}>
              <ul className="list-group list-group-flush">
                {charDetails ? (
                  <>
                    <li
                      className="list-group-item"
                      style={{ textAlign: "center" }}
                    >
                      {charDetails.character_name}
                    </li>
                    <li className="list-group-item">
                      <img
                        style={{
                          height: "200px",
                          width: "300px",
                        }}
                        src={require(`./img/${charDetails.img_url}`)}
                        className="img-thumbnail"
                        alt="class-img"
                      />
                    </li>
                    <li
                      className="list-group-item"
                      style={{ textAlign: "center" }}
                    >
                      Class: {charDetails.class_id?.name}
                    </li>
                    <li
                      className="list-group-item"
                      style={{ textAlign: "center" }}
                    >
                      Health: {charDetails.health}
                    </li>
                    <li
                      className="list-group-item"
                      style={{ textAlign: "center" }}
                    >
                      Currency: {charDetails.currency}
                    </li>
                    <li
                      className="list-group-item"
                      style={{ textAlign: "center" }}
                    >
                      Current Quest: {charDetails.quest_id?.name}
                    </li>
                    <li
                      className="list-group-item"
                      style={{ textAlign: "center" }}
                    >
                      Inventory:
                    </li>
                    {charDetails.character_inventory?.map((items, index) => (
                      <div className="text-center" key={index}>
                        {items.name}
                      </div>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default CharacterDetailsTwo;
