import React, { useState, useEffect } from 'react';

// Tailwind CSS is assumed to be available in the environment.
// For icons, we'll use inline SVGs as lucide-react might require npm install.

// Inline SVG Icons (simplified for demonstration)
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
);

// Simulated Job Data
const mockJobs = [
    {
        id: '1',
        title: 'Frontend Developer',
        company: 'Tech Solutions Inc.',
        location: 'Remote',
        type: 'Full-time',
        salary: '$80,000 - $100,000',
        description: 'We are looking for a passionate Frontend Developer to join our dynamic team. You will be responsible for developing and implementing user interface components using React.js workflows. Experience with modern JavaScript frameworks and responsive design is a must.',
        requirements: [
            '3+ years of experience with React.js',
            'Strong proficiency in HTML, CSS, and JavaScript',
            'Experience with RESTful APIs',
            'Familiarity with version control (Git)',
            'Excellent problem-solving skills'
        ],
        postedDate: '2025-07-20'
    },
    {
        id: '2',
        title: 'Backend Engineer',
        company: 'Innovate Co.',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$95,000 - $120,000',
        description: 'Join our backend team to build scalable and robust server-side applications. You will work with Node.js, Express, and MongoDB to design and implement APIs. Knowledge of cloud platforms (AWS, Azure) is a plus.',
        requirements: [
            '5+ years of experience with Node.js and Express',
            'Proficiency in MongoDB or PostgreSQL',
            'Strong understanding of API design and development',
            'Experience with microservices architecture',
            'Bachelor\'s degree in Computer Science or related field'
        ],
        postedDate: '2025-07-18'
    },
    {
        id: '3',
        title: 'UI/UX Designer',
        company: 'Creative Studio',
        location: 'San Francisco, CA',
        type: 'Contract',
        salary: '$60/hr - $80/hr',
        description: 'We are seeking a talented UI/UX Designer to create intuitive and aesthetically pleasing user interfaces. You will collaborate closely with product managers and engineers to define and implement innovative solutions for the product direction, visuals, and experience.',
        requirements: [
            'Portfolio showcasing strong UI/UX design skills',
            'Proficiency in Figma, Sketch, or Adobe XD',
            'Experience with user research and usability testing',
            'Understanding of front-end development principles',
            'Excellent communication and collaboration skills'
        ],
        postedDate: '2025-07-22'
    },
    {
        id: '4',
        title: 'Data Scientist',
        company: 'Data Insights LLC',
        location: 'Remote',
        type: 'Full-time',
        salary: '$110,000 - $140,000',
        description: 'Lead data-driven initiatives to uncover insights and build predictive models. You will work with large datasets, machine learning algorithms, and data visualization tools to solve complex business problems.',
        requirements: [
            'Master\'s or Ph.D. in a quantitative field',
            'Strong programming skills in Python (Pandas, NumPy, Scikit-learn)',
            'Experience with SQL and data warehousing',
            'Knowledge of statistical modeling and machine learning techniques',
            'Excellent analytical and communication skills'
        ],
        postedDate: '2025-07-15'
    }
];

// --- Components ---

// Navbar Component
const Navbar = ({ setCurrentPage }) => {
    return (
        <nav className="bg-gray-800 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold rounded-md px-3 py-1 bg-indigo-600">
                    JobBoard
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        <HomeIcon /> Home
                    </button>
                    <button
                        onClick={() => setCurrentPage('jobListings')}
                        className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        <BriefcaseIcon /> Job Listings
                    </button>
                </div>
            </div>
        </nav>
    );
};

// Home Page Component
const HomePage = ({ setCurrentPage }) => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center p-4">
            <div className="text-center text-white max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
                    Find Your Dream Job Today!
                </h1>
                <p className="text-xl md:text-2xl mb-10 opacity-90">
                    Explore thousands of job opportunities from top companies worldwide.
                    Your next career move starts here.
                </p>
                <button
                    onClick={() => setCurrentPage('jobListings')}
                    className="bg-white text-indigo-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-xl transform hover:scale-105"
                >
                    Browse All Jobs
                </button>
            </div>
        </div>
    );
};

// Job Listings Page Component
const JobListingsPage = ({ setCurrentPage, setSelectedJobId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredJobs, setFilteredJobs] = useState(mockJobs);

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = mockJobs.filter(job =>
            job.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            job.company.toLowerCase().includes(lowerCaseSearchTerm) ||
            job.location.toLowerCase().includes(lowerCaseSearchTerm)
        );
        setFilteredJobs(results);
    }, [searchTerm]);

    const handleViewDetails = (jobId) => {
        setSelectedJobId(jobId);
        setCurrentPage('jobDetail');
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)]">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Available Job Openings</h2>

            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by title, company, or location..."
                    className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredJobs.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No jobs found matching your search criteria.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map(job => (
                        <div key={job.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-200 flex flex-col">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                            <p className="text-indigo-600 font-medium mb-1">{job.company}</p>
                            <p className="text-gray-600 text-sm mb-3">{job.location} | {job.type}</p>
                            <p className="text-gray-700 text-lg font-bold mb-4">{job.salary}</p>
                            <p className="text-gray-600 text-sm flex-grow mb-4 line-clamp-3">{job.description}</p>
                            <button
                                onClick={() => handleViewDetails(job.id)}
                                className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 mt-auto"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Job Detail Page Component
const JobDetailPage = ({ setCurrentPage, selectedJobId }) => {
    const job = mockJobs.find(j => j.id === selectedJobId);

    if (!job) {
        return (
            <div className="container mx-auto px-4 py-8 text-center bg-gray-50 min-h-[calc(100vh-64px)]">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Job Not Found</h2>
                <p className="text-gray-700 mb-6">The job you are looking for does not exist or has been removed.</p>
                <button
                    onClick={() => setCurrentPage('jobListings')}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
                >
                    Back to Job Listings
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)]">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-3xl mx-auto">
                <button
                    onClick={() => setCurrentPage('jobListings')}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Back to Listings
                </button>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{job.title}</h1>
                <p className="text-indigo-700 text-xl font-semibold mb-2">{job.company}</p>
                <p className="text-gray-600 text-lg mb-4">{job.location} | {job.type} | {job.salary}</p>
                <p className="text-gray-500 text-sm mb-6">Posted: {job.postedDate}</p>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">Job Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">Requirements</h3>
                <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
                    {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>

                <button
                    onClick={() => alert('Simulating application submission for ' + job.title)} // Using alert for simulation as per instructions
                    className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors duration-300 shadow-md transform hover:scale-105"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'jobListings', 'jobDetail'
    const [selectedJobId, setSelectedJobId] = useState(null);

    // Render content based on currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'jobListings':
                return <JobListingsPage setCurrentPage={setCurrentPage} setSelectedJobId={setSelectedJobId} />;
            case 'jobDetail':
                return <JobDetailPage setCurrentPage={setCurrentPage} selectedJobId={selectedJobId} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar setCurrentPage={setCurrentPage} />
            {renderPage()}
        </div>
    );
};

export default App; // Export the main App component
