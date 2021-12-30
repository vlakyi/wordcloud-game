import Game from '../routes/Game/Game';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router-dom';

// msw config
import { server } from '../mocks/server';

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

// can move it to setupTest later
const renderWithRouter = (child: JSX.Element) => {
  return render(<MemoryRouter>{child}</MemoryRouter>);
};

describe('Game route', () => {
  it('Game component should be visible', async () => {
    renderWithRouter(<Game />);

    // check if elements are visible correctly
    const header = screen.getByRole('heading');
    const wordsList = await screen.findByRole('list');
    const checkAnswersButton = screen.getByText(/check answears/i);
    const finishGameButton = screen.queryByText(/finish game/i);

    expect(header).toBeInTheDocument();
    expect(wordsList).toBeInTheDocument();
    expect(checkAnswersButton).toBeInTheDocument();
    expect(finishGameButton).not.toBeInTheDocument();

    await waitFor(() => {
      expect(wordsList.childNodes.length).toBeGreaterThan(0);
    });
  });

  it('User should be able to toggle a word', async () => {
    renderWithRouter(<Game />);

    const words = await screen.findAllByRole('listitem');
    const firstWord = words[0];

    userEvent.click(firstWord);

    expect(firstWord.className).toContain('selected');
    userEvent.click(firstWord);

    expect(firstWord.className).not.toContain('selected');
  });

  it('User should be able to check the provided answear', async () => {
    renderWithRouter(<Game />);

    const checkAnswersButton = screen.getByText(/check answears/i);
    const words = await screen.findAllByRole('listitem');

    // toggle all elements and press checkAnswersButton
    await waitFor(() => {
      words.forEach(function selectWord(word) {
        userEvent.click(word);
      });
    });

    userEvent.click(checkAnswersButton);

    // checkAnswersButton should disappear and finishGameButton should appear.
    expect(screen.queryByText(/check answears/i)).not.toBeInTheDocument();
    expect(screen.getByText(/finish game/i)).toBeInTheDocument();

    // Check if each word is correct or incorrect

    const variants = ['incorrect', 'correct'];
    words.forEach(function selectWord({ className }) {
      const numberOfMatches = variants.filter((x) =>
        className.includes(x)
      ).length;

      expect(numberOfMatches).toBeGreaterThan(0);
      expect(numberOfMatches).toBeLessThanOrEqual(2);
    });
  });
});
