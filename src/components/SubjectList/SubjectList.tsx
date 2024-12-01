import React, { useState } from "react";
import QuizData from "../../database/data.json";
import styles from "./SubjectList.module.css";

interface Quiz {
  title: string;
  icon: string;
}
interface QuizDataType {
  quizzes: Quiz[];
}
const quizData: QuizDataType = QuizData as QuizDataType;
const SubjectList: React.FC = () => {
  // eslint-disable-next-line prefer-const
  let [currentQuiz, setCurrentQuiz] = useState(0);
  function handleClick(index: number) {
     currentQuiz = index
    setCurrentQuiz(currentQuiz);
    console.log(currentQuiz)
  }

  return (
    <div className={styles.container}>
      <ul>
      {quizData.quizzes.map((quiz, index) => (
        <li
          key={index}
          className={styles.ul}
          onClick={ ()=>{
            handleClick(index)
          }}
        >
          <img src={quiz.icon} alt={`${quiz.title} icon`} />
          <h3>{quiz.title}</h3>
        </li>
      ))}
      </ul>
    </div>
  );
};
export default SubjectList;