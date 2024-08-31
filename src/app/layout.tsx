import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import theme from '@/theme';

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Browse and compare Pokemon using this tool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppBar position="static" color="primary">
                <Toolbar>
                  <Typography variant="h5" component="div">
                    Pokedex
                  </Typography>
                </Toolbar>
              </AppBar>
              {children}
              <Box component="footer" sx={{ mt: 'auto', pt: 8, pb: 4, px: 4 }}>
                <Typography variant="body2" align="center">
                  Made with the help of{' '}
                  <Link href="https://pokeapi.co/">PokeAPI</Link>
                </Typography>
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
