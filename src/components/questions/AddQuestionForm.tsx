"use client";

import { FormProvider, useForm } from "react-hook-form";

import AddQuestionOptions from "./AddQuestionOptions";
import FileDrop from "../common/input/FileDrop";
import Input from "../common/input/Input";
import RichEditor from "../common/richEditor/RichEditor";
import Select from "../common/input/Select";
import { buttonListMini } from "../common/richEditor/buttonList";

export default function AddQuestionForm() {
  const formMethods = useForm<QuestionDTO>();

  return (
    <FormProvider {...formMethods}>
      <div className="flex gap-5 items-center justify-center">
        <form
          className="flex flex-col gap-4  max-w-4xl w-full"
          onSubmit={formMethods.handleSubmit((data) => console.log(data))}
        >
          <div className="flex gap-4 justify-between">
            <h2 className="text-2xl font-semibold">Create Question</h2>
            <button className="btn btn-primary">Submit Question</button>
          </div>

          <div className="card p-6 bg-base-100 shadow-xl border-primary border-t-4 flex flex-col gap-4">
            <div>
              <label className="block font-semibold text-base mb-2">
                Question Text
              </label>
              <RichEditor
                className="input border-2 focus:input-primary"
                minHeight="100px"
                width="100%"
                resizingBar={false}
                placeholder="Write your question here..."
                buttonList={buttonListMini}
              />
            </div>

            <div>
              <label className="block font-semibold text-base mb-2">
                Question Image (optional)
              </label>
              <FileDrop
                onChange={(file) =>
                  formMethods.setValue(
                    "questionImage",
                    file as File | undefined
                  )
                }
                value={formMethods.watch("questionImage")}
              />
            </div>

            <Select
              label="Subject"
              options={[
                { value: "maths", label: "Maths" },
                {
                  value: "physics",
                  label: "Physics",
                },
                {
                  value: "chemistry",
                  label: "Chemistry",
                },
              ]}
            />

            <Select
              label="Difficulty"
              options={[
                { value: 1, label: "Easy" },
                // {
                //   value: 2,
                //   label: "Medium",
                // },
                {
                  value: 3,
                  label: "Hard",
                },
              ]}
            />

            <Input label="Tags" placeholder="Enter tags" />
          </div>

          <div className="card p-6 bg-base-100 shadow-xl border-primary border-l-4 flex flex-col gap-6">
            <AddQuestionOptions />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
