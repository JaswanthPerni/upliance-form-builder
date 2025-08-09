// src/features/create/CreateFormPage.tsx

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../app/store';
import {
  addField,
  setFormName,
  saveCurrentForm,
  resetCurrentForm,
} from '../../app/formBuilderSlice';
import { FieldEditor } from './FieldEditor';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';
import type { FieldType } from '../../types';

export const CreateFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentForm = useSelector((state: RootState) => state.formBuilder.currentForm);
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType>('text');

  const handleAddFeld = () => {
    dispatch(addField(selectedFieldType));
  };

  const handleSaveForm = () => {
    if (!currentForm.name.trim()) {
        alert('Please provide a form name.');
        return;
    }
    dispatch(saveCurrentForm()); // Save to localStorage
    alert(`Form "${currentForm.name}" saved!`);
    dispatch(resetCurrentForm()); // Reset for the next form
    navigate('/myforms');
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Form Builder
        </Typography>
        <TextField
          fullWidth
          label="Form Name"
          value={currentForm.name}
          onChange={(e) => dispatch(setFormName(e.target.value))}
          variant="outlined"
        />
      </Paper>

      {currentForm.fields.map((field) => (
        <FieldEditor key={field.id} field={field} />
      ))}

      <Paper sx={{ p: 2, mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl size="small" sx={{minWidth: 150}}>
          <InputLabel>Field Type</InputLabel>
          <Select
            value={selectedFieldType}
            label="Field Type"
            onChange={(e) => setSelectedFieldType(e.target.value as FieldType)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            <MenuItem value="textarea">Textarea</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="checkbox">Checkbox</MenuItem>
            {/* Add other field types here */}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={handleAddFeld}>
          Add Field
        </Button>
        <Box flexGrow={1} />
        <Button variant="contained" color="primary" onClick={handleSaveForm} disabled={currentForm.fields.length === 0}>
          Save Form
        </Button>
      </Paper>
    </Box>
  );
};