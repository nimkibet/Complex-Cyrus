"use client";

import { useState } from "react";
import { changePasswordAction } from "@/app/actions/auth";
import { Shield, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    const res = await changePasswordAction(formData);
    
    if (res.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      setError(res.error || "Failed to change password.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-blue-950">Security Settings</h1>
            <p className="text-gray-500 text-sm">Update your admin password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> Password changed successfully!
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Current Password</label>
            <input 
              name="currentPassword"
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:bg-white bg-gray-50 transition-colors focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
            <input 
              name="newPassword"
              type="password" 
              required
              minLength={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:bg-white bg-gray-50 transition-colors focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
            <input 
              name="confirmPassword"
              type="password" 
              required
              minLength={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:bg-white bg-gray-50 transition-colors focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 mt-4"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
