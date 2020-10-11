import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByDisplayValue } = render(<App />);
  const linkElement = getByDisplayValue(/tretton37/i);
  expect(linkElement).toBeInTheDocument();
});
