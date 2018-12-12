/**
 * @Author: 王贺
 * @Date:   2018-10-09T21:26:32+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-12T22:33:26+08:00
 */



# js 教程，整理自wangdoc.com

----------
# 1.数据类型： 原始类型和复合类型
1.JavaScript 有三种方法，可以确定一个值到底是什么类型

https://wangdoc.com/javascript/types/general.html#typeof-运算符

2. typeof运算符 null 返回 object
3. instanceof运算符  可以区分对象
4. Object.prototype.toString方法

5. null是一个表示“空”的对象，转为数值时为0；undefined是一个表示"此处无定义"的原始值，转为数值时为NaN。
 Number({}) // NaN   Number([]) // 0
6. 如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。转换规则是除了下面六个值被转为false，其他值都视为true。
    undefined
    null
    false
    0
    NaN
    ""或''（空字符串）

7. 注意，空数组（[]）和空对象（{}）对应的布尔值，都是true
8. 数值精度和数值范围  https://wangdoc.com/javascript/types/number.html#数值精度
9. 根据国际标准 IEEE 754，JavaScript 浮点数的64个二进制位，从最左边开始，是这样组成的。
第1位：符号位，0表示正数，1表示负数
第2位到第12位（共11位）：指数部分
第13位到第64位（共52位）：小数部分（即有效数字）,小于1
符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度。

- 数值精度 -2^ 53  -  2^53
- 数值范围 -2^1075 - 2^1024
- 对于那些会自动转为科学计数法的数字，parseInt会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果。

		parseInt(1000000000000000000000.5) // 1
		// 等同于
		parseInt('1e+21') // 1

		parseInt(0.0000008) // 8
		// 等同于
		parseInt('8e-7') // 8

10. 可以使用对象的hasOwnProperty方法判断一下，是否为对象自身的属性。
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

# 2.函数
1.  函数声明提升和变量提升不太一样，

		var f = function(){} 和 var a = 1  一样  undefined
		f() function f(){}


2. 关于递归，函数调用自身
3. 总之，函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。
4. 注意，如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值。
		var obj = [1, 2, 3];

		function f(o) {
		  o = [2, 3, 4];
		}
		f(obj);

		obj // [1, 2, 3]
        // 上面代码中，在函数f内部，参数对象obj被整个替换成另一个值。这时不会影响到原始值。
        // 这是因为，形式参数（o）的值实际是参数obj的地址，重新对o赋值导致o指向另一个地址，保存在原地址上的值当然不受影响。

5. arguments 对象包含了函数运行时的所有参数，arguments[0]就是第一个参数，
6. 需要注意的是，虽然arguments很像数组，但它是一个对象。类数组对象。数组专有的方法（比如slice和forEach），不能在arguments对象上直接使用。

7. 闭包就是函数f2，即能够读取其他函数内部变量的函数。
        由于在 JavaScript 语言中，只有函数内部的子函数才能读取内部变量，
        因此可以把闭包简单理解成“定义在一个函数内部的
        函数”。闭包最大的特点，就是它可以“记住”诞生的环境，
        比如f2记住了它诞生的环境f1，所以从f2可以得到f1的内部变量。在本质上，
        闭包就是将函数内部和函数外部连接起来的一座桥梁。
        闭包的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，
        即闭包可以使得它诞生环境一直存在。请看下面的例子，闭包使得内部变量记住上一次调用时的运算结果。
        https://wangdoc.com/javascript/types/function.html#闭包

8. 通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：一是不必为函数命名，避免了污染全局变量；二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。
		// 写法一
		var tmp = newData;
		processData(tmp);
		storeData(tmp);

		// 写法二
		(function () {
		  var tmp = newData;
		  processData(tmp);
		  storeData(tmp);
		}());
		// 上面代码中，写法二比写法一更好，因为完全避免了污染全局变量。

9. eval命令接受一个字符串作为参数，并将这个字符串当作语句执行。https://wangdoc.com/javascript/types/function.html#eval-命令
        eval('var a = 1;');
        a // 1
