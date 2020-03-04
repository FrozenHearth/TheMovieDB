export const trunc = (string, length, delimiter) => {
  if (length) {
    delimiter = delimiter || '...';
    return string.length > length
      ? string.substr(0, length) + delimiter
      : string;
  }
};
