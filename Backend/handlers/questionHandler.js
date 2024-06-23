import axios from "axios";
import { User } from "../models/user.js";
import { Question } from "../models/question.js";

export const createAndGetQuestion = async (req, res, next) => {
  try {
    // let userId = req.body.userId;
    // const user = await User.findById(userId);
    // if(!user){
    //     res.status(404).json({message:"User does not exist, Please do signup!"});
    // }

    const requestBody = {
      model: "domain_expansion",
      prompt: "hit me up",
      stream: false,
    };

    const response = await axios.post(process.env.AI_URL, requestBody);

    const data = JSON.parse(removeBeforeAfterBraces(response.data.response));

    const options = Object.keys(data)
      .filter((key) => ["A", "B", "C", "D"].includes(key))
      .map((key) => ({ key: key, desc: data[key] }));

    const question = new Question({
      desc: data.question,
      maxTime: new Date(Date.now() + 30000),
      //    gameId: req.body.gameId,
      options: options,
      correctOption: data.answer,
      scenario: data.scenario,
    });

    const savedQuestion = await question.save();

    res.status(200).json({
      id: savedQuestion._id,
      desc: savedQuestion.desc,
      maxTime: savedQuestion.maxTime,
      //    gameId: savedQuestion.gameId,
      options: savedQuestion.options,
      correctOption: savedQuestion.correctOption,
      scenario: savedQuestion.scenario,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Technical Issue, Please try after sometime!" });
  }
};

const removeBeforeAfterBraces = (str) => {
  const startIndex = str.indexOf("{");
  const endIndex = str.lastIndexOf("}") + 1;

  if (startIndex !== -1 && endIndex !== -1) {
    return str.substring(startIndex, endIndex);
  }

  return "";
};


export const getQuestion = async (req, res, next) => {
    try {
    const question = await Question.findById(req.params.questionId);

    res.status(200).json({
      id: question._id,
      desc: question.desc,
      maxTime: question.maxTime,
      //    gameId: question.gameId,
      options: question.options,
      correctOption: question.correctOption,
      scenario: question.scenario,
    });

    } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "Technical Issue, Please try after sometime!" });
      }
};