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

let nextUnitOfWork = null;

// 调度
function workLoop(deadline) {
  // shouldYield 表示线程繁忙，应该中断渲染
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // 检查线程是否繁忙
    shouldYield = deadline.timeRemaining() < 1;
  }
  // 重新请求
  requestIdleCallback(workLoop);
}

// 请求在空闲时执行渲染
requestIdleCallback(workLoop);

// 执行一个渲染任务单元，并返回新的任务
function performUnitOfWork(nextUnitOfWork) {}

export default render;
