function foo() {
  this.a = 1;
}
foo.prototype = {
  test: function () {
    console.log("test");
  },
};
console.log(foo.__proto__);

const nFoo = new foo();
nFoo.test();
console.log(nFoo.hasOwnProperty("test"));
console.log(nFoo.hasOwnProperty("a"));
console.log(foo.hasOwnProperty("test"));
console.log(foo.hasOwnProperty("a"));
