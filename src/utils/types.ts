export type Question = {
  question: string;
  all_words: Array<string>;
  good_words: Array<string>;
};

export type QuestionArray = Array<Question> | [];

export type NormalizedQuestionWord = {
  id: string;
  value: string;
  selected: boolean;
  correct: boolean;
  className: string;
};

export type NormalizedQuestionWordArray = Array<NormalizedQuestionWord> | [];

export type NormalizedQuestion = {
  question: string;
  allWords: Array<NormalizedQuestionWord>;
};

export type NormalizedQuestionArray = Array<NormalizedQuestion> | [];
