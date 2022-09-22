import React from 'react';

// mui theme
import { ThemeProvider } from '@mui/material';
import muiTheme from 'theme/theme';

// global styles
import "assets/styles/global.css"

// components
import Layout from '@components/layout';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import store from '@reduxstore';

// next.js
import Head from 'next/head';

// image
import logo from "assets/images/logo.png"


const App = ({ Component, ...pageprops }) => (
    <ReduxProvider store={store}>
        <ThemeProvider theme={muiTheme}>
            <Head>
                <title> racusic </title>
                <link rel="icon" href={logo.src} />
            </Head>
            <Layout>
                <Component pageProps={pageprops} /> 
            </Layout>
        </ThemeProvider>
    </ReduxProvider>
)

export default App;