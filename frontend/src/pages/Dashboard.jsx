
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { toast } from 'react-toastify';
import { Plus, Search } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks(filters);
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      toast.success('Task created successfully');
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskService.updateTask(editingTask._id, taskData);
      toast.success('Task updated successfully');
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const getStats = () => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  });

  const stats = getStats();

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">Manage your tasks and stay productive</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-blue-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Total Tasks</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
          </div>

          <div className="bg-white border border-blue-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>

          <div className="bg-white border border-blue-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.inProgress}</p>
          </div>

          <div className="bg-white border border-blue-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-blue-100 p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search tasks..."
                className="w-full border border-blue-200 focus:border-blue-500 focus:ring-blue-500 rounded-md p-2 pl-10"
              />
            </div>

            {/* Status */}
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border border-blue-200 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500 md:w-48"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            {/* Priority */}
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="border border-blue-200 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500 md:w-48"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {/* New Task Button */}
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow flex items-center whitespace-nowrap"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </button>
          </div>
        </div>

        {/* Tasks */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tasks found. Create your first task!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditClick}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}

        {/* Task Form */}
        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onClose={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        )}

      </div>
    </div>
  );
};

export default Dashboard;
