/**
 * Form validation utility.
 * Validates only visible fields based on the selected mode.
 */

const PHONE_REGEX = /^[+]?[\d\s\-().]{7,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(formData, mode) {
  const errors = {};
  const trimmed = {
    name: (formData.name || '').trim(),
    phone: (formData.phone || '').trim(),
    email: (formData.email || '').trim(),
    message: (formData.message || '').trim(),
  };

  if (mode === 'reply') {
    if (trimmed.name.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (trimmed.phone && !PHONE_REGEX.test(trimmed.phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }

    if (trimmed.email && !EMAIL_REGEX.test(trimmed.email)) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  // Message is required in both modes
  if (trimmed.message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
