import Header from "../Header";
import React from "react";
import Layout from '@theme/Layout';
import {Flex} from "rebass";

export default function CustomLayout({title, description, children}) {
    return(
        <Layout title={title} description={description} >
            <Header/>
            <Flex flexDirection="column" justifyContent="space-between" alignItems="center" margin={30}>
                {children}
            </Flex>
        </Layout>
    )
}