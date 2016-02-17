import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import * as createHistory from 'history/lib/createBrowserHistory';
import * as useQueries from 'history/lib/useQueries';

export const Location = canUseDOM ? useQueries(createHistory)() : {};

