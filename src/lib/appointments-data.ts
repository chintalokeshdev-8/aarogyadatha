
export const previousAppointments = [
    {
        problem: "Typhoid Fever",
        specialty: "General Physician",
        date: "2024-08-01",
        initialDoctor: "Dr. Anjali",
        prescriptions: [
            {
                title: "1st Follow-up",
                status: "Completed",
                date: "Aug 1, 2024 - Aug 7, 2024",
                doctor: "Dr. Anjali",
                summary: "Patient presented with high-grade fever for 3 days. Typhoid suspected, blood tests ordered.",
                medicines: ["Paracetamol 650mg", "Azithromycin 500mg"],
                prescriptionImage: "https://picsum.photos/seed/rx1/800/1100",
                dataAiHint: "medical prescription",
                details: [
                    { name: 'Complete Blood Picture', date: '2024-08-02', status: 'Normal', result: 'Completed' },
                    { name: 'Widal Test for Typhoid', date: '2024-08-02', status: 'Abnormal', result: 'Completed' },
                ]
            },
            {
                title: "2nd Follow-up",
                status: "Completed",
                date: "Aug 8, 2024 - Aug 15, 2024",
                doctor: "sathyam seelam",
                summary: "Fever persisting. Confirmed Typhoid. Antibiotic course adjusted.",
                medicines: ["Cefixime 200mg", "Continue Paracetamol"],
                prescriptionImage: "https://picsum.photos/seed/rx2/800/1100",
                dataAiHint: "medical prescription",
                details: [
                    { name: 'Dengue NS1 Antigen', date: '2024-08-09', status: 'Normal', result: 'Completed' },
                ]
            },
            {
                title: "3rd Follow-up",
                status: "Completed",
                date: "Aug 16, 2024 - Aug 23, 2024",
                doctor: "nageswarao seelam",
                summary: "Patient recovering, fever has subsided. Advised to complete antibiotic course and take rest.",
                medicines: ["Multivitamins", "Continue Cefixime"],
                prescriptionImage: "https://picsum.photos/seed/rx3/800/1100",
                dataAiHint: "medical prescription",
                details: []
            },
            {
                title: "Condition Status",
                status: "Resolved",
                date: "As of Aug 24, 2024",
                doctor: "nageswarao seelam",
                summary: "Patient has fully recovered from Typhoid fever. All vitals are stable. Congratulations on your recovery!",
                medicines: [],
                prescriptionImage: "",
                dataAiHint: "",
                details: []
            }
        ]
    },
    {
        problem: "Liver Cirrhosis",
        specialty: "Gastroenterologist",
        date: "2021-09-15",
        initialDoctor: "Dr. R.K. Reddy",
        prescriptions: [
            {
                title: "1st Follow-up (Diagnosis)",
                status: "Completed",
                date: "Sep 15, 2021",
                doctor: "Dr. R.K. Reddy",
                summary: "Patient (age 30) presented with fatigue, jaundice, and abdominal swelling (ascites). Diagnosed with Liver Cirrhosis based on LFT and Ultrasound.",
                medicines: ["Diuretics (Spironolactone)", "Beta-blockers (Propranolol)"],
                prescriptionImage: "https://picsum.photos/seed/rx4/800/1100",
                dataAiHint: "medical prescription",
                details: [
                    { name: 'Liver Function Test', date: '2021-09-15', status: 'Abnormal', result: 'Completed' },
                    { name: 'Ultrasound Abdomen', date: '2021-09-16', status: 'Abnormal', result: 'Completed' },
                ]
            },
            {
                title: "2nd Follow-up (6-Month)",
                status: "Completed",
                date: "Mar 20, 2022",
                doctor: "Dr. R.K. Reddy",
                summary: "Ascites is under control. Patient reports feeling less fatigued. Endoscopy performed to check for varices.",
                medicines: ["Continue current medication", "Lactulose syrup"],
                prescriptionImage: "https://picsum.photos/seed/rx5/800/1100",
                dataAiHint: "medical prescription",
                details: [
                    { name: 'Upper GI Endoscopy', date: '2022-03-22', status: 'Abnormal', result: 'Completed' },
                    { name: 'CT Scan (Abdomen)', date: '2022-03-22', status: 'Abnormal', result: 'Completed' },
                ]
            },
             {
                title: "3rd Follow-up (Annual Review)",
                status: "Completed",
                date: "Sep 25, 2023",
                doctor: "Dr. Ramesh Babu",
                summary: "Condition is stable, but long-term prognosis discussed. Doctor mentioned that a liver transplant may be necessary in the future and advised to maintain a healthy lifestyle.",
                medicines: ["Adjusted dosage of Diuretics", "Rifaximin"],
                prescriptionImage: "https://picsum.photos/seed/rx6/800/1100",
                dataAiHint: "medical prescription",
                details: [
                    { name: 'Liver Function Test', date: '2023-09-25', status: 'Abnormal', result: 'Completed' },
                    { name: 'FibroScan', date: '2023-09-26', status: 'Abnormal', result: 'Completed' },
                ]
            },
             {
                title: "4th Follow-up (Recent)",
                status: "Active",
                date: "Jul 10, 2024",
                doctor: "Dr. Ramesh Babu",
                summary: "Patient reports episodes of confusion (encephalopathy). Medication adjusted. Reinforcing the need for a liver transplant as a long-term solution. Referred to transplant team.",
                medicines: ["Continue Lactulose and Rifaximin", "Add Vitamin K supplements"],
                prescriptionImage: "https://picsum.photos/seed/rx7/800/1100",
                dataAiHint: "medical prescription",
                details: [
                    { name: 'Ammonia Level Test', date: '2024-07-10', status: 'Abnormal', result: 'Completed' },
                    { name: 'Prothrombin Time (PT)', date: '2024-07-10', status: 'Abnormal', result: 'Completed' },
                ]
            },
            {
                title: "Liver Transplant Readiness",
                status: "Action Required",
                date: "Next Step",
                doctor: "Transplant Team",
                summary: "The medical team has determined that you are now a candidate for a liver transplant. The next step is to get a cost estimation and complete the pre-authorization process.",
                medicines: [],
                prescriptionImage: "",
                dataAiHint: "",
                details: []
            }
        ]
    },
    {
        problem: "Post-viral fatigue & chest pain",
        specialty: "Cardiologist",
        date: "2024-08-05",
        initialDoctor: "Ashok kumar chintha",
        prescriptions: [
            {
                title: "1st Follow-up",
                status: "Completed",
                date: "Aug 5, 2024 - Aug 18, 2024",
                doctor: "Ashok kumar chintha",
                summary: "Initial tests and medication after consultation for post-viral fatigue and chest pain. Patient advised to monitor symptoms and follow up with test results.",
                medicines: ["Metoprolol 25mg", "Aspirin 81mg", "Vitamin B Complex"],
                prescriptionImage: "https://picsum.photos/seed/rx8/800/1100",
                dataAiHint: "medical prescription",
                details: [
                    { name: 'Echocardiogram', date: '2024-08-10', status: 'Abnormal', result: 'Completed' },
                    { name: 'Troponin-I', date: '2024-08-10', status: 'Abnormal', result: 'Completed' },
                ]
            },
            {
                title: "2nd Follow-up",
                status: "Completed",
                date: "Aug 19, 2024 - Sep 02, 2024",
                doctor: "Dr. Ramesh Babu",
                summary: "Follow-up tests and revised medication after Troponin-I levels showed improvement. Patient feels less fatigue. BP is stable at 120/80 mmHg.",
                medicines: ["Atorvastatin 20mg", "Aspirin 81mg"],
                prescriptionImage: "https://picsum.photos/seed/rx9/800/1100",
                dataAiHint: "medical prescription",
                 details: [
                    { name: 'Troponin-I', date: '2024-08-18', status: 'Normal', result: 'Completed' },
                    { name: 'Creatine Kinase', date: '2024-08-18', status: 'Normal', result: 'Completed' },
                    { name: 'BNP (B-type Natriuretic Peptide)', date: '2024-08-18', status: 'Normal', result: 'Completed' },
                ]
            },
            {
                title: "Condition Status",
                status: "Improved",
                date: "As of Sep 03, 2024",
                doctor: "Dr. Anjali",
                summary: "Patient showing significant improvement. Key cardiac markers have normalized. Final check-up scheduled to confirm full recovery.",
                medicines: [],
                prescriptionImage: "",
                dataAiHint: "",
                 details: []
            }
        ]
    },
    {
        problem: "Seasonal Flu",
        specialty: "General Physician",
        date: "2024-07-15",
        initialDoctor: "Dr. Anjali",
        prescriptions: [
             {
                title: "1st Follow-up",
                status: "Completed",
                date: "Jul 15, 2024 - Jul 22, 2024",
                doctor: "Dr. Anjali",
                summary: "Standard treatment for viral infection. Patient reported fever and cough. Prescribed rest and hydration.",
                medicines: ["Paracetamol 500mg", "Cetirizine 10mg"],
                prescriptionImage: "https://picsum.photos/seed/rx10/800/1100",
                dataAiHint: "medical prescription",
                details: []
            },
            {
                title: "Condition Status",
                status: "Resolved",
                date: "As of Jul 23, 2024",
                doctor: "Dr. Anjali",
                summary: "Symptoms resolved after one week of treatment. Patient advised to continue monitoring for any recurring issues.",
                medicines: [],
                prescriptionImage: "",
                dataAiHint: "",
                 details: []
            }
        ]
    },
     {
        problem: "Knee Pain",
        specialty: "Orthopedic Surgeon",
        date: "2024-06-10",
        initialDoctor: "Dr. Lakshmi Narasaiah",
        prescriptions: [
             {
                title: "1st Follow-up",
                status: "Completed",
                date: "Jun 10, 2024 - Jun 24, 2024",
                doctor: "Dr. Lakshmi Narasaiah",
                summary: "Patient Sreenu reported mild to moderate knee pain after a minor fall. Advised rest and anti-inflammatory medication. X-Ray ordered.",
                medicines: ["Ibuprofen 400mg", "Glucosamine"],
                prescriptionImage: "https://picsum.photos/seed/rx11/800/1100",
                dataAiHint: "medical prescription",
                details: [
                     { name: 'Knee X-Ray', date: '2024-06-11', status: 'Normal', result: 'Completed' },
                ]
            },
            {
                title: "2nd Follow-up",
                status: "Completed",
                date: "Jun 25, 2024 - Jul 09, 2024",
                doctor: "Dr. G. Ravi Shankara Reddy",
                summary: "Pain persists. Since X-Ray was normal, a course of physiotherapy was recommended to strengthen the knee.",
                medicines: ["Continue Ibuprofen as needed"],
                prescriptionImage: "https://picsum.photos/seed/rx12/800/1100",
                dataAiHint: "medical prescription",
                details: []
            }
        ]
    },
];

export const getAllVisits = () => {
  const allVisits = previousAppointments.flatMap(appt => 
    appt.prescriptions.map(p => ({
      date: p.date.split(' - ')[0],
      reason: appt.problem,
      doctor: p.doctor,
    }))
  );

  // Sort by date descending
  allVisits.sort((a, b) => {
      // Handle "Next Step" or other non-date strings
      if (isNaN(new Date(a.date).getTime())) return 1;
      if (isNaN(new Date(b.date).getTime())) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime()
  });
  
  return allVisits;
};
