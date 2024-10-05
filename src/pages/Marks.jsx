import React, { useState } from 'react';

const Marks = () => {
  const [submitted, setSubmitted] = useState(false);
  const [examType, setExamType] = useState('');
  const [maxMarks, setMaxMarks] = useState(0);
  const [students, setStudents] = useState([
    { sNo: 1, rollNo: '123', name: 'John Doe', marks: '' },
    { sNo: 2, rollNo: '124', name: 'Jane Smith', marks: '' },
    // Add more student records as needed
  ]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Function to handle exam type change and set max marks
  const handleExamTypeChange = (e) => {
    const selectedExamType = e.target.value;
    setExamType(selectedExamType);
    
    // Set max marks based on the selected exam type
    if (selectedExamType === 'CIE-1' || selectedExamType === 'CIE-2') {
      setMaxMarks(20);
    } else {
      setMaxMarks(10);
    }
  };

  // Function to handle marks input change, ensuring marks do not exceed the max marks
  const handleMarksChange = (index, value) => {
    if (value <= maxMarks) {
      const updatedStudents = [...students];
      updatedStudents[index].marks = value;
      setStudents(updatedStudents);
    } else {
      alert(`Marks cannot exceed the maximum of ${maxMarks}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <form className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-2xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Marks Entry</h2>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <select className="border p-2 rounded">
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <select className="border p-2 rounded">
            <option value="">Select Semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
          </select>

          <select className="border p-2 rounded">
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <select className="border p-2 rounded">
            <option value="">Select Regulation</option>
            <option value="lr21">LR21</option>
            <option value="lr22">LR22</option>
            <option value="lr23">LR23</option>
          </select>

          <select className="border p-2 rounded">
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>

          {/* Exam Type Dropdown with Max Marks Update */}
          <select className="border p-2 rounded" value={examType} onChange={handleExamTypeChange}>
            <option value="">Select Test Type</option>
            <option value="CIE-1">CIE-1</option>
            <option value="CIE-2">CIE-2</option>
            <option value="ASSIGNMENT - 1">Assignment-1</option>
            <option value="ASSIGNMENT - 2">Assignment-2</option>
            <option value="ASSIGNMENT - 3">Assignment-3</option>
            <option value="SURPRISE TEST - 1">Surprise Test-1</option>
            <option value="SURPRISE TEST - 2">Surprise Test-2</option>
            <option value="SURPRISE TEST - 3">Surprise Test-3</option>
          </select>
        </div>

        {/* Max Marks Display */}
        {examType && (
          <p className="mt-6 ml-28 text-lg text-blue-700">
            The maximum marks for {examType} is {maxMarks}.
          </p>
        )}

        {/* Submit button */}
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Enter
        </button>
      </form>

      {/* Conditionally render the table after form submission */}
      {submitted && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Enter Marks</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 border">S.No</th>
                <th className="py-2 border">Roll No</th>
                <th className="py-2 border">Name</th>
                <th className="py-2 border">Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.sNo}>
                  <td className="py-2 border text-center">{student.sNo}</td>
                  <td className="py-2 border text-center">{student.rollNo}</td>
                  <td className="py-2 border text-center">{student.name}</td>
                  <td className="py-2 border text-center">
                    <input
                      type="number"
                      className="border p-2 rounded w-full"
                      value={student.marks}
                      onChange={(e) => handleMarksChange(index, e.target.value)}
                      max={maxMarks}
                      min={0}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Save and Submit buttons */}
          <div className="mt-4 flex justify-end space-x-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marks;
