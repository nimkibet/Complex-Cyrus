"use client";

import { useEffect, useRef } from "react";
import { X, CheckCircle, MapPin, Tag } from "lucide-react";

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    location: string;
    category: string;
    icon: React.ComponentType<{ className?: string }>;
    tags: string[];
    image?: string;
  } | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-blue-950/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
      >
        <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[85vh] overflow-hidden animate-slide-up">
          
          {/* Image Header */}
          <div className="relative h-56 sm:h-72 flex-shrink-0 overflow-hidden bg-blue-900">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
                <project.icon className="w-20 h-20 text-white/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent" />

            <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md bg-white/90 text-gray-800">
              {project.category}
            </span>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight drop-shadow-lg mb-2">
                {project.title}
              </h2>
              <div className="flex items-center gap-1.5 text-blue-100 text-sm font-medium">
                <MapPin className="w-4 h-4 text-yellow-400" />
                {project.location}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
            <h3 className="flex items-center gap-2 font-bold text-blue-900 text-sm uppercase tracking-wider mb-4">
              <CheckCircle className="w-4 h-4 text-yellow-500" />
              Project Highlights
            </h3>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              This {project.category} project located in {project.location} showcases our commitment to safety, compliance, and excellence. We successfully implemented and delivered {project.tags.join(", ")} meeting all client requirements within the specified timeline.
            </p>

            <h3 className="flex items-center gap-2 font-bold text-blue-900 text-sm uppercase tracking-wider mb-3">
              <Tag className="w-4 h-4 text-yellow-500" />
              Technologies & Features
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="bg-blue-50 text-blue-800 border border-blue-100 px-3 py-1.5 rounded-lg text-sm font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50 p-4 sm:p-5 text-center">
             <button
              onClick={() => {
                onClose();
                const quoteSection = document.getElementById("quote");
                if (quoteSection) quoteSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 active:scale-95 text-white font-black text-sm px-6 py-3.5 rounded-xl transition-all duration-200"
            >
              Start a Similar Project
            </button>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
