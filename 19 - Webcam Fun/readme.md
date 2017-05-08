# 19 - Webcam Fun  

## 任务介绍

实现模拟摄像头，将摄像头的图像实时显示到canvas中，能够对截取摄像头的图像并进行保存，能够给摄像头添加相应的滤镜

## 效果预览

[点击查看效果](https://miraclezys.github.io/JavaScript30/19%20-%20Webcam%20Fun/index.html)

## 相关知识点

* [URL.createObjectURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL)
* [CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)
* [CanvasRenderingContext2D.getImageData()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)
* [CanvasRenderingContext2D.putImageData()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData)
* [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)
* [使用 download 属性保存画布为PNG格式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#使用_download_属性保存画布为PNG格式)

## 步骤

1. 配置本地服务器

   如果直接[点击这里](http://htmlpreview.github.io/?https://github.com/miraclezys/JavaScript30/blob/master/19%20-%20Webcam%20Fun/index.html)查看效果，会发现报如下错误：

   ```
   DOMException: Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).
   ```
   指的是需要在安全连接下，才能获取摄像头信息。

   [安全连接](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features)：

   - (https, *, *)
   - (wss, *, *)
   - (*, localhost, *)
   - (*, 127/8, *)
   - (*, ::1/128, *)
   - (file, *, —)
   - (chrome-extension, *, —) 

   所以我们可以配置一个本地服务器(localhost)来查看效果。

   我们可以在文件`package.json`看到声明了项目中所使用的模块以及项目的配置信息。接着我们使用命令`npm install`来根据`package.json`文件的配置信息下载所需要的模块。

   ```json
   "scripts": {
       "start" : "browser-sync start --server --files '*.css, *.html, *.js'"
     },

   "devDependencies": {
   	"browser-sync": "^2.12.5"
   }
   ```

   `script`字段指定了运行脚本命令的npm命令缩写，比如start指定了运行

   `npm run start`时所要执行的命令。

   `devDependencies`字段指定了项目开发所需要的模块

   我们可以看到开发所需要的模块[`browser-sync`](http://www.browsersync.cn/)，该模块能够创建本地服务器监听多种类型的文件并且能让浏览器实时，快速响应文件的更改。

   当我们完成模块按照后，就可以使用`npm start`启动服务器进行监听了。

   ```
   npm install
   npm start
   ```

2. 获取摄像头

   ```javascript
   function getVideo() {
     navigator.mediaDevices.getUserMedia({ video: true, audio: false })
       .then(localMediaStream => {
         console.log(localMediaStream);
         video.src = window.URL.createObjectURL(localMediaStream);
         video.play();
       })
       .catch(err => {
         console.error(`OH NO!!!`, err);
       });
   }

   getVideo();
   ```
   `MediaDevices.getUserMedia()`方法会提示用户允许使用一个视频/音频输入设备。

   ```javascript
   navigator.mediaDevices.getUserMedia(constraints)
   .then(function(mediaStream) { ... })
   .catch(function(error) { ... })
   ```

   * 如果用户允许，会返回一个`Promise`对象，然后`MediaStream`对象会作为此`Promise`对象的成功状态的回调函数参数。
   * 如果用户拒绝了许可或没有媒体可用，`PermissionDeniedError` 或者`NotFoundError`作为此`Promise`的失败状态的回调函数参数，在这里如果失败了会在控制台输出错误信息。
   * `constraints`指的是指定请求的媒体类型和对应的参数，包含了`video`和`audio`两个成员的`MediaStreamConstraints` 对象。在这里我们是请求用户的摄像头信息，不需要请求麦克风信息。
   * `URL.createObjectURL() `静态方法会创建一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 绑定。这个新的URL 对象表示指定的 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象。在这里是给`<video>`指定嵌入的视频的URL，就是摄像头的视频信息。

3. 将图像输出到canvas中

   ```javascript
   function paintToCanvas() {
   	const width = video.videoWidth;
   	const height = video.videoHeight;
   	canvas.width = width;
   	canvas.height = height;
   	return setInterval(() => {
   		ctx.drawImage(video, 0, 0, width, height);
   		let pixels = ctx.getImageData(0, 0, width, height);
   		pixels = redEffect(pixels);
   		//pixels = rgbSplit(pixels);
   		//pixels = greenScreen(pixels);
   		ctx.putImageData(pixels, 0, 0);
   	}, 16);
   }

   video.addEventListener('canplay', paintToCanvas);
   ```

   * `drawImage()`是指在`canvas`上绘制图像，第一个参数指的是绘制到上下文的元素，这里是`<video>` 。
   * `getImageData()`返回一个[`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)对象，用来描述canvas区域隐含的像素数据
   * `putImageData()`是指将数据从已有的 [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)对象绘制到`canvas`上。 

4. 输出图像

   ```javascript
   function takePhoto() {
   	snap.currentTime = 0;
   	snap.play();

   	const data = canvas.toDataURL('image/jpeg');
   	const link = document.createElement('a');
   	link.href = data;
   	link.setAttribute('download', 'img');
   	link.innerHTML = `<img src="${data}" alt="photo" />`;
   	strip.insertBefore(link, strip.firsChild);
   }
   ```

   * 每次点击保存图片按钮，都会有快门音效

     ```javascript
     snap.currentTime = 0;
     snap.play();
     ```

     是用于设置每次的快门音效

   * HTMLCanvasElement.toDataURL() 方法返回一个包含图片展示的 data URI，`image/jpeg`指的是图片的格式

   * 创建元素`<a>`显示图片，并且设置`download`属性，当点击图片时，可下载图片

5. 实现滤镜

   ```javascript
   function redEffect(pixels) {
   	for(let i=0; i<pixels.data.length; i+=4) {
   		pixels.data[i + 0] = pixels.data[i + 0] + 200;
   		pixels.data[i + 1] = pixels.data[i + 1] - 50;
   		pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
   	}
   	return pixels;
   }

   function rgbSplit(pixels) {
   	for(let i=0; i<pixels.data.length; i+=4) {
   		pixels.data[i - 150] = pixels.data[i + 0];
   		pixels.data[i + 500] = pixels.data[i + 1];
   		pixels.data[i - 550] = pixels.data[i + 2];
   	}
   	return pixels;
   }

   function greenScreen(pixels) {
   	const levels = {};

   	document.querySelectorAll('.rgb input').forEach((input) => {
   		levels[input.name] = input.value;
   	});

   	for(let i=0; i<pixels.data.length; i+=4) {
   		red = pixels.data[i + 0];
   		green = pixels.data[i + 1];
   		blue = pixels.data[i + 2];
   		alpha = pixels.data[i + 3];

   		if(red >= levels.rmin 
   			&& green >= levels.gmin
   			&& blue >= levels.bmin
   			&& red <= levels.rmax
   			&& green <= levels.gmax
   			&& blue <= levels.bmax) {
   			pixels.data[i + 3] = 0;
   		}
   	}
   	return pixels;
   }
   ```

   ​

