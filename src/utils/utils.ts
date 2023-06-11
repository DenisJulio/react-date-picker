class Month {
  static January = new this(0, "January", "Jan");
  static February = new this(1, "February", "Feb");
  static March = new this(2, "March", "Mar");
  static April = new this(3, "April", "Apr");
  static May = new this(4, "May", "May");
  static June = new this(5, "June", "Jun");
  static July = new this(6, "July", "Jul");
  static August = new this(7, "August", "Aug");
  static September = new this(8, "September", "Sep");
  static October = new this(9, "October", "Oct");
  static November = new this(10, "November", "Nov");
  static December = new this(11, "December", "Dec");

  id: number;
  str: string;
  short: string;

  constructor(id: number, str: string, short: string) {
    this.id = id;
    this.str = str;
    this.short = short;
  }

  static fromNumber(id: number): Month {
    switch (id) {
      case 0:
        return Month.January;
      case 1:
        return Month.February;
      case 2:
        return Month.March;
      case 3:
        return Month.April;
      case 4:
        return Month.May;
      case 5:
        return Month.June;
      case 6:
        return Month.July;
      case 7:
        return Month.August;
      case 8:
        return Month.September;
      case 9:
        return Month.October;
      case 10:
        return Month.November;
      case 11:
        return Month.December;
      default:
        throw new Error("Invalid month id");
    }
  }
}

const months: Month[] = [
  Month.January,
  Month.February,
  Month.March,
  Month.April,
  Month.May,
  Month.June,
  Month.July,
  Month.August,
  Month.September,
  Month.October,
  Month.November,
  Month.December,
];

export { months, Month };
