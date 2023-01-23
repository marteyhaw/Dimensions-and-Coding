import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function RadioButtonsGroup(props) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Choose a Class</FormLabel>
      <RadioGroup
        onChange={(e) => props.setClassSet(e.target.value)}
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel value="1" control={<Radio />} label="Dog" />
        <img
          src={require("./img/001_Dog.JPG")}
          className="img-thumbnail"
          alt="Dog"
        />
        <FormControlLabel value="2" control={<Radio />} label="Rabbit" />
        <img
          src={require("./img/002_Rabbit.JPG")}
          className="img-thumbnail"
          alt="Rabbit"
        />
        <FormControlLabel value="3" control={<Radio />} label="Owl" />
        <img
          src={require("./img/003_Owl.JPG")}
          className="img-thumbnail"
          alt="Owl"
        />
        <FormControlLabel value="4" control={<Radio />} label="Penguin" />
        <img
          src={require("./img/004_Penguin.JPG")}
          className="img-thumbnail"
          alt="Penguin"
        />
      </RadioGroup>
    </FormControl>
  );
}

function CharacterForm(props) {
  const [charName, setCharName] = useState("");
  const [charClasses, setCharClasses] = useState([]);
  const [classSet, setClassSet] = useState("");

  useEffect(() => {
    async function getClasses() {
      const url = "http://localhost:8000/classes";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCharClasses(data);
      }
    }
    getClasses();
  }, [setCharClasses]);
  console.log(charClasses);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name: charName, class_id: classSet };
    const charCreationURL = "http://localhost:8000/characters";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(charCreationURL, fetchConfig);
    if (response.ok) {
      window.location.reload();
      console.log("character created");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Character</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="characterName">Character Name</label>
              <input
                value={charName}
                onChange={(e) => setCharName(e.target.value)}
                className="form-control"
                id="characterName"
                placeholder="Character Name"
              />
            </div>
            <div className="col-md-3">
              <RadioButtonsGroup setClassSet={setClassSet} />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CharacterForm;
