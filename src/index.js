import React from 'react';
import ReactDOM from 'react-dom';
import Catalog from './components/catalog';

ReactDOM.render(<Catalog url='http://localhost:3001/' pollInterval='2'/>, document.getElementById('root'))
