
import React, { useState } from 'react';
import { generateTextFromImages } from '../services/geminiService';
import Loader from '../components/Loader';
import FeatureContainer from '../components/FeatureContainer';
import { ImageFile } from '../types';

const MultiImageQA: React.FC = () => {
  const [images, setImages] = useState<(ImageFile | null)[]>([null, null]);
  const [question, setQuestion] = useState<string>('Compare image 1 and image 2, what are the differences?');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImages = [...images];
      newImages[index] = { file, preview: URL.createObjectURL(file) };
      setImages(newImages);
    }
  };

  const handleSubmit = async () => {
    const uploadedImages = images.filter(img => img !== null) as ImageFile[];
    if (uploadedImages.length < 2 || !question) {
      alert('Please upload two images and enter a question.');
      return;
    }
    setLoading(true);
    setResult('');
    const response = await generateTextFromImages(question, uploadedImages.map(img => img.file));
    setResult(response);
    setLoading(false);
  };

  return (
    <FeatureContainer 
      title="Multi-Image Q&A"
      description="Upload two images and ask a question to compare them or query about their combined content."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map(index => (
            <div key={index}>
              <label className="block text-sm font-medium text-slate-300 mb-2">Upload Image {index + 1}</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange(index)}
                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-500/10 file:text-sky-300 hover:file:bg-sky-500/20"
              />
              {images[index] && <img src={images[index]?.preview} alt={`Preview ${index + 1}`} className="mt-4 rounded-lg max-h-60" />}
            </div>
          ))}
        </div>
        
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-slate-300 mb-2">Question</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
            className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., Compare these images."
          />
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={loading || images.some(img => img === null)}
          className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Analyzing...' : 'Submit'}
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

export default MultiImageQA;
