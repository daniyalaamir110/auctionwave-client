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
