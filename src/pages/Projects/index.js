import CustomLayout from "../../components/CustomLayout";
import {Box} from "rebass";
import React from "react";
import OpenSourceProjects from "./Projects";

export default function PublicationsPage() {
    return (
        <CustomLayout title="Open Source Projects" description="Open source projects and contributions.">
            <Box textAlign="center" style={{margin: 20}} className="responsive-wrapper">
                <h2>Selected Open Source Projects</h2>
                <OpenSourceProjects />
            </Box>
        </CustomLayout>
    );
}