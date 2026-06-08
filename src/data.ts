import { Project, BioStory, PhotoReelItem } from "./types";

export const projectsData: Project[] = [
  {
    id: "amazainCms",
    title: "Amazain CMS",
    subtitle: "A redesigned composer that speeds time-to-value and drives deeper product usage.",
    category: "AMAZAIN Training & Consulting Inc.",
    tagline: "(CONTRACT)",
    themeColor: "#4f46e5",
    shadowColor: "shadow-[6px_6px_0px_0px_#4f46e5]",
    borderColor: "border-[#4f46e5]/40",
    bgHoverColor: "hover:bg-[#4f46e5]/5",
    timeline: "Nov 2024 - Dec 2024 (6 weeks)",
    role: "Product Designer",
    team: "Assistant Core",
    context: "Glean is an AI-powered search & chat assistant for enterprises. While interning on the Assistant Core team, I redesigned the chat box composer used by over 100k+ active corporate professionals to query company data.",
    problem: "The AI chat composer is cluttered and can't scale with Glean's growing feature set. As Glean added more capabilities (filtering sources, querying custom knowledge graphs, integrations with Slack/Gmail, and agent triggers), the input element became loaded with buttons, causing option fatigue and misclicks.",
    solution: "A sleek, responsive, tiered composer that collapses secondary actions behind an elegant, context-aware command tray, which dynamically unfolds based on key triggers (e.g., typing '@' or '/' keys).",
    opportunityStatement: "How might we simplify the composer interface while ensuring that advanced enterprise features remain accessible, discoverable, and intuitive for users?",
    lessonsLearned: [
      "Enterprise design is about density control: don't hide advanced capabilities entirely, but route them through sensible progressive disclosure pathways.",
      "Vibe & speed are features: micro-animations, keyboard shortcut loops, and tight line heights make a designer's intent feel native.",
      "Cross-functional alignment is hard but necessary: collaborating directly with LLM engineers taught me how latency directly impacts design."
    ]
  },
  {
    id: "notion",
    title: "Notion Design Optimization",
    subtitle: "Designing automated workflow builders and interactive messaging features.",
    category: "Notion Labs, Inc.",
    tagline: "(INTERNSHIP)",
    themeColor: "#e11d48",
    shadowColor: "shadow-[6px_6px_0px_0px_#e11d48]",
    borderColor: "border-[#e11d48]/40",
    bgHoverColor: "hover:bg-[#e11d48]/5",
    timeline: "Jun 2024 - Sep 2024 (12 weeks)",
    role: "Product Design Intern",
    team: "Workflows & Automation",
    context: "During my internship at Slack, I worked within the Workflow Builder group. Workflow Builder is a visual drag-and-drop programming tool inside Slack that lets anyone build custom multi-step task triggers.",
    problem: "The visual workflow builder felt detached from the core messaging environment. Users struggled to conceptualize how variables and triggers flowed across different channels. Non-technical users experienced high drop-off rates because the builder configuration felt too 'abstract' and programmer-like.",
    solution: "An immersive, on-canvas live preview of workflow steps. We replaced static forms with an inline chat simulation that displays exactly how messages appear, interactive cards react, and approvals route in real-time as the author edits the workflow.",
    opportunityStatement: "How might we bridge the gap between building an automation flow and experiencing it, enabling slack administrators of any skill level to build with high confidence?",
    lessonsLearned: [
      "WYSIWYG is extremely powerful for lowering technical entry barriers: showing live messages reduced configuration drop-off rates by 42% in live beta testing.",
      "Keep design elements aligned with brand pillars: Slack is playful, warm, and clear. Bold color cues guide users without generating cognitive load.",
      "Component guidelines must be respected: building on top of Slack's custom design token stack ensured perfect visual continuity."
    ]
  },
  {
    id: "mezzo",
    title: "Bringing the Magic to Meetups.",
    subtitle: "Solving complex social coordination problems to make catching up effortless.",
    category: "MEZZO",
    tagline: "(PASSION PROJECT)",
    themeColor: "#8b5cf6",
    shadowColor: "shadow-[6px_6px_0px_0px_#8b5cf6]",
    borderColor: "border-[#8b5cf6]/40",
    bgHoverColor: "hover:bg-[#8b5cf6]/5",
    timeline: "Jan 2023 - Present (Ongoing)",
    role: "Co-Founder & Lead Designer",
    team: "3 Engineers, 1 Product Manager",
    context: "Mezzo was born from a personal frustration: trying to get a large group of busy college students or friends together in one place is an absolute nightmare. Over-calendaring, endless group text messages, and indecision on venues kills plans before they start.",
    problem: "Traditional calendar tools are cold and transactional (built for corporate meetings, not friendly get-togethers). On the other extreme, casual chat groups lack structural polling capabilities: polls get lost, responses are hidden, and selecting a win-win time requires human arithmetic.",
    solution: "A mobile-first, geo-coordinated social planner. Mezzo combines real-time 'heatmaps' of shared calendar Availability with an intelligent Yelp API venue suggesting card picker, enabling a host to deploy a finalized plan card to any group chat link in seconds.",
    opportunityStatement: "How might we design a playful, low-pressure coordination space that turns scheduling from a chore into an exciting prelude to the meetup?",
    lessonsLearned: [
      "The value of custom physics hooks and micro-interactions in mobile apps cannot be overstated; card-swipes and visual sliders encourage user high engagement.",
      "Design for the passive user: most people won't register for a new app just to respond to an invite; the web-rsvp layout must load in under 1.5 seconds and work flawlessly.",
      "Iterating with real users yields non-obvious requests: we realized privacy was a massive factor—people didn't want their full calendar synced, only their free-time blocks."
    ]
  },
  {
    id: "bear",
    title: "A Card Game for the Whole Den.",
    subtitle: "A physical-digital tabletop deck created to bring families together.",
    category: "THE BEAR GAME",
    tagline: "(PASSION PROJECT)",
    themeColor: "#16a34a",
    shadowColor: "shadow-[6px_6px_0px_0px_#16a34a]",
    borderColor: "border-[#16a34a]/40",
    bgHoverColor: "hover:bg-[#16a34a]/5",
    timeline: "May 2020 - Dec 2021 (18 months)",
    role: "Lead Illustrator & Mechanics Designer",
    team: "Self & 2 Childhood Friends",
    context: "When COVID-19 hit and everyone was locked inside with their immediate families, social friction was high and fun was scarce. We set out to design a quick-to-learn, hilarious physical tabletop card game to spark laughter and connection across different age groups.",
    problem: "Most modern board games are either too simple (and boring after 3 rounds) or incredibly complex (taking 45 minutes of reading manuals before writing a turn). We needed a sweet spot of accessibility, visual delight, and rich replay value.",
    solution: "The Bear Game. Our mechanics combine competitive card-stealing with hidden-roll trapdoors. I illustrated over 80+ quirky bear-themed characters (like the 'Grizzly Hacker' and 'Panda-Monium') in highly saturated flat vector graphics, matching the physical cards with a companion app for special event rules.",
    opportunityStatement: "How might we build a tactile and digital playground that prompts multi-generational players to interact, scheme, and laugh together within 5 minutes of opening the box?",
    lessonsLearned: [
      "Illustration is storytelling: custom vector illustration choices dictate the exact emotional reaction a player has to drawing a card.",
      "Supply chain and manufacturing are real design constraints: managing card stocks, glossy coatings, and box sizes made me a better systemic planner.",
      "Continuous playtesting matches numbers to feelings: we designed a digital spreadsheet to simulate card frequency probability to ensure games balanced nicely."
    ]
  }
];

