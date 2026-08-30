/**
 * XYZ FIT — White-Label Gym Configuration
 * ==========================================
 * This is the centralized configuration for the entire gym website.
 * To rebrand the website for a different gym, simply replace this file
 * or update the values through the admin dashboard.
 *
 * All components consume data from this configuration via GymContext.
 */

const gymConfig = {
  // ─── BRANDING ────────────────────────────────
  name: "XYZ FIT",
  tagline: "Train Smarter. Transform Faster.",
  description: "Premium AI-powered fitness platform delivering personalized training, expert coaching, and intelligent fitness programs designed to help you become your strongest self.",
  logo: null, // null = use text logo, or provide image URL

  branding: {
    primaryColor: "#FF3B30",
    secondaryColor: "#FF6A00",
    backgroundColor: "#050505",
    textColor: "#FFFFFF",
    mutedColor: "#A1A1A1",
  },

  // ─── ANNOUNCEMENT BAR ───────────────────────
  announcement: {
    enabled: true,
    text: "🔥 Newbie Special Offer — 30% OFF on all annual memberships!",
    link: "#pricing",
    linkText: "Claim Offer",
  },

  // ─── HERO SECTION ───────────────────────────
  hero: {
    badge: "",
    heading: ["TRAIN", "SMARTER.", "TRANSFORM", "FASTER."],
    accentLine: 3, // index of the line to highlight with accent color (0-based)
    subheading: "Personalized training, expert coaching, and intelligent fitness programs designed to help you become your strongest self.",
    primaryCTA: { text: "START TRAINING", link: "#trial" },
    secondaryCTA: { text: "VIEW PROGRAMS", link: "#programs" },
    image: "/images/hero-athlete.jpg",
    reviewBadge: {
      rating: 5,
      text: "Based on 5K+ Reviews",
    },
  },

  // ─── STATISTICS ─────────────────────────────
  stats: [
    { value: 5000, suffix: "+", label: "Active Members" },
    { value: 200, suffix: "+", label: "Expert Trainers" },
    { value: 98, suffix: "%", label: "Success Rate" },
    { value: 15, suffix: "+", label: "Years Experience" },
  ],

  // ─── SOCIAL PROOF ──────────────────────────
  socialProof: {
    heading: "Trusted by leading fitness professionals",
    brands: [
      "Nike Training",
      "Under Armour",
      "Adidas",
      "Reebok",
      "Puma",
      "MyFitnessPal",
    ],
  },

  // ─── PROGRAMS ───────────────────────────────
  programs: [
    {
      id: "strength-conditioning",
      name: "Strength and Conditioning",
      description: "Heavy weight training and machine workouts to build muscle mass and physical strength.",
      icon: "Dumbbell",
      difficulty: "Intermediate",
      duration: "60 min",
    },
    {
      id: "zumba",
      name: "Zumba",
      description: "A high-energy, dance-based cardio workout set to upbeat Latin and international music.",
      icon: "Music",
      difficulty: "All Levels",
      duration: "45 min",
    },
    {
      id: "yoga",
      name: "Yoga",
      description: "Traditional and modern variations (like Power Yoga) focused on flexibility, core strength, and mental wellness.",
      icon: "Heart",
      difficulty: "All Levels",
      duration: "60 min",
    },
    {
      id: "hiit",
      name: "High-Intensity Interval Training (HIIT)",
      description: "Quick, explosive bursts of exercise paired with short recovery periods for maximum calorie burn.",
      icon: "Zap",
      difficulty: "Advanced",
      duration: "30 min",
    },
    {
      id: "functional",
      name: "Functional Training",
      description: "Everyday movement exercises using tools like battle ropes, kettlebells, and TRX suspension straps.",
      icon: "Activity",
      difficulty: "Intermediate",
      duration: "50 min",
    },
    {
      id: "pt",
      name: "Personal Training (PT)",
      description: "Customized, one-on-one workout plans and form correction led by a certified fitness coach.",
      icon: "User",
      difficulty: "All Levels",
      duration: "60 min",
    },
    {
      id: "spinning",
      name: "Spinning",
      description: "Intense indoor group cycling classes designed to boost cardiovascular endurance and leg strength.",
      icon: "Timer",
      difficulty: "Intermediate",
      duration: "45 min",
    },
    {
      id: "aerobics",
      name: "Aerobics",
      description: "Classic rhythmic group exercise routines structured to improve heart health and stamina.",
      icon: "Flame",
      difficulty: "Beginner",
      duration: "45 min",
    },
  ],

  // ─── WHY CHOOSE US ──────────────────────────
  whyChooseUs: {
    heading: "Why Athletes Choose XYZ FIT",
    subheading: "We combine cutting-edge science with world-class coaching to deliver results that speak for themselves.",
    features: [
      {
        icon: "Users",
        title: "Elite Coaching Staff",
        description: "Every trainer holds international certifications with 5+ years of hands-on experience training diverse clients.",
      },
      {
        icon: "Shield",
        title: "Premium Equipment",
        description: "Train with industry-leading equipment from Rogue, Hammer Strength, and Life Fitness — maintained daily.",
      },
      {
        icon: "Clock",
        title: "Flexible Scheduling",
        description: "Open 18+ hours daily with classes every hour. Train when it works for you, not when it works for us.",
      },
      {
        icon: "Salad",
        title: "Nutrition Guidance",
        description: "Complimentary diet consultations and customized meal plans designed by certified sports nutritionists.",
      },
    ],
  },

  // ─── TRANSFORMATION ─────────────────────────
  transformation: {
    heading: "Real People. Real Results.",
    subheading: "Our members don't just train — they transform. Here's proof that the XYZ FIT system delivers.",
    stats: [
      { value: "15K+", label: "Transformations Completed" },
      { value: "4.9", label: "Average Rating" },
      { value: "92%", label: "Members See Results in 30 Days" },
    ],
    quote: "I lost 22kg in 6 months. XYZ FIT didn't just change my body — it changed my entire life. The coaches here genuinely care about your success.",
    author: "Priya Sharma",
    authorRole: "Member since 2022",
    image: "/images/transformation.jpg",
  },

  // ─── TRAINERS ───────────────────────────────
  trainers: [
    {
      id: "alex",
      name: "Siya",
      role: "Mobility and Flexibility Coach",
      experience: "8+ Years",
      specialization: ["Strength", "Hypertrophy", "Conditioning"],
      bio: "Former national-level powerlifter with NSCA-CSCS certification. Siya has helped 500+ clients achieve their strength goals through evidence-based programming.",
      image: "/images/trainer-1.jpg",
      social: {
        instagram: "#",
        twitter: "#",
      },
    },
    {
      id: "sarah",
      name: "Ronnie",
      role: "Performance Coach",
      experience: "6+ Years",
      specialization: ["HIIT", "Athletic Performance", "Mobility"],
      bio: "ACE-certified trainer and former collegiate athlete. Ronnie specializes in high-intensity training and sports performance optimization.",
      image: "/images/trainer-2.jpg",
      social: {
        instagram: "#",
        twitter: "#",
      },
    },
    {
      id: "raj",
      name: "Cbum",
      role: "Transformation Specialist",
      experience: "10+ Years",
      specialization: ["Weight Loss", "Body Recomposition", "Nutrition"],
      bio: "With a decade of experience and ISSA certification, Cbum has guided over 1,000 successful body transformations with his holistic approach.",
      image: "/images/trainer-3.jpg",
      social: {
        instagram: "#",
        twitter: "#",
      },
    },
    {
      id: "maya",
      name: "Sam",
      role: "Strength Training Coach",
      experience: "7+ Years",
      specialization: ["Functional Training", "Rehabilitation", "Yoga"],
      bio: "CrossFit L3 trainer and certified instructor. Sam brings a unique blend of strength and flexibility training to every session.",
      image: "/images/trainer-4.jpg",
      social: {
        instagram: "#",
        twitter: "#",
      },
    },
  ],

  // ─── MEMBERSHIP PLANS ───────────────────────
  plans: [
    {
      id: "monthly",
      name: "MONTHLY",
      price: 999,
      currency: "₹",
      period: "month",
      description: "Perfect for getting started on your fitness journey",
      isPopular: false,
      features: [
        { text: "Full Gym Access", included: true },
        { text: "Locker Access", included: true },
        { text: "Cardio & Free Weights", included: true },
        { text: "Group Classes", included: true },
        { text: "Personal Training", included: false },
        { text: "Diet Guidance", included: false },
      ],
      cta: "Explore More",
    },
    {
      id: "half-yearly",
      name: "HALF YEARLY",
      price: 3999,
      currency: "₹",
      period: "6 months",
      description: "Our most popular plan for serious fitness enthusiasts",
      isPopular: true,
      features: [
        { text: "Full Gym Access", included: true },
        { text: "Premium Locker + Towel", included: true },
        { text: "Cardio & Free Weights", included: true },
        { text: "Unlimited Group Classes", included: true },
        { text: "2 PT Sessions / Month", included: true },
        { text: "Basic Diet Guidance", included: true },
      ],
      cta: "Explore More",
    },
    {
      id: "yearly",
      name: "YEARLY",
      price: 8999,
      currency: "₹",
      period: "year",
      description: "Commit to your fitness and save big",
      isPopular: false,
      features: [
        { text: "24/7 Priority Access", included: true },
        { text: "VIP Locker + Amenities", included: true },
        { text: "Cardio & Free Weights", included: true },
        { text: "Unlimited Group Classes", included: true },
        { text: "4 PT Sessions / Month", included: true },
        { text: "Custom Nutrition Plan", included: true },
      ],
      cta: "Explore More",
    },
  ],

  // ─── TESTIMONIALS ───────────────────────────
  testimonials: [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "Software Engineer",
      rating: 5,
      text: "XYZ FIT completely transformed my approach to fitness. The AI-powered programs adapted perfectly to my schedule, and I gained 8kg of lean muscle in just 5 months. The trainers are incredibly knowledgeable.",
      image: "/images/testimonial-1.jpg",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Marketing Director",
      rating: 5,
      text: "I've been to many gyms, but nothing compares to XYZ FIT. Lost 22kg in 6 months with their transformation program. The community, the coaching, the facilities — everything is world-class.",
      image: "/images/testimonial-2.jpg",
    },
    {
      id: 3,
      name: "Vikram Singh",
      role: "Entrepreneur",
      rating: 5,
      text: "The premium experience at XYZ FIT is unmatched. From the equipment quality to the personalized attention from coaches, every detail shows they care about results. Best investment in my health.",
      image: "/images/testimonial-3.jpg",
    },
    {
      id: 4,
      name: "Ananya Roy",
      role: "Doctor",
      rating: 5,
      text: "As a medical professional, I appreciate XYZ FIT's evidence-based approach. The progress tracking and data-driven programming gave me measurable results I could trust. Highly recommended.",
      image: "/images/testimonial-4.jpg",
    },
    {
      id: 5,
      name: "Karan Gupta",
      role: "College Student",
      rating: 5,
      text: "The beginner program at XYZ FIT was perfect for me. The trainers were patient, the environment was encouraging, and I never felt judged. Now I train 5 days a week and love every session.",
      image: "/images/testimonial-5.jpg",
    },
  ],

  // ─── GALLERY ────────────────────────────────
  gallery: [
    { id: 1, image: "/images/gallery-1.jpg", caption: "Dumbbell section", category: "Facility" },
    { id: 2, image: "/images/gallery-2.jpg", caption: "Back workout section", category: "Training" },
    { id: 3, image: "/images/gallery-3.jpg", caption: "Leg workout section", category: "Training" },
    { id: 4, image: "/images/gallery-4.jpg", caption: "Chest workout section", category: "Training" },
    { id: 5, image: "/images/gallery-5.jpg", caption: "Arms workout section", category: "Training" },
    { id: 6, image: "/images/gallery-6.jpg", caption: "Yoga & Cardio section", category: "Classes" },
    { id: 7, image: "/images/gallery-7.jpg", caption: "Deadlift section", category: "Facility" },
    { id: 8, image: "/images/gallery-8.jpg", caption: "Premium Equipment", category: "Facility" },
  ],

  // ─── FAQ ────────────────────────────────────
  faq: [
    {
      question: "What are your operating hours?",
      answer: "We're open Monday to Friday from 5:00 AM to 11:00 PM, and Saturday–Sunday from 6:00 AM to 10:00 PM. Elite members enjoy 24/7 access with their keycard.",
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! We offer a complimentary 1-day trial pass that includes full gym access, one group class, and a fitness assessment with our coaches. Book yours through our website or call us directly.",
    },
    {
      question: "Can beginners join XYZ FIT?",
      answer: "Absolutely. Our Beginner Program is specifically designed for those new to fitness. You'll get guided workouts, form correction, and gradual progression with a dedicated coach to ensure you build a strong, safe foundation.",
    },
    {
      question: "What's included in the Personal Training sessions?",
      answer: "Each PT session includes a customized workout plan, real-time form correction, progress tracking, nutritional guidance, and post-session recovery recommendations. Sessions are 60 minutes with a certified trainer.",
    },
    {
      question: "Can I freeze or cancel my membership?",
      answer: "Yes. You can freeze your membership for up to 30 days per year at no extra cost. Cancellation requires a 15-day notice before your next billing cycle. No hidden fees or long-term contracts.",
    },
    {
      question: "Do you provide nutrition and diet plans?",
      answer: "Pro members receive basic dietary guidance, while Elite members get a fully customized nutrition plan designed by our certified sports nutritionists, including meal prep guidelines and supplement recommendations.",
    },
    {
      question: "Is parking available?",
      answer: "Yes, we offer free parking for all members. Our facility has a dedicated parking lot with 50+ spaces, and bike parking is also available near the entrance.",
    },
  ],

  // ─── CONTACT ────────────────────────────────
  contact: {
    phone: "+91 98765 43xyz",
    email: "hello@xyzfit.in",
    address: "Main Road, Bistupur, Jamshedpur, Jharkhand 831001",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5555!2d77.6245!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA2LjciTiA3N8KwMzcnMjguMiJF!5e0!3m2!1sen!2sin!4v1234567890",
  },

  // ─── HOURS ──────────────────────────────────
  hours: [
    { days: "Monday – Friday", time: "5:00 AM – 11:00 PM" },
    { days: "Saturday – Sunday", time: "6:00 AM – 10:00 PM" },
    { days: "Public Holidays", time: "7:00 AM – 8:00 PM" },
  ],

  // ─── SOCIAL MEDIA ───────────────────────────
  social: {
    instagram: "https://instagram.com/XYZ FIT",
    facebook: "https://facebook.com/XYZ FIT",
    youtube: "https://youtube.com/XYZ FIT",
    twitter: "https://twitter.com/XYZ FIT",
  },

  // ─── ABOUT ──────────────────────────────────
  about: {
    shortDescription: "Founded in 2019, XYZ FIT has grown from a single studio to a premium fitness ecosystem serving 5,000+ members across multiple locations.",
    mission: "To democratize world-class fitness by combining artificial intelligence with human expertise, making personalized training accessible to everyone.",
    values: [
      "Science-backed training",
      "Community-driven growth",
      "Continuous innovation",
      "Results above everything",
    ],
  },

  // ─── FINAL CTA ──────────────────────────────
  finalCTA: {
    heading: "YOUR TRANSFORMATION STARTS TODAY",
    subheading: "Join 5,000+ members who chose to become their strongest selves. Your first session is on us.",
    buttonText: "START YOUR FREE TRIAL",
    buttonLink: "#trial",
  },

  // ─── FOOTER ─────────────────────────────────
  footer: {
    description: "Premium AI-powered fitness platform delivering personalized training and expert coaching.",
    quickLinks: [
      { text: "Home", href: "#home" },
      { text: "Programs", href: "#programs" },
      { text: "Trainers", href: "#trainers" },
      { text: "Membership", href: "#pricing" },
      { text: "Gallery", href: "#gallery" },
      { text: "Contact", href: "#contact" },
    ],
    legalLinks: [
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms" },
      { text: "Refund Policy", href: "/refund" },
    ],
    copyright: "© 2024 XYZ FIT. All rights reserved.",
  },
};

export default gymConfig;
