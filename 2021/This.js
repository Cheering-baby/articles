// 全局环境执行this
function nodeFunc() {
  console.log(this === globalThis);
}

// nodeFunc();

var obj = { a: "Custom" };
var a = "Global";

function whatThis() {
  return this.a;
}

// console.log(whatThis());
// console.log(whatThis.apply(obj));
// console.log(whatThis.call(obj));

var person = {
  name: "lemon tree",
  age: 25,
};
function say(job) {
  console.log(this.name + ":" + this.age + " " + job);
}
// say.call(person, "test"); // lemon tree:25 test
// say.apply(person, ["test"]); // lemon tree:25 test

function f() {
  return this.a;
}
var g = f.bind({ a: "test" });
console.log(g()); // test

var h = g.bind({ a: "123" });
console.log(h()); // test

// 创建一个含有bar方法的obj对象，
// bar返回一个函数，
// 这个函数返回this，
// 这个返回的函数是以箭头函数创建的，
// 所以它的this被永久绑定到了它外层函数的this。
// bar的值可以在调用中设置，这反过来又设置了返回函数的值。
var obj = {
  bar: function () {
    var x = () => this;
    return x;
  },
};

// 作为obj对象的一个方法来调用bar，把它的this绑定到obj。
// 将返回的函数的引用赋值给fn。
var fn = obj.bar();

// 直接调用fn而不设置this，
// 通常(即不使用箭头函数的情况)默认为全局对象
// 若在严格模式则为undefined
console.log(fn() === obj); // true

// 但是注意，如果你只是引用obj的方法，
// 而没有调用它
var fn2 = obj.bar;
// 那么调用箭头函数后，this指向window，因为它从 bar 继承了this。
// console.log(fn2()() == window); // true

var o = {
  f: function () {
    return this.a + this.b;
  },
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
