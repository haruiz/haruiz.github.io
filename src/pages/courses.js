import React from 'react';
import {Box, Flex, Text} from "rebass";
import CustomLayout from "../components/CustomLayout";

export default function CoursesPage() {
    return (
        <CustomLayout title="Courses" description="Courses">
            <Flex flexDirection="column" justifyContent="space-between" alignItems="center" margin={30}>
                <Text textAlign="center"><h1> Courses</h1></Text>
                <Text textAlign="center"><h2>UAO AI-Specialization </h2></Text>
                <Box className="responsive-wrapper" textAlign="center">
                    <dl style={{textAlign: "center"}}>
                        <dd>
                            <a href="https://haruiz.github.io/fullstack-ai-notes/" target="_blank">
                                <Text textAlign="center">
                                    <h3>FullStack AI</h3>
                                </Text>
                            </a>
                        </dd>
                        <p>
                            The “Fullstack AI” course offered at Autonoma de Occidente University in Cali, Colombia. The course is part of the AI Specialization Program and aims to provide a comprehensive introduction to the design and development of AI systems, covering both theoretical and practical aspects. The course is designed to be accessible to students with varying backgrounds, including those without any prior experience in AI.
                        </p>
                    </dl>
                </Box>
            </Flex>
        </CustomLayout>
    );
}

{/*    <Box textAlign="center" style={{margin: 20}}>*/}
{/*        <h2>UAO AI-Specialization </h2>*/}
{/*        <dl style={{textAlign: "center"}}>*/}
{/*            <dd><a href="https://haruiz.github.io/FullStack-AI-Notes/" target="_blank">FullStack AI</a></dd>*/}
{/*            <p>*/}
{/*                the “Fullstack AI” course offered at Autonoma de Occidente University in Cali, Colombia. The course is part of the AI Specialization Program and aims to provide a comprehensive introduction to the design and development of AI systems, covering both theoretical and practical aspects. The course is designed to be accessible to students with varying backgrounds, including those without any prior experience in AI.*/}
{/*            </p>*/}
{/*        </dl>*/}
{/*    </Box>*/}
{/*</CustomLayout>*/}