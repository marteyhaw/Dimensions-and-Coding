import React, { useEffect } from "react";
// import { useGetCharacterDetailsQuery } from "./store/charApi";
import { useSelector } from "react-redux";
import { useGetTokenQuery } from "./store/authApi";
import { useNavigate } from "react-router-dom";

function CharacterDetailsPage(props) {
  // Start of Token and Active character check
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const navigate = useNavigate();

  const { active_character, stored_char_details: charDetails } = useSelector(
    (state) => state.character
  );
  useEffect(() => {
    if (!token && !tokenLoading) {
      navigate("/ground-7-rule/login");
    }
    if (token && !active_character) {
      navigate("/ground-7-rule/selectCharacter");
    }
  }, [token, tokenLoading, active_character, navigate]);
  // End of Token and Active character check

  // const { active_character } = useSelector((state) => state.character);
  // const { data: charDetails, isLoading: charLoading } =
  //   useGetCharacterDetailsQuery(active_character);

  return (
    <>
      {tokenLoading ? (
        "Loading..."
      ) : charDetails ? (
        <div className="row">
          <div className="offset-1 col-3 align-self-center">
            <div className="card card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item" style={{ textAlign: "center" }}>
                  {charDetails.character_name}
                </li>
                <li className="list-group-item" style={{ textAlign: "center" }}>
                  <img
                    style={{
                      height: "250px",
                      width: "250px",
                    }}
                    src={require(`./img/${charDetails.img_url}`)}
                    className="img-thumbnail"
                    alt="class-img"
                  />
                </li>
                <li className="list-group-item" style={{ textAlign: "center" }}>
                  Class: {charDetails.class_id?.name}
                </li>
                <li className="list-group-item" style={{ textAlign: "center" }}>
                  Health: {charDetails.health}
                </li>
                <li className="list-group-item" style={{ textAlign: "center" }}>
                  Currency: {charDetails.currency}
                </li>
                <li className="list-group-item" style={{ textAlign: "center" }}>
                  Current Quest: {charDetails.quest_id?.name}
                </li>
              </ul>
            </div>
          </div>
          <div className="offset-1 col-6 align-self-center">
            <div className="card card-body" style={{}}>
              <li className="list-group-item">
                <h2 style={{ textAlign: "center", margin: "25px" }}>
                  Inventory
                </h2>
              </li>
              <div className="row">
                {charDetails.character_inventory?.map((items, index) => (
                  <div className="col-3 text-center" key={index}>
                    <div className="col">
                      <div>
                        <img
                          style={{
                            height: "50px",
                            width: "50px",
                          }}
                          src={require(`./img/sword.png`)}
                          className="img-thumbnail"
                          alt="class-img"
                        />
                      </div>
                      <div>{items.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CharacterDetailsPage;
