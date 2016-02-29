console.log('Facebook Draft.js')

import React from 'react';
import ReactDOM from 'react-dom';
import MyEditor from './editor.jsx';

let el = React.createElement(MyEditor);
let container = document.getElementById('editor')
ReactDOM.render(el, container)


