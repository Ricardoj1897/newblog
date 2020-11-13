import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';

const container = document.getElementById('app');

ReactDOM.render(<App />, container);

