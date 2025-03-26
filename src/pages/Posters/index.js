import React, {useState} from "react";
import {Suspense} from "react";
import CustomLayout from "../../components/CustomLayout";
import {Box} from "rebass";
import styles from "./index.module.css";
import clsx from "clsx";

const LoadingPoster = () => <div >Loading poster...</div>

const PosterIframe = ({title, url}) => {
    const [loadingIframe, setLoadingIframe] = useState(true);
    return (
        <>
        {loadingIframe && <LoadingPoster />}
        <iframe
            src={`${url}/preview`}
            className={clsx(styles.responsive_iframe)}
            onLoad={() => setLoadingIframe(false)}
            />
        </>
    )
}

export default function PostersPage() {
    const posters = [
        {
            title: "Using GPR and Machine Learning to Automate the Predictions of Root and Tuber Crop Biomass",
            url: "https://drive.google.com/file/d/1-EYlvvtlEWD5GRU_VCLSIvXeqwTWebsL"
        },
        {
            title: "Ground Penetrating Radar (GPR) curvelet analysis at the citadel of Alcatraz",
            url: "https://drive.google.com/file/d/1-Ej2zN8fY26Qan1h-8vCNBuGMwstWqrc"
        },
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
                        <PosterIframe title={poster.title} url={poster.url}/>
                    </div>
                )}
            </Box>
        </CustomLayout>
    );
}