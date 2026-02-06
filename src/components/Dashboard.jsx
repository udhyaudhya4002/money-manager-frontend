function Dashboard({ transactions }) {

  const totalIncome = transactions
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Income Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 to-green-600 text-white p-6 shadow-lg hover:scale-[1.02] transition">
          <div className="absolute top-4 right-4 text-white/30 text-4xl">
            ₹
          </div>
          <p className="text-sm uppercase tracking-wide text-white/80">
            Total Income
          </p>
          <p className="text-3xl font-bold mt-2">
            ₹ {totalIncome.toLocaleString()}
          </p>
          <p className="text-xs mt-2 text-white/70">
            All credited transactions
          </p>
        </div>

        {/* Expense Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-400 to-red-600 text-white p-6 shadow-lg hover:scale-[1.02] transition">
          <div className="absolute top-4 right-4 text-white/30 text-4xl">
            ₹
          </div>
          <p className="text-sm uppercase tracking-wide text-white/80">
            Total Expense
          </p>
          <p className="text-3xl font-bold mt-2">
            ₹ {totalExpense.toLocaleString()}
          </p>
          <p className="text-xs mt-2 text-white/70">
            All debited transactions
          </p>
        </div>

        {/* Balance Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 shadow-lg hover:scale-[1.02] transition">
          <div className="absolute top-4 right-4 text-white/30 text-4xl">
            ₹
          </div>
          <p className="text-sm uppercase tracking-wide text-white/80">
            Current Balance
          </p>
          <p className="text-3xl font-bold mt-2">
            ₹ {balance.toLocaleString()}
          </p>
          <p className="text-xs mt-2 text-white/70">
            Income − Expenses
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
