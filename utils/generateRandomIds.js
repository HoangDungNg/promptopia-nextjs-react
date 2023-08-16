function processIds() {
  let count = 0;
  return function () {
    count++;
    return `app_${count}`;
  };
}

export const generateRandomIds = processIds();
