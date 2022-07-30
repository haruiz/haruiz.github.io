import React from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Banner} from "../Banner";
import {GithubCorner} from "../GitHubCorner";
import {ProfilePicture} from "./profilePicture";
import {MeStatement} from "./meStatement";
import {ProInterests} from "./interests";
import {BuyMeACoffee} from "./buyMeACoffee";

export default function  Header(){

    const {siteConfig} = useDocusaurusContext();
    const {githubUri, pictureUri} = siteConfig.customFields;

    const divProfileInfoWrapperStyle = {
        margin: "0",
        width: "100%",
        // border: "3px solid green",
        padding: "0px",
    }

    const githubCornerStyles = {
        color: "#f7f8f9",
        position: "absolute",
        top: 0,
        border: 0,
        right: 0,
        zIndex: -1
    }

    const divProfilePicWrapperStyle = {margin: "20px"}
    const divProfilePicStyle = {width: 180, margin: "auto"}

    const proInterestsStyle ={
            textAlign: "center",
            margin: "auto",
            fontSize: "medium",
            // border: "3px solid green",
            width: "50%",
    }

    const btnBuyMeACoffeeStyle ={
        margin: "20px"
    }

    return (
        <header>
            <Banner>
                <div style={divProfileInfoWrapperStyle}>
                <GithubCorner repoUri={githubUri} style={githubCornerStyles}/>
                <div style={divProfilePicWrapperStyle}>
                    <ProfilePicture opacity={0.8} pictureUri={pictureUri} style={divProfilePicStyle} />
                </div>
                <MeStatement strings={siteConfig.tagline.split("|")}/>
                <ProInterests style={proInterestsStyle}/>
                 <div style={btnBuyMeACoffeeStyle}>
                    <BuyMeACoffee/>
                 </div>
                </div>
            </Banner>
        </header>
    )
};