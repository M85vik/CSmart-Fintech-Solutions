// File: src/pages/services/CarDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Dialog, DialogTitle, DialogContent, Box, Typography, 
  TextField, Button, Radio, RadioGroup, Stack, 
  FormControl, MenuItem, Select, InputLabel, 
  IconButton, Grid, Fab
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { motion } from 'framer-motion';
// Added FaFileAlt to imports
import { FaArrowLeft, FaCheckCircle, FaShieldAlt, FaRoad, FaCogs, FaFileAlt } from 'react-icons/fa';
import EmiCalculator from '../../components/services/EmiCalculator';
import Spinner from '../../components/shared/Spinner';

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- STATES FOR MODALS ---
  const [openTestDrive, setOpenTestDrive] = useState(false);
  const [openCallback, setOpenCallback] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/vehicles/${id}`);
        setCar(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading car:", error);
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (!car) return <div className="text-center py-20">Car not found.</div>;

  return (
    <>
      <Helmet>
        <title>{`${car.make} ${car.model} Loan Offers | Verity Finance`}</title>
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/services/auto-loan/catalogue" className="inline-flex items-center text-gray-600 hover:text-brand-primary mb-8">
            <FaArrowLeft className="mr-2" /> Back to Catalogue
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT COL: Image & Specs & NEW DOCUMENTS SECTION */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-white p-2 rounded-2xl shadow-lg mb-8">
                <img src={car.imageUrl} alt={car.model} className="w-full rounded-xl object-cover" />
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Vehicle Specifications</h2>
                <div className="grid grid-cols-2 gap-6">
                  <SpecItem icon={FaCogs} label="Engine" value={car.engine || 'N/A'} />
                  <SpecItem icon={FaRoad} label="Mileage" value={car.mileage} />
                  <SpecItem icon={FaShieldAlt} label="Safety Rating" value={`${car.safetyRating || 'N/A'} / 5 Stars`} />
                  <SpecItem icon={FaCheckCircle} label="Transmission" value={car.transmission} />
                </div>
              </div>

              {/* --- NEW ADDITION: DOCUMENTS CHECKLIST (Fills the blank space) --- */}
              <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-brand-primary">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaFileAlt className="text-brand-primary mr-2" /> Documents for Instant Loan
                </h3>
                <ul className="space-y-3">
                  {[
                    "Aadhaar Card & PAN Card",
                    "Latest 3 Months Salary Slips (for Salaried)",
                    "Last 2 Years ITR (for Self-Employed)",
                    "6 Months Bank Statement",
                    "Current Address Proof"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                       <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                       {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 bg-orange-50 p-3 rounded-lg text-xs text-orange-800 border border-orange-100 font-semibold">
                  * Keep these handy for our 30-minute express approval.
                </div>
              </div>

            </motion.div>

            {/* RIGHT COL: Finance & EMI */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-brand-primary">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{car.make} {car.model}</h1>
                <p className="text-gray-500 mb-6">Ex-showroom Price</p>
                <div className="text-4xl font-bold text-brand-primary mb-8">
                  ₹{car.price.toLocaleString('en-IN')}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-8 border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-2">Verity Finance Offer</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Interest rates starting at 8.75%</li>
                    <li>• Up to 100% On-Road Funding</li>
                    <li>• Zero Foreclosure charges after 24 months</li>
                  </ul>
                </div>

                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button 
                      variant="outlined" 
                      size="large"
                      startIcon={<DirectionsCarIcon />}
                      onClick={() => setOpenTestDrive(true)}
                      sx={{ 
                          borderColor: '#ff6d00', color: '#ff6d00', fontWeight: 'bold', flex: 1,
                          '&:hover': { bgcolor: '#fff3e0', borderColor: '#ff6d00' }
                      }}
                  >
                      Book Test Drive
                  </Button>
                </Stack>
                <br />
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">Calculate Your EMI</h3>
                
                <EmiCalculator 
                    initialAmount={car.price} 
                    initialInterest={8.75} 
                    onApply={() => setOpenCallback(true)} 
                />
                
                <button 
                    onClick={() => setOpenCallback(true)}
                    className="w-full mt-8 bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-brand-secondary transition-colors shadow-lg"
                >
                  Apply for This Car Loan
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* --- FLOATING BUTTON --- */}
        <Fab 
          variant="extended" 
          color="primary" 
          aria-label="test-drive"
          onClick={() => setOpenTestDrive(true)}
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            bgcolor: '#ff6d00',
            fontWeight: 'bold',
            zIndex: 1000,
            '&:hover': { bgcolor: '#e65100' }
          }}
        >
          <DirectionsCarIcon sx={{ mr: 1 }} />
          Test Drive
        </Fab>

        {/* --- MODALS --- */}
        <TestDriveScheduler 
            open={openTestDrive} 
            onClose={() => setOpenTestDrive(false)} 
            carName={`${car.make} ${car.model}`}
        />
        
        <CallbackModal 
            open={openCallback} 
            onClose={() => setOpenCallback(false)} 
        />

      </div>
    </>
  );
}

// --- HELPER COMPONENTS ---

const SpecItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-gray-100 p-3 rounded-full text-brand-primary">
      <Icon />
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const CallbackModal = ({ open, onClose }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ bgcolor: '#ff6d00', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Start Application
        <IconButton onClick={onClose} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Leave your details to get instant approval.
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField fullWidth label="Name" margin="normal" size="small" />
          <TextField fullWidth label="Phone Number" margin="normal" size="small" />
          <Button 
            fullWidth 
            variant="contained" 
            size="large" 
            sx={{ mt: 2, bgcolor: '#ff6d00', '&:hover': { bgcolor: '#e65100' } }}
          >
            Submit Request
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
);

const TestDriveScheduler = ({ open, onClose, carName }) => {
  const [preference, setPreference] = useState('doorstep');
  const [city, setCity] = useState('');
  const ncrCities = ['New Delhi', 'Gurgaon', 'Noida', 'Ghaziabad', 'Faridabad', 'Greater Noida'];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogTitle sx={{ bgcolor: '#ff6d00', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
            <Typography variant="h6" fontWeight="bold">Schedule Your Test Drive</Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Experience the {carName || 'car'} on your own terms.
            </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ mb: 4, mt: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ color: '#ff6d00', mr: 1 }} />
                Where are you comfortable taking the test drive?
            </Typography>
            <RadioGroup row value={preference} onChange={(e) => setPreference(e.target.value)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ 
                            border: preference === 'doorstep' ? '2px solid #ff6d00' : '1px solid #ddd',
                            borderRadius: 3, p: 2, cursor: 'pointer',
                            bgcolor: preference === 'doorstep' ? '#fff3e0' : 'transparent',
                            transition: '0.3s'
                        }} onClick={() => setPreference('doorstep')}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <HomeIcon color={preference === 'doorstep' ? 'primary' : 'disabled'} sx={{ color: preference === 'doorstep' ? '#ff6d00' : 'grey' }} />
                                <Box>
                                    <Typography fontWeight="bold" variant="body2">Doorstep Service</Typography>
                                    <Typography variant="caption" color="text.secondary">We bring the car to you (NCR Only)</Typography>
                                </Box>
                                <Radio value="doorstep" size="small" sx={{ color: '#ff6d00', '&.Mui-checked': { color: '#ff6d00' }, ml: 'auto' }} />
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                         <Box sx={{ 
                            border: preference === 'showroom' ? '2px solid #ff6d00' : '1px solid #ddd',
                            borderRadius: 3, p: 2, cursor: 'pointer',
                            bgcolor: preference === 'showroom' ? '#fff3e0' : 'transparent',
                            transition: '0.3s'
                        }} onClick={() => setPreference('showroom')}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <StoreIcon color={preference === 'showroom' ? 'primary' : 'disabled'} sx={{ color: preference === 'showroom' ? '#ff6d00' : 'grey' }} />
                                <Box>
                                    <Typography fontWeight="bold" variant="body2">Visit Showroom</Typography>
                                    <Typography variant="caption" color="text.secondary">Come to our nearest hub</Typography>
                                </Box>
                                <Radio value="showroom" size="small" sx={{ color: '#ff6d00', '&.Mui-checked': { color: '#ff6d00' }, ml: 'auto' }} />
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </RadioGroup>
        </Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ color: '#ff6d00', mr: 1 }} />
            When works best for you?
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={6}>
                <TextField type="date" fullWidth size="small" InputLabelProps={{ shrink: true }} label="Preferred Date" />
            </Grid>
            <Grid item xs={6}>
                <TextField type="time" fullWidth size="small" InputLabelProps={{ shrink: true }} label="Preferred Time" />
            </Grid>
        </Grid>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Confirm your details
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Your Name" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone Number" variant="outlined" size="small" />
            </Grid>
            {preference === 'doorstep' && (
                <>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Select City (NCR Only)</InputLabel>
                            <Select 
                                value={city} 
                                label="Select City (NCR Only)"
                                onChange={(e) => setCity(e.target.value)}
                            >
                                {ncrCities.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Locality / Sector" variant="outlined" size="small" />
                    </Grid>
                </>
            )}
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
             <Button 
                variant="contained" 
                fullWidth 
                size="large"
                sx={{ bgcolor: '#ff6d00', fontWeight: 'bold', py: 1.5, '&:hover': { bgcolor: '#e65100' } }}
            >
                Confirm Test Drive
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Our team will call you within 30 minutes to confirm the slot.
            </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};