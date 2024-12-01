import Data from "../database/data.json";
import { useState } from "react";
import QuizCompleted from "./QuizComplete";
import QuizName from "../features/QuizName";
import Button from "../components/Buttons/Button";
import { ErrorMessage } from "./HandlaError";
import { usePersistedState } from './Hook/usePersistance'

interface props {
  index: number;
  
}

function Quiz({ index }: props) {

  const [clicked, setclicked] = useState(false);
  // eslint-disable-next-line prefer-const
  let [next, setNext] = useState(false);
  // eslint-disable-next-line prefer-const
  let [selectedindex, setSlectedindex] = useState(-1);
  // eslint-disable-next-line prefer-const
  let [error, setError] = useState(false);
 
 
  const [currentIndex, setcurrentIndex] =  usePersistedState('currentIndex', 0)
  const  [progress, setprogress] = usePersistedState('progress',10)
  const [quizcompleted, setquizcompleted] =  usePersistedState('quizcompleted',false);
  // eslint-disable-next-line prefer-const
  let [score, setscore] =  usePersistedState('score',0);
  function setquiz() {
    // eslint-disable-next-line prefer-const, react-hooks/rules-of-hooks
    let [answer, showAnswer] = useState(false);
    const quiz = Data.quizzes.map((quiz, id) => {
      if (id === index) {
        return quizcompleted
          ? <QuizCompleted img={quiz.icon} title={quiz.title} score={score} />
          : quiz.questions.map((questions, id_) => {
              if (currentIndex === id_) {
                return (
                    <>
                     <div className="re-position">
                      <QuizName img={quiz.icon} quiz={quiz.title} />
                    </div>
                  <div className="quiz-content" key={id}>
                   
                    <div className="left">
                      <p>
                        Question {currentIndex + 1} out of {quiz.questions.length}
                      </p>
                      <div className="question">
                        <p>
                          {questions.question}
                        </p>
                        <div className="progress">
                           <div className="progress-bar" style={
                            {
                                width: `${progress}%`
                              
                            }
                           }></div>
                        </div>
                      </div>
                    </div>

                    <div className="right">
                      <div className="options">
                        <ul>
                          {questions.options.map((option, id) => {
                            return (
                              <li
                                className="options"
                                key={id}
                                onClick={() => {
                                  setclicked(true);
                                  selectedindex = id;
                                  setSlectedindex(selectedindex);
                                  setError(false);
                                  if (selectedindex === id) {
                                    if (
                                      questions.answer.trim() === option.trim()
                                    ) {
                                     
                                      setscore(score+1);
                                    }
                                  }
                                }}
                                style={{
                                  border: `${selectedindex === id
                                    ? answer
                                      ? questions.answer.trim() ===
                                        option.trim()
                                        ? "2px solid green"
                                        : "2px solid red"
                                      : `${clicked ? "2px solid #A729F5" : ""}`
                                    : ""}`,

                                  cursor: "pointer",

                                  pointerEvents: next ? "none" : "auto"
                                }}
                              >
                                <div className="opt">
                                  <div
                                    className="alternatives"
                                    style={{
                                      background: `${selectedindex === id
                                        ? answer
                                          ? questions.answer.trim() ===
                                            option.trim()
                                            ? "green"
                                            : "red"
                                          : `${clicked ? "#A729F5" : ""}`
                                        : ""}`,

                                      color: ` ${selectedindex === id
                                        ? clicked
                                          ? "white"
                                          : questions.answer.trim() ===
                                            option.trim()
                                            ? "white"
                                            : ""
                                        : ""}`
                                    }}
                                  >
                                    {id === 0
                                      ? "A"
                                      : id === 1 ? "B" : id === 2 ? "C" : "D"}
                                  </div>
                                  <p>
                                    {" "}{option}
                                  </p>
                                </div>
                                {questions.answer.trim() === option.trim()
                                  ? answer
                                    ? <img
                                        className="answer-check"
                                        src={"./images/icon-correct.svg"}
                                        alt=""
                                      />
                                    : ""
                                  : ""}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="buttons">
                        {next
                          ? <Button buttonText={`${currentIndex === 9?"Finish":"Next Question"}`} onclick={()=>{
                                setNext(false);
                                showAnswer(false);
                                setSlectedindex(-1);
                                setprogress(progress + 10);
                                setcurrentIndex(currentIndex+1);
                                if (currentIndex === 9) {
                                  setquizcompleted(true);
                                  

                                }
                              }}    
                           
                         />
                          :  <Button buttonText= "Submit Answer" onclick={()=>{
                            if (selectedindex < 0) {
                                setError(true);
                              } else {
                                setNext(true);
                                showAnswer(true);
                                setclicked(false);
                              }
                          }}/>}

                        {error
                          ? <ErrorMessage/>
                          : ""}
                      </div>
                    </div>
                  </div>
                  </>
                );
              }
            });
      }
    });

    return quiz;
  }

  return (
    <div>
      {" "}{setquiz()}
    </div>
  );
}

export default Quiz;