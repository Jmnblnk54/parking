import { currency } from "config/base";
import moment from "moment";

export const asPrice = (priceNumber) => {
  if (priceNumber == null) return "";
  if (isNaN(priceNumber)) return priceNumber;
  priceNumber = (priceNumber * 1).toFixed(2);
  priceNumber = priceNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return currency + priceNumber;
};

export const asNumber = (number) => {
  if (number == null) return "";
  if (isNaN(number)) return number;
  return (number * 1).toLocaleString();
};

export const asPercent = (number) => {
  if (number == null) return "";
  if (isNaN(number)) return number;
  return (number * 100).toFixed(2) + "%";
};

export const timeSince = (date) => {
  if (date == null) return "";
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) == 1
      ? Math.floor(interval) + " year ago"
      : Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) == 1
      ? Math.floor(interval) + " month ago"
      : Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) == 1
      ? Math.floor(interval) + " day ago"
      : Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) == 1
      ? Math.floor(interval) + " hour ago"
      : Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) == 1
      ? Math.floor(interval) + " minute ago"
      : Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export const asDate = (date) => {
  if (date == null) return "";
  return moment(date).format("MM/DD/YY");
};

export const asDateTime = (x) => {
  var date = moment(x);
  if (!date.isValid()) return x;

  if (x.includes("T")) {
    let d = new Date(x).toLocaleString();
    let splittedDate = d.split(":");
    let formattedDate =
      splittedDate[0] + ":" + splittedDate[1] + splittedDate[2].slice(2);
    return formattedDate.replace(",", "");
  } else {
    let d_ = x.replace(" ", "T") + ".000000Z";
    let d = new Date(d_).toLocaleString();
    let splittedDate = d.split(":");
    let formattedDate =
      splittedDate[0] + ":" + splittedDate[1] + splittedDate[2].slice(2);
    return formattedDate.replace(",", "");
  }
};

export const snakeCase = (string) => {
  return (
    string &&
    string
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join("_")
  );
};

export const createCookie = (name, value, days) => {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";

  document.cookie = name + "=" + value + expires + "; path=/";
};

export const readCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};