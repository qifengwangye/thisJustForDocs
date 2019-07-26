* 斐波那契数列：`0，1，1，2，3，5，8，13，21...`使用数学归纳法可以看出其规律为：`f(n) = f(n-1) + f(n-2)`
* 首先直接使用递归（JavaScript实现）来求解第 n 项：f(n)
```js
  // 直接使用递归
  let num = 0;    // 用来记录fib函数执行次数，执行一次加一
  function fib(n) {
    num ++;
    if(n === 0) {
      return 0;
    }
    if(n === 1) {
      return 1;
    }
    return fib(n-1) + fib(n-2);
  }

  console.time("time used");
  console.log(`result is: ${fib(40)}`); // 102334155
  console.log(`fib() runned ${num} times`); // 331160281次
  console.timeEnd("time used"); // 1437.401123046875ms
```
* 每一次 fib 函数的调用都会有两个子 fib 函数调用，那么时间复杂度是 O(2^n) ，呈指`数级增长`,优化方案：把每一次的计算结果存下来：
### 记忆化搜索递归(自顶向下)
```js
  // 记忆化搜索，记录每次计算的结果
  let num = 0; // 用来记录fib函数执行次数，执行一次加一
  let totalnum = 40;
  let memory = new Array(totalnum).fill(-1);
  function fib(n) {
    num++;
    if(n === 0) {
      return 0;
    }
    if(n === 1) {
      return 1;
    }
    if(memory[n] === -1) {
      memory[n] = fib(n-1) + fib(n-2);  // 如果前面已经得到，直接使用
    } 
    return memory[n];
  }

  console.time("timer");
  console.log(`result is: ${fib(totalnum)}`); // 1
  console.log(`fib() runned ${num} times`); // 0.252197265625ms
  console.timeEnd("timer"); 
```
### 迭代法(自下向上)
```js
  let num = 0;
  function fib(n) {
    num++;
    let memory = new Array(n);
    memory[0] = 1;
    memory[1] = 1;
    for(let i = 2; i <= n; i++) {
      memory[i] = memory[i-1] + memory[i-2];  
    }
    return memory[n];
  }

  console.time("timer");
  console.log(`result is: ${fib(40)}`); // 1
  console.log(`fib() runned ${num} times`); //  0.237060546875ms
  console.timeEnd("timer");
 ```
