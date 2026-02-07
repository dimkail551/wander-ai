"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function checkAndAddUser() {
  console.log("--> 1. Ξεκίνησε ο έλεγχος χρήστη (checkAndAddUser)"); 

  const user = await currentUser();

  if (!user) {
    console.log("--> 2. ΔΕΝ βρέθηκε χρήστης από το Clerk! (Είναι null)"); 
    return null;
  }

  console.log("--> 3. Βρέθηκε χρήστης Clerk με email:", user.emailAddresses[0]?.emailAddress); 

  // Έλεγχος αν υπάρχει ήδη στη βάση
  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (loggedInUser) {
      console.log("--> 4. Ο χρήστης υπάρχει ήδη στη βάση DB."); 
      return loggedInUser;
    }

    console.log("--> 5. Ο χρήστης είναι ΝΕΟΣ. Προσπάθεια δημιουργίας..."); 

    // Δημιουργία
    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
        imageUrl: user.imageUrl,
      },
    });

    console.log("--> 6. ΕΠΙΤΥΧΙΑ! Ο χρήστης δημιουργήθηκε:", newUser); 
    return newUser;

  } catch (error) {
    console.error("--> ERROR: Κάτι πήγε στραβά με τη βάση:", error);
  }
}