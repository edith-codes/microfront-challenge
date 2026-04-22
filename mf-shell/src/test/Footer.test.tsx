import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('muestra el texto del footer', () => {
  render(<Footer />);

  expect(screen.getByText(/Wubba Lubba Dub Dub/i)).toBeInTheDocument();
  expect(screen.getByText('Rick & Morty App')).toBeInTheDocument();
});