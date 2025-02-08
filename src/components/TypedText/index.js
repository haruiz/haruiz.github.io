import React from 'react'
import Typed from "typed.js";

export default function TypedText(props) {    
  const el = React.useRef(null);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: props.strings,
      startDelay: 300,
      typeSpeed: 50,
      backSpeed: 100,
      backDelay: 100,
      loop: true,
      //cursorChar: '_'
    });
  
    return () => {
      // if(typed) {
      //   typed.destroy();
      // }
    };
   },[]);

   return(
    <span className="typed_text" ref={el}/> // render typed content
   )
}
