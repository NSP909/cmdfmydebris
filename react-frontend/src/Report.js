import React, { useState, useEffect } from 'react';
import './Report.css'; // Import the CSS file

function ReportComponent() {
    const [report, setReport] = useState('');

    useEffect(() => {
        // Function to fetch data from the server
        const fetchReport = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/get-report');
                const data = await response.json();
                // Extract report content from the response
                const reportContent = data.report;
                // Set the report content in state
                setReport(reportContent);
            } catch (error) {
                console.error('Error fetching report:', error);
            }
        };

        // Call fetchReport function
        fetchReport();
    }, []);

    return (
        <div className="report-container">
            <h2 className="report-heading">Report</h2>
            {/* Display the report content inside a textarea */}
            <textarea
                className="report-textarea"
                value={report}
                rows={10} // Adjust the number of rows as needed
                readOnly // Make the textarea read-only
            />
        </div>
    );
}

export default ReportComponent;
