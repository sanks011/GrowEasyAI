import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore"
import { getDatabase, ref, push, onValue, off } from "firebase/database"
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

export default app
