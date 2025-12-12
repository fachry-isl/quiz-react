import { useState } from "react";
import AnswerComponent from "../components/AnswerComponent";
import { toast } from "react-hot-toast";
import Confetti from "react-confetti";
import dummyData from "../services/Api";

const Quiz = ({ onQuizEndCallback }) => {
  // Track Active Question
  const [questionIndex, setQuestionIndex] = useState(0);
  // Active Answer from A to B
  const [answer, setAnswer] = useState("A");

  // Track Completed Question
  const [isComplete, setComplete] = useState(false);

  // Track Finished Quiz
  const [isFinishQuiz, setFinish] = useState(false);

  const currentQuestion = dummyData[questionIndex];

  function onChangeAnswerCallback(new_answer) {
    setAnswer(new_answer);
    console.log("Active answer changed to:", new_answer);
  }

  function validateAnswer(selected_answer) {
    if (selected_answer != currentQuestion.key_answer) {
      toast.error("Wrong Answer!");
    } else {
      toast.success("You're Right!");
      setComplete(true);
    }
  }

  function nextQuestion() {
    if (questionIndex + 1 >= dummyData.length) {
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
      <div>
        <Confetti recycle={false} numberOfPieces={500} />
        <div>🎉 Congratulations!</div>
        <button
          onClick={onQuizEndChange}
          className="border-2 border-black pl-2 pr-2 mt-5 cursor-pointer"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Show Confetti when user Complete the Question */}
      {isComplete && <Confetti recycle={false} />}
      <div className="text-left w-full">
        <div>
          Question ({currentQuestion.id} / {dummyData.length})
        </div>
        <div>{currentQuestion.question}</div>
        <div className="pb-2 font-light">(Choose one correct answer)</div>

        {currentQuestion.options.map((option) => {
          return (
            <AnswerComponent
              key={option.key}
              answer_prop={option}
              onChangeAnswerCallback={onChangeAnswerCallback}
              active={answer === option.key}
            />
          );
        })}
      </div>

      <div className="pt-4 font-light">Selected Answer: {answer}</div>

      {isComplete ? (
        <button
          onClick={() => nextQuestion()}
          className="mt-10 border-2 border-black p-2 text-black cursor-pointer bg-green-200"
        >
          Next Question
        </button>
      ) : (
        <button
          onClick={() => validateAnswer(answer)}
          className="mt-10 border-2 border-black p-2 text-black cursor-pointer"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Quiz;
