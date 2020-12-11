import React, { InputHTMLAttributes } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  InputProps,
} from '@chakra-ui/react';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextarea = Input as React.FC<InputProps>;
  if (textarea) {
    InputOrTextarea = Textarea as React.FC<InputProps>;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
