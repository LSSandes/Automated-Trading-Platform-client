import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialStats {
  profit: string;
  trades: string;
  period: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  stats: TestimonialStats;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="py-20 relative overflow-hidden bg-dark-100/30 border-y border-dark-300/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Top Traders
          </h2>
          <p className="text-xl text-gray-400">
            See what professional traders are saying about our platform
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center">
            <button 
              onClick={() => setActiveTestimonial((prev) => 
                prev === 0 ? testimonials.length - 1 : prev - 1
              )}
              className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                       rounded-lg transition-all absolute left-4 z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="glass-panel rounded-xl p-8 max-w-4xl mx-16">
              <div className="flex items-start space-x-6">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-20 h-20 rounded-full border-2 border-accent/20"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {testimonials[activeTestimonial].name}
                      </h3>
                      <p className="text-accent">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                    <Quote className="h-8 w-8 text-accent/20" />
                  </div>
                  <p className="text-gray-300 mt-4 text-lg">
                    {testimonials[activeTestimonial].content}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-dark-300/30">
                    <div>
                      <div className="text-emerald-400 font-medium text-lg">
                        {testimonials[activeTestimonial].stats.profit}
                      </div>
                      <div className="text-gray-400 text-sm">Total Profit</div>
                    </div>
                    <div>
                      <div className="text-white font-medium text-lg">
                        {testimonials[activeTestimonial].stats.trades}
                      </div>
                      <div className="text-gray-400 text-sm">Total Trades</div>
                    </div>
                    <div>
                      <div className="text-white font-medium text-lg">
                        {testimonials[activeTestimonial].stats.period}
                      </div>
                      <div className="text-gray-400 text-sm">Time Period</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setActiveTestimonial((prev) => 
                (prev + 1) % testimonials.length
              )}
              className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                       rounded-lg transition-all absolute right-4 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeTestimonial 
                    ? 'bg-accent w-6' 
                    : 'bg-dark-300 hover:bg-dark-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}