import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 1,
  message: 'You can only submit one feedback every 10 seconds.'
});

export default rateLimiter;
