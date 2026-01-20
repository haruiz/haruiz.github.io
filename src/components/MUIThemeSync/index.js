import React from 'react';
import {useColorMode} from "@docusaurus/theme-common";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {blueGrey, lightGreen} from '@mui/material/colors';

function Index({children}) {
    const { colorMode } = useColorMode();

    const theme = React.useMemo(
        () =>
            createTheme(colorMode === 'dark' ? {
                palette: {
                    mode: 'dark',
                    primary: {
                        main: "#3FC48B"
                    }
                }
            }   : {
                palette: {
                    mode: 'light',
                    primary: {
                        main: blueGrey[900]
                    }
                }
            }),
        [colorMode],
    );
    return (
        <>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </>
    );
}

export default Index;