import { errorOnConsoleOutput } from '@welldone-software/jest-console-handler';

const substringsToIgnore = [
  'Selectors that return the entire state are almost certainly a mistake',
  'Warning: ReactDOM.render is no longer supported in React 18',
];
const regexToIgnore = new RegExp(`(${substringsToIgnore.join('|')})`);

global.flushConsoleOutput = errorOnConsoleOutput({ filterEntries: ({ args }) => {
  const shouldIgnoreConsoleLog = regexToIgnore.test(args[0]);
  return !shouldIgnoreConsoleLog;
} });

const React = require('react');
if (!React.version.startsWith('18')) {
  throw new Error(`Wrong React version. Expected ^18, got ${React.version}`);
}
