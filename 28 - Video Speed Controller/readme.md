# 28 - Video Speed Controller  

## 任务介绍

鼠标移动调速条修改视频的速度

## 效果预览

[点击查看效果](https://miraclezys.github.io/JavaScript30/28%20-%20Video%20Speed%20Controller/index-ME.html)

![show](./image/a.gif)

## 相关知识点

* [Web Audio playbackRate explained](https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/WebAudio_playbackRate_explained)

## 步骤

1. 给调速条添加事件`mousemove`的监听器，当事件触发时执行函数`handleMove()`

2. 实现函数`handleMove()`

   1. 根据鼠标的位置修改调速条的显示长度

      ```javascript
      const y = event.pageY - this.offsetTop;
      const percent = y / this.offsetHeight;
      const height = Math.round(percent * 100) + '%';
      bar.style.height = height;
      ```

      `y`指的是鼠标当前的位置距离调速条顶部的距离，也就是当前鼠标位置距离文档顶部的距离减去调速条顶部的距离距离文档顶部的距离

      然后在求出`y`的值站调速条高度的比重，利用百分比更新调速条显示的高度即可

   2. 更新目前视频播放速度的数值

      ```javascript
      const min = 0.4;
      const max = 4;
      const playbackRate = percent * (max - min) + min;
      bar.textContent = playbackRate.toFixed(2) + 'x';
      ```

   3. 更新视频当前的播放速度

      ```javascript
      video.playbackRate = playbackRate;
      ```


