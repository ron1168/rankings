import React, { useState } from "react";
import universityData from "./UniversityData";
import jsPDF from "jspdf";

function App() {
  const [selectedUniversity, setSelectedUniversity] = useState(universityData[0]);
  const [selectedSubject, setSelectedSubject] = useState(universityData[0].subjects[0]);
  const [selectedProgram, setSelectedProgram] = useState("Masters");
  const [selectedStudentType, setSelectedStudentType] = useState("International");
  const [cgpa, setCgpa] = useState(0);
  const [sat, setSat] = useState(0);
  const [savedReports, setSavedReports] = useState([]);

  const selectedSubjectData = selectedUniversity.subjectDetails[selectedSubject]?.program?.[selectedProgram];

  const convertCgpaToGpa = (cgpa) => (cgpa / 10) * 4;

  const estimateAdmissionProbability = () => {
    if (!selectedSubjectData || !cgpa || !sat) return "Enter both CGPA and SAT";
    const gpa = convertCgpaToGpa(cgpa);
    const gpaCutoff = parseFloat(selectedSubjectData.gpaCutoff);
    const satCutoff = parseInt(selectedSubjectData.satCutoff);

    if (gpa >= gpaCutoff && sat >= satCutoff) return "Highly Likely";
    if (gpa >= gpaCutoff - 0.2 || sat >= satCutoff - 30) return "Likely";
    if (gpa >= gpaCutoff - 0.5 || sat >= satCutoff - 100) return "Doubtful";
    return "Unlikely";
  };

  const saveReport = () => {
    const report = {
      university: selectedUniversity.name,
      subject: selectedSubject,
      program: selectedProgram,
      studentType: selectedStudentType,
      cgpa,
      gpa: convertCgpaToGpa(cgpa).toFixed(2),
      sat,
      probability: estimateAdmissionProbability(),
      details: selectedSubjectData,
    };
    setSavedReports([...savedReports, report]);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    savedReports.forEach((report, index) => {
      if (index !== 0) doc.addPage();
      doc.setFontSize(14);
      doc.text(`University Admission Report #${index + 1}`, 20, 20);
      let y = 30;
      const lines = [
        `University: ${report.university}`,
        `Program: ${report.program}`,
        `Subject: ${report.subject}`,
        `Student Type: ${report.studentType}`,
        `CGPA: ${report.cgpa ?? "N/A"}`,
        `Converted GPA (4.0 Scale): ${report.gpa}`,
        `SAT Score: ${report.sat ?? "N/A"}`,
        `Estimated Admission Probability: ${report.probability}`,
        `QS Subject Rank: ${report.details?.qsSubjectRank ?? "N/A"}`,
        `Start Date: ${report.details?.startDate ?? "N/A"}`,
        `Fees: ${report.details?.fees?.[report.studentType] ?? "N/A"}`,
        `Eligibility: ${report.details?.eligibility?.[report.studentType] ?? "N/A"}`,
        `Intakes per Year: ${report.details?.intakes ?? "N/A"}`,
        `Application Deadlines: ${report.details?.deadlines ?? "N/A"}`,
        `Scholarship Info: ${report.details?.scholarship ?? "Not Available"}`,
        `Course Link: ${report.details?.courseLink ?? "N/A"}`
      ];
      lines.forEach((line) => {
        doc.text(line, 20, y);
        y += 10;
      });
    });

    doc.save("University_Admission_Reports.pdf");
  };

  return (
    <div className="App" style={{ fontFamily: "Arial", padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>QS World University Rankings Explorer</h1>

      <label>Select University:</label>
      <select
        value={selectedUniversity.name}
        onChange={(e) => {
          const university = universityData.find((u) => u.name === e.target.value);
          setSelectedUniversity(university);
          setSelectedSubject(university.subjects[0]);
        }}
      >
        {universityData.map((u) => (
          <option key={u.name} value={u.name}>{u.name}</option>
        ))}
      </select>

      <div style={{ marginTop: "10px" }}>
        <label>Student Type:</label>
        <button onClick={() => setSelectedStudentType("International")}>International</button>
        <button onClick={() => setSelectedStudentType("Domestic")}>Domestic</button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Select Program:</label>
        <select
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
        >
          {selectedUniversity.programs.map((prog) => (
            <option key={prog} value={prog}>{prog}</option>
          ))}
        </select>
      </div>

      <h2>{selectedUniversity.name}</h2>
      <p><strong>General QS Rank:</strong> {selectedUniversity.generalRank}</p>

      <label>Select Subject:</label>
      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        {selectedUniversity.subjects.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <h3>{selectedSubject} ({selectedProgram})</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}>
        <tbody>
          <tr><td><strong>QS Subject Rank</strong></td><td>{selectedSubjectData?.qsSubjectRank}</td></tr>
          <tr><td><strong>Start Date</strong></td><td>{selectedSubjectData?.startDate}</td></tr>
          <tr><td><strong>Fees</strong></td><td>{selectedSubjectData?.fees?.[selectedStudentType]}</td></tr>
          <tr><td><strong>Eligibility</strong></td><td>{selectedSubjectData?.eligibility?.[selectedStudentType]}</td></tr>
          <tr><td><strong>Intakes per Year</strong></td><td>{selectedSubjectData?.intakes}</td></tr>
          <tr><td><strong>Application Deadlines</strong></td><td>{selectedSubjectData?.deadlines}</td></tr>
          <tr><td><strong>Scholarship Info</strong></td><td>{selectedSubjectData?.scholarship || "Not Available"}</td></tr>
        </tbody>
      </table>

      <h4 style={{ marginTop: "20px" }}>Student Inputs</h4>
      <label>Enter CGPA (out of 10): </label>
      <input
        type="number"
        value={cgpa}
        onChange={(e) => setCgpa(parseFloat(e.target.value))}
        step="0.1"
      />
      <br />
      <label>Enter SAT Score: </label>
      <input
        type="number"
        value={sat}
        onChange={(e) => setSat(parseInt(e.target.value))}
      />

      <p><strong>Converted GPA (out of 4):</strong> {convertCgpaToGpa(cgpa).toFixed(2)}</p>
      <p><strong>Estimated Admission Probability:</strong> {estimateAdmissionProbability()}</p>

      <p><strong>Course Link:</strong> <a href={selectedSubjectData?.courseLink} target="_blank" rel="noopener noreferrer">Visit</a></p>

      <h4>Rank & Cutoff Table (Last 5 Years)</h4>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Year</th>
            <th>QS Subject Rank</th>
            <th>GPA Cutoff<br /><small>(Approximate admission benchmark – not an official cutoff)</small></th>
            <th>SAT Cutoff<br /><small>(Approximate admission benchmark – not an official cutoff)</small></th>
          </tr>
        </thead>
        <tbody>
          {selectedSubjectData?.rankingHistory?.map((entry, index) => (
            <tr key={index}>
              <td>{entry.year}</td>
              <td>{entry.qsRank}</td>
              <td>{entry.gpaCutoff}</td>
              <td>{entry.satCutoff}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button onClick={saveReport}>Save Report</button>
        <button onClick={exportPDF} style={{ marginLeft: "10px" }}>Export All Reports as PDF</button>
      </div>
    </div>
  );
}

export default App;
