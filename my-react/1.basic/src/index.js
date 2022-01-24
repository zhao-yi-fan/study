import React from './react'
import ReactDOM from './react-dom'

class Counter extends React.Component {
  constructor(props) {
    super(props);
    // 只有在构造函数中蔡志杰给this.state赋值
    this.state = { number: 0, age: 10 }
  }
  handleClick = (event) => {
    // 可通过setState修改状态，每次修改后，组件会重新刷新
    // setState参数是新的状态对象，这个新状态对象会合并到老状态对象上。
    // 老状态没有的属性会添加，老状态有的属性会被覆盖
    // state状态的更新是批量的，是异步执行的
    this.setState({ number: this.state.number + 1 })
    console.log(this.state);
    // this.setState({ number: this.state.number + 1 })
    // console.log(this.state);
    // this.setState((number)=>{
      

    // })

    // 如果直接修改state的话，this.state确实改变了，但视图不会更新
    // this.state.number += 1;

    // Cannot add property title, object is not extensible
    // this.props.title = '新标题';
  }
  render () {
    return (
      <div>
        <p>{this.props.title}</p>
        <p>number:{this.state.number}</p>
        <p>age:{this.state.age}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}


ReactDOM.render(
  <Counter />, document.getElementById('root')
)
