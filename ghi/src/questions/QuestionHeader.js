// import React, { useState, useEffect } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import CharacterDetailsTwo from '../CharacterDetailsRTK';


// export default function QuestionHeader() {
//   const [data, setData] = useState("");
//         // const [anchorEl, setAnchorEl] = useState(null);
//         // const open = Boolean(anchorEl);
//         // const handleClick = (event) => {
//         //     setAnchorEl(event.currentTarget);
//         // };
//         // const handleClose = () => {
//         //     setAnchorEl(null);
//         // };
//     useEffect(() => {
//     async function getData() {
//       const url = `${process.env.REACT_APP_DNC_API}/characters/character/1`;
//       const response = await fetch(url);
//       if (response.ok) {
//         const data = await response.json();
//         setData(data);
//         // console.log(data)

//       }
//     }
//     getData();
//   }, [setData]);
//   const list = [0,1,1,1,2,2,2,3,3,3]

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//       <CharacterDetailsTwo/>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="center">
//             MOD {list[data.quest_id]} - Question {data.quest_id}
//           </Typography>
//           <Button variant="primary" color="error">Logout
//             </Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }