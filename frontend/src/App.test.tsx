import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Median Primes/i);
  expect(linkElement).toBeInTheDocument();
});

test('finds median primes', async () => {
  render(<App />);
  const input = screen.getByTestId<HTMLInputElement>('n-input');
  const submitBtn = screen.getByTestId<HTMLButtonElement>('submit-btn');

  expect(input).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 18 } });
  fireEvent.click(submitBtn);
  await new Promise((r) => setTimeout(r, 1000)); // wait 1 second
  const medianPrimes = screen.getByTestId('median-primes');
  expect(medianPrimes).toHaveTextContent('7');

  fireEvent.change(input, { target: { value: 10 } });
  fireEvent.click(submitBtn);
  await new Promise((r) => setTimeout(r, 1000)); // wait 1 second
  expect(medianPrimes).toHaveTextContent('3, 5');
});
