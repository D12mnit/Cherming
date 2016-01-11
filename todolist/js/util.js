// ----------------------------------------  
//   个人封装简版jquery库，及相关简单操作。
//   不使用任何框架，库。
//   用于个人项目使用。

//   2015.11.25 20:48
// -----------------------------------------

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return arr instanceof Array;
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return fn instanceof Function;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    if (typeof src != 'object') {
        return src;
    }
    var copy = {};
    for (var key in src) {
        copy[key] = cloneObject(src[key]);
    }
    return copy;
}
/*    另一种方法，更加完备
function clone(Obj) {
    var buf;
    if (Obj instanceof Array) {
        buf = []; //创建一个空的数组 
        var i = Obj.length;
        while (i--) {
            buf[i] = clone(Obj[i]);
        }
        return buf;
    } else if (Obj instanceof Object) {
        buf = {}; //创建一个空对象 
        for (var k in Obj) { //为这个对象添加新的属性 
            buf[k] = clone(Obj[k]);
        }
        return buf;
    } else {
        return Obj;
    }
}
*/
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var n = {}, // hash表
        r = []; // 临时数组
    for (var i = 0; i < arr.length; i++) {
        if (!n[arr[i]]) { // 如果hash表中没有该项
            n[arr[i]] = true; //存入表
            r.push(arr[i]); //push进临时数组
        }
    }
    return r;
}
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i in arr) {
        fn(arr[i], i);
    }
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var n = 0;
    for (var i in obj) {
        n++;
    }
    return n;
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var re = /^[\w.\_]+@\w+.\w+$/;
    return re.test(emailStr);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!element.className) {
        element.className = newClassName;
    } else {
        var re = new RegExp(newClassName);
        if (!re.test(element.className)) {
            element.className += ' ' + newClassName;
        }
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    element.className = element.className.replace(oldClassName, '');
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var position = {
        x: element.offsetLeft,
        y: element.offsetTop
    };
    return position;
}
/*------模拟querySelector选择器，不完善,暂时使用HTML5 querySelector----------
function $(selector) {
    var match,name;
    if (!selector) {
        return this;
    } else if (typeof selector == "string") {
        switch(selector[0]){
            case '#':
                name = selector.substring(1);
                match = document.getElementById(name);
                break;
            case '.':
                name = selector.substring(1);
                match = document.getElementByClassName('ele')[0];
                break;
            case '[':
                name = selector.substring(1,selector.length-1);
                var temp = document.getElementsByTagName('*');
                for(var i=0;i<temp.length;i++){
                    if(name.indexOf('=') != -1){
                        var arr = name.split('=');
                        if(arr[1] == temp[i].getAttribute(arr[0])){
                            return temp[i];
                        }
                    } else{
                        if(temp[i].getAttribute(name)){
                            return temp[i];
                        }
                    }
                }
                break;
            default:
                match = document.getElementsByTagName('selector')[0];
                break;
        }
        return match;
    }
}
-------------------------------------------------------*/
function $(selector) {
    return document.querySelectorAll(selector);
}
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else {
        element.attachEvent('on' + event, listener);
    }
}
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else {
        element.detachEvent('on' + event, listener);
    }
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, 'keyup', function(event) {
        event = event || window.event;
        if (event.keyCode == 13) {
            listener();
        }
    });
}
// 函数与$绑定(在下面会再封装)
// $.on = function(element, event, listener) {
//     if (element.addEventListener) {
//         element.addEventListener(event, listener, false);
//     } else {
//         element.attachEvent('on' + event, listener);
//     }
// };
// $.un = function(element, event, listener) {
//     if (element.removeEventListener) {
//         element.removeEventListener(event, listener, false);
//     } else {
//         element.detachEvent('on' + event, listener);
//     }
// };
// $.click = function(element, listener) {
//     addEvent(element, 'click', listener);
// };
// $.enter = function(element, listener) {
//     addEvent(element, 'keyup', function(event) {
//         event = event ? event : window.event;
//         if (event.keyCode == 13) {
//             listener();
//         }
//     });
// };
//Javascript 事件代理函数
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() == tag) {
            listener();
        }
    });
}
// $.delegate = delegateEvent;

$.on = function(selector, event, listener) {
    var element = $(selector);
    addEvent(element, event, listener);
};
$.click = function(selector, listener) {
    var element = $(selector);
    addClickEvent(element, listener);
};
$.un = function(selector, event, listener) {
    var element = $(selector);
    removeEvent(element, event, listener);
};
$.delegateEvent = function(selector, tag, event, listener) {
    var element = $(selector);
    delegateEvent(element, tag, event, listener);
};
$.enter = function(selector, listener) {
    var element = $(selector);
    addEnterEvent(element, listener);
};
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = navigator.userAgent.toLowerCase();
    if (/msie ([^;]+)/.test(ua)) {
        var version = RegExp["$1"];
        return version;
    } else {
        return -1;
    }
}
// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
    //cookie名字和值均经过URI编码
    if (expiredays instanceof Date) {
        cookieText += "; expire=" + expiredays.toGMTString;
    }
}

// 获取cookie值
function getCookie(cookieName) {
    var name = encodeURIComponent(cookieName) + "=",
        cookieStart = document.cookie.indexOf(name),
        cookieValue = null;

    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.lenght, cookieEnd));
    }
    return cookieValue;
}