import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import './index.css';
import '../node_modules/react-vis/dist/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

ReactDOM.render(<App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