eval的本质是在当前作用域之中，注入代码。由于安全风险和不利于 JavaScript 引擎优化执行速度，
所以一般不推荐使用。通常情况下，eval最常见的场合是解析 JSON 数据的字符串，不过正确的做法应该是使用原生的JSON.parse方法。
10. 关于数组，数组的数字键不需要连续，length属性的值总是比最大的那个整数键大1。另外，这也表明数组是一种动态的数据结构，可以随时增减数组的成员。
很有意思的结果
        var arr = [ 'a', 'b', 'c' ];
        arr.length // 3
        arr[1000] = 'e';
        arr.length //
        1001
        arr
        (1001) ["a", "b", "c", empty × 997, "e"]

        var a = [];

        a['p'] = 'abc';
        a.length // 0

        a[2.1] = 'abc';
        a.length // 0
11. 类数组对象，如果一个对象的所有键名都是正整数或零，并且有length属性，那么这个对象就很像数组，语法上称为“类似数组的对象”（array-like object）。
        var obj = {
          0: 'a',
          1: 'b',
          2: 'c',
          length: 3
        };
        obj[0] // 'a'
        obj[1] // 'b'
        obj.length // 3
        obj.push('d') // TypeError: obj.push is not a function
典型的“类似数组的对象”是函数的arguments对象，以及大多数 DOM 元素集，还有字符串。
        / arguments对象
        function args() { return arguments }
        var arrayLike = args('a', 'b');

        arrayLike[0] // 'a'
        arrayLike.length // 2
        arrayLike instanceof Array // false

        // DOM元素集
        var elts = document.getElementsByTagName('h3');
        elts.length // 3
        elts instanceof Array // false

        // 字符串
        'abc'[1] // 'b'
        'abc'.length // 3
        'abc' instanceof Array // false
上面代码包含三个例子，它们都不是数组（instanceof运算符返回false），但是看上去都非常像数组。
数组的slice方法可以将“类似数组的对象”变成真正的数组。
var arr = Array.prototype.slice.call(arrayLike);

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
# 3.运算符详见文档 wangdoc.com
1.
        '3' + 4 + 5 // "345"
        3 + 4 + '5' // "75"

        var obj = { p: 1 };
        obj.valueOf().toString()
        "[object Object]"
2. 关于类型转换，+ > ==  ！== 转布尔值等等
https://www.jianshu.com/p/b0780a3cd5d9
https://wangdoc.com/javascript/operators/comparison.html
https://wangdoc.com/javascript/features/conversion.html
——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
# 4.面向对象编程
1.创建对象的几种方法
	  // 原型链指向Object
	  var o1  = {name:'o1'}
	  var o11 = new Object({name:'o11'})
	  // 构造函数
	  var M = function(){this.name = 'o2'}
	  var o2 = new M()

	  var P = {name:'o3'}
	  var o3 = Object.create(P)
        浏览器中输出结果
        o1
        {name: "o1"}name: "o1"__proto__: Object
        o11
        {name: "o11"}name: "o11"__proto__: Object
        o2
        M {name: "o2"}name: "o2"__proto__: Object
        o3
        {}


    JS的对象体系不是基于类，而 是基于构造函数（constructor）和原型链（prototype），
    JavaScript 语言使用构造函数（constructor）作为对象的模板。所谓”构造函数”，就是专门用来生成实例对象的函数。
    它就是对象的模板，描述实例对象的基本结构。一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。
            var Vehicle = function () {
                this.price = 1000;
            };
    上面代码中，Vehicle就是构造函数。为了与普通函数区别，构造函数名字的第一个字母通常大写。
    构造函数的特点有两个。
    函数体内部使用了this关键字，代表了所要生成的对象实例。
    生成对象的时候，必须使用new命令

