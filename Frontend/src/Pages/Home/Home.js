import { useEffect } from "react";

import {
  DynamicWidget,
  useDynamicContext,
  useSendBalance,
  useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";

import mp3File from "../../assets/domain-expansion-malevolent.mp3";
import GIF from "../../assets/DomainExpansionVideo.gif";

import Question from "../../components/Question";
import Timer from "../../components/Timer";
import QuestionLayout from "../QuestionLayout";
import Header from "../../components/Header";

const isInputEmpty = (input) => !input || !input?.length > 0;

const Home = (props) => {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    dispatch,
    gameStarted,
  } = props;
  const { setShowAuthFlow, handleLogOut } = useDynamicContext();
  const { open } = useSendBalance();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) return;
    const audio = new Audio(mp3File);
    audio.play();
  }, [isLoggedIn]);

  if (isLoggedIn) {
    if (gameStarted) {
      return <QuestionLayout {...props} />;
    }
    return (
      <div className="domainGif">
        <Header />
        <div className="homeContainer">
          <div className="mb12">Highest Score</div>

          <button
            className="btn btn-ui mb12 blackBg"
            onClick={() => dispatch({ type: "gameStarted" })}
          >
            Start
          </button>
          <button
            className="logout-button btn btn-ui mb12 blackBg"
            onClick={() => handleLogOut()}
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="homeContainer">
      <Header />
      <button className="btn btn-ui mb12" onClick={() => setShowAuthFlow(true)}>
        Connect your wallet
      </button>
    </div>
  );
};

export default Home;
