import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [submitted, setSubmitted] = useState(false);
  const [totalClasses, setTotalClasses] = useState("");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]); // State to store subjects
  const [filters, setFilters] = useState({
    year: "",
    semester: "",
    section: "",
    subject: "",
    period: "",
  });
  const selectedBranch = localStorage.getItem("selectedBranch");

  // Fetch subjects from backend
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/subjects/branch/${selectedBranch}`
      );
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchStudents = async () => {
    if (filters.year && filters.semester && filters.section) {
      if (selectedBranch) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/students/filtered?branch=${selectedBranch}&year=${filters.year}&semester=${filters.semester}&section=${filters.section}&subjectId=${filters.subject}&period=${filters.period}`
          );
          setStudents(response.data);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    }
  };

  useEffect(() => {
    fetchSubjects(); // Fetch subjects when component mounts
  }, []);

  useEffect(() => {
    if (submitted) fetchStudents();
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    await fetchStudents();
    setSubmitted(true);
  };

  const handleAttendanceChange = (index, value) => {
    const updatedStudents = [...students];

    // Ensure that `attendance` array exists before updating
    if (!updatedStudents[index].attendance) {
      updatedStudents[index].attendance = [];
    }

    // Ensure that `attendance[0]` exists and is initialized
    if (!updatedStudents[index].attendance[0]) {
      updatedStudents[index].attendance[0] = { classesAttended: 0 };
    }

    updatedStudents[index].attendance[0].classesAttended = value;
    setStudents(updatedStudents);
  };

  const handleSaveEmptyAttendance = async (studentId, classesAttended) => {
    try {
      await axios.post(`http://localhost:3000/api/students/attendance`, {
        student: studentId,
        subject: filters.subject,
        totalClasses: totalClasses,
        classesAttended: classesAttended,
        period: filters.period,
      });
      alert("Attendance created successfully");
    } catch (error) {
      console.error("Error creating attendance:", error);
      alert("Failed to create attendance");
    }
  };

  const handleSave = async () => {
    try {
      for (let student of students) {
        if (student.attendance && student.attendance.length > 0) {
          const { _id, attendance } = student;

          if (attendance[0]._id) {
            // Make PUT request to update attendance
            await axios.put(
              `http://localhost:3000/api/students/attendance/${attendance[0]._id}`,
              {
                student: _id,
                subject: filters.subject,
                totalClasses: totalClasses,
                classesAttended: attendance[0].classesAttended,
                period: filters.period,
              }
            );
          } else {
            // If no attendance ID, make POST request to create a new attendance
            await handleSaveEmptyAttendance(_id, attendance[0].classesAttended);
          }
        }
      }
      alert("Attendance updated successfully");
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance");
    }
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
            {/* Dynamically render subjects */}
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
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
                    <input
                      type="number"
                      className="border p-2 rounded w-full"
                      value={student.attendance?.[0]?.classesAttended || ""}
                      onChange={(e) =>
                        handleAttendanceChange(index, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Save button */}
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleSave}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
