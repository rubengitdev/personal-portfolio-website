import { Project, BioStory, PhotoReelItem } from "./types";

export const projectsData: Project[] = [
  {
    id: "amazaincms",
    title: "Amazain CMS",
    subtitle:
      "A content management system built to help the Amazain team update, manage, and publish their service offerings with confidence.",
    category: "Amazain Training & Consulting, inc.",
    tagline: "(CONTRACT PROJECT)",
    themeColor: "#4f46e5",
    shadowColor: "shadow-[6px_6px_0px_0px_#4f46e5]",
    borderColor: "border-[#4f46e5]/40",
    bgHoverColor: "hover:bg-[#4f46e5]/5",
    timeline: "Nov 2024 - Dec 2024 (6 weeks)",
    role: "UI/UX Designer",
    team: "1 UI/UX Designer (Me), 1 Backend Developer, 1 Frontend Developer",
    context:
      "Amazain CMS was created to simplify how the Amazain team manages service content on their website. The goal was straightforward: make updating service information faster, easier, and less dependent on technical expertise. Working closely with the client and development team, we designed a solution tailored to their day-to-day workflow.",
    problem:
      "Amazain regularly launches new services, training programs, and campaigns. Keeping all of this information accurate and up to date became increasingly challenging, especially in a competitive online market where outdated content can quickly reduce credibility and visibility.",
    solution:
      "We designed a clean and intuitive CMS that allows the team to manage service information with minimal effort. The focus was on clarity, simplicity, and reducing the learning curve for non-technical users.",
    opportunityStatement:
      "How might we create a content management experience that feels as familiar as a spreadsheet, while remaining structured, scalable, and easy to maintain?",
    lessonsLearned: [
      "Building a CMS isn't the difficult part. Building one that feels natural for people who spend most of their day in spreadsheets is where the real design challenge begins.",
      "Simple interfaces often require the most thoughtful decisions. Every feature should earn its place.",
      "Usability testing early saves time, assumptions, and a surprising number of future meetings.",
    ],
  },
  {
    id: "notion",
    title: "Notion Design Optimization",
    subtitle:
      "Designing UI/UX update for Notion Mobile App to enhance user main flow and effectiveness.",
    category: "Personal",
    tagline: "(PERSONAL PROJECT)",
    themeColor: "#e11d48",
    shadowColor: "shadow-[6px_6px_0px_0px_#e11d48]",
    borderColor: "border-[#e11d48]/40",
    bgHoverColor: "hover:bg-[#e11d48]/5",
    timeline: "Februari 2026 - Februari 2024 (2 weeks)",
    role: "Product Designer",
    team: "1 Designer (Me)",
    context:
      "As a frequent Notion user, I often found myself navigating through multiple screens and interactions to complete simple tasks on mobile. This project started as a personal challenge to identify friction points in the existing experience and explore opportunities to make common workflows faster and more intuitive.",
    problem:
      "While Notion offers powerful flexibility, some mobile interactions can feel overwhelming, especially when users need quick access to frequently used actions. The abundance of options sometimes creates unnecessary steps and cognitive load during everyday use.",
    solution:
      "I redesigned key user flows with a focus on reducing interaction costs, improving discoverability, and helping users complete common tasks more efficiently. The concept emphasizes clarity, speed, and maintaining the flexibility that makes Notion valuable.",
    opportunityStatement:
      "How might we simplify the most common mobile workflows in Notion without sacrificing the flexibility that power users rely on?",
    lessonsLearned: [
      "Designing for a product used by millions requires balancing simplicity with flexibility—improving one often impacts the other.",
      "Personal assumptions are useful starting points, but user behavior should always guide design decisions.",
      "The best redesigns don't reinvent everything; they remove friction from what already works.",
      "A feature isn't truly 'easy to find' if users need a treasure map and three taps to reach it.",
    ],
  },
  {
    id: "eyemarket",
    title: "Bringing the Magic to Meetups.",
    subtitle:
      "Solving complex social coordination problems to make catching up effortless.",
    category: "Eyegil",
    tagline: "(PASSION PROJECT)",
    themeColor: "#8b5cf6",
    shadowColor: "shadow-[6px_6px_0px_0px_#8b5cf6]",
    borderColor: "border-[#8b5cf6]/40",
    bgHoverColor: "hover:bg-[#8b5cf6]/5",
    timeline: "Jan 2023 - Present (Ongoing)",
    role: "Co-Founder & Lead Designer",
    team: "3 Engineers, 1 Product Manager",
    context:
      "Mezzo was born from a personal frustration: trying to get a large group of busy college students or friends together in one place is an absolute nightmare. Over-calendaring, endless group text messages, and indecision on venues kills plans before they start.",
    problem:
      "Traditional calendar tools are cold and transactional (built for corporate meetings, not friendly get-togethers). On the other extreme, casual chat groups lack structural polling capabilities: polls get lost, responses are hidden, and selecting a win-win time requires human arithmetic.",
    solution:
      "A mobile-first, geo-coordinated social planner. Mezzo combines real-time 'heatmaps' of shared calendar Availability with an intelligent Yelp API venue suggesting card picker, enabling a host to deploy a finalized plan card to any group chat link in seconds.",
    opportunityStatement:
      "How might we design a playful, low-pressure coordination space that turns scheduling from a chore into an exciting prelude to the meetup?",
    lessonsLearned: [
      "The value of custom physics hooks and micro-interactions in mobile apps cannot be overstated; card-swipes and visual sliders encourage user high engagement.",
      "Design for the passive user: most people won't register for a new app just to respond to an invite; the web-rsvp layout must load in under 1.5 seconds and work flawlessly.",
      "Iterating with real users yields non-obvious requests: we realized privacy was a massive factor—people didn't want their full calendar synced, only their free-time blocks.",
    ],
  },
  {
    id: "bear",
    title: "A Card Game for the Whole Den.",
    subtitle:
      "A physical-digital tabletop deck created to bring families together.",
    category: "THE BEAR GAME",
    tagline: "(PASSION PROJECT)",
    themeColor: "#16a34a",
    shadowColor: "shadow-[6px_6px_0px_0px_#16a34a]",
    borderColor: "border-[#16a34a]/40",
    bgHoverColor: "hover:bg-[#16a34a]/5",
    timeline: "May 2020 - Dec 2021 (18 months)",
    role: "Lead Illustrator & Mechanics Designer",
    team: "Self & 2 Childhood Friends",
    context:
      "When COVID-19 hit and everyone was locked inside with their immediate families, social friction was high and fun was scarce. We set out to design a quick-to-learn, hilarious physical tabletop card game to spark laughter and connection across different age groups.",
    problem:
      "Most modern board games are either too simple (and boring after 3 rounds) or incredibly complex (taking 45 minutes of reading manuals before writing a turn). We needed a sweet spot of accessibility, visual delight, and rich replay value.",
    solution:
      "The Bear Game. Our mechanics combine competitive card-stealing with hidden-roll trapdoors. I illustrated over 80+ quirky bear-themed characters (like the 'Grizzly Hacker' and 'Panda-Monium') in highly saturated flat vector graphics, matching the physical cards with a companion app for special event rules.",
    opportunityStatement:
      "How might we build a tactile and digital playground that prompts multi-generational players to interact, scheme, and laugh together within 5 minutes of opening the box?",
    lessonsLearned: [
      "Illustration is storytelling: custom vector illustration choices dictate the exact emotional reaction a player has to drawing a card.",
      "Supply chain and manufacturing are real design constraints: managing card stocks, glossy coatings, and box sizes made me a better systemic planner.",
      "Continuous playtesting matches numbers to feelings: we designed a digital spreadsheet to simulate card frequency probability to ensure games balanced nicely.",
    ],
  },
];

