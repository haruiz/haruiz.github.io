import Sticker from "../Sticker";
import React from "react";
import useBaseUrl from '@docusaurus/useBaseUrl';


export function ProfilePicture(props) {
    const {pictureUri,opacity, ...rest} = props;
    return <Sticker avatar={useBaseUrl(pictureUri)} opacity={opacity} {...rest}/>
}
