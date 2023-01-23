import { useState, useEffect } from "react";
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';


function CharacterDetails(props) {
  const [charDetails, setCharDetails] = useState([]);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
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

  useEffect(() => {
    async function getCharDetails() {
      const url = "http://localhost:8000/inventories/31";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCharDetails(data);
        console.log(data)

      }
    }
    getCharDetails();
  }, [setCharDetails]);

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
                        src={charDetails.img_url}
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

export default CharacterDetails;
