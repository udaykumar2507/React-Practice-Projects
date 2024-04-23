import React, { useRef, useState } from 'react'
import './Quiz.css'
import { dats } from '../../assets/dats';
const Quiz = () => {
  let[index,setIndex]=useState(0);
  let[question,setquestion]=useState(dats[index]);
  let[lock,setlock]=useState(false);
  let[score,setscore]=useState(0);
  let[res,setres]=useState(false);
  let Option1=useRef(null);
  let Option2=useRef(null);
  let Option3=useRef(null);
  let Option4=useRef(null);
  let option_arr=[Option1,Option2,Option3,Option4];
  const check=(e,ans)=>{
    if (lock===false){
      if (question.ans===ans){
        e.target.classList.add("correct");
        setlock(true);
        setscore(prev=>prev+1);
      }else{
        e.target.classList.add("wrong");
        setlock(true);
        option_arr[question.ans-1].current.classList.add("correct");
      }
    }
}
const next =()=>{
    if (lock===true){
      if (index===dats.length-1){
        setres(true);
        return 0;
      }
      setIndex(++index);
      setquestion(dats[index]);
      setlock(false);
      option_arr.map((option)=>{
        option.current.classList.remove("wrong")
        option.current.classList.remove("correct")
        return null;
      })
    }
}
const reset=()=>{
  setIndex(0);
  setquestion(dats[0]);
  setscore(0);
  setlock(false);
  setres(false);
}
  return (
    <div className='container'>
      <h1>DC QUIZ APP</h1>
      <hr />
      {res?<></>:<>
      <h2>{index+1}.{question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=>{check(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{check(e,2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{check(e,3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{check(e,4)}}>{question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>
     <div className='index'>{index+1} of {dats.length} Question</div></>}
     {res?<>  <h2>You Scored {score} out of {dats.length}</h2>
      <button onClick={reset}>Reset</button></>:<></>}
    </div>
  )
}
export default Quiz

