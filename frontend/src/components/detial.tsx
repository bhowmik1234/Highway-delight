import { useEffect, useState } from "react";
import { ArrowLeftIcon, MinusIcon, PlusIcon, LoadingSpinner } from "./Icons/icons";
import type { ExperienceDetails, BookingSlot, AvailabilitySlot } from "../types/types";
import { api } from "../libs/constant";

export const DetailsPage = ({
  experienceId,
  onBack,
  onConfirmSlot,
}: {
  experienceId: string;
  onBack: () => void;
  onConfirmSlot: (slot: BookingSlot) => void;
}) => {
  const [experience, setExperience] = useState<ExperienceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      const data = await api.getExperienceById(experienceId);
      if ("error" in data) {
        setError(data.message || "Failed to load details.");
        setLoading(false);
        return;
      }
      setExperience(data);
      if (data?.availability?.[0]) {
        setSelectedDate(data.availability[0].date);
        setAvailableSlots(data.availability[0].slots);
      }
      setLoading(false);
    };
    loadData();
  }, [experienceId]);

  useEffect(() => {
    if (experience && selectedDate) {
      const dateData = experience.availability.find((d) => d.date === selectedDate);
      setAvailableSlots(dateData ? dateData.slots : []);
      setSelectedTime(null);
    }
  }, [selectedDate, experience]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-20 px-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={onBack}
          className="flex items-center justify-center space-x-2 text-gray-700 hover:text-black mx-auto"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Go Back</span>
        </button>
      </div>
    );

  if (!experience)
    return <div className="text-center text-gray-500 py-20">Experience not found.</div>;

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;
  const canConfirm = selectedDate && selectedTime;

  const handleConfirm = () => {
    if (!canConfirm || !experience) return;
    onConfirmSlot({
      experience,
      date: selectedDate,
      time: selectedTime,
      quantity,
      subtotal,
      taxes,
      total,
    });
  };

  const handleDateSelect = (date: string) => setSelectedDate(date);
  const handleTimeSelect = (time: string, left: number) => {
    if (left > 0) setSelectedTime(time);
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 lg:px-10 xl:px-20 py-10">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-700 hover:text-black mb-8"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Details</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="w-full aspect-video bg-gray-200 rounded-xl overflow-hidden mb-6">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  'https://placehold.co/1200x800/gray/white?text=Image+Broken')
              }
            />
          </div>

          {/* Title & Description */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {experience.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mt-3 leading-relaxed">
            {experience.longDescription}
          </p>

          {/* Date Selector */}
          <div className="mt-10">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Choose Date</h3>
            <div className="flex flex-wrap gap-3">
              {experience.availability.length > 0 ? (
                experience.availability.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => handleDateSelect(d.date)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
                      selectedDate === d.date
                        ? "bg-black text-white"
                        : "bg-white text-black border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {d.date}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No dates available for this experience.</p>
              )}
            </div>
          </div>

          {/* Time Selector */}
          {selectedDate && (
            <div className="mt-10">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Choose Time</h3>
              <div className="flex flex-wrap gap-3">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => handleTimeSelect(slot.time, slot.left)}
                      disabled={slot.left === 0}
                      className={`relative px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-medium text-sm sm:text-base min-w-[100px] sm:min-w-[120px] transition-colors ${
                        selectedTime === slot.time
                          ? "bg-black text-white"
                          : slot.left === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                            : "bg-white text-black border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {slot.time}
                      {slot.left > 0 && slot.left <= 5 && (
                        <span className="absolute -top-2 -right-2 text-xs text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full">
                          {slot.left} left
                        </span>
                      )}
                      {slot.left === 0 && (
                        <span className="absolute text-xs -bottom-2 left-1/2 -translate-x-1/2 text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded-full">
                          Sold out
                        </span>
                      )}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500">No slots available for this date.</p>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">All times are in IST (GMT +5:30)</p>
            </div>
          )}

          {/* About Section */}
          <div className="mt-10">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">About</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {experience.about}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Booking Card) */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 shadow-md sticky top-8">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-gray-700 text-sm sm:text-base">Starts at</span>
              <span className="font-bold text-lg sm:text-xl">₹{experience.price}</span>
            </div>

            {/* Quantity Controls */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 text-sm sm:text-base">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                  disabled={quantity === 1}
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="font-bold text-base sm:text-lg w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t border-gray-200 pt-4">
              {selectedDate && (
                <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                  <span className="text-gray-700">Date</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
              )}
              {selectedTime && (
                <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                  <span className="text-gray-700">Time</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
              )}
              {(selectedDate || selectedTime) && (
                <div className="border-t border-gray-200 my-2" />
              )}
              <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-sm sm:text-base">
                <span className="text-gray-700">Taxes</span>
                <span className="font-medium">₹{taxes}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg sm:text-xl">Total</span>
                <span className="font-bold text-xl sm:text-2xl">₹{total}</span>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                disabled={!canConfirm}
                className="w-full py-3 rounded-lg font-semibold text-base sm:text-lg transition-colors disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
