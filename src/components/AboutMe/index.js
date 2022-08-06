import {Box, Flex, Text} from "rebass";
import React from "react";
import BadgeList from "../BadgesList";


export const AboutMe = () => {
    return (
        <Flex flexDirection="column" justifyContent="space-between" alignItems="center" margin={30}>
            <Box className="responsive-wrapper" textAlign="justify">
                <Text textAlign="center"><h1> About Me</h1></Text>
                <p>
                    <a href="https://developers.google.com/community/experts/directory/profile/profile-henry-alonso-ruiz-guzman">Google
                        Developer Expert (GDE) in Machine Learning</a>, Currently working as a Data Scientist and
                    pursuing my Ph.D. in Interdisciplinary Engineering at Texas A&M University. My research has
                    focused on solving agriculture problems using Remote sensing, Machine learning, and deep
                    learning.
                </p>
                <p>
                    As part of my dissertation, I have developed GPR-Studio, user-friendly software that allows
                    users to process and analyze GPR(Ground penetrating radar) data that could be used for
                    several engineering and science applications, including agriculture, geotechnical,
                    transportation, archaeology, geoscience, etc.
                </p>
                <p>
                    Recently we published a paper entitled "The Fortress Beneath: Ground Penetrating Radar
                    Imaging of the Citadel at Alcatraz: 1. A Guide for Interpretation", where we used GPR studio
                    to analyze the data. This study points to the development of a radar facies classification
                    scheme that is specific to cultural heritage investigations
                    My Ph.D. research areas are Geophysics tools (Ground Penetrating Radar), mathematical
                    simulation, electromagnetism, signal processing, Machine Learning, and Deep Learning.

                </p>
                <p>
                    Full-stack python and javascript developer, proficient in .Net, MATLAB, and C++. With experience
                    also working with Ml/Dl libraries such as Tensorflow, PyTorch, Scikit-Learn, Scipy, Dask, Pandas,
                    and Opencv.
                    I enjoy developing open source solutions focused on computer vision (FalconCV, CVStudio, Rigging.js)
                    and working on social meaning projects in my free time.
                </p>
            </Box>

            <Box className="responsive-wrapper" textAlign="center">
                <h1> Recent achievements</h1>
                <ul style={{listStyle: "None"}}>
                    <li><a href='https://www.credential.net/126939f1-8491-4677-bfed-2e27e23470d4?username=henryalonsoruizguzman691031#gs.7ve5em' target="_blank"
                           rel="noopener noreferrer">Graduate Remote Sensing Certificate</a></li>
                    <li><a href='https://www.credential.net/296580df-2e88-4a20-8a77-961b7152209d' target="_blank"
                           rel="noopener noreferrer">Tensorflow Developer Certificated</a></li>
                    <li><a href='https://www.credly.com/badges/3339a9da-4af4-42eb-9b4b-d1e5e7ea422a' target="_blank"
                           rel="noopener noreferrer">Intel Edge AI Certification</a></li>
                    <li><a href='https://graduation.udacity.com/confirm/LFG39WPU' target="_blank"
                           rel="noopener noreferrer">Deep Learning Udacity Nanodegree</a></li>
                    <li><a href='https://confirm.udacity.com/YLXC7HQK' target="_blank" rel="noopener noreferrer">Intel®
                        Edge AI for IoT Developers Nanodegree</a></li>
                </ul>
            </Box>

            <Box className="responsive-wrapper" textAlign="center">
                <h1> Publications</h1>
                <a href='https://scholar.google.com/citations?user=QvVPUMoAAAAJ&hl=en' target="_blank"
                   rel="noopener noreferrer">Google Scholar Profile</a>
            </Box>

            <Box className="responsive-wrapper" textAlign="center">
                <h1>Issued Badges</h1>
                <a href='https://g.dev/haruiz' target="_blank"
                   rel="noopener noreferrer">Google Developer Profile</a>
                <BadgeList/>
            </ Box>

        </Flex>
    )
}