import type { Translations } from './english';
import { minesweeper } from './games/minesweeper/fr';
import { nonogram } from './games/nonogram/fr';
import { binaryPuzzle } from './games/binary-puzzle/fr';
import { memory } from './games/memory/fr';
import { colorLink } from './games/color-link/fr';

export const frenchTranslations: Translations = {
  minesweeper,
  nonogram,
  binaryPuzzle,
  memory,
  colorLink,
  catalog: {
    explore: 'Explorer les jeux et outils',
    toggle: 'Réduire ou déployer le menu',
    close: 'Fermer le menu',
    skip: 'Aller au contenu',
    gamesTitle: 'Jeux de logique et de lettres gratuits en ligne',
    gamesIntro:
      'Jouez au Sudoku, à Queens et à Word Ladder dans votre navigateur, sur téléphone, tablette ou ordinateur.',
    gamesHeading: 'Choisissez votre prochain défi',
    gamesText:
      'Résolvez des grilles de Sudoku, placez chaque reine ou reliez des mots en changeant une lettre à la fois. Chaque jeu propose ses règles, commandes et conseils.',
    toolsTitle: 'Outils en ligne pour le quotidien',
    toolsIntro:
      'Formatez du JSON et inspectez des jetons JWT avec des outils gratuits pour développeurs dans votre navigateur.',
    toolsHeading: 'Des outils pour le développement au quotidien',
    toolsText:
      'Validez et minifiez du JSON ou consultez les claims et les dates d’expiration JWT. Découvrez aussi nos jeux de logique.',
  },
  backHome: "Retour à l'accueil",
  cases: {
    viewCase: "Voir l'étude de cas",
    visitSite: "Visiter le site",
    backToProjects: "Retour aux projets",
    myRole: "Ce que j'ai fait",
    aboutTitle: "À propos du projet",
    highlightsTitle: "Points clés",
    galleryTitle: "Sur ordinateur et sur mobile",
    techTitle: "Sous le capot",
    desktop: "version ordinateur",
    mobile: "version mobile",
    ctaTitle: "Vous avez un projet similaire en tête ?",
    ctaText: "Dites-moi ce dont vous avez besoin et je vous réponds avec les prochaines étapes.",
    ctaButton: "Parler de mon projet",
    roles: {
      design: "Design",
      implementation: "Implémentation",
      hosting: "Hébergement",
      maintenance: "Maintenance",
    },
    items: {
      jingle: {
        tagline: "Plateforme de création de jingles par intelligence artificielle",
        summary: "Une plateforme où chacun transforme une idée en jingle : l'intelligence artificielle écrit les paroles, crée la musique et génère la voix, avec téléchargement en MP3. J'ai réalisé le design, l'implémentation et l'hébergement, et j'assure la maintenance.",
        about: "jingle.ia.br sort le jingle du studio. Boulangeries, pizzerias, supermarchés, radios et agences décrivent leur message, choisissent un rythme brésilien comme le forró, le sertanejo ou le pagode, comparent trois propositions de paroles et téléchargent la chanson finie. La même plateforme sert pour les anniversaires, les événements, les podcasts et les campagnes, sans savoir composer.",
        work: {
          design: {
            intro: "Le public n'a jamais écrit de chanson. Chaque choix de design lève un doute en chemin.",
            decisions: {
              '1': {
                title: "Quatre étapes, une question à la fois",
                text: "Idée, ton, paroles et téléchargement. Des étapes courtes évitent la page blanche à ceux qui ne savent pas par où commencer.",
              },
              '2': {
                title: "Choisir plutôt qu’écrire",
                text: "On compare trois textes avant de générer l'audio. Choisir est plus simple qu'écrire, et le crédit n'est dépensé que pour ce qui a été validé.",
              },
              '3': {
                title: "Une identité très brésilienne",
                text: "Vert et jaune, mégaphone et rythmes régionaux montrent dès le premier écran à qui s'adresse le produit.",
              },
            },
          },
          implementation: {
            intro: "Générer de la musique prend du temps et peut échouer. L'implémentation évite que cela pèse sur l'utilisateur.",
            decisions: {
              '1': {
                title: "Génération en arrière-plan",
                text: "Le jingle continue d'être généré même si la page est fermée. On suit le statut et on télécharge le MP3 quand il est prêt.",
              },
              '2': {
                title: "Un échec ne coûte pas de crédit",
                text: "Si la création des paroles échoue, le jingle revient au solde de l'offre et l'écran explique ce qui s'est passé.",
              },
              '3': {
                title: "Offres par abonnement",
                text: "Trois offres mensuelles avec un quota de jingles et résiliation à tout moment. L'offre d'entrée inclut un filigrane vocal.",
              },
            },
          },
          hosting: {
            intro: "L'usage arrive par pics, comme les fêtes et les campagnes. L'infrastructure suit ce rythme.",
            decisions: {
              '1': {
                title: "Payer ce qu’on utilise",
                text: "Architecture serverless : pas de serveur inactif en attente de visites, et la capacité augmente seule quand le trafic monte.",
              },
              '2': {
                title: "Un domaine qui s’explique",
                text: "Le .ia.br dit ce que fait le produit et qu'il est brésilien, avant même d'ouvrir le site.",
              },
            },
          },
          maintenance: {
            intro: "Le produit continue d’évoluer après le lancement.",
            decisions: {
              '1': {
                title: "Évolution continue",
                text: "Nouveaux types de jingles, idées de brief et contenus arrivent à mesure que l'usage réel montre ce qui manque.",
              },
              '2': {
                title: "Corrections rapides",
                text: "Je surveille les erreurs et les coûts des services d'IA pour corriger les problèmes avant qu'ils ne deviennent des plaintes.",
              },
            },
          },
        },
        tech: {
          intro: "Une stack serverless sur AWS, qui orchestre plusieurs modèles d'IA et sert depuis l'edge.",
          frontend: "SPA Angular dans un monorepo avec le back-end : un dépôt, un flux de build et de déploiement.",
          backend: "Back-end serverless en Node.js sur AWS Lambda, avec DynamoDB comme base NoSQL. Scale à la demande et facturé à l'exécution.",
          ai: "Pipeline asynchrone qui orchestre des LLM d'OpenAI et de Gemini, l'inférence de modèles sur Replicate et la synthèse vocale avec ElevenLabs.",
          payments: "Abonnements récurrents sur Asaas, intégrés par API et webhooks pour libérer le quota de chaque offre.",
          infra: "Assets statiques servis par le CDN CloudFront, DNS et proxy en edge avec Cloudflare et domaine .ia.br enregistré chez Registro.br.",
        },
        highlights: {
          '1': {
            value: "3",
            label: "propositions de paroles par jingle",
          },
          '2': {
            value: "8",
            label: "genres musicaux brésiliens",
          },
          '3': {
            value: "60 s",
            label: "de jingle, téléchargeable en MP3",
          },
          '4': {
            value: "R$ 9,90",
            label: "par mois pour l'offre d'entrée",
          },
        },
      },
      supervegetariano: {
        tagline: "Restaurant végétarien à Santos (Brésil) depuis 1986",
        summary: "Le site d'un restaurant végétarien traditionnel de Santos, au Brésil. Le site existait déjà : je l'ai migré vers un nouvel hébergement en 1 jour, j'ai configuré les e-mails chez KingHost et fait de petits ajustements.",
        about: "Super Vegetariano sert une cuisine maison, savoureuse et saine à Santos depuis février 1986. Le site présente l'histoire de la maison, ses adresses, le menu du jour sur les réseaux sociaux et le contact par WhatsApp. Il a été réalisé sous WordPress par une autre équipe.",
        work: {
          hosting: {
            intro: "Le site fonctionnait déjà et les clients le connaissaient. L'objectif était de changer l'infrastructure sans que personne ne s'en aperçoive.",
            decisions: {
              '1': {
                title: "Migration en 1 jour",
                text: "Les fichiers, la base de données et le domaine WordPress sont passés sur le nouvel hébergement en une seule journée, contenu et design conservés.",
              },
              '2': {
                title: "E-mails chez KingHost",
                text: "J'ai configuré les comptes e-mail du domaine chez KingHost, pour que le restaurant continue de recevoir ses messages à sa propre adresse.",
              },
              '3': {
                title: "Petits ajustements",
                text: "Après la migration, j'ai corrigé quelques détails sans toucher à l'identité que les clients reconnaissent.",
              },
            },
          },
        },
        highlights: {
          '1': {
            value: "40",
            label: "ans à servir une cuisine saine",
          },
          '2': {
            value: "2",
            label: "adresses à Santos, Brésil",
          },
          '3': {
            value: "1 jour",
            label: "pour terminer la migration",
          },
          '4': {
            value: "1986",
            label: "année de création",
          },
        },
      },
    },
  },
  scheduling: {
    title: 'Planifiez un échange',
    description:
      'Choisissez un créneau de 30 minutes pour discuter de votre projet.',
    openCalendar: 'Ouvrir le calendrier',
  },
  games: {
    label: 'Jeux',
    subtitle: "Une collection de jeux que j'ai créés.",
    play: 'Jouer',
    share: "Partager le résultat",
    shareCopied: "Lien copié !",
    time: "Temps",
    timerHint: "Le chrono démarre à votre premier coup.",
    moves: "Coups",
    newGame: "Nouvelle partie",
    playAgain: "Rejouer",
    level: "Niveau",
    queensDescription:
      'Un puzzle de logique quotidien inspiré du problème classique des N-Reines.',
    sudokuDescription:
      'Un générateur de Sudoku avec des grilles 4×4, 6×6 et 9×9 et une difficulté réglable.',
    wordLadderDescription:
      'Un jeu de lettres où vous changez une lettre à la fois pour transformer un mot en un autre, avec des puzzles quotidiens et trois niveaux de difficulté.',
  },
  tools: {
    label: 'Outils',
    subtitle: "Des outils utiles que j'ai créés.",
    emptyTitle: 'Aucun outil disponible pour le moment',
    emptyDescription:
      'De nouveaux outils arrivent bientôt. Revenez vite !',
  },
  home: {
    title:
      'Développeur <span class="text-foreground-emphasis">spécialisé en landing pages</span> et <span class="text-foreground-emphasis">sites autonomes</span>.',
    description:
      'Je crée des sites rapides, modernes et optimisés pour transformer les visiteurs en clients et renforcer votre présence en ligne.',
    websiteLikeThis: 'Je veux un site comme ça',
    whatsappMessage: "Bonjour ! J'aimerais demander un devis pour un site web.",
    nav: {
      home: 'Accueil',
      services: 'Services',
      whyMe: 'Pourquoi moi',
      projects: 'Projets',
      testimonials: 'Témoignages',
      allServices: "Tous les services",
      segments: "Secteurs",
      gamesAndTools: "Jeux et outils",
    },
    services: {
      name: 'Services',

      // title: "Soluções Completas para profissionais que querem crescer",
      // description: "Desenvolvimento estratégico focado em perfomance, design e conversão. Tudo que você precisa para ter presença, autoridade e resultados online.",

      // landingPages: "Landing Pages",
      // landingPagesDescription: "Páginas de alta conversão para captar mais leads e fechar mais negócios.",

      // websitesForFreelancers: "Sites para Autônomos",
      // websitesForFreelancersDescription: "Sites profissionais que transmitem confiança e geram novos oportunidades.",

      // blogsAndPortofolios: "Blogs e Portfólios",
      // blogsAndPortofoliosDescription: "Mostre seu trabalho, compartilhe conhecimento e atraia seu público ideal.",

      // integrations: "Integrações",
      // integrationsDescription: "Formulários, e-mail marketing, WhatsApp, pagamentos e muito mais.",

      title:
        "Solutions completas pour les professionnels qui veulent s'étendre",
      description:
        'Développement stratégique axé sur la performance, le design et la conversion. Tout ce dont vous avez besoin pour avoir une présence, une autorité et des résultats en ligne.',

      landingPages: 'Pages de lancement',
      landingPagesDescription:
        'Pages de conversion haute pour attraper plus de leads et fermer plus de boutiques.',

      websitesForFreelancers: 'Sites pour Freelancers',
      websitesForFreelancersDescription:
        'Sites professionnels qui transmettent de la confiance et génèrent de nouvelles opportunités.',

      blogsAndPortofolios: 'Blogs et Portfolios',
      blogsAndPortofoliosDescription:
        'Montrez votre travail, partagez des connaissances et attirez votre public cible.',

      integrations: 'Intégrations',
      integrationsDescription:
        'Formulaires, marketing par e-mail, WhatsApp, paiements et bien plus.',
    },
    whyMe: {
      name: 'POURQUOI TRAVAILLER AVEC MOI ?',
      title:
        'Compromis avec résultats et attention à chaque détail',
      description:
        'Plus que du code, je propose une stratégie, une communication et un partenaire pour vous aider à atteindre vos objectifs.',
      list: {
        '1Title': 'Communication claire et directe',
        '1Subtitle': 'Suivi tout au long de toutes les étapes',
        '2Title': 'Design moderne et personnalisé',
        '2Subtitle': 'Sites uniques qui représentent votre marque',
        '3Title': 'Focus sur performance',
        '3Subtitle': 'Sites rapides qui ne perdent pas de visiteurs',
        '4Title': 'Optimisé pour les moteurs de recherche',
        '4Subtitle': 'Plus de visibilité pour votre entreprise',
      },
      yoE: '5+ ans',
      yoEDescription: 'Développement de solutions numériques',
    },
    projects: {
      name: 'Portfolio',
      title: 'Des projets qui génèrent des résultats',
      description:
        "Quelques travaux récents développés pour des professionnels et des entreprises qui m'ont fait confiance.",
      viewAll: 'Voir tous les projets',
    },
    testimonials: {
      name: 'Témoignages',
      title: 'Ce que disent mes clients :',
      previous: 'Témoignages précédents',
      next: 'Témoignages suivants',
      ctaTitle:
        'Prêt à avoir un site qui apporte de vrais résultats ?',
      ctaDescription:
        'Parlons de vos projets et donnons vie à vos idées.',
      whatsapp: 'Parler sur WhatsApp',
      whatsappMessage:
        "Bonjour ! J'ai vu votre portfolio et j'aimerais parler d'un projet.",
      requestBudget: 'Demander un devis',
      items: {
        '1': {
          text: "Breno a compris exactement ce dont j'avais besoin et a livré une page rapide, belle, qui a commencé à apporter des contacts qualifiés dès la première semaine.",
          name: 'Mariana Alves',
          profession: 'Architecte',
        },
        '2': {
          text: "Le processus a été clair du début à la fin. J'ai enfin un site professionnel qui explique mon travail et inspire confiance.",
          name: 'Rafael Costa',
          profession: "Consultant d'affaires",
        },
        '3': {
          text: 'En plus du design, le soin apporté à la performance a fait une grande différence. Le site charge vite et fonctionne parfaitement sur mobile.',
          name: 'Camila Torres',
          profession: "Propriétaire d'un studio de beauté",
        },
        '4': {
          text: 'Il a transformé une idée vague en une présence digitale soignée. La communication a été simple et le résultat correspond à ma marque.',
          name: 'Lucas Mendes',
          profession: 'Coach sportif',
        },
      },
    },
    footer: {
      ctaTitle: "Créons quelque chose d'incroyable ensemble ?",
      ctaSubtitle:
        'Je suis prêt à transformer votre idée en un site professionnel, rapide et vraiment orienté résultats.',
      cards: {
        closeService: {
          title: 'Accompagnement proche',
          subtitle: 'Focalisé sur votre projet',
        },
        transparentProcess: {
          title: 'Processus transparent',
          subtitle: 'Vous suivez chaque étape',
        },
        properSupport: {
          title: 'Support adapté',
          subtitle: "Je l'ajuste à votre façon",
        },
      },
      brandSubtitle:
        'Programmeur freelance spécialisé dans la création de sites qui génèrent des résultats pour indépendants et petites entreprises.',
      navigation: 'Navigation',
      services: 'Services',
      letsTalk: 'On échange ?',
      downloadCurriculum: 'Télécharger le CV',
      rights: 'Tous droits réservés.',
    },
    estimateBudget: 'Demander un devis',
  },
  servicesPage: {
    common: {
      backHome: "Retour à l'accueil",
      backToServices: 'Tous les services',
      otherServices: 'Découvrez nos autres services',
      requestBudget: 'Demander un devis',
      ready: 'Prêt à commencer ?',
      whatsappMessage:
        "Bonjour ! J'ai vu votre portfolio et j'aimerais parler d'un projet.",
    },
    index: {
      title: 'Services',
      subtitle:
        'Développement stratégique axé sur la performance, le design et la conversion.',
      description:
        'Tout ce dont vous avez besoin pour avoir une présence, une autorité et des résultats réels en ligne. Chaque service est conçu pour résoudre un problème précis — rapide, moderne et optimisé pour les moteurs de recherche.',
      viewAll: 'En savoir plus',
      ctaTitle: 'Vous ne savez pas quel service correspond à vos besoins ?',
      ctaSubtitle:
        'Envoyez-moi un message et je vous aiderai à choisir la meilleure voie pour votre projet.',
    },
    landingPages: {
      proofTitle: "Projets déjà en ligne",
      formTitle: "Demandez votre devis",
      formSubtitle: "Seulement deux champs. La conversation continue sur WhatsApp.",
      formName: "Votre nom",
      formOffer: "Que voulez-vous vendre ou promouvoir ?",
      formOfferPlaceholder: "Ex. : une formation, du conseil, un lancement",
      messageIntro: "Bonjour Breno ! Je veux une landing page.",
      messageName: "Nom",
      messageOffer: "Offre",
      anatomyTitle: "Anatomie d'une page qui convertit",
      anatomySubtitle: 'Chaque bloc a un rôle. Voici ce que fait chaque partie de votre landing page pour amener le visiteur à agir.',
      anatomy: {
        '1': {
          title: 'Titre',
          text: "Une promesse claire qui dit au visiteur, en quelques secondes, ce qu'il obtient et pourquoi c'est important.",
        },
        '2': {
          title: 'Preuve sociale',
          text: "Témoignages, logos et chiffres qui montrent que d'autres vous font déjà confiance.",
        },
        '3': {
          title: 'Offre et bénéfices',
          text: 'Ce qui est inclus, présenté comme des résultats pour le client plutôt que comme une liste de fonctionnalités.',
        },
        '4': {
          title: 'Formulaire',
          text: "Uniquement les champs vraiment nécessaires, pour qu'il soit facile à remplir.",
        },
        '5': {
          title: "Appel à l'action",
          text: 'Une seule action, répétée aux bons moments, avec un bouton impossible à manquer.',
        },
      },
      timeline: {
        '1': 'Jour 1',
        '2': 'Jours 2–3',
        '3': 'Jours 3–6',
        '4': 'Jour 7+',
      },
      name: 'Landing Pages',
      shortDescription:
        'Des pages à forte conversion, conçues pour transformer les visiteurs en prospects et en ventes.',
      tagline: 'Des pages axées sur la conversion',
      heroTitle: 'Des landing pages qui transforment les visiteurs en clients',
      intro:
        "Une landing page est une page ciblée, à but unique : guider le visiteur vers une action claire — acheter, s'inscrire, réserver ou demander un devis. Contrairement à un site complet, elle élimine les distractions et concentre toute l'énergie sur la conversion.",
      introP2:
        "Chaque élément — titre, texte, images, formulaire et appel à l'action — est conçu et testé pour faire avancer le visiteur dans son parcours. Le résultat est une page qui agit comme un vendeur qui ne dort jamais.",
      benefitsTitle: 'Pourquoi investir dans une landing page',
      benefits: {
        '1': {
          title: 'Plus de prospects',
          text: "Un appel à l'action clair et un formulaire optimisé captent plus de contacts avec le même trafic.",
        },
        '2': {
          title: 'Meilleur taux de conversion',
          text: 'Un texte et une mise en page ciblés augmentent le pourcentage de visiteurs qui agissent réellement.',
        },
        '3': {
          title: 'Des résultats plus rapides',
          text: 'Une seule page est en ligne en quelques jours, pas en quelques mois — et vous pouvez tester immédiatement.',
        },
        '4': {
          title: 'Performance mesurable',
          text: 'Chaque clic, vue et envoi est suivi, pour savoir exactement ce qui fonctionne.',
        },
      },
      detailsTitle: 'Ce que je livre dans chaque landing page',
      details: {
        '1': {
          title: 'La stratégie avant les pixels',
          text: "Nous commençons par définir votre offre, votre audience et l'unique action souhaitée. La structure, le texte et le design sont construits autour de cet objectif — pas autour de ce qui est simplement joli.",
        },
        '2': {
          title: 'Un copywriting qui vend',
          text: "Titres, sous-titres, puces et appels à l'action sont rédigés pour convaincre. J'utilise des cadres éprouvés pour guider le visiteur de l'attention à l'action.",
        },
        '3': {
          title: 'Vitesse, SEO et mobile',
          text: "Les pages chargent en moins d'une seconde, respectent les bonnes pratiques SEO et s'affichent parfaitement sur tous les appareils — car l'essentiel de votre trafic vient du mobile.",
        },
      },
      processTitle: 'Comment se déroule le processus',
      process: {
        '1': {
          title: 'Appel de découverte',
          text: "Nous parlons de votre activité, de votre audience et de vos objectifs. Je définis l'offre et le message clé.",
        },
        '2': {
          title: 'Design',
          text: "Vous recevez une maquette visuelle de la page à valider avant d'écrire le moindre code.",
        },
        '3': {
          title: 'Développement',
          text: 'La page est construite rapidement, responsive et optimisée pour la conversion.',
        },
        '4': {
          title: 'Lancement et améliorations',
          text: 'Nous mettons en ligne, suivons les résultats et affinons la page pour améliorer la performance dans le temps.',
        },
      },
      faqTitle: 'Questions fréquentes',
      faqs: {
        '1': {
          q: 'Combien de temps cela prend-il ?',
          a: 'Une landing page typique prend de 3 à 7 jours, selon le périmètre et le contenu.',
        },
        '2': {
          q: 'Dois-je écrire le contenu ?',
          a: 'Je peux rédiger le texte pour vous ou partir de votre matériel existant. Vous validez tout avant le lancement.',
        },
        '3': {
          q: 'Puis-je la modifier plus tard ?',
          a: 'Oui. La page est construite avec une structure facile à modifier et je propose un support après le lancement.',
        },
      },
      ctaTitle: 'Prêt à transformer votre trafic en clients ?',
      ctaSubtitle: "Créons une landing page qui s'amortit toute seule.",
    },
    websitesForFreelancers: {
      compareTitle: 'Réseaux sociaux seuls vs. votre propre site',
      compareWithoutTitle: 'Réseaux sociaux seuls',
      compareWithTitle: 'Avec votre propre site',
      compareWithout: {
        '1': "Votre portée dépend de l'algorithme",
        '2': 'Les informations sur vos services sont dispersées dans vos publications',
        '3': "Le client doit vous écrire pour demander l'essentiel",
        '4': 'Votre profil peut être limité ou perdu à tout moment',
      },
      compareWith: {
        '1': 'Les clients vous trouvent sur Google quand ils cherchent ce que vous faites',
        '2': 'Services, tarifs et méthode expliqués au même endroit',
        '3': 'Les questions trouvent réponse avant le premier message',
        '4': 'Une adresse qui vous appartient, pour de bon',
      },
      pagesTitle: 'Les pages que votre site peut avoir',
      pagesSubtitle: 'Une structure simple qui répond à ce que tout client potentiel veut savoir.',
      pages: {
        '1': {
          title: 'Accueil',
          text: "Qui vous êtes, ce que vous faites et comment vous engager — en un coup d'œil.",
        },
        '2': {
          title: 'Services',
          text: 'Chaque service expliqué, avec ce qui est inclus et son fonctionnement.',
        },
        '3': {
          title: 'À propos',
          text: 'Votre parcours, votre expérience et votre façon de travailler.',
        },
        '4': {
          title: 'Portfolio',
          text: 'Des projets et des résultats réels qui prouvent votre savoir-faire.',
        },
        '5': {
          title: 'Contact',
          text: 'WhatsApp, formulaire et prise de rendez-vous, à un clic.',
        },
      },
      name: 'Sites pour Indépendants',
      shortDescription:
        'Des sites professionnels qui inspirent confiance et attirent plus de clients.',
      tagline: 'Votre carte de visite numérique',
      heroTitle: 'Un site professionnel qui vous gagne des clients',
      intro:
        "En tant qu'indépendant, votre site est souvent la première impression que vous laissez à un client potentiel. Un site professionnel fait plus que bien paraître : il explique ce que vous faites, prouve votre travail et facilite l'embauche.",
      introP2:
        "La plupart des indépendants dépendent d'Instagram ou du bouche-à-oreille. Un site vous donne un lieu central et crédible vers lequel diriger les gens — et il continue de travailler pendant que vous dormez, répondant aux questions et générant des opportunités.",
      benefitsTitle: "Ce qu'un site fait pour vous",
      benefits: {
        '1': {
          title: 'Crédibilité',
          text: 'Un site professionnel vous rend établi et digne de confiance.',
        },
        '2': {
          title: 'Des prospects en pilote automatique',
          text: 'Les visiteurs vous trouvent, comprennent votre valeur et vous contactent — même en dehors des heures de bureau.',
        },
        '3': {
          title: 'Un portfolio qui vend',
          text: 'Présentez vos meilleurs travaux avec des études de cas qui convainquent de nouveaux clients.',
        },
        '4': {
          title: 'Possédez votre audience',
          text: 'Arrêtez de dépendre des plateformes sociales. Votre site, vos règles, vos données.',
        },
      },
      detailsTitle: 'Ce que je livre',
      details: {
        '1': {
          title: 'Positionnement clair',
          text: 'Nous définissons ce qui vous rend unique et le plaçons au centre de chaque page.',
        },
        '2': {
          title: 'Services et tarifs',
          text: 'Des pages claires expliquant vos services, votre processus et vos prix réduisent les frictions et attirent de meilleurs clients.',
        },
        '3': {
          title: 'Contact et réservation',
          text: 'Boutons WhatsApp, formulaires et prise de rendez-vous pour que les clients vous joignent en un clic.',
        },
      },
      processTitle: 'Comment se déroule le processus',
      process: {
        '1': {
          title: 'Découverte',
          text: "Nous cartographions vos services, votre audience et vos objectifs lors d'une courte conversation.",
        },
        '2': {
          title: 'Design',
          text: "Vous validez l'apparence et la structure avant une seule ligne de code.",
        },
        '3': {
          title: 'Développement',
          text: 'Votre site est construit rapidement, responsive et prêt pour les moteurs de recherche.',
        },
        '4': {
          title: 'Lancement',
          text: 'Nous publions, connectons votre domaine et rendons le site facile à maintenir.',
        },
      },
      faqTitle: 'Questions fréquentes',
      faqs: {
        '1': {
          q: "Ai-je besoin d'un site si j'ai déjà Instagram ?",
          a: 'Instagram aide pour la visibilité, mais un site vous donne de la crédibilité, du contrôle et une meilleure conversion. Les deux fonctionnent mieux ensemble.',
        },
        '2': {
          q: 'Pouvez-vous copier le design de mon concurrent ?',
          a: 'Je crée un design unique pour votre marque. Copier nuit à votre crédibilité et à votre SEO.',
        },
        '3': {
          q: "Aidez-vous avec le domaine et l'hébergement ?",
          a: "Oui, je m'occupe de toute la partie technique pour que vous vous concentriez uniquement sur votre travail.",
        },
      },
      ctaTitle: 'Construisons votre présence professionnelle',
      ctaSubtitle: 'Envoyez-moi un message et planifions votre site.',
    },
    blogsAndPortfolios: {
      splitTitle: 'Deux formats, un objectif : marquer les esprits',
      portfolio: {
        title: 'Portfolio',
        text: "Quand votre travail parle de lui-même et mérite d'être vu sous son meilleur jour.",
        items: {
          '1': 'Pages projet avec images, contexte et résultats',
          '2': 'Filtres par catégorie ou type de travail',
          '3': 'Témoignages clients à côté de chaque projet',
        },
      },
      blog: {
        title: 'Blog',
        text: 'Quand votre expertise fait la différence et que vous voulez être trouvé dans les recherches.',
        items: {
          '1': 'Articles organisés par catégories et tags',
          '2': 'Structure optimisée pour le SEO à chaque article',
          '3': 'Inscription à la newsletter pour garder vos lecteurs proches',
        },
      },
      chapter: 'Chapitre',
      name: 'Blogs et Portfolios',
      shortDescription:
        'Montrez votre travail, partagez vos connaissances et attirez votre audience idéale.',
      tagline: 'Contenu et vitrine, ensemble',
      heroTitle:
        'Un lieu pour montrer votre travail et partager vos connaissances',
      intro:
        "Un portfolio ou un blog est plus qu'une collection de projets ou d'articles : c'est un outil qui travaille pour vous. Il attire les personnes intéressées par ce que vous faites, construit votre autorité et transforme les lecteurs en clients.",
      introP2:
        'Je conçois et construis des sites où votre travail brille : rapides, élégants, faciles à mettre à jour et structurés pour que les moteurs de recherche vous trouvent.',
      benefitsTitle: 'Pourquoi avoir un blog ou un portfolio',
      benefits: {
        '1': {
          title: 'Autorité',
          text: 'Un contenu constant et de qualité vous positionne comme une référence dans votre domaine.',
        },
        '2': {
          title: 'Trafic entrant',
          text: 'Les articles optimisés pour la recherche attirent des visiteurs qui cherchent déjà vos services.',
        },
        '3': {
          title: 'Montrez, ne dites pas',
          text: "Un portfolio bien structuré prouve votre savoir-faire mieux que n'importe quel argumentaire.",
        },
        '4': {
          title: 'Mises à jour faciles',
          text: 'Ajouter un projet ou un article prend des minutes, pas un développeur.',
        },
      },
      detailsTitle: 'Ce que je livre',
      details: {
        '1': {
          title: 'De belles vitrines',
          text: 'Des projets présentés avec images, descriptions et résultats — conçus pour impressionner clients et partenaires.',
        },
        '2': {
          title: 'Un blog qui grandit',
          text: 'Une structure éditoriale avec catégories, tags et bases SEO pour que chaque article continue de travailler pour vous.',
        },
        '3': {
          title: 'Conçu pour être maintenu',
          text: "Une édition simple pour que vous possédiez votre contenu et ne dépendiez jamais d'un développeur pour de petites modifications.",
        },
      },
      processTitle: 'Comment se déroule le processus',
      process: {
        '1': {
          title: 'Objectifs',
          text: 'Nous définissons ce que vous voulez attirer : clients, lecteurs ou les deux.',
        },
        '2': {
          title: 'Structure',
          text: 'Je cartographie les sections, catégories et pages qui ont du sens pour votre contenu.',
        },
        '3': {
          title: 'Design et construction',
          text: 'Votre site est créé en pensant à votre style et à votre audience.',
        },
        '4': {
          title: 'Formation',
          text: 'Vous apprenez à publier et modifier du contenu vous-même, sans code.',
        },
      },
      faqTitle: 'Questions fréquentes',
      faqs: {
        '1': {
          q: 'Dois-je savoir écrire ?',
          a: 'Non. Je vous aide à structurer vos idées, et vous pouvez aussi me confier la rédaction des premiers articles.',
        },
        '2': {
          q: 'Puis-je le mettre à jour moi-même ?',
          a: 'Oui. Le site est construit pour que vous ajoutiez projets et articles sans toucher une ligne de code.',
        },
        '3': {
          q: 'Écrivez-vous aussi le contenu ?',
          a: 'Oui, je peux créer les textes de votre portfolio et les premiers articles du blog.',
        },
      },
      ctaTitle: 'Votre travail mérite une scène',
      ctaSubtitle: 'Créons un portfolio qui vous apporte des opportunités.',
    },
    integrations: {
      hubCenter: 'Votre site',
      tools: {
        '1': 'WhatsApp',
        '2': 'E-mail',
        '3': 'CRM',
        '4': 'Paiements',
        '5': 'Tableurs',
        '6': 'Analytics',
      },
      flowTitle: 'Concrètement, à quoi ça ressemble',
      flowSubtitle: 'Un seul envoi de formulaire peut déclencher tout ce qui se faisait auparavant à la main.',
      flow: {
        '1': {
          label: 'Déclencheur',
          title: 'Un visiteur remplit le formulaire',
          text: 'Nom, coordonnées et besoin sont enregistrés sur votre site.',
        },
        '2': {
          label: 'Automatisation',
          title: 'Les données vont là où il faut',
          text: 'Le prospect est enregistré dans votre CRM ou tableur et vous recevez une alerte sur WhatsApp.',
        },
        '3': {
          label: 'Résultat',
          title: 'Vous répondez en quelques minutes',
          text: 'Le visiteur reçoit un e-mail de confirmation et vous le relancez tant que son intérêt est fort.',
        },
      },
      name: 'Intégrations',
      shortDescription:
        'Formulaires, email marketing, WhatsApp, paiements et bien plus.',
      tagline: 'Faites travailler tout ensemble',
      heroTitle: 'Des intégrations qui relient votre site à votre activité',
      intro:
        "Un beau site n'est qu'une partie de l'équation. Pour générer de vrais résultats, il doit dialoguer avec les outils que vous utilisez déjà : email, CRM, paiements, notifications et plus. C'est exactement à cela que servent les intégrations.",
      introP2:
        "Je connecte votre site aux services qui font tourner votre activité — automatisant les tâches, réduisant les erreurs et garantissant qu'aucun prospect ne se perde.",
      benefitsTitle: 'Pourquoi intégrer vos systèmes',
      benefits: {
        '1': {
          title: 'Fini le travail manuel',
          text: 'Les données circulent automatiquement entre votre site et vos outils.',
        },
        '2': {
          title: 'Aucun prospect perdu',
          text: 'Chaque envoi de formulaire atteint le bon endroit, instantanément.',
        },
        '3': {
          title: 'Suivi automatisé',
          text: 'Emails et messages sont déclenchés automatiquement par les actions des visiteurs.',
        },
        '4': {
          title: 'Données au même endroit',
          text: 'Tout ce dont vous avez besoin, synchronisé dans votre CRM, tableur ou tableau de bord.',
        },
      },
      detailsTitle: 'Ce que je peux connecter',
      details: {
        '1': {
          title: 'Formulaires et email marketing',
          text: 'Des formulaires de contact qui alimentent votre liste email, vos automatisations et vos séquences.',
        },
        '2': {
          title: 'WhatsApp et notifications',
          text: 'Des alertes instantanées pour ne jamais manquer un prospect, sur WhatsApp, email ou Telegram.',
        },
        '3': {
          title: 'Paiements et analytics',
          text: 'Checkout, liens de paiement, pixel et analytics pour vos campagnes.',
        },
      },
      processTitle: 'Comment se déroule le processus',
      process: {
        '1': {
          title: 'Audit',
          text: 'Nous listons les outils que vous utilisez et ce qui doit communiquer entre eux.',
        },
        '2': {
          title: 'Plan',
          text: "Je propose l'architecture la plus simple qui résout votre problème.",
        },
        '3': {
          title: 'Construction',
          text: 'Les intégrations sont implémentées et testées de bout en bout.',
        },
        '4': {
          title: 'Support',
          text: 'Vous recevez une documentation et un support pour tout ce qui a été livré.',
        },
      },
      faqTitle: 'Questions fréquentes',
      faqs: {
        '1': {
          q: 'Quels outils prenez-vous en charge ?',
          a: 'Les plus populaires : Google Sheets, Mailchimp, WhatsApp, Stripe, Mercado Pago, Telegram et plus.',
        },
        '2': {
          q: "Pouvez-vous intégrer les outils que j'utilise déjà ?",
          a: "Oui. Je travaille avec ce que vous avez déjà et j'évite les coûts inutiles.",
        },
        '3': {
          q: 'Est-ce sécurisé ?',
          a: 'Oui. Je suis les bonnes pratiques de sécurité et je ne stocke jamais de données sensibles sans besoin réel.',
        },
      },
      ctaTitle: 'Connectons vos systèmes',
      ctaSubtitle:
        'Dites-moi ce que vous utilisez et je ferai dialoguer le tout.',
    },
  },
  queens: {
    queens: 'Reines',
    level: 'Niveau',
    'level-1': 'Débutant',
    'level-2': 'Facile',
    'level-3': 'Moyen',
    'level-4': 'Difficile',
    'level-5': 'Expert',
    'new-game': 'Nouvelle Partie',
    hint: 'Indice',
    congratulations: 'Félicitations ! Puzzle résolu !',
    'queens-placed': 'reines placées',
    'check-errors': 'Vérifiez les violations des règles',
    loading: 'Chargement...',
    'how-to-play': 'Comment Jouer',
    'rule-row': 'Placez exactement une reine dans chaque rangée.',
    'rule-col': 'Placez exactement une reine dans chaque colonne.',
    'rule-region':
      'Placez exactement une reine dans chaque région colorée.',
    'rule-adjacent':
      'Deux reines ne peuvent pas se toucher, même en diagonale.',
    'tip-tap':
      'Touchez une fois pour marquer ✕, une autre pour placer ♫, une autre pour effacer.',
    'tip-x':
      'Faites glisser votre doigt sur les cellules pour marquer rapidement plusieurs ✕.',
    'tip-slide':
      'Utilisez les marques ✕ pour signaler les cellules sans reine.',
    'faq-title': 'Questions Fréquentes',
    'faq-q1': "Qu'est-ce que le jeu Reines ?",
    'faq-a1':
      "Reines est un puzzle de logique où vous placez des reines sur le plateau afin que chaque rangée, colonne et région colorée contienne exactement une reine, sans qu'elles ne se touchent.",
    'faq-q2': 'Comment jouer ?',
    'faq-a2':
      'Touchez une cellule pour alterner entre : ✕ marque → ♫ reine → vide. Faites glisser votre doigt sur le plateau pour marquer rapidement plusieurs ✕. Les infractions sont surlignées en rouge.',
    'faq-q3': 'Que se passe-t-il si je fais une erreur ?',
    'faq-a3':
      "Les reines en conflit sont surlignées en rouge. Révisez et ajustez jusqu'à ce que toutes les règles soient respectées. Il n'y a pas de limite de coups !",
    'faq-q4': 'Y a-t-il un nouveau puzzle chaque jour ?',
    'faq-a4':
      'Oui ! Le plateau est généré quotidiennement selon la date actuelle, offrant un nouveau défi chaque jour. Partagez vos résultats !',
    'seo-title': 'Jouez aux Reines — Puzzle de Logique Quotidien',
    'seo-p1':
      "Reines est un puzzle de logique quotidien inspiré du problème classique des N-Reines. Placez des reines sur le plateau en suivant quatre règles simples : une par rangée, une par colonne, une par région colorée, sans qu'elles ne se touchent.",
    'seo-p2':
      'Choisissez parmi 5 niveaux de difficulté : Débutant (5×5), Facile (6×6), Moyen (7×7), Difficile (8×8) et Expert (10×10). Chaque puzzle est généré déterministiquement à partir de la date.',
    'seo-p3':
      'Jouez en ligne gratuitement, sans inscription. Entraînez votre raisonnement logique et votre reconnaissance de motifs. Un nouveau puzzle vous attend chaque jour !',
  },
  sudoku: {
    sudoku: 'Sudoku',
    size: 'Grille',
    'size-4': '4×4 Mini',
    'size-6': '6×6',
    'size-9': '9×9 Classique',
    difficulty: 'Difficulté',
    'difficulty-0': 'Facile',
    'difficulty-1': 'Moyen',
    'difficulty-2': 'Difficile',
    'new-game': 'Nouvelle Partie',
    notes: 'Notes',
    eraser: 'Effacer',
    undo: 'Annuler',
    hint: 'Indice',
    mistakes: 'Erreurs',
    congratulations: 'Félicitations ! Puzzle résolu !',
    loading: 'Chargement...',
    'keyboard-hint':
      'Astuce : utilisez les flèches du clavier pour vous déplacer dans la grille, les chiffres pour remplir, N pour activer les notes et Delete pour effacer.',
    'how-to-play': 'Comment Jouer',
    'rule-1':
      'Chaque rangée doit contenir chaque nombre de 1 à N exactement une fois.',
    'rule-2':
      'Chaque colonne doit contenir chaque nombre de 1 à N exactement une fois.',
    'rule-3':
      'Chaque bloc encadré doit contenir chaque nombre de 1 à N exactement une fois.',
    'tip-1':
      "Commencez par les blocs qui contiennent déjà le plus de chiffres et cherchez, dans chaque rangée, colonne et bloc, les cellules qui n'ont qu'une seule valeur possible.",
    'tip-2':
      'Utilisez les Notes pour inscrire les candidats possibles. Ils apparaissent en petits chiffres et vous aident à suivre les possibilités.',
    'tip-3':
      'Jouez à la souris, au tactile ou au clavier. Les chiffres répétés dans la même rangée, colonne ou bloc sont surlignés en rouge.',
    'strategy-title': 'Conseils et Stratégies',
    'strategy-p1':
      "Cherchez les candidats uniques : si un seul nombre peut tenir dans une cellule, écrivez-le tout de suite. C'est la technique la plus importante pour les débutants.",
    'strategy-p2':
      "Analysez les rangées, colonnes et blocs à la recherche des nombres manquants. Quand un nombre occupe déjà deux blocs d'une rangée, le troisième vous offre souvent un indice.",
    'strategy-p3':
      'Utilisez les marques au crayon. Notez tous les nombres possibles dans chaque cellule, puis éliminez-les un à un. Cela transforme les puzzles difficiles en un processus gérable.',
    'strategy-p4':
      "Entraînez-vous un peu chaque jour. Jouer au Sudoku régulièrement améliore la concentration, la reconnaissance de motifs et la mémoire à court terme — et c'est vraiment relaxant.",
    'faq-title': 'Questions Fréquentes',
    'faq-q1': "Qu'est-ce que le Sudoku ?",
    'faq-a1':
      'Le Sudoku est un puzzle de logique basé sur les nombres. Le but est de remplir la grille pour que chaque rangée, colonne et bloc contienne chaque nombre de 1 à N exactement une fois. Pas besoin de mathématiques, juste de logique.',
    'faq-q2': 'Comment jouer au Sudoku ?',
    'faq-a2':
      "Choisissez la taille de la grille (4×4, 6×6 ou 9×9), sélectionnez une difficulté et touchez une cellule pour la sélectionner. Saisissez ensuite un nombre avec le pavé à l'écran ou le clavier. Chaque puzzle n'a qu'une seule solution.",
    'faq-q3': 'Que signifient les tailles de grille ?',
    'faq-a3':
      '4×4 est un mini-Sudoku idéal pour les débutants et les enfants, 6×6 est un défi compact et 9×9 est le Sudoku classique joué dans le monde entier. Chaque taille utilise les nombres de 1 à N.',
    'faq-q4': 'Le Sudoku est-il bon pour le cerveau ?',
    'faq-a4':
      "Oui. Le Sudoku entraîne le raisonnement logique, la concentration et la mémoire, et des études suggèrent que résoudre régulièrement des puzzles maintient l'esprit vif. C'est aussi une pause calme et productive loin des réseaux sociaux.",
    'faq-q5': 'Ce Sudoku est-il vraiment gratuit ?',
    'faq-a5':
      "Oui, 100 % gratuit. Sans inscription, sans téléchargement et sans limite de temps. Vous pouvez jouer au Sudoku en ligne directement dans votre navigateur, sur n'importe quel appareil.",
    'seo-title':
      'Jouer au Sudoku en Ligne — Générateur de Mini Sudoku Gratuit',
    'seo-p1':
      "Bienvenue sur notre générateur de Sudoku en ligne gratuit. Jouez au Sudoku en ligne dans votre navigateur avec trois tailles de grille — 4×4 mini, 6×6 et le classique 9×9 — et trois niveaux de difficulté, de l'échauffement facile au défi difficile.",
    'seo-p2':
      'Chaque partie est générée instantanément avec une solution unique, vous obtenez donc toujours un puzzle juste et solvable. Choisissez votre grille préférée, ajustez la difficulté et cliquez sur Nouvelle Partie pour une grille neuve en une seconde.',
    'seo-p3':
      "Le Sudoku est l'un des puzzles de logique les plus populaires au monde. Il entraîne le raisonnement, aiguise la concentration et convient parfaitement à une courte pause. Et le meilleur : notre Sudoku fonctionne sur mobile, tablette et ordinateur sans rien installer.",
    'seo-p4':
      'Que vous vouliez apprendre aux enfants avec une mini-grille 4×4, vous échauffer avec un 6×6 facile ou vous tester avec un 9×9 difficile, vous pouvez jouer au Sudoku en ligne ici à tout moment. Notes, indices, annulation, raccourcis clavier et surlignage des erreurs rendent chaque partie agréable.',
    'seo-p5':
      "Ajoutez cette page à vos favoris et revenez dès que vous avez besoin d'un entraînement mental. Jouez au Sudoku en ligne gratuitement, améliorez votre logique et amusez-vous — une grille à la fois.",
  },
  wordLadder: {
    name: 'Échelle de Mots',
    home: 'Accueil',
    intro:
      'Changez une lettre à la fois pour transformer le mot de départ en mot cible. Chaque étape doit être un vrai mot. Jouez gratuitement dans votre navigateur, avec des puzzles quotidiens et trois niveaux de difficulté.',
    mode: 'Mode',
    'mode-classic': 'Classique',
    'mode-daily': 'Quotidien',
    difficulty: 'Difficulté',
    'difficulty-easy': 'Facile',
    'difficulty-medium': 'Moyen',
    'difficulty-hard': 'Difficile',
    'daily-today': "L'échelle de mots du jour",
    'new-game': 'Nouvelle Partie',
    moves: 'Coups',
    best: 'Record',
    target: 'Cible',
    time: 'Temps',
    'daily-done':
      'Vous avez déjà résolu le puzzle du jour. Revenez demain pour un nouveau !',
    start: 'Départ',
    'your-move': 'Votre prochain mot',
    'input-placeholder': 'MOT',
    submit: 'OK',
    hint: 'Indice',
    undo: 'Annuler',
    'start-game': 'Commencer',
    'err-empty': "Saisissez d'abord un mot.",
    'err-length':
      'Le mot doit avoir la même longueur que le mot de départ.',
    'err-dictionary':
      "Ce mot n'est pas dans notre dictionnaire. Essayez-en un autre.",
    'err-one-letter': 'Changez exactement une lettre.',
    'hint-text':
      'Trouvez un mot qui est à une lettre de votre mot actuel.',
    'hint-1': 'Votre prochain mot commence par {letter}.',
    'hint-2': 'Essayez de changer la lettre en position {position}.',
    'hint-3': 'Un prochain mot possible est {word}.',
    'live-move': 'Vous êtes à {word}.',
    'live-undo': 'Coup annulé.',
    complete: 'Échelle de mots terminée !',
    'result-moves':
      'Vous avez transformé le mot de départ en mot cible. Bravo !',
    'result-optimal':
      'Essayez de finir en aussi peu de coups que possible la prochaine fois.',
    'daily-streak': 'Série quotidienne :',
    'play-again': 'Rejouer',
    'next-puzzle': 'Puzzle suivant',
    share: 'Partager',
    'share-copied': 'Résultat copié dans le presse-papiers.',
    'how-to-play': "Comment jouer à l'échelle de mots",
    'rule-1': "Commencez par le mot bleu en haut de l'échelle.",
    'rule-2':
      'Saisissez un nouveau mot qui ne diffère de votre mot actuel que par une seule lettre.',
    'rule-3': 'Chaque mot saisi doit être un vrai mot.',
    'rule-4': "Continuez, un pas à la fois, jusqu'au mot cible en ambre.",
    'rule-5':
      'Essayez de finir en aussi peu de coups que possible pour battre votre record.',
    'rules-title': "Règles officielles de l'échelle de mots",
    'rules-p1':
      'Une échelle de mots est résolue quand vous transformez le mot de départ en mot cible en utilisant uniquement de vrais mots, en changeant exactement une lettre à chaque étape. Par exemple, CAT → COT → COG → DOG.',
    'rules-p2':
      "Vous pouvez changer la position de la lettre et sa valeur, mais une seule lettre peut changer par coup. Vous pouvez utiliser un indice (jusqu'à trois par partie) si vous êtes bloqué, et annuler un coup à tout moment.",
    'rules-p3':
      'En mode Classique, vous choisissez la difficulté et jouez autant de puzzles que vous voulez. En mode Quotidien, il y a un puzzle partagé par jour, et le terminer maintient votre série.',
    'tips-title': 'Astuces et stratégies',
    'tip-1':
      "Concentrez-vous sur les voyelles. Les mots qui ne diffèrent que d'une voyelle sont presque toujours valides, et les voyelles ouvrent le plus de chemins.",
    'tip-2':
      "Travaillez aussi à l'envers depuis le mot cible. Souvent, le meilleur chemin apparaît quand vous planifiez depuis les deux extrémités.",
    'tip-3':
      "Gardez les positions des lettres en tête. Changer une lettre près de la fin du mot laisse généralement plus d'options.",
    'tip-4':
      'Cherchez les motifs courants comme -ATE, -ING ou -IDE. Réutiliser un motif permet de traverser plusieurs mots rapidement.',
    'tip-5':
      'Utilisez vos trois indices avec sagesse. Le dernier indice révèle le prochain mot exact, ce qui est très précieux dans les puzzles difficiles.',
    'whatis-title': "Qu'est-ce qu'une échelle de mots ?",
    'whatis-p1':
      "L'échelle de mots est un jeu de lettres inventé par Lewis Carroll en 1877, qui l'appelait Doublets. Vous partez de deux mots de même longueur et les reliez par une chaîne de vrais mots, en changeant une lettre à la fois.",
    'whatis-p2':
      "Par exemple, transformer COLD en WARM peut donner COLD → CORD → WORD → WARD → WARM. Ce jeu est populaire en classe car il développe l'orthographe, le vocabulaire et la logique de façon ludique.",
    'levels-title': 'Niveaux de difficulté',
    'levels-easy': 'Facile :',
    'levels-easy-p':
      'Des chaînes courtes de 2 à 4 coups entre des mots très courants. Parfait pour les enfants et les débutants.',
    'levels-medium': 'Moyen :',
    'levels-medium-p':
      'Des chaînes de 5 à 7 coups. Un bon entraînement quotidien pour les joueurs réguliers.',
    'levels-hard': 'Difficile :',
    'levels-hard-p':
      'De longues chaînes de 8 coups ou plus. Seuls les plus fins connaisseurs de mots les résoudront.',
    'kids-title': 'Échelle de mots pour enfants',
    'kids-p1':
      'Les échelles de mots sont une activité fantastique pour les enfants qui apprennent à lire et à épeler. Chaque coup demande de comparer des lettres, de sonoriser les mots et de réfléchir au vocabulaire, tout en jouant.',
    'kids-p2':
      "Faites commencer les enfants en mode Facile, où des mots courts comme CAT et DOG se relient en quelques coups. C'est une activité calme, adaptée aux écrans et secrètement éducative.",
    'faq-title': 'Foire aux questions',
    'faq-q1': "Qu'est-ce qu'une échelle de mots ?",
    'faq-a1':
      'Une échelle de mots est un jeu où vous transformez un mot en un autre en changeant une seule lettre à la fois, en utilisant un vrai mot à chaque étape. Il a été inventé par Lewis Carroll en 1877.',
    'faq-q2': "Comment joue-t-on à l'échelle de mots ?",
    'faq-a2':
      "Partez du mot de départ bleu, puis saisissez des mots qui ne diffèrent du précédent que par une seule lettre. Continuez jusqu'au mot cible en ambre. Moins il y a de coups, mieux c'est.",
    'faq-q3': "Quelles sont les règles de l'échelle de mots ?",
    'faq-a3':
      'Chaque coup change exactement une lettre, et chaque mot doit être un vrai mot de la même longueur que les mots de départ et cible. Vous ne pouvez pas répéter un mot déjà présent dans votre échelle.',
    'faq-q4':
      "Peut-on changer plus d'une lettre dans une échelle de mots ?",
    'faq-a4':
      'Non. Une seule lettre peut changer par coup. Changer deux lettres ou plus à la fois enfreint les règles du jeu.',
    'faq-q5': "Qu'est-ce qui rend une échelle de mots difficile ?",
    'faq-a5':
      'La difficulté dépend de la distance entre les deux mots, du nombre de vrais mots qui existent entre eux et de la facilité à se retrouver dans une impasse en chemin.',
    'faq-q6': 'Les échelles de mots sont-elles bonnes pour les enfants ?',
    'faq-a6':
      "Oui. Les échelles de mots sont très utilisées à l'école pour pratiquer l'orthographe, la correspondance lettre-son et le vocabulaire, et c'est une activité d'écran calme et éducative.",
    'faq-q7': "Ce jeu d'échelle de mots est-il gratuit ?",
    'faq-a7':
      "Oui, entièrement gratuit. Sans inscription, sans téléchargement et sans limite de temps. Jouez dans votre navigateur sur n'importe quel appareil, y compris votre téléphone.",
    'related-title': 'Plus de jeux gratuits en ligne',
    'related-p':
      'Si vous aimez les jeux de lettres, essayez nos autres jeux de logique gratuits — tous fonctionnent sur mobile et ordinateur.',
    'related-sudoku':
      'Le jeu de logique classique avec trois tailles de grille.',
    'related-queens':
      'Un puzzle de placement quotidien inspiré des N-Reines.',
  },
  seo: {
    cardTagline: 'Sites web, landing pages et automatisation',
    home: {
      title: 'Breno Carvalho — Landing pages et sites web qui convertissent',
      description: 'Des landing pages et sites web rapides, modernes et optimisés pour le référencement, qui transforment les visiteurs en clients. Design, développement, hébergement et automatisation.',
    },
    services: {
      title: 'Création de sites web et de landing pages',
      description: 'Landing pages, sites professionnels, blogs, portfolios et intégrations avec WhatsApp, CRM et paiements. Trouvez le service adapté à votre activité.',
    },
    landingPages: {
      title: 'Landing pages qui transforment les visiteurs en clients',
      description: 'Des landing pages à forte conversion avec un texte persuasif, des preuves sociales et un appel à l’action clair. Rapides, mobile-first et prêtes pour la publicité.',
    },
    websitesForFreelancers: {
      title: 'Sites professionnels pour indépendants et freelances',
      description: 'Un site professionnel qui inspire confiance et attire de nouveaux clients : services, portfolio, témoignages et contact WhatsApp, rapide et facile à trouver sur Google.',
    },
    blogsAndPortfolios: {
      title: 'Blogs et portfolios pour mettre en valeur votre travail',
      description: 'Un blog ou un portfolio pour présenter votre travail, publier du contenu et attirer votre public idéal, avec SEO, chargement rapide et mises à jour simples.',
    },
    integrations: {
      title: 'Intégrations web avec WhatsApp, CRM, e-mail et paiements',
      description: 'Connectez votre site à WhatsApp, au CRM, à l’e-mail marketing, aux paiements et aux tableurs pour capter et suivre vos contacts automatiquement.',
    },
    sudoku: {
      title: 'Sudoku en ligne gratuit en grilles 4×4, 6×6 et 9×9',
      description: 'Jouez au Sudoku gratuitement dans votre navigateur : grilles 4×4, 6×6 et 9×9, trois niveaux de difficulté, notes, indices et annulation. Sur mobile et ordinateur.',
    },
    queens: {
      title: 'Queens — jeu de logique gratuit en ligne',
      description: 'Placez une reine dans chaque ligne, colonne et région colorée sans que deux reines se touchent. Cinq niveaux de difficulté et des indices. Jouez gratuitement.',
    },
    wordLadder: {
      title: 'Word Ladder — jeu de mots gratuit en ligne',
      description: 'Changez une lettre à la fois pour transformer le mot de départ en mot d’arrivée. Défi quotidien et trois niveaux de difficulté, gratuit dans le navigateur.',
    },
  },
};
