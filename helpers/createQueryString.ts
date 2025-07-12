const createQueryString = (params: Record<string, string>) => {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
};

export default createQueryString;
