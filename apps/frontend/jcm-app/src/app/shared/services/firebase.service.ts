import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { User } from '../models/user';

// Replace with your own Firebase config
const firebaseConfig = {};

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
