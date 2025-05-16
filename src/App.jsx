import { useState } from 'react';

function App() {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState(null);

    // Function to send POST request
    const handleConvertTextToSpeech = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/text-to-speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
            } else {
                console.error('Failed to convert text to speech');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <h1>Text to Speech Converter</h1>
            <div className="card">
        <textarea
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            cols="50"
        />
                <br />
                <button onClick={handleConvertTextToSpeech}>Convert to Speech</button>
                {audioUrl && (
                    <div>
                        <h3>Generated Audio:</h3>
                        <audio controls src={audioUrl}></audio>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
