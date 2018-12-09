/**
 * @Author: 王贺
 * @Date:   2018-10-09T21:26:32+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-09T22:12:17+08:00
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
