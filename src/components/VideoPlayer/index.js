import React from 'react';

import ReactPlayer from 'react-player'
import styles from './index.module.css';
import clsx from "clsx";

function VideoPlayer({videoUrl}) {
    return (
        <div className={clsx(styles.playerWrapper)}>
            <ReactPlayer playing controls url={videoUrl}  className={clsx(styles.reactPlayer)}  width="100%" height="100%"/>
        </div>
    );
}

export default VideoPlayer;