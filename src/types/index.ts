// src/types/index.ts

export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';

export interface ValidationRule {
  type: 'notEmpty' | 'minLength' | 'maxLength' | 'isEmail' | 'password';
  value?: any;
  message: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  options?: string[]; // For select, radio
  validations: ValidationRule[];
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}