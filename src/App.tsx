// src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { MyFormsPage } from './features/myforms/MyFormsPage';
import { CreateFormPage } from './features/create/CreateFormPage';
import { PreviewFormPage } from './features/preview/PreviewFormPage';
import { Container, Box } from '@mui/material';

function App() {
  return (
    // This outer Box makes our app a flex column that fills the screen's height
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      {/* This "main" Box is now the flexible part that will center everything */}
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,                // CRITICAL: Allows this box to take up all available vertical space
          justifyContent: 'center', // Centers horizontally
          alignItems: 'center',     // CRITICAL: Centers vertically
        }}
      >
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Navigate to="/myforms" />} />
            <Route path="/myforms" element={<MyFormsPage />} />
            <Route path="/create" element={<CreateFormPage />} />
            <Route path="/preview/:formId" element={<PreviewFormPage />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;