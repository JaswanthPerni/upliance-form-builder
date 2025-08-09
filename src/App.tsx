// src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { MyFormsPage } from './features/myforms/MyFormsPage';
import { CreateFormPage } from './features/create/CreateFormPage';
import { PreviewFormPage } from './features/preview/PreviewFormPage';
import { Container, Box } from '@mui/material'; // Make sure Box is imported

function App() {
  return (
    <>
      <Header />
      {/* --- NEW CENTERING BOX --- */}
      {/* This Box acts as the main content area for all pages */}
      <Box
        component="main" // Using a semantic HTML tag is good practice
        sx={{
          display: 'flex',          // Enables Flexbox layout
          justifyContent: 'center', // Centers the content horizontally
          alignItems: 'flex-start',   // Aligns content to the top
          py: 4,                      // Adds vertical padding (4 * 8px = 32px)
        }}
      >
        <Container maxWidth="lg"> {/* The Container still controls the max width of the content */}
          <Routes>
            <Route path="/" element={<Navigate to="/myforms" />} />
            <Route path="/myforms" element={<MyFormsPage />} />
            <Route path="/create" element={<CreateFormPage />} />
            <Route path="/preview/:formId" element={<PreviewFormPage />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
}

export default App;