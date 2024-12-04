import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const theme = extendTheme(
  {
    colors: {
      brandPrimary: '#7D2520', // Pepperoni
      brandSecondary: '#1C3144', // Orbital
      brandTertiary: '#FAE6A3', // Crust
      brandBackground: '#FCFBF8', // Starlight
      pepperoni: {
        50: '#fef3f2',
        100: '#fde4e3',
        200: '#fdcecb',
        300: '#faaba7',
        400: '#f47c75',
        500: '#ea5249',
        600: '#d7342b',
        700: '#b52820',
        800: '#95251f',
        900: '#7d2520', // <- Primary
        950: '#430f0c',
      },
      firebrick: {
        50: '#fdf4f3',
        100: '#fce7e4',
        200: '#fad4ce',
        300: '#f5b6ac',
        400: '#ee8a7b',
        500: '#e26451',
        600: '#ce4934',
        700: '#a53726',
        800: '#8f3325',
        900: '#782f24',
        950: '#41150e',
      },
      orbital: {
        50: '#f4f7fb',
        100: '#e7f0f7',
        200: '#cadeed',
        300: '#9cc3dd',
        400: '#66a4ca',
        500: '#4389b4',
        600: '#316d98',
        700: '#29587b',
        800: '#254b67',
        900: '#244056',
        950: '#1c3144', // <- Secondary
      },
      crust: {
        50: '#fefaec',
        100: '#fcf0c9',
        200: '#fae6a3', // <- Tertiary
        300: '#f6cb53',
        400: '#f3b62c',
        500: '#ed9513',
        600: '#d1700e',
        700: '#ae4f0f',
        800: '#8d3d13',
        900: '#743313',
        950: '#431905',
      },
      starlight: {
        50: '#fcfbf8', // <- Background
        100: '#f2eee2',
        200: '#e5dcc3',
        300: '#d4c49d',
        400: '#c2a775',
        500: '#b5915a',
        600: '#a77e4f',
        700: '#8b6643',
        800: '#71523b',
        900: '#5c4532',
        950: '#312319',
      },
    },
    styles: {
      global: {
        body: {
          bg: '#fcfbf8',
          color: '#1c3144',
        },
      },
    },
    fonts: {
      heading: 'Unbounded, sans-serif',
    },
  },
  withDefaultColorScheme({ colorScheme: 'pepperoni' })
);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
