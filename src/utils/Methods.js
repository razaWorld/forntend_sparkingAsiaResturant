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
  const phoneRegex = /^[569]\d{7}$/; // Accepts 8 digits starting with 5, 6, or 9

  if (!phone) {
    return 'Phone number is required';
  }

  if (phone.length !== 8) {
    return 'Phone number should be 8 digits';
  }

  if (!phoneRegex.test(phone)) {
    return 'Phone number must start with 5, 6, or 9 and be valid';
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
