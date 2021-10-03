export const isImageURL = (url: string) => {
  if (typeof url !== "string") {
    return false;
  }
  return /\.(jpg|jpeg|gif|png)$/.exec(url) != null;
};
