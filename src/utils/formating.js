export function dateFormat(date) {
  const newDate = new Date(date.seconds*1000);
  const formatedDate = `${newDate.getDate().toString().padStart(2, "0")} ${getMonthName(
    newDate.getMonth(),
  )}, ${newDate.getFullYear()}  |  ${newDate.getHours().toString().padStart(2, "0")}:${newDate.getMinutes().toString().padStart(2, "0")}:${newDate.getSeconds().toString().padStart(2, "0")}`;
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
