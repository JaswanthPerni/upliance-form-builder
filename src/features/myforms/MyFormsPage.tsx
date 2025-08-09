// src/features/myforms/MyFormsPage.tsx

import { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSavedForms } from '../../utils/localStorage';
import { FormSchema } from '../../types';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const MyFormsPage = () => {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setForms(getSavedForms());
  }, []);

  const handlePreviewClick = (formId: string) => {
    navigate(`/preview/${formId}`);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Saved Forms
      </Typography>
      {forms.length > 0 ? (
        <List>
          {forms.map((form) => (
            <ListItem
              key={form.id}
              secondaryAction={
                <IconButton edge="end" aria-label="preview" onClick={() => handlePreviewClick(form.id)}>
                  <VisibilityIcon />
                </IconButton>
              }
              sx={{ border: '1px solid #ddd', mb: 1, borderRadius: 1 }}
            >
              <ListItemText
                primary={form.name}
                secondary={`Created on: ${new Date(form.createdAt).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box textAlign="center" mt={4}>
            <Typography>No forms found. Create one!</Typography>
            <Button variant="contained" sx={{mt: 2}} onClick={() => navigate('/create')}>Create Form</Button>
        </Box>
      )}
    </Paper>
  );
};