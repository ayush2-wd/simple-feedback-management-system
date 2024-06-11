import express, { Request, Response } from 'express';

const router = express.Router();

interface Feedback {
  name: string;
  feedback: string;
}

const feedbacks: Feedback[] = [];

router.get('/', (req: Request, res: Response) => {
  console.log('GET /api/feedback request received');
  res.json(feedbacks);
});

router.post('/', (req: Request, res: Response) => {
  const { name, feedback } = req.body;
  console.log('POST /api/feedback request received', { name, feedback });
  feedbacks.push({ name, feedback });
  res.status(201).json({ message: 'Feedback submitted successfully' });
});

export default router;
