export const STATS = [
  { label: "Beneficiaries Reached", value: 12450, suffix: "+" },
  { label: "States Active", value: 9, suffix: "" },
  { label: "Years of Service", value: 15, suffix: "" },
  { label: "Programmes Running", value: 3, suffix: "" },
];

export const PROGRAMMES = [
  {
    slug: "education",
    title: "Education",
    icon: "GraduationCap",
    tagline: "Empowering futures through access to quality education",
    description:
      "We work with underserved communities across Nigeria to build learning infrastructure, train teachers, and provide scholarships that keep children in school.",
    keyResult: "3,200 students supported",
    image: "https://picsum.photos/seed/children-classroom-nigeria/800/600",
    objectives: [
      {
        title: "School Infrastructure",
        activities: ["Classroom construction", "Library fit-out", "WASH facilities in schools"],
        target: 40,
        achieved: 32,
      },
      {
        title: "Scholarship Programme",
        activities: ["Secondary school bursaries", "Tertiary entrance support", "Vocational training grants"],
        target: 500,
        achieved: 418,
      },
      {
        title: "Teacher Training",
        activities: ["Pedagogy workshops", "Digital literacy certification", "Mentoring circles"],
        target: 120,
        achieved: 97,
      },
    ],
    partners: ["YEDIS", "One Community, One-Industry Initiative", "[State Ministry of Education]"],
    caseStudy: {
      name: "[Beneficiary Name]",
      location: "Ogun State",
      story:
        "Before joining the scholarship programme, [Beneficiary Name] walked 8 kilometres each way to a school with no desks. Today, she is in her second year of nursing school, supported by an Elite Club of Aagba bursary.",
      image: "https://picsum.photos/seed/young-woman-nigeria-student/400/500",
    },
  },
  {
    slug: "wash",
    title: "WASH",
    icon: "Drop",
    tagline: "Delivering clean water and sanitation to families across Nigeria",
    description:
      "Our WASH programme installs boreholes, builds community latrines, and trains hygiene champions so that families have lasting access to safe water and dignified sanitation.",
    keyResult: "9,250 people with safe water",
    image: "https://picsum.photos/seed/clean-water-borehole-africa/800/600",
    objectives: [
      {
        title: "Water Access",
        activities: ["Borehole drilling", "Solar pump installation", "Community water committees"],
        target: 60,
        achieved: 53,
      },
      {
        title: "Sanitation",
        activities: ["Latrine construction", "School sanitation blocks", "Waste management training"],
        target: 200,
        achieved: 178,
      },
      {
        title: "Hygiene Promotion",
        activities: ["Handwashing station roll-out", "Community hygiene champions", "School WASH clubs"],
        target: 80,
        achieved: 74,
      },
    ],
    partners: ["[Partner Organisation C]", "[UNICEF Nigeria]", "[State Ministry of Water Resources]"],
    caseStudy: {
      name: "[Community Representative]",
      location: "Kwara State",
      story:
        "Our village spent three hours every morning collecting water from a river that was not safe to drink. The borehole Elite Club of Aagba installed has changed everything - children stay in school and mothers have time for their own livelihoods.",
      image: "https://picsum.photos/seed/community-water-point-nigeria/400/500",
    },
  },
  {
    slug: "empowerment",
    title: "Empowerment",
    icon: "Briefcase",
    tagline: "Building economic independence through vocational skills and enterprise grants",
    description:
      "Our Empowerment programme equips community members and young artisans with practical trade skills and startup capital to build sustainable livelihoods. Training spans agro-allied processing, digital literacy, marketing, and business development — delivered through biennial conventions and partnerships with organisations such as YEDIS.",
    keyResult: "328+ participants trained, ₦1M+ in business grants awarded",
    image: "https://picsum.photos/seed/vocational-training-nigeria-women/800/600",
    objectives: [
      {
        title: "Agro-Allied Vocational Training",
        activities: ["Coconut oil & shea butter processing", "Black soap & locust beans production", "Snail farming & agro-waste conversion", "Hand sanitizer & mouthwash formulation"],
        target: 200,
        achieved: 200,
      },
      {
        title: "Entrepreneurship & Business Skills",
        activities: ["Marketing fundamentals & product branding", "Digital technology & AI for business", "Business proposal writing & venture funding", "Leadership development"],
        target: 128,
        achieved: 128,
      },
      {
        title: "Business Starter Grants",
        activities: ["Small-scale business launch grants", "Raffle-based grant disbursement to artisans", "Post-training community mentoring"],
        target: 53,
        achieved: 53,
      },
    ],
    partners: ["YEDIS", "One Community, One-Industry Initiative", "Osun State Ministry of Commerce, Industries, Cooperatives and Empowerment", "Afro Pride Art Collection"],
    caseStudy: {
      name: "[Workshop Participant]",
      location: "Aagba, Osun State",
      story:
        "After completing the 3-day agro-allied skills training, [Name] used her empowerment grant to start a black soap production business from her home. Within six months she was supplying three local markets and had trained two neighbours in the same skill.",
      image: "https://picsum.photos/seed/woman-entrepreneur-nigeria-soap/400/500",
    },
  },
];

