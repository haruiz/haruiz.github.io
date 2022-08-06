import React from 'react';
import CustomLayout from "../../components/CustomLayout";
import {Box} from "rebass";
import Cite from "citation-js";

export default function CoursesPage() {
    return (
        <CustomLayout title="Courses" description="Courses">
            <Box textAlign="center" style={{margin: 20}}>
                <h2>Data Science Course</h2>
                <u>
                    <l><a href="/blog/python-environments-with-pyenv-and-poetry">Data Science notes - Python environments with pyenv and poetry</a></l>
                </u>
            </Box>
        </CustomLayout>
    );
}