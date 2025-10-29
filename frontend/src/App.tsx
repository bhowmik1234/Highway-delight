import { useState } from "react";
import { Header } from "./components/header";
import { HomePage } from "./components/home";
import { DetailsPage } from "./components/detial";
import { CheckoutPage } from "./components/checkout";
import { ResultPage } from "./components/result";
import type { BookingSlot, BookingConfirmation, Page } from "./types/types";

const App = () => {
  const [page, setPage] = useState<Page>("home");
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const handleViewDetails = (id: string) => {
    setSelectedExperienceId(id);
    setPage("details");
  };

  const handleConfirmSlot = (slot: BookingSlot) => {
    setSelectedSlot(slot);
    setPage("checkout");
  };

  const handlePayAndConfirm = (conf: BookingConfirmation) => {
    setConfirmation(conf);
    setPage("result");
  };

  const handleGoHome = () => {
    setPage("home");
    setSelectedExperienceId(null);
    setSelectedSlot(null);
    setConfirmation(null);
  };

  const handleBack = () => {
    if (page === "checkout") setPage("details");
    else if (page === "details") setPage("home");
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage onViewDetails={handleViewDetails} />;
      case "details":
        if (!selectedExperienceId) {
          handleGoHome();
          return null;
        }
        return (
          <DetailsPage
            experienceId={selectedExperienceId}
            onBack={handleBack}
            onConfirmSlot={handleConfirmSlot}
          />
        );
      case "checkout":
        if (!selectedSlot) {
          handleGoHome();
          return null;
        }
        return (
          <CheckoutPage
            slot={selectedSlot}
            onBack={handleBack}
            onPayAndConfirm={handlePayAndConfirm}
          />
        );
      case "result":
        if (!confirmation) {
          handleGoHome();
          return null;
        }
        return <ResultPage confirmation={confirmation} onGoHome={handleGoHome} />;
      default:
        return null;
    }
  };

  return (
  <div className="flex flex-col min-h-screen font-sans antialiased bg-white text-gray-900">
    <Header />

    <main className="flex-grow w-full">{renderPage()}</main>

    <footer className="bg-gray-800 text-gray-300">
      <div className="w-full px-2 sm:px-4 lg:px-6 py-6 text-center">
        <p>&copy; 2025 BookIt. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

};

export default App;
