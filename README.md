# Korean Date Builder

[![en](https://img.shields.io/badge/lang-EN-red.svg)](https://github.com/brandonwie/kr-date-buillder/blob/main/README.md)
[![한국어](https://img.shields.io/badge/lang-한국어-green.svg)](https://github.com/brandonwie/kr-date-buillder/blob/main/README.ko-kr.md)

> Generate Korean date string with ease!

## List of Functions

| Function  | Example       | Description                                        |
| --------- | ------------- | -------------------------------------------------- |
| `yy()`    | 23            | Returns year in two digits                         |
| `yyyy()`  | 2023          | Returns year in four digits                        |
| `YYYY()`  | 2023년        | Returns year in four digits with Korean letter     |
| `YY()`    | 23년          | Returns year in two digits with Korean letter      |
| `m()`     | 1-12          | Returns month in one digit                         |
| `mm()`    | 01-12         | Returns month in two digits                        |
| `M()`     | 1월-12월      | Returns month in one digit with Korean letter      |
| `MM()`    | 01월-12월     | Returns month in two digits with Korean letter     |
| `d()`     | 1-31          | Returns day in one digit                           |
| `dd()`    | 01-31         | Returns day in two digits                          |
| `D()`     | 1일-31일      | Returns day in one digit with Korean letter        |
| `DD()`    | 01일-31일     | Returns day in two digits with Korean letter       |
| `dow()`   | 일-토         | Returns day of week in one letter with parenthesis |
| `DOW()`   | 일요일-토요일 | Returns day of week in full format                 |
| `dash()`  | 2023-01-01    | Returns string with dash separator                 |
| `dot()`   | 2023.01.01    | Returns string with dot separator                  |
| `slash()` | 2023/01/01    | Returns string with slash separator                |
| `space()` | 2023 01 01    | Returns string with space separator                |

## How to use

```js
import { krDateBuilder } from 'kr-date-builder';

// builder receives Date object as an argument
const d = krDateBuilder(new Date('2023-01-01'));

const Page = () => {
  return <div>{`${d.YYYY().MM().DD().DOW().space()}`}</div>;
  // 2023년 01월 01일 일요일
};

const Page = () => {
  <div>{'date: ' + d.YYYY().MM().DD().DOW().space()}</div>;
  // date: 2023년 01월 01일 일요일
};

const Page = () => {
  <div>{d.YYYY().MM().DD().dot().DOW().space().toString()}</div>;
  // 2023.01.01 (일)
};

const Page = () => {
  <div>{d.YYYY().MM().DD().dot().DOW().space().print()}</div>;
  // 2023.01.01 (일)
};
```

- use it as a template literal
- concatenate it with other strings
- use `toString()` or `print()` method

### Characteristics

- there are two choices of digit styles.
- UPPER CASE methods generate a Korean letter at the end of the string value.
- lower case methods return numbers only.
- you can use year, month, and day functions once each in a single chain.

## Year

```js
d.yy(); // 23
d.yyyy(); // 2023
```

```js
d.YYYY(); // 2023년
d.YY(); // 23년
```

## Month

```js
d.m(); // 1
d.mm(); // 01
```

```js
d.M(); // 1월
d.MM(); // 01월
```

## Day

```js
d.d(); // 1
d.dd(); // 01
```

```js
d.D(); // 1일
d.DD(); // 01일
```

## Day of Week

```js
d.dow(); // (일)
d.DOW(); // 일요일
```

```js
d.dow({ paren: false }); // 일
d.DOW({ paren: true }); // (일요일)
```

### Why only single letter comes with parenthesis by default?

- I don't think it's the best solution, but it is just because the format is one of the most used day-of-week cases.
- Also when the day-of-week is in full format, it is rare using it with parenthesis...🤷🏻‍♂️
- I am fully open for suggestions btw.

## Separators

```js
d.yyyy().mm().dd().dash(); // 2023-01-01
d.yyyy().mm().dd().dot(); // 2023.01.01
d.yyyy().mm().dd().slash(); // 2023/01/01
d.yyyy().mm().dd().space(); // 2023 01 01
```

- the separators are added in front of the values of the year, month, day functions that are called before it
- the separators doesn't effect first function in the chain

```js
d.mm().dd().yyyy().slash().DOW().space(); // 01/01/2023 일요일
// there is slash() which is a separator; therefore, the space() has effect on the DOW() only
```

- separator is applied from the last previous separator if exists
