function render(element, container) {
  // 创建父节点
  const dom =
    element.type == 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  // 赋值属性
  Object.keys(element.props)
    .filter((key) => key !== 'children')
    .forEach((key) => (dom[key] = element.props[key]));

  // 递归，渲染每一个child
  element.props.children.forEach((child) => render(child, dom));

  // 将子节点添加到父节点下
  container.append(dom);
}

export default render;
