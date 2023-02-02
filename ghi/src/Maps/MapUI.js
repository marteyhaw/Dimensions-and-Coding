import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useGetCharacterDetailsQuery } from "../store/charApi";
import { useGetTokenQuery } from "../store/authApi";

function MapMobIcon(props) {
  const iconStyle = {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    filter: "grayscale(100%)",
    top: props?.details[0],
    right: props?.details[1],
  };
  return (
    <div key={props.key} style={iconStyle}>
      {/* <div className="position-relative"> */}
      <img alt="" width={150} height={150} src={props?.details[2]} />
      {/* </div> */}
    </div>
  );
}

function EncounterMobIcon(props) {
  const iconStyle = {
    position: "absolute",

    top: props?.details?.x,
    right: props?.details?.y,
  };
  return (
    <div
      key={props?.details?.img_path}
      onClick={props.onClick}
      style={iconStyle}
      className="map-icon-bounce"
    >
      <img alt="" width={200} height={200} src={props?.details?.img_path} />
    </div>
  );
}

function MapUI() {
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
  const {
    quest1object,
    quest2object,
    quest3object,
    quest4object,
    quest5object,
    quest6object,
    quest7object,
    quest8object,
    quest9object,
  } = useSelector((state) => state.map);

  const { stored_char_details: charDetails } = useSelector(
    (state) => state.character
  );
  // const { data: charDetails } = useGetCharacterDetailsQuery(active_character);
  // const navigate = useNavigate();

  const quest_list = [
    "",
    quest1object,
    quest2object,
    quest3object,
    quest4object,
    quest5object,
    quest6object,
    quest7object,
    quest8object,
    quest9object,
  ];

  let curQuestDetails = quest_list[charDetails?.quest_id?.id];
  // const curQuestDetails = quest_list[5];

  const handleOnClick = (event) => {
    navigate("/ground-7-rule/questions");
  };

  return (
    <div
      style={{
        backgroundColor: "gray",
      }}
    >
      <div className="container position-relative">
        <img
          alt=""
          height={curQuestDetails?.map_size.h}
          width={curQuestDetails?.map_size.w}
          src={curQuestDetails?.map_path}
        />
        <EncounterMobIcon
          onClick={handleOnClick}
          details={curQuestDetails?.encounter}
        />
        {curQuestDetails?.iconsToRender.map((mob, index) => {
          return (
            <div key={index}>
              <MapMobIcon details={mob} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MapUI;
