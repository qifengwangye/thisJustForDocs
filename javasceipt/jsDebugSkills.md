js调试技巧：

一：`console`命令：

(1) 显示信息: console.log

(2) 占位符: 字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）
```javascript
  console.log('%fxxx%dyyy%o.azzz', 1.2, 2.2, {a:3,b:4})// 1.2xxx2yyy{a: 3, b: 4}.azzz
```

(3) 信息分组
```javascript
  console.group("第一组信息");    　　　　
  console.log("第一组第一条:我的博客(http://cllgeek.github.io)");
  console.log("第一组第二条:blog(http://www.cllgeek.com)");
  console.groupEnd();
  console.group("第二组信息");
  console.log("第二组第一条:程序爱好者： 495489065");
  console.log("第二组第二条:欢迎你加入");
  console.groupEnd();
```
(4) 查看对象的信息
```javascript
	const info = {
	  blog: "http://cllgeek.github.io",
	  : 495489065,
	  message: "程序爱好者欢迎你的加入"
	};
	console.dir(info);
```
(5) 显示某个节点的内容
```html
<body>
    <div id="info">
        <h3>我的博客：cllgeek.github.io</h3>
        <p>程序爱好者:495489065,欢迎你的加入</p>
    </div>
    <script type="text/javascript">
    var info = document.getElementById('info');
    console.dirxml(info);
    </script>
</body>
```
(6) 追踪函数的调用轨迹
```javascript
  function add(a, b) {
    console.trace();　　　　
    return a + b;　　
  }　　
  var x = add3(1, 1);　　
  function add3(a, b) {
    return add2(a, b);
  }　　
  function add2(a, b) {
    return add1(a, b);
  }　　
  function add1(a, b) {
    return add(a, b);
  }
```
(7) 计时功能
```javascript
  console.time("控制台计时器一");　　
  for (var i = 0; i < 1000; i++) {　　　　
    for (var j = 0; j < 1000; j++) {}　　
  }　　
  console.timeEnd("控制台计时器一");
```
(8) console.profile()的性能分析
```javascript
  function All() {
    alert(11);　　　　
    for (var i = 0; i < 10; i++) {
      funcA(1000);
    }　　　　
    funcB(10000);　　
  }
　　
  function funcA(count) {　　　　
    for (var i = 0; i < count; i++) {}　　
  }

  function funcB(count) {　　　　
    for (var i = 0; i < count; i++) {}　　
  }
　　
  console.profile('性能分析器');　　
  All();　　
  console.profileEnd();
```
(9) 把 objects 输出成表格
```javascript
  var animals = [
    { animal: 'Horse', name: 'Henry', age: 43 },
    { animal: 'Dog', name: 'Fred', age: 13 },
    { animal: 'Cat', name: 'Frodo', age: 18 }
  ];
  console.table(animals);
```
二： `debugger`:
- 简单暴力,只要把它写到代码里，Chrome 运行的时候就会自动自动停在那。你甚至可以用条件语句把它包裹起来，这样就可以在需要的时候才执行它。
