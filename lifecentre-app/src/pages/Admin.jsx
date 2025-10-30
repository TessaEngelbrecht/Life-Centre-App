import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sql from '../lib/db';

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const Admin = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [submissions, setSubmissions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    totalSessions: 0,
    totalPageViews: 0,
    totalSearches: 0
  });
  const [activeTab, setActiveTab] = useState('submissions');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (isAuth) {
      setAuthenticated(true);
      loadAdminData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setError('');
      loadAdminData();
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    navigate('/');
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [submissionsData, activitiesData, statsData] = await Promise.all([
        sql`SELECT * FROM contact_submissions ORDER BY submitted_at DESC`,
        sql`SELECT * FROM user_activity ORDER BY timestamp DESC LIMIT 100`,
        sql`
          SELECT 
            (SELECT COUNT(*) FROM contact_submissions) as total_submissions,
            (SELECT COUNT(DISTINCT session_id) FROM user_activity) as total_sessions,
            (SELECT COUNT(*) FROM user_activity WHERE action_type = 'page_view') as total_page_views,
            (SELECT COUNT(*) FROM user_activity WHERE action_type = 'search') as total_searches
        `
      ]);
      
      setSubmissions(submissionsData);
      setActivities(activitiesData);
      setStats(statsData[0]);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600 mb-6">Life Centre Dashboard</p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter password"
                required
              />
            </div>
            
            <button type="submit" className="w-full btn-primary">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Life Centre Admin</h1>
            <p className="text-sm text-gray-600">Dashboard & Analytics</p>
          </div>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Total Submissions</div>
            <div className="text-3xl font-bold text-primary-600">{stats.total_submissions}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Unique Sessions</div>
            <div className="text-3xl font-bold text-green-600">{stats.total_sessions}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Page Views</div>
            <div className="text-3xl font-bold text-blue-600">{stats.total_page_views}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Searches</div>
            <div className="text-3xl font-bold text-purple-600">{stats.total_searches}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md">
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('submissions')}
                className={`py-4 font-semibold transition-all ${
                  activeTab === 'submissions'
                    ? 'border-b-4 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Contact Submissions ({submissions.length})
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-4 font-semibold transition-all ${
                  activeTab === 'activity'
                    ? 'border-b-4 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                User Activity
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : activeTab === 'submissions' ? (
              <div className="space-y-4">
                {submissions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No submissions yet</p>
                ) : (
                  submissions.map((submission) => (
                    <div key={submission.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{submission.name}</h3>
                          <p className="text-gray-600">{submission.email} • {submission.phone}</p>
                        </div>
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                          {submission.request_type}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Message:</h4>
                        <p className="text-gray-600 whitespace-pre-wrap">{submission.message}</p>
                      </div>

                      {(submission.need_prayer || submission.need_hospital_visit) && (
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Special Requests:</h4>
                          {submission.need_prayer && (
                            <div className="flex items-center mb-2">
                              <span className="text-blue-600 mr-2">🙏</span>
                              <span className="text-gray-700">Prayer requested</span>
                            </div>
                          )}
                          {submission.need_hospital_visit && (
                            <>
                              <div className="flex items-center mb-2">
                                <span className="text-blue-600 mr-2">🏥</span>
                                <span className="text-gray-700">Hospital visit requested</span>
                              </div>
                              {submission.hospital_name && (
                                <p className="text-sm text-gray-600 ml-6">
                                  Hospital: {submission.hospital_name}
                                </p>
                              )}
                              {submission.visit_date && (
                                <p className="text-sm text-gray-600 ml-6">
                                  Date: {new Date(submission.visit_date).toLocaleDateString()}
                                </p>
                              )}
                              {submission.additional_details && (
                                <p className="text-sm text-gray-600 ml-6 mt-2">
                                  Details: {submission.additional_details}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      )}

                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(submission.submitted_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Session ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activities.map((activity) => (
                      <tr key={activity.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                          {activity.session_id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.action_type}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {activity.page_viewed || activity.search_query || 
                           `${activity.item_viewed_type} #${activity.item_viewed_id}` || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
