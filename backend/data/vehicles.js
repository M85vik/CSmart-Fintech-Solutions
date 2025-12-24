// File: backend8/data/vehicles.js
const vehicles = [
  // --- SUVs ---
  {
    make: 'Tata',
    model: 'Nexon',
    category: 'SUV',
    price: 815000,
    imageUrl: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '17.4 kmpl',
    engine: '1199 cc',
    safetyRating: 5,
    isFeatured: true
  },
  {
    make: 'Hyundai',
    model: 'Creta',
    category: 'SUV',
    price: 1099000,
    imageUrl: 'https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/107917/creta-right-front-three-quarter.jpeg?isig=0&q=80',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '17 kmpl',
    engine: '1497 cc',
    safetyRating: 3,
    isFeatured: true
  },
  {
    make: 'Mahindra',
    model: 'Thar',
    category: 'SUV',
    price: 1135000,
    imageUrl: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg?q=80',
    fuelType: 'Diesel',
    transmission: 'Manual',
    mileage: '15.2 kmpl',
    engine: '2184 cc',
    safetyRating: 4,
    isFeatured: true
  },
  
  // --- Hatchbacks ---
  {
    make: 'Maruti Suzuki',
    model: 'Swift',
    category: 'Hatchback',
    price: 649000,
    imageUrl: 'https://img.autocarindia.com/mmv_images/colors/20250704042224_Maruti_Suzuki_Swift_Pearl_Arctic_White_with_Bluish_Black_Roof%5B1%5D.jpg?w=640&q=75',
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '22.38 kmpl',
    engine: '1197 cc',
    safetyRating: 2,
    isFeatured: false
  },
  
  // --- Sedans ---
  {
    make: 'Honda',
    model: 'City',
    category: 'Sedan',
    price: 1180000,
    imageUrl: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/134287/city-exterior-right-front-three-quarter-77.jpeg?isig=0&q=80',
    fuelType: 'Petrol',
    transmission: 'CVT',
    mileage: '18.4 kmpl',
    engine: '1498 cc',
    safetyRating: 5,
    isFeatured: true
  },

  // --- EVs ---
  {
    make: 'Tata',
    model: 'Nexon EV',
    category: 'EV',
    price: 1449000,
    imageUrl: 'https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/149311/nexon-ev-right-front-three-quarter-5.jpeg?isig=0&q=80',
    fuelType: 'Electric',
    transmission: 'Automatic',
    mileage: '465 km range',
    engine: 'N/A',
    safetyRating: 5,
    isFeatured: true
  }
];

module.exports = vehicles;