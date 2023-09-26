# Korean Date Builder

> Generate Korean date string with ease!
> 한국어 date string을 만들 수 있는 builder입니다.

## How to use

```js
import { builder } from 'kr-date-builder';

// builder receives Date string as an argument
const d = builder(new Date('2023-01-01'));

d.yyyy(); // 2023
d.yyyy().mm().dd(); // 20230101
d.YYYY().MM().DD(); // 2023년01월01일
```

- Capital letters generate string with Korean letters.
