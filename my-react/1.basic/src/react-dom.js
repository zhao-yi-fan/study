import { REACT_TEXT } from "./constants";

/**
 * 把虚拟DOM变成真实DOM插入到容器内部
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render (vdom, container) {
  mount(vdom, container)
}

function mount (vdom, parentDOM) {
  let newDOM = createDOM(vdom)
  if (newDOM) {
    parentDOM.appendChild(newDOM)

  }
  return newDOM;
}

/**
 * 把虚拟DOM转成真实DOM
 */
function createDOM (vdom) {
  if (!vdom) return null;
  let { type, props } = vdom;
  let dom; // 真实DOM
  if (type === REACT_TEXT) { // 如果这个元素是一个文本的话
    dom = document.createTextNode(props.content)
  } else if (typeof type === 'function') {
    return mountFunctionComponent(vdom);

  } else {
    dom = document.createElement(type); // div span p
  }
  // 处理属性
  if (props) {
    updateProps(dom, {}, props); // 更新属性
    if (props.children) {
      let children = props.children;
      if (typeof children === 'object' && children.type) { // 说明这是一个React元素
        mount(children, dom)
      } else if (Array.isArray(children)) {
        reconcileChildren(props.children, dom)

      }
    }
  }
  return dom;
}

function mountFunctionComponent (vdom) {
  let { type, props } = vdom;
  let renderVdom = type(props);
  vdom.oldRenderVdom = renderVdom; // 现在没用到 后面进行组件更新使用
  return createDOM(renderVdom);
}

function reconcileChildren (childrenVdom, parentDOM) {
  childrenVdom.forEach(childVdom => mount(childVdom, parentDOM));
}

/**
 * 把新的属性更新到真实DOM上
 * @param {*} dom 真实DOM
 * @param {*} oldProps 旧的属性对象
 * @param {*} newProps 新的属性对象
 */
function updateProps (dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') {
      continue; // 此处忽略子节点的处理
    } else if (key === 'style') { // style
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else {
      dom[key] = newProps[key]; // className
    }

  }
}


const ReactDOM = {
  render

}

export default ReactDOM