export const NEWS_ARTICLES = [
  {
    slug: "yedis-artisan-empowerment-2024",
    title: "128 Young Artisans Empowered with Skills and Grants in Aagba",
    category: "Partnership Update",
    date: "March 9, 2024",
    author: "Elite Club of Aagba",
    excerpt:
      "In partnership with YEDIS, the Club supported a one-day entrepreneurship workshop for 128 artisans in Aagba, disbursing ₦1 million in business grants to 20 recipients.",
    image: "https://picsum.photos/seed/artisan-workshop-nigeria-grants/800/500",
    featured: true,
    body: [
      "On 9 March 2024, the Elite Club of Aagba partnered with YEDIS (Youth Empowerment and Development Initiative for Sustainability — a UN Sustainable Development Solution Network member) to host a one-day Entrepreneurship and Capacity-Building Workshop for underserved artisans in Aagba Community, Osun State.",
      "128 artisans attended — 76 women and girls, and 52 men — drawn from trades including plumbing, electrical work, computer and phone repairs, bricklaying, welding, fashion design, hairstyling, and farming. Training was delivered in both English and Yoruba, covering marketing fundamentals, product branding, digital technology, AI introduction, climate change effects on business, venture funding, leadership, and business proposal writing.",
      "The programme, valued at ₦2.1 million, disbursed ₦1 million in business starter grants to 20 raffle winners. Additional donations came from King Rufus Olayinka Ogunwole Kuujosin I, the Alaagba of Aagba (₦250,000), and Afro Pride Art Collection (₦390,000 in foodstuffs). Club President Obafemi Okediya joined government representatives Hon. Rasheed Aderibigbe, Hon. Bayo Ogungbangbe, and Hon. Soji Ajeigbe at the ceremony.",
    ],
  },
  {
    slug: "empowerment-training-200-indigenes-2021",
    title: "Elite Club Trains 200 Indigenes in Agro-Allied Skills at 2nd Biennial Convention",
    category: "Field Update",
    date: "May 22, 2021",
    author: "Elite Club of Aagba",
    excerpt:
      "A 3-day empowerment training in Aagba equipped 200 selected community members with agro-allied vocational skills, with 33 graduates receiving business starter grants at a ceremony attended by Osun State government officials.",
    image: "https://picsum.photos/seed/vocational-training-nigeria-community/800/500",
    featured: false,
    body: [
      "The Elite Club of Aagba held a 3-day vocational empowerment and training programme from 20–22 May 2021 in Aagba, Boripe Local Government Area, Osun State, bringing together 200 selected community indigenes.",
      "The training — part of the Club's 2nd Biennial Convention themed 'Engendering Economic Sustainability through Improved Agro-Allied Business Processes' — covered coconut oil processing, black soap making, locust beans processing, snail farming, shea butter production, charcoal-based mouthwash, hand sanitizer manufacturing, and agro-waste conversion.",
      "At the closing ceremony held at Julius Olayemi Hall, St. Anthony's Catholic Church on 22 May, 33 trainees received empowerment grants to launch small-scale businesses. The event was attended by the Osun State Commissioner for Commerce, Industries, Cooperatives and Empowerment, Hon. (Dr.) Henry Olabode Olanipekun, and the Commissioner for Local Government and Chieftaincy Affairs, Prince Adebayo Adeleke.",
      "The programme was delivered in partnership with the One Community, One-Industry Initiative. Convention planning was chaired by Obafemi Okediya.",
    ],
  },
  {
    slug: "wash-borehole-kwara-2026",
    title: "New Borehole Brings Safe Water to 1,400 Residents in Kwara State",
    category: "Field Update",
    date: "June 12, 2026",
    author: "[Field Correspondent]",
    excerpt:
      "Commissioning of a solar-powered borehole in Edu LGA marks a milestone in our WASH programme, ending a two-year water crisis for three villages.",
    image: "https://picsum.photos/seed/borehole-commissioning-nigeria/800/500",
    featured: true,
    body: [
      "The communities of [Village A], [Village B], and [Village C] in Kwara State now have access to clean, piped water following the commissioning of a new solar-powered borehole funded through the Elite Club of Aagba WASH programme.",
      "The project, which took six months to complete, was built in partnership with [Partner Organisation C] and the Kwara State Ministry of Water Resources. A community water management committee of seven members - five of them women - has been trained to oversee maintenance and fee collection.",
      "The borehole serves an estimated 1,400 residents and a primary school with 340 pupils. Before this intervention, community members walked an average of four kilometres to collect water from an unprotected river source.",
    ],
  },
  {
    slug: "scholarship-awards-2026",
    title: "418 Students Awarded Scholarships in 2026 Academic Year",
    category: "Campaign Report",
    date: "May 28, 2026",
    author: "[Communications Team]",
    excerpt:
      "Our education programme breaks its annual record, placing 418 young Nigerians in secondary and tertiary institutions with full bursary support.",
    image: "https://picsum.photos/seed/students-scholarship-award-nigeria/800/500",
    featured: false,
    body: [
      "Elite Club of Aagba has awarded scholarships to 418 students for the 2026 academic year, surpassing the programme target of 400 and setting a new annual record since the programme launched in 2018.",
      "Awards range from secondary school bursaries covering school fees, uniforms, and learning materials, to tertiary entrance grants for students admitted to universities and polytechnics across six states.",
      "A new vocational training strand introduced this year supported 42 young people entering carpentry, tailoring, and ICT skills programmes.",
    ],
  },
  {
    slug: "annual-report-2025",
    title: "2025 Annual Report: A Year of Expanded Reach",
    category: "Press Release",
    date: "April 15, 2026",
    author: "[Executive Director]",
    excerpt:
      "Our 2025 annual report details how we served 12,450 beneficiaries across eight states, with full financial accountability statements.",
    image: "https://picsum.photos/seed/ngo-report-community-meeting/800/500",
    featured: false,
    body: [
      "The 2025 Annual Report of the Elite Club of Aagba is now available for download. It documents programme results, financial statements audited by [Audit Firm], and case studies from beneficiaries in all eight states where we operate.",
      "Key highlights include the completion of 32 classroom blocks, 53 new water points, and the training of 97 teachers across the Education and WASH portfolios.",
      "We remain committed to full financial transparency. Our accounts are independently audited, and summary financials are included in this report.",
    ],
  },
];

