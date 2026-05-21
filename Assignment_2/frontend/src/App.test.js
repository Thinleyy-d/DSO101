import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock axios so we dont need real API
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
}));

// ===== TEST 1: Rendering =====
describe('App Rendering', () => {

  test('renders todo list heading', () => {
    render(<App />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
  });

  test('renders input field', () => {
    render(<App />);
    expect(screen.getByTestId('task-input')).toBeInTheDocument();
  });

  test('renders add button', () => {
    render(<App />);
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
  });

  test('input is empty at start', () => {
    render(<App />);
    const input = screen.getByTestId('task-input');
    expect(input.value).toBe('');
  });

});

// ===== TEST 2: Input Behavior =====
describe('Input Behavior', () => {

  test('user can type in input', async () => {
    render(<App />);
    const input = screen.getByTestId('task-input');
    await userEvent.type(input, 'My new task');
    expect(input.value).toBe('My new task');
  });

  test('add button is clickable', () => {
    render(<App />);
    const button = screen.getByTestId('add-button');
    expect(button).not.toBeDisabled();
  });

});

// ===== TEST 3: Task List =====
describe('Task List', () => {

  test('task list container renders', () => {
    render(<App />);
    expect(screen.getByTestId('task-list')).toBeInTheDocument();
  });

  test('shows empty message when no tasks', async () => {
    render(<App />);
    expect(await screen.findByText(/no tasks yet/i)).toBeInTheDocument();
  });

});