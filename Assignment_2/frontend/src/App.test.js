import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('App Rendering', () => {

  test('renders todo list heading', async () => {
    render(<App />);

    expect(
      screen.getByText(/todo list/i)
    ).toBeInTheDocument();
  });

  test('renders input field', () => {
    render(<App />);

    expect(
      screen.getByTestId('task-input')
    ).toBeInTheDocument();
  });

  test('renders add button', () => {
    render(<App />);

    expect(
      screen.getByTestId('add-button')
    ).toBeInTheDocument();
  });

  test('input is empty at start', () => {
    render(<App />);

    const input = screen.getByTestId('task-input');

    expect(input.value).toBe('');
  });

});

describe('Input Behavior', () => {

  test('user can type in input', async () => {
    render(<App />);

    const user = userEvent.setup();

    const input = screen.getByTestId('task-input');

    await user.type(input, 'My new task');

    expect(input).toHaveValue('My new task');
  });

  test('add button is clickable', () => {
    render(<App />);

    const button = screen.getByTestId('add-button');

    expect(button).not.toBeDisabled();
  });

});

describe('Task List', () => {

  test('task list container renders', () => {
    render(<App />);

    expect(
      screen.getByTestId('task-list')
    ).toBeInTheDocument();
  });

  test('shows empty message when no tasks', async () => {
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/no tasks yet/i)
      ).toBeInTheDocument();
    });
  });

});