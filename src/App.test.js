import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  window.environment='dev';
  ReactDOM.render(<App />, div);
});
