import React from "react";

const Hint = ({ question }) => {
  return (
    <div className="mt-5 text-black text-left p-5 bg-red-200">
      <div className="font-medium pb-2">ℹ️ Hint</div>
      <div className="font-normal ">{question.hint}</div>
    </div>
  );
};

export default Hint;
