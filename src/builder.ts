import { DateMethod, SeparatorMethod } from './types';

export class KrDateBuilder {
  private date: Date;
  private segments: string[] = [];
  private yearUsed: boolean = false;
  private monthUsed: boolean = false;
  private dayUsed: boolean = false;
  private dowUsed: boolean = false;

  constructor(date: Date) {
    this.date = date;
  }

  // #region check and set values
  private checkAndSetYearUsed() {
    if (this.yearUsed) {
      throw new Error("DateMethod for 'year' can be used only once.");
    }
    this.yearUsed = true;
  }

  private checkAndSetMonthUsed() {
    if (this.monthUsed) {
      throw new Error("DateMethod for 'month' can be used only once.");
    }
    this.monthUsed = true;
  }

  private checkAndSetDayUsed() {
    if (this.dayUsed) {
      throw new Error("DateMethod for 'day' can be used only once.");
    }
    this.dayUsed = true;
  }

  private checkAndSetDowUsed() {
    if (this.dowUsed) {
      throw new Error("DateMethod for 'day of week' can be used only once.");
    }
    this.dowUsed = true;
  }
  // #endregion check and set values

  private addLeadingZero(monthOrDay: number): string {
    return monthOrDay.toString().padStart(2, '0');
  }

  /**
   * @description [DATE METHOD] add year in number-only, 4-digit format (e.g. 2023)
   */
  yyyy(): DateMethod {
    this.checkAndSetYearUsed();
    this.segments.push(this.date.getFullYear().toString());
    return this;
  }

  /**
   * @description [DATE METHOD] add year in number-only, 2-digit format (e.g. 23)
   */
  yy(): DateMethod {
    this.checkAndSetYearUsed();
    this.segments.push((this.date.getFullYear() % 100).toString());
    return this;
  }

  /**
   * @description [DATE METHOD] add 4-digit year with Korean character (e.g. 2023년)
   */
  YYYY(): DateMethod {
    this.checkAndSetYearUsed();
    this.segments.push(this.date.getFullYear().toString() + '년');
    return this;
  }

  /**
   * @description [DATE METHOD] add 2-digit year with Korean character (e.g. 23년)
   */
  YY(): DateMethod {
    this.checkAndSetYearUsed();
    this.segments.push((this.date.getFullYear() % 100).toString() + '년');
    return this;
  }

  /**
   * @description [DATE METHOD] add month in number-only, 2-digit format (e.g. 01)
   */
  mm(): DateMethod {
    this.checkAndSetMonthUsed();
    this.segments.push(this.addLeadingZero(this.date.getMonth() + 1));
    return this;
  }

  /**
   * @description [DATE METHOD] add month in number-only, single digit format (e.g. 1)
   */
  m(): DateMethod {
    this.checkAndSetMonthUsed();
    this.segments.push((this.date.getMonth() + 1).toString());
    return this;
  }

  /**
   * @description [DATE METHOD] add month in number-only, 2-digit format with Korean character (e.g. 01월)
   */
  MM(): DateMethod {
    this.checkAndSetMonthUsed();
    this.segments.push(this.addLeadingZero(this.date.getMonth() + 1) + '월');
    return this;
  }

  /**
   * @description [DATE METHOD] add month in number-only, single digit format with Korean character (e.g. 1월)
   */
  M(): DateMethod {
    this.checkAndSetMonthUsed();
    this.segments.push((this.date.getMonth() + 1).toString() + '월');
    return this;
  }

  /**
   * @description [DATE METHOD] add day in number-only, 2-digit format (e.g. 01일)
   */
  dd(): DateMethod {
    this.checkAndSetDayUsed();
    this.segments.push(this.addLeadingZero(this.date.getDate()));
    return this;
  }

  /**
   * @description [DATE METHOD] add day in number-only, single digit format (e.g. 1일)
   */
  d(): DateMethod {
    this.checkAndSetDayUsed();
    this.segments.push(this.date.getDate().toString());
    return this;
  }

  /**
   * @description [DATE METHOD] add day in number-only, 2-digit format with Korean character (e.g. 01일)
   */
  DD(): DateMethod {
    this.checkAndSetDayUsed();
    this.segments.push(this.addLeadingZero(this.date.getDate()) + '일');
    return this;
  }

  /**
   * @description [DATE METHOD] add day in number-only, single digit format with Korean character (e.g. 1일)
   */
  D(): DateMethod {
    // 9일
    this.checkAndSetDayUsed();
    this.segments.push(this.date.getDate().toString() + '일');
    return this;
  }

  // #region time work later when minute expression is figured out
  //   hm() {
  //     // 9:8
  //     this.segments.push(this.date.getHours().toString());
  //     this.segments.push(':');
  //     this.segments.push(this.date.getMinutes().toString());
  //     return this;
  //   }
  //
  //   hhmm() {
  //     // 09:08
  //     this.segments.push(this.addLeadingZero(this.date.getHours()));
  //     this.segments.push(':');
  //     this.segments.push(this.addLeadingZero(this.date.getMinutes()));
  //     return this;
  //   }
  //
  //   HM() {
  //     // 9시 8분
  //     this.segments.push(this.date.getHours().toString() + '시');
  //     this.segments.push(this.date.getMinutes().toString() + '분');
  //     return this;
  //   }
  //
  //   H() {
  //     this.segments.push(this.date.getHours().toString() + '시');
  //     return this;
  //   }
  //
  //   HH() {
  //     this.segments.push(this.addLeadingZero(this.date.getHours()) + '시');
  //     return this;
  //   }
  // #endregion time

