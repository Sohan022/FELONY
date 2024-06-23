import { useState } from "react";

import moment from "moment";
import axios from "axios";

import Question from "../../components/Question";
import Timer from "../../components/Timer";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import Header from "../../components/Header";

const fetchQuestion = async (id) =>
  await axios.get("http://localhost:8000/question/next/new");

const saveGame = async (score) =>
  await axios.post(`http://localhost:8000/save`, { score });

const useQuestion = () => {
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [question, setQuestion] = useState(null);

  const fetchAndSetQuestion = async () => {
    const [question] = await Promise.all([
      fetchQuestion(),
      new Promise((r) => setTimeout(r, 8000)),
    ]);
    setQuestion({
      ...(question?.data || {}),
      endTime: moment().add(30, "seconds"),
    });
    setIsGeneratingQuestion(false);
  };

  const next = () => {
    setIsGeneratingQuestion(true);
    fetchAndSetQuestion();
  };

  useEffect(() => {
    next();
  }, []);
  return { question, next, isGeneratingQuestion };
};

const QuestionLayout = ({
  questions,
  status,
  index,
  answer,
  points,
  highscore,
  secondsRemaining,
  dispatch,
  hasAnswered,
}) => {
  const { question, next, isGeneratingQuestion } = useQuestion();
  const [isSavingSelection, setIsSavingSelection] = useState(false);
  const [scenario, setScenario] = useState(null);

  const [score, setScore] = useState(0);

  if (isGeneratingQuestion || !question || isSavingSelection) {
    return (
      <div className="infiniteVoid">
        <Header />
        {scenario && <div className="scenario">{scenario}</div>}
        <Loader />;
      </div>
    );
  }

  const endGame = () => {
    // alert("Game Over!");
    // saveGame(score);
    dispatch({ type: "endGame" });
  };

  const handleAnswerSelection = async ({ option, index }) => {
    setScenario(question?.scenario);
    if (option?.key !== question?.correctOption) {
      endGame();
      return;
    }

    setScore(score + 1);
    next();
  };

  return (
    <div className="questionLayout infiniteVoid">
      <h3 className="mb12 timer">Score: {score}</h3>
      <Timer
        secondsRemaining={secondsRemaining}
        dispatch={dispatch}
        endTime={question?.endTime}
        timeoutCallback={endGame}
      />
      <div className="question_container">
        <h4 className="timer fullWidth">{question?.desc}</h4>
        <div>
          {question?.options?.map((option, index) => (
            <button
              className={`btn btn-option ${index === answer ? "answer" : ""} ${
                hasAnswered
                  ? index === question?.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              key={index}
              disabled={hasAnswered}
              onClick={() => handleAnswerSelection({ option, index })}
            >
              {option?.desc}
            </button>
          ))}
        </div>
      </div>
      {/* <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Submit
      </button> */}
    </div>
  );
};

export default QuestionLayout;
