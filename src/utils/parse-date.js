export const parseDate = (date) => {
  const params = date.split('-');

  const year = params[0];
  const month = params[1];
  const day = params[2].slice(0, 2);

  return `${day}.${month}.${year}`;
};
