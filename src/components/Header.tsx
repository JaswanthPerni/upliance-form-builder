// src/components/Header.tsx

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          upliance.ai Form Builder
        </Typography>
        <Box>
          <Button color="inherit" component={NavLink} to="/myforms">
            My Forms
          </Button>
          <Button color="inherit" component={NavLink} to="/create">
            Create New Form
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;