# 18 - Adding Up Times with Reduce  

## 任务介绍

计算视频的总时长，并以小时，分钟，秒的形式输出

## 效果预览

[点击查看效果](https://miraclezys.github.io/JavaScript30/18%20-%20Adding%20Up%20Times%20with%20Reduce/index-ME.html)

结果在控制台上哦

## 相关知识点

[Math.floor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)

## 步骤

1. 获取有`data-time`属性的元素

   ```javascript
   const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
   ```

2. 计算视频的总时长

   ```javascript
   const seconds = timeNodes
       .map(node => node.dataset.time)
       .map(node => {
         const [mins, secs] = node.split(':').map(parseFloat);
         return mins * 60 + secs;
       })
       .reduce((total, node) => total + node);
   ```

3. 将视频总时长以小时，分钟，秒的形式输出

   ```javascript
   let secondsLeft = seconds;
   const hours = Math.floor(secondsLeft / 3600);
   secondsLeft = secondsLeft % 3600;

   const mins = Math.floor(secondsLeft / 60);
   secondsLeft = secondsLeft % 60;

   console.log(hours, mins, secondsLeft);
   ```

   ​​


