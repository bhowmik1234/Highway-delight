const Experience = require('../models/Experience');
const Slot = require('../models/Slot');
const PromoCode = require('../models/PromoCode');

const seedDatabase = async () => {
  await Experience.deleteMany({});
  await Slot.deleteMany({});
  await PromoCode.deleteMany({});

const experiences = [
  {
    title: 'Backwater Kayaking',
    location: 'Alleppey, Kerala',
    price: 999,
    image: 'https://images.unsplash.com/photo-1669659738635-7af645bb8a5b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
    description: 'Paddle through serene Kerala backwaters.',
    longDescription: 'Helmet and life jackets included. Suitable for beginners and pros alike.',
    about: 'Enjoy lush green canals and peaceful lagoons.'
  },
  {
    title: 'Coffee Plantation Walk',
    location: 'Chikmagalur, Karnataka',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1544015759-237f87d55ef3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1548',
    description: 'Explore lush estates and taste freshly brewed coffee.',
    longDescription: 'Guided tour through coffee farms with tastings and local insights.',
    about: 'Learn about India’s finest Arabica and Robusta beans.'
  },
  {
    title: 'Scuba Diving Adventure',
    location: 'Havelock Island, Andaman',
    price: 2599,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
    description: 'PADI-certified instructors and crystal-clear waters.',
    longDescription: 'Includes safety briefing, underwater photos, and equipment.',
    about: 'Ideal for beginners and adventure seekers.'
  },
  {
    title: 'Paragliding at Kamshet',
    location: 'Kamshet, Maharashtra',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1471247511763-88a722fc9919?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1932',
    description: 'Fly over the Western Ghats with licensed pilots.',
    longDescription: 'Includes helmet, GoPro recording, and safety training.',
    about: 'Perfect wind conditions for smooth flights.'
  },
  {
    title: 'Lakeside Camping Escape',
    location: 'Bhandardara, Maharashtra',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1598507776352-1cb620d8aa92?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1548',
    description: 'Starry night by the lake with BBQ and music.',
    longDescription: 'Includes tents, bonfire, breakfast, and kayaking options.',
    about: 'Perfect weekend getaway from Mumbai.'
  },
  {
    title: 'Cave Exploration',
    location: 'Meghalaya',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1528214096798-37891d32174c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670',
    description: 'Venture deep into natural limestone caves.',
    longDescription: 'Guided exploration through ancient rock formations.',
    about: 'Experience one of India’s most mysterious cave systems.'
  },
  {
    title: 'Desert Safari',
    location: 'Jaisalmer, Rajasthan',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
    description: 'Ride across golden dunes in a jeep or on a camel.',
    longDescription: 'Includes sunset view, folk music, and Rajasthani dinner.',
    about: 'Experience the magic of the Thar Desert.'
  },
  {
    title: 'Trekking to Triund',
    location: 'Dharamshala, Himachal Pradesh',
    price: 999,
    image: 'https://images.unsplash.com/photo-1626621338418-713655538d99?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1932',
    description: 'Moderate trek with mesmerizing Himalayan views.',
    longDescription: 'Includes guide, camping, and meals at the top.',
    about: 'Best for first-time mountain trekkers.'
  },
  {
    title: 'River Rafting Thrill',
    location: 'Rishikesh, Uttarakhand',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1627241129356-137242cf14f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1834',
    description: 'Adrenaline-pumping white-water rafting.',
    longDescription: 'Includes life jackets, instructor, and transport to base.',
    about: 'Feel the rush of the mighty Ganges.'
  },
  {
    title: 'Snow Skiing Adventure',
    location: 'Gulmarg, Jammu & Kashmir',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1560567322-27b76c1910c2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
    description: 'Glide through snow-covered slopes.',
    longDescription: 'Includes equipment, lift pass, and instructor session.',
    about: 'A winter wonderland for snow lovers.'
  },
  {
    title: 'Hot Air Balloon Ride',
    location: 'Pushkar, Rajasthan',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
    description: 'Soar above temples and dunes at sunrise.',
    longDescription: 'Includes breakfast and panoramic photo stops.',
    about: 'A magical way to see the desert landscape.'
  },
  {
    title: 'Houseboat Stay',
    location: 'Kumarakom, Kerala',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
    description: 'Stay overnight on a floating houseboat.',
    longDescription: 'Includes meals, sunset cruise, and cultural performances.',
    about: 'Relax in the calm backwaters of God’s Own Country.'
  }
];




  const createdExperiences = await Experience.insertMany(experiences);

  const slots = [
    // Kayaking
    { experienceId: createdExperiences[0]._id, date: 'Nov 1', time: '07:00 am', left: 6 },
    { experienceId: createdExperiences[0]._id, date: 'Nov 1', time: '09:00 am', left: 4 },
    { experienceId: createdExperiences[0]._id, date: 'Nov 2', time: '04:00 pm', left: 2 },

    // Nandi Hills
    { experienceId: createdExperiences[1]._id, date: 'Nov 3', time: '05:00 am', left: 10 },
    { experienceId: createdExperiences[1]._id, date: 'Nov 4', time: '05:00 am', left: 8 },

    // Coffee Trail
    { experienceId: createdExperiences[2]._id, date: 'Nov 5', time: '10:00 am', left: 5 },
    { experienceId: createdExperiences[2]._id, date: 'Nov 6', time: '02:00 pm', left: 3 },

    // Scuba Diving
    { experienceId: createdExperiences[3]._id, date: 'Nov 7', time: '09:00 am', left: 7 },
    { experienceId: createdExperiences[3]._id, date: 'Nov 8', time: '11:00 am', left: 4 },

    // Paragliding
    { experienceId: createdExperiences[4]._id, date: 'Nov 9', time: '08:00 am', left: 6 },
    { experienceId: createdExperiences[4]._id, date: 'Nov 10', time: '04:00 pm', left: 2 },

    // Desert Safari
    { experienceId: createdExperiences[5]._id, date: 'Nov 11', time: '05:00 pm', left: 12 },
    { experienceId: createdExperiences[5]._id, date: 'Nov 12', time: '06:00 pm', left: 8 },

    // River Rafting
    { experienceId: createdExperiences[6]._id, date: 'Nov 13', time: '07:00 am', left: 5 },
    { experienceId: createdExperiences[6]._id, date: 'Nov 14', time: '09:00 am', left: 3 },

    // Balloon Ride
    { experienceId: createdExperiences[7]._id, date: 'Nov 15', time: '06:00 am', left: 6 },
    { experienceId: createdExperiences[7]._id, date: 'Nov 16', time: '06:30 am', left: 5 },

    // Camping
    { experienceId: createdExperiences[8]._id, date: 'Nov 17', time: '05:00 pm', left: 10 },
    { experienceId: createdExperiences[8]._id, date: 'Nov 18', time: '06:00 pm', left: 7 },

    // Mountain Biking
    { experienceId: createdExperiences[9]._id, date: 'Nov 19', time: '07:30 am', left: 8 },
    { experienceId: createdExperiences[9]._id, date: 'Nov 20', time: '09:00 am', left: 6 },
  ];

  await Slot.insertMany(slots);

  await PromoCode.insertMany([
    { code: 'SAVE10', type: 'percent', value: 10 },
    { code: 'FLAT100', type: 'fixed', value: 100 },
    { code: 'WELCOME50', type: 'fixed', value: 50 },
    { code: 'ADVENTURE15', type: 'percent', value: 15 },
  ]);

  console.log('✅ Database seeded successfully with 10 experiences!');
};

module.exports = seedDatabase;