2. new命令的作用，就是执行构造函数，返回一个实例对象
    为了保证构造函数必须与new命令一起使用，一个解决办法是，构造函数内部使用严格模式，
    即第一行加上use strict。这样的话，一旦忘了使用new命令，直接调用构造函数就会报错。
    另一个解决办法，构造函数内部判断是否使用new命令，如果发现没有使用，则直接返回一个实例对象。
        function Fubar(foo, bar) {
          if (!(this instanceof Fubar)) {
            return new Fubar(foo, bar);
          }

          this._foo = foo;
          this._bar = bar;
        }

        Fubar(1, 2)._foo // 1
        (new Fubar(1, 2))._foo // 1

3. new的原理，它后面的函数依次执行下面的步骤：
            1. 创建一个空对象，作为将要返回的对象实例。
            2. 将空对象的原型指向构造函数的prototype属性。
            3. 将这个空对象赋值给函数内部的this关键字。
            4. 开始执行构造函数内部的代码。
也就是说，构造函数内部，this指的是一个新生成的空对象，所有针对this的操作，都会发生在这个空对象上。
构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即this对象），将其“构造”为需要的样子。

如果return语句返回的是一个跟this无关的新对象，new命令会返回这个新对象，而不是this对象。这一点需要特别引起注意。
        var Vehicle = function (){
          this.price = 1000;
          return { price: 2000 };
        };

        (new Vehicle()).price
        // 2000
上面代码中，构造函数Vehicle的return语句，返回的是一个新对象。new命令会返回这个对象，而不是this对象。

4. this关键字
    由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。
    所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境。
    var f = function () {
        console.log(this.x);
    }
    var x = 1;
    var obj = {
        f: f,
        x: 2,
    };
    // 单独执行
    f() // 1
    // obj 环境执行
    obj.f() // 2
上面代码中，函数f在全局环境执行，this.x 指向全局环境(Window)的x；在obj环境执行，this.x 指向obj.x 。

5. this的使用场合和指向  https://wangdoc.com/javascript/oop/this.html#使用注意点
 - 全局环境下this === Window
 - 构造函数中 this指向实例对象
 - 如果对象的方法里面包含this，this的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变this的指向。
6.注意事项：
    1.避免多层this ,可以将this赋值出去
    var o = {
      f1: function() {
        console.log(this);
        var that = this;
        var f2 = function() {
          console.log(that);
          console.log(this) // 这里的this指向全局对象
        }();
      }
    }
    o.f1()
    // Object
    // Object
    上面代码定义了变量that，固定指向外层的this，然后在内层使用that，就不会发生this指向的改变。
    事实上，使用一个变量固定this的值，然后内层函数调用这个变量，是非常常见的做法，请务必掌握。


    JavaScript 提供了严格模式，也可以硬性避免这种问题。严格模式下，如果函数内部的this指向顶层对象，就会报错。
    var counter = {
      count: 0
    };
    counter.inc = function () {
      'use strict';
      this.count++
    };
    var f = counter.inc;
    f()
    // TypeError: Cannot read property 'count' of undefined
    上面代码中，inc方法通过'use strict'声明采用严格模式，这时内部的this一旦指向顶层对象，就会报错。

    2. 避免数组处理方法中的this
    var o = {
      v: 'hello',
      p: [ 'a1', 'a2' ],
      f: function f() {
        var that = this; // 如果不用that来固定this，那么forEach函数回调函数中的this.v 指向的不是外部的对象o,而是顶层对象window
        this.p.forEach(function (item) {
          console.log(that.v+' '+item);
        });
      }
    }
    o.f()
    3. 避免回调函数中的this
    操作DOM中this指向 dom对象

