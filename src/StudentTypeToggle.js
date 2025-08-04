import React from "react";

function StudentTypeToggle({ studentType, setStudentType }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => setStudentType("international")}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          backgroundColor: studentType === "international" ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        International
      </button>
      <button
        onClick={() => setStudentType("domestic")}
        style={{
          padding: "10px 20px",
          backgroundColor: studentType === "domestic" ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Domestic
      </button>
    </div>
  );
}

export default StudentTypeToggle;
