import React, { useState } from 'react';
import { transcribeAudio } from '../services/geminiService';
import Loader from '../components/Loader';
import FeatureContainer from '../components/FeatureContainer';

const SpeechToText: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!audioFile) {
      alert('Please upload an audio file.');
      return;
    }
    setLoading(true);
    setResult('');
    const response = await transcribeAudio(audioFile);
    setResult(response);
    setLoading(false);
  };

  return (
    <FeatureContainer 
      title="Speech-to-Text (Demonstration)"
      description="Upload an audio file to be transcribed. This is a demonstration and uses a mocked response."
    >
      <div className="space-y-6">
        <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg" role="alert">
          <p className="font-bold">Feature Simulation</p>
          <p className="text-sm">This feature is for demonstration purposes only. The audio file is not sent or analyzed.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Upload Audio</label>
          <input 
            type="file" 
            accept="audio/*" 
            onChange={handleAudioChange}
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-500/10 file:text-sky-300 hover:file:bg-sky-500/20"
          />
          {audioFile && <p className="mt-2 text-sm text-slate-400">Selected: {audioFile.name}</p>}
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={loading || !audioFile}
          className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Transcribing...' : 'Submit'}
        </button>

        {loading && <Loader />}
        
        {result && (
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-bold text-lg mb-2 text-white">Transcription</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </FeatureContainer>
  );
};

export default SpeechToText;
