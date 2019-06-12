import 'babel-polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/error/App'

ReactDOM.render(<App/>, document.getElementById('app')) // eslint-disable-line no-undef

import logMessage from './js/logger'
import './css/style.css'
// Log message to console
logMessage('Welcome back to Expack!1222')

// Needed for Hot Module Replacement
if(typeof(module.hot) !== 'undefined') { // eslint-disable-line no-undef 
    module.hot.accept()  // eslint-disable-line no-undef 
}