export const TEAM_MEMBERS = [
  {
    name: "Obafemi Okediya",
    title: "Club President",
    department: "Leadership",
    bio: "Community leader and current President of the Elite Club of Aagba. Chaired the 2nd Biennial Convention Planning Committee and has led the Club's Empowerment programme, including the 2021 agro-allied skills training and the 2024 YEDIS artisan empowerment partnership.",
    image: "https://picsum.photos/seed/professional-man-nigeria-executive/300/300",
  },
  {
    name: "[Deputy Director Name]",
    title: "Deputy Director, Programmes",
    department: "Leadership",
    bio: "Specialist in WASH and public health. Holds an MSc in International Development from [University].",
    image: "https://picsum.photos/seed/professional-woman-nigeria-director/300/300",
  },
  {
    name: "[Finance Manager Name]",
    title: "Finance and Operations Manager",
    department: "Operations",
    bio: "Chartered accountant with ten years in non-profit financial management and donor compliance.",
    image: "https://picsum.photos/seed/finance-professional-nigeria/300/300",
  },
  {
    name: "[Education Coordinator Name]",
    title: "Education Programme Coordinator",
    department: "Programmes",
    bio: "Former secondary school principal. Coordinates the scholarship selection panel and teacher training calendar.",
    image: "https://picsum.photos/seed/education-coordinator-nigeria/300/300",
  },
  {
    name: "[WASH Engineer Name]",
    title: "WASH Programme Engineer",
    department: "Programmes",
    bio: "Civil engineer specialising in rural water systems. Oversees all borehole siting, drilling, and community handover.",
    image: "https://picsum.photos/seed/engineer-field-nigeria-water/300/300",
  },
  {
    name: "[Communications Lead Name]",
    title: "Communications and Partnerships Lead",
    department: "Operations",
    bio: "Manages donor relations, media, and the organisation's digital presence across all platforms.",
    image: "https://picsum.photos/seed/communications-professional-lagos/300/300",
  },
];

