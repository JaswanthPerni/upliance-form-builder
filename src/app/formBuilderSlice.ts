// src/app/formBuilderSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField, FormSchema } from '../types';
import { nanoid } from 'nanoid';
import { addForm } from '../utils/localStorage';

interface FormBuilderState {
  currentForm: FormSchema;
}

const initialState: FormBuilderState = {
  currentForm: {
    id: nanoid(),
    name: 'Untitled Form',
    createdAt: new Date().toISOString(),
    fields: [],
  },
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    setFormName: (state, action: PayloadAction<string>) => {
      state.currentForm.name = action.payload;
    },
    addField: (state, action: PayloadAction<FormField['type']>) => {
      const newField: FormField = {
        id: nanoid(),
        type: action.payload,
        label: `New ${action.payload} field`,
        required: false,
        validations: [],
      };
      state.currentForm.fields.push(newField);
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.currentForm.fields = state.currentForm.fields.filter(
        (field) => field.id !== action.payload
      );
    },
    updateField: (state, action: PayloadAction<FormField>) => {
      const index = state.currentForm.fields.findIndex(
        (field) => field.id === action.payload.id
      );
      if (index !== -1) {
        state.currentForm.fields[index] = action.payload;
      }
    },
    reorderFields: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fields } = state.currentForm;
      const [movedField] = fields.splice(action.payload.fromIndex, 1);
      fields.splice(action.payload.toIndex, 0, movedField);
    },
    saveCurrentForm: (state) => {
        addForm(state.currentForm);
    },
    resetCurrentForm: (state) => {
        state.currentForm = {
            id: nanoid(),
            name: 'Untitled Form',
            createdAt: new Date().toISOString(),
            fields: [],
        };
    }
  },
});

export const {
  setFormName,
  addField,
  removeField,
  updateField,
  reorderFields,
  saveCurrentForm,
  resetCurrentForm,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;