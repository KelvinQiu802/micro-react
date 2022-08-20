import { createElement, render } from './micro-react';
import { useState } from './micro-react/render';

const handleChange = (e) => {
  renderer(e.target.value);
};

const container = document.querySelector('#root');

// const renderer = (value) => {
//   console.log(1);
//   const element = createElement(
//     'div',
//     null,
//     createElement('input', {
//       value: value,
//       oninput: (e) => {
//         handleChange(e);
//       },
//     }),
//     createElement('h2', null, value)
//   );

//   render(element, container);
// };

// renderer('Hello');

const Counter = () => {
  const [state, setState] = useState(1);
  return createElement(
    'h1',
    { onclick: () => setState((prev) => prev + 1) },
    state
  );
};

const element = createElement(Counter);
render(element, container);
