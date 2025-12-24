import { useState, useEffect } from "react";
import AnswerComponent from "../components/AnswerComponent";
import { toast } from "react-hot-toast";
import Confetti from "react-confetti";
import { dummyData, generateAIQuiz, generateQuiz } from "../services/Api";
import Explanation from "../components/Explanation";
import Hint from "../components/Hint";

const Quiz = ({ onQuizEndCallback, mode, param }) => {
  // Track Active Question
  const [questionIndex, setQuestionIndex] = useState(0);

  // Track Quiz Data
  const [quizData, setQuizData] = useState(dummyData);

  const currentQuestion = quizData[questionIndex];

  // Track Active Answer from A to D
  const [answer, setAnswer] = useState("A");

  // Track Completed Question
  const [isComplete, setComplete] = useState(false);

  // Track Finished Quiz
  const [isFinishQuiz, setFinish] = useState(false);

  // Track whether to show a Hint
  const [isHint, setHint] = useState(false);

  // Add loading
  const [isLoading, setLoading] = useState(true);

  // Encouragement Message
  const encouragmentMessage = [
    "Awesome!",
    "You're doing great!",
    "You nailed it!",
  ];

  // Message state
  const [message, setMessage] = useState(
    encouragmentMessage[Math.floor(Math.random() * encouragmentMessage.length)]
  );

  function randomizeMessage() {
    const randomMessage =
      encouragmentMessage[
        Math.floor(Math.random() * encouragmentMessage.length)
      ];

    console.log(randomMessage);
    setMessage(randomMessage);
  }

  useEffect(() => {
    if (mode == "generated") {
      console.log(
        `Render Generated Quiz here ${JSON.stringify(param)}. OR topic ${
          param.topic
        }`
      );

      const fetchQuiz = async () => {
        try {
          // const response = await generateQuiz(
          //   param.topic,
          //   param.numQuestion,
          //   param.difficulty
          // );

          const response = await generateAIQuiz(
            param.topic,
            param.numQuestion,
            param.difficulty
          );

          // const data = await response.json();

          console.log("Finish fetching quiz: ", JSON.stringify(response));

          // console.log("Finish fetching AI quiz: ", JSON.stringify(response_ai));

          // window.response_ai = response_ai;

          //setQuizData(response);
          setQuizData(response.questions);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };

      fetchQuiz();
    } else if (mode == "default") {
      console.log(`Default mode on starting Quiz`);
      console.log(`${JSON.stringify(currentQuestion)}`);
      setQuizData(dummyData);
      setLoading(false);
    }
  }, [mode, param.topic, param.numQuestion, param.difficulty]);

  function onChangeAnswerCallback(new_answer) {
    setAnswer(new_answer);
    console.log("Active answer changed to:", new_answer);
  }

  function validateAnswer(selected_answer) {
    if (selected_answer != currentQuestion.key_answer) {
      toast.error("Try again!");
      setHint(true);
    } else {
      toast.success("Awesome!");
      setComplete(true);
      setHint(false);
      randomizeMessage();
    }
  }

  function nextQuestion() {
    if (questionIndex + 1 == quizData.length) {
      setFinish(true);
    } else {
      setQuestionIndex(questionIndex + 1);

      // Reset State
      setComplete(false);
      setAnswer("A");
    }
  }

  function onQuizEndChange() {
    console.log("Quiz End");
    onQuizEndCallback();
  }

  if (isFinishQuiz) {
    return (
      <div className="h-full">
        <Confetti recycle={false} numberOfPieces={500} />
        <div className="flex flex-col h-full items-center justify-center">
          <div className="text-2xl">🎉 Congratulations!</div>
          <button
            onClick={onQuizEndChange}
            className="border-2 border-black pl-2 pr-2 mt-5 cursor-pointer"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div>Loading the data...</div>
      ) : (
        <div>
          {/* Show Confetti when user Complete the Question */}
          {isComplete && <Confetti recycle={false} />}

          <div className="text-left w-full">
            <div>
              Question ({currentQuestion.id} / {quizData.length})
            </div>
            <div>{currentQuestion.question}</div>
            <div className="pb-2 font-normal">(Choose one correct answer)</div>

            {isLoading ? (
              <div>loading the data...</div>
            ) : (
              currentQuestion.options.map((option) => {
                return (
                  <AnswerComponent
                    key={option.key}
                    answer_prop={option}
                    onChangeAnswerCallback={onChangeAnswerCallback}
                    active={answer === option.key}
                  />
                );
              })
            )}
          </div>
          <hr className="mt-5 mb-5" />

          <div className="flex justify-between items-center">
            <div className=" font-normal">Selected Answer: {answer}</div>
            {isComplete ? (
              <button
                onClick={() => nextQuestion()}
                className="mt-10 border-2 border-black p-2 text-black cursor-pointer bg-green-200"
              >
                {isComplete && questionIndex + 1 === quizData.length
                  ? "Finish"
                  : "Next Question"}
              </button>
            ) : (
              <button
                onClick={() => validateAnswer(answer)}
                className="border-2 border-black p-2 text-black cursor-pointer"
              >
                Submit
              </button>
            )}
          </div>

          {isComplete && (
            <Explanation message={message} question={currentQuestion} />
          )}

          {isHint && <Hint question={currentQuestion} />}
        </div>
      )}
    </>
  );
};

export default Quiz;
