'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import GitHub from '@mui/icons-material/GitHub';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = !!anchorEl;

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: { xs: 'space-between', sm: 'start' } }}>
        <Box sx={{ display: { sm: 'none' } }}>
          <IconButton
            color="inherit"
            size="large"
            aria-label="Menu"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            keepMounted
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Link
                component={NextLink}
                href="/moves"
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                Moves
              </Link>
            </MenuItem>
          </Menu>
        </Box>
        <Link
          component={NextLink}
          href="/"
          variant="h5"
          sx={{ color: 'inherit', textDecoration: 'none' }}
        >
          Pokedex
        </Link>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 6 }}>
          <Button
            component={NextLink}
            href="/moves"
            variant="text"
            sx={{ color: 'inherit' }}
          >
            Moves
          </Button>
        </Box>
        <IconButton
          href="https://github.com/borenx1/pokedex"
          color="inherit"
          size="large"
          aria-label="GitHub"
          sx={{ ml: { sm: 'auto' } }}
        >
          <GitHub />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
