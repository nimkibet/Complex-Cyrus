import {
  BadgeCheck,
  Star,
  DollarSign,
  Zap,
  ShieldCheck,
  ThumbsUp,
  Clock,
  Award,
} from "lucide-react";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Licensed & Experienced Engineers",
    description:
      "Our engineers are registered with the Engineers Board of Kenya (EBK) and carry years of hands-on experience across diverse electrical projects.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Award,
    title: "Quality Workmanship",
    description:
      "We use only certified cables, fittings, and equipment sourced from reputable suppliers. Every installation meets or exceeds national standards.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: DollarSign,
    title: "Affordable & Transparent Pricing",
    description:
      "Competitive pricing with no hidden costs. We provide detailed quotations so you always know exactly what you're paying for.",
    color: "from-green-500 to-green-700",
  },
  {
    icon: Clock,
    title: "Fast Response Times",
    description:
      "We understand that electrical issues can't wait. Our team responds promptly to all inquiries and especially to emergency situations.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "Full Safety Compliance",
    description:
      "All our work complies with EPRA regulations, Kenya's Electrical Installation Code (KEBS), and international IEC standards.",
    color: "from-red-500 to-red-700",
  },
  {
    icon: ThumbsUp,
    title: "Guaranteed Workmanship",
    description:
      "We back all our installations with a workmanship guarantee. If something isn't right, we'll fix it — at no extra cost to you.",
    color: "from-indigo-500 to-indigo-700",
  },
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "10+", label: "Years in Business" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Emergency Support" },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="py-20 lg:py-28 bg-gradient-to-b from-blue-900 to-blue-950 relative overflow-hidden"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
            <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            The{" "}
            <span className="text-yellow-400">Complex Cyrus</span>
            <br />
            Advantage
          </h2>
          <p className="text-blue-200 max-w-xl mx-auto text-lg">
            We don&apos;t just wire buildings — we build trust, deliver excellence, and power Kenya&apos;s
            future safely.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="hover-lift bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base mb-2 group-hover:text-yellow-400 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-yellow-400/10 border border-yellow-400/20 rounded-2xl py-8 px-4 hover:bg-yellow-400/20 transition-colors"
            >
              <p className="text-4xl font-black text-yellow-400 mb-2">{stat.value}</p>
              <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Certification badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            "EBK Registered",
            "EPRA Compliant",
            "KEBS Standards",
            "IEC Certified",
            "ISO Quality",
          ].map((badge) => (
            <div
              key={badge}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2"
            >
              <BadgeCheck className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
