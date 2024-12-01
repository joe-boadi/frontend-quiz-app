
interface props {
    img: string;
    quiz: string;
  }
  function QuizName({ img, quiz }: props) {
    return (
      <div>
        <div className="quiztype">
          <img src={img} alt="" />
          <p>
            {quiz}
          </p>
        </div>
      </div>
    );
  }
  
  export default QuizName;
  