import mongoose from 'mongoose';

// Debt Schema
const debtSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: false,
  },
  bank: {
    type: String,
    required: false,
  },
});

// Income Schema
const incomeSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: false,
  },
});

// General Information Schema
const generalInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  countrycode: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
  },
  walletId: {
    type: String,
    required: false,
  },
  creditScore: {
    type: Number,
    required: false,
  },
  landSize: {
    type: Number,
    required: false,
  },
  kycLevel: { // default value
    type: String,
    required: false,
    default: "UNVERIFIED"
  },
});

// User Schema
const UserFormSchema = new mongoose.Schema({
  generalInfo: {
    type: generalInfoSchema,
    required: true,
  },
  debts: {
    type: [debtSchema],
    default: [],
  },
  incomes: {
    type: [incomeSchema],
    default: [],
  },
});
  
// Middleware to calculate credit score before saving/updating
UserFormSchema.pre('save', async function (next) {
    // Pass relevant information to the credit score calculation function
    const calculatedCreditScore = calculateCreditScore(this.generalInfo, this.debts, this.incomes);
    console.log("calculatedCreditScore " , calculatedCreditScore)
    // Set the credit score in the generalInfo field
    this.generalInfo.creditScore = calculatedCreditScore;
  
    next();
  });

// Helper function to calculate credit score with landSize range
function calculateCreditScore(generalInfo, debts, incomes) {
    // Replace this logic with your actual credit score calculation
    // For example, a simple calculation based on the user's name length, latitude, and total debt amount

    console.log("landsize " + generalInfo.landSize)
  
    // Define key-value pairs or ranges for landSize and corresponding credit scores
    const landSizeRanges = {
      small: { min: 0, max: 100 },
      medium: { min: 101, max: 500 },
      large: { min: 501, max: 1000 },
    };
  
    // Determine the landSize category
    let landSizeCategory;
    for (const [category, range] of Object.entries(landSizeRanges)) {
      if (generalInfo.landSize >= range.min && generalInfo.landSize <= range.max) {
        landSizeCategory = category;
        break;
      }
    }

    console.log("landsize landSizeCategory " + landSizeCategory)
  
    // Use the landSize category and total debt amount as factors in credit score calculation
    let landScore;
    switch (landSizeCategory) {
      case 'small':
        landScore = 50;
        break;
      case 'medium':
        landScore = 100;
        break;
      case 'large':
        landScore = 150;
        break;
      default:
        landScore = 0;
        break;
    }

    console.log("landsize landScore " + landScore)


    // Calculate the total debt amount
    const totalDebtAmount = debts.reduce((total, debt) => total + (debt.amount || 0), 0);
    console.log("totalDebtAmount " + totalDebtAmount)

    // Define key-value pairs or ranges for debt and corresponding credit scores
  const debtRanges = {
    minimal: { min: 0, max: 1000 },
    low: { min: 1001, max: 5000 },
    moderate: { min: 5001, max: 10000 },
    high: { min: 10001, max: 20000 },
    veryHigh: { min: 20001, max: Infinity },
  };

  // Determine the debt category
  let debtCategory;
  for (const [category, range] of Object.entries(debtRanges)) {
    if (totalDebtAmount >= range.min && totalDebtAmount <= range.max) {
      debtCategory = category;
      break;
    }
  }
  console.log("totalDebtAmount debtCategory " + debtCategory)

  // Use the debt category as a factor in credit score calculation
  let debtPoints;
  switch (debtCategory) {
    case 'minimal':
      debtPoints = 15;
      break;
    case 'low':
      debtPoints = 10;
      break;
    case 'moderate':
      debtPoints = 5;
      break;
    case 'high':
      debtPoints = 0;
      break;
    case 'veryHigh':
      debtPoints = -5;
      break;
    default:
      debtPoints = 0;
      break;
  }

  console.log("totalDebtAmount debtCategory " + debtPoints)

  console.log("generalInfo.kycLevel " + generalInfo.kycLevel)

  // Define key-value pairs or ranges for KYC level and corresponding credit scores
  const kycLevelRanges = {
    UNVERIFIED: { min: 0, max: 1 },
    MINIMUM: { min: 2, max: 2 },
    MEDIUM: { min: 3, max: 3 },
    ENHANCED: { min: 4, max: 4 },
    OTHER: { min: 5, max: 5 },
  };

  // Determine the KYC level category
  let kycLevelCategory;
  for (const [category, range] of Object.entries(kycLevelRanges)) {
    if (generalInfo.kycLevel === category) {
      kycLevelCategory = category;
      break;
    }
  }

  console.log("kycLevelCategory " + kycLevelCategory)

  // Use the KYC level category as a factor in credit score calculation
  let kycLevelPoints;
  switch (kycLevelCategory) {
    case 'UNVERIFIED':
      kycLevelPoints = 0;
      break;
    case 'MINIMUM':
      kycLevelPoints = 5;
      break;
    case 'MEDIUM':
      kycLevelPoints = 10;
      break;
    case 'ENHANCED':
      kycLevelPoints = 15;
      break;
    case 'OTHER':
      kycLevelPoints = 20;
      break;
    default:
      kycLevelPoints = 0;
      break;
  }

  console.log("kycLevelCategory kycLevelPoints " + kycLevelPoints)

  // Calculate the total income amount
  const totalIncomeAmount = incomes.reduce((total, income) => total + (income.amount || 0), 0);
  console.log("totalIncomeAmount " + totalIncomeAmount)

   // Define key-value pairs or ranges for income and corresponding credit scores
   const incomeRanges = {
    none: { min: 0, max: 0 },
    low: { min: 1, max: 5000 },
    moderate: { min: 5001, max: 10000 },
    aboveAverage: { min: 10001, max: 20000 },
    high: { min: 20001, max: 50000 },
    veryHigh: { min: 50001, max: Infinity },
  };


  // Determine the income category
  let incomeCategory;
  for (const [category, range] of Object.entries(incomeRanges)) {
    if (totalIncomeAmount >= range.min && totalIncomeAmount <= range.max) {
      incomeCategory = category;
      break;
    }
  }
  console.log("totalIncomeAmount incomeCategory " + incomeCategory)

  // Use the income category as a factor in credit score calculation
  let incomePoints;
  switch (incomeCategory) {
    case 'none':
      incomePoints = 0;
      break;
    case 'low':
      incomePoints = 5;
      break;
    case 'moderate':
      incomePoints = 10;
      break;
    case 'aboveAverage':
      incomePoints = 15;
      break;
    case 'high':
      incomePoints = 20;
      break;
    case 'veryHigh':
      incomePoints = 25;
      break;
    default:
      incomePoints = 0;
      break;
  }
  console.log("totalIncomeAmount incomePoints " + incomePoints)

    // Sum up the points from different data points
    const totalPoints = incomePoints + debtPoints + landScore + kycLevelPoints;
  
    return totalPoints;
  }
  
// User Model
const User = mongoose.model('UserFormSchema', UserFormSchema);

export default User;