export const bioStory: BioStory = {
  longer: [
    {
      title: "Chapter 1: The Day I Thought I Was a Genius",
      paragraphs: [
        "Back when I first discovered the world of digital creation, I had the confidence of a tech billionaire and absolutely zero of the skills. My very first project looked like a digital crime scene, colors that would blind a user, text formatting that made no logical sense, and structural choices that defied all laws of user experience. But I proudly hit `Publish` anyway, convinced the world was ready for my masterpiece.",
        "-- The Plot Twist: The world was not ready. In fact, the only user feedback I got was from a friend asking if my website had been infected by a virus.",
        "-- The Level Up: That beautifully chaotic failure taught me my very first lesson: good design isn't accidental. It sparked an obsession with understanding digital systems, user psychology, and how to actually build things that don't make people want to close their browsers immediately."
      ]
    },
    {
      title: "Chapter 2: The Plot Thickens (Breaking Things at 2:00 AM)",
      paragraphs: [
        "Fast forward a bit. I had better skills and real projects. I was no longer a rookie. One night, while managing a live project, we decided to push a `quick, minor update` right before going to bed.",
        "-- The Plot Twist: It wasn`t minor. With one wrong move, the entire system went down. We spent the next four hours chugging caffeine, staring at a blank screen, frantically searching forums, and questioning every life choice that led me to this career.",
        "-- The Level Up: I didn't sleep, but our team fixed it before sunrise. That 2:00 AM panic attack was the ultimate crash course in Project Management and Quality Assurance. It taught me how to stay absolutely calm under pressure, how to troubleshoot complex workflows, and why you never, ever push to production on a Friday night without a bulletproof backup."
      ]
    },
    {
      title: "Chapter 3:  The Epiphany",
      paragraphs: [
        "For a long time, I fell into the trap of trying to be a `Full-Stack Human.` I wanted to be the designer, the coder, the strategist, the manager, and probably the office janitor if needed. I thought doing everything made me irreplaceable. In reality, it just made me exhausted, and my projects started looking like Frankenstein`s monster—a bit of everything, but master of nothing.",
        "-- The Plot Twist: I realized that a generalist builds average things, but an Architect builds legendary things.",
        "-- The Level Up: I stopped trying to carry every single brick myself and stepped into my true calling: specializing as a Systems Architect and Digital Leader. I learned how to deep-dive into my core strengths UI/UX, engineering logic, and product strategy, while assembling tech nerds into building a geek community. Two heads are better than one."
      ]
    },
    {
      title: "Chapter 4: The AI Plot Twist (Going Back to School in the Age of Robots)",
      paragraphs: [
        "Just when I thought I had this digital world completely figured out, AI exploded onto the scene. Suddenly, everyone was saying code writes itself, layouts design themselves, and humans are obsolete. For a hot second, I wondered if I should pack it all in and become a professional barista. But instead, I opened up the tools, looked at what AI was spitting out, and had a massive epiphany.",
        "-- The Plot Twist: I realized that AI is an incredible co-pilot, but it's a terrible architect. It can generate data or lines of text in seconds, but it doesn't understand human psychology, clean system architecture, or why a user clicks a specific button. To guide the machine effectively, I didn't need to learn fewer basics, I needed to master them completely.",
        "-- The Forever Learner Vibe: I went right back to the drawing board. I started relearning core fundamentals, deep UI/UX psychology, fundamental programming logic, and rigid project frameworks with fresh eyes. Today, I view myself as a forever digital learner. Technology will change every single week, but my commitment to honing my foundational craft means I`m always adapting, always improving, and always using the latest tools to build sharper, smarter systems."
      ]
    },
    {
      title: "Chapter 5: The Present Day (Older and Wiser)",
      paragraphs: [
        "Where things stand today, I don`t fear the future, I design it. I combine years of hard-won, real-world mistakes with a relentless drive to master new technologies. I treat every project as a chance to level up my skills, ensuring that whatever we build isn't just generated by a machine, but carefully engineered by a human who actually understands and love the craft."
      ]
    },
  ]
};

export const photoReelData: PhotoReelItem[] = [
  {
    id: "photo-1",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
    caption: "Working away in a cozy Seattle cafe. Power outlets and pour-over coffee are essential fuels.",
    ratio: "aspect-[3/4]",
    location: "Seattle, WA"
  },
  {
    id: "photo-2",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    caption: "Late night whiteboard brainstorming. Categorizing post-its and map interfaces before starting the Figma mockups.",
    ratio: "aspect-[4/3]",
    location: "UW Campus"
  },
  {
    id: "photo-3",
    imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400",
    caption: "Reviewing card sizing proofs for 'The Bear Game'. Getting color profiles exact on recycled linen cardstock was tough!",
    ratio: "aspect-[3/4]",
    location: "Print shop print check"
  },
  {
    id: "photo-4",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400",
    caption: "The design intern crew at Slack! Celebrating the end of our summer demo days with amazing wood-fired pizzas.",
    ratio: "aspect-[3/4]",
    location: "San Francisco, CA"
  },
  {
    id: "photo-5",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400",
    caption: "My keyboard build! GMK caps on custom silent switches so I can type code at 2 AM without waking the house up.",
    ratio: "aspect-[4/5]",
    location: "Desk Setup"
  }
];
