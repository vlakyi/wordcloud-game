export type Question = {
  question: string;
  all_words: Array<string>;
  good_words: Array<string>;
};

export type NormalizedQuestionWord = {
  id: string;
  value: string;
  selected: boolean;
  correct: boolean;
  className: string;
};

export type NormalizedQuestion = {
  question: string;
  allWords: Array<NormalizedQuestionWord>;
};
