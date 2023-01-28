import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetQuestionAnswerMutation } from "../store/quesApi";
import { useGetCharacterDetailsQuery } from "../store/charApi";
import { updateField } from "../store/charSlice";

export default function QuestionContent(props) {
  const { active_character } = useSelector((state) => state.character);
  const {
    data: character_details,
    refetch: refetchCharDetails,
    isSuccess,
  } = useGetCharacterDetailsQuery(active_character);
  const [getQuestionAnswer] = useGetQuestionAnswerMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [answerOption, setAnswerOption] = useState("");
  const [showAlert, setShowAlert] = useState(null);
  const [hideQuestion, setHideQuestion] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAnswerRight = await getQuestionAnswer({
      quest_id: props.quest_id,
      character_id: active_character,
      char_answer: answerOption,
    });
    if (isAnswerRight.data) {
      if (props.quest_id === 9) {
        navigate("/ground-7-rule/victory");
      }
      refetchCharDetails();
      setHideQuestion(true);
      setShowAlert(true);
      setTimeout(async () => {
        setShowAlert(null);
      }, 2000);
    } else {
      refetchCharDetails();
      setShowAlert(false);
      setTimeout(() => {
        setShowAlert(null);
      }, 2000);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        updateField({ field: "stored_char_details", value: character_details })
      );
      if (showAlert) {
        setTimeout(() => {
          navigate("/ground-7-rule/map");
        }, 2500);
      }
    }
  }, [
    refetchCharDetails,
    character_details,
    dispatch,
    isSuccess,
    navigate,
    showAlert,
    hideQuestion,
    props.quest_id,
  ]);

  return (
    <FormControl>
      {hideQuestion !== true ? (
        <div>
          <FormLabel id="demo-radio-buttons-group-label">
            {props?.currentQuestion?.question}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            onChange={(e) => setAnswerOption(e.target.value)}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label={props?.currentQuestion?.option_1}
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label={props?.currentQuestion?.option_2}
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label={props?.currentQuestion?.option_3}
            />
          </RadioGroup>
          <Button
            variant="contained"
            color="success"
            disabled={!props?.currentQuestion?.question}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <Stack sx={{ width: "100%" }} spacing={2}>
              {showAlert === false && (
                <Alert
                  variant="outlined"
                  severity="error"
                  sx={{ display: "all" }}
                >
                  You picked the wrong answer and sustained 1 damage to your HP.
                </Alert>
              )}
              {showAlert === true && (
                <Alert
                  variant="outlined"
                  severity="success"
                  sx={{ display: "all" }}
                >
                  Success! You are one step closer to graduation! You've been
                  awarded 1 coin.
                </Alert>
              )}
            </Stack>
          </div>
        </div>
      ) : (
        <Alert variant="outlined" severity="success" sx={{ display: "all" }}>
          Success! You are one step closer to graduation! You've been awarded 1
          coin.
        </Alert>
      )}
    </FormControl>
  );
}
