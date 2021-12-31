import { rest } from 'msw';
import { testQuestions } from '../setupTests';

// CONSTANTS
import { INVALID_URL, QUESTIONS_URL } from '../utils/constsants';

export const handlers = [
  // Handles a GET /user request
  rest.get(QUESTIONS_URL, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(testQuestions)
    );
  }),

  rest.get(INVALID_URL, (req, res, ctx) => {
    return res(ctx.status(404), ctx.json('Resource not found'));
  }),
];
