// src/features/create/FieldEditor.tsx
import { FormField } from "../../types";
import { useDispatch } from "react-redux";
import { removeField, updateField } from "../../app/formBuilderSlice";
import {
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface FieldEditorProps {
  field: FormField;
}

export const FieldEditor = ({ field }: FieldEditorProps) => {
  const dispatch = useDispatch();

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newField = {
        ...field,
        [name]: type === 'checkbox' ? checked : value
    };
    dispatch(updateField(newField));
  };

  const handleDelete = () => {
    dispatch(removeField(field.id));
  };

  return (
    <Paper sx={{ p: 2, mb: 2, border: "1px solid #eee" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{field.type.toUpperCase()} Field</Typography>
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Box>
      <TextField
        fullWidth
        label="Label"
        name="label"
        value={field.label}
        onChange={handleUpdate}
        variant="outlined"
        margin="normal"
        size="small"
      />
      <FormControlLabel
        control={
            <Checkbox 
                checked={field.required}
                onChange={handleUpdate}
                name="required"
            />
        }
        label="Required"
      />
    </Paper>
  );
};