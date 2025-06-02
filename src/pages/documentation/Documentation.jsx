import styles from './Documentation.module.css';

export default function Documentation() {
    return (
        <div className={styles.documentationPage}>
            {/* Introduction Section */}
            <section className={styles.introSection}>
                <h1>Welcome to Trackora AI</h1>
                <p>
                    Trackora AI is designed to create a world where accessibility is not a privilege but a standard.
                    Our mission is to empower individuals with visual, hearing, and speech disabilities by harnessing
                    the power of cutting-edge technology.
                </p>
            </section>

            {/* Our Aim Section */}
            <section className={styles.aimSection}>
                <h2>Our Aim</h2>
                <p>
                    At Trackora AI, we are committed to developing features that cater to users with disabilities.
                    Our vision is to provide an inclusive experience that enables seamless communication, learning,
                    and interaction. Below is an overview of the features we aim to achieve, how we will implement them,
                    and the specific benefits they offer.
                </p>

                <h3>Features and Implementation</h3>
                <ul className={styles.featuresList}>
                    <li>
                        <strong>AI-Based Voice Navigation:</strong>
                        <p>
                            Our app will include voice navigation powered by Kokoro TTS, enabling users with visual
                            impairments to interact conversationally with the app. This allows them to navigate menus,
                            access content, and complete tasks without visual assistance.
                        </p>
                    </li>
                    <li>
                        <strong>Voice Push Notifications:</strong>
                        <p>
                            For visually impaired users, the app will deliver voice notifications to keep them informed
                            about updates and reminders in real time.
                        </p>
                    </li>
                    <li>
                        <strong>Active Listening for the Deaf:</strong>
                        <p>
                            Using advanced speech-to-text technology, the app will transcribe conversations happening
                            around the user into text, making it easier for deaf users to follow discussions. Users can
                            also reply in text, which will then be converted to speech for others.
                        </p>
                    </li>
                    <li>
                        <strong>Lecture-to-Text Conversion:</strong>
                        <p>
                            Users will be able to record lectures, and the app will convert the audio into text in real
                            time, helping deaf and hearing-impaired students access educational content efficiently.
                        </p>
                    </li>
                    <li>
                        <strong>Text-to-Speech for Lecture Notes:</strong>
                        <p>
                            Leveraging Kokoro TTS, the app will convert written notes into speech, allowing visually
                            impaired users to listen to their notes and study more effectively.
                        </p>
                    </li>
                </ul>

                <h3>Benefits for Users with Disabilities</h3>
                <ul className={styles.benefitsList}>
                    <li>
                        <strong>For the Blind:</strong>
                        <p>
                            Voice navigation and notifications eliminate the need for visual interfaces,
                            enabling blind users to interact seamlessly with the app.
                        </p>
                    </li>
                    <li>
                        <strong>For the Deaf:</strong>
                        <p>
                            Real-time speech-to-text transcription ensures inclusivity during conversations
                            and lectures, providing deaf users with the ability to engage and respond actively.
                        </p>
                    </li>
                    <li>
                        <strong>For the Speech-Impaired:</strong>
                        <p>
                            Active listening and reply conversion allow for smooth communication with others,
                            reducing barriers in social and educational settings.
                        </p>
                    </li>
                </ul>
            </section>
        </div>
    );
}
