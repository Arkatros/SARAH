import { findTestQuestions } from "../repositories/testRepository.js";

const mapQuestion = (q) => {
  const responses =
    (q.responses || []).map((r) => ({
      description: r.response.description,
      value: r.value,
    })) || [];

  const subquestions =
    (q.children || []).map((sq) => ({
      subquestionNumber: sq.subquestionNumber ?? null,
      description: sq.description,
      responses:
        (sq.responses || []).map((r) => ({
          description: r.response.description,
          value: r.value,
        })) || [],
    })) || [];

  return {
    number: q.number,
    description: q.description,
    subquestions,
    responses,
  };
};

export const getQuestionsByTest = async (testCode) => {
  const rows = await findTestQuestions(testCode);
  return rows.map(mapQuestion);
};

export const calculateScore = async (testCode, answers) => {
  // Placeholder – cálculo se implementará luego
  return {
    test: testCode,
    total: null,
    details: [],
    message: "Score calculation not implemented yet.",
  };
};


