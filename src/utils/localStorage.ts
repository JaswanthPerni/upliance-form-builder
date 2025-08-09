// src/utils/localStorage.ts

import type { FormSchema } from '../types';

const FORMS_KEY = 'savedForms';

export const getSavedForms = (): FormSchema[] => {
  const formsJson = localStorage.getItem(FORMS_KEY);
  return formsJson ? JSON.parse(formsJson) : [];
};

export const saveForms = (forms: FormSchema[]) => {
  localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
};

export const addForm = (newForm: FormSchema) => {
  const forms = getSavedForms();
  forms.push(newForm);
  saveForms(forms);
};

export const getFormById = (formId: string): FormSchema | undefined => {
  const forms = getSavedForms();
  return forms.find(form => form.id === formId);
};