'use strict';

import { start } from './server.js';
import { route } from './router.js';
import { start as _start, upload, show } from './requestHandlers.js';

const handle = {};
handle['/'] = _start;
handle['/start'] = _start;
handle['/upload'] = upload;
handle['/show'] = show;

start(route, handle);