import { api } from "./instance";

// === Types ===

export type QuizLevel = "EASY" | "MEDIUM" | "DIFFICULT";
export type QuizCategory = "FRONTEND" | "BACKEND";
export type QuizLanguage = "KOREA" | "ENGLISH";
export type SolveStatus = "NOT_STARTED" | "SOLVING" | "SUCCESS" | "FAIL" | "DONE";

export interface Quiz {
  id: string;
  userId: string;
  level: QuizLevel;
  category: QuizCategory;
  language: QuizLanguage;
  problem: string;
  expectedAnswer: string;
  createdAt: string;
  modifiedAt: string;
}

export interface QuizScrollResponse {
  quizs: Quiz[];
  nextId: string | null;
}

export interface QuizScrollParams {
  lastId?: string;
  level?: QuizLevel;
  category?: QuizCategory;
  language?: QuizLanguage;
}

export interface QuizSolveContext {
  id: string;
  userId: string;
  category: QuizCategory;
  round: {
    total: number;
    current: number;
    timeoutAt: string | null;
  };
  prize: number;
  solvedAt: string;
  status: SolveStatus;
  createdAt: string;
  modifiedAt: string;
}

export interface QuizSolveContextScrollResponse {
  quizSolveContexts: QuizSolveContext[];
  nextId: string | null;
}

export interface QuizSolveContextParams {
  userId: string;
  lastId?: string;
}

export interface QuizActionRequest {
  reason: string;
}

// === API Functions ===

const adminHeaders = {
  "Admin-Secret": import.meta.env.VITE_APP_ADMIN_SECRET,
};

const buildSearchParams = (params: Record<string, string | undefined>): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, string] => entry[1] !== undefined),
  );
};

export const getApprovedQuizs = async (params: QuizScrollParams): Promise<QuizScrollResponse> => {
  return api.get<QuizScrollResponse>("admin/quizs/approved", {
    headers: adminHeaders,
    searchParams: buildSearchParams({
      lastId: params.lastId,
      level: params.level,
      category: params.category,
      language: params.language,
    }),
  });
};

export const getNotApprovedQuizs = async (
  params: QuizScrollParams,
): Promise<QuizScrollResponse> => {
  return api.get<QuizScrollResponse>("admin/quizs/not-approved", {
    headers: adminHeaders,
    searchParams: buildSearchParams({
      lastId: params.lastId,
      level: params.level,
      category: params.category,
      language: params.language,
    }),
  });
};

export const approveQuiz = async (quizId: string, data: QuizActionRequest): Promise<void> => {
  await api.post<void>(`admin/quizs/not-approved/${quizId}/approve`, {
    json: data,
    headers: adminHeaders,
  });
};

export const deleteApprovedQuiz = async (
  quizId: string,
  data: QuizActionRequest,
): Promise<void> => {
  await api.delete<void>(`admin/quizs/approved/${quizId}`, {
    json: data,
    headers: adminHeaders,
  });
};

export const deleteNotApprovedQuiz = async (
  quizId: string,
  data: QuizActionRequest,
): Promise<void> => {
  await api.delete<void>(`admin/quizs/not-approved/${quizId}`, {
    json: data,
    headers: adminHeaders,
  });
};

export const getQuizSolveContexts = async (
  params: QuizSolveContextParams,
): Promise<QuizSolveContextScrollResponse> => {
  return api.get<QuizSolveContextScrollResponse>("admin/quizs/contexts", {
    headers: adminHeaders,
    searchParams: buildSearchParams({
      userId: params.userId,
      lastId: params.lastId,
    }),
  });
};
