const differenceToTime = (difference) => {
  const hours = Math.floor(difference / 3600000);
  const minutes = Math.floor((difference - hours * 3600000) / 60000);
  const seconds = Math.floor(
    (difference - hours * 3600000 - minutes * 60000) / 1000
  );
  return `${hours}h ${minutes}m ${seconds}s`;
};
const getYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000 * 7);
  return yesterday;
};
const getTomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  return tomorrow;
};
module.exports = {
  getYesterday,
  getTomorrow,

  differenceToTime
};
