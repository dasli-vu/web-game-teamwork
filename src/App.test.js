import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game store app', () => {
  render(<App />);
  const gameStoreText = screen.getByText(/GAME STORE/i);
  expect(gameStoreText).toBeInTheDocument();
});
