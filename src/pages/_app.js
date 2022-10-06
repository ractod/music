import React, {useEffect} from 'react';

// mui theme
import { ThemeProvider } from '@mui/material';
import muiTheme from 'theme/theme';

// global styles
import "assets/styles/global.css"
import 'react-toastify/dist/ReactToastify.css';
import "assets/styles/toastify.css"

// components
import Layout from '@components/layout';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import store from '@reduxstore';
import { loadUser } from '@reduxauth/authActions';

// next.js
import Head from 'next/head';

// image
import logo from "assets/images/logo.png"

// library
import axios from 'axios';

// global setting for axios
axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true

const App = (Props) => {

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <ReduxProvider store={store}>
            <ThemeProvider theme={muiTheme}>
                <Head>
                    <title> racusic </title>
                    <link rel="icon" href={logo.src} />
                </Head>
                <Layout>
                    <Props.Component {...Props.pageProps} />
                </Layout>
            </ThemeProvider>
        </ReduxProvider>
    )
}

export default App;