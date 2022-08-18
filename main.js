import { createElement } from './micro-react';

const element = createElement(
  'h1',
  { id: 'title' },
  'Hello React',
  createElement('a', { href: 'https://bilibili.com' }, 'Click Me!')
);

console.log(element);
