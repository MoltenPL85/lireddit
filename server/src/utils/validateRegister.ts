import { FieldError } from '../resolvers/FieldError';
import { UsernamePasswordInput } from '../resolvers/UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  const errors: FieldError[] = [];
  if (options.username.length <= 2) {
    errors.push({
      field: 'username',
      message: 'Length must be greater than 2',
    });
  }

  if (options.username.includes('@')) {
    errors.push({
      field: 'username',
      message: 'Cannot include an @',
    });
  }

  if (options.password.length <= 2) {
    errors.push({
      field: 'password',
      message: 'Length must be greater than 2',
    });
  }

  if (!options.email.includes('@')) {
    errors.push({
      field: 'email',
      message: 'Invalid email',
    });
  }

  if (errors.length) {
    return errors;
  }

  return null;
};
