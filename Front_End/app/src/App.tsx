import React, { useRef } from 'react';
import {useRoutes} from "react-router-dom"
import { routes } from './routes';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from './util/mui_config/theme';
import { CssBaseline } from '@mui/material';
import { getAccessToken } from './util/getToken/getToken';
import Header from './comp/Header';

function App() {
 
  return( 
    <ThemeProvider theme={lightTheme} >
        <CssBaseline />
   
      {useRoutes(routes)}
    </ThemeProvider>
  
    
    )
 
}

export default App;
