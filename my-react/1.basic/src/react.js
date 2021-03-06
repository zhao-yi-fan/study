import { wrapToVdom } from "./utils";
import Component from "./Component";

/**
 * createElement('h1', null, 'a', ['b', 'c'])
 * 创建一个虚拟DOM，一个react元素
 * @param {*} type 元素类型 span div p
 * @param {*} config 配置对象 className style
 * @param {*} children 儿子 有可能一个（react对象）或多个(数组)
 */
function createElement (type, config, children) {
  let ref; // 通过ref引用此元素
  let key; // 可以唯一标识一个子元素
  if (config) {
    delete config.__source
    delete config.__self;
    ref = config.ref;
    key = config.key;
    delete config.ref;
    delete config.key;
  }
  let props = { ...config }

  if (arguments.length > 3) { // 多个
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom)
  } else { // 一个
    props.children = wrapToVdom(children); // children可能是react元素对象，也可能是一个字符串 数字 null undefined
  }

  return { type, ref, key, props };
}

const React = {
  createElement,
  Component
}
export default React;