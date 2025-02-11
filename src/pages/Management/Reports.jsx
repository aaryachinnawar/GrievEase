import { useContext } from 'react';
import FeedbackContext from '../../context/FeedbackContext';

const Reports = () => {
  const { generateReport } = useContext(FeedbackContext);
  const reportData = generateReport();

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Feedback Reports</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Total Feedback</th>
              <th className="py-2 px-4 border-b">Resolved</th>
              <th className="py-2 px-4 border-b">Pending</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{report.category}</td>
                <td className="py-2 px-4 border-b text-center">{report.total}</td>
                <td className="py-2 px-4 border-b text-center">{report.resolved}</td>
                <td className="py-2 px-4 border-b text-center">{report.total - report.resolved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;