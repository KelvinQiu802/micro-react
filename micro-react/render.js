function createDOM(fiber) {
  // 创建父节点
  const dom =
    fiber.type == 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  // 赋值属性
  Object.keys(fiber.props)
    .filter((key) => key !== 'children')
    .forEach((key) => (dom[key] = fiber.props[key]));

  return dom;
}

// 开始渲染
function render(element, container) {
  // Root Fiber
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    child: null,
  };
  nextUnitOfWork = wipRoot;
}

// 渲染Root
// Commit Phase
function commitRoot() {
  commitWork(wipRoot.child);
}

// 渲染fiber
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  domParent.append(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

let nextUnitOfWork = null;
let wipRoot = null;

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

if (!nextUnitOfWork && wipRoot) {
  commitRoot();
}
// 请求在空闲时执行渲染
requestIdleCallback(workLoop);

// 执行一个渲染任务单元，并返回新的任务
function performUnitOfWork(fiber) {
  // 新建DOM元素
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }

  // 给children创建fiber
  const elements = fiber.props.children;
  let prevSibling = null;
  for (let i = 0; i < elements.length; i++) {
    const newFiber = {
      type: elements[i].type,
      props: elements[i].props,
      parent: fiber,
      child: null,
      sibling: null,
      dom: null,
    };

    // 第一个child才可以作为child，其他的就是sibling
    if (i === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  }

  // 如果有child，就返回child fiber
  if (fiber.child) {
    return fiber.child;
  }
  // 没有就优先返回兄弟，向上查找
  // 如果没有，就不返回，返回值为undefined
  let nextFiber = fiber;
  while (nextFiber) {
    // 有sibling
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 向上查找
    nextFiber = nextFiber.parent;
  }
}

export default render;