export const TRUSTEES = [
  {
    name: "[Board Chair Name]",
    title: "Board Chair",
    bio: "Retired civil servant and community leader. Founded the Elite Club of Aagba in 2010.",
    image: "https://picsum.photos/seed/board-chair-elder-nigeria/300/300",
  },
  {
    name: "[Trustee Name 2]",
    title: "Trustee",
    bio: "Senior lawyer with expertise in non-profit governance and land rights.",
    image: "https://picsum.photos/seed/trustee-legal-nigeria/300/300",
  },
  {
    name: "[Trustee Name 3]",
    title: "Trustee",
    bio: "Medical doctor and public health advocate. Advises on WASH programme design.",
    image: "https://picsum.photos/seed/trustee-doctor-nigeria/300/300",
  },
];

export const STATES = [
  { name: "Osun", programmes: ["Education", "Empowerment"], beneficiaries: 420, representative: "Obafemi Okediya", summary: "Home base of the Club in Aagba, Boripe LGA. 200 indigenes trained in agro-allied skills (2021); 128 young artisans empowered through the YEDIS partnership with ₦1M in grants (2024)." },
  { name: "Lagos", programmes: ["Education"], beneficiaries: 2100, representative: "[State Rep Name]", summary: "Urban education scholarships and teacher training in low-income communities." },
  { name: "Kwara", programmes: ["WASH"], beneficiaries: 1950, representative: "[State Rep Name]", summary: "Borehole drilling and sanitation in Edu and Moro LGAs." },
  { name: "Ogun", programmes: ["Education", "WASH"], beneficiaries: 1800, representative: "[State Rep Name]", summary: "Dual programme state - classroom construction and water point rehabilitation." },
  { name: "Kano", programmes: ["Education"], beneficiaries: 1600, representative: "[State Rep Name]", summary: "Girls' education focus with bursaries and safe school initiatives." },
  { name: "Enugu", programmes: ["WASH"], beneficiaries: 1450, representative: "[State Rep Name]", summary: "Rural sanitation and hygiene promotion in Igbo-Eze communities." },
  { name: "Benue", programmes: ["Education", "WASH"], beneficiaries: 1200, representative: "[State Rep Name]", summary: "Post-conflict reconstruction - schools and water systems." },
  { name: "Ondo", programmes: ["Education"], beneficiaries: 1100, representative: "[State Rep Name]", summary: "Vocational training grants and secondary school bursaries." },
  { name: "Sokoto", programmes: ["WASH"], beneficiaries: 1250, representative: "[State Rep Name]", summary: "Solar-powered water supply in remote pastoral communities." },
];

