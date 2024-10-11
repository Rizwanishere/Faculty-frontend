import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [submitted, setSubmitted] = useState(false);
  const [totalClasses, setTotalClasses] = useState('');
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({ year: '', semester: '', section: '' });
  const selectedBranch = localStorage.getItem('selectedBranch'); // Get branch from storage

  const fetchBranchId = async () => {
    try {
      const branchResponse = await axios.get(`http://localhost:3000/api/branch?name=${selectedBranch}`);
      return branchResponse.data[0]._id;  // Access the first element in the array to get the _id
    } catch (error) {
      console.error('Error fetching branch:', error);
    }
  };


  const fetchStudents = async () => {
    if (filters.year && filters.semester && filters.section) {
      const branchId = await fetchBranchId();
      if (branchId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/students?branch=${branchId}&year=${filters.year}&semester=${filters.semester}&section=${filters.section}`);
          setStudents(response.data); // Update with students from backend
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      }
    }
  };

  useEffect(() => {
    if (submitted) fetchStudents(); // Fetch students on form submission
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);  // Reset submitted state to allow refetching students
    await fetchStudents();  // Fetch students again from the backend
    setSubmitted(true);     // Set submitted to true to render the students table
  };  

  const handleAttendanceChange = (index, value) => {
    const updatedStudents = [...students];
    updatedStudents[index].classesAttended = value;
    setStudents(updatedStudents);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <form className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-2xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Attendance Entry</h2>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <select
            className="border p-2 rounded"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <select
            className="border p-2 rounded"
            value={filters.semester}
            onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
          >
            <option value="">Select Semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
          </select>

          <select
            className="border p-2 rounded"
            value={filters.section}
            onChange={(e) => setFilters({ ...filters, section: e.target.value })}
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="Total No. of Classes Taken"
          className="border p-2 rounded w-full mt-4"
          value={totalClasses}
          onChange={(e) => setTotalClasses(e.target.value)}
          required
        />

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Enter
        </button>
      </form>

      {/* Conditionally render the table after form submission */}
      {submitted && students.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Enter Attendance</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 border">S.No</th>
                <th className="py-2 border">Roll No</th>
                <th className="py-2 border">Name</th>
                <th className="py-2 border">Classes Attended</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.rollNo}>
                  <td className="py-2 border text-center">{index + 1}</td>
                  <td className="py-2 border text-center">{student.rollNo}</td>
                  <td className="py-2 border text-center">{student.name}</td>
                  <td className="py-2 border text-center">
                    <input
                      type="number"
                      className="border p-2 rounded w-full"
                      value={student.classesAttended}
                      onChange={(e) => handleAttendanceChange(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;