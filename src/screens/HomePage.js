'use client'

import { useState, useEffect } from 'react'
import { Upload, User, Download, ArrowRight, Globe, Check, Star, Menu, X } from 'lucide-react'
import LoginPage from '../components/LoginPage'

export default function HomePage() {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isTranslating, setIsTranslating] = useState(false)
  const [isTranslated, setIsTranslated] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let interval
    if (isTranslating) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval)
            setIsTranslating(false)
            setIsTranslated(true)
            return 100
          }
          const newProgress = oldProgress + 10
          return Math.min(newProgress, 100)
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isTranslating])

  const handleFileUpload = (event) => {
    try {
      const uploadedFile = event.target.files[0]
      if (uploadedFile) {
        setFile(uploadedFile)
        setIsTranslated(false)
        setProgress(0)
        setError(null)
      }
    } catch (err) {
      setError('Error uploading file. Please try again.')
      console.error('File upload error:', err)
    }
  }

  const simulateTranslation = () => {
    try {
      if (file) {
        setIsTranslating(true)
        setProgress(0)
        setError(null)
      } else {
        setError('Please upload a file before starting translation.')
      }
    } catch (err) {
      setError('Error starting translation. Please try again.')
      console.error('Translation error:', err)
    }
  }

  const handleDownload = () => {
    try {
      console.log('Downloading translated PDF...')
      alert('Downloading translated PDF...')
    } catch (err) {
      setError('Error downloading file. Please try again.')
      console.error('Download error:', err)
    }
  }

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm)
    setError(null)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* Navigation */}
      <nav className="bg-white bg-opacity-90 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-purple-600">TranslateAI</span>
            </div>
            <div className="">
              <button onClick={toggleLoginForm} className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition duration-300">
                Login / Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">AI-Powered Document Translation</h1>
          <p className="text-xl text-white">Translate your documents with speed and accuracy</p>
        </div>

        <div className="bg-white bg-opacity-90 rounded-lg shadow-2xl p-8 max-w-md mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {showLoginForm ? (
          <>
          
          <LoginPage onClose={()=>{setShowLoginForm(false)}}/>
          </>
          ) : (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-all duration-300 hover:border-purple-500">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileInput"
                  accept=".pdf,.doc,.docx"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload className="text-purple-600 mb-2" size={32} />
                  <span className="text-sm text-gray-600">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </span>
                </label>
              </div>

              {file && !isTranslated && (
                <button
                  onClick={simulateTranslation}
                  disabled={isTranslating}
                  className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTranslating ? 'Translating...' : 'Start Translation'}
                  <ArrowRight className="ml-2" size={18} />
                </button>
              )}

              {isTranslating && (
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-center mt-2 text-sm text-gray-600">
                    Translation Progress: {progress}%
                  </p>
                </div>
              )}

              {isTranslated && (
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
                >
                  Download Translated PDF
                  <Download className="ml-2" size={18} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <Globe className="text-purple-600 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">50+ Languages</h3>
            <p className="text-gray-600">Support for over 50 languages, enabling global communication.</p>
          </div>
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <Check className="text-green-600 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">99% Accuracy</h3>
            <p className="text-gray-600">Our AI ensures 99% accuracy in translations, maintaining context and nuance.</p>
          </div>
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <Star className="text-yellow-500 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">4.9/5 User Rating</h3>
            <p className="text-gray-600">Highly rated by our users for quality and ease of use.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-90 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-2 space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">&copy; 2023 TranslateAI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}