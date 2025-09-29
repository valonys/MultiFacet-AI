import React, { useState } from 'react';
import { generateTextFromImages } from '../services/geminiService';
import Loader from '../components/Loader';
import FeatureContainer from '../components/FeatureContainer';
import { ImageFile } from '../types';

const Grounding: React.FC = () => {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [question, setQuestion] = useState<string>('Locate the red car in the image and describe its position.');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async () => {
    if (!image || !question) {
      alert('Please upload an image and enter a question.');
      return;
    }
    setLoading(true);
    setResult('');
    const response = await generateTextFromImages(question, [image.file]);
    setResult(response);
    setLoading(false);
  };

  return (
    <FeatureContainer 
      title="Grounding"
      description="Ask the AI to locate specific objects in an image. It will provide a description of their position."
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Upload Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-500/10 file:text-sky-300 hover:file:bg-sky-500/20"
          />
          {image && <img src={image.preview} alt="Preview" className="mt-4 rounded-lg max-h-80" />}
        </div>
        
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-slate-300 mb-2">Request</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
            className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., Locate the person wearing a hat."
          />
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={loading || !image}
          className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Locating...' : 'Submit'}
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

export default Grounding;
