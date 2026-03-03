/**
 * Validation schemas
 * Centralized validation rules for forms
 */

export const validators = {
  required: (value: any): boolean => {
    return value !== undefined && value !== null && value !== '';
  },

  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  minLength:
    (min: number) =>
    (value: string): boolean => {
      return value.length >= min;
    },

  maxLength:
    (max: number) =>
    (value: string): boolean => {
      return value.length <= max;
    },

  phone: (value: string): boolean => {
    const phoneRegex = /^\d{10,11}$/;
    return phoneRegex.test(value.replaceAll(/\s+/g, ''));
  },
};

export default validators;
