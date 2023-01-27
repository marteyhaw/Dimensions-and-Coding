import { useGetTokenQuery } from "./store/authApi";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/charSlice";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { useLazyGetCharacterDetailsQuery } from "./store/charApi";
import { useLazyGetCharactersListQuery } from "./store/charApi";

function CharacterSelect(props) {
  const navigate = useNavigate();
  const { active_character } = useSelector((state) => state.character);

  // Start of Token check
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  useEffect(() => {
    if (!token && !tokenLoading) {
      navigate("/ground-7-rule/login");
    }
  }, [token, tokenLoading, active_character, navigate]);
  // End of Token check

  // if (token && !active_character) {
  //   navigate("/ground-7-rule/selectCharacter");
  // }

  // Update stored_char_details while picking char
  const dispatch = useDispatch();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  // Try to get the current user
  const current_user = token?.user.id;

  // Try to get the current user's char list
  const [
    getCharactersList,
    { data: charList, isUninitialized: charListUninit, isLoading: listLoading },
  ] = useLazyGetCharactersListQuery();

  // const { data: charList, isLoading: listLoading, isUninitialized: charListUninit } =
  //   useGetCharactersListQuery(current_user);

  // Check if has token, but no characters, otherwise make one
  useEffect(() => {
    if (token && !listLoading && charList?.length < 1) {
      navigate("/ground-7-rule/createCharacter");
    }
  }, [token, listLoading, charList, navigate]);
  // end check

  useEffect(() => {
    if (current_user && charListUninit) {
      getCharactersList(current_user);
    }
  }, [current_user, charListUninit, getCharactersList]);

  // Retrieve char details
  const [getCharacterDetails, { data: character_details, isSuccess }] =
    useLazyGetCharacterDetailsQuery();

  useEffect(() => {
    if (active_character) {
      getCharacterDetails(active_character);
    }
  }, [getCharacterDetails, active_character]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        updateField({
          field: "stored_char_details",
          value: character_details,
        })
      );
    }
  }, [character_details, dispatch, isSuccess]);

  // const { data: character_details } =
  //   useGetCharacterDetailsQuery(active_character);

  // Update stored_char_details after pressing button
  const attemptSubmit = async (e) => {
    e.preventDefault();
    // dispatch(
    //   updateField({ field: "stored_char_details", value: character_details })
    // );
    navigate("/ground-7-rule/campground");
  };

  // Create a new character button
  const newChar = (e) => {
    e.preventDefault();
    navigate("/ground-7-rule/createCharacter");
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
                            <div className="container-fluid">
                              <div className="row">
                                {charList.map((char, index) => (
                                  <div
                                    className="col-4"
                                    align="center"
                                    key={index}
                                  >
                                    <div className="container-fluid">
                                      <img
                                        align="center"
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
                                  </div>
                                ))}
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <div
                          className="col text-center"
                          style={{ paddingTop: "20px" }}
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
