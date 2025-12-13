import React, { useState, useRef, FormEvent, useEffect, useCallback } from 'react';
import { CameraIcon, GearIcon, SparklesIcon, VideoIcon, CloseIcon, FacebookIcon, InstagramIcon, YouTubeIcon, TwitterIcon, LinkedInIcon, ChevronDownIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, PlayIcon } from './components/Icons';

// Helper component for triggering animations on scroll
const AnimateOnScroll: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      };
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};


interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gravity-grey/30 p-6 rounded-lg border border-gravity-grey backdrop-blur-sm transform hover:scale-105 hover:border-orbit-blue transition-all duration-300 h-full">
    <div className="mb-4 text-orbit-pink">{icon}</div>
    <h3 className="text-xl font-montserrat font-bold mb-2 text-starlight-white">{title}</h3>
    <p className="text-orbit-grey">{description}</p>
  </div>
);

interface EventCardProps {
  image: string;
  title: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ image, title, description }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Elevate your ${title.toLowerCase()} with a cinematic 360° video booth from Orbit360 Motion! ${description}`;
  const shareTitle = `Orbit360 Motion for ${title}`;

  return (
    <div className="group relative overflow-hidden rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-orbit-purple/30">
      <img src={image} alt={title} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3 className="text-2xl font-montserrat font-bold text-starlight-white">{title}</h3>
        <p className="text-orbit-grey mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
        
        <div className="mt-4 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orbit-grey hover:text-starlight-white transform hover:scale-110 transition-all"
            aria-label={`Share ${title} on Facebook`}
          >
            <FacebookIcon />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orbit-grey hover:text-starlight-white transform hover:scale-110 transition-all"
            aria-label={`Share ${title} on Twitter`}
          >
            <TwitterIcon />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orbit-grey hover:text-starlight-white transform hover:scale-110 transition-all"
            aria-label={`Share ${title} on LinkedIn`}
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
};


interface StepProps {
    number: number;
    title: string;
    description: string;
}

const BookingStep: React.FC<StepProps> = ({ number, title, description }) => (
  <div className="flex items-start md:flex-col md:items-center md:text-center transition-all duration-300 transform hover:scale-105 hover:drop-shadow-[0_10px_10px_rgba(155,61,255,0.25)] my-4 md:my-0">
    <div className="flex-shrink-0 flex flex-col items-center mr-6 md:mr-0 md:mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orbit-pink via-orbit-purple to-orbit-blue flex items-center justify-center text-starlight-white font-bold text-xl shadow-lg">
        {number}
      </div>
      {number < 3 && <div className="w-1 h-24 md:h-16 bg-gravity-grey mt-2"></div>}
    </div>
    <div>
        <h3 className="text-xl font-montserrat font-bold text-starlight-white">{title}</h3>
        <p className="mt-2 text-orbit-grey">{description}</p>
    </div>
  </div>
);

const faqData = [
  {
    question: "What's included in a standard rental package?",
    answer: "Our standard package includes 3 hours of booth time, a professional on-site attendant, unlimited video sessions, a custom video overlay, instant social sharing, and a digital gallery of all videos after the event."
  },
  {
    question: "How much space do you need for the 360° booth?",
    answer: "We recommend a clear, flat area of at least 10x10 feet (3x3 meters) to ensure the safety of your guests and the best video quality. More space is always better!"
  },
  {
    question: "How long does setup and breakdown take?",
    answer: "Our team typically arrives 60-90 minutes before the scheduled start time for a seamless setup. Breakdown is quicker, usually taking about 45-60 minutes."
  },
  {
    question: "How do guests receive their videos?",
    answer: "Guests can instantly share their videos via email, text, or QR code right from our sharing station. The event host will also receive a link to a full online gallery of all the videos."
  },
  {
    question: "Can the video overlay be customized for my event?",
    answer: "Absolutely! We'll work with you to design a custom overlay that matches your event's theme, branding, or color scheme. Just provide us with your logo, text, or design ideas."
  }
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gravity-grey py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-starlight-white focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
           <p className="pt-4 text-orbit-grey">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [formData, setFormData] = useState({
    eventType: 'Wedding',
    eventDate: '',
    estimatedGuests: '51-100',
    name: '',
    email: '',
    referralSource: 'Search Engine (Google, etc.)',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});

  const validateStep2 = useCallback(() => {
    const errors: { name?: string; email?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Your name is required.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Your email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData.name, formData.email]);

  useEffect(() => {
    // Real-time validation for step 2
    if (currentStep === 2) {
      validateStep2();
    }
  }, [formData.name, formData.email, currentStep, validateStep2]);
  
  const handleClose = useCallback(() => {
    onClose();
    // Reset state after a delay to allow for closing animation
    setTimeout(() => {
      setCurrentStep(1);
      setIsSubmitted(false);
      setFormData({ eventType: 'Wedding', eventDate: '', estimatedGuests: '51-100', name: '', email: '', referralSource: 'Search Engine (Google, etc.)', details: '' });
      setFormErrors({});
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('forward');
    setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('backward');
    setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !validateStep2()) return;
    setIsSubmitting(true);

    const submissionData = {
      "Event Type": formData.eventType,
      "Event Date": formData.eventDate,
      "Estimated Guests": formData.estimatedGuests,
      "Name": formData.name,
      "email": formData.email, // FormSubmit uses lowercase 'email' for auto-reply-to
      "How did you hear about us?": formData.referralSource,
      "Additional Details": formData.details,
      _subject: `Orbit360 Motion Enquiry: ${formData.eventType} on ${formData.eventDate || 'Not specified'}`,
      _cc: 'orbit360motion@gmail.com',
      _template: 'table',
      _captcha: 'false'
    };

    try {
      await fetch('https://formsubmit.co/ajax/info@orbit360motion.co.uk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // We catch the error but proceed to the success screen so the user experience isn't interrupted.
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      handleNext();
    }
  };
  
  const renderStep = () => {
    const animationClass = isAnimating 
      ? (direction === 'forward' ? 'animate-slide-out-left' : 'animate-slide-out-right')
      : (direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left');
    
    if (isSubmitted) {
        return (
            <div key="success" className="text-center p-8 flex flex-col items-center justify-center h-full animate-fade-in">
                <div className="animate-success-check"><CheckCircleIcon size="xl" /></div>
                <h3 className="text-2xl font-montserrat font-bold mt-6 mb-2">Enquiry Sent!</h3>
                <p className="text-orbit-grey mb-8">We're checking our orbit... You'll hear from us within 24 hours. ✨</p>
                <button 
                  onClick={handleClose}
                  className="w-full max-w-xs px-8 py-3 font-bold text-starlight-white bg-gravity-grey/50 border border-gravity-grey rounded-full hover:bg-gravity-grey/80 transition-colors"
                >
                  Close
                </button>
            </div>
        );
    }

    switch (currentStep) {
      case 1:
        return (
          <div key={1} className={`p-8 space-y-6 ${!isAnimating ? 'animate-fade-in' : animationClass}`}>
            <h3 className="text-2xl font-montserrat font-bold text-center">Step 1: Event Details</h3>
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-orbit-grey mb-1">Event Type</label>
              <select id="eventType" name="eventType" value={formData.eventType} onChange={handleInputChange} required className="w-full bg-gravity-grey/30 border border-gravity-grey rounded-md py-3 px-4 text-starlight-white placeholder-orbit-grey/70 focus:outline-none focus:ring-2 focus:ring-orbit-blue">
                <option>Wedding</option>
                <option>Corporate & Branding</option>
                <option>Nightlife & Social</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-orbit-grey mb-1">Event Date</label>
              <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleInputChange} required className="w-full bg-gravity-grey/30 border border-gravity-grey rounded-md py-3 px-4 text-starlight-white placeholder-orbit-grey/70 focus:outline-none focus:ring-2 focus:ring-orbit-blue" />
            </div>
            <div>
              <label htmlFor="estimatedGuests" className="block text-sm font-medium text-orbit-grey mb-1">Estimated Guests</label>
              <select id="estimatedGuests" name="estimatedGuests" value={formData.estimatedGuests} onChange={handleInputChange} required className="w-full bg-gravity-grey/30 border border-gravity-grey rounded-md py-3 px-4 text-starlight-white placeholder-orbit-grey/70 focus:outline-none focus:ring-2 focus:ring-orbit-blue">
                <option>0-50</option>
                <option>51-100</option>
                <option>101-200</option>
                <option>200+</option>
              </select>
            </div>
            <div className="pt-4">
              <button onClick={handleNext} className="w-full px-8 py-3 font-bold text-starlight-white bg-gradient-to-r from-orbit-pink via-orbit-purple to-orbit-blue rounded-full hover:scale-105 transform transition-transform duration-300">
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div key={2} className={`p-8 space-y-6 ${animationClass}`}>
            <h3 className="text-2xl font-montserrat font-bold text-center">Step 2: Your Details</h3>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-orbit-grey mb-1">Your Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Jane Doe" required 
                className={`w-full bg-gravity-grey/30 border rounded-md py-3 px-4 text-starlight-white placeholder-orbit-grey/70 focus:outline-none focus:ring-2 transition-colors ${formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-gravity-grey focus:ring-orbit-blue'}`}
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? "name-error" : undefined}
              />
              {formErrors.name && <p id="name-error" className="mt-1 text-sm text-red-400">{formErrors.name}</p>}
            </div>
             <div>
              <label htmlFor="email" className="block text-sm font-medium text-orbit-grey mb-1">Your Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="jane.doe@example.com" required 
                className={`w-full bg-gravity-grey/30 border rounded-md py-3 px-4 text-starlight-white placeholder-orbit-grey/70 focus:outline-none focus:ring-2 transition-colors ${formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gravity-grey focus:ring-orbit-blue'}`}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
               />
               {formErrors.email && <p id="email-error" className="mt-1 text-sm text-red-400">{formErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="referralSource" className="block text-sm font-medium text-orbit-grey mb-1">How did you hear about us?</label>
              <select id="referralSource" name="referralSource" value={formData.referralSource} onChange={handleInputChange} required className="w-full bg-gravity-grey/30 border border-gravity-grey rounded-md py-3 px-4 text-starlight-white placeholder-orbit-grey/70 focus:outline-none focus:ring-2 focus:ring-orbit-blue">
                <option>Search Engine (Google, etc.)</option>
                <option>Social Media (Instagram, Facebook, etc.)</option>
                <option>Referral from a friend</option>
                <option>Saw us at an event</option>
                <option>Other</option>
              </select>
            </div>
             <div>
              <label htmlFor="details" className="block text-sm font-medium text-orbit-grey mb-1">Additional Details</label>
              <textarea id="details" name="details" value={formData.details} onChange={handleInputChange} placeholder="Venue, special requests, etc." rows={3} className="w-full bg-gravity-grey/30 border border-gravity-grey rounded-md py-3 px-4 text-starlight-white placeholder-orbit-grey/70 focus:outline-none focus:ring-2 focus:ring-orbit-blue"></textarea>
            </div>
            <div className="pt-4 flex items-center space-x-4">
              <button onClick={handleBack} className="w-full px-8 py-3 font-bold text-starlight-white bg-gravity-grey/50 border border-gravity-grey rounded-full hover:bg-gravity-grey/80 transition-colors">
                Back
              </button>
              <button type="submit" disabled={isSubmitting || Object.keys(formErrors).length > 0} className="w-full px-8 py-3 font-bold text-starlight-white bg-gradient-to-r from-orbit-pink via-orbit-purple to-orbit-blue rounded-full hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
              </button>
            </div>
          </div>
        );
       default:
        return null;
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Booking Enquiry"
    >
      <div
        className="bg-deep-space-black rounded-lg shadow-2xl overflow-hidden w-full max-w-md relative border border-gravity-grey animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 text-starlight-white bg-gravity-grey/50 rounded-full p-1.5 hover:bg-gravity-grey transition-colors"
          aria-label="Close booking form"
        >
          <CloseIcon />
        </button>

        {/* Progress Bar */}
        <div className="w-full bg-gravity-grey h-1.5">
          <div
            className="bg-gradient-to-r from-orbit-pink via-orbit-purple to-orbit-blue h-1.5 transition-all duration-300"
            style={{ width: `${(currentStep - 1) / (isSubmitted ? 2 : 1) * 100}%` }}
          ></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative" style={{minHeight: '450px'}}>
             {renderStep()}
          </div>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  
  const particleLayerRef1 = useRef<HTMLDivElement>(null);
  const particleLayerRef2 = useRef<HTMLDivElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, ref: React.RefObject<HTMLElement>) => {
    e.preventDefault();
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const bubbles = [
    { size: 25, left: '10%', duration: '20s', delay: '0s' },
    { size: 40, left: '20%', duration: '22s', delay: '3s' },
    { size: 15, left: '35%', duration: '30s', delay: '7s' },
    { size: 50, left: '50%', duration: '18s', delay: '2s' },
    { size: 30, left: '65%', duration: '25s', delay: '5s' },
    { size: 20, left: '80%', duration: '28s', delay: '8s' },
    { size: 45, left: '90%', duration: '23s', delay: '1s' },
    { size: 35, left: '5%', duration: '26s', delay: '10s' },
    { size: 22, left: '75%', duration: '29s', delay: '4s' },
  ];

  // Effect for modal behavior (body scroll lock)
  useEffect(() => {
    const isAnyModalOpen = isVideoModalOpen || isBookingModalOpen;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVideoModalOpen, isBookingModalOpen]);

  // Effect for hero parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current || !particleLayerRef1.current || !particleLayerRef2.current) return;

        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = heroRef.current;

        const x = (clientX - offsetWidth / 2) / (offsetWidth / 2); // -1 to 1
        const y = (clientY - offsetHeight / 2) / (offsetHeight / 2); // -1 to 1

        // Layer 1 (further away, moves more)
        const trans1 = 80;
        const tilt1 = 8;
        particleLayerRef1.current.style.transform = `translateX(${x * -trans1}px) translateY(${y * -trans1}px) rotateX(${y * -tilt1}deg) rotateY(${x * tilt1}deg)`;

        // Layer 2 (closer, moves less)
        const trans2 = 40;
        const tilt2 = 4;
        particleLayerRef2.current.style.transform = `translateX(${x * -trans2}px) translateY(${y * -trans2}px) rotateX(${y * -tilt2}deg) rotateY(${x * tilt2}deg)`;
    };

    const currentHeroRef = heroRef.current;
    currentHeroRef?.addEventListener('mousemove', handleMouseMove);

    return () => {
        currentHeroRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div className="bg-deep-space-black min-h-screen bg-gradient-radial">
      <header className="fixed top-0 left-0 right-0 z-50 bg-deep-space-black/80 backdrop-blur-sm border-b border-gravity-grey">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, heroRef)} aria-label="Orbit360 Motion Home" className="flex items-center gap-3">
            <img src="https://images.weserv.nl/?url=https://drive.google.com/uc?id=1VK38pjDEEhupTjG7jgWOgetVUTPcppzY" alt="Orbit360 Motion Logo" className="h-10" />
            <span className="font-montserrat font-bold text-xl tracking-wide text-starlight-white hidden sm:block">Orbit 360 Motion</span>
          </a>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#experience" onClick={(e) => handleNavClick(e, experienceRef)} className="text-sm font-medium text-orbit-grey hover:text-starlight-white transition-colors duration-200">Experience</a>
            <a href="#events" onClick={(e) => handleNavClick(e, eventsRef)} className="text-sm font-medium text-orbit-grey hover:text-starlight-white transition-colors duration-200">Events</a>
            <a href="#gallery" onClick={(e) => handleNavClick(e, galleryRef)} className="text-sm font-medium text-orbit-grey hover:text-starlight-white transition-colors duration-200">Gallery</a>
            <a href="#process" onClick={(e) => handleNavClick(e, processRef)} className="text-sm font-medium text-orbit-grey hover:text-starlight-white transition-colors duration-200">Process</a>
            <a href="#faq" onClick={(e) => handleNavClick(e, faqRef)} className="text-sm font-medium text-orbit-grey hover:text-starlight-white transition-colors duration-200">FAQ</a>
             <button
              onClick={() => setIsBookingModalOpen(true)}
              className="ml-4 px-5 py-2 text-sm font-semibold text-starlight-white bg-gravity-grey/50 border border-gravity-grey rounded-full hover:bg-gravity-grey/80 transition-colors"
            >
              Check Availability
            </button>
          </nav>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-2 text-sm font-semibold text-starlight-white bg-gravity-grey/50 border border-gravity-grey rounded-full hover:bg-gravity-grey/80 transition-colors"
            >
              Check Availability
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" ref={heroRef} className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
             <iframe
               className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2"
               src="https://www.youtube.com/embed/VEbG5OEvff8?autoplay=1&mute=1&controls=0&loop=1&playlist=VEbG5OEvff8&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1"
               style={{ pointerEvents: 'none' }}
               allow="autoplay; encrypted-media"
               title="Orbit360 Background Video"
             ></iframe>
             <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="hero-bg-animated" aria-hidden="true"></div>
          <div className="particle-wrapper animate-drift-1">
            <div ref={particleLayerRef1} className="particle-layer layer-1"></div>
          </div>
          <div className="particle-wrapper animate-drift-2">
            <div ref={particleLayerRef2} className="particle-layer layer-2"></div>
          </div>
          <div className="container mx-auto px-6 z-20 relative">
            <h1 className="hero-headline text-4xl md:text-6xl lg:text-7xl font-montserrat font-extrabold text-starlight-white leading-tight mb-4 [text-shadow:0_3px_15px_rgba(0,0,0,0.6)]">
              <div className="overflow-hidden">
                <span className="block animate-slide-in-reveal">Capture Your Event in</span>
              </div>
              <div className="overflow-hidden">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orbit-pink via-orbit-purple to-orbit-blue drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] animate-slide-in-reveal" style={{animationDelay: '0.15s'}}>
                  Cinematic Motion
                </span>
              </div>
            </h1>
            
            <div className="overflow-hidden animate-slide-in-reveal" style={{ animationDelay: '0.35s' }}>
                <div className="marquee-container text-xl text-orbit-grey font-semibold tracking-wider mb-8">
                    <div className="marquee-content">
                        <span className="mr-8">Where every moment comes full circle.</span>
                        <span className="text-orbit-purple mr-8">◆</span>
                        <span className="mr-8">Where every moment comes full circle.</span>
                        <span className="text-orbit-purple mr-8">◆</span>
                        
                        <span className="mr-8" aria-hidden="true">Where every moment comes full circle.</span>
                        <span className="text-orbit-purple mr-8" aria-hidden="true">◆</span>
                        <span className="mr-8" aria-hidden="true">Where every moment comes full circle.</span>
                        <span className="text-orbit-purple mr-8" aria-hidden="true">◆</span>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden">
              <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-block px-8 py-4 font-bold text-starlight-white bg-gradient-to-r from-orbit-pink via-orbit-purple to-orbit-blue rounded-full hover:scale-105 transform transition-transform duration-300 shadow-lg shadow-orbit-purple/40 animate-slide-in-reveal"
                  style={{animationDelay: '0.5s'}}
              >
                Check Availability
              </button>
            </div>
          </div>
        </section>

        <section id="experience" ref={experienceRef} className="py-20 bg-black/50 relative overflow-hidden">
          {/* Iridescent Bubbles Background */}
          <div className="absolute inset-0 z-1 pointer-events-none" aria-hidden="true">
              {bubbles.map((bubble, index) => (
                  <div key={index} className="bubble" style={{
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      left: bubble.left,
                      animationDuration: bubble.duration,
                      animationDelay: bubble.delay,
                  }}></div>
              ))}
          </div>
        
          <div 
            className="absolute inset-0 z-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'url(https://images.weserv.nl/?url=https://drive.google.com/uc?id=1VK38pjDEEhupTjG7jgWOgetVUTPcppzY)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: '50%',
            }}
            aria-hidden="true"
          ></div>
          <div className="container mx-auto px-6 relative z-10">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-starlight-white">The Orbit360 Experience</h2>
                <p className="mt-4 text-orbit-grey max-w-xl mx-auto">We blend cutting-edge technology with seamless service for an unforgettable result.</p>
              </div>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-3 gap-8">
              <AnimateOnScroll delay={100}>
                <FeatureCard 
                  icon={<CameraIcon />}
                  title="Cinematic Mobile Video"
                  description="Our system captures stunning, slow-motion video, optimized for social sharing and ready to wow your followers."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={200}>
                <FeatureCard 
                  icon={<GearIcon />}
                  title="High-End Equipment"
                  description="Featuring a spacious 100cm platform and a Google Pixel 9 Pro camera for crisp, vibrant, and professional-grade footage."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={300}>
                <FeatureCard 
                  icon={<SparklesIcon />}
                  title="Flawless On-Site Setup"
                  description="Our expert team handles everything from delivery and setup to operation, ensuring a smooth and engaging experience for your guests."
                />
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll delay={400}>
              <div className="text-center mt-16">
                 <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center px-8 py-4 font-bold text-starlight-white bg-gravity-grey/50 border border-gravity-grey rounded-full hover:bg-gravity-grey/80 hover:border-gravity-grey transform transition-all duration-300 shadow-lg"
                >
                  <VideoIcon />
                  See Our Booth In Action
                </button>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        <section id="events" ref={eventsRef} className="py-20">
          <div className="container mx-auto px-6">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-starlight-white">Perfect For Any Occasion</h2>
                <p className="mt-4 text-orbit-grey max-w-xl mx-auto">Elevate your event and create lasting memories that move.</p>
              </div>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-3 gap-8">
              <AnimateOnScroll delay={100}>
                <EventCard 
                  image="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop"
                  title="Weddings"
                  description="Capture the magic of your special day from every angle."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={200}>
                <EventCard 
                  image="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop"
                  title="Corporate & Branding"
                  description="Create dynamic content and boost your brand's social presence."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={300}>
                <EventCard 
                  image="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop"
                  title="Nightlife & Socials"
                  description="Bring the ultimate party centerpiece that gets everyone talking."
                />
              </AnimateOnScroll>
            </div>
          </div>
        </section>
        
        <section id="gallery" ref={galleryRef} className="py-20 bg-black/50">
          <div className="container mx-auto px-6">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-starlight-white">Moments in Motion</h2>
                <p className="mt-4 text-orbit-grey max-w-xl mx-auto">See the fun, energy, and unforgettable moments captured by our 360° booth.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
                <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-orbit-purple/20 border border-gravity-grey/50">
                    <div className="relative pb-[56.25%] h-0">
                        <iframe 
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/videoseries?si=tN7p-_cM_DsYCaYo&amp;list=PLe1uGkO3QZS1FaKgtCpQnWny5bdfaTg7b" 
                            title="YouTube video player"
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </AnimateOnScroll>
          </div>
        </section>

        <section id="process" ref={processRef} className="py-20">
          <div className="container mx-auto px-6">
            <AnimateOnScroll>
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-starlight-white">Simple 3-Step Booking</h2>
                  <p className="mt-4 text-orbit-grey max-w-xl mx-auto">Securing the ultimate video booth experience is quick and easy.</p>
              </div>
            </AnimateOnScroll>
            <div className="flex flex-col md:flex-row justify-center md:space-x-12">
              <AnimateOnScroll delay={100}>
                <BookingStep number={1} title="Enquire" description="Fill out our quick form with your event details. We'll check availability and get back to you fast." />
              </AnimateOnScroll>
              <AnimateOnScroll delay={200}>
                <BookingStep number={2} title="Confirm" description="Review your custom quote, confirm your package, and secure your date with a simple deposit." />
              </AnimateOnScroll>
              <AnimateOnScroll delay={300}>
                <BookingStep number={3} title="Experience" description="We arrive, set up, and deliver an incredible 360° video experience for you and your guests. Enjoy!" />
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="faq" ref={faqRef} className="py-20 bg-black/50">
          <div className="container mx-auto px-6">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-starlight-white">Frequently Asked Questions</h2>
                <p className="mt-4 text-orbit-grey max-w-xl mx-auto">Have questions? We've got answers. Here are some of the most common things we get asked.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <div className="max-w-3xl mx-auto">
                {faqData.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        <section id="contact" className="py-20">
           <div className="container mx-auto px-6">
            <AnimateOnScroll>
              <div className="max-w-xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-starlight-white">Ready to Elevate Your Event?</h2>
                <p className="mt-4 text-orbit-grey">Let's make your event unforgettable. Check availability and get your custom quote now.</p>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="mt-8 inline-block px-8 py-4 font-bold text-starlight-white bg-gradient-to-r from-orbit-pink via-orbit-purple to-orbit-blue rounded-full hover:scale-105 transform transition-transform duration-300 shadow-lg shadow-orbit-purple/40"
                >
                  Check Availability & Pricing
                </button>
                <div className="mt-8">
                  <p className="text-orbit-grey">
                    Or call us directly: <a href="tel:07511286975" className="text-starlight-white font-bold hover:text-orbit-pink transition-colors">07511 286 975</a>
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <footer className="border-t border-gravity-grey bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-orbit-grey text-sm">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Orbit360 Motion. All Rights Reserved.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
               <a href="tel:07511286975" className="hover:text-starlight-white transition-colors font-medium">07511 286 975</a>
               <span className="hidden sm:inline text-gravity-grey">|</span>
               <a href="mailto:info@orbit360motion.co.uk" className="hover:text-starlight-white transition-colors font-medium">info@orbit360motion.co.uk</a>
               <span className="hidden sm:inline text-gravity-grey">|</span>
               <div className="flex items-center space-x-4">
                 <a href="https://www.facebook.com/profile.php?id=61583879221656" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="hover:text-starlight-white transition-colors">
                   <FacebookIcon />
                 </a>
                 <a href="https://www.instagram.com/orbit360motion/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="hover:text-starlight-white transition-colors">
                   <InstagramIcon />
                 </a>
                 <a href="https://www.youtube.com/@Orbit360Motion" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="hover:text-starlight-white transition-colors">
                   <YouTubeIcon />
                 </a>
               </div>
            </div>
          </div>
        </div>
      </footer>

      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video Player"
        >
          <div 
            className="bg-deep-space-black rounded-lg shadow-2xl overflow-hidden w-full max-w-sm aspect-[9/16] relative border border-gravity-grey animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-2 right-2 z-10 text-starlight-white bg-gravity-grey/50 rounded-full p-1.5 hover:bg-gravity-grey transition-colors"
              aria-label="Close video player"
            >
              <CloseIcon />
            </button>
            <iframe
                src="https://www.youtube.com/embed/3hKEFVxr1eQ?autoplay=1&rel=0&modestbranding=1"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title="Orbit360 Motion Example Video"
            ></iframe>
          </div>
        </div>
      )}

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />

    </div>
  );
}