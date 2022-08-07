import React from 'react';
import Layout from '@theme/Layout';
import Header from "../components/Header";
import {AboutMe} from "../components/AboutMe";


export default function IndexPage() {
    return (
        <Layout title="Hello" description="Hello From my Blog">
            <Header/>
            <AboutMe/>
        </Layout>
    );
}