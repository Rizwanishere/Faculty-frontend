import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [submitted, setSubmitted] = useState(false);
  const [totalClasses, setTotalClasses] = useState("");
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    semester: "",
    section: "",
    subject: "",
    period: "",
  });
  const selectedBranch = localStorage.getItem("selectedBranch"); // Get branch from storage

  const fetchStudents = async () => {
    if (filters.year && filters.semester && filters.section) {
      if (selectedBranch) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/students/filtered?branch=${selectedBranch}&year=${filters.year}&semester=${filters.semester}&section=${filters.section}&subjectId=${filters.subject}&period=${filters.period}`
          );
          setStudents(response.data); // Update with students from backend
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (submitted) fetchStudents(); // Fetch students on form submission
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false); // Reset submitted state to allow refetching students
    await fetchStudents(); // Fetch students again from the backend
    setSubmitted(true); // Set submitted to true to render the students table
  };

  const handleAttendanceChange = (index, value) => {
    const updatedStudents = [...students];
    updatedStudents[index].classesAttended = value;
    setStudents(updatedStudents);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <form
        className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
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
            onChange={(e) =>
              setFilters({ ...filters, semester: e.target.value })
            }
          >
            <option value="">Select Semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
          </select>

          <select
            className="border p-2 rounded"
            value={filters.section}
            onChange={(e) =>
              setFilters({ ...filters, section: e.target.value })
            }
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <select
            className="border p-2 rounded"
            value={filters.subject}
            onChange={(e) =>
              setFilters({ ...filters, subject: e.target.value })
            }
          >
            <option value="">Select Subject</option>
            <option value="670c1907a98ffba835b66d33">CD</option>
            <option value="670c192aa98ffba835b66d35">CN</option>
            <option value="670c1935a98ffba835b66d37">AI</option>
            <option value="670c193aa98ffba835b66d39">BEFA</option>
            <option value="670c1944a98ffba835b66d3b">RSE</option>
          </select>

          <select
            value={filters.period}
            onChange={(e) => setFilters({ ...filters, period: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Attendance Date</option>
            <option value="15th">Up to 15th</option>
            <option value="30th">Up to 30th</option>
          </select>
        </div>

        {/* Total classes taken */}
        <input
          type="number"
          placeholder="Total No. of Classes Taken"
          className="border p-2 rounded w-full mt-4"
          value={totalClasses}
          onChange={(e) => setTotalClasses(e.target.value)}
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
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
                    {student.attendance.length > 0 && (
                      <input
                        type="number"
                        className="border p-2 rounded w-full"
                        value={student.attendance[0].classesAttended || 0}
                        onChange={(e) =>
                          handleAttendanceChange(index, e.target.value)
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Save button */}
          <div className="mt-4 flex justify-end space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
