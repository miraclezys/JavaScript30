# 14 - JavaScript References VS Copying 

## 任务介绍

了解引用和复制

## 效果预览

[点击查看效果](https://miraclezys.github.io/JavaScript30/14%20-%20JavaScript%20References%20VS%20Copying/index-ME.html)

## 相关知识点

* [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

## 步骤

1. 对strings, numbers, booleans进行拷贝，分别修改它们的值查看变化

   ```javascript
   let age = 100;
   let age2 = age;
   console.log(age, age2);		// 100 100
   age = 200;
   console.log(age, age2);		// 200 100

   let name = "hello";
   let name2 = name;
   console.log(name, name2);	// hello hello
   name = "world";
   console.log(name, name2);	// world hello

   let jug = true;
   let jug2 = jug;
   console.log(jug, jug2);		// true true
   jug = false;
   console.log(jug, jug2);		// false true
   ```
   可以看到修改`age`的值并不影响`age2`的值，修改`name`的值并不影响`name2`的值，修改`jug`的值并不影响`jug2`的值

2. 对数组进行拷贝，并修改数组的值查看变化

   ```javascript
   const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
   const team = players;
   console.log(players, team);
   // ['Wes', 'Sarah', 'Ryan', 'Poppy']
   // ['Wes', 'Sarah', 'Ryan', 'Poppy']

   team[3] = "hello";
   console.log(players, team);
   // ['Wes', 'Sarah', 'Ryan', 'hello']
   // ['Wes', 'Sarah', 'Ryan', 'hello']

   players[1] = "a";
   console.log(players, team);
   // ['Wes', 'a', 'Ryan', 'hello']
   // ['Wes', 'a', 'Ryan', 'hello']
   ```

   可以从上面的结果看到，当修改`team`某一项的值时，`players`的值也会跟着改变。当修改`players`某一项的值时，`team`某一项的值也会跟着改变。`team`对`players`的拷贝是“浅拷贝”，获得的是`players`的引用。

   我们需要实现“深拷贝”，有下面几种实现方式：

   ```javascript
   // players: ['Wes', 'a', 'Ryan', 'hello']
   const team2 = players.slice();
   team2[3] = "candy";
   console.log(players, team2);
   // ['Wes', 'a', 'Ryan', 'hello']
   // ['Wes', 'a', 'Ryan', 'candy']
       
   const team3 = [].concat(players);
   team3[3] = "candy";
   console.log(players, team3);
   // ['Wes', 'a', 'Ryan', 'hello']
   // ['Wes', 'a', 'Ryan', 'candy']
     
   const team4 = [...players];
   team4[3] = "candy";
   console.log(players, team4);
   // ['Wes', 'a', 'Ryan', 'hello']
   // ['Wes', 'a', 'Ryan', 'candy']
   ```

   从结果可以看到，当我们修改`team2` ，`team3` ，`team4`的值时，并不影响`players`的值

3. 对对象进行拷贝，并修改对象的值查看变化

   ```javascript
   const person = {
        name: 'candy',
        age: 18
   };

   const person2 = person;
   console.log(person, person2);
   // Object {name: "candy", age: 18}
   // Object {name: "candy", age: 18}

   person2.number = 99;
   console.log(person, person2);
   // Object {name: "candy", age: 18, number: 99}
   // Object {name: "candy", age: 18, number: 99}

   const person3 = Object.assign({}, person, , {number: 88, age: 12});
   console.log(person, person3);
   // Object {name: "candy", age: 18, number: 99}
   // Object {name: "candy", age: 12, number: 88}

   person3.age = 19;
   console.log(person, person3);
   // Object {name: "candy", age: 18, number: 99}
   // Object {name: "candy", age: 19, number: 88}
   ```

   从结果上可以看到，如果我们直接使用等号对对象进行拷贝，比如`person2`，那么我们修改`person2`时，`person`也会跟着修改，因为拷贝的是对象的引用。当我们使用了`Object.assign()`方法拷贝对象的属性时，就不存在这个问题了(只针对拷贝的属性值不是数组或对象)。

   ```javascript
   const obj = {
        name: "candy",
        age: 100,
        social: {
             twitter: '@candy',
             facebook: 'candy.developer'
        }
   };

   const dev = Object.assign({}, obj);
   dev.social.twitter = '@cool';
   console.log(obj, dev);
   // Object {name: "candy", age: 100, social: {twitter: '@cool', facebook: 'candy.developer'}}
   // Object {name: "candy", age: 100, social: {twitter: '@cool', facebook: 'candy.developer'}}
   ```

   从结果可以看到，当修改`dev`的`social.twitter`的值时，`obj`的`social.twitter`的值也会改变。因为`Object.assign()`拷贝的是属性值，如果源对象的属性值是一个指向对象的引用，它只拷贝引用值，所以问题依然存在。

   ```javascript
   const dev2 = JSON.parse(JSON.stringify(obj));
   dev2.social.twitter = '@hot';
   console.log(obj, dev2);
   // Object {name: "candy", age: 100, social: {twitter: '@cool', facebook: 'candy.developer'}}
   // Object {name: "candy", age: 100, social: {twitter: '@hot', facebook: 'candy.developer'}}
   ```

   从结果可以看到，当修改`dev2`的`social.twitter`的值时，`obj`的`social.twitter`的值不会改变，问题解决了。


## 小tips

JavaScript中深拷贝和浅拷贝的区别？

> [参考这里](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)

* 浅拷贝只是对原对象各个属性进行一次复制，并不是递归的复制。由于JavaScript中对象的存储是使用地址进行存储的，所以对于对象的属性是数组或者一个对象，实际上拷贝的是一个内存地址，所以对拷贝的对象属性进行修改时，原对象可能存在被篡改的可能性。

  ```javascript
  function extendCopy(p) {
    	var c = {};
    	for(var i in p) {
        	c[i] = p[i];
    	}
    	c.uber = p;
    	return c;
  }

  var Doctor =  extendCopy(Chinese);
  ```

  比如给Chinese添加一个“出生地”的属性，它的值是一个数组：

  ```javascript
  Chinese.birthPlaces = ['北京','上海','香港'];
  ```

  通过extendCopy()函数，Doctor继承了Chinese

  ```javascript
  var Doctor = extendCopy(Chinese);
  ```

  然后，我们给Doctor的“出生地”添加一个城市：

  ```javascript
  Doctor.birthPlaces.push('厦门');
  ```

  但是此时，Chinese的“出生地”被改掉了：

  ```javascript
  alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
  alert(Chinese.birthPlaces); //北京, 上海, 香港, 厦门
  ```

* 深拷贝是指不仅对原对象的各个属性进行复制，当原对象的属性是数值或者对象时，使用递归复制到新对象上，那么当修改新对象的属性时，原对象就不会被修改了。

  ```javascript
  function deepCopy(p, c) {
    	var c = c || {};
    	for(var i in p) {
        	if(typeof p[i] === 'object') {
            	c[i] = (p[i].constructor === Array) ? [] : {};
            	deepCopy(p[i], c[i]);
        	}
        	else {
            	c[i] = p[i];
        	}
    	}
    	return c;
  }

  var Doctor = deepCopy(Chinese);
  ```

  现在，给父对象添加一个属性，属性的值为数组。然后在子对象上修改这个属性：

  ```javascript
  Chinese.birthPlaces = ['北京','上海','香港'];
  Doctor.birthPlaces.push('厦门');
  ```

  这是，父对象就不会受到影响啦。

  ```javascript
  alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
  alert(Chinese.birthPlaces); //北京, 上海, 香港
  ```

  ​

  ​