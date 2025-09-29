import React, { useState } from 'react';
import { generateSpeech } from '../services/geminiService';
import Loader from '../components/Loader';
import FeatureContainer from '../components/FeatureContainer';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState<string>('Hello, this is a test.');
  const [resultUrl, setResultUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!text) {
      alert('Please enter some text.');
      return;
    }
    setLoading(true);
    setResultUrl('');
    const response = await generateSpeech(text);
    setResultUrl(response);
    setLoading(false);
  };

  return (
    <FeatureContainer 
      title="Text-to-Speech (Demonstration)"
      description="Enter text to generate speech. This is a demonstration and produces a placeholder audio output."
    >
      <div className="space-y-6">
        <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg" role="alert">
          <p className="font-bold">Feature Simulation</p>
          <p className="text-sm">This feature is for demonstration only. No audio is actually generated.</p>
        </div>
        
        <div>
          <label htmlFor="tts-text" className="block text-sm font-medium text-slate-300 mb-2">Text</label>
          <textarea
            id="tts-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Enter text to convert to speech..."
          />
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={loading || !text}
          className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Speech'}
        </button>

        {loading && <Loader />}
        
        {resultUrl && (
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-bold text-lg mb-2 text-white">Generated Audio</h3>
            <p className="text-slate-400 text-sm mb-2">This is a placeholder. In a real app, you could play the generated audio here.</p>
            <audio controls src={resultUrl} className="w-full opacity-50 cursor-not-allowed">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </FeatureContainer>
  );
};

export default TextToSpeech;
