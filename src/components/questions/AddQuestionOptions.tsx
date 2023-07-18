import CheckIcon from "remixicon-react/CheckLineIcon";
import DeleteIcon from "remixicon-react/SubtractLineIcon";
import Input from "../common/input/Input";
import React from "react";

interface AddQuestionOptionsProps {}

function AddQuestionOptions() {
  return (
    <div className="flex gap-2 items-center">
      <Input placeholder={"Option "} />
      <button className="btn btn-primary btn-square btn-outline">
        <CheckIcon />
      </button>
      <button className="btn btn-error btn-square btn-outline">
        <DeleteIcon />
      </button>
    </div>
  );
}

export default AddQuestionOptions;
