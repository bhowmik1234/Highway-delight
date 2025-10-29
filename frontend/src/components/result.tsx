import { CheckCircleIcon } from "./Icons/icons";
import type { BookingConfirmation } from "../types/types";

// 4. Result Page
export const ResultPage = ({
  confirmation,
  onGoHome
}: {
  confirmation: BookingConfirmation;
  onGoHome: () => void;
}) => {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
      <h1 className="text-4xl font-bold text-gray-900 mt-6">Booking Confirmed</h1>
      <p className="text-lg text-gray-600 mt-3">
        Ref ID: <span className="font-medium text-gray-800">{confirmation.referenceId}</span>
      </p>
      <button
        onClick={onGoHome}
        className="mt-10 px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
};
