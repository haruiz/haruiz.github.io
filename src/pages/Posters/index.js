import React from "react";
import CustomLayout from "../../components/CustomLayout";
import {Box} from "rebass";
import styles from "./index.module.css";
import clsx from "clsx";


export default function PostersPage() {
    const posters = [
        {
            title: "Using Deep Learning to Discover Cassava Roots on GPR Radargrams",
            url: "https://drive.google.com/file/d/1Q7hTs9Yt2IxR-iuz6G07IY1iSg7qNBLN",
        },
        {
            title: " Comparison of the Microsoft Kinect V2 and FARO Focus 120 for 3D Plant Phenotyping of Cassava (Manihot esculenta)",
            url: "https://drive.google.com/file/d/1-xbAarQTcn_vPuDmyR_1owc7lnMMW9g_",
        },
        {
            title: "Phenotyping and genome wide association for out-crossing traits in Indica Rice",
            url: "https://drive.google.com/file/d/1ExxpwfK6xnEnes45l46RwFH0jFwpuUvg"
        },

    ]
    return (
        <CustomLayout title="Posters" description="Posters">
            <Box textAlign="center">
                <h2>Posters</h2>
                {posters.map((poster, index) =>
                    <div key={index} >
                        <iframe src={`${poster.url}/preview`}  className={clsx(styles.responsive_iframe)} ></iframe>
                    </div>
                )}
            </Box>
        </CustomLayout>
    );
}