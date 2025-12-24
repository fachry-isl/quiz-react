import React from "react";

const Explanation = ({ message, question }) => {
  return (
    <div className="mt-5 text-black text-left p-5 bg-green-200">
      <div className="font-medium pb-2">💡Explanation</div>
      <div className="font-normal ">
        {message} {question.explanation}
      </div>
    </div>
  );
};

export default Explanation;
