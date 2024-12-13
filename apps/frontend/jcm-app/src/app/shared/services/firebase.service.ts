import { Injectable, signal } from '@angular/core';
// import { initializeApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import {
  User as FirebaseUser,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { User } from '../models/user';

// Replace with your own Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAqWYoASk35mE9OrZlKomWxsf-MD02jkZA",
    authDomain: "jcm-app-88293.firebaseapp.com",
    projectId: "jcm-app-88293",
    storageBucket: "jcm-app-88293.firebasestorage.app",
    messagingSenderId: "899524604551",
    appId: "1:899524604551:web:df741645d13f6aa16abe22",
    measurementId: "G-NMYRCE4WLG"
};

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app = initializeApp(firebaseConfig);
  auth = getAuth(this.app);
  db = getFirestore(this.app);

  user = signal<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, async (user) => {
      if (!user) {
        this.user.set(null);
        return;
      }

      const userInfo = await this.getUserInfo(user?.uid);
      this.user.set(userInfo);
    });
  }

  async getAuthState(): Promise<FirebaseUser | null> {
    await this.auth.authStateReady();
    return Promise.resolve(this.auth.currentUser);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async getUserInfo(uid: string): Promise<User | null> {
    const userRef = doc(this.db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return null;
    }

    return userDoc.data() as User;
  }
}
