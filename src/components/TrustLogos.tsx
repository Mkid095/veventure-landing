import React from 'react';

export const TrustLogos: React.FC = () => {
  const logos = [
    { name: 'OpenAI', font: 'font-semibold tracking-tight' },
    { name: 'Anthropic', font: 'font-serif tracking-normal font-medium' },
    { name: 'Cursor', font: 'font-mono tracking-tight font-semibold' },
    { name: 'GitHub', font: 'font-bold tracking-tight' },
    { name: 'Vercel', font: 'font-sans font-bold tracking-tighter' },
  ];

  return (
    <section className="py-12 border-y border-[#f0f0f0]">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-[13px] text-[#8e8e8e] font-normal mb-8 tracking-normal">
          Built for teams shipping on
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 md:gap-20 opacity-70 hover:opacity-90 transition-opacity">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className={`text-[19px] sm:text-[22px] text-[#4a4a4a] select-none ${logo.font}`}
            >
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
