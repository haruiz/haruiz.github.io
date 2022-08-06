import React from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Banner} from "../Banner";
import {GithubCorner} from "../GitHubCorner";
import {ProfilePicture} from "./profilePicture";
import {MeStatement} from "./meStatement";
import {ProInterests} from "./interests";
import {BuyMeACoffee} from "./buyMeACoffee";
import { useMediaQuery } from 'react-responsive'
import styles from "./index.module.css";
import clsx from "clsx";

export default function  Header(){

    const {siteConfig} = useDocusaurusContext();
    const {githubUri, pictureUri} = siteConfig.customFields;
    const btnBuyMeACoffeeStyle ={
        margin: "20px"
    }

    return (
        <header>
            <Banner>
                <div>
                <GithubCorner repoUri={githubUri} className={clsx(styles.github_corner)}/>
                <div className={clsx(styles.profile_pic_wrapper_div)}>
                    <ProfilePicture opacity={0.8} pictureUri={pictureUri} className={clsx(styles.profile_pic)} />
                </div>
                <MeStatement strings={siteConfig.tagline.split("|")}/>
                <ProInterests className={clsx(styles.pro_interest_div)}/>
                 <div style={btnBuyMeACoffeeStyle}>
                    <BuyMeACoffee/>
                 </div>
                </div>
            </Banner>
        </header>
    )
};