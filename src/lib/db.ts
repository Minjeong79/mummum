export function dateFunc() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 06
    const day = today.getDate().toString().padStart(2, "0");
    const dateString = year + "." + month + "." + day;
    return dateString;
  }