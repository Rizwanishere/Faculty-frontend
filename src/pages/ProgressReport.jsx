import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const ProgressReport = () => {
  const [rollNo, setRollNo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!rollNo || !startDate || !endDate) {
      setError("Please provide Roll No, Start Date, and End Date.");
      return;
    }

    setLoading(true);
    setError("");
    setReportData(null);

    try {
      // Format dates to DD/MM/YYYY for the API
      const formattedStartDate = moment(startDate).format("DD/MM/YYYY");
      const formattedEndDate = moment(endDate).format("DD/MM/YYYY");

      const response = await axios.get(
        `http://localhost:3000/api/students/${rollNo}/data`,
        {
          params: { startDate: formattedStartDate, endDate: formattedEndDate },
        }
      );

      setReportData(response.data);
    } catch (err) {
      setError(
        "Failed to fetch data. Please check the inputs or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const groupDataBySubject = () => {
    if (!reportData) return [];

    // Filter and group attendance
    const filteredAttendance = filterAttendance(reportData.attendance);
    const attendanceBySubject =
      calculateAttendanceBySubject(filteredAttendance);

    // Group marks by subjectId
    const groupedMarks = reportData.marks.reduce((acc, mark) => {
      if (!acc[mark.subjectId]) {
        acc[mark.subjectId] = {
          subjectId: mark.subjectId,
          subjectName: mark.subjectName,
          DT: 0,
          ST: 0,
          AT: 0,
          totalMarks: 0,
        };
      }

      // Add marks based on exam type
      if (mark.examType === "CIE-1") acc[mark.subjectId].DT = mark.marks;
      if (mark.examType === "SURPRISE TEST-1")
        acc[mark.subjectId].ST = mark.marks;
      if (mark.examType === "ASSIGNMENT-1") acc[mark.subjectId].AT = mark.marks;

      acc[mark.subjectId].totalMarks =
        acc[mark.subjectId].DT +
        acc[mark.subjectId].ST +
        acc[mark.subjectId].AT;
      return acc;
    }, {});

    // Merge attendance and marks data
    attendanceBySubject.forEach((att) => {
      if (groupedMarks[att.subjectId]) {
        groupedMarks[att.subjectId].totalClasses = att.totalClasses;
        groupedMarks[att.subjectId].classesAttended = att.classesAttended;
      } else {
        groupedMarks[att.subjectId] = {
          subjectId: att.subjectId,
          subjectName: att.subjectName,
          DT: 0,
          ST: 0,
          AT: 0,
          totalMarks: 0,
          totalClasses: att.totalClasses,
          classesAttended: att.classesAttended,
        };
      }
    });

    return Object.values(groupedMarks); // Return the grouped data as an array
  };

  const calculateTotals = () => {
    const groupedData = groupDataBySubject();

    const attendanceSummary = groupedData.reduce(
      (totals, data) => {
        totals.totalClasses += data.totalClasses || 0;
        totals.classesAttended += data.classesAttended || 0;
        return totals;
      },
      { totalClasses: 0, classesAttended: 0 }
    );

    const percentage = attendanceSummary.totalClasses
      ? (
          (attendanceSummary.classesAttended / attendanceSummary.totalClasses) *
          100
        ).toFixed(2)
      : 0;

    return { ...attendanceSummary, percentage };
  };

  const filterAttendance = (attendance) => {
    const filteredAttendance = {};

    attendance.forEach((record) => {
      // Create a unique key for each subject, month, and year
      const key = `${record.subjectId}-${record.year}-${record.month}`;

      // If no record exists for this key, add it
      if (!filteredAttendance[key]) {
        filteredAttendance[key] = record;
      } else {
        // If a record already exists and the current record is `period:30th`, replace it
        if (record.period === "30th") {
          filteredAttendance[key] = record;
        }
      }
    });

    return Object.values(filteredAttendance); // Return filtered attendance as an array
  };

  const calculateAttendanceBySubject = (attendance) => {
    const groupedAttendance = {};

    attendance.forEach((record) => {
      if (!groupedAttendance[record.subjectId]) {
        groupedAttendance[record.subjectId] = {
          subjectId: record.subjectId,
          subjectName: record.subjectName,
          totalClasses: 0,
          classesAttended: 0,
        };
      }

      // Sum up the total classes and classes attended for the subject
      groupedAttendance[record.subjectId].totalClasses += record.totalClasses;
      groupedAttendance[record.subjectId].classesAttended +=
        record.classesAttended;
    });

    return Object.values(groupedAttendance); // Return grouped attendance as an array
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Form */}
      <form
        className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4">Progress Report</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Roll No
          </label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Roll No"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold rounded-lg p-2 hover:bg-blue-600 transition"
        >
          Generate Report
        </button>
      </form>

      {/* Error and Loading States */}
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}

      {/* Report Table */}
      {reportData && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4">
            Report for {reportData.studentName}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">S. No.</th>
                <th className="border border-gray-300 p-2">Course Title</th>
                <th className="border border-gray-300 p-2">
                  No. of Classes Conducted
                </th>
                <th className="border border-gray-300 p-2">
                  No. of Classes Attended
                </th>
                <th className="border border-gray-300 p-2">DT (20)</th>
                <th className="border border-gray-300 p-2">ST (10)</th>
                <th className="border border-gray-300 p-2">AT (10)</th>
                <th className="border border-gray-300 p-2">Total (40)</th>
              </tr>
            </thead>
            <tbody>
              {groupDataBySubject().map((data, index) => (
                <tr key={data.subjectId} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {data.subjectName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data.totalClasses || "-"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data.classesAttended || "-"}
                  </td>
                  <td className="border border-gray-300 p-2">{data.DT}</td>
                  <td className="border border-gray-300 p-2">{data.ST}</td>
                  <td className="border border-gray-300 p-2">{data.AT}</td>
                  <td className="border border-gray-300 p-2">
                    {data.totalMarks}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="2"
                  className="border border-gray-300 p-2 font-semibold text-right"
                >
                  Total
                </td>
                <td className="border border-gray-300 p-2">
                  {calculateTotals().totalClasses}
                </td>
                <td className="border border-gray-300 p-2">
                  {calculateTotals().classesAttended}
                </td>
                <td colSpan="4" className="border border-gray-300 p-2">
                  Percentage: {calculateTotals().percentage}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProgressReport;
