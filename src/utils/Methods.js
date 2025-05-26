export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return 'Email is required';
  }

  if (!emailRegex.test(email.trim())) {
    return 'Invalid email address';
  }

  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  return '';
};
export const validatePhone = (phone) => {
  const phoneRegex = /^03\d{9}$/; // Accepts 11 digits starting with '03' (common in Pakistan)

  if (!phone) {
    return 'Phone number is required';
  }

  if (phone.length !== 11) {
    return 'Phone number must be exactly 11 digits';
  }

  if (!phoneRegex.test(phone)) {
    return 'Phone number must start with 03 and be valid';
  }

  return '';
};

export const validateInput = (value) => {
  return typeof value === 'string' && value.trim().length !== 0
    ? ''
    : 'Please fill this field';
};


// utils/debounce.js
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