  /**
   * @description [DATE METHOD] add day of week in long form without parentheses by default
   * e.g. 월요일
   */
  DOW(options?: { paren: boolean }): DateMethod {
    this.checkAndSetDowUsed();
    const days = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const dayName = days[this.date.getDay()];
    const str =
      options === undefined || options.paren === false
        ? dayName
        : `(${dayName})`;
    this.segments.push(str);
    return this;
  }

  /**
   * @description [DATE METHOD] add day of week in short form with parentheses by default
   * e.g. (월)
   */
  dow(options?: { paren: boolean }): DateMethod {
    this.checkAndSetDowUsed();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = days[this.date.getDay()];
    const str = options?.paren === false ? dayName : `(${dayName})`;
    this.segments.push(str);
    return this;
  }

  // #region separators

  /**
   * @description [SEPARATOR] add dash separators in front of return values of each date methods ahead, starts from the last separator if exists
   */
  dash(): SeparatorMethod {
    const i1 = this.segments.lastIndexOf('dash');
    const i2 = this.segments.lastIndexOf('dot');
    const i3 = this.segments.lastIndexOf('slash');
    const i4 = this.segments.lastIndexOf('space');

    const lastSeparatorIndex = Math.max(i1, i2, i3, i4);
    let startIndex = 0;
    if (lastSeparatorIndex !== -1) {
      startIndex = lastSeparatorIndex;
    }
    for (let i = startIndex; i < this.segments.length; i++) {
      if (i === 0) continue;
      this.segments[i] = '-' + this.segments[i];
    }
    this.segments.push('dash');
    return this;
  }

  /**
   * @description [SEPARATOR] add dot separators in front of return values of each date methods ahead, starts from the last separator if exists
   */
  dot(): SeparatorMethod {
    const i1 = this.segments.lastIndexOf('dash');
    const i2 = this.segments.lastIndexOf('dot');
    const i3 = this.segments.lastIndexOf('slash');
    const i4 = this.segments.lastIndexOf('space');

    const lastSeparatorIndex = Math.max(i1, i2, i3, i4);
    let startIndex = 0;
    if (lastSeparatorIndex !== -1) {
      startIndex = lastSeparatorIndex;
    }
    for (let i = startIndex; i < this.segments.length; i++) {
      if (i === 0) continue;
      this.segments[i] = '.' + this.segments[i];
    }
    this.segments.push('dot');
    return this;
  }

  /**
   * @description [SEPARATOR] add space separators in front of return values of each date methods ahead, starts from the last separator if exists
   */
  space(): SeparatorMethod {
    const i1 = this.segments.lastIndexOf('dash');
    const i2 = this.segments.lastIndexOf('dot');
    const i3 = this.segments.lastIndexOf('slash');
    const i4 = this.segments.lastIndexOf('space');

    const lastSeparatorIndex = Math.max(i1, i2, i3, i4);
    let startIndex = 0;
    if (lastSeparatorIndex !== -1) {
      startIndex = lastSeparatorIndex;
    }
    for (let i = startIndex; i < this.segments.length; i++) {
      if (i === 0) continue;
      this.segments[i] = ' ' + this.segments[i];
    }
    this.segments.push('space');
    return this;
  }

  /**
   * @description [SEPARATOR] add slash separators in front of return values of each date methods ahead, starts from the last separator if exists
   */
  slash(): SeparatorMethod {
    const i1 = this.segments.lastIndexOf('dash');
    const i2 = this.segments.lastIndexOf('dot');
    const i3 = this.segments.lastIndexOf('slash');
    const i4 = this.segments.lastIndexOf('space');

    const lastSeparatorIndex = Math.max(i1, i2, i3, i4);
    let startIndex = 0;
    if (lastSeparatorIndex !== -1) {
      startIndex = lastSeparatorIndex;
    }
    for (let i = startIndex; i < this.segments.length; i++) {
      if (i === 0) continue;
      this.segments[i] = '/' + this.segments[i];
    }
    this.segments.push('slash');
    return this;
  }

  // #endregion separators

  /**
   * @description returns formatted date string
   */
  toString() {
    return this.segments.reduce((acc, cur) => {
      if (
        cur.includes('dash') ||
        cur.includes('dot') ||
        cur.includes('slash') ||
        cur.includes('space')
      ) {
        return acc;
      } else {
        return acc + cur;
      }
    }, '');
  }

  /**
   * @description returns formatted date string
   */
  print() {
    return this.segments.reduce((acc, cur) => {
      if (
        cur.includes('dash') ||
        cur.includes('dot') ||
        cur.includes('slash') ||
        cur.includes('space')
      ) {
        return acc;
      } else {
        return acc + cur;
      }
    }, '');
  }
}

export function krDateBuilder(date: Date): KrDateBuilder {
  return new KrDateBuilder(date);
}

/**
 * @deprecated since version 1.2.0
 */
export function builder(date: Date): KrDateBuilder {
  return new KrDateBuilder(date);
}
