const UserService = require('../models/UserService');
const User = require('../models/User');

// Helper: Calculate Next Due Date
const calculateNextDueDate = (paymentDay) => {
    const today = new Date();
    let nextDate = new Date();
    nextDate.setDate(paymentDay);
    
    // If today is past the payment day, next due is next month
    if (today.getDate() > paymentDay) {
        nextDate.setMonth(nextDate.getMonth() + 1);
    }
    return nextDate;
};

// @desc    Get services (With Auto-Update Logic)
// @route   GET /api/user-services/my
// @access  Private
exports.getMyServices = async (req, res) => {
  try {
    let services = await UserService.find({ user: req.user.id });
    const today = new Date();

    // --- AUTOMATION LOGIC START ---
    const updatedServices = await Promise.all(services.map(async (service) => {
        // Only auto-update if Active
        if (service.status === 'Active') {
            const dueDate = new Date(service.nextDueDate);
            
            // If we have passed the due date
            if (today > dueDate) {
                // 1. Assume payment made (Simulated automation)
                service.amountPaid += service.emiAmount;
                service.installmentsPaid += 1;
                
                // 2. Set next due date to next month
                let nextMonth = new Date(dueDate);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                service.nextDueDate = nextMonth;

                // 3. Close loan if fully paid
                if (service.amountPaid >= service.totalLoanAmount) {
                    service.status = 'Closed';
                    service.amountPaid = service.totalLoanAmount; // Cap it
                }

                await service.save();
            }
        }
        return service;
    }));
    // --- AUTOMATION LOGIC END ---

    res.json(updatedServices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Admin: Create Service
// @route   POST /api/user-services
// @access  Private/Admin
exports.createUserService = async (req, res) => {
  const { email, serviceType, provider, accountNumber, totalLoanAmount, emiAmount, paymentDay } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Initial Due Date Calculation
    let firstDueDate = new Date();
    firstDueDate.setDate(paymentDay);
    if (new Date().getDate() > paymentDay) {
        firstDueDate.setMonth(firstDueDate.getMonth() + 1);
    }

    const service = new UserService({
      user: user._id,
      serviceType,
      provider,
      accountNumber,
      totalLoanAmount,
      emiAmount,
      paymentDay,
      nextDueDate: firstDueDate,
      status: 'Active'
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin: Get ALL Services (Master Record)
// @route   GET /api/user-services/all
// @access  Private/Admin
exports.getAllServices = async (req, res) => {
    try {
        const services = await UserService.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Admin: Toggle Freeze Status
// @route   PUT /api/user-services/status/:id
// @access  Private/Admin
exports.toggleServiceStatus = async (req, res) => {
    try {
        const service = await UserService.findById(req.params.id);
        if(!service) return res.status(404).json({ message: 'Not Found'});

        if (service.status === 'Active') service.status = 'Frozen';
        else if (service.status === 'Frozen') service.status = 'Active';
        
        await service.save();
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Admin: Delete Service
// @route   DELETE /api/user-services/:id
// @access  Private/Admin
exports.deleteUserService = async (req, res) => {
    try {
        const service = await UserService.findById(req.params.id);
        if(service) {
            await service.deleteOne();
            res.json({ message: 'Service removed' });
        } else {
            res.status(404).json({ message: 'Service not found'});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};