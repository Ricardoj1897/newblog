import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';

const container = document.getElementById('app');

ReactDOM.render(<App />, container);

