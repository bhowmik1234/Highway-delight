import type { Experience, ExperienceDetails } from "../types/types";

// export const mockExperiences = [
//   {
//     id: '1',
//     title: 'Kayaking',
//     location: 'Udupi',
//     price: 999,
//     image: 'https://placehold.co/600x400/0284c7/white?text=Kayaking',
//     description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
//   },
//   {
//     id: '2',
//     title: 'Nandi Hills Sunrise',
//     location: 'Bangalore',
//     price: 899,
//     image: 'https://placehold.co/600x400/f97316/white?text=Nandi+Hills',
//     description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
//   },
//   {
//     id: '3',
//     title: 'Coffee Trail',
//     location: 'Coorg',
//     price: 1299,
//     image: 'https://placehold.co/600x400/16a34a/white?text=Coffee+Trail',
//     description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
//   },
//   {
//     id: '4',
//     title: 'Kayaking',
//     location: 'Udupi, Karnataka',
//     price: 999,
//     image: 'https://placehold.co/600x400/0284c7/white?text=Kayaking',
//     description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
//   },
//   {
//     id: '5',
//     title: 'Nandi Hills Sunrise',
//     location: 'Bangalore',
//     price: 899,
//     image: 'https://placehold.co/600x400/f97316/white?text=Nandi+Hills',
//     description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
//   },
//   {
//     id: '6',
//     title: 'Boat Cruise',
//     location: 'Sunderban',
//     price: 999,
//     image: 'https://placehold.co/600x400/3b82f6/white?text=Boat+Cruise',
//     description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
//   },
//   {
//     id: '7',
//     title: 'Bunjee Jumping',
//     location: 'Manali',
//     price: 999,
//     image: 'https://placehold.co/600x400/7c3aed/white?text=Bungee',
//     description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
//   },
//   {
//     id: '8',
//     title: 'Coffee Trail',
//     location: 'Coorg',
//     price: 1299,
//     image: 'https://placehold.co/600x400/16a34a/white?text=Coffee+Trail',
//     description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
//   },
// ];

// export const mockExperienceDetails: { [key: string]: any } = {
//   '1': {
//     id: '1',
//     title: 'Kayaking',
//     image: 'https://placehold.co/1200x800/0284c7/white?text=Kayaking',
//     longDescription: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
//     about: 'Scenic routes, trained guides, and safety briefing. Minimum age 10.',
//     price: 999,
//     availability: [
//       { date: 'Oct 22', slots: [
//         { time: '07:00 am', left: 4 },
//         { time: '09:00 am', left: 2 },
//         { time: '11:00 am', left: 5 },
//         { time: '01:00 pm', left: 0 },
//       ]},
//       { date: 'Oct 23', slots: [
//         { time: '07:00 am', left: 8 },
//         { time: '09:00 am', left: 5 },
//         { time: '11:00 am', left: 3 },
//       ]},
//       { date: 'Oct 24', slots: [
//         { time: '09:00 am', left: 1 },
//         { time: '11:00 am', left: 0 },
//       ]},
//       { date: 'Oct 25', slots: [
//         { time: '07:00 am', left: 10 },
//         { time: '09:00 am', left: 10 },
//       ]},
//       { date: 'Oct 26', slots: [
//         { time: '07:00 am', left: 0 },
//         { time: '09:00 am', left: 0 },
//         { time: '11:00 am', left: 0 },
//       ]},
//     ]
//   },
//   // Add other mock details as needed
//   '2': { id: '2', title: 'Nandi Hills Sunrise', price: 899, image: 'https://placehold.co/1200x800/f97316/white?text=Nandi+Hills', longDescription: 'Experience the breathtaking sunrise from Nandi Hills.', about: 'Early morning trek, guide included. Minimum age 12.', availability: [/*...*/] },
//   '3': { id: '3', title: 'Coffee Trail', price: 1299, image: 'https://placehold.co/1200x800/16a34a/white?text=Coffee+Trail', longDescription: 'Walk through the aromatic coffee plantations of Coorg.', about: 'Guided walk, coffee tasting. Minimum age 8.', availability: [/*...*/] },
//   '4': { id: '4', title: 'Kayaking', price: 999, image: 'https://placehold.co/1200x800/0284c7/white?text=Kayaking', longDescription: 'Same as first one, just a demo.', about: 'Scenic routes, trained guides, and safety briefing. Minimum age 10.', availability: [/*...*/] },
//   '5': { id: '5', title: 'Nandi Hills Sunrise', price: 899, image: 'https://placehold.co/1200x800/f97316/white?text=Nandi+Hills', longDescription: 'Experience the breathtaking sunrise from Nandi Hills.', about: 'Early morning trek, guide included. Minimum age 12.', availability: [/*...*/] },
//   '6': { id: '6', title: 'Boat Cruise', price: 999, image: 'https://placehold.co/1200x800/3b82f6/white?text=Boat+Cruise', longDescription: 'Cruise the waters of the Sunderbans.', about: 'Guided cruise, wildlife spotting. Minimum age 5.', availability: [/*...*/] },
//   '7': { id: '7', title: 'Bunjee Jumping', price: 999, image: 'https://placehold.co/1200x800/7c3aed/white?text=Bungee', longDescription: 'Experience the thrill of a lifetime in Manali.', about: 'Certified instructors, top-grade safety gear. Minimum age 18.', availability: [/*...*/] },
//   '8': { id: '8', title: 'Coffee Trail', price: 1299, image: 'https://placehold.co/1200x800/16a34a/white?text=Coffee+Trail', longDescription: 'Walk through the aromatic coffee plantations of Coorg.', about: 'Guided walk, coffee tasting. Minimum age 8.', availability: [/*...*/] },
// };

// import type { Experience, ExperienceDetails } from './types';

const API_URL = 'http://localhost:4000';

/**
 * Helper function for API calls
 * Parses JSON and returns data or a structured error
 */
async function fetchApi(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    // If response is not OK, return the error message from the server
    if (!response.ok) {
      return { 
        error: true, 
        message: data.message || `Error ${response.status}`, 
        status: response.status 
      };
    }
    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    // Handle network errors
    return { 
      error: true, 
      message: 'Network error or server is down.' 
    };
  }
}

export const api = {
  getExperiences: async (): Promise<Experience[] | { error: boolean; message: string }> => {
    return fetchApi(`${API_URL}/experiences`);
  },
  
  getExperienceById: async (id: string): Promise<ExperienceDetails | { error: boolean; message: string }> => {
    return fetchApi(`${API_URL}/experiences/${id}`);
  },
  
  validatePromo: async (code: string): Promise<{ valid: boolean; type?: string; value?: number; message?: string }> => {
    return fetchApi(`${API_URL}/promo/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
  },
  
  createBooking: async (bookingDetails: any): Promise<{ success: boolean; referenceId?: string; message?: string }> => {
    return fetchApi(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingDetails)
    });
  }
};