export const parseObject = (obj: Object) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (value === undefined) {
        return null;
      }
      return value;
    })
  );
};

// Pauses for a number of ms
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Format currency on the standard R$1.234.567,89
export const currencyFormat = (num: number, digits: number) => {
  return (
    "R$" +
    num
      .toFixed(digits) // always two decimal digits
      .replace(".", ",") // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  ); // use . as a separator
};
