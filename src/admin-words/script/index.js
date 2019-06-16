import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './common/serviceWorker';

import Application from './routers/index';

ReactDOM.render(<Application />, document.getElementById('root'));

serviceWorker.unregister();