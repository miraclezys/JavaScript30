# 26 - Stripe Follow Along Nav  

## 任务介绍

实现鼠标悬浮在元素上时，出现下拉菜单

## 效果预览

[点击查看效果](https://miraclezys.github.io/JavaScript30/26%20-%20Stripe%20Follow%20Along%20Nav/index-ME.html)

## 步骤

1. 给每个需要设置下拉菜单的元素`tiggers`添加`mouseenter`事件监听器，当事件触发时，执行函数`handleEnter()`，即当鼠标移入元素时，实现菜单下拉效果

2. 给每个需要设置下拉菜单的元素`tiggers`添加`mouseleave`事件监听器，当事件触发时，执行函数`handleLeave()`，即当鼠标移入元素时，取消菜单下拉

3. 实现函数`handleEnter` ，即实现下拉菜单的效果

   1. 添加菜单下拉效果的相关`class`

      * 给`trigger`的`classList`添加`trigger-enter`
      * 在150毫秒后，给`trigger`的`classList`添加`trigger-enter-active` 。之所以在150毫秒后才添加，这样有一个较为简短的缓冲，带来更好的用户体验，

   2. 设置下拉菜单背景的相关属性

      ```javascript
      const dropdown = this.querySelector('.dropdown');
      const dropdownCoords = dropdown.getBoundingClientRect();
      const navCoords = nav.getBoundingClientRect();

      const coords = {
          height: dropdownCoords.height,
          width: dropdownCoords.width,
          top: dropdownCoords.top - navCoords.top,
          left: dropdownCoords.left - navCoords.left
      }

      background.classList.add('open');
      background.style.setProperty('width', `${coords.width}px`);
      background.style.setProperty('height', `${coords.height}px`);
      background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
      ```


      这里如果解释一下`coords.top`和`coords.left`为什么要这么计算？

      * `dropdownCoords.top`是指下拉菜单`dropdown`距离视口顶部的距离
      * `navCoords.top`是导航栏`nav`，也就是菜单距离视口顶部的距离
      * `background.offsetParent`是指背景的`offsetParent`是`nav`，也就是导航栏(菜单)，这个可以自己输出来看一下

      所以我们对`background`设置`translate(x, y)`是相对于`nav`设置的，因为`background`是作为下拉菜单`dropdown`的背景的，那么`background`左平移的距离应该是` dropdownCoords.left - navCoords.left` ，得到的值就是下拉菜单`dropdown`距离导航栏`nav`的水平距离。同理，`background`向下平移的距离应该是`dropdownCoords.left - navCoords.left`

4. 实现函数`handleLeave()` ，即移除下单菜单，其实也就是从`classList`移除相关`class`

   ```javascript
   function handleLeave() {
       this.classList.remove('trigger-enter', 'trigger-enter-active');
       background.classList.remove('open');
   }
   ```

   ​