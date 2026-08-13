"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "James Kamau",
    role: "Homeowner",
    location: "Ruiru, Kiambu",
    rating: 5,
    review:
      "Complex Cyrus Electrical did a superb job wiring my newly built 4-bedroom house. The team was professional, punctual, and incredibly clean in their work. Every switch, socket, and circuit was installed perfectly. I especially loved the LED lighting design they proposed — it transformed the house. Highly recommended!",
    initials: "JK",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    name: "Grace Njoki",
    role: "Business Owner",
    location: "Thika Town",
    rating: 5,
    review:
      "We hired Complex Cyrus Electrical to install a solar PV system and CCTV for our office block. The engineers were highly knowledgeable and guided us through the whole process — from design to commissioning. The solar system has drastically cut our electricity bills. The team's attention to safety and quality is exceptional.",
    initials: "GN",
    color: "from-yellow-500 to-yellow-700",
  },
  {
    id: 3,
    name: "Peter Mwangi",
    role: "Property Developer",
    location: "Kiambu County",
    rating: 5,
    review:
      "As a property developer, I need contractors I can trust to deliver on time and within budget. Complex Cyrus Electrical has been my go-to electrical contractor for three estate projects. Their workmanship is top-notch, their pricing is fair, and they handle KPLC meter applications seamlessly. A truly dependable team!",
    initials: "PM",
    color: "from-green-600 to-green-800",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-yellow-400 to-blue-900" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-yellow-50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
            <span className="text-yellow-600 font-bold text-sm uppercase tracking-wider">
              Client Reviews
            </span>
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-4">
            What Our Clients{" "}
            <span className="text-yellow-500">Say</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our reputation is built on the trust and satisfaction of the clients we serve across Kenya.
          </p>
        </div>

        {/* Desktop: All cards visible */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="hover-lift bg-white rounded-2xl p-8 border border-gray-100 shadow-md relative"
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6" />

              {/* Stars */}
              <StarRating count={t.rating} />

              {/* Review */}
              <p className="text-gray-600 leading-relaxed mt-4 mb-6 text-sm">&ldquo;{t.review}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${t.color} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="font-bold text-blue-900">{t.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.role} &bull; {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg relative">
            <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6" />
            <StarRating count={testimonials[active].rating} />
            <p className="text-gray-600 leading-relaxed mt-4 mb-6 text-sm">
              &ldquo;{testimonials[active].review}&rdquo;
            </p>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${testimonials[active].color} rounded-full flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-white font-bold">{testimonials[active].initials}</span>
              </div>
              <div>
                <p className="font-bold text-blue-900">{testimonials[active].name}</p>
                <p className="text-xs text-gray-500">
                  {testimonials[active].role} &bull; {testimonials[active].location}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-blue-200 flex items-center justify-center hover:bg-blue-900 hover:border-blue-900 hover:text-white text-blue-900 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === active ? "bg-blue-900 w-6" : "bg-blue-200"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border-2 border-blue-200 flex items-center justify-center hover:bg-blue-900 hover:border-blue-900 hover:text-white text-blue-900 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["JK", "GN", "PM"].map((init, i) => (
                <div
                  key={init}
                  className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${
                    ["bg-blue-700", "bg-yellow-600", "bg-green-700"][i]
                  }`}
                >
                  {init}
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-blue-900 text-sm">500+ Happy Clients</p>
              <div className="flex items-center gap-1">
                <StarRating count={5} />
                <span className="text-xs text-gray-500 ml-1">5.0 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
