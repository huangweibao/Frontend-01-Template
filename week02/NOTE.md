<!--
 * @Author: your name
 * @Date: 2020-04-13 09:51:31
 * @LastEditTime: 2020-04-22 20:34:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-01-Template\week02\NOTE.md
 -->
# 每周总结可以写在这里

### 本周接触的知识点
#### 乔姆斯基谱系

0- 型文法（无限制文法或短语结构文法）包括所有的文法。

1- 型文法（上下文相关文法）生成上下文相关语言。

2- 型文法（上下文无关文法）生成上下文无关语言。

3- 型文法（正规文法）生成正则语言。
### Brainfuck
#### 巴科斯诺尔范式(BNF)

图灵完备性 —— 具备goto\if\while\递归

从BNF的角度去看js 基础数据类型的组成

这是以前没有接触过的方式来分析类型的组成，可以更透彻的去理解直接量的输出，加上课后的练习，效果更佳


``` js
/*
StringLiteral ::
    " DoubleStringCharactersopt "
    ' SingleStringCharactersopt '
DoubleStringCharacters ::
    DoubleStringCharacter DoubleStringCharactersopt
SingleStringCharacters ::
    SingleStringCharacter SingleStringCharactersopt
DoubleStringCharacter ::
    SourceCharacter but not one of " or \ or LineTerminator
    \ EscapeSequence
    LineContinuation
SingleStringCharacter ::
    SourceCharacter but not one of ' or \ or LineTerminator
    \ EscapeSequence
    LineContinuation
LineContinuation ::
    \ LineTerminatorSequence
EscapeSequence ::
    CharacterEscapeSequence
    0 [lookahead  DecimalDigit]
    HexEscapeSequence
    UnicodeEscapeSequence
CharacterEscapeSequence ::
    SingleEscapeCharacter
    NonEscapeCharacter
SingleEscapeCharacter :: one of
    ' " \ b f n r t v
NonEscapeCharacter ::
    SourceCharacter but not one of EscapeCharacter or LineTerminator
EscapeCharacter ::
    SingleEscapeCharacter
    DecimalDigit
    x
    u
HexEscapeSequence ::
    x HexDigit HexDigit
UnicodeEscapeSequence ::
    u HexDigit HexDigit HexDigit HexDigit
*/
// 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
function matchString(text) {
  // [^\"\n\r\u2028\u2029]
  // \(?:[\'\"\b\f\n\r\t\v\n\r\u2028\u2029]|\r\n)
  // \\x[0-9a-fA-F]{2} 匹配编码
  // \\u[0-9a-fA-F]{4} 匹配 Unicode 值
  // \\[^0-9ux\'\"\b\f\n\r\t\v\n\r\u2028\u2029]
  var reg = new RegExp("(?:[^\"\n\r\u2028\u2029]|\(?:[\'\"\b\f\n\r\t\v\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux\'\"\b\f\n\r\t\v\n\r\u2028\u2029])*")

  return text.match(reg)
}

// 匹配数字
function isNumber(str) {
  var exp =  /^(\s)*((\+\-|\-\+)*|\+|\-)?((\d+)?(.\d*)?([e|E](\+|\-)?(\d*))?|0x[0-9a-fA-F]+|Infinity|NaN)(\s)*$/ig
  return str.match(exp);
}

// 写一个 UTF-8 Encoding 的函数
function strToUtf8Encoding(text) {
  var encdoeStr = encodeURIComponent(text)
  var bytes = []

  for (var i = 0; i < encdoeStr.length; i++) {
    var str = encdoeStr[i]
    if (str === '%') {
      var hex = encdoeStr.slice(i + 1, i + 3)
      bytes.push(parseInt(hex, 16))
      i += 2
    } else {
      bytes.push(str.charCodeAt(0))
    }
  }

  return bytes
}

function decodeUtf8(text) {
  var encode = ""
  for (var i = 0; i < text.length; i++) {
    encdoe += '%' + text[i].toString(16)
  }

  return decodeURIComponent(encode)
}

```
