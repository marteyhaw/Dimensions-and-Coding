import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import CharacterDetails from "./CharacterDetails";

function RadioButtonsGroup(props) {
  return (
    <FormControl>
      <FormLabel
        id="demo-radio-buttons-group-label"
        style={{ textAlign: "center" }}
      >
        Choose a Class
      </FormLabel>
      <RadioGroup
        onChange={(e) => props.setClassSet(e.target.value)}
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <div className="row row-cols-3 align-items-center">
          <div className="col-2" align="center">
            <FormControlLabel value="1" control={<Radio />} label="Dog" />
          </div>
          <div className="col-4">
            <img
              src={require("./img/001_Dog.JPG")}
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
              src={require("./img/002_Rabbit.JPG")}
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
              value="2"
              control={<Radio />}
              label="Rabbit"
              labelPlacement="start"
            />
          </div>
        </div>
        <div className="row row-cols-3 align-items-center">
          <div className="col-2" align="center">
            <FormControlLabel value="3" control={<Radio />} label="Owl" />
          </div>
          <div className="col-4">
            <img
              src={require("./img/003_Owl.JPG")}
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
              src={require("./img/004_Penguin.JPG")}
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
              value="4"
              control={<Radio />}
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
  const [charName, setCharName] = useState("");
  const [classSet, setClassSet] = useState("");

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
    const char_data = await response.json()
    if (response.ok) {
      console.log("character created");
      const curr_char = char_data.id;
      const img_list = [
        "",
        "https://i.imgur.com/SWVMGWA.jpg",
        "https://i.imgur.com/7mQMRmi.jpg",
        "https://i.imgur.com/OPeW1gt.jpg",
        "https://i.imgur.com/3Pu2lhi.jpg",
      ];
      const img_change = { img_url: img_list[classSet] };
      const imgUpdateURL = "http://localhost:8000/characters/character/"+curr_char;
      const fetchConfigImg = {
        method: "put",
        body: JSON.stringify(img_change),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const imgResponse = await fetch(imgUpdateURL, fetchConfigImg);
      if (imgResponse.ok) {
        console.log("image updated");
        window.location.reload();
      }
    }
  };

  return (
    <div className="row">
      <div className="offset-1 col-9">
        <div className="shadow p-4 mt-4">
          <h1 style={{ textAlign: "center" }}>Create a Character</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <RadioButtonsGroup setClassSet={setClassSet} />
            </div>
            <div
              className="row row-cols-3 align-items-center"
              align="center"
              style={{ paddingTop: "40px" }}
            >
              <label htmlFor="characterName">
                <h2>Character Name :</h2>
              </label>
              <input
                value={charName}
                onChange={(e) => setCharName(e.target.value)}
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
  );
}

export default CharacterForm;
