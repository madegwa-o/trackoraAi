import { useState } from 'react';

function VoiceAiApp() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [audioUrl, setAudioUrl] = useState(null);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Add user message to chat history
        setChatHistory((prev) => [...prev, { sender: 'User', text: message }]);
        setMessage(''); // Clear input field

        try {
            const response = await fetch('http://localhost:3000/api/text-to-speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: message }),
            });

            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);

                // Add AI response to chat history
                setChatHistory((prev) => [
                    ...prev,
                    { sender: 'AI', text: 'Audio response generated. Click play to listen!' },
                ]);
            } else {
                console.error('Failed to process message');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <h1>AI Chat with Speech</h1>
            <div className="chat-box">
                {chatHistory.map((entry, index) => (
                    <p key={index}>
                        <strong>{entry.sender}:</strong> {entry.text}
                    </p>
                ))}
            </div>
            <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                cols="50"
            />
            <br />
            <button onClick={handleSendMessage}>Send</button>
            {audioUrl && (
                <div>
                    <h3>Generated Audio:</h3>
                    <audio controls src={audioUrl}></audio>
                </div>
            )}
        </div>
    );
}

export default VoiceAiApp;
