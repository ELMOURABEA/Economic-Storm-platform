import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Economic Storm Platform', () => {
  render(<App />);
  const linkElement = screen.getByText(/Economic Storm Platform/i);
  expect(linkElement).toBeInTheDocument();
});
