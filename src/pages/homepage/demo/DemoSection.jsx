import React, { useState } from 'react';
import { Mic, Volume2, MessageSquare, Settings, Play, Pause } from 'lucide-react';

import styles from './DemoSection.module.css';

export default function DemoSection() {
    const [activeTab, setActiveTab] = useState('text-to-speech');

    const tabs = [
        {
            id: 'text-to-speech',
            label: 'Text-to-Speech',
            icon: <Volume2 size={18} />
        },
        {
            id: 'speech-to-text',
            label: 'Speech-to-Text',
            icon: <Mic size={18} />
        },
        {
            id: 'conversational-ai',
            label: 'Conversational AI',
            icon: <MessageSquare size={18} />
        }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'text-to-speech':
                return (
                    <div className={styles.demoCard}>
                        <h3 className={styles.demoCardTitle}>
                            <Volume2 size={32} className={styles.titleIconOrange} />
                            Transform Text into Natural Speech
                        </h3>
                        <p className={styles.demoCardDescription}>
                            Experience our powerful text-to-speech technology powered by Kokoro TTS that converts written content into high-quality, natural-sounding audio for visually impaired users.
                        </p>
                        <div className={styles.demoInterface}>
                            <div className={styles.developmentBadge}>
                                <Settings size={14} className={styles.spinAnimation} />
                                Under Development
                            </div>
                            <label className={styles.interfaceLabel}>
                                Enter text to convert to speech:
                            </label>
                            <textarea
                                className={styles.demoTextarea}
                                placeholder="Type your message here and we'll convert it to natural speech..."
                                rows={4}
                                defaultValue="Welcome to Trackora AI. We're making technology accessible for everyone."
                            />
                            <button className={styles.demoButton} disabled>
                                <Play size={16} />
                                Convert to Speech
                            </button>
                        </div>
                    </div>
                );

            case 'speech-to-text':
                return (
                    <div className={styles.demoCard}>
                        <h3 className={styles.demoCardTitle}>
                            <Mic size={32} className={styles.titleIconBlue} />
                            Real-time Speech Recognition
                        </h3>
                        <p className={styles.demoCardDescription}>
                            Advanced speech-to-text technology that transcribes conversations and lectures in real-time, helping deaf and hearing-impaired users stay engaged in discussions.
                        </p>
                        <div className={styles.demoInterface}>
                            <div className={styles.developmentBadge}>
                                <Settings size={14} className={styles.spinAnimation} />
                                Under Development
                            </div>
                            <div className={styles.speechToTextInterface}>
                                <label className={styles.interfaceLabel}>
                                    Click to start recording:
                                </label>
                                <button className={styles.recordingButton} disabled>
                                    <Mic />
                                </button>
                                <p className={styles.microphoneHint}>
                                    Speak clearly into your microphone
                                </p>
                                <div className={styles.transcriptionOutput}>
                                    Transcribed text will appear here...
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'conversational-ai':
                return (
                    <div className={styles.demoCard}>
                        <h3 className={styles.demoCardTitle}>
                            <MessageSquare size={32} className={styles.titleIconGreen} />
                            AI-Powered Conversation Assistant
                        </h3>
                        <p className={styles.demoCardDescription}>
                            Intelligent conversational AI that helps facilitate communication between users with different abilities, providing real-time assistance and natural language interaction.
                        </p>
                        <div className={styles.demoInterface}>
                            <div className={styles.developmentBadge}>
                                <Settings size={14} className={styles.spinAnimation} />
                                Under Development
                            </div>
                            <div className={styles.conversationInterface}>
                                <label className={styles.interfaceLabel}>
                                    Conversation:
                                </label>
                                <div className={styles.conversationMessages}>
                                    Start a conversation with our AI assistant...
                                </div>
                                <div className={styles.conversationInput}>
                                    <textarea
                                        className={styles.conversationTextarea}
                                        placeholder="Type your message here..."
                                        rows={2}
                                    />
                                    <button className={styles.demoButton} disabled>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className={styles.sectionContainer} id="demo">
            <div className={styles.demoSection}>
                <div className={styles.demoTabs}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.demoTab} ${
                                activeTab === tab.id ? styles.demoTabActive : ''
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className={styles.demoContent}>
                    {renderTabContent()}
                </div>
            </div>
        </section>
    );
}