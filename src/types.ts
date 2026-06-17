export interface SlideData {
  id: number;
  kicker: string;
  title: string;
  subtitle: string;
  bullets: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  extra: string;
}
