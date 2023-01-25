// import React, { useState } from 'react';
// import InstructorQuote from './InstructorQuote';
// import QuestionContent from './QuestionContent';
// import QuestionHeader from './QuestionHeader';


// export default function QuestionsDetails() {
//   const [questId, setQuestId] = useState(1);
//   const [questionId, setQuestionId] = useState(1);
//   const [currentCharacter, setCurrentCharacter] = useState({userId: "", name: "", classId: 
//   '', imgUrl: null, health: '', currency: ''})
  
//   return (
//     <div className="row">
//             <div className="offset-1 col-10">
//                 <div className="shadow p-4 mt-4">
//                   <QuestionHeader 
//                   questId={questId} 
//                   questionId={questionId} 
//                   currentCharacter={currentCharacter}
//                   setQuestId={setQuestId}
//                   setQuestionId={setQuestionId}
//                   setCurrentCharacter={setCurrentCharacter}
//                   />
//                   <div className="row">
//             <div className="offset-1 col-10">
//                 <div className="shadow p-4 mt-4">
//                   <InstructorQuote currentInstructor={InstructorQuote}/>
//                   <QuestionContent currentQuestion={QuestionContent}/>
//                   </div>
//                   </div>
//                   </div>
//                 </div>
//             </div>
//     </div>
//   );
// }
