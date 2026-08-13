"use client";

import { Zap, Phone, ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="hero-gradient absolute inset-0" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Electric bolt decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-500/15 rounded-full blur-2xl" />

      {/* Floating bolt icons */}
      <Zap className="absolute top-24 right-1/4 text-yellow-400/30 w-8 h-8 animate-pulse" />
      <Zap className="absolute bottom-32 left-1/4 text-yellow-400/20 w-12 h-12 animate-pulse delay-700" />
      <Zap className="absolute top-1/3 right-16 text-white/10 w-16 h-16 animate-pulse delay-1000" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Logo Badge */}
        <div className="inline-flex items-center justify-center mb-8">
          <img
            src="/logo.png"
            alt="Complex Cyrus Electrical Solution Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl shadow-2xl"
          />
        </div>

        {/* Company Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">
            Registered Kenyan Electrical Engineering Company
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-4">
          Complex{" "}
          <span className="text-yellow-400">Cyrus</span>
          <br />
          <span className="text-white">Electrical</span>{" "}
          <span className="text-yellow-400">Solution</span>
        </h1>

        {/* Subheadings */}
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-200 mt-4 mb-2">
          Powering Safety. Delivering Excellence.
        </p>
        <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10">
          The top-rated Kiambu electrical contractor & Thika electrician. <br className="hidden sm:block" />
          Professional Solutions &bull; Quality Workmanship &bull; Reliable Service
        </p>

        {/* Divider */}
        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-10 rounded-full" />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            id="hero-quote-cta"
            href="#quote"
            className="btn-pulse inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black text-base sm:text-lg px-8 py-4 rounded-xl shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-all duration-200 ease-out hover:-translate-y-1 active:scale-95 group"
          >
            <Zap className="w-5 h-5 fill-blue-900" />
            Get a Quote
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            id="hero-call-cta"
            href="tel:+254725618445"
            className="inline-flex items-center gap-3 border-2 border-white/60 hover:border-white text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-200 ease-out hover:-translate-y-1 active:scale-95"
          >
            <Phone className="w-5 h-5" />
            Call Now: +254 725 618 445
          </a>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: "500+", label: "Projects Done" },
            { value: "10+", label: "Years Experience" },
            { value: "24/7", label: "Emergency Service" },
            { value: "100%", label: "Safety Compliant" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl sm:text-3xl font-black text-yellow-400">{stat.value}</p>
              <p className="text-white/70 text-xs sm:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 opacity-60">
          <span className="text-white/60 text-sm">Scroll to explore</span>
          <ChevronDown className="text-white w-6 h-6 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
