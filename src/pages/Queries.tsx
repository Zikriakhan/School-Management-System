import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';


const departments = [
  { name: 'Total', count: 5, bg: 'bg-green-800' },
  { name: 'New', count: 3, bg: 'bg-yellow-800' },
  { name: 'Leave', count: 5, bg: 'bg-purple-800' },
  { name: 'Fee', count: 25, bg: 'bg-green-800' },
  { name: 'Exam', count: 3, bg: 'bg-yellow-800' },
  { name: 'Meeting', count: 5, bg: 'bg-purple-800' },
  { name: 'Other', count: 5, bg: 'bg-purple-800' },



];





const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return 'bg-green-100 text-green-800';
    case 'intermediate': return 'bg-blue-100 text-blue-800';
    case 'advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const queries = [
  { from: 'John Doe', to: 'John Doe', msg: 'Here is the message', fwd: 'John Doe', type: 'Leave', date: '24, Jan 2025' },
  { from: 'John Doe', to: 'John Doe', msg: 'Here is the message', fwd: 'John Doe', type: 'Leave', date: '24, Jan 2025' },
  { from: 'John Doe', to: 'John Doe', msg: 'Here is the message', fwd: 'John Doe', type: 'Leave', date: '24, Jan 2025' },
];

const QueryTable = () => (
  <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {departments.map((dept, index) => (
        <div
          key={index}
          className={`${dept.bg} text-white p-5 rounded-md shadow text-center`}
        >
          <h3 className="text-xl font-bold">{dept.name}</h3>
          <p className="text-3xl mt-2">{dept.count}</p>
        </div>
      ))}
    </div>

    <div className="bg-white p-6 rounded shadow">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Applications/Queries</h2>
        <a href="#" className="text-blue-600">View All</a>
      </div>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="p-2">S.No</th>
            <th className="p-2">From</th>
            <th className="p-2">To</th>
            <th className="p-2">Message</th>
            <th className="p-2">Frwd By</th>
            <th className="p-2">Type</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((q, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{q.from}</td>
              <td className="p-2">{q.to}</td>
              <td className="p-2">{q.msg}</td>
              <td className="p-2">{q.fwd}</td>
              <td className="p-2"><span className="bg-red-200 text-red-800 px-2 py-1 rounded">{q.type}</span></td>
              <td className="p-2">{q.date}</td>
              <td className="p-2 flex gap-2">
                <FaEye className="text-green-600 cursor-pointer" />
                <FaEdit className="text-blue-600 cursor-pointer" />
                <FaTrash className="text-red-600 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

export default QueryTable;
