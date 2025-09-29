
import React, { useState } from 'react';
import { AIMode } from './types';
import { TABS } from './constants';
import Header from './components/Header';
import TabButton from './components/TabButton';
import SingleImageQA from './features/SingleImageQA';
import MultiImageQA from './features/MultiImageQA';
import VideoQA from './features/VideoQA';
import DocumentParser from './features/DocumentParser';
import Ocr from './features/Ocr';
import Grounding from './features/Grounding';
import SpeechToText from './features/SpeechToText';
import TextToSpeech from './features/TextToSpeech';
import VoiceCloning from './features/VoiceCloning';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AIMode>(AIMode.SINGLE_IMAGE_QA);

  const renderContent = () => {
    switch (activeTab) {
      case AIMode.SINGLE_IMAGE_QA:
        return <SingleImageQA />;
      case AIMode.MULTI_IMAGE_QA:
        return <MultiImageQA />;
      case AIMode.VIDEO_QA:
        return <VideoQA />;
      case AIMode.DOCUMENT_PARSER:
        return <DocumentParser />;
      case AIMode.OCR:
        return <Ocr />;
      case AIMode.GROUNDING:
        return <Grounding />;
      case AIMode.SPEECH_TO_TEXT:
        return <SpeechToText />;
      case AIMode.TEXT_TO_SPEECH:
        return <TextToSpeech />;
      case AIMode.VOICE_CLONING:
        return <VoiceCloning />;
      default:
        return <SingleImageQA />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
      <Header />
      <div className="flex">
        <aside className="w-64 p-4 border-r border-slate-700/60 h-screen sticky top-0">
          <nav className="flex flex-col space-y-2">
            {TABS.map((tab) => (
              <TabButton
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
