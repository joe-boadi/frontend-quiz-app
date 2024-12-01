import QuizName from "./QuizName";
import Button from "../components/Buttons/Button";
import { useState } from "react";
import Home from "../components/LandingPage/Home";

type props = {
  score: number;
  img: string;
  title: string;
};

function QuizCompleted({ score, img, title }: props) {

  const [play, setplay] = useState(true);
  return (
    <div>
       

       {
        play?<div>
        <div className="re-position">
          <QuizName img={img} quiz={title} />
        </div>

        <div className="completed">
          <div className="left">
            <h6 className="welcome">Quiz completed</h6>
            <h5 className="title">You scored...</h5>
          </div>
          <div className="right">
            <div className="container">
              {/* <div className="quiztype_">
                <img src={img} alt="alt" />
                <p>
                  {title}
                </p>
              </div> */}
              <QuizName img={img} quiz={title} />
              <div className="score">
                <h1>
                  {score}
                </h1>
              </div>

              <p>out of 10</p>
            </div>

            <Button
              buttonText="Play Again"
              onclick={() => {
                localStorage.setItem("quizIndex", JSON.stringify(-1));
                localStorage.setItem("startquiz", JSON.stringify(false));
                localStorage.setItem("currentIndex", JSON.stringify(0));
                localStorage.setItem("progress", JSON.stringify(10));
                localStorage.setItem("quizcompleted", JSON.stringify(false));
                localStorage.setItem("score", JSON.stringify(0));
                setplay(false)
              }}
              
            />
          </div>
        </div>
      </div>: <Home/>
       }
    </div>
  );
}

export default QuizCompleted;