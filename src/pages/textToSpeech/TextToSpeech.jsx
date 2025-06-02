import styles from './TextToSpeech.module.css';

export default function TextToSpeech() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Text-to-Speech</h1>
            <p className={styles.message}>
                This feature is still under development. Stay tuned for updates!
            </p>
            <div className={styles.loader}></div>
        </div>
    );
}
