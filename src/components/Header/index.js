import React, {useEffect} from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Banner} from "../Banner";
import {GithubCorner} from "../GitHubCorner";
import {ProfilePicture} from "./profilePicture";
import {MeStatement} from "./meStatement";
import {ProInterests} from "./interests";
import {BuyMeACoffee} from "./buyMeACoffee";
import styles from "./index.module.css";
import clsx from "clsx";
import ChristmasLights from "../ChristmasLights";
import SocialLinks from "../SocialLinks";

export default function  Header(){

    const {siteConfig} = useDocusaurusContext();
    const {githubUri, pictureUri} = siteConfig.customFields;
    const currentMonth = new Date().getMonth();
    const isChristmasTime = currentMonth === 11;
    const btnBuyMeACoffeeStyle ={
        margin: "20px"
    }


    return (
        <header>
            <Banner>
                <div style={{width: "100%"}}>
                {siteConfig.customFields.showChristmasLights || isChristmasTime &&
                    <ChristmasLights numberOfBalls={20} style={{
                        zIndex: 999999999999,
                    }}/>
                }
                <GithubCorner repoUri={githubUri} className={clsx(styles.github_corner)}/>
                <div className={clsx(styles.profile_pic_wrapper_div)}>
                    <ProfilePicture opacity={0.8} pictureUri={pictureUri} className={clsx(styles.profile_pic)} />
                </div>
                
                <MeStatement strings={siteConfig.tagline.split("|")}/>
                    <div style={{margin: "20px"}}>
                        <SocialLinks />
                    </div>
                <ProInterests className={clsx(styles.pro_interest_div)}/>
                 <div style={btnBuyMeACoffeeStyle}>
                    <BuyMeACoffee/>
                 </div>
                </div>
            </Banner>
     
        </header>
    )
};