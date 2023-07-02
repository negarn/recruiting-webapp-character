export const getModifier = (value) => Math.floor((value - 10) / 2);

export const showErrorMessage = (message) => {
  window.alert(message);
};

export const validValue = (value) => {
  if (value < 0) {
    showErrorMessage("Value can't be below zero");
    return false;
  }
  return true;
};
