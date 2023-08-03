export function dateFormat(date) {
  const newDate = new Date(date);
  const formatedDate = `${newDate.getDate().toString().padStart(2, "0")} ${getMonthName(
    newDate.getMonth(),
  )}, ${newDate.getFullYear()}  |  ${newDate.getHours()}:${newDate.getMinutes()}`;
  return formatedDate;
}

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("en-US", { month: "long" });
}

export function reverseData(array) {
  return [...array].reverse();
}
