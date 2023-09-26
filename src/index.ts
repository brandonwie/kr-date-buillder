class DateFormatterBuilder {
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
      throw new Error("Methods for 'year' can be used only once.");
    }
    this.yearUsed = true;
  }

  private checkAndSetMonthUsed() {
    if (this.monthUsed) {
      throw new Error("Methods for 'month' can be used only once.");
    }
    this.monthUsed = true;
  }

  private checkAndSetDayUsed() {
    if (this.dayUsed) {
      throw new Error("Methods for 'day' can be used only once.");
    }
    this.dayUsed = true;
  }

  private checkAndSetDowUsed() {
    if (this.dowUsed) {
      throw new Error("Methods for 'day of week' can be used only once.");
    }
    this.dowUsed = true;
  }
  // #endregion check and set values

  private addLeadingZero(monthOrDay: number): string {
    return monthOrDay.toString().padStart(2, '0');
  }

  yyyy() {
    this.checkAndSetYearUsed();
    this.segments.push(this.date.getFullYear().toString());
    return this;
  }

  yy() {
    this.checkAndSetYearUsed();
    this.segments.push((this.date.getFullYear() % 100).toString());
    return this;
  }

  YYYY() {
    this.checkAndSetYearUsed();
    this.segments.push(this.date.getFullYear().toString() + '년');
    return this;
  }

  YY() {
    this.checkAndSetYearUsed();
    this.segments.push((this.date.getFullYear() % 100).toString() + '년');
    return this;
  }

  mm() {
    this.checkAndSetMonthUsed();
    this.segments.push(this.addLeadingZero(this.date.getMonth() + 1));
    return this;
  }

  m() {
    this.checkAndSetMonthUsed();
    this.segments.push((this.date.getMonth() + 1).toString());
    return this;
  }

  MM() {
    this.checkAndSetMonthUsed();
    this.segments.push(this.addLeadingZero(this.date.getMonth() + 1) + '월');
    return this;
  }

  M() {
    this.checkAndSetMonthUsed();
    this.segments.push((this.date.getMonth() + 1).toString() + '월');
    return this;
  }

  dd() {
    this.checkAndSetDayUsed();
    this.segments.push(this.addLeadingZero(this.date.getDate()));
    return this;
  }

  d() {
    this.checkAndSetDayUsed();
    this.segments.push(this.date.getDate().toString());
    return this;
  }

  DD() {
    this.checkAndSetDayUsed();
    this.segments.push(this.addLeadingZero(this.date.getDate()) + '일');
    return this;
  }

  D() {
    this.checkAndSetDayUsed();
    this.segments.push(this.date.getDate().toString() + '일');
    return this;
  }

  DOW(options?: { paren: boolean }) {
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
    const str = options?.paren === false ? dayName : `(${dayName})`;
    this.segments.push(str);
    return this;
  }

  dow(options?: { paren: boolean }) {
    this.checkAndSetDowUsed();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = days[this.date.getDay()];
    const str = options?.paren === false ? dayName : `(${dayName})`;
    this.segments.push(str);
    return this;
  }

  space() {
    const i1 = this.segments.lastIndexOf('dot');
    const i2 = this.segments.lastIndexOf('slash');
    const i3 = this.segments.lastIndexOf('space');

    const lastSeparatorIndex = Math.max(i1, i2, i3);
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

  slash() {
    // separator가 발견된 지점부터 format
    const i1 = this.segments.lastIndexOf('dot');
    const i2 = this.segments.lastIndexOf('slash');
    const i3 = this.segments.lastIndexOf('space');

    const lastSeparatorIndex = Math.max(i1, i2, i3);
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

  dot() {
    const i1 = this.segments.lastIndexOf('dot');
    const i2 = this.segments.lastIndexOf('slash');
    const i3 = this.segments.lastIndexOf('space');

    const lastSeparatorIndex = Math.max(i1, i2, i3);
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

  toString() {
    return this.segments.reduce((acc, cur) => {
      if (
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

export function builder(date: Date): DateFormatterBuilder {
  return new DateFormatterBuilder(date);
}
