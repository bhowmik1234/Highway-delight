export const Header = () => (
  <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-auto py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="highway delight"
        className="w-28 h-16 object-contain"
      />

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Search experiences"
          className="px-4 py-2 w-full sm:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button className="w-full sm:w-auto px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-colors">
          Search
        </button>
      </div>
    </nav>
  </header>
);
