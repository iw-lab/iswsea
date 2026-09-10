"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Waves,
  Sparkles,
  Flame,
  Droplets,
  Coffee,
  Flower2,
  ChevronLeft,
  ChevronRight,
  Shell,
} from "lucide-react";
import { specials } from "@/data/pension";

const iconMap: Record<string, React.ElementType> = {
  Waves,
  Sparkles,
  Shell,
  Flame,
  Droplets,
  Coffee,
  Flower2,
};

export default function Special() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeSpecial = specials[activeIndex];
  const Icon = iconMap[activeSpecial.icon];

  const handleSelectSpecial = (index: number) => {
    setActiveIndex(index);
    setImageIndex(0);
  };

  const nextImage = () => {
    setImageIndex((prev) =>
      prev === activeSpecial.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setImageIndex((prev) =>
      prev === 0 ? activeSpecial.images.length - 1 : prev - 1
    );
  };

  // 모바일용 짧은 이름
  const shortNames: Record<string, string> = {
    "바다전망": "바다",
    "SPA": "스파",
    "갯벌체험": "갯벌",
    "바베큐 개별테라스": "BBQ",
    "수영장과 모래해변": "수영장",
    "야외카페 & 산책로": "카페",
    "바다꽃정원": "정원",
  };

  return (
    <section id="special" className="bg-[#0F1419] overflow-hidden pt-5 pb-8 lg:pt-12 lg:pb-12" ref={ref}>
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Section Header - 모바일 컴팩트 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-3 lg:mb-8"
        >
          <p className="text-[var(--secondary)] text-xs sm:text-base tracking-[0.2em] uppercase mb-1 sm:mb-3 font-medium">
            SPECIAL FACILITIES
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-1 sm:mb-4 font-display">
            특별한 시설
          </h2>
          <p className="text-[var(--foreground-muted)] text-xs sm:text-base lg:text-lg mx-auto px-2 text-center hidden sm:block">
            바다가 보이는 수영장부터 전 객실 개별 스파와 바베큐장, 갯벌체험, 4계절 모두 꽃이 피는 정원까지
          </p>
        </motion.div>

        {/* Mobile: Tab Navigation - 7개 그리드 1줄 */}
        <div className="lg:hidden mb-4">
          <div className="grid grid-cols-7 gap-1">
            {specials.map((special, index) => {
              const SpecialIcon = iconMap[special.icon];
              const isActive = index === activeIndex;

              return (
                <button
                  key={special.id}
                  onClick={() => handleSelectSpecial(index)}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-lg"
                      : "bg-[#1a2332] border border-[#2a3a4a]"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center mb-0.5 ${
                      isActive ? "bg-white/20" : "bg-[#0d1520]"
                    }`}
                  >
                    {SpecialIcon && (
                      <SpecialIcon
                        className={`w-3 h-3 ${
                          isActive ? "text-white" : "text-[var(--primary)]"
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[8px] font-bold text-center leading-tight whitespace-nowrap ${
                      isActive ? "text-white" : "text-[var(--foreground)]"
                    }`}
                  >
                    {shortNames[special.name] || special.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Left - Main Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${imageIndex}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-xl sm:rounded-3xl overflow-hidden aspect-[5/4] lg:aspect-auto shadow-2xl flex-1"
                style={{ minHeight: 'auto' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${activeSpecial.images[imageIndex].src})`,
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full text-gray-900 transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full text-gray-900 transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Number Badge */}
                <div className="absolute top-3 left-3 sm:top-6 sm:left-6 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-[var(--primary)] text-white rounded-full text-xs sm:text-base font-bold shadow-lg">
                  SPECIAL {activeSpecial.number}
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/80 text-xs sm:text-sm font-medium tracking-wider mb-1 sm:mb-2">
                        {activeSpecial.nameEn}
                      </p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                        {activeSpecial.name}
                      </h3>
                    </div>
                    <div className="text-white/70 text-xs sm:text-sm">
                      {imageIndex + 1} / {activeSpecial.images.length}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail Strip - 모바일 */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide lg:hidden">
              {activeSpecial.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === imageIndex
                      ? "border-[var(--primary)] shadow-lg"
                      : "border-transparent opacity-60"
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.src})` }}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right - Info & Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col"
          >
            {/* Icon & Description */}
            <div className="mb-3 lg:mb-4">
              <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-xl flex-shrink-0">
                  {Icon && <Icon className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[var(--secondary)] text-xs sm:text-sm font-medium tracking-wider">
                    {activeSpecial.nameEn}
                  </p>
                  <h3 className="text-lg sm:text-2xl lg:text-2xl font-bold text-[var(--foreground)] truncate">
                    {activeSpecial.name}
                  </h3>
                </div>
              </div>

              <p className="text-[var(--foreground-muted)] text-sm sm:text-base lg:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
                {activeSpecial.summary}
              </p>
            </div>

            {/* Desktop: Vertical Tab List - 컴팩트 */}
            <div className="hidden lg:block flex-1">
              <h4 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-3">
                모든 시설 보기
              </h4>
              <div className="space-y-2">
                {specials.map((special, index) => {
                  const SpecialIcon = iconMap[special.icon];
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={special.id}
                      onClick={() => handleSelectSpecial(index)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                        isActive
                          ? "bg-[var(--primary)] text-white shadow-lg"
                          : "bg-[#1a2332] hover:bg-[#243040] border border-[#2a3a4a]"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isActive
                            ? "bg-white/20"
                            : "bg-[#0d1520]"
                        }`}
                      >
                        {SpecialIcon && (
                          <SpecialIcon
                            className={`w-5 h-5 ${
                              isActive ? "text-white" : "text-[var(--primary)]"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-medium ${
                              isActive ? "text-white/70" : "text-[var(--secondary)]"
                            }`}
                          >
                            {special.number}
                          </span>
                          <span
                            className={`text-sm font-semibold truncate ${
                              isActive ? "text-white" : "text-[var(--foreground)]"
                            }`}
                          >
                            {special.name}
                          </span>
                        </div>
                        <p
                          className={`text-xs truncate ${
                            isActive ? "text-white/80" : "text-[var(--foreground-muted)]"
                          }`}
                        >
                          {special.nameEn}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 flex-shrink-0 ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Button - 모바일 */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#2a3a4a] lg:hidden">
              <button
                onClick={() =>
                  handleSelectSpecial(
                    activeIndex === 0 ? specials.length - 1 : activeIndex - 1
                  )
                }
                className="flex items-center justify-center gap-1 py-2.5 px-4 bg-[#1a2332] text-white border border-[#2a3a4a] rounded-lg font-medium text-sm transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                이전
              </button>
              <button
                onClick={() =>
                  handleSelectSpecial(
                    activeIndex === specials.length - 1 ? 0 : activeIndex + 1
                  )
                }
                className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm transition-all"
              >
                다음 시설
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
