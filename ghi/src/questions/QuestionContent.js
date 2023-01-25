// import React, { useState, useEffect } from 'react';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Button from '@mui/material/Button';
// // import { ListItem } from '@mui/material';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';


// export default function QuestionContent(props) {
//     const [data, setData] = useState([]);
//     const [charData, setCharData] =  useState({});
//     const [answerOption, setAnswerOption] = useState("");
//     const [showAlert, setShowAlert] = useState(null)

//     // const handleChange = (event) => {
//     //     setData(event.target.data);
//     // };

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     const answerSubmitURL = `${process.env.REACT_APP_DNC_API}/questions/answer/?question_id=${charData.quest_id}&character_id=${charData.id}&char_answer=${answerOption}`;
//     const fetchConfig = {
//       method: "get",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await fetch(answerSubmitURL, fetchConfig);
//     const answer_data = await response.json()
//     // console.log(answer_data)
//     if (response.ok) {
//     console.log("Answer submitted");
//     console.log(answer_data)
//         if (answer_data === true){
//             setShowAlert(true)
//         }
//         else{
//             setShowAlert(false)
//         }

//     }
//     setTimeout(function(){
//    window.location.reload();
//     }, 1250);
// }
//     useEffect (() => {
//         async function fetchCharData() {
//             const res1 = await fetch(`${process.env.REACT_APP_DNC_API}/characters/character/1`);
//             if (res1.ok) {
//                 const data1 = await res1.json();
//                 setCharData(data1);
//                 // console.log(data1);
//             }
//         }
//         fetchCharData();
//     }, []);

//     useEffect(() => {
//         async function fetchData() {
//             const res = await fetch(`${process.env.REACT_APP_DNC_API}/questions/${charData.quest_id}`);
//             if (res.ok) {
//                 const data = await res.json();
//                 // console.log(data)
//                 setData(data);
//             }
//         }

//         // console.log(charData)
//         if (charData.quest_id) {
//             fetchData();
//         }
//     }, [charData]);
//     return (
//         <FormControl>
//             <FormLabel id="demo-radio-buttons-group-label">{data.question}</FormLabel>
//             <RadioGroup
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 // value={data}
//                 onChange={(e) => setAnswerOption(e.target.value)}
//                 name="radio-buttons-group"
//             >
//                 <FormControlLabel value="1" control={<Radio />} label={data.option_1} />
//                 <FormControlLabel value="2" control={<Radio />} label={data.option_2} />
//                 <FormControlLabel value="3" control={<Radio />} label={data.option_3} />
//             </RadioGroup>
//             <Button variant="contained" color="success" disabled={!data} onClick = {handleSubmit}>
//                 Submit
//             </Button>
//             <div style={{
//                 marginTop: "20px",
//               }}>
//              <Stack sx={{ width: '100%' }} spacing={2}>
//                 {showAlert === false &&
//                 <Alert variant="outlined" severity="error" sx={{ display: 'all' }}>
//                     Oopsie... try again!
//                 </Alert>}
//                 {showAlert === true && 
//                 <Alert variant="outlined" severity="success" sx={{ display: 'all' }}>
//                     Success! You are one step closer to graduation!
//                 </Alert>}
//             </Stack>
//             </div>
//         </FormControl>
        
//     );
// }