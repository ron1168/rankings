// UniversityData.js

const subjects = [
  "Chemical Engineering",
  "Civil and Structural Engineering",
  "Computer Science and Information Systems",
  "Data Science and Artificial Intelligence",
  "Electrical and Electronic Engineering",
  "Linguistics",
  "Materials Science",
  "Mechanical, Aeronautical and Manufacturing Engineering",
  "Mathematics",
  "Physics and Astronomy",
  "Statistics and Operational Research",
  "Accounting and Finance",
  "Architecture and Built Environment",
  "Biological Sciences",
  "Business and Management Studies",
  "Chemistry",
  "Earth and Marine Sciences",
  "Economics and Econometrics"
];

const generateSubjectDetails = (subjectName) => ({
  program: {
    Bachelors: {
      qsSubjectRank: subjectName === "Chemical Engineering" ? 1 : 2,
      startDate: "September 2025",
      fees: {
        International: "$50,000/year",
        Domestic: "$20,000/year"
      },
      eligibility: {
        International: "High school diploma + SAT + TOEFL",
        Domestic: "High school diploma + SAT"
      },
      intakes: 1,
      deadlines: "January 1, 2025",
      scholarship: "Merit & need-based available",
      gpaCutoff: 3.6,
      satCutoff: 1450,
      courseLink: "https://www.mit.edu/",
      rankingHistory: [
        { year: 2021, qsRank: 1, gpaCutoff: 3.6, satCutoff: 1450 },
        { year: 2022, qsRank: 1, gpaCutoff: 3.65, satCutoff: 1460 },
        { year: 2023, qsRank: 1, gpaCutoff: 3.7, satCutoff: 1480 },
        { year: 2024, qsRank: 1, gpaCutoff: 3.75, satCutoff: 1490 },
        { year: 2025, qsRank: 1, gpaCutoff: 3.8, satCutoff: 1500 }
      ]
    },
    Masters: {
      qsSubjectRank: subjectName === "Chemical Engineering" ? 1 : 2,
      startDate: "September 2025",
      fees: {
        International: "$60,000/year",
        Domestic: "$25,000/year"
      },
      eligibility: {
        International: `Bachelor’s in ${subjectName}, TOEFL/IELTS`,
        Domestic: `Bachelor’s in ${subjectName}`
      },
      intakes: 2,
      deadlines: "Dec 15 (Fall), Apr 15 (Spring)",
      scholarship: "TA/RA & fellowship options",
      gpaCutoff: 3.5,
      satCutoff: 1400,
      courseLink: "https://www.mit.edu/",
      rankingHistory: [
        { year: 2021, qsRank: 1, gpaCutoff: 3.5, satCutoff: 1400 },
        { year: 2022, qsRank: 1, gpaCutoff: 3.6, satCutoff: 1420 },
        { year: 2023, qsRank: 1, gpaCutoff: 3.7, satCutoff: 1430 },
        { year: 2024, qsRank: 1, gpaCutoff: 3.65, satCutoff: 1450 },
        { year: 2025, qsRank: 1, gpaCutoff: 3.7, satCutoff: 1460 }
      ]
    },
    PhD: {
      qsSubjectRank: subjectName === "Chemical Engineering" ? 1 : 2,
      startDate: "September 2025",
      fees: {
        International: "$52,000/year (waived with assistantship)",
        Domestic: "$22,000/year (waived with assistantship)"
      },
      eligibility: {
        International: `Master’s in ${subjectName}, research proposal`,
        Domestic: `Master’s in ${subjectName}, GRE optional`
      },
      intakes: 1,
      deadlines: "December 1, 2024",
      scholarship: "Full funding via assistantship",
      gpaCutoff: 3.7,
      satCutoff: 0,
      courseLink: "https://www.mit.edu/",
      rankingHistory: [
        { year: 2021, qsRank: 1, gpaCutoff: 3.7, satCutoff: 0 },
        { year: 2022, qsRank: 1, gpaCutoff: 3.75, satCutoff: 0 },
        { year: 2023, qsRank: 1, gpaCutoff: 3.8, satCutoff: 0 },
        { year: 2024, qsRank: 1, gpaCutoff: 3.78, satCutoff: 0 },
        { year: 2025, qsRank: 1, gpaCutoff: 3.8, satCutoff: 0 }
      ]
    }
  }
});

const universityData = [
  {
    name: "Massachusetts Institute of Technology (MIT)",
    generalRank: 1,
    programs: ["Bachelors", "Masters", "PhD"],
    subjects,
    subjectDetails: subjects.reduce((acc, subj) => {
      acc[subj] = generateSubjectDetails(subj);
      return acc;
    }, {})
  }
];

export default universityData;
