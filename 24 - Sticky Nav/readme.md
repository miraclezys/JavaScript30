# 24 - Sticky Nav  

## 任务介绍

实现当页面往下滑动时，标题栏固定在页面上方，logo显示出来。当页面再往上滑动时，恢复原来的样式。

## 效果预览

[点击查看效果](https://miraclezys.github.io/JavaScript30/24%20-%20Sticky%20Nav/index-ME.html)

## 相关知识点

* [SpeechSynthesis](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis)
* [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)
* [HTML5语音合成Speech Synthesis API简介](http://www.zhangxinxu.com/wordpress/2017/01/html5-speech-recognition-synthesis-api/)

## 步骤

1. 当页面滑动导航栏(nav)位置时，给`body`的`classList`添加`fixed-nav`。

   ```javascript
   const nav = document.querySelector('#main');
       let topOfNav = nav.offsetTop;

       function fixNav() {
           if(scrollY >= topOfNav) {
               document.body.classList.add('fixed-nav');
               document.body.style.paddingTop = nav.offsetHeight + 'px';
           }
           else {
               document.body.classList.remove('fixed-nav');
               document.body.style.paddingTop = 0;
           }
       }

   window.addEventListener('scroll', fixNav);
   ```

   当页面滚动到导航栏(nav)的位置时，给`body`的`classList`添加`fixed-nav` ，这是便于在`.css`文件中修改相应的样式。在添加了`fixed-nav`后，导航栏就会固定在页面上方，即设定`position: fixed`，那么导航栏就会脱离正常文档流，那么文章正文就会占据原本导航栏的位置。这就有种跳跃的效果，不太美观，所以我们可以再添加了`fixed-nav`之后，设置`document.body.style.paddingTop = nav.offsetHeight + 'px'`，就能维持原本文章正文的位置了。

2. 设置导航栏固定

   ```css
   body.fixed-nav nav {
     position: fixed;
     box-shadow:0 5px 0 rgba(0,0,0,0.1);
   }
   ```

3. 设置logo显示

   ```css
   .fixed-nav li.logo {
     max-width: 500px;
   }
   ```

   如果这里设置`max-width: auto`，就不会有logo显示出来的效果，logo的宽会一直是0

4. 设置正文的样式

   ```javascript
   body.fixed-nav .site-wrap {
     transform: scale(1);
   }
   ```

   ​