export const PUBLICATIONS = [
  {
    id: 1,
    title: "2025 Annual Report",
    type: "Annual Report",
    year: "2025",
    programme: "All Programmes",
    summary: "Full programme results, financial statements, and beneficiary case studies for the 2025 reporting period.",
    cover: "https://picsum.photos/seed/annual-report-cover-2025/400/560",
    restricted: false,
  },
  {
    id: 2,
    title: "WASH Programme Baseline Survey - Kwara State",
    type: "Research",
    year: "2024",
    programme: "WASH",
    summary: "Baseline data on water access, sanitation coverage, and hygiene practices across four LGAs in Kwara State.",
    cover: "https://picsum.photos/seed/research-report-water-survey/400/560",
    restricted: false,
  },
  {
    id: 3,
    title: "Education Impact Evaluation 2022-2024",
    type: "Evaluation",
    year: "2024",
    programme: "Education",
    summary: "Independent evaluation of the scholarship programme's effect on school completion rates and learning outcomes.",
    cover: "https://picsum.photos/seed/education-evaluation-report/400/560",
    restricted: false,
  },
  {
    id: 4,
    title: "Safeguarding Policy and Procedures",
    type: "Policy",
    year: "2024",
    programme: "All Programmes",
    summary: "Internal safeguarding framework covering child protection, prevention of sexual exploitation, and reporting mechanisms.",
    cover: "https://picsum.photos/seed/policy-document-ngo/400/560",
    restricted: true,
  },
  {
    id: 5,
    title: "2024 Annual Report",
    type: "Annual Report",
    year: "2024",
    programme: "All Programmes",
    summary: "Programme results, financial statements, and case studies from the 2024 reporting year.",
    cover: "https://picsum.photos/seed/annual-report-cover-2024/400/560",
    restricted: false,
  },
  {
    id: 6,
    title: "WASH Hygiene Promotion Training Manual",
    type: "Training Material",
    year: "2023",
    programme: "WASH",
    summary: "Community facilitator guide for the 12-session hygiene behaviour change programme used in all states.",
    cover: "https://picsum.photos/seed/training-manual-cover/400/560",
    restricted: false,
  },
];

export const GALLERY_CAMPAIGNS = [
  {
    title: "Borehole Commissioning - Kwara State",
    photos: [
      { seed: "borehole-ribbon-cutting-nigeria", caption: "Commissioning ceremony attended by community leaders and local government officials" },
      { seed: "solar-pump-installation-africa", caption: "Solar pump installation underway at the Edu LGA site" },
      { seed: "children-drinking-clean-water", caption: "Children from the primary school using the new water point for the first time" },
      { seed: "community-water-committee-nigeria", caption: "The newly trained community water management committee" },
    ],
  },
  {
    title: "2026 Scholarship Award Ceremony",
    photos: [
      { seed: "scholarship-award-ceremony-nigeria", caption: "Award ceremony held at the community hall in Lagos" },
      { seed: "students-receiving-certificates-nigeria", caption: "Students receiving scholarship certificates from the Executive Director" },
      { seed: "parents-scholarship-celebration", caption: "Families celebrating with scholarship recipients" },
      { seed: "scholarship-student-portrait", caption: "Portrait of a 2026 scholarship awardee" },
    ],
  },
  {
    title: "Classroom Construction - Ogun State",
    photos: [
      { seed: "classroom-construction-nigeria", caption: "Construction of three new classrooms at [Primary School Name]" },
      { seed: "completed-classroom-block-africa", caption: "Completed classroom block ready for the new term" },
      { seed: "teachers-training-workshop-nigeria", caption: "Teacher training workshop held in the new facility" },
    ],
  },
];

export const VIDEOS = [
  { title: "Our WASH Programme in Action", youtubeId: "dQw4w9WgXcQ", theme: "WASH" },
  { title: "Stories from the Scholarship Programme", youtubeId: "dQw4w9WgXcQ", theme: "Education" },
  { title: "Elite Club of Aagba - Who We Are", youtubeId: "dQw4w9WgXcQ", theme: "About" },
];

export const SDG_GOALS = [
  { number: 4, title: "Quality Education", color: "#C5192D", description: "Scholarships and school infrastructure" },
  { number: 6, title: "Clean Water and Sanitation", color: "#26BDE2", description: "Boreholes and sanitation facilities" },
  { number: 3, title: "Good Health and Well-being", color: "#4C9F38", description: "WASH to reduce waterborne disease" },
  { number: 10, title: "Reduced Inequalities", color: "#DD1367", description: "Targeting underserved communities" },
  { number: 17, title: "Partnerships for the Goals", color: "#19486A", description: "Multi-stakeholder collaboration" },
];
