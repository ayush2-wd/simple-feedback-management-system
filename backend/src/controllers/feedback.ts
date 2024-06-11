import { Request, Response } from 'express';
import { getFeedbackEntries, addFeedbackEntry } from '../services/feedback';

export const getAllFeedback = (req: Request, res: Response) => {
  const feedback = getFeedbackEntries();
  res.json(feedback);
};

export const submitFeedback = (req: Request, res: Response) => {
  const { name, feedback } = req.body;
  const newFeedback = addFeedbackEntry({ name, feedback });
  res.status(201).json(newFeedback);
};
