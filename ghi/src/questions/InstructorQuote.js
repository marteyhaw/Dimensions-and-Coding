// import React, { useState, useEffect } from 'react';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import { useGetCharacterDetailsQuery } from "../store/charApi";

// export default function InstructorQuote() {
//     const { data: charDetails } = useGetCharacterDetailsQuery(1);

//     return (
//         <Box>
//         <Typography variant="subtitle2" gutterBottom align="right">
//             {charDetails ?
//             true
//             :
//             false
//             }
//             {/* <i>"{charDetails.quest_id.instructor.quote}"</i>- {charDetails.quest_id.instructor.name} */}
//         </Typography>
//         </Box>

//     )
//  }