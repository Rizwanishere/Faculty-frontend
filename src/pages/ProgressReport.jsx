import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ProgressReport = () => {
  const printRef = useRef();

  const generatePDF = () => {
    const input = printRef.current;

    // Use html2canvas to capture the content as an image
    html2canvas(input, {
      scale: 2, // Ensure a high-resolution capture
      useCORS: true, // Enable CORS for images
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save("progress-report.pdf"); // Save the PDF
    });
  };

  return (
    <div>
      <div
        ref={printRef}
        className="w-[210mm] h-[297mm] mx-auto p-10 bg-white"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/e/e9/Lords_Institute_of_Engineering_and_Technology_logo.png"
              alt="Lords Institute Logo"
              className="w-[100px] h-[100px]"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold">
                LORDS INSTITUTE OF ENGINEERING & TECHNOLOGY
              </h1>
              <p className="text-md text-center font-bold">(Autonomous)</p>
              <p className="text-md text-center">
                Approved by AICTE | Affiliated to Osmania University | Estd.2003
              </p>
              <p className="text-md text-center">
                Accredited with ‘A’ grade by NAAC | Accredited by NBA
              </p>
              <p className="text-lg font-bold text-red-500 mt-2 text-center">
                Department of Computer Science and Engineering
              </p>
            </div>
          </div>
        </div>

        {/* Progress Report Heading */}
        <div className="text-center mt-8">
          <h2 className="text-lg font-semibold">Progress Report</h2>
        </div>

        {/* Student Details */}
        <div className="mt-4 text-md">
          <p className="font-bold">
            Academic Year: <span className="font-semibold">2024-2025</span>
          </p>
          <p className="text-right">
            B.E- <span className="font-semibold">III Semester</span>
          </p>
          <p className="mt-1 font-bold">
            Roll No: <span className="font-semibold">__________</span>
          </p>
          <p className="mt-1 font-bold">
            Name of the Student:{" "}
            <span className="font-semibold">__________</span>
          </p>
          <p className="mt-1 font-bold">
            Father Name: <span className="font-semibold">__________</span>
          </p>
        </div>

        {/* Greeting and Information */}
        <div className="mt-6">
          <p className="text-md">Dear Parent/Guardian,</p>
          <p className="text-md mt-2">
            The following are the details of the attendance and Continuous
            Internal Evaluation-1 of your ward. It is furnished for your
            information.
          </p>
        </div>

        {/* Table Placeholder */}
        <div className="mt-6">
          <div className="border border-gray-400 p-4">
            <p className="text-sm text-center">TABLE WILL BE HERE</p>
          </div>
        </div>

        <h4 className="mt-2">
          *DT – Descriptive Test ST-Surprise Test AT- Assignment AB-Absent
          NS-Not Submitted
        </h4>

        {/* Attendance Information */}
        <div className="mt-6">
          <p className="text-sm">
            Your ward’s attendance is{" "}
            <span className="font-semibold">__________%</span> which is
          </p>
          <p className="font-bold mt-2">Important Note:</p>
          <ul className="text-sm mt-4 list-disc ml-5">
            <li>
              As per the <p className="font-bold inline">Osmania University</p>{" "}
              rules, a student must have minimum attendance of 75% in aggregate
              of all the subjects to be eligible or promoted for the next year.{" "}
              <p className="inline font-bold">
                Students having less than 75% attendance in aggregate will not
                be issued Hall Ticket for the examination; such students will
                come under Condonation/Detention category.
              </p>
            </li>
            <li className="font-bold">
              As per State Government rules, the student is not eligible for
              Scholarship if the attendance is less than 75%.
            </li>
          </ul>
        </div>

        {/* Backlog Data */}
        <div className="mt-6">
          <h3 className="font-semibold">Backlog Data:</h3>
          <table className="mt-2 w-full border border-collapse border-black text-sm">
            <thead>
              <tr>
                <th className="border border-black px-2 py-1">___ Sem.</th>
                <th className="border border-black px-2 py-1">___ Sem.</th>
                <th className="border border-black px-2 py-1">
                  Remarks by Head of the Department
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Empty rows */}
              <tr>
                <td className="border border-black px-2 py-1 h-8"></td>
                <td className="border border-black px-2 py-1 h-8"></td>
                <td className="border border-black px-2 py-1 h-8"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature Section */}
        <div className="mt-12 flex justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-sm">Sign. of the Student:</p>
            <div className="border-b border-black w-48 mt-4"></div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm">Sign. of the Parent/Guardian:</p>
            <div className="border-b border-black w-48 mt-4"></div>
          </div>
        </div>

        {/* Footer with Mentor and HOD */}
        <div className="mt-20 flex justify-between">
          <p className="font-semibold">Mentor</p>
          <p className="font-semibold">Head of the Department</p>
        </div>
      </div>

      {/* Button to Trigger PDF Generation */}
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default ProgressReport;
