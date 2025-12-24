// File: src/components/home/ProductHighlights.jsx
import AlternatingFeature from './AlternatingFeature';

const products = [
  {
    title: 'Home Loan',
    subtitle: 'Turn your dream of owning a home into reality with our flexible and affordable home loans.',
    features: [
      'Competitive interest rates',
      'Quick and easy online application',
      'Flexible repayment options',
      'Expert guidance at every step'
    ],
    // Replace with your illustration URL
    imageUrl: '/hloan.jpg',
    link: '/services/home-loan',
    imageSide: 'left',
    bgColor:"bg-brandPinkish"
  },
  {
    title: 'Car Loan',
    subtitle: 'Get behind the wheel of your new car faster than you think with our seamless financing.',
    features: [
      'Up to 100% financing on select vehicles',
      'Minimal documentation required',
      'Fast approval and disbursal',
      'Attractive interest rates'
    ],
    // Replace with your illustration URL
    imageUrl: '/cl.png',
    link: '/services/car-loan',
    imageSide: 'right',
     bgColor:"bg-brandBeige"
  },
  {
    title: 'Insurance',
    subtitle: 'Protect what matters most with our comprehensive and reliable insurance plans.',
    features: [
      'Health, Life, and Vehicle insurance',
      'Customizable plans to fit your needs',
      'Easy claims process',
      '24/7 customer support'
    ],
    // Replace with your illustration URL
    imageUrl: '/ins.png',
    link: '/services/insurance',
    imageSide: 'left',
     bgColor:"bg-brandBluish"
  },
];

export default function ProductHighlights() {
  return (
    <div className="bg-gray-50 divide-y divide-gray-200">
        {products.map((product, index) => (
            <AlternatingFeature
                key={index}
                title={product.title}
                subtitle={product.subtitle}
                features={product.features}
                imageUrl={product.imageUrl}
                link={product.link}
                imageSide={product.imageSide}
                bgColor={product.bgColor}
            />
        ))}
    </div>
  );
}