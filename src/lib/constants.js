import Image from "next/image";

export const COMPANY = {
  name: 'Yogesh Chavan Associates',
  shortName: 'YCA',
  tagline: 'Crafting Timeless Spaces',
  description: 'A premier architecture and interior design studio creating thoughtful, refined spaces that transcend trends and stand the test of time.',
  phone: '+91 96571 19911',
  email: 'studio@yogeshchavan.com',
  whatsapp: '+919657119911',
  address: {
    line1: 'Near Clai Showroom',
    line2: 'Old Station Road, Azad Chowk, Sangli',
    city: 'Sangli',
    state: 'Maharashtra',
    country: 'India',
  },
  hours: 'Mon – Sat: 10:00 AM – 6:30 PM',
  social: {
    instagram: 'https://www.instagram.com/yogeshchavan_associates?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    linkedin: 'https://linkedin.com/company/yogeshchavanassociates',
    pinterest: 'https://pinterest.com/yogeshchavanassociates',
    facebook: 'https://facebook.com/yogeshchavanassociates',
  },
  founded: '2011',
  projectsCompleted: '250+',
  teamSize: '35+',
  experience: '15+',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES = [
  {
    id: 'residential',
    title: 'Residential Interiors',
    subtitle: 'Living Redefined',
    description: 'Bespoke residential spaces that reflect your personality, lifestyle, and aspirations. From luxury apartments to sprawling villas, every detail is curated with intention.',
    image: "https://res.cloudinary.com/dmjaisk94/image/upload/v1785406762/Recidential_Interior_wqnad2.jpg",
  },
  {
    id: 'commercial',
    title: 'Commercial Design',
    subtitle: 'Spaces That Perform',
    description: 'Strategic commercial interiors that elevate brand identity and optimize functionality. Hotels, restaurants, retail spaces, and corporate headquarters designed to inspire.',
    image: "https://res.cloudinary.com/dmjaisk94/image/upload/v1786813639/CEE94C44-3033-4907-9AC8-549A709C6526_ha2fyi.png",
  },
  // {
  //   id: 'office',
  //   title: 'Office Interiors',
  //   subtitle: 'Work, Elevated',
  //   description: 'Modern workspaces that foster productivity, collaboration, and well-being. We design offices where culture and creativity thrive.',
  //   image: "https://res.cloudinary.com/dmjaisk94/image/upload/v1785406795/The_Grand_Shaurya_10_of_13_1_lcycru.jpg",
  // },
  // {
  //   id: 'kitchen',
  //   title: 'Modular Kitchens',
  //   subtitle: 'The Heart of Home',
  //   description: 'Precision-engineered modular kitchens that combine aesthetics with ergonomic excellence. Italian finishes, German hardware, Indian sensibility.',
  //   image: "https://res.cloudinary.com/dmjaisk94/image/upload/v1785406680/IMG_5233_j4li14.jpg",
  // },
  // {
  //   id: 'turnkey',
  //   title: 'Turnkey Projects',
  //   subtitle: 'Concept to Completion',
  //   description: 'End-to-end project execution from conceptual design through final installation. One point of contact, zero compromise on quality.',
  //   image: "https://res.cloudinary.com/dmjaisk94/image/upload/v1785406274/Grand_Shaurya_1_of_15_1_1_pj1lj0.jpg",
  // },
  {
    id: 'architecture',
    title: 'Architecture Consultancy',
    subtitle: 'Form Follows Vision',
    description: 'Architectural design and consultancy that shapes buildings with purpose. Sustainable, context-sensitive design that respects both site and aspiration.',
    image: "https://res.cloudinary.com/dmjaisk94/image/upload/v1786813429/9F7ED9F2-EF4F-4976-A7C1-9B5D3504DDF2_jjhwix.png",
  },
  {
    id: 'jewellery',
    title: 'Jewellery Store Design',
    subtitle: 'Where Architecture Meets Adornment',
    description: 'We create distinctive jewellery stores where architecture, interiors, lighting, and display come together seamlessly.',
    image: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1785751941/Fancy_re_1_habzol.jpg',
  },
  // {
  //   id: 'furniture',
  //   title: 'Furniture Design',
  //   subtitle: 'Object & Intention',
  //   description: 'Custom furniture pieces designed and crafted for your space. Each piece is a dialogue between material, form, and the way you live.',
  //   image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  // },
  // {
  //   id: 'landscape',
  //   title: 'Landscape Design',
  //   subtitle: 'Nature, Curated',
  //   description: 'Landscape architecture that creates harmonious outdoor spaces, from intimate courtyard gardens to expansive estate grounds.',
  //   image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
  // },
  // {
  //   id: 'visualization',
  //   title: '3D Visualization',
  //   subtitle: 'See Before You Build',
  //   description: 'Photorealistic 3D renders and walkthroughs that bring your vision to life before a single material is ordered.',
  //   image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  // },
  // {
  //   id: 'space-planning',
  //   title: 'Space Planning',
  //   subtitle: 'The Invisible Art',
  //   description: 'Strategic spatial planning that optimizes flow, function, and feeling. The foundation upon which great design is built.',
  //   image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  // },
  // {
  //   id: 'project-management',
  //   title: 'Project Management',
  //   subtitle: 'Precision Delivered',
  //   description: 'Professional project management ensuring timelines, budgets, and quality standards are met without exception.',
  //   image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  // },
];

export const PROJECTS = [
  {
    id: 'kanchan-villa',
    title: 'Kanchan Villa',
    category: 'Residential',
    location: 'Nagaland chowk manish nagar, Pandharpur',
    year: '2024',
    area: '2,700 sq ft',
    image: "https://res.cloudinary.com/dmjaisk94/image/upload/v1785406717/IMG_5239_jzrtz2.jpg",
    description: 'A celebration of understated luxury and refined living, Kanchan Villa blends timeless architecture, abundant natural light, and impeccable craftsmanship into a sanctuary of effortless elegance.',
    duration: '2 Years',
    gallery: [
      'https://res.cloudinary.com/dmjaisk94/image/upload/v1785431587/Kanchan_Villa_IMG_i7jfmj.jpg',
      'https://res.cloudinary.com/dmjaisk94/image/upload/v1785406564/IMG_5212_ggotmt.jpg',
    ],
  },
  {
    id: 'grand-shaurya',
    title: 'Grand Shaurya',
    category: 'Commercial',
    location: 'Atpadi, Sangli',
    year: '2024',
    area: '3,000 sq ft',
    image: "https://res.cloudinary.com/dmjaisk94/image/upload/v1787445270/The_Grand_Shaurya_9_of_13_1_ccuu9c.jpg",
    description: 'A statement of refined luxury, where timeless materials, sculptural design, and meticulous craftsmanship create an atmosphere of effortless elegance.',
    duration: '2.5 Years',
    gallery: [
      'https://res.cloudinary.com/dmjaisk94/image/upload/v1785406435/Grand_Shaurya_7_of_15_1_dgdlbn.jpg',
      'https://res.cloudinary.com/dmjaisk94/image/upload/v1785440347/The_Grand_Shaurya_1_of_13_1_li6ic5.jpg',
    ],
  },
  {
    id: 'ganga-gold',
    title: 'Ganga Gold',
    category: 'Hospitality',
    location: 'Pandharpur',
    year: '2023',
    area: '8,500 sq ft',
    image: "https://res.cloudinary.com/dmjaisk94/image/upload/v1785406213/Ganga_Gold_qsypm5.jpg",
    description: 'Designed with precision and built for excellence, this landmark seamlessly combines contemporary aesthetics with functional luxury.',
    duration: '8 months',
    gallery: [
      'https://res.cloudinary.com/dmjaisk94/image/upload/v1785406213/Ganga_Gold_qsypm5.jpg',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    ],
  },
  // {
  //   id: 'pandharipuram-palace',
  //   title: 'Pandharipuram Palace',
  //   category: 'Residential',
  //   location: 'Isbavi, Pandharpur',
  //   year: '2023',
  //   area: '1,800 sq ft',
  //   image: "https://res.cloudinary.com/dmjaisk94/image/upload/v1785406736/Pandharpuram_plaza_1_ddmobr.jpg",
  //   description: 'A study in restraint — black, white, and the textures between. Proof that limitation breeds creativity.',
  //   materials: 'Italian Marble, Teak, Brass, Linen',
  //   duration: '8 months',
  //   gallery: [
  //     'https://res.cloudinary.com/dmjaisk94/image/upload/v1785748529/Pandharpuram_Palace_bxk16u.webp',
  //     'https://res.cloudinary.com/dmjaisk94/image/upload/v1785748529/Pandharpuram_Palace_2_ijthbr.jpg',
  //   ],
  // },
  {
    id: 'fancy-re-jewellery-studio',
    title: 'Fancy Re Jewellery Studio',
    category: 'Jewellery',
    location: 'Sangli',
    year: '2024',
    area: '320 sq ft',
    image: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1785751941/Fancy_re_1_habzol.jpg',
    description: 'A culinary workspace where Italian marble meets Japanese joinery, designed for the passionate home chef.',
    duration: '8 months',
    gallery: [
      'https://res.cloudinary.com/dmjaisk94/image/upload/v1785751941/Fancy_re_2_evfgmx.jpg',
      'https://res.cloudinary.com/dmjaisk94/image/upload/v1785751941/Fancy_re_1_habzol.jpg',
    ],
  },
  {
    id: 'dr-gholaps-residence',
    title: "Dr. Gholap's Residence",
    category: 'Residential',
    location: 'Sangli',
    year: '2024–2025',
    area: '3,000 sq ft',
    image: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1785406762/Recidential_Interior_wqnad2.jpg',
    description: 'A contemporary residence that balances openness and privacy, designed around the rhythms of daily life with generous proportions, curated textures, and abundant natural light.',
    duration: '1.5 Years',
    gallery: [],
  },
  {
    id: 'maharaja-jewellers',
    title: 'Maharaja Jewellers',
    category: 'Jewellery',
    location: 'Sangli',
    year: '2025–2026',
    area: '900 sq ft',
    image: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1786814911/333CC337-F49A-4CFB-8FF9-151737EFC390_lobmao.png',
    description: 'A regal jewellery showroom where opulent interiors, precision lighting, and considered display design create an immersive brand experience from the threshold inward.',
    duration: '1.5 Years',
    gallery: [],
  },
  // {
  //   id: 'lumiere-restaurant',
  //   title: 'Lumière Restaurant',
  //   category: 'Hospitality',
  //   location: 'Camp, Pune',
  //   year: '2023',
  //   area: '3,200 sq ft',
  //   image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
  //   description: 'Fine dining reimagined — where the architecture is as memorable as the cuisine.',
  //   materials: 'Italian Marble, Teak, Brass, Linen',
  //   duration: '8 months',
  //   gallery: [
  //     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
  //     'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
  //   ],
  // },
];

// Supplementary photography for the portfolio collage. Stored as Cloudinary public
// IDs rather than finished URLs so the same image can be requested at a thumbnail
// width for the wall and a larger width when opened full screen.
export { cloudinaryImage } from './cloudinary';

export const PORTFOLIO_GALLERY = [
  'v1787547828/EXTERIOR_VIEW_FOR_HOTEL_SAYAJIRAJE_PALACE_AT_-AKLUJ_2_fg4scb.png',
  'v1785406274/Grand_Shaurya_1_of_15_1_1_pj1lj0.jpg',
  'v1786814911/333CC337-F49A-4CFB-8FF9-151737EFC390_lobmao.png',
  'v1785431587/Kanchan_Villa_IMG_i7jfmj.jpg',
  'v1785822471/The_Grand_Shaurya_20_of_25_1_mempkl.jpg',
  'v1785751941/Fancy_re_2_evfgmx.jpg',
  'v1787547852/111_ifzepk.png',
  'v1785406403/Grand_Shaurya_2_of_15_1_qedt9o.jpg',
  'v1786814934/F4A9E657-90FC-4C7A-9239-D2DE51588728_qehbrb.png',
  'v1785406564/IMG_5212_ggotmt.jpg',
  'v1785406825/The_Grand_Shaurya_19_of_25_1_vk4p3j.jpg',
  'v1785757036/insta1_vixgkq.jpg',
  'v1786813429/9F7ED9F2-EF4F-4976-A7C1-9B5D3504DDF2_jjhwix.png',
  'v1785406435/Grand_Shaurya_7_of_15_1_dgdlbn.jpg',
  'v1786904793/DFB79894-C02F-4508-A161-567AAFA73E9F_grriwr.png',
  'v1785406680/IMG_5233_j4li14.jpg',
  'v1787139206/The_Grand_Shaurya_16_of_25_1_thohpm.jpg',
  'v1785757189/insta2_di30h0.jpg',
  'v1786813639/CEE94C44-3033-4907-9AC8-549A709C6526_ha2fyi.png',
  'v1785406762/Recidential_Interior_wqnad2.jpg',
  'v1785822621/The_Grand_Shaurya_8_of_25_1_a7fqhg.jpg',
  'v1785406630/IMG_5216_jbygfj.jpg',
  'v1786904900/7D2AF0F1-C2FC-4FAF-8906-0194B879828F_duerf5.png',
  'v1785406736/Pandharpuram_plaza_1_ddmobr.jpg',
  'v1785440347/The_Grand_Shaurya_1_of_13_1_li6ic5.jpg',
  'v1785757761/insta3_vqu5k3.webp',
  'v1786814982/7C79AE14-61A3-4435-9983-68943FB83BF0_crwo6y.png',
  'v1785406795/The_Grand_Shaurya_10_of_13_1_lcycru.jpg',
  'v1785748529/Pandharpuram_Palace_2_ijthbr.jpg',
  'v1786814984/0F28CF92-69E0-4702-AAFC-8B72D4ADF00E_gv7p0a.png',
];

export const TESTIMONIALS = [
  {
    quote: 'They did not just design our home — they understood how we live, how we breathe, and translated that into spaces that feel intrinsically ours.',
    author: 'Priya & Rohan Mehta',
    project: 'Kanchan Villa, Koregaon Park',
    role: 'Homeowners',
  },
  {
    quote: 'The attention to detail is extraordinary. Every corner, every texture, every light fixture tells a story. Our office feels like a second home.',
    author: 'Anand Kulkarni',
    project: 'Grand Shaurya, Hinjewadi',
    role: 'CEO, NexaTech Solutions',
  },
  {
    quote: 'Working with Yogesh and his team was an education in taste. They challenged our assumptions and delivered something far beyond our imagination.',
    author: 'Meera Deshpande',
    project: 'Ganga Gold, Pandharpur',
    role: 'Resort Owner',
  },
  {
    quote: 'From concept to completion, the process was seamless. They managed everything with precision while keeping the creative vision alive.',
    author: 'Vikram Joshi',
    project: 'Lumière Restaurant, Camp',
    role: 'Restaurateur',
  },
];

export const PROCESS_STEPS = [
  {
    title: 'Discover',
    description: 'We begin by listening. Understanding your lifestyle, aspirations, and the story you want your space to tell.',
    details: 'Site visit, client brief, mood boards, inspiration gathering',
  },
  {
    title: 'Envision',
    description: 'Concepts take shape through sketches, 3D visualizations, and material explorations that bring your vision into focus.',
    details: 'Conceptual design, 3D renders, material palette, spatial planning',
  },
  {
    title: 'Refine',
    description: 'Every detail is refined through collaborative iteration — from furniture selections to lighting design to color studies.',
    details: 'Detailed drawings, material finalization, vendor coordination',
  },
  {
    title: 'Craft',
    description: 'Our team of skilled artisans and project managers bring the design to life with uncompromising attention to quality.',
    details: 'Construction management, quality control, installation, styling',
  },
  {
    title: 'Reveal',
    description: 'The moment of transformation — when concept becomes reality and a space becomes unmistakably yours.',
    details: 'Final walkthrough, photography, handover, aftercare support',
  },
];

export const TEAM_MEMBERS = [
  {
    name: 'Yogesh Chavan',
    role: 'Principal Architect & Founder',
    bio: 'With over 16 years in the industry, Yogesh brings a philosophy of purposeful minimalism to every project.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Sneha Patil',
    role: 'Design Director',
    bio: 'Sneha leads the creative vision, blending contemporary aesthetics with cultural sensitivity and material innovation.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'Arjun Desai',
    role: 'Senior Architect',
    bio: 'A structural thinker with a poet\'s eye, Arjun bridges engineering precision with spatial poetry.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Kavita Sharma',
    role: 'Interior Stylist',
    bio: 'Kavita curates the finishing layer — art, objects, textiles — that transforms designed spaces into lived-in homes.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
];

export const AWARDS = [
  { title: 'Best Residential Design', org: 'Indian Design Awards', year: '2024' },
  { title: 'Excellence in Sustainable Design', org: 'Green Building Council', year: '2023' },
  { title: 'Interior Design Firm of the Year', org: 'Architecture Digest India', year: '2023' },
  { title: 'Best Commercial Space', org: 'IIID Design Awards', year: '2022' },
  { title: 'Emerging Studio Award', org: 'FOAID', year: '2021' },
];
