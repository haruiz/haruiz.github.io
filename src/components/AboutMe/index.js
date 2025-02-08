import {Box, Flex, Text} from "rebass";
import React from "react";
import BadgeList from "../BadgesList";


export const AboutMe = () => {
    return (
        <Flex flexDirection="column" justifyContent="space-between" alignItems="center" margin={30}>
            <Box className="responsive-wrapper" textAlign="center">
                <Text textAlign="center"><h1> About Me</h1></Text>
                <p>
                    <h3>Current Position</h3>
                    I'm a Research Scientist at Texas A&M AgriLife. My expertise and research interests lie in applying
                    Geophysics tools like Ground-Penetrating Radar (GPR), mathematical and electromagnetism simulations,
                    signal processing, Artificial Intelligence, Machine Learning, and Deep Learning. My current research
                    is focused on designing, developing, and implementing end-to-end software solutions and
                    computational algorithms to analyze remote sensing datasets using state-of-the-art data science, signal processing, and machine learning methods.
                </p>

                <p>
                    <h3>Community Role</h3>
                    Beyond my research, I am an open-source advocate deeply committed to community engagement and
                    knowledge sharing. Leveraging on Google's recognition as a "Google Developer Expert" in Machine
                    Learning and a "Google Cloud Champion," I do my best to actively contribute to the community by
                    creating and publishing content around Machine Learning, TensorFlow, and related Google Cloud
                    Platform(GCP) services, such as Vertex AI, speaking at developer conferences and meetups, and
                    mentoring students and startups seeking guidance in the space of Machine Learning.
                </p>

                <p>
                    <h3>Background and academia</h3>
                    My academic journey is rooted in computer science and data science, culminating in a Ph.D. in
                    Engineering focused on ML and a graduate certificate in Remote Sensing from Texas A&M University.
                    Additionally, along with my academic accomplishments, I have over ten years of experience working in
                    the industry as a data science and full-stack software developer and teaching experience. This
                    background and my experience working with interdisciplinary teams of scientists and experts from
                    different fields have given me unique skills and the ability to work on breaking complex problems
                    into manageable pieces and uncovering efficient solutions within tight timelines.
                </p>
                <p>
                    <h3>Technical skills</h3>
                    I am passionate about programming and enjoy leveraging my skills to bring innovative ideas to life. As a certified member of the TensorFlow and Intel Edge AI networks, I am a full-stack developer proficient in Python, JavaScript, .Net, MATLAB, and C++. My expertise extends to mobile application development for Android and creating robust cloud solutions on GCP. As a data scientist, I have dedicated extensive hours to analyzing multidimensional data using a wide range of Machine Learning and Deep Learning libraries, including TensorFlow, PyTorch, Scikit-Learn, Scipy, Dask, Pandas, OpenVINO, and OpenCV.
                </p>
                I am open to collaborating and engaging in discussions about creating tools that could positively impact people's lives. Please feel free to reach out.
            </Box>

            <Box className="responsive-wrapper" textAlign="center">
                <h1> Recent achievements</h1>
                <ul style={{listStyle: "None"}}>
                    <li><a
                        href='https://www.credential.net/126939f1-8491-4677-bfed-2e27e23470d4?username=henryalonsoruizguzman691031#gs.7ve5em'
                        target="_blank"
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