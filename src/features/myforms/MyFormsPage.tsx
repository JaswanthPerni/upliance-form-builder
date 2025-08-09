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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSavedForms, deleteForm } from '../../utils/localStorage';
import type { FormSchema } from '../../types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon

export const MyFormsPage = () => {
  const [forms, setForms] = useState<FormSchema[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setForms(getSavedForms());
  }, []);
  
  const handlePreviewClick = (formId: string) => {
    navigate(`/preview/${formId}`);
  };

  // --- NEW FUNCTIONS TO HANDLE DELETION ---

  // Opens the confirmation dialog
  const handleDeleteClick = (formId: string) => {
    setFormToDelete(formId);
    setOpenConfirmDialog(true);
  };

  // Closes the dialog if the user cancels
  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
    setFormToDelete(null);
  };

  // Deletes the form when the user confirms
  const handleConfirmDelete = () => {
    if (formToDelete) {
      deleteForm(formToDelete); // Call our localStorage utility
      setForms(getSavedForms()); // Update the list on the screen
      handleCloseDialog();
    }
  };

  return (
    <>
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
                  // --- UPDATED PART ---
                  <Box>
                    <IconButton edge="end" aria-label="preview" onClick={() => handlePreviewClick(form.id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" sx={{ ml: 1 }} onClick={() => handleDeleteClick(form.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
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
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/create')}>Create Form</Button>
          </Box>
        )}
      </Paper>
      
      {/* --- NEW CONFIRMATION DIALOG --- */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this form? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};