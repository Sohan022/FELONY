// We need to define the intialState in order to use useReduce Hook.
export const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

export default function reducer(state, action) {
  switch (action.type) {
    case "gameStarted":
      return { ...initialState, gameStarted: true };
    case "endGame":
      return { ...initialState, gameStarted: false };

    default:
      throw new Error("Action unkonwn");
  }
}
