import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

function Dashboard({ dataset }) {
  const navigate = useNavigate()
  const [chartType, setChartType] = useState('bar')
  const [xAxis, setXAxis] = useState('')
  const [yAxis, setYAxis] = useState('')
  const [chartData, setChartData] = useState(null)
  const [chartOptions, setChartOptions] = useState({})
  const [colorScheme, setColorScheme] = useState('default')

  // Redirect if no dataset is available
  useEffect(() => {
    if (!dataset) {
      navigate('/')
    } else if (dataset.headers.length > 0) {
      // Set default axes
      setXAxis(dataset.headers[0])
      
      // Find first numeric column for Y-axis
      const numericColumn = dataset.headers.find(header => {
        return !isNaN(dataset.data[0][header])
      })
      
      setYAxis(numericColumn || dataset.headers[1])
    }
  }, [dataset, navigate])

  // Update chart when parameters change
  useEffect(() => {
    if (!dataset || !xAxis || !yAxis) return
    
    const labels = dataset.data.map(item => item[xAxis])
    
    // Get colors based on selected scheme
    const colors = getColorScheme(colorScheme, dataset.data.length)
    
    const chartData = {
      labels,
      datasets: [
        {
          label: yAxis,
          data: dataset.data.map(item => parseFloat(item[yAxis]) || 0),
          backgroundColor: chartType === 'line' ? colors.borderColor : colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: 1,
        }
      ]
    }
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${yAxis} by ${xAxis}`,
        },
      },
    }
    
    setChartData(chartData)
    setChartOptions(options)
  }, [dataset, xAxis, yAxis, chartType, colorScheme])

  // Color schemes
  const getColorScheme = (scheme, count) => {
    const schemes = {
      default: {
        backgroundColor: Array(count).fill('rgba(54, 162, 235, 0.5)'),
        borderColor: Array(count).fill('rgba(54, 162, 235, 1)'),
      },
      warm: {
        backgroundColor: Array(count).fill('rgba(255, 99, 132, 0.5)'),
        borderColor: Array(count).fill('rgba(255, 99, 132, 1)'),
      },
      cool: {
        backgroundColor: Array(count).fill('rgba(75, 192, 192, 0.5)'),
        borderColor: Array(count).fill('rgba(75, 192, 192, 1)'),
      },
      rainbow: {
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ].slice(0, count),
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ].slice(0, count),
      }
    }
    
    return schemes[scheme] || schemes.default
  }

  // Render the appropriate chart based on type
  const renderChart = () => {
    if (!chartData) return null
    
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />
      case 'line':
        return <Line data={chartData} options={chartOptions} />
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />
      default:
        return <Bar data={chartData} options={chartOptions} />
    }
  }

  if (!dataset) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">No dataset available. Please upload a dataset first.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Data Visualization Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Visualizing data from: {dataset.fileName}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Chart Settings</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Chart Type</label>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">X-Axis</label>
                <select
                  value={xAxis}
                  onChange={(e) => setXAxis(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {dataset.headers.map(header => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Y-Axis</label>
                <select
                  value={yAxis}
                  onChange={(e) => setYAxis(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {dataset.headers.map(header => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Color Scheme</label>
                <select
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="default">Default</option>
                  <option value="warm">Warm</option>
                  <option value="cool">Cool</option>
                  <option value="rainbow">Rainbow</option>
                </select>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Data Summary</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Rows:</span> {dataset.data.length}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Columns:</span> {dataset.headers.length}
              </p>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/')}
                  className="btn-secondary w-full"
                >
                  Upload New Dataset
                </button>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="lg:col-span-3">
            <div className="card" style={{ minHeight: '500px' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {yAxis} by {xAxis}
              </h2>
              <div className="chart-container" style={{ height: '400px' }}>
                {renderChart()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Data Table */}
        <div className="mt-8">
          <div className="card overflow-hidden">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Data Table</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {dataset.headers.map(header => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataset.data.slice(0, 10).map((row, index) => (
                    <tr key={index}>
                      {dataset.headers.map(header => (
                        <td key={`${index}-${header}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {dataset.data.length > 10 && (
                <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
                  Showing 10 of {dataset.data.length} rows
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard