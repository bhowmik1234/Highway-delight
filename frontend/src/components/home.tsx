import { useState, useEffect } from "react";
import { api } from "../libs/constant";
import type { Experience } from "../types/types";
import { ExperienceCard, LoadingSpinner } from "./Icons/icons";
export const HomePage = ({
  onViewDetails,
}: {
  onViewDetails: (id: string) => void;
}) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      const data = await api.getExperiences();

      if ("error" in data) {
        setError(data.message || "Failed to load experiences.");
      } else {
        setExperiences(data);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  const totalPages = Math.ceil(experiences.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = experiences.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-10 py-10">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        {currentItems.map((exp) => (
          <ExperienceCard
            key={exp._id}
            experience={exp}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2 sm:space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-yellow-400 border-yellow-400 text-black transition-colors"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                currentPage === i + 1
                  ? "bg-yellow-400 border-yellow-400 text-black"
                  : "border-gray-300 hover:bg-yellow-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-yellow-400 border-yellow-400 text-black transition-colors"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
