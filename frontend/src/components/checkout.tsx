import { useState } from "react";
import { api } from "../libs/constant";
import type { BookingSlot, BookingConfirmation } from "../types/types";
import { ArrowLeftIcon } from "./Icons/icons";

export const CheckoutPage = ({
  slot,
  onBack,
  onPayAndConfirm,
}: {
  slot: BookingSlot;
  onBack: () => void;
  onPayAndConfirm: (conf: BookingConfirmation) => void;
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    email?: string;
    agreed?: string;
  }>({});

  const finalTotal = Math.max(0, slot.total - discount);

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setIsApplyingPromo(true);
    setPromoMessage("");
    setBookingError("");
    setDiscount(0);

    const result = await api.validatePromo(promoCode);

    if (result.valid && result.type && result.value) {
      let newDiscount = 0;
      if (result.type === "percent") {
        newDiscount = Math.round((slot.subtotal * result.value) / 100);
      } else if (result.type === "fixed") {
        newDiscount = result.value;
      }
      setDiscount(newDiscount);
      setPromoMessage(`"${promoCode}" applied! You saved ₹${newDiscount}`);
    } else {
      setPromoMessage(result.message || "Invalid promo code.");
    }

    setIsApplyingPromo(false);
  };

  const validateForm = () => {
    const errors: { fullName?: string; email?: string; agreed?: string } = {};
    if (!fullName.trim()) errors.fullName = "Full name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!agreed) errors.agreed = "You must agree to the terms";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePay = async () => {
    if (!validateForm()) return;
    setIsBooking(true);
    setBookingError("");

    const bookingDetails = {
      ...slot,
      experience: { id: slot.experience._id, title: slot.experience.title },
      user: { fullName, email },
      promoCode,
      discount,
      finalTotal,
    };

    const result = await api.createBooking(bookingDetails);

    if (result.success && result.referenceId) {
      onPayAndConfirm({ referenceId: result.referenceId });
    } else {
      setBookingError(result.message || "An unknown booking error occurred.");
    }
    setIsBooking(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 py-10">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-700 hover:text-black mb-8"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span className="font-medium">Checkout</span>
      </button>

      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left — Form */}
        <div className="bg-gray-100 rounded-2xl px-6 sm:px-8 py-6 w-full shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Customer Information
          </h2>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1 w-full px-4 py-2.5 border bg-gray-200 border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-2.5 border bg-gray-200 border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Promo Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Promo Code
              </label>
              <div className="mt-1 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-2.5 border bg-gray-200 border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo}
                  className="px-5 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {isApplyingPromo ? "..." : "Apply"}
                </button>
              </div>
              {promoMessage && (
                <p
                  className={`text-xs mt-2 ${
                    discount > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {promoMessage}
                </p>
              )}
            </div>

            {/* Agreement */}
            <div className="flex items-start pt-2">
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400 mt-1"
              />
              <label
                htmlFor="agree"
                className="ml-3 text-sm text-gray-700 leading-5"
              >
                I agree to the terms and safety policy
              </label>
            </div>
            {formErrors.agreed && (
              <p className="text-red-500 text-xs mt-1">{formErrors.agreed}</p>
            )}
          </form>
        </div>

        {/* Right — Summary */}
        <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Booking Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Experience</span>
              <span className="font-medium text-gray-900">
                {slot.experience.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-gray-900">{slot.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time</span>
              <span className="font-medium text-gray-900">{slot.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity</span>
              <span className="font-medium text-gray-900">
                {slot.quantity}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">
                ₹{slot.subtotal}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes</span>
              <span className="font-medium text-gray-900">₹{slot.taxes}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span className="font-medium">-₹{discount}</span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-gray-900">
                ₹{finalTotal}
              </span>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={isBooking}
            className="w-full py-3 mt-8 rounded-lg font-semibold text-lg bg-yellow-400 text-black hover:bg-yellow-500 transition-colors disabled:bg-gray-200 disabled:text-gray-500"
          >
            {isBooking ? "Processing..." : "Pay & Confirm"}
          </button>

          {bookingError && (
            <div className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">
              <p>{bookingError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
