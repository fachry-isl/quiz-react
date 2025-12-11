import React from "react";

const AnswerComponent = ({ answer_prop, onChangeAnswerCallback, active }) => {
  function onChangeAnswer() {
    onChangeAnswerCallback(answer_prop.key);
  }
  return active ? (
    <button
      onClick={onChangeAnswer}
      className="text-left font-light border-2 border-black pl-2 w-full cursor-pointer"
    >
      {answer_prop.description}
    </button>
  ) : (
    <button
      onClick={onChangeAnswer}
      className="text-left font-light pl-2 w-full cursor-pointer"
    >
      {answer_prop.description}
    </button>
  );
};

export default AnswerComponent;
