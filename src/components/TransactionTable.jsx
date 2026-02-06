import { useState } from "react";

function TransactionTable({ transactions, onEdit, onDelete }) {

  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [divisionFilter, setDivisionFilter] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredTransactions = transactions.filter((t) => {
    const txDate = new Date(t.transactionDateTime);

    if (categoryFilter !== "ALL" && t.category !== categoryFilter) return false;
    if (divisionFilter !== "ALL" && t.division !== divisionFilter) return false;
    if (startDate && txDate < new Date(startDate)) return false;
    if (endDate && txDate > new Date(endDate)) return false;

    return true;
  });

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">

      {/* Title */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Transaction History
      </h2>

      {/* Filter Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-3">
          Filter Transactions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Category
            </label>
            <select
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option>FOOD</option>
              <option>FUEL</option>
              <option>MEDICAL</option>
              <option>MOVIE</option>
              <option>LOAN</option>
              <option>OTHER</option>
            </select>
          </div>

          {/* Division */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Division
            </label>
            <select
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
            >
              <option value="ALL">All Divisions</option>
              <option>PERSONAL</option>
              <option>OFFICE</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              From Date
            </label>
            <input
              type="date"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              To Date
            </label>
            <input
              type="date"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Division
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Date
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-slate-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t) => {
                const hoursPassed =
                  (Date.now() - new Date(t.createdAt).getTime()) /
                  (1000 * 60 * 60);

                return (
                  <tr
                    key={t.id}
                    className="hover:bg-slate-50 transition"
                  >

                    {/* Type */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium
                          ${
                            t.type === "INCOME"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {t.type}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      ₹ {t.amount.toLocaleString()}
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 text-slate-700">
                      {t.category}
                    </td>

                    {/* Division */}
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                        {t.division}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {new Date(t.transactionDateTime).toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center">
                      {hoursPassed <= 12 ? (
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => onEdit(t)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(t.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          Locked
                        </span>
                      )}
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default TransactionTable;
