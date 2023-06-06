interface Month {
  id: number;
  str: string;
  short: string;
}

const January: Month = {
  id: 0,
  str: "January",
  short: "Jan",
};

const February: Month = {
  id: 1,
  str: "February",
  short: "Feb",
};

const March: Month = {
  id: 2,
  str: "March",
  short: "Mar",
};

const April: Month = {
  id: 3,
  str: "April",
  short: "Apr",
};

const May: Month = {
  id: 4,
  str: "May",
  short: "May",
};

const June: Month = {
  id: 5,
  str: "June",
  short: "Jun",
};

const July: Month = {
  id: 6,
  str: "July",
  short: "Jul",
};

const August: Month = {
  id: 7,
  str: "August",
  short: "Aug",
};

const September: Month = {
  id: 8,
  str: "September",
  short: "Sep",
};

const October: Month = {
  id: 9,
  str: "October",
  short: "Oct",
};

const November: Month = {
  id: 10,
  str: "November",
  short: "Nov",
};

const December: Month = {
  id: 11,
  str: "December",
  short: "Dec",
};

const months: Month[] = [
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
];

export type { Month };
export { months };