export const bioStory: BioStory = {
  longer: [
    {
      title: "Chapter 1: The Day I Thought I Was a Genius",
      paragraphs: [
        "Back when I first discovered the world of digital creation, I had the confidence of a tech billionaire and absolutely zero of the skills. My very first project looked like a digital crime scene, colors that would blind a user, text formatting that made no logical sense, and structural choices that defied all laws of user experience. But I proudly hit `Publish` anyway, convinced the world was ready for my masterpiece.",
        "-- The Plot Twist: The world was not ready. In fact, the only user feedback I got was from a friend asking if my website had been infected by a virus.",
        "-- The Level Up: That beautifully chaotic failure taught me my very first lesson: good design isn't accidental. It sparked an obsession with understanding digital systems, user psychology, and how to actually build things that don't make people want to close their browsers immediately.",
      ],
    },
    {
      title: "Chapter 2: The Plot Thickens (Breaking Things at 2:00 AM)",
      paragraphs: [
        "Fast forward a bit. I had better skills and real projects. I was no longer a rookie. One night, while managing a live project, we decided to push a `quick, minor update` right before going to bed.",
        "-- The Plot Twist: It wasn`t minor. With one wrong move, the entire system went down. We spent the next four hours chugging caffeine, staring at a blank screen, frantically searching forums, and questioning every life choice that led me to this career.",
        "-- The Level Up: I didn't sleep, but our team fixed it before sunrise. That 2:00 AM panic attack was the ultimate crash course in Project Management and Quality Assurance. It taught me how to stay absolutely calm under pressure, how to troubleshoot complex workflows, and why you never, ever push to production on a Friday night without a bulletproof backup.",
      ],
    },
    {
      title: "Chapter 3:  The Epiphany",
      paragraphs: [
        "For a long time, I fell into the trap of trying to be a `Full-Stack Human.` I wanted to be the designer, the coder, the strategist, the manager, and probably the office janitor if needed. I thought doing everything made me irreplaceable. In reality, it just made me exhausted, and my projects started looking like Frankenstein`s monster—a bit of everything, but master of nothing.",
        "-- The Plot Twist: I realized that a generalist builds average things, but an Architect builds legendary things.",
        "-- The Level Up: I stopped trying to carry every single brick myself and stepped into my true calling: specializing as a Systems Architect and Digital Leader. I learned how to deep-dive into my core strengths UI/UX, engineering logic, and product strategy, while assembling tech nerds into building a geek community. Two heads are better than one.",
      ],
    },
    {
      title:
        "Chapter 4: The AI Plot Twist (Going Back to School in the Age of Robots)",
      paragraphs: [
        "Just when I thought I had this digital world completely figured out, AI exploded onto the scene. Suddenly, everyone was saying code writes itself, layouts design themselves, and humans are obsolete. For a hot second, I wondered if I should pack it all in and become a professional barista. But instead, I opened up the tools, looked at what AI was spitting out, and had a massive epiphany.",
        "-- The Plot Twist: I realized that AI is an incredible co-pilot, but it's a terrible architect. It can generate data or lines of text in seconds, but it doesn't understand human psychology, clean system architecture, or why a user clicks a specific button. To guide the machine effectively, I didn't need to learn fewer basics, I needed to master them completely.",
        "-- The Forever Learner Vibe: I went right back to the drawing board. I started relearning core fundamentals, deep UI/UX psychology, fundamental programming logic, and rigid project frameworks with fresh eyes. Today, I view myself as a forever digital learner. Technology will change every single week, but my commitment to honing my foundational craft means I`m always adapting, always improving, and always using the latest tools to build sharper, smarter systems.",
      ],
    },
    {
      title: "Chapter 5: The Present Day (Older and Wiser)",
      paragraphs: [
        "Where things stand today, I don`t fear the future, I design it. I combine years of hard-won, real-world mistakes with a relentless drive to master new technologies. I treat every project as a chance to level up my skills, ensuring that whatever we build isn't just generated by a machine, but carefully engineered by a human who actually understands and love the craft.",
      ],
    },
  ],
};

export const photoReelData: PhotoReelItem[] = [
  {
    id: "photo-1",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
    caption:
      "Working away in a cozy Seattle cafe. Power outlets and pour-over coffee are essential fuels.",
    ratio: "aspect-[3/4]",
    location: "Seattle, WA",
  },
  {
    id: "photo-2",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    caption:
      "Late night whiteboard brainstorming. Categorizing post-its and map interfaces before starting the Figma mockups.",
    ratio: "aspect-[4/3]",
    location: "UW Campus",
  },
  {
    id: "photo-3",
    imageUrl:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400",
    caption:
      "Reviewing card sizing proofs for 'The Bear Game'. Getting color profiles exact on recycled linen cardstock was tough!",
    ratio: "aspect-[3/4]",
    location: "Print shop print check",
  },
  {
    id: "photo-4",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400",
    caption:
      "The design intern crew at Slack! Celebrating the end of our summer demo days with amazing wood-fired pizzas.",
    ratio: "aspect-[3/4]",
    location: "San Francisco, CA",
  },
  {
    id: "photo-5",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400",
    caption:
      "My keyboard build! GMK caps on custom silent switches so I can type code at 2 AM without waking the house up.",
    ratio: "aspect-[4/5]",
    location: "Desk Setup",
  },
];
