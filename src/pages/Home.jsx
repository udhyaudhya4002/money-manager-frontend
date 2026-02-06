import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import TransactionTable from "../components/TransactionTable";
import TransactionModal from "../components/TransactionModal";
import CategoryPieChart from "../components/CategoryPieChart";

import {
  getAllTransactions,
  getCategorySummary,
  deleteTransaction,
} from "../services/api";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [categorySummary, setCategorySummary] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  const loadTransactions = () => {
    getAllTransactions()
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));

    getCategorySummary()
      .then((res) => setCategorySummary(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="p-6 space-y-6 relative">

      {/* Dashboard */}
      <Dashboard transactions={transactions} />

      {/* Pie Chart */}
      <CategoryPieChart data={categorySummary} />

      {/* Transaction Table */}
      <TransactionTable
        transactions={transactions}
        onEdit={(t) => {
          setEditTransaction(t);
          setOpenModal(true);
        }}
        onDelete={(id) => {
          if (window.confirm("Are you sure you want to delete this transaction?")) {
            deleteTransaction(id)
              .then(loadTransactions)
              .catch(() => alert("Delete failed"));
          }
        }}
      />

      {/* Floating Add Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full text-3xl shadow-lg"
        onClick={() => {
          setEditTransaction(null);
          setOpenModal(true);
        }}
      >
        +
      </button>

      {/* Add / Edit Modal */}
      <TransactionModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditTransaction(null);
        }}
        onSuccess={loadTransactions}
        editTransactionData={editTransaction}
      />

    </div>
  );
}

export default Home;
