import { validFileExtensions } from "@/constants";
import moment from "moment";

export const clean = (obj) => {
  for (const propName in obj) {
    if (!obj[propName]) {
      delete obj[propName];
    }
  }
  return obj;
};

export const constructURL = (baseURL, query) => {
  const queryParams = [];

  for (const prop in query) {
    if (query.hasOwnProperty(prop)) {
      if (query[prop]) {
        queryParams.push(`${prop}=${encodeURIComponent(query[prop])}`);
      }
    }
  }

  if (queryParams.length > 0) {
    const queryString = queryParams.join("&");
    return `${baseURL}?${queryString}`;
  } else {
    return baseURL;
  }
};

export const snakeCaseToSentenceCase = (snakeCaseString = "") => {
  const words = snakeCaseString.split("_");
  const sentenceCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return sentenceCaseWords.join(" ");
};

export const isValidFileType = (fileName, fileType) => {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
};

export const createDateFromStrings = (dateString, timeString) => {
  const combinedDateTimeString = `${dateString} ${timeString}`;
  const combinedDate = moment(
    combinedDateTimeString,
    "YYYY-MM-DD HH:mm"
  ).toDate();

  return combinedDate;
};

export const getTimeAgo = (dateString) => {
  const date = moment(dateString);
  const timeAgo = date.fromNow();
  return timeAgo;
};

export const getTimeLeft = (dateString) => {
  const date = moment(dateString);
  const timeLeft = date.fromNow();
  return timeLeft;
};

export const getPercentageTimeLeft = (startDateString, endDateString) => {
  const startDate = moment(startDateString);
  const endDate = moment(endDateString);
  const currentDate = moment();

  const totalTime = endDate - startDate;
  const leftTime = endDate - currentDate;

  const percentageTimeLeft = Math.ceil((leftTime / totalTime) * 100);

  return percentageTimeLeft;
};

export const formatNumber = (value = 0) => {
  return Intl.NumberFormat("en-US").format(value);
};

export const sleep = (ms = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
