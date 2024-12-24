const validatePhoneNumber = (number) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(number.replace(/[\s-]/g, ''));
};

const validatePhoneNumbers = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return false;
  }
  return numbers.every(num => validatePhoneNumber(num));
};

module.exports = {
  validatePhoneNumber,
  validatePhoneNumbers
};