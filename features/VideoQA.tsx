
import React, { useState } from 'react';
import Loader from '../components/Loader';
import FeatureContainer from '../components/FeatureContainer';

const VideoQA: React.FC = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>('Describe this video.');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!video || !question) {
      alert('Please upload a video and enter a question.');
      return;
    }
    setLoading(true);
    setResult('');
    // Mock API call
    setTimeout(() => {
      setResult("This is a simulated response. Client-side video processing for AI analysis is complex and not directly supported by this demo's API. In a full application, the video would be processed on a server into frames, which would then be sent to the AI model.");
      setLoading(false);
    }, 2000);
  };

  return (
    <FeatureContainer 
      title="Video Q&A (Demonstration)"
      description="Upload a video and ask a question. This is a demonstration and does not process the video content."
    >
      <div className="space-y-6">
        <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg" role="alert">
          <p className="font-bold">Feature Simulation</p>
          <p className="text-sm">This feature is for demonstration purposes only. The uploaded video is not actually sent or analyzed.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Upload Video</label>
          <input 
            type="file" 
            accept="video/*" 
            onChange={handleVideoChange}
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-500/10 file:text-sky-300 hover:file:bg-sky-500/20"
          />
          {video && <p className="mt-2 text-sm text-slate-400">Selected: {video.name}</p>}
        </div>
        
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-slate-300 mb-2">Question</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
            className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., Describe this video."
          />
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={loading || !video}
          className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Simulating...' : 'Submit'}
        </button>

        {loading && <Loader />}
        
        {result && (
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-bold text-lg mb-2 text-white">Result</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </FeatureContainer>
  );
};

export default VideoQA;
