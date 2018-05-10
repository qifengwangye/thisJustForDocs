## ES7 
### Array.prototype.includes
  * 用法： 替代indexOf,用于检查数组中是否存在值
```js
  // indexOf:
  let arr = ['react', 'angular', 'vue'];

  if (arr.indexOf('react') !== -1) {
    console.log('Can use React');
  }

  //或者使用一点点hack 位运算符 ~ 使代码更加紧凑一些，因为~（位异或）对任何数字相当于-(a + 1):
  if (~arr.indexOf('react')) {
    console.log('Can use React');
  }

```
```js
  let arr = ['react', 'angular', 'vue'];

  if (arr.includes('react')) {
    console.log('Can use React');
  }

  //还能在字符串中使用includes
  let str = 'React Quickly';

  if (str.toLowerCase().includes('react')) {  // true
    console.log('Found "react"');
  }
```
### 求幂运算
```js
  const a = 7 ** 12;
  const b = 2 ** 7;
  console.log(a === Math.pow(7,12)); // true
  console.log(b === Math.pow(2,7)); // true
```
```js
  let a = 7;
  a **= 12;
  let b = 2;
  b **= 7;
  console.log(a === Math.pow(7,12)); // true
  console.log(b === Math.pow(2,7)); // true
```
