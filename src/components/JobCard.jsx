import { Calendar, PenLine, Trash2, Building2 } from 'lucide-react';
import { format } from 'date-fns';

const JobCard = ({ job, onDelete, onEdit }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Interview': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Offer': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-500';
      case 'Interview': return 'bg-amber-500';
      case 'Offer': return 'bg-emerald-500';
      case 'Rejected': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
      
      {/* Decorative top border */}
      <div className={`absolute top-0 left-0 w-full h-1 ${getStatusDot(job.status)} opacity-80`} />

      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 shadow-sm flex-shrink-0 text-slate-400">
            <Building2 size={22} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">{job.role}</h3>
            <p className="text-sm font-medium text-slate-500">{job.company}</p>
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(job.status)} uppercase tracking-wider`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${getStatusDot(job.status)}`} />
          {job.status}
        </div>
      </div>

      {job.notes && (
        <div className="mb-4 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
          <p className="text-sm text-slate-600 line-clamp-2">
            <span className="font-semibold text-slate-700 mr-2">Notes:</span> 
            {job.notes}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center text-xs text-slate-400 font-medium">
          <Calendar size={14} className="mr-1.5" />
          {job.createdAt ? format(new Date(job.createdAt), 'MMM dd, yyyy') : 'Recently'}
        </div>
        
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(job)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            title="Edit"
          >
            <PenLine size={16} />
          </button>
          <button 
            onClick={() => onDelete(job._id)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
