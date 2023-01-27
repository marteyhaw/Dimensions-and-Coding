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

  return (
    <>
      {tokenLoading ? (
        "Loading..."
      ) : token ? (
        <>
          {listLoading ? (
            "Loading..."
          ) : charList ? (
            <div className="row">
              <div className="offset-1 col-9">
                <div className="shadow p-4 mt-4">
                  <h1 style={{ textAlign: "center" }}>Select Your Character</h1>
                  <form onSubmit={(e) => attemptSubmit(e)}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Characters
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="active_character"
                        onChange={field}
                      >
                        {charList.map((char, index) => (
                          <FormControlLabel
                            key={index}
                            value={char.id}
                            control={<Radio />}
                            label={char.name}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <div
                      className="col text-center"
                      style={{ paddingTop: "40px" }}
                    >
                      <button type="submit" className="btn btn-primary btn-lg">
                        Submit
                      </button>
                    </div>
                  </form>
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
