# 07 - Array Cardio Day 2 

## 任务介绍

了解Array的相关方法

## 效果预览

[点击查看效果](https://miraclezys.github.io/JavaScript30/07%20-%20Array%20Cardio%20Day%202/index-ME.html)

### 相关知识点

* [Array.prototype.some()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
* [Array.prototype.every()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
* [Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
* [Array.prototype.splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
* [扩展语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)

## 步骤

> 认真看一下上面的方法就能做出来啦

1. 判断`persons`中是否有至少一个人大于或等于19岁？
2. 判断`persons`中是否所有人都大于或等于19岁？
3. 查找`comments`中是否有一条评论中的`id`是823423
4. 查找`comments`中评论的`id`是823423的`index`，并将该评论从`comments`中删除

## 小tips

删除数组指定的一个元素，下面说两种办法：

比如想要删除`comments`数组中index为2的元素

1. 使用`Array.prototype.slice()`

   可以将新的数组分为原`comments`数组[0,1]和[3,...]两个子数组进行组合

   ```javascript
   const newComments = [...comments.slice(0, index), ...comments.slice(index+1)];
   ```

2. 使用`Array.prototype.splice()`

   ```javascript
   comments.splice(index, 1);
   ```

   ​

​	