export default {
  functional: true,
  name: 'router-view',
  render (h, { data, parent }) { // class组件 Vue.extend 函数式组件 函数可以节省性能  缺陷是没有实例
    console.log(11111111111);
    let route = parent.$route; // 做依赖收集
    let depth = 0;
    let records = route.matched;
    data.routerView = true; // 渲染router-view时标记是一个routerView

    // 看之前渲染过几个router-view 父 -> 子

    while (parent) { // _vnode
      if (parent.$vnode && parent.$vnode.data.routerView) {
        console.log(parent);
        depth++;
      }
      parent = parent.$parent;
    }

    let record = records[depth];
    if (!record) {
      return h()
    }

    return h(records[depth].component, data)
  }
}

/*

<my></my> // {type:{name: 'vue-component-1-my'}} vue2叫$vnode | vue3叫_vnode

<div></div> // {type:'div',{},null}   vue2叫_vnode | vue3叫subtree


*/