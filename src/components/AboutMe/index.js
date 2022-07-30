import {Box, Flex, Text} from "rebass";
import React from "react";
import styles from "./index.module.css";
import clsx from "clsx";

export const AboutMe = () => {
    return (
        <Flex flexDirection="column" justifyContent="space-between" alignItems="center" margin={20}>
            <Box className={clsx(styles.wrapper)} textAlign="justify">
                <Text textAlign="center"><h1> About Me</h1></Text>
                <p>
                    Google Developer Expert (GDE) in Machine Learning, with a bachelor's and a Master's in Computer
                    Science. Currently working as a Data Scientist and pursuing my Ph.D. in Interdisciplinary
                    Engineering at Texas A&M University. In the last years, my research has focused on solving
                    agriculture problems using Machine Learning and Deep Learning.
                </p>
                <p>
                    Full-stack python and javascript developer, proficient in .Net, MATLAB, and C++. With experience
                    also working with Ml/Dl libraries such as Tensorflow, PyTorch, Scikit-Learn, Scipy, Dask, Pandas,
                    and Opencv.
                    I enjoy developing open source solutions focused on computer vision (FalconCV, CVStudio, Rigging.js)
                    and working on social meaning projects in my free time.
                </p>
            </Box>

            <Box className={clsx(styles.wrapper)} textAlign="center">
                <h1> Recent achievements</h1>
                <ul style={{listStyle: "None"}}>
                    <li><a href='https://graduation.udacity.com/confirm/LFG39WPU' target="_blank"
                           rel="noopener noreferrer">Deep Learning Udacity Nanodegree</a></li>
                    <li><a href='https://confirm.udacity.com/YLXC7HQK' target="_blank" rel="noopener noreferrer">Intel®
                        Edge AI for IoT Developers Nanodegree</a></li>
                    <li><a href='https://www.credly.com/badges/3339a9da-4af4-42eb-9b4b-d1e5e7ea422a' target="_blank"
                           rel="noopener noreferrer">Intel Edge AI Certification</a></li>
                    <li><a href='https://www.credential.net/296580df-2e88-4a20-8a77-961b7152209d' target="_blank"
                           rel="noopener noreferrer">Tensorflow Developer Certificated</a></li>
                </ul>
            </Box>

            <Box className={clsx(styles.wrapper)} textAlign="center">
                <h1> Publications</h1>
                <a href='https://scholar.google.com/citations?user=QvVPUMoAAAAJ&hl=en' target="_blank"
                   rel="noopener noreferrer">Google Scholar Profile</a>
            </Box>
        </Flex>
    )
}