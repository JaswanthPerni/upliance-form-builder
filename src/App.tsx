// src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { MyFormsPage } from './features/myforms/MyFormsPage';
import { CreateFormPage } from './features/create/CreateFormPage';
import { PreviewFormPage } from './features/preview/PreviewFormPage';
import { Container, Box } from '@mui/material';

function App() {
  return (
    <Box>
      <Header />

      <Box component="main" sx={{ py: 4 }}>
        {/*
          By setting maxWidth={false}, we remove the width limit.
          The Container now takes up the full width of the screen,
          while still providing consistent horizontal padding on the sides.
        */}
        <Container maxWidth={false}>
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