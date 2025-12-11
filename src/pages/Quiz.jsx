import { useState } from "react";
import AnswerComponent from "../components/AnswerComponent";

const Quiz = () => {
  // Active Answer from A to B
  const [answer, setAnswer] = useState("A");

  function onChangeAnswerCallback(new_answer) {
    setAnswer(new_answer);
    console.log("Active answer changed to:", new_answer);
  }

  return (
    <div>
      <div className="text-left w-full">
        <div className="pb-2">
          What is the primary cause of overfitting in machine learning models?
        </div>

        {answer == "A" ? (
          <AnswerComponent
            answer_prop={{
              key: "A",
              description: "A. Using too little training data",
            }}
            onChangeAnswerCallback={onChangeAnswerCallback}
            active={true}
          />
        ) : (
          <AnswerComponent
            answer_prop={{
              key: "A",
              description: "A. Using too little training data",
            }}
            onChangeAnswerCallback={onChangeAnswerCallback}
            active={false}
          />
        )}

        {answer == "B" ? (
          <AnswerComponent
            answer_prop={{
              key: "B",
              description:
                "B. The model learns noise and details in the training data too well, failing to generalize",
            }}
            onChangeAnswerCallback={onChangeAnswerCallback}
            active={true}
          />
        ) : (
          <AnswerComponent
            answer_prop={{
              key: "B",
              description:
                "B. The model learns noise and details in the training data too well, failing to generalize",
            }}
            onChangeAnswerCallback={onChangeAnswerCallback}
            active={false}
          />
        )}

        {answer == "C" ? (
          <AnswerComponent
            answer_prop={{
              key: "C",
              description: "C. Setting the learning rate too high",
            }}
            onChangeAnswerCallback={onChangeAnswerCallback}
            active={true}
          />
        ) : (
          <AnswerComponent
            answer_prop={{
              key: "C",
              description: "C. Setting the learning rate too high",
            }}
            onChangeAnswerCallback={onChangeAnswerCallback}
            active={false}
          />
        )}

        {answer == "D" ? (
          <AnswerComponent
            answer_prop={{
              key: "D",
              description: "D. Using too many features in the dataset",
            }}
            onChangeAnswerCallback={onChangeAnswerCallback}
            active={true}
          />
        ) : (
          <AnswerComponent
            answer_prop={{
              key: "D",
              description: "D. Using too many features in the dataset",
            }}
            onChangeAnswerCallback={onChangeAnswerCallback}
            active={false}
          />
        )}
      </div>

      <div className="pt-4 font-light">Selected Answer: {answer}</div>
    </div>
  );
};

export default Quiz;
