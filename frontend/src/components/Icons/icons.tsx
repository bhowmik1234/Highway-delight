import type { Experience } from "../../types/types";

export const ArrowLeftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export const CheckCircleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PlusIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const MinusIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);

export const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    </div>
    <span className="font-bold text-xl">highway delite</span>
  </div>
);


export const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
  </div>
);

export const ExperienceCard = ({
  experience,
  onViewDetails,
}: {
  experience: Experience;
  onViewDetails: (id: string) => void;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 w-full">
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-100">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
          onError={(e) =>
            (e.currentTarget.src =
              "https://placehold.co/600x400/gray/white?text=Image+Unavailable")
          }
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {experience.title}
          </h3>
          <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-md">
            {experience.location}
          </span>
        </div>

        <p className="text-gray-600 text-sm flex grow leading-relaxed">
          {experience.description}
        </p>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
          <p className="text-gray-900 text-base">
            From{" "}
            <span className="text-xl font-bold">₹{experience.price}</span>
          </p>
          <button
            onClick={() => onViewDetails(experience._id)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};