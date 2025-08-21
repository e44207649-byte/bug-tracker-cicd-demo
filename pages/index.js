import { useState, useMemo } from 'react'
import { 
  Bug, 
  Plus, 
  Filter, 
  BarChart3, 
  AlertTriangle, 
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

const INITIAL_BUGS = [
  { 
    id: 1, 
    title: "Login button not working on mobile", 
    severity: "high", 
    status: "open", 
    created: "2024-08-19",
    description: "Users cannot login on mobile devices"
  },
  { 
    id: 2, 
    title: "Dashboard loading slowly", 
    severity: "medium", 
    status: "in-progress", 
    created: "2024-08-18",
    description: "Dashboard takes over 5 seconds to load"
  },
  { 
    id: 3, 
    title: "Email notifications broken", 
    severity: "critical", 
    status: "open", 
    created: "2024-08-17",
    description: "Critical system notifications not being sent"
  },
  { 
    id: 4, 
    title: "Minor UI alignment issue", 
    severity: "low", 
    status: "open", 
    created: "2024-08-16",
    description: "Button alignment slightly off in footer"
  }
]

export default function BugTracker() {
  const [bugs, setBugs] = useState(INITIAL_BUGS)
  const [filter, setFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBug, setNewBug] = useState({ title: '', severity: 'medium', description: '' })

  // INTENTIONAL BUG: Critical filter doesn't work - shows all bugs instead of just critical
  const filteredBugs = useMemo(() => {
    return bugs.filter(bug => {
      if (filter === 'all') return true
      if (filter === 'high') return bug.severity === 'high'
      if (filter === 'medium') return bug.severity === 'medium'
      if (filter === 'low') return bug.severity === 'low'
      // Missing: if (filter === 'critical') return bug.severity === 'critical'
      // return true // This causes the bug - returns all bugs for critical filter
    })
  }, [bugs, filter])

  const bugStats = useMemo(() => {
    return {
      total: bugs.length,
      critical: bugs.filter(b => b.severity === 'critical').length,
      high: bugs.filter(b => b.severity === 'high').length,
      medium: bugs.filter(b => b.severity === 'medium').length,
      low: bugs.filter(b => b.severity === 'low').length,
      open: bugs.filter(b => b.status === 'open').length,
      inProgress: bugs.filter(b => b.status === 'in-progress').length,
      closed: bugs.filter(b => b.status === 'closed').length
    }
  }, [bugs])

  const addBug = () => {
    // INTENTIONAL BUG: Missing validation for empty title
    // Should validate: if (!newBug.title.trim()) return
    
    const bug = {
      id: Math.max(...bugs.map(b => b.id), 0) + 1,
      title: newBug.title,
      severity: newBug.severity,
      status: 'open',
      created: new Date().toISOString().split('T')[0],
      description: newBug.description
    }
    
    setBugs([...bugs, bug])
    setNewBug({ title: '', severity: 'medium', description: '' })
    setShowAddForm(false)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <XCircle className="w-4 h-4 text-red-500" />
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'closed': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <XCircle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Bug className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Bug Tracker Dashboard</h1>
            </div>
            <div className="text-sm text-gray-500">
              Environment: {process.env.NEXT_PUBLIC_APP_ENV || 'development'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bugs</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="total-bugs">{bugStats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600" data-testid="critical-bugs">{bugStats.critical}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-2xl font-bold text-red-500" data-testid="open-bugs">{bugStats.open}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-500" data-testid="in-progress-bugs">{bugStats.inProgress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-400" />
                <div className="flex space-x-2">
                  {['all', 'critical', 'high', 'medium', 'low'].map(severity => (
                    <button
                      key={severity}
                      onClick={() => setFilter(severity)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filter === severity
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      data-testid={`filter-${severity}`}
                    >
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                      {severity !== 'all' && ` (${bugStats[severity] || 0})`}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                data-testid="add-bug-button"
              >
                <Plus className="w-4 h-4" />
                <span>Add Bug</span>
              </button>
            </div>
          </div>

          {/* Add Bug Form */}
          {showAddForm && (
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bug Title *
                  </label>
                  <input
                    type="text"
                    value={newBug.title}
                    onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter bug title..."
                    data-testid="bug-title-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity
                  </label>
                  <select
                    value={newBug.severity}
                    onChange={(e) => setNewBug({ ...newBug, severity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    data-testid="bug-severity-select"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newBug.description}
                    onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description..."
                    data-testid="bug-description-input"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={addBug}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  data-testid="submit-bug-button"
                >
                  Add Bug
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                  data-testid="cancel-bug-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bug List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Bug List ({filteredBugs.length} {filter !== 'all' ? `${filter} ` : ''}bugs)
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200" data-testid="bug-list">
            {filteredBugs.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Bug className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No bugs match the current filter.</p>
              </div>
            ) : (
              filteredBugs.map(bug => (
                <div key={bug.id} className="px-6 py-4 hover:bg-gray-50" data-testid={`bug-${bug.id}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(bug.status)}
                        <h3 className="text-lg font-medium text-gray-900">{bug.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide border ${getSeverityColor(bug.severity)}`}>
                          {bug.severity}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{bug.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>ID: {bug.id}</span>
                        <span>Created: {bug.created}</span>
                        <span>Status: {bug.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}