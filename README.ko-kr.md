# 한국어 날짜 생성기

[![en](https://img.shields.io/badge/lang-EN-red.svg)](https://github.com/brandonwie/kr-date-buillder/blob/main/README.md)
[![한국어](https://img.shields.io/badge/lang-한국어-green.svg)](https://github.com/brandonwie/kr-date-buillder/blob/main/README.ko-kr.md)

> 쉽게 한국어 날짜 문자열 생성하기!

## 함수 목록

| 함수      | 예시          | 설명                              |
| --------- | ------------- | --------------------------------- |
| `yy()`    | 23            | 두 자리 연도 반환                 |
| `yyyy()`  | 2023          | 네 자리 연도 반환                 |
| `YYYY()`  | 2023년        | 네 자리 연도 한글 반환            |
| `YY()`    | 23년          | 두 자리 연도 한글 반환            |
| `m()`     | 1-12          | 한 자리 월 반환                   |
| `mm()`    | 01-12         | 두 자리 월 반환                   |
| `M()`     | 1월-12월      | 한글 월 반환 한 자리              |
| `MM()`    | 01월-12월     | 한글 월 반환 두 자리              |
| `d()`     | 1-31          | 한 자리 일 반환                   |
| `dd()`    | 01-31         | 두 자리 일 반환                   |
| `D()`     | 1일-31일      | 한글 일 반환 한 자리              |
| `DD()`    | 01일-31일     | 한글 일 반환 두 자리              |
| `dow()`   | 일-토         | 한 글자로 된 요일 반환, 괄호 포함 |
| `DOW()`   | 일요일-토요일 | 요일 전체 형식으로 반환           |
| `dash()`  | 2023-01-01    | 대시(-) 구분자로 문자열 반환      |
| `dot()`   | 2023.01.01    | 점(.) 구분자로 문자열 반환        |
| `slash()` | 2023/01/01    | 슬래시(/) 구분자로 문자열 반환    |
| `space()` | 2023 01 01    | 공백( ) 구분자로 문자열 반환      |

## 사용 방법

```js
import { krDateBuilder } from 'kr-date-builder';

// builder receives Date object as an argument
const d = krDateBuilder(new Date('2023-01-01'));

const Page = () => {
  return <div>{`${d.YYYY().MM().DD().DOW().space()}`}</div>;
  // 2023년 01월 01일 일요일
};

const Page = () => {
  <div>{'날짜: ' + d.YYYY().MM().DD().DOW().space()}</div>;
  // 날짜: 2023년 01월 01일 일요일
};

const Page = () => {
  <div>{d.YYYY().MM().DD().DOW().space().toString()}</div>;
  // 2023.01.01 (일)
};

const Page = () => {
  <div>{d.YYYY().MM().DD().DOW().space().print()}</div>;
  // 2023.01.01 (일)
};
```

- 템플릿 리터럴로 사용하세요.
- 다른 문자열과 연결하세요.
- `toString()` 또는 `print()` 메서드를 사용하세요.

### 특징

- 두 가지 숫자 자리수 스타일 옵션이 있습니다.
- 대문자 메서드는 문자열 값 끝에 한글로 반환합니다.
- 소문자 메서드는 숫자만 반환합니다.
- 하나의 체인에서는 연도, 월, 일 함수를 각각 하나씩 사용할 수 있습니다.

## 연도

```js
d.yy(); // 23
d.yyyy(); // 2023
```

```js
d.YYYY(); // 2023년
d.YY(); // 23년
```

## 월

```js
d.m(); // 1
d.mm(); // 01
```

```js
d.M(); // 1월
d.MM(); // 01월
```

## 일

```js
d.d(); // 1
d.dd(); // 01
```

```js
d.D(); // 1일
d.DD(); // 01일
```

## 요일

```js
d.dow(); // (일)
d.DOW(); // 일요일
```

```js
d.dow({ paren: false }); // 일
d.DOW({ paren: true }); // (일요일)
```

### 왜 기본값에서 한 글자만 괄호와 함께 반환되나요?

- 좋은 방식은 아니라고 생각하지만, 이 형식은 가장 많이 사용되는 요일 형식 중 하나이기 때문입니다.
- 또한 요일이 전체 형식으로 나오면 괄호를 사용하는 경우가 드물기 때문입니다... 🤷🏻‍♂️
- 제안은 언제든 환영합니다.

## 구분자

```js
d.yyyy().mm().dd().dash(); // 2023-01-01
d.yyyy().mm().dd().dot(); // 2023.01.01
d.yyyy().mm().dd().slash(); // 2023/01/01
d.yyyy().mm().dd().space(); // 2023 01 01
```

- 구분자는 그 전에 호출된 year, month, day 함수들 값의 바로 앞에 더해집니다.
- 체인의 첫 번째 함수 앞에는 구분자가 적용되지 않습니다.

```js
d.mm().dd().yyyy().slash().DOW().space(); // 01/01/2023 일요일
// space() 앞에 slash()라는 구분자가 있으므로 space()는 DOW() 앞에만 적용됩니다.
```

- 구분자는 이전 마지막 구분자 다음 값부터 적용됩니다.
