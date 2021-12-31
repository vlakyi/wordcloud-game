// We are using server setup to let it work in the github action.
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// constants
import { INVALID_URL, QUESTIONS_URL } from '../utils/constsants';

const server = setupServer(...handlers);

export { server, INVALID_URL, QUESTIONS_URL };
