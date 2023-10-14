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
      queryParams.push(`${prop}=${encodeURIComponent(query[prop])}`);
    }
  }

  if (queryParams.length > 0) {
    const queryString = queryParams.join("&");
    return `${baseURL}?${queryString}`;
  } else {
    return baseURL;
  }
};
