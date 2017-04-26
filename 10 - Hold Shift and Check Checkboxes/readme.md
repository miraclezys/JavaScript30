# 10 - Hold Shift and Check Checkboxes

## 任务介绍

实现按住`shift`键，当前选中的按钮和上一次选中的按钮之前的选择项都被选中

## 效果预览

[点击查看效果](https://miraclezys.github.io/JavaScript30/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index-ME.html)

![show](./image/a.gif)

## 步骤

1. 找出所有符合`.inbox input[type="checkbox"]`选择器的`input`元素，就是对应列表左边的选择框

2. 给每个`input`元素添加`click`事件，当`input`元素被点击时，执行函数`handleCheck()`

3. 实现函数`handleCheck()` ：当按下`shift`键时，当前选中的按钮和上一次选中的按钮之前的选择项都被选中

   如何实现呢？

   1. 首先我们需要在函数外定义一个变量`lastCheck`用来保存上一次选中的按钮

   2. 在函数内定义标记位`inBetween`初始值为false，`inBetween`用于判断哪些在按住`shift`键时，哪些选择项需要被选中

   3. 当点击了选择框，并且按住了`shift`键，并且该选择框是已经被选中了：

      对所有的`input`进行遍历：

      * 当前遍历的`input`等于`lastCheck`或等于当前按下的`input`，即`this` ，那么修改`inBetween`的值：`inBetween = !inBetween`
      * 如果`inBetween`的值为`true`，当前遍历的`input`的`checked`属性修改为`true`

   4. 更新`lastCheck`的值

   好像文字说明有点看不懂，觉得还是直接看代码比较清楚：

   ```javascript
   const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"');

   let lastCheck;

   function handleCheck(event) {
     	let inBetween = false;

     	if(event.shiftKey && this.checked) {
       	checkboxes.forEach(checkbox => {
               if(checkbox === lastCheck || checkbox === this) {
                   inBetween = !inBetween;
               }

               if(inBetween) {
                    checkbox.checked = true;
               }
       	});
     	}
     
     	lastCheck = this;
   }

   checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
   ```

   ​

   ​

   ​

   ​

