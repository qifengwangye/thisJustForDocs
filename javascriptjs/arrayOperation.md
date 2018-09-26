### 一、concat()
* concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，仅会返回被连接数组的一个副本。
```js
  const arr1 = [1, 2, 3]
  const arr2 = [4, 5]
  const arr3 = arr1.concat(arr2)
  console.log(arr1) // [1, 2, 3]
  console.log(arr3) // [1, 2, 3, 4, 5]
```

### 二、join()
* join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的，默认使用', '号分割，不改变原数组。
```js
  const arr = [2, 3, 4]
  console.log(arr.join()) // 2, 3, 4
  console.log(arr) // [2, 3, 4]
```

### 三、push()
* push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。末尾添加，返回的是长度，会改变原数组。
```js
  const a = [1, 2, 3]
  const b = a.push(4)
  console.log(a) // [1, 2, 3]
  console.log(b) // [1, 2, 3, 4]
  push方法可以一次添加多个元素: a.push(data1, data2, data3, ...)
```

### 四、pop()
* pop() 方法用于删除并返回数组的最后一个元素。返回最后一个元素，会改变原数组。
```js
  let arr = [1, 2, 3]
  console.log(arr.pop()) // 3
  console.log(arr) // [1, 2]
```

### 五、shift()
* shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。返回第一个元素的值，改变原数组
```js
  let arr = [1, 2, 3]
  console.log(arr.shift()) // 1
  console.log(arr) // [2, 3] 
```

### 六、unshift()
* unshift()方法可向数组的开头添加一个活更多元素，并返回新的长度。返回新长度，改变原数组
```js
  let arr = [1, 2, 3, 4]
  console.log(arr.unshift(1, 6)) // 6
  console.log(arr) // [3, 6, 1, 2, 3, 4]
  该方法可以不传参，不传参就是不增加元素
```

### 七、slice(start, end)
返回一个新的数组，包含从`start`到`end`(不包括该元素)的 `arrayObject`中的元素。返回选定的元素，该方法`不会`修改原数组，会创建一个新数组
```js
  let arr = [1, 2, 3, 4]
  const arr2 = arr.slice(1, 3)
  console.log(arr2) // [2, 3]
  console.log(arr) // [1, 2, 3, 4]
```

### 八、splice(index, length, (object))
splice() 从`index`开始，到`length`位置的元素被删除，若存在第三个参数`object`，则将`object`的值顶替被删除位置的元素，splice() 方法会直接对数组进行修改。
```js
  let a = [5, 6, 7, 8]
  a.splice(1, 0, 9) // []
  a // [5, 9, 6, 7, 8]
  let b = [5, 6, 7, 8]
  b.splice(1, 2, 3) // [6, 7]
  b // [5, 3, 8]
```

### 九、substring(startIndex, (endIndex))和substr(startIndex, (length))
* 相同点： 如果只是写一个参数，两者的作用都一样：都是是截取字符串从当前下标以后直到字符串最后的字符串片段。
```js
  let str = '123456'
  str.substring(2) // '3456'
  str.substring(2) // '3456'
```
* 不同点： `substring(startIndex, endIndex)`第二个参数是截取字符串的最终下标(不包含)，而`substr(startIndex, length)`的第二个参数是截取字符串的长度
```js
  let str = '123456789'
  str.substring(2, 5) // '345'
  str.substr(2, 5) // '34567'
```

### 十、sort({ sortNumber })排序
* sort() 方法用于对数组的元素进行排序。按照 Unicode code 位置排序，默认升序
```js
  let arr = [George, John, Thomas, James, Adrew, Martin]
  arr.sort() // [Adrew, George, James, John, Martin, Thomas]
```
```js
  let arr = [10, 5, 40, 25, 1000, 1]
  const sortNumber = (a, b) => {
    return a - b
  }
  arr.sort(sortNumber) // [1, 5, 10, 25, 40, 1000]
```

### 十一、recerse()
* reverse() 方法用于颠倒数组中元素的顺序。返回的是颠倒后的数组，会改变原数组
```js
  let arr = [2, 3, 4]
  arr.reverse()
  arr // [4, 3, 2]
```

### 十二、indexOf(value, index) 和 lastIndexOf(value, index)
* `value`: 查找的值, `index`： 起始位置。若不存在，返回-1， 若存在，返回位置。 `indexOf`是从前往后找，`lastIndexOf`是从后往前找。
```js
  let arr = [1, 2, 3, 4, 5, 4, 2, 7, 6, 4, 1]
  arr.indexOf(1) // 0
  arr.indexOf(1, 0) // 0
  arr.indexOf(1, 2) // 10
  arr.lastIndexOf(1) // 10
  arr.lastIndexOf(1, 10) // 10 
  arr.lastIndexOf(1, 9) // 0 
```

### 十三、every()
* 对数组的每一项都运行给定的函数，若`每一项`都返回`true`，则返回`true`
```js
  const compareFn = (value, index, array) => {
    return value < 10
  }
  const arr = [1, 3, 3, 5, 7, 8, 4, 3]
  arr.every(compareFn) // true
```

### 十四、some()
* 对数组的每一项都运行给定的函数，`任意一项`都返回`ture`,则返回`true`
```js
  const compareFn = (value, index, array) => {
    return value > 10
  }
  const arr = [11, 3, 3, 5, 7, 8, 4, 3]
  arr.some(compareFn) // true
```

### 十五、filter()
* 对数组的每一项都运行给定的函数，返回 结果为`ture`的项组成的数组
```js
  const arr = ['wer', 'werewrewre', 'werewre', 'were', 'werewew', 'werewrewrewrew', 'wes']
  const arrs = arr.filter((value) => {
    return value.length > 6
  })
  // arrs = ['werewrewre', 'werewew', 'werewrewrewrew']
```

### 十六、map()
* 对数组的每一项都运行给定的函数，返回每次函数调用的结果组成一个`新数组`
```js
  const num = [1,2,4,5]
  const double = num.map((item) => {
    return item * 2
  })
  num // [1, 2, 4, 5]
  double // [2, 4, 8, 10]
```

### 十七、forEach()
* 遍历数组
```js
  const arr = ['test1', 'test2', 'test3']
  const copy = []
  arr.forEach((item) => {
    copy.push(item)
  })
  copy // ['test1', 'test2', 'test3']
```
