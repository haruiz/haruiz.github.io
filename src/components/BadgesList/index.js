import React from  "react"
import styles from "./index.module.css";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";

const issuedBadges = [
    {
        title: "Google Developer Expert in Machine Learning",
        imgUri: "/img/badges/ml-expert.svg",
        description: "The Google Developer Experts program is a global network of highly experienced technology experts, influencers, and thought leaders who have expertise in Google technologies, are active leaders in the space, natural mentors, and contribute to the wider developer and startup ecosystem. Today, nearly a thousand Experts represent Google technologies around the world!",
        issuedBy: "Google",
        issuedDate : "Jan 20, 2022",
        sourceUri : "https://developers.google.com/community/experts/directory/profile/profile-henry-alonso-ruiz-guzman"
    },
    {
        title: "Tensorflow Developer Certificated",
        imgUri: "/img/badges/tensorflowCertificated.png",
        description: "This level one certificate exam tests a developers foundational knowledge of integrating machine learning into tools and applications. The certificate program requires an understanding of building TensorFlow models using Computer Vision, Convolutional Neural Networks, Natural Language Processing, and real-world image data and strategies.",
        issuedBy: "Google",
        issuedDate : "Dec 1, 2021",
        sourceUri : "https://www.credential.net/296580df-2e88-4a20-8a77-961b7152209d"
    },
    {
        title: "Intel Edge AI Developer Certificated",
        imgUri: "/img/badges/Edge_AI_Developer.png",
        description: "Intel® Edge AI Certification is the mark of a dedicated developer who has gained experience and expertise in the high-growth, high-demand field of edge AI solutions. The Intel® Certified badge attests to AI and deep learning proficiency that is earned through challenging, hands-on projects and learning paths. Training covers a variety of methods and industry use cases that teach how to deploy the latest Intel® developer tools to build a portfolio of edge AI solutions.",
        issuedBy: "Intel",
        issuedDate : "Sep 30, 2021",
        sourceUri : "https://www.credly.com/badges/d08a3cdd-0fd8-4ba5-8de1-1dd8d0f2c80b"
    },
    {
        title: "Champion Innovator (Cloud AI/ML)",
        imgUri: "/img/badges/badge-cloud-innovator.svg",
        description: "Recognized as a Champion in Cloud AI/ML by the Google Cloud Innovators program.",
        issuedBy: "Google",
        issuedDate : "Oct 5, 2021",
        sourceUri : "https://cloud.google.com/innovators/innovator?profileId=102817682347619796516"
    },
    {
        title: "Dev Library Contributor",
        imgUri: "/img/badges/dev-library-contributor.svg",
        description: "Submitted an entry that was approved and added to Dev Library",
        issuedBy: "Google",
        issuedDate : "Dec 21, 2021",
        sourceUri : "https://devlibrary.withgoogle.com/authors/haruiz"
    }
]

export default  function BadgeList() {
    const badgeItems =  issuedBadges.map(({imgUri, title,issuedDate, sourceUri}, index) => <div className={clsx(styles.badge_item)} key={index}>
        <img src={useBaseUrl(imgUri)} alt={title}/>
        <p><a href={sourceUri} target="_blank">{title}</a></p>
        <p>{issuedDate}</p>
    </div>)

    return <div className={clsx(styles.badge_list)}>
        {badgeItems}
    </div>
}
