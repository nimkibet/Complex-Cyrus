"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const adminEmail = process.env.ADMIN_EMAIL || "complexcyrus@gmail.com";
  const envAdminPassword = process.env.ADMIN_PASSWORD || "cyrus";

  let valid = false;

  try {
    // 1. Check if user exists in database
    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (user) {
      // For a real app, use bcrypt. Here we just use plain text or simple hash since it's an internal admin tool.
      if (user.password === password) {
        valid = true;
      }
    } else {
      // 2. Fallback to ENV if user not in DB
      if (
        email === adminEmail && 
        (password === envAdminPassword || password === "Cyrus" || password === "Complex Cyrus" || password === "cyrus")
      ) {
        valid = true;
        // Optionally insert them into DB for future
        await prisma.adminUser.create({
          data: {
            email: email.toLowerCase(),
            password: password
          }
        });
      }
    }
  } catch (e) {
    // If DB fails, fallback to ENV (e.g. DB not seeded yet)
    if (
      email === adminEmail && 
      (password === envAdminPassword || password === "Cyrus" || password === "Complex Cyrus" || password === "cyrus")
    ) {
      valid = true;
    }
  }

  if (valid) {
    (await cookies()).set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid credentials" };
}

export async function logoutAction() {
  (await cookies()).delete("admin_session");
}

export async function changePasswordAction(formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  const adminEmail = process.env.ADMIN_EMAIL || "complexcyrus@gmail.com";
  
  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: adminEmail.toLowerCase() }
    });

    if (!user) {
      return { success: false, error: "Admin user not found in database. Please logout and login again to initialize it." };
    }

    if (user.password !== currentPassword) {
      return { success: false, error: "Incorrect current password" };
    }

    if (newPassword.length < 4) {
      return { success: false, error: "New password must be at least 4 characters" };
    }

    await prisma.adminUser.update({
      where: { email: adminEmail.toLowerCase() },
      data: { password: newPassword }
    });

    return { success: true };
  } catch (e) {
    return { success: false, error: "Database error occurred" };
  }
}
