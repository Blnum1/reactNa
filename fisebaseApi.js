// firebaseApi.js
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from '@firebase/auth';

const db = getDatabase();
const auth = getAuth();

export const createBooking = async (slot) => {
  try {
    const userEmail = auth.currentUser.email; // Get the user's email
    const bookingRef = ref(db, 'bookings/' + Date.now()); // Create a reference with a unique ID

    // Store the booking information in Firebase
    await set(bookingRef, {
      email: userEmail,
      slot: slot,
      timestamp: Date.now(),
    });

    return { success: true, message: 'Your booking has been confirmed!' };
  } catch (error) {
    console.error('Booking error:', error);
    throw new Error('Could not save booking. Please try again later.');
  }
};
