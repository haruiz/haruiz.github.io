import React from 'react';
import Giscus from "@giscus/react";
import {useColorMode} from "@docusaurus/theme-common";

export default function CommentsBox({term}) {
     const {colorMode} = useColorMode();
    return (
          <Giscus
              id="comments"
              repo="haruiz/haruiz.github.io"
              repoId="R_kgDOHvkJeg"
              category="Q&A"
              categoryId="DIC_kwDOHvkJes4CQqsm"
              mapping="specific"
              term={term}
              reactionsEnabled="1"
              strict="0"
              emitMetadata="0"
              inputPosition="top"
              theme={colorMode === 'dark' ? 'dark' : 'light'}
              lang="en"
              crossorigin="anonymous"
            />
    );
}
