import { useState, useEffect } from 'react';
import api from '../api/axios';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import { 
  Briefcase, 
  CalendarDays, 
  CheckCircle2, 
  XCircle,
  Plus,
  Search,
  Filter,
  Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/jobs/${id}`);
        setJobs(jobs.filter(job => job._id !== id));
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  // derived stats
  const totalApplied = jobs.length;
  const totalInterviews = jobs.filter(j => j.status === 'Interview').length;
  const totalOffers = jobs.filter(j => j.status === 'Offer').length;
  const totalRejected = jobs.filter(j => j.status === 'Rejected').length;

  // filtering
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-blue-100/50 p-3 rounded-xl text-blue-600">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Apps</p>
            <p className="text-2xl font-black text-slate-800">{totalApplied}</p>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-amber-100/50 p-3 rounded-xl text-amber-600">
            <CalendarDays size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Interviews</p>
            <p className="text-2xl font-black text-slate-800">{totalInterviews}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-emerald-100/50 p-3 rounded-xl text-emerald-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Offers</p>
            <p className="text-2xl font-black text-slate-800">{totalOffers}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-red-100/50 p-3 rounded-xl text-red-600">
            <XCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Rejected</p>
            <p className="text-2xl font-black text-slate-800">{totalRejected}</p>
          </div>
        </div>
      </div>

      {/* AI Suggestion Box */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 p-5 rounded-2xl shadow-sm">
         <div className="flex items-start gap-4">
           <div className="bg-indigo-600 p-2 rounded-lg text-white mt-1 shadow-sm">
             <Sparkles size={20} />
           </div>
           <div>
             <h3 className="font-bold text-indigo-900 mb-1">AI Career Assistant</h3>
             <p className="text-indigo-700/80 text-sm leading-relaxed">
               <strong>Tip:</strong> You have {totalInterviews} upcoming/past interviews. Remember to send a thank-you email within 24 hours of your interview! Follow-ups can increase your offer rate by up to 15%.
             </p>
           </div>
         </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Your Applications</h1>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search company or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow bg-white shadow-sm"
            />
          </div>
          
          <div className="relative flex-shrink-0">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 w-full border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white shadow-sm font-medium text-slate-700 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors shadow-md flex-shrink-0"
          >
            <Plus size={18} /> Add Job
          </button>
        </div>
      </div>

      {/* Modals & Lists */}
      {showForm && (
        <JobForm 
          onClose={closeForm} 
          job={editingJob} 
          refreshJobs={fetchJobs} 
        />
      )}

      {filteredJobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <Briefcase size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">No applications found</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            {searchTerm || filterStatus !== 'All' 
              ? 'Try adjusting your search or filters.' 
              : 'Add your first job application using the "Add Job" button above.'}
          </p>
          {!(searchTerm || filterStatus !== 'All') && (
            <button 
              onClick={() => setShowForm(true)}
              className="mt-6 text-indigo-600 font-medium hover:text-indigo-700"
            >
              + Add your first job
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard 
              key={job._id} 
              job={job} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
