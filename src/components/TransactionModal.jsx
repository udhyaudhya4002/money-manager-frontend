import { useState, useEffect } from "react";
import { addTransaction, editTransaction } from "../services/api";

// Income sources
const incomeCategories = [
  "SALARY",
  "BUSINESS",
  "FREELANCE",
  "INTEREST",
  "BONUS",
  "OTHER",
];

// Expense categories
const expenseCategories = [
  "FOOD",
  "FUEL",
  "MEDICAL",
  "MOVIE",
  "LOAN",
  "OTHER",
];

function TransactionModal({
  isOpen,
  onClose,
  onSuccess,
  editTransactionData = null,
}) {

  const [type, setType] = useState("INCOME");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("SALARY");
  const [division, setDivision] = useState("PERSONAL");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");

  // 🔥 Populate fields when editing
  useEffect(() => {
    if (editTransactionData) {
      setType(editTransactionData.type);
      setAmount(editTransactionData.amount);
      setCategory(editTransactionData.category);
      setDivision(editTransactionData.division);
      setDescription(editTransactionData.description);
      setDateTime(editTransactionData.transactionDateTime);
    }
  }, [editTransactionData]);

  if (!isOpen) return null;

  const handleSubmit = () => {

    // 🔹 EDIT MODE
    if (editTransactionData) {
      const editData = {
        category,
        division,
        description,
      };

      editTransaction(editTransactionData.id, editData)
        .then(() => {
          onSuccess();
          onClose();
        })
        .catch((err) => {
          alert(err.response?.data || "Edit failed");
        });

      return;
    }

    // 🔹 ADD MODE
    const addData = {
      type,
      amount: Number(amount),
      category,
      division,
      description,
      transactionDateTime: dateTime,
      accountId: "69844e591db9f35878bcf6ef", // TEMP accountId
    };

    addTransaction(addData)
      .then(() => {
        onSuccess();
        onClose();
      })
      .catch((err) => {
        alert(err.response?.data || "Add failed");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded p-6">

        <h2 className="text-lg font-semibold mb-4">
          {editTransactionData ? "Edit Transaction" : `Add ${type}`}
        </h2>

        {/* Tabs (disabled in edit mode) */}
        {!editTransactionData && (
          <div className="flex mb-4">
            <button
              className={`flex-1 py-2 ${
                type === "INCOME" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setType("INCOME");
                setCategory("SALARY");
              }}
            >
              Income
            </button>

            <button
              className={`flex-1 py-2 ${
                type === "EXPENSE" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setType("EXPENSE");
                setCategory("FOOD");
              }}
            >
              Expense
            </button>
          </div>
        )}

        {/* Form */}
        <div className="space-y-3">
          {!editTransactionData && (
            <>
              <input
                type="number"
                placeholder="Amount"
                className="w-full border p-2"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <input
                type="datetime-local"
                className="w-full border p-2"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </>
          )}

          <select
            className="w-full border p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {(type === "INCOME"
              ? incomeCategories
              : expenseCategories
            ).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="w-full border p-2"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          >
            <option>PERSONAL</option>
            <option>OFFICE</option>
          </select>

          <input
            type="text"
            placeholder="Description"
            className="w-full border p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white"
            onClick={handleSubmit}
          >
            {editTransactionData ? "Update" : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default TransactionModal;
