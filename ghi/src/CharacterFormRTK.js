import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateCharacterMutation } from "./store/charApi";
import { updateField } from "./store/charSlice";
import { useNavigate } from "react-router-dom";
import Notification from "./Notifications";
import { useGetTokenQuery } from "./store/authApi";
import { blue } from "@mui/material/colors";

function RadioButtonsGroup(props) {
  const dispatch = useDispatch();
  const { class_id } = useSelector((state) => state.character);
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  return (
    <FormControl>
      <FormLabel
        className="text-white"
        id="demo-radio-buttons-group-label"
        style={{ textAlign: "center" }}
      >
        Choose a Class
      </FormLabel>
      <RadioGroup
        onChange={field}
        value={class_id}
        aria-labelledby="demo-radio-buttons-group-label"
        name="class_id"
        // name="radio-buttons-group"
      >
        <div className="row row-cols-3 align-items-center">
          <div className="col-2" align="center">
            <FormControlLabel
              className="text-white"
              onClick={field}
              value="1"
              name="class_id"
              control={
                <Radio
                  sx={{
                    color: blue[800],
                    "&.Mui-checked": {
                      color: blue[600],
                    },
                  }}
                />
              }
              label="Dog"
            />
          </div>
          <div className="col-4">
            <img
              className="img-thumbnail"
              src={require("./img/Dog.JPG")}
              style={{
                height: "200px",
                width: "300px",
                marginBottom: "10px",
                marginRight: "10px",
              }}
              alt="Dog"
            />
          </div>
          <div className="col-4">
            <img
              className="img-thumbnail"
              src={require("./img/Rabbit.JPG")}
              style={{
                height: "200px",
                width: "300px",
                marginBottom: "10px",
                marginLeft: "10px",
              }}
              alt="Rabbit"
            />
          </div>
          <div className="col-2" align="center">
            <FormControlLabel
              className="text-white"
              onClick={field}
              value="2"
              name="class_id"
              control={
                <Radio
                  sx={{
                    color: blue[800],
                    "&.Mui-checked": {
                      color: blue[600],
                    },
                  }}
                />
              }
              label="Rabbit"
              labelPlacement="start"
            />
          </div>
        </div>
        <div className="row row-cols-3 align-items-center">
          <div className="col-2" align="center">
            <FormControlLabel
              className="text-white"
              onClick={field}
              value="3"
              name="class_id"
              control={
                <Radio
                  sx={{
                    color: blue[800],
                    "&.Mui-checked": {
                      color: blue[600],
                    },
                  }}
                />
              }
              label="Owl"
            />
          </div>
          <div className="col-4">
            <img
              className="img-thumbnail"
              src={require("./img/Owl.JPG")}
              style={{
                height: "200px",
                width: "300px",
                marginRight: "10px",
              }}
              alt="Owl"
            />
          </div>
          <div className="col-4" align="center">
            <img
              className="img-thumbnail"
              src={require("./img/Penguin.JPG")}
              style={{
                height: "200px",
                width: "300px",
                marginLeft: "10px",
              }}
              alt="Penguin"
            />
          </div>
          <div className="col-2">
            <FormControlLabel
              className="text-white"
              onClick={field}
              value="4"
              name="class_id"
              control={
                <Radio
                  sx={{
                    color: blue[800],
                    "&.Mui-checked": {
                      color: blue[600],
                    },
                  }}
                />
              }
              label="Penguin"
              labelPlacement="start"
            />
          </div>
        </div>
      </RadioGroup>
    </FormControl>
  );
}

function CharacterForm(props) {
  // Start of Token and Active character check
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const navigate = useNavigate();

  const { active_character } = useSelector((state) => state.character);
  useEffect(() => {
    if (!token && !tokenLoading) {
      navigate("/ground-7-rule/login");
    }
  }, [token, tokenLoading, active_character, navigate]);
  // End of Token and Active character check

  const dispatch = useDispatch();
  const { name, class_id } = useSelector((state) => state.character);
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  const [createCharacter, { error }] = useCreateCharacterMutation();

  const prepSubmit = () => {
    const class_img = ["Dog.JPG", "Rabbit.JPG", "Owl.JPG", "Penguin.JPG"][
      parseInt(class_id) - 1
    ];
    const obj = {
      img_url: class_img,
      user_id: token.user.id,
    };
    return {
      name,
      class_id,
      ...obj,
    };
  };

  const attemptSubmit = async (e) => {
    e.preventDefault();
    const response = await createCharacter(prepSubmit());
    if (response.data) {
      navigate("/ground-7-rule/characterSelect");
    }
  };

  return (
    <div className="character_creation-bg">
      <div className="row">
        <div className="offset-1 col-10">
          <div className="form-bg">
            <div className="shadow p-4 mt-4">
              {error ? (
                <Notification type="danger">
                  {error.data.detail[0].msg === "value is not a valid integer"
                    ? "Pick a class"
                    : "An error occurred"}
                </Notification>
              ) : null}
              <h1 className="text-white" style={{ textAlign: "center" }}>
                Create a Character
              </h1>
              <form method="POST" onSubmit={(e) => attemptSubmit(e)}>
                <div style={{ textAlign: "center" }}>
                  <RadioButtonsGroup required />
                </div>
                <div
                  className="row row-cols-3 align-items-center"
                  align="center"
                  style={{ paddingTop: "40px" }}
                >
                  <label htmlFor="characterName">
                    <h2 className="text-white">Character Name :</h2>
                  </label>
                  <input
                    required
                    value={name}
                    onChange={field}
                    name="name"
                    className="col-7 text-center"
                    id="characterName"
                    placeholder="Enter Character Name"
                  />
                </div>
                <div className="col text-center" style={{ paddingTop: "40px" }}>
                  <button type="submit" className="btn btn-primary btn-lg">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterForm;
