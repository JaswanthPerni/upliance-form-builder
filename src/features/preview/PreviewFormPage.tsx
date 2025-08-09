// src/features/preview/PreviewFormPage.tsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById } from '../../utils/localStorage';
import type { FormSchema, FormField } from '../../types';
import { Box, Button, Paper, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// A component to render the correct input based on field type
const FieldRenderer = ({ field }: { field: FormField }) => {
    switch (field.type) {
        case 'text':
        case 'number':
            return <TextField
                fullWidth
                margin="normal"
                type={field.type}
                label={field.label}
                required={field.required}
                defaultValue={field.defaultValue}
            />;
        case 'textarea':
            return <TextField
                fullWidth
                margin="normal"
                multiline
                rows={4}
                label={field.label}
                required={field.required}
                defaultValue={field.defaultValue}
            />;
        case 'date':
             return <DatePicker
                label={field.label}
                sx={{width: '100%', mt: 2, mb: 1}}
             />;
        case 'checkbox':
            return <FormControlLabel
                control={<Checkbox defaultChecked={field.defaultValue} />}
                label={field.label}
            />;
        // Add cases for other types like select, radio
        default:
            return <Typography>Unsupported field type: {field.type}</Typography>;
    }
}

export const PreviewFormPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (formId) {
      const schema = getFormById(formId);
      setFormSchema(schema || null);
    }
    setLoading(false);
  }, [formId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log('Form Submitted Data:', data);
    alert('Form submitted! Check the console for the data.');
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!formSchema) return <Typography>Form not found.</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>{formSchema.name}</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {formSchema.fields.map((field) => (
          <FieldRenderer key={field.id} field={field} />
        ))}
        <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
      </Box>
    </Paper>
  );
};