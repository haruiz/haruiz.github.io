import React, {useCallback, useEffect, useRef} from "react";
import clsx from "clsx";
import styles from "./index.module.css";

const loadScriptAsync = (src) => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
});

export function Banner({children}) {
    const vantaRenderElement = useRef(null);
    const loadVantaScript = useCallback(async () => {
        try {
            await loadScriptAsync('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js');
            await loadScriptAsync('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js');
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        loadVantaScript().then(() => {
            VANTA.HALO({
                el: vantaRenderElement.current,
                baseColor: 0x6cc866,
                backgroundColor: "#272936",
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                // minHeight: 600.00,
                // minWidth: 600.00,
                //amplitudeFactor: 0.60,
                xOffset: 0.0,
                yOffset: 0.28,
                size: 1.0
            })

        });
    }, [loadVantaScript, vantaRenderElement]);

    return (
        <div ref={vantaRenderElement} className={clsx('hero hero--primary', styles.banner)}>
            {children}
        </div>
    );
}