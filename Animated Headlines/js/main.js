/**
 * @Author: d12mnit
 * @Date:   2016-05-06T17:21:46+08:00
* @Last modified by:   d12mnit
* @Last modified time: 2016-05-08T12:21:51+08:00
 */

'use strict';

var wordsList = ['尹凯旋是大傻逼', '这当然不是乱说的', '因为这是有依据的', '具体是什么依据', '我也不是很清楚'];

function splitWords(value) {
    var tvalue = value.trim();
    var temp = tvalue.split('');
    return temp;
}

function printText(list, start) {
    if (start == list.length) start = 0;
    var text = list[start];
    var endText = splitWords(text);
    var wrapper = document.getElementsByClassName('words-wrapper')[0];
    wrapper.innerHTML = '';
    var len = endText.length;
    for (var i = 0; i < len; i++) {
        (function(a) {
            setTimeout(function() {
                wrapper.innerHTML += endText[a];
            }, a * 100);
        }(i));
    }

    setTimeout(function() {
        printText(list, start + 1);
    }, len * 100 + 3000);
}
printText(wordsList, 0);
