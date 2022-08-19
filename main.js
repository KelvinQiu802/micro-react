import { createElement, render } from './micro-react';

const handleChange = (e) => {
  renderer(e.target.value);
};

const container = document.querySelector('#root');

const renderer = (value) => {
  console.log(1);
  const element = createElement(
    'div',
    null,
    createElement('input', {
      value: value,
      oninput: (e) => {
        handleChange(e);
      },
    }),
    createElement('h2', null, value)
  );

  render(element, container);
};

renderer('Hello');
