import QuestionContent from "./QuestionContent";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useGetTokenQuery } from "../store/authApi";
import { useNavigate } from "react-router-dom";
import FireAnimation from "../FireAnimation";

export default function QuestionsDetails() {
  const [hideQuestion, setHideQuestion] = useState(false);
  // Start of Token and Active character check
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const navigate = useNavigate();

  const { active_character, stored_char_details } = useSelector(
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

  // const { stored_char_details } = useSelector((state) => state.character);
  const mod_list = [0, 1, 1, 1, 2, 2, 2, 3, 3, 3];

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

  // curQuestDetails?.encounter;

  return (
    <div
      style={{
        backgroundColor: "#323232",
        minHeight: "850px",
        // backgroundImage: `url(${curQuestDetails?.map_path})`,
        // backgroundSize: "cover",
        // height: "850px",
        // backgroundRepeat: "no-repeat",
        // objectFit: "cover",
        // backgroundSize: "cover",
      }}
    >
      {!hideQuestion ? (
        <div
          style={{
            margin: "auto",
            width: "50%",
            padding: "10px",
          }}
        >
          <img
            alt=""
            src={curQuestDetails?.encounter?.img_path}
            style={{
              width: "none",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: "2rem",
              maxHeight: "500px",
            }}
            className="monster-icon-breathing"
          />
          <FireAnimation />
        </div>
      ) : (
        ""
      )}

      <div className="row" style={{ marginRight: "0" }}>
        <div className="offset-1 col-10" style={{ zIndex: "2" }}>
          <div
            className="shadow p-4 mt-4 text-white"
            style={{ backgroundColor: "#424242" }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static" color="warning">
                <Toolbar>
                  {/* <CharacterDetailsTwo/> */}
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: "bold" }}
                    align="center"
                  >
                    {!hideQuestion
                      ? `MOD ${
                          mod_list[stored_char_details?.quest_id?.id]
                        } - Question${" "}
                  ${stored_char_details?.quest_id?.id}`
                      : "MONSTER DEFEATED"}
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
            <div className="row">
              <div className="offset-1 col-10">
                <div
                  className="shadow p-4 mt-4"
                  style={{ backgroundColor: "darkgrey" }}
                >
                  <Box>
                    <Typography variant="subtitle2" gutterBottom align="right">
                      <i>
                        "{stored_char_details?.quest_id?.instructor.quote}"-{" "}
                        {stored_char_details?.quest_id?.instructor.name}
                      </i>
                    </Typography>
                  </Box>
                  <QuestionContent
                    quest_id={stored_char_details?.quest_id?.id}
                    currentQuestion={stored_char_details?.quest_id?.questions}
                    hideQuestion={hideQuestion}
                    setHideQuestion={setHideQuestion}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
