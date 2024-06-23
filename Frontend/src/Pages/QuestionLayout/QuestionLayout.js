import { useState } from "react";

import moment from "moment";

import Question from "../../components/Question";
import Timer from "../../components/Timer";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import Header from "../../components/Header";

const fetchQuestion = () =>
  new Promise((res) => {
    setTimeout(
      () =>
        res({
          question: "wieruwiorowru wrjwroifwhroiwuroiw?",
          options: ["adad", "sdsd", "dsds", "dfdffd"],
          id: 23232,
          endTime: moment().add(30, "seconds"),
          correctOption: 2,
        }),
      5000
    );
  });

const saveGame = () =>
  new Promise((res) => {
    setTimeout(
      () =>
        res({
          question: "wieruwiorowru wrjwroifwhroiwuroiw?",
          options: ["adad", "sdsd", "dsds", "dfdffd"],
          id: 23232,
          endTime: moment().add(30, "seconds"),
          correctOption: 2,
        }),
      5000
    );
  });

const useQuestion = () => {
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [question, setQuestion] = useState(null);

  const fetchAndSetQuestion = async () => {
    const question = await fetchQuestion();
    setQuestion(question);
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
  const [score, setScore] = useState(0);

  if (isGeneratingQuestion || !question || isSavingSelection) {
    return (
      <div className="infiniteVoid">
        <Header />
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
    if (index !== question?.correctOption) {
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
        <h4 className="timer fullWidth">{question?.question}</h4>
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
              {option}
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
