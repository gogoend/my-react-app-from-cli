import React, { useCallback, useEffect, useMemo, useState } from 'react';

const Counter: React.FC<{ count: number }> = (prop) => {
  return <p>{prop.count}</p>
}

function App() {
  const [x, setX] = useState(0)

  // const y = 2 * x + 1 // 这里没有缓存y，每次组件渲染会重新创建这个变量
  const y = useMemo(() => 2 * x + 1, [x]) // 缓存y，第二个参数应当使用包含在回调函数中的变量，表示y所依赖的变量，当第二个参数中某个变量（依赖项）发生变化时，将重新计算y的值

  // const changeX = () => setX(x+1)  // 这里没有缓存changeX函数，每次组件渲染会重新创建这个函数
  const changeX = useCallback(() => setX(x+1), [x]) // 缓存changeX函数。第二个参数应当使用包含在回调函数中的变量，表示changeX所依赖的变量，当第二个参数中某个变量（依赖项）发生变化时，将重新得到changeX函数
  //const changeX = useMemo(() => () => setX(x+1), [x]) // 上一行中useCallback等效写法

  useEffect(() => { document.title = y+'' }, [y]) // 当依赖变量发生变化时将会调用的函数。第二个参数可选，当不传第二个参数时则依赖全部变量

  return (
    <div>
      <button onClick={changeX}>x += 1</button>
      <Counter count={x}></Counter>
      <Counter count={y}></Counter>
    </div>
  );
}

export default App;
