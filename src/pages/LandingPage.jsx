import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage({ setDataset }) {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    setError('')
  }

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file to upload')
      return
    }

    setIsLoading(true)
    
    // Simulate file processing
    const reader = new FileReader()
    
    reader.onload = (event) => {
      try {
        // For CSV files, we'll parse the content
        const content = event.target.result
        const lines = content.split('\n')
        const headers = lines[0].split(',')
        
        const data = []
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === '') continue
          
          const values = lines[i].split(',')
          const entry = {}
          
          for (let j = 0; j < headers.length; j++) {
            entry[headers[j].trim()] = values[j]?.trim()
          }
          
          data.push(entry)
        }
        
        setDataset({
          headers,
          data,
          fileName: file.name
        })
        
        setIsLoading(false)
        navigate('/dashboard')
      } catch (err) {
        setError('Error processing file. Please ensure it is a valid CSV.')
        setIsLoading(false)
      }
    }
    
    reader.onerror = () => {
      setError('Error reading file')
      setIsLoading(false)
    }
    
    reader.readAsText(file)
  }

  // Sample dataset for demo purposes
  const handleDemoData = () => {
    const demoData = {
      headers: ['Month', 'Sales', 'Expenses', 'Profit'],
      data: [
        { Month: 'January', Sales: '10000', Expenses: '8000', Profit: '2000' },
        { Month: 'February', Sales: '12000', Expenses: '9000', Profit: '3000' },
        { Month: 'March', Sales: '15000', Expenses: '10000', Profit: '5000' },
        { Month: 'April', Sales: '13000', Expenses: '9500', Profit: '3500' },
        { Month: 'May', Sales: '14000', Expenses: '9800', Profit: '4200' },
        { Month: 'June', Sales: '16000', Expenses: '10200', Profit: '5800' },
      ],
      fileName: 'demo_data.csv'
    }
    
    setDataset(demoData)
    navigate('/dashboard')
  }

  return (
    <div className="bg-[rgb(38, 39, 48)]"   >
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Transform Your Data into Powerful Visualizations
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-100">
              Upload your dataset and create beautiful, interactive visualizations in seconds. No coding required.
            </p>
            <div className="mt-10 flex justify-center">
              {/* <button 
                onClick={() => document.getElementById('fileUpload').click()}
                className="btn-primary text-lg px-8 py-3 shadow-lg"
              >
                Upload Dataset
              </button> */}
<a href="https://faraz-meraj-quazi-app.streamlit.app/">  <button 
                className="btn-primary text-lg px-8 py-3 shadow-lg"
              >
                Get Started
              </button> </a>
             
              <button 
                onClick={handleDemoData}
                className="ml-4 btn-secondary text-lg px-8 py-3"
              >
                Try Demo Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Your Dataset</h2>
            <p className="text-gray-600 mb-6">
              Upload a CSV file to start visualizing your data. Your data stays on your device and is never sent to our servers.
            </p>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Select CSV File</label>
              <input
                id="fileUpload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex items-center">
                <button
                  onClick={() => document.getElementById('fileUpload').click()}
                  className="btn-secondary"
                >
                  Choose File
                </button>
                <span className="ml-3 text-gray-600">
                  {file ? file.name : 'No file selected'}
                </span>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            
            <button
              onClick={handleUpload}
              disabled={isLoading || !file}
              className={`btn-primary w-full ${(isLoading || !file) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : 'Visualize Data'}
            </button>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Powerful Features</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to understand your data</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-primary-600 mb-4">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Multiple Chart Types</h3>
              <p className="text-gray-600">
                Choose from a variety of chart types including bar charts, line charts, pie charts, and more.
              </p>
            </div>
            
            <div className="card">
              <div className="text-primary-600 mb-4">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Customizable Appearance</h3>
              <p className="text-gray-600">
                Customize colors, labels, and styles to create visualizations that match your brand.
              </p>
            </div>
            
            <div className="card">
              <div className="text-primary-600 mb-4">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Data Filtering</h3>
              <p className="text-gray-600">
                Filter and segment your data to focus on specific insights and trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Jane Doe</h4>
                  <p className="text-gray-600">Data Analyst</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This dashboard tool has transformed how I present data to my clients. It's intuitive, powerful, and saves me hours of work each week."
              </p>
            </div>
            
            <div className="card border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">John Smith</h4>
                  <p className="text-gray-600">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I'm not a technical person, but this tool makes it easy for me to create beautiful visualizations for my marketing reports. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
            <p className="mt-4 text-xl text-gray-600">Have questions? We're here to help.</p>
          </div>
          
          <div className="card">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>
              
              <button type="button" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage