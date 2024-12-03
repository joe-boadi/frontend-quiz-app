import Data from "../../database/data.json";
import Quiz from '../../features/Quiz'
import {usePersistedState} from '../../features/Hook/usePersistance'

function Home() {
  const [startquiz, setStartQuiz] = usePersistedState('startquiz',false)
  const [quizIndex, setQuizIndex] =  usePersistedState('quizIndex',-1)

  function selectQuiz(index: number) {
    setStartQuiz(!startquiz)
    setQuizIndex(index)
  }

  const quizType = Data.quizzes.map((data, index) => {
    return (
      Subject(index, data)
    );
  });
  return (

   <>
      {
        startquiz? <Quiz index={quizIndex} /> : <div className="home-page">
          <div className="left">
            <h6 className="welcome">Welcome to the</h6>
            <h5 className="title">Frontend Quiz!</h5>
            <p>Pick a subject to get started.</p>
          </div>
            <div className="right">
              <ul>
                {quizType}
              </ul>
            </div>
          </div>
      }
    </>
  );


  function Subject(index: number, data: { title: string; icon: string; questions: { question: string; options: string[]; answer: string; }[]; }) {
    return <li
      key={index}
      onClick={() => {
        selectQuiz(index);
      } }
    >
      <span style={{
        background: index === 0
          ? "#FFF1E9"
          : index === 1 ? "#E0FDEF" : index === 2 ? "#EBF0FF" : "#F6E7FF"
      }}>
        <img
          src={data.icon}
          alt="alt" />
      </span>
      <p>
        {" "}{data.title}
      </p>
    </li>;
  }
}

export default Home;