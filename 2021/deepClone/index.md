# 深拷贝和浅拷贝

## 前言

先来了解几个基本概念

### 基本类型

我们都知道JavaScript中的基本数据类型有：

- Null
- Number
- String
- Boolean
- Undefined
- Symbol（ES6新增）

基本数据类型都是一些简单的数据段，它们是存储在栈内存中。

### 引用类型

JavaScript中的引用数据类型有：

- Array
- Object

引用数据类型是保存在堆内存中的，然后再栈内存中保存一个对堆内存中实际对象的引用。所以，JavaScript中对引用数据类型的操作都是操作对象的引用而不是实际的对象。

可以理解为，栈内存中保存了一个地址，这个地址和堆内存中的实际值是相关的。

浅拷贝和深拷贝都是对于引用类型来说的，基本类型都是直接在栈内存中生成

## 浅拷贝

字面意思，只是重新生成一个栈内存，但是栈内存的引用还是同一个堆内存

```jsx
let a = { b: 123 }
let b = a;
a.b = 12;

console.log(a); // { b: 12 }
console.log(b); // { b: 12 }

let c = [1, 2, 3, 4];
let d = c;
d.push(5);

console.log(a); // [1, 2, 3, 4, 5]
console.log(b); // [1, 2, 3, 4, 5]
```

可以看到通过简单的`=`对引用类型拷贝，只是拷贝了引用值，指向的堆内存是一致的。

## 深拷贝

在浅拷贝的基础上，拷贝数据到新的内存空间，这个时候数据指向的是一个全新的内存地址和引用

主要使用的两种深拷贝方式

- `JSON.stringify`和`JSON.parse`
- 递归判断

### `JSON.stringify`和`JSON.parse`

JSON.stringify先将数据转化成JSON类型的字符串，然后再通过JSON.parse把JSON类型的字符串转成对应的数据

```jsx
let a = { b: 'b', c: 'c' };
let d = JSON.stringify(a);
console.log(d); // {"b":"b","c":"c"}

let e = JSON.parse(d);
console.log(e); // { b: 'b', c: 'c' }
```

通过这样的方式生成的是一个指向新的内存地址的数据

### 递归判断

递归的思想就很简单了，就是对每一层的数据都实现一次 `创建对象->对象赋值` 的操作

```jsx
function deepClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const target = obj.constructor === Array ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj !== null) {
        target[key] = deepClone(obj[key]);
      } else {
        target[key] = obj[key];
      }
    }
  }

  return target;
}
```

测试下

```jsx
let a = { b: 123, c: [12, 123], d: { f: 123, g: { h: [3, 4, 5] } } };
let b = deepClone(a);

console.log(b, a === b);
// { b: 123, c: [12, 123], d: { f: 123, g: { h: [3, 4, 5] } } }, false
```

## JavaScript中的方法

**`concat` 只是对数组的第一层进行深拷贝。**

**`slice` 只是对数组的第一层进行深拷贝。**

**`Object.assign()` 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。**

## 总结

1. 赋值运算符 `=` 实现的是浅拷贝，只拷贝对象的引用值；
2. JavaScript 中数组和对象自带的拷贝方法都是“首层浅拷贝”；
3. `JSON.stringify` 实现的是深拷贝，但是对目标对象有要求；
4. 若想真正意义上的深拷贝，请递归。

## 升级：实现JSON.stringify和parse

### `JSON.stringify(*value*[, *replacer* [, *space*]])`

目标实现一个简易版的只包含value参数

处理逻辑包含如下

- 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
- `undefined`、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，如`JSON.stringify(function(){})` or `JSON.stringify(undefined)`.
- 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
- 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。
- Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
- NaN 和 Infinity 格式的数值及 null 都会被当做 null。
- 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

```jsx
function stringify(obj) {
  var result = "";
  var curVal;
  if (obj === null) {
    return String(obj);
  }

  switch (typeof obj) {
    case "number":
    case "boolean":
      return String(obj);
    case "string":
      return '"' + obj + '"';
    case "undefined":
    case "function":
      return undefined;
  }

  switch (Object.prototype.toString.call(obj)) {
    case "[object Array]":
      result += '[';
      for (let i = 0, len = obj.length; i < len; i++) {
        curVal = stringify(obj[i]);
        result += (curVal === undefined ? null : curVal) + ", ";
      }
      if (result !== '[') {
        result = result.slice(0, -1);
      }
      result += ']';
      return result;
    case "[object Date]":
      return '"' + obj.toJSON ? obj.toJSON() : obj.toString + '"';
    case "[object RegExp]":
      return "{}";
    case "[object Object]":
      result += '{';
      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          curVal = stringify(obj[i]);
          if (curVal !== undefined) {
            result += '"' + i + '":' + curVal + ",";
          }
        }
      }
      if (result !== '{') {
        result = result.slice(0, -1);
      }
      result += '}';
      return result;
    case "[object String]":
      return '"' + obj.toString() + '"';
    case "[object Number]":
    case "[object Boolean]":
      return obj.toString();
  }
}
```

### `JSON.parse(text[, reviver])`

利用eval函数

```jsx
function parse(obj) {
  return eval("(" + obj + ")");
}
```