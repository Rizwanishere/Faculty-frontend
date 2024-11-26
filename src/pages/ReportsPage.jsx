import React from "react";
import { Link } from "react-router-dom";

function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
      <div className="container mx-auto">
        <h1 className="text-2xl text-primary font-bold text-center mb-8">
          Reports Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Attendance Reports Section */}
          <Link to="/reports/attendance">
            <div className="border border-primary border-2 p-20 rounded-lg shadow-2xl flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-primary">Attendance Report</h2>
            </div>
          </Link>

          {/* Marks Reports Section */}
          <Link to="/reports/marks">
            <div className="border border-primary border-2 p-20 rounded-lg shadow-2xl flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-primary">Marks Report</h2>
            </div>
          </Link>

          {/* Progress Report Section */}
          <Link to="/progressreport">
            <div className="border border-primary border-2 p-20 rounded-lg shadow-2xl flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-primary">Progress Report</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
