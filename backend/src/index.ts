import express,{NextFunction, Request,Response} from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import feedbackRoutes from './routes/feedback';
// Optional: Import rate limiter
var cors = require('cors')
import rateLimiter from './rateLimiter';
// import rate from ""

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
app.use(bodyParser.json());

// Optional: Apply rate limiter
app.use('/api/feedback', rateLimiter);

app.use('/api/feedback', feedbackRoutes);

app.use(express.static(path.join(__dirname,'..','frontend','build')));

app.get('*', (req:Request, res:Response) => {
  res.sendFile(path.join(__dirname,'..','..','frontend','build','index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


