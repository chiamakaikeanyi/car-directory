import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the app name', () => {
  render(<App />);
  const linkElement = screen.getByText(/Car Directory/i);
  expect(linkElement).toBeInTheDocument();
});
