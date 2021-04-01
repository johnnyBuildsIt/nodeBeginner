'use strict';

import { start } from './server';
import { route } from './router';
import { start as _start, upload, show } from './requestHandlers';

const handle = {};
handle['/'] = _start;
handle['/start'] = _start;
handle['/upload'] = upload;
handle['/show'] = show;

start(route, handle);