import React, { useState, createContext, useContext } from 'react';

// Tailwind CSS is assumed to be available.

// --- Inline SVG Icons (simplified for demonstration) ---
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);

const PlusCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>
    </svg>
);

const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14 9 11"/>
    </svg>
);

const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
        <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
    </svg>
);

// --- Context for Project Management ---
const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    const addProject = (project) => {
        setProjects(prevProjects => [...prevProjects, project]);
    };

    const addTask = (projectId, task) => {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === projectId
                    ? { ...project, tasks: [...project.tasks, task] }
                    : project
            )
        );
    };

    const toggleTaskStatus = (projectId, taskId) => {
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project.id === projectId
                    ? {
                        ...project,
                        tasks: project.tasks.map(task =>
                            task.id === taskId ? { ...task, completed: !task.completed } : task
                        )
                    }
                    : project
            )
        );
    };

    const getProjectById = (projectId) => {
        return projects.find(p => p.id === projectId);
    };

    return (
        <ProjectContext.Provider value={{
            projects,
            addProject,
            addTask,
            toggleTaskStatus,
            getProjectById
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

// --- Components ---

// Navbar Component
const Navbar = ({ setCurrentPage }) => {
    return (
        <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-10 rounded-b-xl">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold rounded-md px-3 py-1 bg-blue-600">
                    TaskFlow
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setCurrentPage('projectList')}
                        className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        <HomeIcon /> Projects
                    </button>
                    <button
                        onClick={() => setCurrentPage('createProject')}
                        className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        <PlusCircleIcon /> New Project
                    </button>
                </div>
            </div>
        </nav>
    );
};

// Project List Page
const ProjectListPage = ({ setCurrentPage, setSelectedProjectId }) => {
    const { projects } = useContext(ProjectContext);

    const handleViewProject = (projectId) => {
        setSelectedProjectId(projectId);
        setCurrentPage('projectDetail');
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)] rounded-xl my-4 shadow-inner">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Your Projects</h2>

            {projects.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No projects created yet. <button onClick={() => setCurrentPage('createProject')} className="text-blue-600 hover:underline font-medium">Start a new project!</button></p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => {
                        const completedTasks = project.tasks.filter(task => task.completed).length;
                        const totalTasks = project.tasks.length;
                        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

                        return (
                            <div key={project.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-200 flex flex-col">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2 line-clamp-1">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{project.description}</p>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-700 mb-1">Progress: {completedTasks}/{totalTasks} tasks completed</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleViewProject(project.id)}
                                    className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 mt-auto"
                                >
                                    View Project
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// Create Project Page
const CreateProjectPage = ({ setCurrentPage, addProject }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Project title cannot be empty.');
            return;
        }
        const newProject = {
            id: Date.now().toString(), // Simple unique ID
            title,
            description,
            tasks: []
        };
        addProject(newProject);
        alert('Project created successfully!'); // Using alert for simulation
        setCurrentPage('projectList');
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)] rounded-xl my-4 shadow-inner flex items-center justify-center">
            <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Create New Project</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="projectTitle" className="block text-lg font-medium text-gray-700 mb-2">Project Title</label>
                        <input
                            type="text"
                            id="projectTitle"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="projectDescription" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            id="projectDescription"
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
                    >
                        Create Project
                    </button>
                </form>
            </div>
        </div>
    );
};

// Project Detail Page
const ProjectDetailPage = ({ setCurrentPage, selectedProjectId }) => {
    const { getProjectById, addTask, toggleTaskStatus } = useContext(ProjectContext);
    const project = getProjectById(selectedProjectId);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskAssignee, setNewTaskAssignee] = useState('');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');

    if (!project) {
        return (
            <div className="container mx-auto px-4 py-8 text-center bg-gray-50 min-h-[calc(100vh-64px)] rounded-xl my-4 shadow-inner">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Project Not Found</h2>
                <p className="text-gray-700 mb-6">The project you are looking for does not exist or has been removed.</p>
                <button
                    onClick={() => setCurrentPage('projectList')}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
                >
                    Back to Projects
                </button>
            </div>
        );
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) {
            alert('Task title cannot be empty.');
            return;
        }
        const newTask = {
            id: Date.now().toString(),
            title: newTaskTitle,
            assignee: newTaskAssignee || 'Unassigned',
            dueDate: newTaskDueDate || 'No due date',
            completed: false
        };
        addTask(project.id, newTask);
        setNewTaskTitle('');
        setNewTaskAssignee('');
        setNewTaskDueDate('');
    };

    const completedTasksCount = project.tasks.filter(task => task.completed).length;
    const totalTasksCount = project.tasks.length;
    const progressPercentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)] rounded-xl my-4 shadow-inner">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
                <button
                    onClick={() => setCurrentPage('projectList')}
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Back to Projects
                </button>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{project.title}</h1>
                <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

                {/* Project Progress */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Project Progress</h3>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-700 text-right">{completedTasksCount} / {totalTasksCount} tasks completed ({progressPercentage.toFixed(0)}%)</p>
                </div>

                {/* Add New Task Form */}
                <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">Add New Task</h3>
                    <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Task Title"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 col-span-full md:col-span-1"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Assignee (Optional)"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                            value={newTaskAssignee}
                            onChange={(e) => setNewTaskAssignee(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Due Date (Optional)"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                            value={newTaskDueDate}
                            onChange={(e) => setNewTaskDueDate(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-300 col-span-full"
                        >
                            Add Task
                        </button>
                    </form>
                </div>

                {/* Task List */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h3>
                {project.tasks.length === 0 ? (
                    <p className="text-gray-600">No tasks added to this project yet.</p>
                ) : (
                    <div className="space-y-4">
                        {project.tasks.map(task => (
                            <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTaskStatus(project.id, task.id)}
                                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-3"
                                    />
                                    <div>
                                        <p className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                            {task.title}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Assignee: {task.assignee} | Due: {task.dueDate}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {task.completed ? 'Completed' : 'Pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    const [currentPage, setCurrentPage] = useState('projectList'); // 'projectList', 'createProject', 'projectDetail'
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    // Render content based on currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'projectList':
                return <ProjectListPage setCurrentPage={setCurrentPage} setSelectedProjectId={setSelectedProjectId} />;
            case 'createProject':
                return <CreateProjectPage setCurrentPage={setCurrentPage} addProject={useContext(ProjectContext).addProject} />;
            case 'projectDetail':
                return <ProjectDetailPage setCurrentPage={setCurrentPage} selectedProjectId={selectedProjectId} />;
            default:
                return <ProjectListPage setCurrentPage={setCurrentPage} setSelectedProjectId={setSelectedProjectId} />;
        }
    };

    return (
        <ProjectProvider>
            <div className="bg-gray-100 min-h-screen">
                <Navbar setCurrentPage={setCurrentPage} />
                {renderPage()}
            </div>
        </ProjectProvider>
    );
};

export default App; // Export the main App component
