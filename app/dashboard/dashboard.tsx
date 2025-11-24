"use client"
import { useState } from 'react';
import { Video, Globe, Zap, Award, Check, Loader2, Download, Play } from 'lucide-react';

export default function DubMasterLanding() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('Auto-detect');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian'
  ];

  const simulateDubbingProcess = async () => {
    if (!youtubeUrl) {
      alert('Please enter a YouTube URL');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setIsComplete(false);

    // Simulate processing stages
    const stages = [
      { progress: 15, message: 'Extracting audio...', delay: 800 },
      { progress: 30, message: 'Transcribing speech...', delay: 1000 },
      { progress: 50, message: 'Translating content...', delay: 1200 },
      { progress: 70, message: 'Generating dubbed audio...', delay: 1500 },
      { progress: 85, message: 'Synchronizing with video...', delay: 1000 },
      { progress: 100, message: 'Finalizing...', delay: 800 }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay));
      setProgress(stage.progress);
    }

    setIsProcessing(false);
    setIsComplete(true);
  };

  const handleReset = () => {
    setIsComplete(false);
    setProgress(0);
    setYoutubeUrl('');
  };

  const handleDemoVideo = () => {
    setYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    setShowDemo(true);
    setTimeout(() => setShowDemo(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Video className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">DubMaster</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
              <a href="#features" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
              Try Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Transform Videos into Any<br />Language
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Professional AI-powered video dubbing that preserves the original emotion and timing while delivering crystal-clear translations in over 12 languages.
          </p>
          <button 
            onClick={() => document.getElementById('dubbing-studio')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Dubbing Free
          </button>
        </div>

        {/* Video Dubbing Studio Card */}
        <div id="dubbing-studio" className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transform transition-all">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            AI Video Dubbing Studio
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Simply paste your YouTube video URL and select your target language
          </p>

          {!isComplete ? (
            <div className="space-y-6">
              {/* YouTube URL Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube Video URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    disabled={isProcessing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {!youtubeUrl && (
                    <button
                      onClick={handleDemoVideo}
                      className="absolute right-2 top-2 text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors"
                    >
                      Use Demo
                    </button>
                  )}
                </div>
                {showDemo && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> Demo URL loaded!
                  </p>
                )}
              </div>

              {/* Language Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source Language
                  </label>
                  <select
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    disabled={isProcessing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option>Auto-detect</option>
                    {languages.map(lang => (
                      <option key={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Language
                  </label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    disabled={isProcessing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    {languages.map(lang => (
                      <option key={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Processing Progress */}
              {isProcessing && (
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-900">
                      Processing your video...
                    </span>
                    <span className="text-sm font-bold text-blue-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-center mt-4 text-blue-700">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <span className="text-sm">
                      {progress < 20 ? 'Extracting audio...' :
                       progress < 40 ? 'Transcribing speech...' :
                       progress < 60 ? 'Translating content...' :
                       progress < 80 ? 'Generating dubbed audio...' :
                       progress < 95 ? 'Synchronizing with video...' :
                       'Finalizing...'}
                    </span>
                  </div>
                </div>
              )}

              {/* Start Button */}
              <button
                onClick={simulateDubbingProcess}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-all font-medium text-lg flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Start Dubbing Process</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Dubbing Complete!
              </h3>
              <p className="text-gray-600 mb-8">
                Your video has been successfully dubbed to {targetLanguage}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Video Details:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original Language:</span>
                    <span className="font-medium">{sourceLanguage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Language:</span>
                    <span className="font-medium">{targetLanguage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time:</span>
                    <span className="font-medium">~5.4 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quality:</span>
                    <span className="font-medium text-green-600">Professional</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2 shadow-md">
                  <Download className="h-5 w-5" />
                  <span>Download Video</span>
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 shadow-md">
                  <Play className="h-5 w-5" />
                  <span>Preview</span>
                </button>
              </div>

              <button
                onClick={handleReset}
                className="mt-4 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                ← Dub Another Video
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose DubMaster?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of video localization with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Video className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Advanced AI Technology
              </h3>
              <p className="text-gray-600">
                State-of-the-art neural networks ensure natural-sounding voice synthesis with emotion preservation for 99%+ lip-sync accuracy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                12+ Languages
              </h3>
              <p className="text-gray-600">
                Support for major world languages with native-like pronunciation and cultural context awareness.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Cloud-based processing delivers professional results in minutes, not hours. Ready within your needs.
              </p>
            </div>
          </div>

          {/* Feature 4 - Full Width */}
          <div className="mt-8 text-center max-w-md mx-auto bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Professional Quality
            </h3>
            <p className="text-gray-600">
              Studio-grade dubbing with intelligent timing adjustments and seamless audio integration.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 DubMaster. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}