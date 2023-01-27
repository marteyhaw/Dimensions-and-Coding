import { useGetCharactersListQuery } from "./store/charApi";
import { useGetTokenQuery } from "./store/authApi";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/charSlice";
import { useNavigate } from "react-router-dom";
import { useGetCharacterDetailsQuery } from "./store/charApi";
import { blue } from "@mui/material/colors";

function CharacterSelect(props) {
  const dispatch = useDispatch();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const current_user = token?.user.id;
  const { data: charList, isLoading: listLoading } =
    useGetCharactersListQuery(current_user);

  const navigate = useNavigate();

  const { active_character } = useSelector((state) => state.character);
  const { data: character_details } =
    useGetCharacterDetailsQuery(active_character);

  const attemptSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateField({ field: "stored_char_details", value: character_details })
    );
    navigate("/ground-7-rule/campground");
  };

  const newChar = (e) => {
    e.preventDefault();
    navigate("/ground-7-rule/createCharacterTest");
  };
  return (
    <>
      {tokenLoading ? (
        "Loading..."
      ) : token ? (
        <>
          {listLoading ? (
            "Loading..."
          ) : charList ? (
            <div className="character-select-bg">
              <div className="row">
                <div className="offset-1 col-10">
                  <div className="form-bg">
                    <div className="shadow p-4 mt-4">
                      <h1
                        className="text-white"
                        style={{ textAlign: "center" }}
                      >
                        Select Your Character
                      </h1>
                      <form onSubmit={(e) => attemptSubmit(e)}>
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="active_character"
                            onChange={field}
                          >
                            <div className="row row-cols-3 align-items-center">
                              {charList.map((char, index) => (
                                <div className="col-4" align="center" key={index}>
                                  <img
                                    style={{
                                      height: "200px",
                                      width: "300px",
                                    }}
                                    src={require(`./img/${char.img_url}`)}
                                    className="img-thumbnail"
                                    alt="class-img"
                                  />
                                  <FormControlLabel
                                    className="text-white"
                                    key={index}
                                    value={char.id}
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
                                    label={char.name}
                                  />
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <div
                          className="col text-center"
                          style={{ paddingTop: "40px" }}
                        >
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Enter
                          </button>
                          <div style={{ textAlign: "right" }}>
                            <button onClick={(e) => newChar(e)}>
                              New Character
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default CharacterSelect;
