import React, {useCallback, useEffect, useRef} from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { v4 as uuid } from 'uuid';
import CodeBlock from '@theme/CodeBlock';

export default function TermynalReact(props){
    const termynalEl = useRef(null);
    const {lines,...rest} = props;


    return (<BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
            const unique_id = uuid();
            const Termynal = require("./termynal")
            useEffect(()=>{
                const termynal = new Termynal(termynalEl.current, {
                    "lineData": props.lines
                })
                const intersectionObserver = new IntersectionObserver(([entry])=>{
                     if(entry.isIntersecting){
                         if(!termynal.isRunning) {
                             termynal.start();
                         }
                    }
                });

                intersectionObserver.observe(termynalEl.current)
                return () => {
                    intersectionObserver.disconnect();
                }
            }, [termynalEl])

            const inputLines = lines.filter(line=>line.type === 'input')
                .map(line=> "comment" in line ?  "# " + line.comment + "\n" + line.value: line.value).join("\n\n")

            return(
                <Tabs groupId={unique_id}>
                    <TabItem value="bash" label="Bash">
                         <CodeBlock
                            language="bash"
                            showLineNumbers={false}>{inputLines}</CodeBlock>
                    </TabItem>
                    <TabItem value="terminal" label="terminal">
                        <div ref={termynalEl}  {...rest} style={{marginBottom: 20, marginTop: 20}}/>
                    </TabItem>
                </Tabs>
            )

        }}
    </BrowserOnly>)
}

