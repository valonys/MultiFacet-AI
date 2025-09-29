import React, { useState } from 'react';
import { generateTextFromImages } from '../services/geminiService';
import Loader from '../components/Loader';
import FeatureContainer from '../components/FeatureContainer';
import { ImageFile } from '../types';

const Ocr: React.FC = () => {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const question = "Recognize and transcribe all text in this image.";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert('Please upload an image.');
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
      title="Text Recognition (OCR)"
      description="Upload an image (like a screenshot or a photo with text) to have the AI recognize and transcribe the text."
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

        <button 
          onClick={handleSubmit} 
          disabled={loading || !image}
          className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Recognizing Text...' : 'Submit'}
        </button>

        {loading && <Loader />}
        
        {result && (
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-bold text-lg mb-2 text-white">Recognized Text</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </FeatureContainer>
  );
};

export default Ocr;
