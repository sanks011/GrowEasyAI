import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, limit, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { getDatabase, ref, push, onValue, off, set } from "firebase/database"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAksqzevldMGuW9rvPNG3zuMSVoi0xbtj8",
  authDomain: "gitkitpro.firebaseapp.com",
  databaseURL: "https://gitkitpro-default-rtdb.firebaseio.com",
  projectId: "gitkitpro",
  storageBucket: "gitkitpro.firebasestorage.app",
  messagingSenderId: "120670812787",
  appId: "1:120670812787:web:d75b04cb9c6b22a0f34806",
  measurementId: "G-L1C4H38WN5",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const realtimeDb = getDatabase(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()

// Firebase helper functions
export const saveUserProfile = async (userId: string, profileData: any) => {
  try {
    await addDoc(collection(db, "users"), {
      userId,
      ...profileData,
      createdAt: new Date(),
    })
  } catch (error) {
    console.error("Error saving user profile:", error)
  }
}

export const getLeads = async (userId: string) => {
  try {
    const q = query(collection(db, "leads"), where("assignedTo", "==", userId), orderBy("score", "desc"), limit(10))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching leads:", error)
    return []
  }
}

export const saveChatMessage = (chatId: string, message: any) => {
  const chatRef = ref(realtimeDb, `chats/${chatId}`)
  return push(chatRef, {
    ...message,
    timestamp: Date.now(),
  })
}

export const listenToChat = (chatId: string, callback: (messages: any[]) => void) => {
  const chatRef = ref(realtimeDb, `chats/${chatId}`)
  onValue(chatRef, (snapshot) => {
    const data = snapshot.val()
    const messages = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : []
    callback(messages.sort((a, b) => a.timestamp - b.timestamp))
  })
  return () => off(chatRef)
}

// Mock Data for Development (fallback when Firebase is not configured)
const mockGPProfiles = [
  {
    id: "gp_001",
    name: "Rajesh Kumar",
    phone: "+91-9876543210",
    location: "Mumbai",
    experience: "2 years",
    totalSales: 145,
    conversionRate: 0.32,
    monthlyEarnings: 18750,
    specialization: ["Health Insurance", "Life Insurance"],
    performanceScore: 85,
    joinedAt: new Date("2023-01-15"),
    avatar: "👨‍💼",
    weeklyEarnings: 4500,
    dailyAverage: 750,
    bestDay: 2100,
    targetProgress: 0.93,
    skillScores: {
      communication: 88,
      product_knowledge: 92,
      objection_handling: 78,
      closing: 85
    }
  },
  {
    id: "gp_002", 
    name: "Priya Sharma",
    phone: "+91-9876543211",
    location: "Delhi",
    experience: "3 years",
    totalSales: 167,
    conversionRate: 0.38,
    monthlyEarnings: 22000,
    specialization: ["Mutual Funds", "Credit Cards"],
    performanceScore: 92,
    joinedAt: new Date("2022-08-10"),
    avatar: "👩‍💼",
    weeklyEarnings: 5250,
    dailyAverage: 880,
    bestDay: 2400,
    targetProgress: 0.87,
    skillScores: {
      communication: 95,
      product_knowledge: 89,
      objection_handling: 92,
      closing: 88
    }
  }
];

const mockCustomers = [
  {
    id: "cust_001",
    name: "Ravi Agarwal",
    age: 35,
    income: 75000,
    location: "Mumbai",
    occupation: "Software Engineer",
    familySize: 4,
    interests: ["Health Insurance", "Life Insurance"],
    score: 85,
    status: "hot",
    phone: "+91-9123456789",
    lastContact: new Date(),
    assignedTo: "gp_001",
    email: "ravi.agarwal@email.com",
    address: "Andheri West, Mumbai, Maharashtra"
  },
  {
    id: "cust_002",
    name: "Sneha Patel", 
    age: 28,
    income: 45000,
    location: "Ahmedabad",
    occupation: "Teacher",
    familySize: 2,
    interests: ["Mutual Funds", "Fixed Deposits"],
    score: 72,
    status: "warm",
    phone: "+91-9123456790",
    lastContact: new Date(Date.now() - 86400000),
    assignedTo: "gp_001",
    email: "sneha.patel@email.com",
    address: "Vastrapur, Ahmedabad, Gujarat"
  },
  {
    id: "cust_003",
    name: "Amit Singh",
    age: 42,
    income: 120000,
    location: "Delhi",
    occupation: "Business Owner",
    familySize: 5,
    interests: ["Credit Cards", "Business Loans"],
    score: 91,
    status: "hot",
    phone: "+91-9123456791", 
    lastContact: new Date(),
    assignedTo: "gp_002",
    email: "amit.singh@email.com",
    address: "Lajpat Nagar, New Delhi"
  },
  {
    id: "cust_004",
    name: "Pooja Sharma",
    age: 31,
    income: 65000,
    location: "Pune",
    occupation: "Marketing Manager",
    familySize: 3,
    interests: ["Health Insurance", "Mutual Funds"],
    score: 78,
    status: "warm",
    phone: "+91-9123456792",
    lastContact: new Date(Date.now() - 172800000),
    assignedTo: "gp_001",
    email: "pooja.sharma@email.com",
    address: "Kothrud, Pune, Maharashtra"
  },
  {
    id: "cust_005",
    name: "Rohit Gupta",
    age: 29,
    income: 55000,
    location: "Bangalore",
    occupation: "Software Developer",
    familySize: 2,
    interests: ["Life Insurance", "Personal Loans"],
    score: 83,
    status: "hot",
    phone: "+91-9123456793",
    lastContact: new Date(Date.now() - 3600000),
    assignedTo: "gp_003",
    email: "rohit.gupta@email.com",
    address: "Koramangala, Bangalore, Karnataka"
  }
];

const mockTrainingModules = [
  {
    id: "module_001",
    title: "Credit Card Sales Mastery",
    description: "Learn to pitch credit cards effectively and handle objections",
    duration: 2,
    difficulty: "beginner",
    type: "quiz",
    completionRate: 0.78,
    averageScore: 82,
    category: "sales"
  },
  {
    id: "module_002",
    title: "Health Insurance Fundamentals",
    description: "Master the basics of health insurance products",
    duration: 3,
    difficulty: "intermediate",
    type: "interactive",
    completionRate: 0.65,
    averageScore: 75,
    category: "product-knowledge"
  }
];

// Enhanced fallback data storage
let fallbackData = {
  gpProfiles: mockGPProfiles,
  customers: mockCustomers,
  trainingModules: mockTrainingModules,
  isFirebaseAvailable: false
};

// Dummy Data Functions
export const initializeDummyData = async () => {
  try {
    console.log("Initializing dummy data...")
    
    // Try to initialize Firebase first
    const gpProfiles = [
      {
        id: "gp_001",
        name: "Rajesh Kumar",
        phone: "+91-9876543210",
        location: "Mumbai",
        experience: "2 years",
        totalSales: 145,
        conversionRate: 0.32,
        monthlyEarnings: 18750,
        specialization: ["Health Insurance", "Life Insurance"],
        performanceScore: 85,
        joinedAt: new Date("2023-01-15"),
        avatar: "👨‍💼",
        weeklyEarnings: 4500,
        dailyAverage: 750,
        bestDay: 2100,
        targetProgress: 0.93,
        skillScores: {
          communication: 88,
          product_knowledge: 92,
          objection_handling: 78,
          closing: 85
        }
      },
      {
        id: "gp_002", 
        name: "Priya Sharma",
        phone: "+91-9876543211",
        location: "Delhi",
        experience: "3 years",
        totalSales: 167,
        conversionRate: 0.38,
        monthlyEarnings: 22000,
        specialization: ["Mutual Funds", "Credit Cards"],
        performanceScore: 92,
        joinedAt: new Date("2022-08-10"),
        avatar: "👩‍💼",
        weeklyEarnings: 5250,
        dailyAverage: 880,
        bestDay: 2400,
        targetProgress: 0.87,
        skillScores: {
          communication: 95,
          product_knowledge: 89,
          objection_handling: 92,
          closing: 88
        }
      },
      {
        id: "gp_003",
        name: "Amit Singh",
        phone: "+91-9876543212",
        location: "Bangalore",
        experience: "1.5 years",
        totalSales: 89,
        conversionRate: 0.25,
        monthlyEarnings: 14500,
        specialization: ["Personal Loans", "Business Loans"],
        performanceScore: 78,
        joinedAt: new Date("2023-06-01"),
        avatar: "👨‍💼",
        weeklyEarnings: 3200,
        dailyAverage: 650,
        bestDay: 1800,
        targetProgress: 0.72,
        skillScores: {
          communication: 75,
          product_knowledge: 85,
          objection_handling: 70,
          closing: 82
        }
      }
    ];

    // Save dummy data to fallback with error handling
    try {
      // Try Firebase operations if available
      if (fallbackData.isFirebaseAvailable) {
        for (const gp of gpProfiles) {
          await setDoc(doc(db, "gp_profiles", gp.id), gp);
        }
        console.log("Firebase data initialized successfully!");
      }
    } catch (firebaseError) {
      console.warn("Firebase not available, using fallback data:", firebaseError);
      fallbackData.isFirebaseAvailable = false;
    }
    
    // Always update fallback data
    fallbackData.gpProfiles = gpProfiles;
    fallbackData.customers = mockCustomers;
    fallbackData.trainingModules = mockTrainingModules;
    
    console.log("Data initialization completed!");
    return true;
  } catch (error) {
    console.error("Error during data initialization:", error);
    fallbackData.isFirebaseAvailable = false;
    return false;
  }
};

// Enhanced Firebase helper functions with fallback
export const getGPProfile = async (gpId: string) => {
  try {
    if (fallbackData.isFirebaseAvailable) {
      const docRef = doc(db, "gp_profiles", gpId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } else {
      // Use fallback data
      const profile = fallbackData.gpProfiles.find(gp => gp.id === gpId);
      return profile || null;
    }
  } catch (error) {
    console.error("Error fetching GP profile, using fallback:", error);
    const profile = fallbackData.gpProfiles.find(gp => gp.id === gpId);
    return profile || null;
  }
};

export const getTopLeads = async (gpId: string, limit_count = 3) => {
  try {
    if (fallbackData.isFirebaseAvailable) {
      const q = query(
        collection(db, "customers"),
        where("assignedTo", "==", gpId),
        orderBy("score", "desc"),
        limit(limit_count)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      // Use fallback data
      return fallbackData.customers
        .filter(customer => customer.assignedTo === gpId)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit_count);
    }
  } catch (error) {
    console.error("Error fetching top leads, using fallback:", error);
    return fallbackData.customers
      .filter(customer => customer.assignedTo === gpId)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit_count);
  }
};

export const getTrainingModules = async (gpId: string) => {
  try {
    if (fallbackData.isFirebaseAvailable) {
      const q = query(collection(db, "training_modules"), orderBy("difficulty"), limit(3));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      // Use fallback data
      return fallbackData.trainingModules.slice(0, 3);
    }
  } catch (error) {
    console.error("Error fetching training modules, using fallback:", error);
    return fallbackData.trainingModules.slice(0, 3);
  }
};

export const getCustomerQueries = async (customerId: string) => {
  try {
    const q = query(
      collection(db, "queries"),
      where("customerId", "==", customerId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching queries:", error);
    return [];
  }
};

export const saveQuizResult = async (gpId: string, moduleId: string, score: number) => {
  try {
    await addDoc(collection(db, "quiz_results"), {
      gpId,
      moduleId,
      score,
      completedAt: new Date()
    });
  } catch (error) {
    console.error("Error saving quiz result:", error);
  }
};

export const updateLeadStatus = async (leadId: string, status: string, notes?: string) => {
  try {
    await updateDoc(doc(db, "customers", leadId), {
      status,
      lastContact: new Date(),
      notes: notes || ""
    });
  } catch (error) {
    console.error("Error updating lead status:", error);
  }
};

export const generateAIPrompt = (customerMessage: string, customerProfile: any) => {
  // Simulated AI prompt generation based on customer message and profile
  const prompts = [
    "Mention our zero EMI options for affordable payments",
    "Highlight the tax benefits available with this product", 
    "Address their budget concerns with flexible payment plans",
    "Emphasize the comprehensive coverage and network hospitals",
    "Suggest a family floater plan for better value"
  ];
  
  return prompts[Math.floor(Math.random() * prompts.length)];
};

export const generateGrowthInsights = (gpProfile: any) => {
  const insights = [
    {
      type: "performance",
      title: "Conversion Rate Improvement",
      description: `Your conversion rate is ${(gpProfile.conversionRate * 100).toFixed(1)}%. Target health insurance customers for better conversions.`,
      action: "Focus on health insurance leads",
      potential: "₹2,000 extra this month"
    },
    {
      type: "expansion", 
      title: "New Product Opportunity",
      description: "Mutual funds are trending in your area. Perfect time to expand.",
      action: "Sell mutual funds to 5 clients",
      potential: "₹3,000 extra income"
    },
    {
      type: "efficiency",
      title: "Time Management",
      description: "Automate follow-ups to save 2 hours daily.",
      action: "Use AI query responses",
      potential: "30% more productivity"
    }
  ];
  
  return insights;
};

export default app
