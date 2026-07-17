import { validate } from '../utils/validation';

describe('validate', () => {
  describe('reply mode', () => {
    it('returns errors for empty fields', () => {
      const data = { name: '', email: '', phone: '', message: '' };
      const { isValid, errors } = validate(data, 'reply');
      
      expect(isValid).toBe(false);
      expect(errors.name).toBe('Name must be at least 2 characters.');
      expect(errors.email).toBeUndefined();
      expect(errors.phone).toBeUndefined();
      expect(errors.message).toBe('Message must be at least 10 characters.');
    });

    it('returns error for invalid email', () => {
      const data = { name: 'John Doe', email: 'invalid-email', phone: '1234567890', message: 'Hello there message' };
      const { isValid, errors } = validate(data, 'reply');
      
      expect(isValid).toBe(false);
      expect(errors.email).toBe('Please enter a valid email address.');
    });

    it('passes for valid reply form', () => {
      const data = { name: 'John Doe', email: 'john@example.com', phone: '1234567890', message: 'Hello there message' };
      const { isValid, errors } = validate(data, 'reply');
      
      expect(isValid).toBe(true);
      expect(Object.keys(errors).length).toBe(0);
    });
  });

  describe('anonymous mode', () => {
    it('returns error for empty message', () => {
      const data = { name: '', email: '', phone: '', message: '' };
      const { isValid, errors } = validate(data, 'anonymous');
      
      expect(isValid).toBe(false);
      expect(errors.message).toBe('Message must be at least 10 characters.');
      expect(errors.name).toBeUndefined(); // name is ignored
      expect(errors.email).toBeUndefined(); // email is ignored
    });

    it('passes for valid anonymous form', () => {
      const data = { name: '', email: '', phone: '', message: 'A secret thought that is long enough' };
      const { isValid, errors } = validate(data, 'anonymous');
      
      expect(isValid).toBe(true);
      expect(Object.keys(errors).length).toBe(0);
    });
  });
});
