import React from 'react';
import {Box} from "rebass";
import CustomLayout from "../components/CustomLayout";

export default function CoursesPage() {
    return (
        <CustomLayout title="Courses" description="Courses">
            <Box textAlign="center" style={{margin: 20}}>
                <h2>Data Science Course</h2>
                <dl style={{textAlign: "center"}}>
                    <dd><a href="/blog/python-environments-with-pyenv-and-poetry">Python environments with pyenv and poetry</a></dd>
                    <dd><a href="/blog/python-for-data-science-part-1">Python for Data Science - Part 1</a></dd>
                </dl>
            </Box>
        </CustomLayout>
    );
}