import React, { useState } from 'react';
import { cloneVoice } from '../services/geminiService';
import Loader from '../components/Loader';
import FeatureContainer from '../components/FeatureContainer';

const VoiceCloning: React.FC = () => {
  const [refAudio, setRefAudio] = useState<File | null>(null);
  const [text, setText] = useState<string>('Clone this voice saying: Hello world.');
  const [resultUrl, setResultUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRefAudio(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!refAudio || !text) {
      alert('Please upload a reference audio file and enter text.');
      return;
    }
    setLoading(true);
    setResultUrl('');
    const response = await cloneVoice(text, refAudio);
    setResultUrl(response);
    setLoading(false);
  };

  return (
    <FeatureContainer 
      title="Voice Cloning (Demonstration)"
      description="Upload a reference audio file and provide text. The AI will simulate generating speech in the reference voice."
    >
      <div className="space-y-6">
        <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg" role="alert">
          <p className="font-bold">Feature Simulation</p>
          <p className="text-sm">This feature is for demonstration only. The audio is not analyzed, and no voice cloning occurs.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Upload Reference Audio</label>
          <input 
            type="file" 
            accept="audio/*" 
            onChange={handleAudioChange}
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-500/10 file:text-sky-300 hover:file:bg-sky-500/20"
          />
          {refAudio && <p className="mt-2 text-sm text-slate-400">Selected: {refAudio.name}</p>}
        </div>
        
        <div>
          <label htmlFor="clone-text" className="block text-sm font-medium text-slate-300 mb-2">Text to Speak</label>
          <textarea
            id="clone-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Enter text..."
          />
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={loading || !refAudio || !text}
          className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Cloning...' : 'Clone Voice'}
        </button>

        {loading && <Loader />}
        
        {resultUrl && (
           <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
             <h3 className="font-bold text-lg mb-2 text-white">Cloned Audio</h3>
             <p className="text-slate-400 text-sm mb-2">This is a placeholder. In a real app, you could play the cloned audio here.</p>
             <audio controls src={resultUrl} className="w-full opacity-50 cursor-not-allowed">
               Your browser does not support the audio element.
             </audio>
           </div>
        )}
      </div>
    </FeatureContainer>
  );
};

export default VoiceCloning;
