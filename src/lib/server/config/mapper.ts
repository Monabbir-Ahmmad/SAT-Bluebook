import { IQuestion } from "../models/question.model";
import { IQuestionSet } from "../models/question-set.model";
import { QuestionResDTO } from "@/dtos/question.dto";

export const mapper = {
  questionModel: {
    to: {
      questionDTO: {
        map: (questionModel: IQuestion): QuestionResDTO => ({
          id: questionModel._id,
          question: questionModel.question,
          passage: questionModel.passage,
          questionImage: questionModel.questionImage,
          section: questionModel.section,
          difficulty: questionModel.difficulty,
          tags: questionModel.tags,
          optionType: questionModel.optionType,
          options: questionModel.options,
          answers: questionModel.answers,
        }),
      },
    },
  },

  questionSetModel: {
    to: {
      questionSetDTO: {
        map: (questionSetModel: IQuestionSet) => ({
          id: questionSetModel._id,
          title: questionSetModel.title,
          section: questionSetModel.section,
          difficulty: questionSetModel.difficulty,
          questions: questionSetModel.questions.map((question) =>
            mapper.questionModel.to.questionDTO.map(question)
          ),
        }),
      },
    },
  },
};
