# 16 - Mouse Move Shadow  

## 任务介绍

实现鼠标移动时，阴影跟着鼠标的方向移动

## 效果预览

[点击查看效果](https://miraclezys.github.io/JavaScript30/16%20-%20Mouse%20Move%20Shadow/index-ME.html)

## 步骤

1. 给`hero`添加事件`mousemove`的监听器，当事件触发时执行函数`shadow`

   1. 获取鼠标相对于浏览器窗口的位置：

      因为`<h1>`是`hero`的子元素，所以在触发事件`mousemove`的时候，`event.target`可能由`hero`变成`<h1>`。如果我们想通过`event.offsetX`和`event.offsetY`来获取当前鼠标相对于浏览器窗口的位置，就需要分情况讨论了：

      * 当`event.target`是`hero`，由于`hero`的高度是`min-height: 100vh` ，相当于占满整个窗口所以可以直接通过`x = event.offsetX`和`y = event.offsetY`来获取当前鼠标相对于浏览器窗口的位
      * 当`event.target`是`<h1>`， 此时鼠标相对于浏览器窗口的横坐标等于`x = event.offsetX + hero.offsetLeft`， 纵坐标等于`y = event.offsetY + hero.offsetTop`

   2. 计算阴影的位置：

      `walk`指的是阴影的范围

      ```javascript
      let { offsetWidth: width, offsetHeight: height } = hero;

      let xWalk = Math.round((x / width * walk) - (walk / 2));
      let yWalk = Math.round((y / height * walk) - (walk / 2));
      ```

   3. 设置阴影效果：

      ```javascript
      text.style.textShadow = `
          ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
          ${-1 * xWalk}px ${yWalk}px 0 rgba(0,255,255,0.7),
          ${xWalk}px ${-1 * yWalk}px 0 rgba(0,255,0,0.7),
          ${-1 * xWalk}px ${-1 * yWalk}px 0 rgba(0,0,255,0.7)
      `;
      ```

      ​​​


