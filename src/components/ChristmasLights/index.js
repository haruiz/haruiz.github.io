import styles from "./index.module.scss";

export default function ChristmasLights({numberOfBalls, ...rest}) {
return (
    <ul className={styles.lightrope} {...rest}>
        {Array.from({length: numberOfBalls}, (_, i) => <li key={i} />)}
    </ul>
    );

}