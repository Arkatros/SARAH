import { getQuestionsByTest, calculateScore } from "../services/testService.js";

export const getQuestions = async (req, res) => {
  try {
    const { code } = req.params;
    const data = await getQuestionsByTest(code);
    res.json({ test: code, questions: data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const postScore = async (req, res) => {
  try {
    const { code } = req.params;
    const { answers } = req.body || {};
    const result = await calculateScore(code, answers || []);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


