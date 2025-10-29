
export type Page = 'home' | 'details' | 'checkout' | 'result';


export type Experience = {
  _id: string; // MongoDB uses _id
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
};

// For the slots on the Details page
export type AvailabilitySlot = {
  time: string;
  left: number;
};

export type AvailabilityDate = {
  date: string;
  slots: AvailabilitySlot[];
};

// For the Details page
export type ExperienceDetails = {
  _id: string;
  title: string;
  price: number;
  image: string;
  longDescription: string;
  about: string;
  availability: AvailabilityDate[];
};






export interface BookingSlot {
  experience: ExperienceDetails;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
}

export interface BookingConfirmation {
  referenceId: string;
}
