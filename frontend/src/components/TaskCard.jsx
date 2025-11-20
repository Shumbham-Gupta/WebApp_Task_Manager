
import { Edit, Trash2, Calendar } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800',
  };

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-blue-800">{task.title}</h3>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Edit className="h-5 w-5" />
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}
        >
          {task.status}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
        >
          {task.priority} priority
        </span>
      </div>

      <div className="flex items-center text-gray-500 text-sm">
        <Calendar className="h-4 w-4 mr-1" />
        <span>{formatDate(task.dueDate)}</span>
      </div>
    </div>
  );
};

export default TaskCard;
