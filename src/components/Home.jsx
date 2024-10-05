import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Faculty Management Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Marks Entry Column */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Marks Entry</h2>
            <p className="text-gray-600">Enter marks for various tests such as CIE, Assignments, and more.</p>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded">
              Go to Marks Entry
            </button>
          </div>

          {/* Attendance Entry Column */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Attendance Entry</h2>
            <p className="text-gray-600">Record student attendance for different subjects and dates.</p>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded">
              Go to Attendance Entry
            </button>
          </div>

          {/* Reports Column */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Reports</h2>
            <p className="text-gray-600">View and generate reports for marks and attendance.</p>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded">
              Go to Reports
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