7. 绑定this的方法    https://wangdoc.com/javascript/oop/this.html#绑定-this-的方法
    - Function().prototype.call( )
        var n = 123;
        var obj = { n: 456 };

        function a() {
          console.log(this.n);
        }

        a.call() // 123
        a.call(null) // 123
        a.call(undefined) // 123
        a.call(window) // 123
        a.call(obj) // 456
    - Function.prototype.apply() 和call()很像 唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。
        function f(x, y){
          console.log(x + y);
        }

        f.call(null, 1, 1) // 2
        f.apply(null, [1, 1]) // 2

    利用这一点，可以做一些有趣的应用。
    1. 找出数组最大元素，相当于Math.max(10,2,4,15,9)
        var a = [10, 2, 4, 15, 9];
        Math.max.apply(null, a) // 15
    2. 将数组的空元素变为undefined
    3.转换类似数组的对象
        Array.prototype.slice.apply({0: 1, length: 1}) // [1]
        Array.prototype.slice.call({0: 1, length: 1}) // [1]


   - bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。
   bind 与call ,apply 区别在于bind return 一个新函数，而call，apply先改变函数内部this的指向然后在所指定的作用域中调用该函数,返回结果
       var counter = {
            count: 0,
            inc: function () {
                this.count++;
            }
        };
        var func = counter.inc.bind(counter);
        func();
        counter.count // 1

        func.call(counter)     func.apply(counter)
        counter.count // 1


8. 构造函数的缺点  https://wangdoc.com/javascript/oop/prototype.html#构造函数的缺点
同一个构造函数的多个实例之间，无法共享属性和方法，从而造成对系统资源的浪费。
 prototype的作用，每一个函数都有prototype属性，指向一个对象,在生成实例的时候，该属性会自动成为实例对象的原型
         function Animal(name) {
             this.name = name;
         }
        Animal.prototype.color = 'white';
        var cat1 = new Animal('大毛');
        var cat2 = new Animal('二毛');
        cat1.color // 'white'
        cat2.color // 'whit
        Animal.prototype.color = 'yello'
        cat1.color // 'yrllo'
9. JavaScript 规定，所有对象都有自己的原型对象（prototype）。一方面，任何一个对象，都可以充当其他对象的原型；
    另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……
    如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性。
    也就是说，所有对象都继承了Object.prototype的属性。这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的。
    那么，Object.prototype对象有没有它的原型呢？回答是Object.prototype的原型是null。
    null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null。

10. prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。
        function P() {}
        var p = new P()
        P.prototype.constructor === P // true
        p.constructor === P.prototype.constroctor === P

        如果改变一个对象

11. instanceof 用来判断某个对象是否是一个构造函数的实例。
instanceof运算符的左边是实例对象，右边是构造函数。它会检查右边构建函数的原型对象（prototype），是否在左边对象的原型链上。
因此，下面两种写法是等价的。
        v instanceof Vehicle
        // 等同于
        Vehicle.prototype.isPrototypeOf(v)

12. 构造函数的继承
    1.子类继承父类的实例
    2.子类继承父类的原型，并且指定子类的constructor 为本身
        function Shape() {
            this.x = 0
            this.y = 0
        }
        Shape.prototype.move = function(x, y) {
            this.x += x
            this.y += y
            console.info('Shape moved')
        }

       function Rectangle() {
           Shape.call(this)
           // 子类rec 继承父类Shape ,也可以这样写
           // this.base = Shape
           // this.base()
       }
       Rectangle.prototype = Object.create(Shape.prototype)
       // 不能直接赋值为Shape.prototype,否则后面修改Rec.prototype 会连着Shape.prototype一起修改
       Rectangle.prototype.constructor = Rectangle

       上面代码中，子类是整体继承父类。有时只需要单个方法的继承，这时可以采用下面的写法。
        ClassB.prototype.print = function() {
          ClassA.prototype.print.call(this);
          // some code
        }
        上面代码中，子类B的print方法先调用父类A的print方法，再部署自己的代码。这就等于继承了父类A的print方法。
13. 多重继承
14. 模块
15. Object 对象的相关方法
    1. 获取一个对象的原型 Object.getPrototypeOf()
    2. 为参数对象设置原型 Object.setPrototypeOf()
    3. 以一个对象为原型，返回一个实例对象 Object.create()
    4. 判断一个实例对象是否是一个参数对象的原型,也就是这个对象是否在参数对象的原型链上
            var o1 = {}
            var o2 = Object.create(o1)
            var o3 = Object.create(o2)
            o1.isPrototypeOf(o3) //true
    5. 获取一个对象的原型  Object.prototype.__proto
    6. hasOwnProperty方法是 JavaScript 之中唯一一个处理对象属性时，不会遍历原型链的方
