import Header from "../Header";
import React from "react";
import Layout from '@theme/Layout';
import {Flex} from "rebass";
import MUIThemeSync from "../MUIThemeSync";

export default function CustomLayout({title, description, children}) {
    return(
            <Layout title={title} description={description} >
                <MUIThemeSync>
                    <Header/>
                    <Flex flexDirection="column" justifyContent="space-between" alignItems="center" margin={30}>
                        {children}
                    </Flex>
                </MUIThemeSync>
            </Layout>
    )
}