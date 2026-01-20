import React, {useCallback, useContext, useEffect, useState} from 'react';
import CustomLayout from "../components/CustomLayout";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import {Box, Button, useTheme} from "@mui/material";
import Stack from '@mui/material/Stack';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function NewsLetterPage() {
    const {siteConfig} = useDocusaurusContext();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))
    const sxConfig = isMatch ? {
        width: '100%',
    } : {
        width: '70%',
    };
    const {CONVERTKIT_FORM_ID, CONVERTKIT_API_KEY} = siteConfig.customFields;
    const [status, setStatus] = useState(null);
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")

    const subscribe = useCallback(async () => {
        const endpoint = `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`;
        try {
            const data = {
                api_key: CONVERTKIT_API_KEY,
                email,
                first_name: firstName
            }
            const response = await fetch(endpoint, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const json = await response.json();
            if (response.status === 200) {
                setStatus("SUCCESS")
            } else{
                setStatus("ERROR")
            }
        }
        catch (e) {
            setStatus("ERROR")
        }

    },[email, firstName]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        await subscribe();
    }

    const handleEmailChange = (event) => {
        const { value } = event.target
        setEmail(value)
    }

    const handleFirstNameChange = (event) => {
        const { value } = event.target
        setFirstName(value)
    }

    const subscribeForm = (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <TextField id="txtFirstName"
                           label="First Name"
                           onChange={handleFirstNameChange}
                           value={firstName}
                           variant="standard" />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <TextField id="txtEmail"
                           label="Email"
                           type="email"
                           onChange={handleEmailChange}
                           value={email}
                           variant="standard" />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} >
                <Button size="large" variant="contained" type="submit">Subscribe</Button>
            </FormControl>
        </form>
    )

    const renderComponent = () => {
        if (status === "SUCCESS") {
            return (<>
                    <p>
                        Welcome aboard{firstName ? `, ${firstName}` : ""}{" "}
                        <span role="img" aria-label="Ship">🚢</span>
                    </p>
                    <p>Please check your inbox(Also the spam folder) to confirm your subscription!</p>
            </>)
        } else if (status === "ERROR") {
            return (
                <>
                    <p>Oops, something went wrong...</p>
                    <p>
                        Please,{" "}
                        <button onClick={() => setStatus(null)}>try again.</button>
                    </p>
                </>
            )
        } else {
            return subscribeForm
        }
    }

    return (
        <CustomLayout title="NewsLetter" description="NewsLetter">
            <Stack spacing={2}  sx={sxConfig}  textAlign="center">
                <Box>
                    <h1>Get Blog Updates</h1>

                    Thanks for taking the time to check my blog. My objective in this space is nothing more than to share with the community what I have learned doing my master's and Ph.D. (For Free) So, if you want to receive an email every time I publish a new blog post, please subscribe to my newsletter. I aim to publish at least one monthly post related to Data Science, Machine Learning, and Remote Sensing. So, I hope this material can help you to move forward in your journey to becoming a data scientist.
                </Box>
                <Box>
                    {renderComponent()}
                </Box>
            </Stack>
        </CustomLayout>
    );
}