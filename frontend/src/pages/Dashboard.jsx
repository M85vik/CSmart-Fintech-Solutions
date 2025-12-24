import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { FaChartLine, FaGift, FaBookReader, FaArrowRight, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

// Placeholder Data for the New Sections
const insightsData = {
  score: 785,
  factors: [
    { name: "Payment History", status: "Excellent", description: "You've paid 100% of your bills on time." },
    { name: "Credit Utilization", status: "Good", description: "You're using a healthy amount of your available credit." },
    { name: "Age of Credit", status: "Good", description: "Your credit accounts have a solid history." },
  ],
  tips: [
    "Continue paying all your bills on time.",
    "Keep your credit card balances low.",
    "Avoid applying for too much new credit at once.",
  ]
};

const offersData = [
  { title: "Home Loan", description: "You're likely eligible for our best rates, starting from 8.4% p.a.", link: "/services/home-loan" },
  { title: "Premium Credit Card", description: "Unlock exclusive rewards and benefits with our premium card selection.", link: "/services/credit-card" },
];

const articlesData = [
  { title: "5 Ways to Maintain an Excellent Credit Score", link: "/blogs/1" },
  { title: "Is a Home Loan Top-Up Right for You?", link: "/blogs/2" },
];

// Sparkle Animation Component
const SparkleInstance = ({ size, x, y, delay }) => (
  <motion.div
    className="absolute bg-yellow-400 rounded-full"
    style={{ width: size, height: size, left: x, top: y }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
    transition={{ duration: 0.8, delay, repeat: Infinity, repeatDelay: 2 }}
  />
);
const Sparkles = () => (
    <>
        <SparkleInstance size={8} x="15%" y="20%" delay={0.1} />
        <SparkleInstance size={6} x="80%" y="10%" delay={0.3} />
        <SparkleInstance size={10} x="95%" y="70%" delay={0.5} />
        <SparkleInstance size={5} x="5%" y="80%" delay={0.7} />
    </>
);

// Credit Score Gauge Component
const CreditScoreGauge = ({ score }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      setTimeout(() => setHasAnimated(true), 300);
    }
  }, [isInView]);

  const rotation = Math.max(0, Math.min(180, ((score - 300) / 600) * 180));
  
  let scoreText = "Good";
  let textColor = "text-yellow-500";
  if (score >= 750) {
    scoreText = "Excellent";
    textColor = "text-green-500";
  } else if (score < 650) {
    scoreText = "Fair";
    textColor = "text-orange-500";
  }

  return (
    <div ref={ref} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center relative overflow-hidden">
      
      {hasAnimated && score >= 750 && <Sparkles />}

      <div className="relative w-48 h-24 mx-auto mb-4">
        <div className="absolute top-0 left-0 w-full h-full border-t-8 border-l-8 border-r-8 border-gray-200 rounded-t-full"></div>
        <div 
          className="absolute top-0 left-0 w-full h-full border-t-8 border-l-8 border-r-8 border-transparent rounded-t-full"
          style={{ 
            background: 'conic-gradient(from 180deg, #ef4444, #f97316, #eab308, #22c55e, #10b981)',
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-t-full transform scale-[0.87]"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full z-10"></div>
        
        <motion.div 
          className="absolute bottom-0 left-1/2 w-1 h-20 bg-gray-800 origin-bottom"
          initial={{ transform: 'translateX(-50%) rotate(-90deg)' }}
          animate={hasAnimated ? { transform: `translateX(-50%) rotate(${rotation - 90}deg)` } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 15, duration: 2 }}
        />
      </div>
      
      <div className="text-5xl font-extrabold text-text-dark">
        {hasAnimated ? (
          <CountUp start={300} end={score} duration={2.5} separator="," />
        ) : (
          300
        )}
      </div>
      
      <motion.p 
        className={`text-xl font-semibold mt-2 ${textColor}`}
        initial={{ opacity: 0 }}
        animate={hasAnimated ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {scoreText}
      </motion.p>
      
      <motion.p 
        className="text-sm text-gray-500 mt-1"
        initial={{ opacity: 0 }}
        animate={hasAnimated ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        {hasAnimated && score >= 750 && "Well done! Explore below what you can do."}
        {hasAnimated && score < 750 && score >= 650 && "Fairly enough, but you can do better. Explore below."}
        {hasAnimated && score < 650 && "Your score is low, but don't worry, you can fix it. Explore below."}
      </motion.p>

    </div>
  );
};

// Insight Item Component
const InsightItem = ({ factor }) => (
  <div className="flex items-center">
    {factor.status === 'Excellent' || factor.status === 'Good' ? 
      <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" /> : 
      <FaExclamationCircle className="text-yellow-500 mr-3 flex-shrink-0" />}
    <div>
      <p className="font-semibold text-text-dark">{factor.name}: {factor.status}</p>
      <p className="text-sm text-text-light">{factor.description}</p>
    </div>
  </div>
);

// Main Dashboard Component
export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const placeholderCreditScore = 785;
  const userHasData = true; // Flag to show populated state

  return (
    <>
      <Helmet>
        <title>Your Dashboard | Verity Finance</title>
        <meta name="description" content="Welcome to your Verity Finance dashboard. View your credit score, personalized offers, and helpful insights." />
      </Helmet>

      <div className="bg-brand-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-text-dark">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-lg text-text-light mt-1">Here's your financial snapshot.</p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold text-text-dark mb-4 flex items-center"><FaChartLine className="mr-3 text-brand-primary" /> Your Credit Score</h2>
                <CreditScoreGauge score={placeholderCreditScore} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-text-dark mb-4">What Your Score Means</h2>
                <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
                  {insightsData.factors.map(factor => <InsightItem key={factor.name} factor={factor} />)}
                  <div className="border-t border-gray-200 pt-4">
                      <p className="font-semibold text-text-dark mb-2">💡 Quick Tips:</p>
                      <ul className="list-disc list-inside text-sm text-text-light space-y-1">
                          {insightsData.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                      </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-xl font-semibold text-text-dark mb-4 flex items-center"><FaGift className="mr-3 text-brand-primary" /> Offers Unlocked For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {offersData.map(offer => (
                    <Link to={offer.link} key={offer.title} className="block bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 group">
                      <h3 className="font-bold text-lg text-text-dark">{offer.title}</h3>
                      <p className="text-text-light text-sm mt-2 mb-4">{offer.description}</p>
                      <span className="font-bold text-brand-primary group-hover:underline">View Details <FaArrowRight className="inline-block" /></span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h2 className="text-xl font-semibold text-text-dark mb-4 flex items-center"><FaBookReader className="mr-3 text-brand-primary" /> Recommended Reading</h2>
                <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
                  {articlesData.map(article => (
                     <Link to={article.link} key={article.title} className="block group p-3 -m-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <p className="font-semibold text-text-dark group-hover:text-brand-primary">{article.title}</p>
                        <p className="text-sm text-text-light">From the Verity Finance Blog</p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}