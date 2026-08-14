"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Zap, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { submitQuoteAction } from "@/app/actions/quote";
type FormValues = {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  message: string;
};

const services = [
  "Domestic Electrical Installation",
  "Commercial Electrical Installation",
  "Industrial Electrical Installation",
  "Solar PV Installation",
  "Battery Backup System",
  "CCTV Installation",
  "Electric Fence Installation",
  "KPLC Meter Application",
  "24/7 Emergency Service",
  "LED Lighting Solutions",
  "Generator Installation",
  "Electrical Maintenance & Repair",
  "Distribution Board Upgrade",
  "Smart Home Automation",
  "Structured Cabling & LAN",
  "Electrical Design & Drawings",
  "Fire Alarm System",
  "Power Factor Correction",
  "Earthing & Lightning Protection",
  "Other",
];

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [quoteRef, setQuoteRef] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await submitQuoteAction(data);
      if (result.success) {
        setQuoteRef((result as { success: true; quoteNumber: string }).quoteNumber || "");
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        alert("Something went wrong. Please try again or call us directly.");
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <section
      id="quote"
      className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-white to-yellow-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100/50 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-blue-600 to-yellow-400" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
            <span className="text-yellow-600 font-bold text-sm uppercase tracking-wider">
              Get a Quote
            </span>
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-4">
            Request a{" "}
            <span className="text-yellow-500">Quotation</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Fill in the form below and our team will get back to you within 24 hours with a
            detailed quotation tailored to your project.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-blue-100 p-8 lg:p-12">
          {/* Success Message */}
          {submitted && (
            <div className="mb-8 flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-5">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-800 text-base">Quotation Request Submitted!</p>
                {quoteRef && (
                  <p className="text-green-700 text-sm mt-1">Reference: <strong className="font-mono">{quoteRef}</strong></p>
                )}
                <p className="text-green-700 text-sm mt-1">
                  A branded PDF quotation has been sent to your email. Our team will follow up within 24 hours with full pricing.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Row 1: Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="form-name"
                  className="block text-sm font-bold text-blue-900 mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-name"
                  type="text"
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
                    errors.name
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                  {...register("name", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="form-phone"
                  className="block text-sm font-bold text-blue-900 mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-phone"
                  type="tel"
                  placeholder="+254 700 000 000"
                  className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[\d\s\-()]{9,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Email + Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="form-email"
                  className="block text-sm font-bold text-blue-900 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-email"
                  type="email"
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="form-location"
                  className="block text-sm font-bold text-blue-900 mb-2"
                >
                  Project Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-location"
                  type="text"
                  placeholder="e.g., Thika, Kiambu County"
                  className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
                    errors.location
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                  {...register("location", { required: "Project location is required" })}
                />
                {errors.location && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Service Dropdown */}
            <div>
              <label
                htmlFor="form-service"
                className="block text-sm font-bold text-blue-900 mb-2"
              >
                Type of Service <span className="text-red-500">*</span>
              </label>
              <select
                id="form-service"
                className={`w-full px-4 py-3 rounded-xl border-2 text-gray-800 bg-gray-50 focus:bg-white focus:outline-none transition-colors appearance-none cursor-pointer ${
                  errors.service
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                {...register("service", { required: "Please select a service" })}
                defaultValue=""
              >
                <option value="" disabled>
                  — Select a service —
                </option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.service.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="form-message"
                className="block text-sm font-bold text-blue-900 mb-2"
              >
                Project Details / Message
              </label>
              <textarea
                id="form-message"
                rows={5}
                placeholder="Please describe your project requirements, timeline, or any specific needs..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-colors resize-none"
                {...register("message")}
              />
            </div>

            {/* Submit */}
            <button
              id="form-submit"
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto btn-pulse inline-flex items-center justify-center gap-3 bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white font-black text-base px-10 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-0.5 disabled:translate-y-0 disabled:shadow-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Request
                  <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
