import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, AlertTriangle } from 'lucide-react';
import { assignedTasks } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 font-sans tracking-tight">Today's Route</h1>
      
      <div className="space-y-4">
        {assignedTasks.map((task) => (
          <Link
            key={task.id}
            to={`/checklist/${task.id}`}
            className="block bg-dark-card border border-dark-border rounded-xl p-4 active:scale-[0.98] transition-transform"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex gap-2 mb-1">
                  <span className="text-xs font-semibold text-orange-500 tracking-wider uppercase block">
                    {task.status === 'pending' ? 'To Do' : 'In Progress'}
                  </span>
                  <span className="text-[10px] font-bold bg-dark-border text-gray-300 px-2 py-0.5 rounded-full">
                    {task.serviceType} Service
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-100">{task.escalatorName}</h2>
                <p className="text-gray-400 text-sm mt-0.5">{task.location}</p>
              </div>
              {task.hasIssues && (
                <div className="bg-red-500/10 text-red-400 p-2 rounded-full border border-red-500/20">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-dark-border/50">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Last visited: {task.lastVisit}</span>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center text-orange-500 font-medium">
                Start task <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
