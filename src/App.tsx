// src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { MyFormsPage } from './features/myforms/MyFormsPage';
import { CreateFormPage } from './features/create/CreateFormPage';
import { PreviewFormPage } from './features/preview/PreviewFormPage';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/myforms" />} />
          <Route path="/myforms" element={<MyFormsPage />} />
          <Route path="/create" element={<CreateFormPage />} />
          <Route path="/preview/:formId" element={<PreviewFormPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;