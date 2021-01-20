export const dateCalculator = () => {
  const currentTimeStamp = Date.now();
  const today = new Date(currentTimeStamp).getDate();
  const week = [];

  for (let i = 0; i < 7; i++) {
    week.push({
      number: i,
      day: new Date(currentTimeStamp + 86400 * i * 1000).getDate(),
      month: new Date(currentTimeStamp + 86400 * i * 1000).getMonth(),
      year: new Date(currentTimeStamp + 86400 * i * 1000).getFullYear(),
    });
  }

  return { today, week };
};
