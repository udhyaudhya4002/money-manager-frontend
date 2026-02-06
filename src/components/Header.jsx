function Header() {
  return (
    <header className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
      
      {/* Left */}
      <div>
        <h1 className="text-xl font-semibold tracking-wide">
          Money Manager
        </h1>
        <p className="text-xs text-blue-100">
          Personal Expense Management
        </p>
      </div>

      {/* Right (future-ready, but clean) */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-blue-100">
          Dashboard
        </span>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
          U
        </div>
      </div>

    </header>
  );
}

export default Header;
