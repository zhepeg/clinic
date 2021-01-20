export const createStringFromDate = (day, month, year) => {
  day = day < 10 ? '0' + day : day;
  month = month + 1 < 10 ? '0' + (month + 1) : month + 1;

  return `${day}.${month}.${year}`;
};
