import styles from './Conversation.module.css';

export default function Conversation() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Let's Talk</h1>
            <p className={styles.message}>
                Our conversation feature is still under development! Check back soon for exciting updates.
            </p>
            <div className={styles.loader}></div>
        </div>
    );
}
