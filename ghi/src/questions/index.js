import QuestionContent from "./QuestionContent";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function QuestionsDetails() {
  const { stored_char_details } = useSelector((state) => state.character);
  const mod_list = [0, 1, 1, 1, 2, 2, 2, 3, 3, 3];

  return (
    <div className="row">
      <div className="offset-1 col-10">
        <div className="shadow p-4 mt-4">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                {/* <CharacterDetailsTwo/> */}
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  align="center"
                >
                  MOD {mod_list[stored_char_details.quest_id.id]} - Question{" "}
                  {stored_char_details.quest_id.id}
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <div className="row">
            <div className="offset-1 col-10">
              <div className="shadow p-4 mt-4">
                <Box>
                  <Typography variant="subtitle2" gutterBottom align="right">
                    <i>
                      "{stored_char_details.quest_id.instructor.quote}"-{" "}
                      {stored_char_details.quest_id.instructor.name}
                    </i>
                  </Typography>
                </Box>
                <QuestionContent
                  quest_id={stored_char_details.quest_id.id}
                  currentQuestion={stored_char_details.quest_id.questions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
