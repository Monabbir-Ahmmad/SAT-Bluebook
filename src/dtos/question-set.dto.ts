import { Difficulties, SectionTypes } from "@/constants/enums";

export interface QuestionSetCreateReqDTO {
  title: string;
  section: SectionTypes;
  difficulty: Difficulties;
  questions: string[];
}
