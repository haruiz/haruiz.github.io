import React from "react";
import Layout from "@theme/Layout";
import Header from "../Header";
import clsx from "clsx";
import styles from "./index.module.css";

const LatestPostsList = ({posts}) => {
    return (
        posts.map(({content: {metadata}}, index) => {
            return (
                <div className={clsx(styles.post_item)} key={index}>
                    <h1><a href={metadata.permalink}>{metadata.title}</a></h1>
                    <p>{metadata.description}</p>
                    <div>
                        <p>{new Date(metadata.date).toLocaleDateString("en-US", {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })} </p>
                        <p>{Math.ceil(metadata.readingTime)} min read</p>
                    </div>
                </div>
            );
        })
    )
}


const Home = ({recentPosts}) => {
    return (
        <Layout>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col col--9 col--offset-1">
                        <LatestPostsList posts={recentPosts}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default Home;