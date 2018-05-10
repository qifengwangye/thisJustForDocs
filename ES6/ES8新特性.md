## ES8
---
### 字符串填充
* `padStart`, `padEnd`
* 通过填充字符串的首部或者尾部来保证字符串达到固定的长度；开发者可以指定填充的字符串或者使用默认的空格
* 声明如下
```js
  //
  let str = 'sdffsdfds';
  str.padStart(targetLength [, padString]);
  str.padEnd(targetLength [, padString]);
```
* 函数的首个参数为目标长度，即最终生成的字符串长度；第二个参数即是指定的填充字符串
```js
  'es8'.padStart(2);          // 'es8'
  'es8'.padStart(5);          // '  es8'
  'es8'.padStart(6, 'woof');  // 'wooes8'
  'es8'.padStart(14, 'wow');  // 'wowwowwowwoes8'
  'es8'.padStart(7, '0');     // '0000es8'

  'es8'.padEnd(2);            // 'es8'
  'es8'.padEnd(5);            // 'es8  '
  'es8'.padEnd(6, 'woof');    // 'es8woo'
  'es8'.padEnd(14, 'wow');    // 'es8wowwowwowwo'
  'es8'.padEnd(7, '6');       // 'es86666'
```
* `padStart`将字符串填充在左边，若长度小于当前字符串长度，字符串不变化，若长度大于当前字符串长度，用当目标长度减去当前字符串长度所得只差从左至右遍历注入填充值。
* `padEnd`将字符串填充在右边，若长度小于当前字符串长度，字符串不变化，若长度大于当前字符串长度，用当目标长度减去当前字符串长度所得只差从左至右遍历注入填充值。
### 对象值遍历
* `Object.values()`, `Object.entries()`
* Object.values 函数会返回指定对象的可枚举的属性值数组，数组中值顺序与 for-in 循环保持一致，函数的声明为
```js
  Object.values(obj);
```
```js
  const obj = { x: 'xxx', y: 1 };
  Object.values(obj); // ['xxx', 1]

  const obj = ['e', 's', '8']; // same as { 0: 'e', 1: 's', 2: '8' };
  Object.values(obj); // ['e', 's', '8']

  // when we use numeric keys, the values returned in a numerical 
  // order according to the keys
  const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
  Object.values(obj); // ['yyy', 'zzz', 'xxx']
  Object.values('es8'); // ['e', 's', '8']
```
* Object.entries 方法则会将某个对象的可枚举属性与值按照二维数组的方式返回，数组中顺序与 Object.values 保持一致，该函数的声明与使用为
```js
  const obj = { x: 'xxx', y: 1 };
  Object.entries(obj); // [['x', 'xxx'], ['y', 1]]

  const obj = ['e', 's', '8'];
  Object.entries(obj); // [['0', 'e'], ['1', 's'], ['2', '8']]

  const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
  Object.entries(obj); // [['1', 'yyy'], ['3', 'zzz'], ['10': 'xxx']]
  Object.entries('es8'); // [['0', 'e'], ['1', 's'], ['2', '8']]
```
### 对象属性描述符获取
* getOwnPropertyDescriptors 函数会返回指定对象的某个指定属性的描述符；该属性必须是对象自己定义而不是继承自原型链，函数的声明为
```js
  Object.getOwnPropertyDescriptor(obj, prop);
```
* obj 即为源对象，而 prop 即为需要查看的属性名；结果中包含的键可能有 configurable、enumerable、writable、get、set 以及 value。
```js
  const obj = { get es8() { return 888; } };
  Object.getOwnPropertyDescriptor(obj, 'es8');
  // {
  //   configurable: true,
  //   enumerable: true,
  //   get: function es8(){}, //the getter function
  //   set: undefined
  // }
```
### 异步函数
* ES8 中允许使用 async/await 语法来定义与执行异步函数，async 关键字会返回某个 AsyncFunction 对象；在内部实现中虽然异步函数与迭代器的实现原理类似，但是其并不会被转化为迭代器函数：
```js
  function fetchTextByPromise() {
    return new Promise(resolve => { 
      setTimeout(() => { 
        resolve("es8");
      }, 2000);
    });
  }
  async function sayHello() { 
    const externalFetchedText = await fetchTextByPromise();
    console.log(`Hello, ${externalFetchedText}`); // Hello, es8
  }
  sayHello();

  console.log(1);
  sayHello();
  console.log(2);

  // 调用结果
  1 // immediately
  2 // immediately
  Hello, es8 // after 2 seconds
```
