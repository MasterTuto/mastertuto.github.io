export const englishTranslations = {
  catalog: {
    explore: 'Explore games and tools',
    toggle: 'Toggle sidebar',
    close: 'Close menu',
    skip: 'Skip to content',
    gamesTitle: 'Free online logic and word games',
    gamesIntro:
      'Play Sudoku, Queens and Word Ladder in your browser. Explore number, strategy and word puzzles on your phone, tablet or computer.',
    gamesHeading: 'Choose your next challenge',
    gamesText:
      'Practice reasoning with Sudoku grids, plan each queen placement or connect words one letter at a time. Open a game to find its rules, controls and tips.',
    toolsTitle: 'Online tools for everyday tasks',
    toolsIntro:
      'Format JSON and inspect JWT tokens with free developer tools that run in your browser. Choose a tool below for instant results, practical guides and examples.',
    toolsHeading: 'Tools for everyday development',
    toolsText:
      'Use JSON Beautifier Pro to validate, indent and minify JSON, or JWT Token Decoder to inspect headers, payloads and expiration claims. Explore our logic games when you need a break.',
  },
  backHome: 'Back to home',
  cases: {
    viewCase: "View full case",
    visitSite: "Visit website",
    backToProjects: "Back to projects",
    myRole: "What I did",
    aboutTitle: "About the project",
    highlightsTitle: "Highlights",
    galleryTitle: "On desktop and mobile",
    techTitle: "Under the hood",
    desktop: "desktop version",
    mobile: "mobile version",
    ctaTitle: "Have a similar project in mind?",
    ctaText: "Tell me what you need and I will reply with the next steps.",
    ctaButton: "Talk about my project",
    roles: {
      design: "Design",
      implementation: "Implementation",
      hosting: "Hosting",
      maintenance: "Maintenance",
    },
    items: {
      jingle: {
        tagline: "A jingle creation platform powered by artificial intelligence",
        summary: "A platform where anyone turns an idea into a jingle: artificial intelligence writes the lyrics, creates the music and generates the vocals, with an MP3 download. I did the design, implementation and hosting, and I handle maintenance.",
        about: "jingle.ia.br takes the jingle out of the studio. Bakeries, pizzerias, supermarkets, radio stations and agencies describe their message, pick a Brazilian rhythm such as forró, sertanejo or pagode, compare three lyric options and download the finished song. The same platform serves birthdays, events, podcasts and campaigns, with no songwriting skills required.",
        work: {
          design: {
            intro: "The audience has never written a song. Every design decision removes a doubt along the way.",
            decisions: {
              '1': {
                title: "Four steps, one question at a time",
                text: "Idea, tone, lyrics and download. Short steps avoid the blank page for people who don’t know where to start.",
              },
              '2': {
                title: "Choose instead of write",
                text: "People compare three lyrics before generating the audio. Choosing is easier than writing, and credits are only spent on what they approved.",
              },
              '3': {
                title: "A distinctly Brazilian look",
                text: "Green and yellow, a megaphone and regional rhythms make it clear on the first screen who the product is for.",
              },
            },
          },
          implementation: {
            intro: "Generating music takes time and can fail. The implementation keeps that from weighing on the user.",
            decisions: {
              '1': {
                title: "Background generation",
                text: "The jingle keeps generating even if the page is closed. Users follow the status and download the MP3 when it’s ready.",
              },
              '2': {
                title: "Failures don’t cost credits",
                text: "If lyric creation fails, the jingle goes back to the plan balance and the screen explains what happened.",
              },
              '3': {
                title: "Subscription plans",
                text: "Three monthly plans with a jingle quota and cancellation at any time. The entry plan includes a spoken watermark.",
              },
            },
          },
          hosting: {
            intro: "Usage comes in peaks, such as holidays and campaigns. The infrastructure follows that rhythm.",
            decisions: {
              '1': {
                title: "Pay for what you use",
                text: "Serverless architecture: no idle servers waiting for visits, and capacity grows on its own when traffic increases.",
              },
              '2': {
                title: "A domain that explains itself",
                text: "The .ia.br domain says what the product does and that it’s Brazilian, before the site even opens.",
              },
            },
          },
          maintenance: {
            intro: "The product keeps evolving after launch.",
            decisions: {
              '1': {
                title: "Continuous evolution",
                text: "New jingle types, briefing ideas and content are added as real usage shows what’s missing.",
              },
              '2': {
                title: "Fast fixes",
                text: "I monitor errors and AI service costs to fix problems before they become complaints.",
              },
            },
          },
        },
        tech: {
          intro: "A serverless stack on AWS, orchestrating several AI models and delivered from the edge.",
          frontend: "Angular SPA in a monorepo alongside the back end: one repository, one build and deploy flow.",
          backend: "Serverless Node.js back end on AWS Lambda, with DynamoDB as the NoSQL database. Scales on demand and bills per execution.",
          ai: "An asynchronous pipeline orchestrating OpenAI and Gemini LLMs, model inference on Replicate and voice synthesis with ElevenLabs.",
          payments: "Recurring subscriptions on Asaas, integrated via API and webhooks to release each plan’s quota.",
          infra: "Static assets served by the CloudFront CDN, DNS and edge proxy on Cloudflare, and the .ia.br domain registered at Registro.br.",
        },
        highlights: {
          '1': {
            value: "3",
            label: "lyric options for each jingle",
          },
          '2': {
            value: "8",
            label: "Brazilian music genres",
          },
          '3': {
            value: "60 s",
            label: "jingles, downloadable as MP3",
          },
          '4': {
            value: "R$ 9.90",
            label: "per month on the entry plan",
          },
        },
      },
      supervegetariano: {
        tagline: "Vegetarian restaurant in Santos, Brazil, since 1986",
        summary: "The website of a traditional vegetarian restaurant in Santos, Brazil. The site already existed: I moved it to new hosting in 1 day, set up email on KingHost and made small adjustments.",
        about: "Super Vegetariano has served homemade, tasty and healthy food in Santos since February 1986. The website presents the restaurant’s history, its locations, the daily menu on social media and WhatsApp contact. It was built on WordPress by another team.",
        work: {
          hosting: {
            intro: "The site already worked and customers knew it. The goal was to change the infrastructure without anyone noticing.",
            decisions: {
              '1': {
                title: "Migration in 1 day",
                text: "The WordPress files, database and domain moved to the new hosting in a single day, keeping content and design.",
              },
              '2': {
                title: "Email on KingHost",
                text: "I set up the domain’s email accounts on KingHost, so the restaurant keeps receiving messages at its own address.",
              },
              '3': {
                title: "Small adjustments",
                text: "After the migration, I fixed small details without touching the identity customers already recognize.",
              },
            },
          },
        },
        highlights: {
          '1': {
            value: "40",
            label: "years serving healthy food",
          },
          '2': {
            value: "2",
            label: "locations in Santos, Brazil",
          },
          '3': {
            value: "1 day",
            label: "to complete the migration",
          },
          '4': {
            value: "1986",
            label: "year founded",
          },
        },
      },
    },
  },
  scheduling: {
    title: 'Schedule a conversation',
    description:
      'Choose a time for a 30-minute conversation about your project.',
    openCalendar: 'Open calendar',
  },
  games: {
    label: 'Games',
    subtitle: 'A collection of games I built.',
    play: 'Play',
    queensDescription:
      'A daily logic puzzle inspired by the classic N-Queens problem.',
    sudokuDescription:
      'A mini Sudoku generator with 4×4, 6×6 and 9×9 grids and adjustable difficulty.',
    wordLadderDescription:
      'A word puzzle where you change one letter at a time to turn a word into another, with daily puzzles and three difficulty levels.',
  },
  tools: {
    label: 'Tools',
    subtitle: 'Useful tools I built.',
    emptyTitle: 'No tools available yet',
    emptyDescription: 'New tools are on the way. Check back soon!',
  },
  home: {
    title:
      "Programming professional specialized in <span class='text-foreground-emphasis'>landing pages</span> and <span class='text-foreground-emphasis'>autonomous websites</span>.",
    description:
      'I create fast, modern and optimized websites to convert visitors into customers and strengthen your online presence.',
    websiteLikeThis: 'I want an website like this',
    whatsappMessage: "Hello! I'd like to request a quote for a website.",
    nav: {
      home: 'Home',
      services: 'Services',
      whyMe: 'Why me',
      projects: 'Projects',
      testimonials: 'Testimonials',
      allServices: "All services",
      segments: "Industries",
      gamesAndTools: "Games and tools",
    },
    services: {
      name: 'Services',

      title: 'Complete solutions for professionals who want to grow',
      description:
        'Strategic development focused on performance, design and conversion. All you need to have presence, authority and online results.',

      landingPages: 'Landing Pages',
      landingPagesDescription:
        'High-converting pages to attract more leads and close more businesses.',

      websitesForFreelancers: 'Websites for Freelancers',
      websitesForFreelancersDescription:
        'Professional websites that transmit trust and generate new opportunities.',

      blogsAndPortofolios: 'Blogs and Portfolios',
      blogsAndPortofoliosDescription:
        'Show your work, share knowledge and attract your ideal audience.',

      integrations: 'Integrations',
      integrationsDescription:
        'Forms, e-mail marketing, WhatsApp, payments and much more.',
    },
    whyMe: {
      name: 'WHY WORK WITH ME?',
      title: 'Commitment to results and attention to every detail',
      description:
        'More than code, I offer strategy, communication and a partner to help you achieve your goals.',
      list: {
        '1Title': 'Clear and direct communication',
        '1Subtitle': 'Tracking throughout all stages',
        '2Title': 'Modern and customized design',
        '2Subtitle': 'Unique websites that represent your brand',
        '3Title': 'Focus on performance',
        '3Subtitle': "Fast websites that don't lose visitors",
        '4Title': 'Optimized for search engines',
        '4Subtitle': 'More visibility for your business',
      },
      yoE: '5+ years',
      yoEDescription: 'Developing digital solutions',
    },
    projects: {
      name: 'Portfolio',
      title: 'Projects that generate results',
      description:
        'Some recent work developed for professionals and companies that trusted my work.',
      viewAll: 'View all projects',
    },
    testimonials: {
      name: 'Testimonials',
      title: 'What my clients say:',
      previous: 'Previous testimonials',
      next: 'Next testimonials',
      ctaTitle: 'Ready to have a website that brings real results?',
      ctaDescription:
        "Let's talk about your projects and get your ideas off the ground.",
      whatsapp: 'Talk on WhatsApp',
      whatsappMessage:
        'Hello! I found your portfolio and would like to talk about a project.',
      requestBudget: 'Request a quote',
      items: {
        '1': {
          text: 'Breno understood exactly what I needed and delivered a fast, beautiful page that started bringing qualified contacts in the first week.',
          name: 'Mariana Alves',
          profession: 'Architect',
        },
        '2': {
          text: 'The process was clear from start to finish. I finally have a professional website that explains my work and generates trust.',
          name: 'Rafael Costa',
          profession: 'Business consultant',
        },
        '3': {
          text: 'Besides the design, the care with performance made a huge difference. The site loads quickly and works perfectly on mobile.',
          name: 'Camila Torres',
          profession: 'Beauty studio owner',
        },
        '4': {
          text: 'He transformed a loose idea into a polished digital presence. Communication was easy and the result felt true to my brand.',
          name: 'Lucas Mendes',
          profession: 'Personal trainer',
        },
      },
    },
    footer: {
      ctaTitle: "Let's create something amazing together?",
      ctaSubtitle:
        "I'm ready to turn your idea into a professional, fast website that truly generates results.",
      cards: {
        closeService: {
          title: 'Close service',
          subtitle: 'Focused on your project',
        },
        transparentProcess: {
          title: 'Transparent process',
          subtitle: 'You follow every step',
        },
        properSupport: {
          title: 'Proper support',
          subtitle: 'I leave it your way',
        },
      },
      brandSubtitle:
        'Freelance programmer specialized in creating websites that generate results for freelancers and small businesses.',
      navigation: 'Navigation',
      services: 'Services',
      letsTalk: "Let's talk?",
      downloadCurriculum: 'Download CV',
      rights: 'All rights reserved.',
    },
    estimateBudget: 'Request a Quote',
  },
  servicesPage: {
    common: {
      backHome: 'Back to home',
      backToServices: 'All services',
      otherServices: 'Explore other services',
      requestBudget: 'Request a quote',
      ready: 'Ready to start?',
      whatsappMessage:
        'Hello! I found your portfolio and would like to talk about a project.',
    },
    index: {
      title: 'Services',
      subtitle:
        'Strategic development focused on performance, design and conversion.',
      description:
        'Everything you need to have presence, authority and real results online. Each service is built to solve a specific problem — fast, modern and optimized for search engines.',
      viewAll: 'Learn more',
      ctaTitle: 'Not sure which service fits your needs?',
      ctaSubtitle:
        "Send me a message and I'll help you choose the best path for your project.",
    },
    landingPages: {
      proofTitle: "Projects already live",
      formTitle: "Request your quote",
      formSubtitle: "Just two fields. The conversation continues on WhatsApp.",
      formName: "Your name",
      formOffer: "What do you want to sell or promote?",
      formOfferPlaceholder: "E.g. a course, a consultancy, a launch",
      messageIntro: "Hi, Breno! I want a landing page.",
      messageName: "Name",
      messageOffer: "Offer",
      anatomyTitle: 'Anatomy of a page that converts',
      anatomySubtitle: 'Every block has a job. Here is what each part of your landing page does to move the visitor toward action.',
      anatomy: {
        '1': {
          title: 'Headline',
          text: 'A clear promise that tells the visitor, in seconds, what they get and why it matters.',
        },
        '2': {
          title: 'Social proof',
          text: 'Testimonials, logos and numbers that show other people already trust you.',
        },
        '3': {
          title: 'Offer and benefits',
          text: 'What is included, presented as outcomes for the customer instead of a list of features.',
        },
        '4': {
          title: 'Lead form',
          text: 'Only the fields you really need, so filling it in feels effortless.',
        },
        '5': {
          title: 'Call to action',
          text: 'One action, repeated at the right moments, with a button that is impossible to miss.',
        },
      },
      timeline: {
        '1': 'Day 1',
        '2': 'Days 2–3',
        '3': 'Days 3–6',
        '4': 'Day 7+',
      },
      name: 'Landing Pages',
      shortDescription:
        'High-converting pages designed to turn visitors into leads and sales.',
      tagline: 'Conversion-focused pages',
      heroTitle: 'Landing pages that turn visitors into customers',
      intro:
        'A landing page is a focused, single-purpose page created to guide a visitor toward one clear action: buying, signing up, booking or requesting a quote. Unlike a full website, it removes distractions and concentrates all your energy on conversion.',
      introP2:
        'Every element — headline, copy, imagery, form and call-to-action — is designed and tested to move the visitor along the journey. The result is a page that works like a salesperson that never sleeps.',
      benefitsTitle: 'Why invest in a landing page',
      benefits: {
        '1': {
          title: 'More leads',
          text: 'A clear call-to-action and an optimized form capture more contacts from the same traffic.',
        },
        '2': {
          title: 'Better conversion rate',
          text: 'Focused copy and layout increase the percentage of visitors who actually take action.',
        },
        '3': {
          title: 'Faster results',
          text: 'A single page goes live in days, not months — and you can start testing right away.',
        },
        '4': {
          title: 'Measurable performance',
          text: 'Every click, view and submission is tracked, so you always know exactly what works.',
        },
      },
      detailsTitle: 'What I deliver in every landing page',
      details: {
        '1': {
          title: 'Strategy before pixels',
          text: 'We start by defining your offer, your audience and the single action you want. The structure, copy and design are built around that objective — not around what merely looks nice.',
        },
        '2': {
          title: 'Copywriting that sells',
          text: 'Headlines, subheadlines, bullets and calls-to-action are written to persuade. I use proven frameworks to guide the visitor from attention to action.',
        },
        '3': {
          title: 'Speed, SEO and mobile',
          text: 'Pages are built to load in under a second, follow SEO best practices and look flawless on every device — because most of your traffic is on mobile.',
        },
      },
      processTitle: 'How the process works',
      process: {
        '1': {
          title: 'Discovery call',
          text: 'We talk about your business, your audience and your goals. I map out the offer and the key message.',
        },
        '2': {
          title: 'Design',
          text: 'You receive a visual mockup of the page for review before any code is written.',
        },
        '3': {
          title: 'Development',
          text: 'The page is built fast, responsive and optimized for conversions.',
        },
        '4': {
          title: 'Launch and iterate',
          text: 'We go live, track the results and refine the page to improve performance over time.',
        },
      },
      faqTitle: 'Frequently asked questions',
      faqs: {
        '1': {
          q: 'How long does it take?',
          a: 'A typical landing page takes 3 to 7 days, depending on scope and content.',
        },
        '2': {
          q: 'Do I need to write the content?',
          a: 'I can write the copy for you or work from material you already have. You approve everything before launch.',
        },
        '3': {
          q: 'Can I change it later?',
          a: 'Yes. The page is built with an easy-to-edit structure and I offer support after launch.',
        },
      },
      ctaTitle: 'Ready to turn traffic into customers?',
      ctaSubtitle: "Let's build a landing page that pays for itself.",
    },
    websitesForFreelancers: {
      compareTitle: 'Social media only vs. your own website',
      compareWithoutTitle: 'Only social media',
      compareWithTitle: 'With your own website',
      compareWithout: {
        '1': 'Your reach depends on the algorithm',
        '2': 'Information about your services is scattered across posts',
        '3': 'Clients have to message you to ask the basics',
        '4': 'Your profile can be limited or lost at any time',
      },
      compareWith: {
        '1': 'Clients find you on Google when they search for what you do',
        '2': 'Services, prices and process explained in one place',
        '3': 'Questions answered before the first message',
        '4': 'An address that belongs to you, for good',
      },
      pagesTitle: 'Pages your site can have',
      pagesSubtitle: 'A simple structure that answers what every potential client wants to know.',
      pages: {
        '1': {
          title: 'Home',
          text: 'Who you are, what you do and how to hire you — at a glance.',
        },
        '2': {
          title: 'Services',
          text: 'Each service explained, with what is included and how it works.',
        },
        '3': {
          title: 'About',
          text: 'Your story, experience and the way you work.',
        },
        '4': {
          title: 'Portfolio',
          text: 'Real projects and results that prove your skill.',
        },
        '5': {
          title: 'Contact',
          text: 'WhatsApp, form and scheduling, one click away.',
        },
      },
      name: 'Websites for Freelancers',
      shortDescription:
        'Professional websites that build trust and win you more clients.',
      tagline: 'Your digital business card',
      heroTitle: 'A professional website that wins you clients',
      intro:
        'As a freelancer, your website is often the first impression you make on a potential client. A professional site does more than look good — it explains what you do, shows proof of your work and makes it easy for someone to hire you.',
      introP2:
        'Most freelancers rely on Instagram or word of mouth. A website gives you a central, credible place to send people — and it keeps working while you sleep, answering questions and generating opportunities.',
      benefitsTitle: 'What a website does for you',
      benefits: {
        '1': {
          title: 'Credibility',
          text: 'A professional website makes you look established and trustworthy.',
        },
        '2': {
          title: 'Leads on autopilot',
          text: 'Visitors find you, understand your value and contact you — even outside business hours.',
        },
        '3': {
          title: 'A portfolio that sells',
          text: 'Showcase your best work with case studies that convince new clients.',
        },
        '4': {
          title: 'Own your audience',
          text: 'Stop depending on social platforms. Your site, your rules, your data.',
        },
      },
      detailsTitle: 'What I deliver',
      details: {
        '1': {
          title: 'Clear positioning',
          text: 'We define what makes you different and put it at the center of every page.',
        },
        '2': {
          title: 'Services and pricing',
          text: 'Clear pages explaining your services, process and prices reduce friction and attract better clients.',
        },
        '3': {
          title: 'Contact and booking',
          text: 'WhatsApp buttons, contact forms and scheduling so clients can reach you in one click.',
        },
      },
      processTitle: 'How the process works',
      process: {
        '1': {
          title: 'Discovery',
          text: 'We map your services, your audience and your goals in a short conversation.',
        },
        '2': {
          title: 'Design',
          text: 'You approve the look and structure before a single line of code.',
        },
        '3': {
          title: 'Development',
          text: 'Your site is built fast, responsive and ready for search engines.',
        },
        '4': {
          title: 'Launch',
          text: 'We publish, connect your domain and make the site easy to maintain.',
        },
      },
      faqTitle: 'Frequently asked questions',
      faqs: {
        '1': {
          q: 'Do I need a website if I already have Instagram?',
          a: 'Instagram helps with visibility, but a website gives you credibility, control and better conversion. Both work better together.',
        },
        '2': {
          q: "Can you copy my competitor's design?",
          a: 'I create a unique design for your brand. Copying hurts your credibility and your SEO.',
        },
        '3': {
          q: 'Do you help with domain and hosting?',
          a: 'Yes, I handle the entire technical setup so you can focus only on your work.',
        },
      },
      ctaTitle: "Let's build your professional presence",
      ctaSubtitle: "Send me a message and let's plan your website.",
    },
    blogsAndPortfolios: {
      splitTitle: 'Two formats, one goal: being remembered',
      portfolio: {
        title: 'Portfolio',
        text: 'For when your work speaks for itself and you need it seen in the best light.',
        items: {
          '1': 'Project pages with images, context and results',
          '2': 'Filters by category or type of work',
          '3': 'Client testimonials next to each project',
        },
      },
      blog: {
        title: 'Blog',
        text: 'For when your knowledge is the differentiator and you want to be found on search.',
        items: {
          '1': 'Articles organized by categories and tags',
          '2': 'SEO-ready structure for every post',
          '3': 'Newsletter sign-up to keep readers close',
        },
      },
      chapter: 'Chapter',
      name: 'Blogs and Portfolios',
      shortDescription:
        'Show your work, share knowledge and attract your ideal audience.',
      tagline: 'Content and showcase, together',
      heroTitle: 'A place to show your work and share your knowledge',
      intro:
        "A portfolio or blog is more than a collection of projects or articles — it's a tool that works for you. It attracts people interested in what you do, builds authority in your area and turns readers into clients.",
      introP2:
        'I design and build sites where your work shines: fast, beautiful, easy to update and structured so search engines find you.',
      benefitsTitle: 'Why have a blog or portfolio',
      benefits: {
        '1': {
          title: 'Authority',
          text: 'Consistent, quality content positions you as a reference in your field.',
        },
        '2': {
          title: 'Inbound traffic',
          text: 'Search-optimized articles attract visitors who are already looking for your services.',
        },
        '3': {
          title: "Show, don't tell",
          text: 'A well-structured portfolio proves your skill better than any pitch.',
        },
        '4': {
          title: 'Easy updates',
          text: 'Adding a project or a post takes minutes, not a developer.',
        },
      },
      detailsTitle: 'What I deliver',
      details: {
        '1': {
          title: 'Beautiful showcases',
          text: 'Projects presented with images, descriptions and results — built to impress clients and partners.',
        },
        '2': {
          title: 'A blog that grows',
          text: 'An editorial structure with categories, tags and SEO foundations so every post keeps working for you.',
        },
        '3': {
          title: 'Built to be maintained',
          text: 'Simple editing so you own your content and never depend on a developer for small changes.',
        },
      },
      processTitle: 'How the process works',
      process: {
        '1': {
          title: 'Goals',
          text: 'We define what you want to attract: clients, readers or both.',
        },
        '2': {
          title: 'Structure',
          text: 'I map the sections, categories and pages that make sense for your content.',
        },
        '3': {
          title: 'Design and build',
          text: 'Your site is created with your style and your audience in mind.',
        },
        '4': {
          title: 'Training',
          text: 'You learn to publish and edit content on your own, without code.',
        },
      },
      faqTitle: 'Frequently asked questions',
      faqs: {
        '1': {
          q: 'Do I need to know how to write?',
          a: 'No. I help you structure your ideas, and you can also hire me to write the first articles.',
        },
        '2': {
          q: 'Can I update it myself?',
          a: 'Yes. The site is built so you can add projects and posts without touching a single line of code.',
        },
        '3': {
          q: 'Do you write the content too?',
          a: 'Yes, I can create the copy for your portfolio and the first blog posts.',
        },
      },
      ctaTitle: 'Your work deserves a stage',
      ctaSubtitle: "Let's create a portfolio that brings you opportunities.",
    },
    integrations: {
      hubCenter: 'Your website',
      tools: {
        '1': 'WhatsApp',
        '2': 'E-mail',
        '3': 'CRM',
        '4': 'Payments',
        '5': 'Spreadsheets',
        '6': 'Analytics',
      },
      flowTitle: 'What it looks like in practice',
      flowSubtitle: 'A single form submission can set off everything that used to be done by hand.',
      flow: {
        '1': {
          label: 'Trigger',
          title: 'A visitor fills in the form',
          text: 'Name, contact and interest are captured on your website.',
        },
        '2': {
          label: 'Automation',
          title: 'The data goes where it needs to',
          text: 'The lead is saved to your CRM or spreadsheet and you get an alert on WhatsApp.',
        },
        '3': {
          label: 'Result',
          title: 'You reply in minutes',
          text: 'The visitor receives a confirmation e-mail and you follow up while interest is high.',
        },
      },
      name: 'Integrations',
      shortDescription:
        'Forms, email marketing, WhatsApp, payments and much more.',
      tagline: 'Make everything work together',
      heroTitle: 'Integrations that connect your site to your business',
      intro:
        "A beautiful website is only part of the equation. To generate real results, it needs to talk to the tools you already use: email, CRM, payments, notifications and more. That's exactly what integrations are for.",
      introP2:
        'I connect your website with the services that run your business — automating work, reducing errors and making sure no lead is ever lost.',
      benefitsTitle: 'Why integrate your systems',
      benefits: {
        '1': {
          title: 'No more manual work',
          text: 'Data moves automatically between your website and your tools.',
        },
        '2': {
          title: 'No lost leads',
          text: 'Every form submission reaches the right place, instantly.',
        },
        '3': {
          title: 'Automated follow-up',
          text: 'Emails and messages are triggered automatically by visitor actions.',
        },
        '4': {
          title: 'Data in one place',
          text: 'Everything you need, synced in your CRM, spreadsheet or dashboard.',
        },
      },
      detailsTitle: 'What I can connect',
      details: {
        '1': {
          title: 'Forms and email marketing',
          text: 'Contact forms that feed your email list, automations and follow-up sequences.',
        },
        '2': {
          title: 'WhatsApp and notifications',
          text: 'Instant alerts so you never miss a lead, on WhatsApp, email or Telegram.',
        },
        '3': {
          title: 'Payments and analytics',
          text: 'Checkout, payment links, pixel tracking and analytics for your campaigns.',
        },
      },
      processTitle: 'How the process works',
      process: {
        '1': {
          title: 'Audit',
          text: 'We list the tools you use and what needs to communicate with each other.',
        },
        '2': {
          title: 'Plan',
          text: 'I propose the simplest architecture that solves your problem.',
        },
        '3': {
          title: 'Build',
          text: 'The integrations are implemented and tested end to end.',
        },
        '4': {
          title: 'Support',
          text: 'You receive documentation and support for everything that was delivered.',
        },
      },
      faqTitle: 'Frequently asked questions',
      faqs: {
        '1': {
          q: 'Which tools do you support?',
          a: 'The most popular ones: Google Sheets, Mailchimp, WhatsApp, Stripe, Mercado Pago, Telegram and more.',
        },
        '2': {
          q: 'Can you integrate tools I already use?',
          a: 'Yes. I work with what you already have and avoid unnecessary costs.',
        },
        '3': {
          q: 'Is it secure?',
          a: 'Yes. I follow security best practices and never store sensitive data without a real need.',
        },
      },
      ctaTitle: "Let's connect your systems",
      ctaSubtitle:
        "Tell me what you use and I'll make it all talk to each other.",
    },
  },
  queens: {
    queens: 'Queens',
    level: 'Level',
    'level-1': 'Beginner',
    'level-2': 'Easy',
    'level-3': 'Medium',
    'level-4': 'Hard',
    'level-5': 'Expert',
    'new-game': 'New Game',
    hint: 'Hint',
    congratulations: 'Congratulations! Puzzle solved!',
    'queens-placed': 'queens placed',
    'check-errors': 'Check for rule violations',
    loading: 'Loading...',
    'how-to-play': 'How to Play',
    'rule-row': 'Place exactly one queen in each row.',
    'rule-col': 'Place exactly one queen in each column.',
    'rule-region': 'Place exactly one queen in each colored region.',
    'rule-adjacent': 'No two queens can touch, even diagonally.',
    'tip-tap': 'Tap once to mark ✕, tap again to place ♛, tap again to clear.',
    'tip-x':
      'Slide your finger across cells to quickly mark ✕ on multiple cells.',
    'tip-slide': 'Use ✕ marks to flag cells you know cannot contain a queen.',
    'faq-title': 'Frequently Asked Questions',
    'faq-q1': 'What is the Queens game?',
    'faq-a1':
      'Queens is a logic puzzle where you place queens on a board so that each row, column, and colored region contains exactly one queen, and no two queens touch each other (horizontally, vertically, or diagonally).',
    'faq-q2': 'How do I play?',
    'faq-a2':
      'Tap a cell to cycle through states: ✕ mark → ♛ queen → empty. Slide your finger across the board to quickly mark ✕ on multiple cells. The game highlights rule violations in red.',
    'faq-q3': 'What happens if I make a mistake?',
    'faq-a3':
      'Conflicting queens are highlighted in red. Review your placements and adjust until all constraints are satisfied. The game does not have a move limit — experiment freely!',
    'faq-q4': 'Is there a new puzzle every day?',
    'faq-a4':
      'Yes! The board is generated daily based on the current date, giving you a fresh challenge every day. Share your results with friends!',
    'seo-title': 'Play Queens — Daily Logic Puzzle',
    'seo-p1':
      'Queens is a daily logic puzzle inspired by the classic N-Queens problem. Your goal is to place queens on the board following four simple rules: one queen per row, one per column, one per colored region, and no two queens may touch each other.',
    'seo-p2':
      'Choose from 5 difficulty levels — Beginner (5×5), Easy (6×6), Medium (7×7), Hard (8×8), and Expert (10×10). Each puzzle is generated deterministically from the date, so everyone gets the same challenge every day.',
    'seo-p3':
      'Play online for free, no registration required. Train your logical reasoning and pattern recognition skills. A brand new puzzle awaits you every day. Bookmark this page and come back daily!',
  },
  sudoku: {
    sudoku: 'Sudoku',
    size: 'Grid',
    'size-4': '4×4 Mini',
    'size-6': '6×6',
    'size-9': '9×9 Classic',
    difficulty: 'Difficulty',
    'difficulty-0': 'Easy',
    'difficulty-1': 'Medium',
    'difficulty-2': 'Hard',
    'new-game': 'New Game',
    notes: 'Notes',
    eraser: 'Erase',
    undo: 'Undo',
    hint: 'Hint',
    mistakes: 'Mistakes',
    congratulations: 'Congratulations! Puzzle solved!',
    loading: 'Loading...',
    'keyboard-hint':
      'Tip: use the arrow keys to move around the grid, the number keys to fill, N to toggle notes, Delete to erase.',
    'how-to-play': 'How to Play',
    'rule-1': 'Each row must contain every number from 1 to N exactly once.',
    'rule-2': 'Each column must contain every number from 1 to N exactly once.',
    'rule-3':
      'Each bold-outlined box must contain every number from 1 to N exactly once.',
    'tip-1':
      'Start with the boxes that already have the most numbers and scan each row, column and box for cells with only one possible value.',
    'tip-2':
      'Use Notes to pencil in candidate numbers. They are shown as small digits and help you keep track of possibilities.',
    'tip-3':
      'You can play with the mouse, the touchscreen or the keyboard. Numbers that repeat in the same row, column or box are highlighted in red.',
    'strategy-title': 'Tips & Strategies',
    'strategy-p1':
      'Look for single candidates: if only one number can fit in a cell, fill it in right away. This is the most important technique for beginners.',
    'strategy-p2':
      'Scan rows, columns and boxes for missing numbers. When a number is already placed in two boxes of a row, the third one often gives you a free clue.',
    'strategy-p3':
      'Use pencil marks. Write down every possible number in each cell, then eliminate them one by one as you solve. This turns hard puzzles into a manageable process.',
    'strategy-p4':
      'Practice a little every day. Regular Sudoku play improves concentration, pattern recognition and short-term memory — and it is genuinely relaxing.',
    'faq-title': 'Frequently Asked Questions',
    'faq-q1': 'What is Sudoku?',
    'faq-a1':
      'Sudoku is a logic-based number puzzle. The goal is to fill a grid so that every row, column and box contains each number from 1 to N exactly once. No math is needed — just logic.',
    'faq-q2': 'How do I play Sudoku?',
    'faq-a2':
      'Select a grid size (4×4, 6×6 or 9×9), choose a difficulty and tap any cell to select it. Then enter a number using the on-screen pad or your keyboard. Every puzzle has exactly one solution.',
    'faq-q3': 'What do the grid sizes mean?',
    'faq-a3':
      '4×4 is a tiny mini-Sudoku perfect for beginners and kids, 6×6 is a compact challenge, and 9×9 is the classic Sudoku played around the world. Each size uses numbers from 1 to N.',
    'faq-q4': 'Is Sudoku good for your brain?',
    'faq-a4':
      'Yes. Sudoku trains logical reasoning, concentration and memory, and studies suggest regular puzzle solving keeps the mind sharp. It is also a calm, screen-friendly break from social media.',
    'faq-q5': 'Is this Sudoku really free?',
    'faq-a5':
      'Yes, 100% free. There is no registration, no downloads and no time limit. You can play Sudoku online directly in your browser on any device.',
    'seo-title': 'Play Sudoku Online — Free Mini Sudoku Generator',
    'seo-p1':
      'Welcome to our free online Sudoku generator. Play Sudoku online in your browser with three grid sizes — 4×4 mini, 6×6 and the classic 9×9 — and three difficulty levels, from easy warm-ups to hard challenges.',
    'seo-p2':
      'Every game is generated instantly with a unique solution, so you always get a fair, solvable puzzle. Choose your favorite grid, adjust the difficulty and click New Game to get a fresh board in a second.',
    'seo-p3':
      "Sudoku is one of the world's most popular logic puzzles. It trains your reasoning, sharpens your concentration and is perfect for a short break. And the best part: our Sudoku works on mobile, tablet and desktop without installing anything.",
    'seo-p4':
      'Whether you want to teach kids with a 4×4 mini grid, warm up with an easy 6×6, or test yourself with a hard 9×9, you can play Sudoku online here at any time. Notes, hints, undo, keyboard shortcuts and mistake highlighting make every game easy to enjoy.',
    'seo-p5':
      'Bookmark this page and come back whenever you need a mental workout. Play Sudoku online for free, improve your logic and have fun — one grid at a time.',
  },
  wordLadder: {
    name: 'Word Ladder',
    home: 'Home',
    intro:
      'Change one letter at a time to turn the starting word into the target word. Every step must be a real English word. Play free in your browser, with daily puzzles and three difficulty levels.',
    mode: 'Mode',
    'mode-classic': 'Classic',
    'mode-daily': 'Daily',
    difficulty: 'Difficulty',
    'difficulty-easy': 'Easy',
    'difficulty-medium': 'Medium',
    'difficulty-hard': 'Hard',
    'daily-today': "Today's Word Ladder",
    'new-game': 'New Game',
    moves: 'Moves',
    best: 'Best',
    target: 'Target',
    time: 'Time',
    'daily-done':
      "You already solved today's puzzle. Come back tomorrow for a new one!",
    start: 'Start',
    'your-move': 'Your next word',
    'input-placeholder': 'WORD',
    submit: 'Go',
    hint: 'Hint',
    undo: 'Undo',
    'start-game': 'Start Game',
    'err-empty': 'Type a word first.',
    'err-length': 'The word must have the same length as the starting word.',
    'err-dictionary': "That's not a word in our dictionary. Try another word.",
    'err-one-letter': 'Change exactly one letter.',
    'hint-text':
      'Think of a word that is one letter away from your current word.',
    'hint-1': 'Your next word starts with {letter}.',
    'hint-2': 'Try changing the letter in position {position}.',
    'hint-3': 'A possible next word is {word}.',
    'live-move': 'Now at {word}.',
    'live-undo': 'Move undone.',
    complete: 'Word Ladder Complete!',
    'result-moves':
      'You turned the starting word into the target word. Great job!',
    'result-optimal': 'Try to finish in as few moves as possible next time.',
    'daily-streak': 'Daily streak:',
    'play-again': 'Play Again',
    'next-puzzle': 'Next Puzzle',
    share: 'Share',
    'share-copied': 'Result copied to clipboard.',
    'how-to-play': 'How to Play Word Ladder',
    'rule-1': 'Start with the blue word at the top of the ladder.',
    'rule-2':
      'Type a new word that differs from your current word by exactly one letter.',
    'rule-3': 'Every word you enter must be a real English word.',
    'rule-4':
      'Keep going, one step at a time, until you reach the amber target word.',
    'rule-5':
      'Try to finish in as few moves as possible to beat your best score.',
    'rules-title': 'Official Word Ladder Rules',
    'rules-p1':
      'A word ladder is solved when you transform the starting word into the target word using only real words, changing exactly one letter at each step. For example, CAT → COT → COG → DOG.',
    'rules-p2':
      'You may change the position of the letter as well as its value, but only one letter may change per move. You can use a hint (up to three per game) if you get stuck, and you can undo a move at any time.',
    'rules-p3':
      'In Classic mode you choose the difficulty and play as many puzzles as you like. In Daily mode there is one shared puzzle per day, and completing it keeps your streak alive.',
    'tips-title': 'Tips & Strategies',
    'tip-1':
      'Focus on the vowels. Words that differ by a single vowel are almost always valid, and vowels open up the most paths.',
    'tip-2':
      'Work backwards from the target word too. Often the best path becomes clear when you plan from both ends.',
    'tip-3':
      'Keep letter positions in mind. Changing a letter near the end of the word usually keeps more options open.',
    'tip-4':
      'Look for common letter patterns like -ATE, -ING or -IDE. Reusing a pattern lets you cross several words quickly.',
    'tip-5':
      'Use your three hints wisely. The last hint reveals the exact next word, which is very valuable in hard puzzles.',
    'whatis-title': 'What Is a Word Ladder?',
    'whatis-p1':
      'A word ladder is a word puzzle invented by Lewis Carroll in 1877, who called it a Doublets puzzle. You begin with two words of the same length and connect them through a chain of real words, changing one letter at a time.',
    'whatis-p2':
      'For example, transforming COLD into WARM could go COLD → CORD → WORD → WARD → WARM. The puzzle is popular in classrooms because it builds spelling, vocabulary and logical thinking in a fun, game-like format.',
    'levels-title': 'Difficulty Levels',
    'levels-easy': 'Easy:',
    'levels-easy-p':
      'Short chains of 2 to 4 moves between very common words. Perfect for kids and beginners.',
    'levels-medium': 'Medium:',
    'levels-medium-p':
      'Chains of 5 to 7 moves. A good daily brain workout for regular players.',
    'levels-hard': 'Hard:',
    'levels-hard-p':
      'Long chains of 8 or more moves. Only the sharpest word puzzle fans will crack these.',
    'kids-title': 'Word Ladder for Kids',
    'kids-p1':
      'Word ladders are a fantastic activity for children learning to read and spell. Each move requires comparing letters, sounding words out and thinking about vocabulary, all while playing a game.',
    'kids-p2':
      "Start kids on Easy mode, where short words like CAT and DOG connect in just a few moves. It's screen-friendly, calm and secretly educational.",
    'faq-title': 'Word Ladder FAQ',
    'faq-q1': 'What is a Word Ladder game?',
    'faq-a1':
      'A word ladder is a word puzzle in which you turn one word into another by changing a single letter at a time, using a real word after every step. It was invented by Lewis Carroll in 1877.',
    'faq-q2': 'How do you play Word Ladder?',
    'faq-a2':
      'Start from the blue starting word, then enter words that differ from the previous one by exactly one letter. Keep going until you reach the amber target word. The fewer moves, the better.',
    'faq-q3': 'What are the rules of Word Ladder?',
    'faq-a3':
      'Each move changes exactly one letter, and every word must be a real English word of the same length as the start and target words. You cannot repeat a word already in your ladder.',
    'faq-q4': 'Can you change more than one letter in a word ladder?',
    'faq-a4':
      'No. Exactly one letter may change per move. Changing two or more letters at once breaks the rules of the puzzle.',
    'faq-q5': 'What makes a word ladder hard?',
    'faq-a5':
      'Difficulty depends on the distance between the two words, how many real words exist between them, and how easy it is to get stuck in dead ends along the way.',
    'faq-q6': 'Are word ladders good for kids?',
    'faq-a6':
      'Yes. Word ladders are widely used in schools to practise spelling, letter-sound correspondence and vocabulary, and they make a calm, educational screen activity.',
    'faq-q7': 'Is this Word Ladder game free?',
    'faq-a7':
      'Yes, completely free. There is no registration, no downloads and no time limit. Play in your browser on any device, including your phone.',
    'related-title': 'More Free Online Games',
    'related-p':
      'If you enjoy word puzzles, try our other free logic games — all of them work on mobile and desktop.',
    'related-sudoku': 'Classic logic puzzle with three grid sizes.',
    'related-queens': 'A daily placement puzzle inspired by N-Queens.',
  },
  seo: {
    cardTagline: 'Websites, landing pages and automation',
    home: {
      title: 'Breno Carvalho — Landing pages and websites that convert',
      description: 'Fast, modern, search-optimized landing pages and websites that turn visitors into customers. Design, development, hosting and automation in one place.',
    },
    services: {
      title: 'Website and landing page development services',
      description: 'Landing pages, professional websites, blogs, portfolios and integrations with WhatsApp, CRM and payments. Find the right service for your business.',
    },
    landingPages: {
      title: 'Landing page design that turns visitors into customers',
      description: 'High-converting landing pages with persuasive copy, social proof and a clear call to action. Fast, mobile-first and ready for paid traffic.',
    },
    websitesForFreelancers: {
      title: 'Professional websites for freelancers and the self-employed',
      description: 'A professional website that builds trust and brings new clients: services, portfolio, testimonials and WhatsApp contact, fast and easy to find on Google.',
    },
    blogsAndPortfolios: {
      title: 'Blog and portfolio websites to showcase your work',
      description: 'A blog or portfolio to show your work, publish content and attract your ideal audience, with SEO, fast loading and easy updates.',
    },
    integrations: {
      title: 'Website integrations with WhatsApp, CRM, email and payments',
      description: 'Connect your website to WhatsApp, CRM, email marketing, payments and spreadsheets to capture and follow up on leads automatically.',
    },
    sudoku: {
      title: 'Free online Sudoku with 4×4, 6×6 and 9×9 grids',
      description: 'Play Sudoku for free in your browser: 4×4, 6×6 and 9×9 grids, three difficulty levels, notes, hints and undo. Works on mobile and desktop.',
    },
    queens: {
      title: 'Queens puzzle — free online logic game',
      description: 'Place one queen in every row, column and colored region without two queens touching. Five difficulty levels and hints. Play free online.',
    },
    wordLadder: {
      title: 'Word Ladder — free online word puzzle game',
      description: 'Change one letter at a time to turn the starting word into the target word. Daily puzzles and three difficulty levels, free in your browser.',
    },
  },
};

export type Translations = typeof englishTranslations;

export type IsGenericString<T> = [T] extends [string]
  ? [string] extends [T]
    ? true
    : false
  : false;

export type TranslationKeyChecker<
  TranslationPath extends string,
  Walking extends Record<string, any> = Translations,
> =
  IsGenericString<TranslationPath> extends true
    ? TranslationPath
    : TranslationPath extends `${infer Part1}.${infer Part2}`
      ? Part1 extends keyof Walking
        ? `${Part1}.${TranslationKeyChecker<Part2, Walking[Part1]>}`
        : never
      : TranslationPath extends keyof Walking
        ? Walking[TranslationPath] extends string
          ? TranslationPath
          : never
        : never;
