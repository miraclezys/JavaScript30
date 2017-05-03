# 17 - Sort Without Articles  

## 任务介绍

对乐队名称去冠词进行排序

## 效果预览

[点击查看效果](https://miraclezys.github.io/JavaScript30/17%20-%20Sort%20Without%20Articles/index-ME.html)

## 步骤

1. 对乐队名称去冠词排序

   1. 实现函数`strip()` ，实现乐队名称去冠词

      在这里，冠词是a, an, the

      ```javascript
      function strip(bandName) {
          return bandName.replace(/^(a |the |an )/i, '').trim();
      }
      ```

   2. 根据已去冠词的名称进行排序：

      ```javascript
      const sortBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);
      ```

2. 将排序后的结果进行呈现

   ```javascript
   document.querySelector('#bands').innerHTML = 
       sortBands
         .map(band => `<li>${band}</li>`)
         .join('');
   ```

   ​

   ​

   ​

   ​

