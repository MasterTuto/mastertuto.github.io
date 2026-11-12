import type { Translations } from './english';

export const italianTranslations: Translations = {
  catalog: {
    explore: 'Esplora giochi e strumenti',
    toggle: 'Comprimi o espandi il menu',
    close: 'Chiudi menu',
    skip: 'Vai al contenuto',
    gamesTitle: 'Giochi di logica e parole gratis online',
    gamesIntro:
      'Gioca a Sudoku, Queens e Word Ladder nel browser, da telefono, tablet o computer.',
    gamesHeading: 'Scegli la tua prossima sfida',
    gamesText:
      'Risolvi griglie di Sudoku, pianifica la posizione delle regine o collega parole cambiando una lettera alla volta. Apri un gioco per regole, comandi e consigli.',
    toolsTitle: 'Strumenti online per ogni giorno',
    toolsIntro:
      'Formatta JSON e analizza token JWT con strumenti gratuiti per sviluppatori nel browser.',
    toolsHeading: 'Strumenti per lo sviluppo quotidiano',
    toolsText:
      'Valida e minimizza JSON oppure consulta i claim e le scadenze JWT. Scopri anche i nostri giochi di logica.',
  },
  backHome: 'Torna alla home',
  cases: {
    viewCase: "Vedi il case completo",
    visitSite: "Visita il sito",
    backToProjects: "Torna ai progetti",
    myRole: "Cosa ho fatto",
    aboutTitle: "Il progetto",
    highlightsTitle: "In evidenza",
    galleryTitle: "Su computer e smartphone",
    techTitle: "Sotto il cofano",
    desktop: "versione desktop",
    mobile: "versione mobile",
    ctaTitle: "Hai in mente un progetto simile?",
    ctaText: "Raccontami di cosa hai bisogno e ti rispondo con i prossimi passi.",
    ctaButton: "Parliamo del mio progetto",
    roles: {
      design: "Design",
      implementation: "Implementazione",
      hosting: "Hosting",
      maintenance: "Manutenzione",
    },
    items: {
      jingle: {
        tagline: "Piattaforma per creare jingle con l’intelligenza artificiale",
        summary: "Una piattaforma in cui chiunque trasforma un’idea in un jingle: l’intelligenza artificiale scrive il testo, crea la musica e genera la voce, con download in MP3. Ho curato design, implementazione e hosting, e mi occupo della manutenzione.",
        about: "jingle.ia.br porta il jingle fuori dallo studio. Panetterie, pizzerie, supermercati, radio e agenzie descrivono il messaggio, scelgono un ritmo brasiliano come forró, sertanejo o pagode, confrontano tre proposte di testo e scaricano la canzone pronta. La stessa piattaforma serve per compleanni, eventi, podcast e campagne, senza bisogno di saper comporre.",
        work: {
          design: {
            intro: "Il pubblico non ha mai scritto una canzone. Ogni scelta di design toglie un dubbio dal percorso.",
            decisions: {
              '1': {
                title: "Quattro passaggi, una domanda alla volta",
                text: "Idea, tono, testo e download. Passaggi brevi evitano la pagina bianca a chi non sa da dove cominciare.",
              },
              '2': {
                title: "Scegliere invece di scrivere",
                text: "Si confrontano tre testi prima di generare l’audio. Scegliere è più facile che scrivere, e il credito si usa solo per ciò che è stato approvato.",
              },
              '3': {
                title: "Un look tutto brasiliano",
                text: "Verde e giallo, un megafono e ritmi regionali chiariscono dalla prima schermata a chi si rivolge il prodotto.",
              },
            },
          },
          implementation: {
            intro: "Generare musica richiede tempo e può fallire. L’implementazione evita che questo pesi sull’utente.",
            decisions: {
              '1': {
                title: "Generazione in background",
                text: "Il jingle continua a essere generato anche se la pagina viene chiusa. Si segue lo stato e si scarica l’MP3 quando è pronto.",
              },
              '2': {
                title: "Un errore non costa credito",
                text: "Se la creazione del testo fallisce, il jingle torna nel saldo del piano e la schermata spiega cosa è successo.",
              },
              '3': {
                title: "Piani in abbonamento",
                text: "Tre piani mensili con una quota di jingle e disdetta in qualsiasi momento. Il piano base include una filigrana vocale.",
              },
            },
          },
          hosting: {
            intro: "L’uso arriva a picchi, come feste e campagne. L’infrastruttura segue questo ritmo.",
            decisions: {
              '1': {
                title: "Paghi ciò che usi",
                text: "Architettura serverless: nessun server inattivo in attesa di visite, e la capacità cresce da sola quando aumenta il traffico.",
              },
              '2': {
                title: "Un dominio che si spiega da solo",
                text: "Il .ia.br dice cosa fa il prodotto e che è brasiliano, ancora prima di aprire il sito.",
              },
            },
          },
          maintenance: {
            intro: "Il prodotto continua a evolversi dopo il lancio.",
            decisions: {
              '1': {
                title: "Evoluzione continua",
                text: "Nuovi tipi di jingle, idee di brief e contenuti arrivano man mano che l’uso reale mostra cosa manca.",
              },
              '2': {
                title: "Correzioni rapide",
                text: "Monitoro errori e costi dei servizi di IA per risolvere i problemi prima che diventino reclami.",
              },
            },
          },
        },
        tech: {
          intro: "Uno stack serverless su AWS, che orchestra diversi modelli di IA e viene servito dall’edge.",
          frontend: "SPA in Angular in un monorepo insieme al back-end: un repository, un unico flusso di build e deploy.",
          backend: "Back-end serverless in Node.js su AWS Lambda, con DynamoDB come database NoSQL. Scala on demand e si paga per esecuzione.",
          ai: "Pipeline asincrona che orchestra LLM di OpenAI e Gemini, inferenza di modelli su Replicate e sintesi vocale con ElevenLabs.",
          payments: "Abbonamenti ricorrenti su Asaas, integrati via API e webhook per sbloccare la quota di ogni piano.",
          infra: "Asset statici serviti dalla CDN di CloudFront, DNS e proxy all’edge con Cloudflare e dominio .ia.br registrato su Registro.br.",
        },
        highlights: {
          '1': {
            value: "3",
            label: "proposte di testo per ogni jingle",
          },
          '2': {
            value: "8",
            label: "generi musicali brasiliani",
          },
          '3': {
            value: "60 s",
            label: "di jingle, scaricabile in MP3",
          },
          '4': {
            value: "R$ 9,90",
            label: "al mese con il piano base",
          },
        },
      },
      supervegetariano: {
        tagline: "Ristorante vegetariano a Santos (Brasile) dal 1986",
        summary: "Il sito di un ristorante vegetariano storico di Santos, in Brasile. Il sito esisteva già: l’ho migrato su un nuovo hosting in 1 giorno, ho configurato l’e-mail su KingHost e fatto piccoli ritocchi.",
        about: "Super Vegetariano serve cucina casalinga, gustosa e sana a Santos dal febbraio 1986. Il sito presenta la storia del locale, le sedi, il menù del giorno sui social e il contatto via WhatsApp. È stato realizzato in WordPress da un altro team.",
        work: {
          hosting: {
            intro: "Il sito funzionava già e i clienti lo conoscevano. L’obiettivo era cambiare l’infrastruttura senza che nessuno se ne accorgesse.",
            decisions: {
              '1': {
                title: "Migrazione in 1 giorno",
                text: "File, database e dominio del sito WordPress sono passati al nuovo hosting in un solo giorno, mantenendo contenuti e grafica.",
              },
              '2': {
                title: "E-mail su KingHost",
                text: "Ho configurato le caselle e-mail del dominio su KingHost, così il ristorante continua a ricevere messaggi al proprio indirizzo.",
              },
              '3': {
                title: "Piccoli ritocchi",
                text: "Dopo la migrazione ho corretto alcuni dettagli senza toccare l’identità che i clienti riconoscono.",
              },
            },
          },
        },
        highlights: {
          '1': {
            value: "40",
            label: "anni di cucina sana",
          },
          '2': {
            value: "2",
            label: "sedi a Santos, Brasile",
          },
          '3': {
            value: "1 giorno",
            label: "per completare la migrazione",
          },
          '4': {
            value: "1986",
            label: "anno di fondazione",
          },
        },
      },
    },
  },
  scheduling: {
    title: 'Prenota una conversazione',
    description:
      'Scegli un orario per una conversazione di 30 minuti sul tuo progetto.',
    openCalendar: 'Apri calendario',
  },
  games: {
    label: 'Giochi',
    subtitle: 'Una raccolta di giochi che ho creato.',
    play: 'Gioca',
    queensDescription:
      'Un puzzle logico quotidiano ispirato al classico problema delle N-Regine.',
    sudokuDescription:
      'Un generatore di Sudoku con griglie 4×4, 6×6 e 9×9 e difficoltà regolabile.',
    wordLadderDescription:
      "Un gioco di parole in cui cambi una lettera alla volta per trasformare una parola in un'altra, con puzzle quotidiani e tre livelli di difficoltà.",
  },
  tools: {
    label: 'Strumenti',
    subtitle: 'Strumenti utili che ho creato.',
    emptyTitle: 'Nessuno strumento disponibile per ora',
    emptyDescription: 'Nuovi strumenti stanno arrivando. Torna presto!',
  },
  home: {
    title:
      'Sviluppatore <span class="text-foreground-emphasis">specializzato in landing pages</span> e <span class="text-foreground-emphasis">siti autonome</span>.',
    description:
      'Creazione di siti web rapidi, moderni e ottimizzati per convertire i visitatori in clienti e rafforzare la tua presenza online.',
    websiteLikeThis: 'Voglio un sito come questo',
    whatsappMessage: 'Ciao! Vorrei richiedere un preventivo per un sito web.',
    nav: {
      home: 'Home',
      services: 'Servizi',
      whyMe: 'Perché me',
      projects: 'Progetti',
      testimonials: 'Testimonianze',
      allServices: "Tutti i servizi",
      segments: "Settori",
      gamesAndTools: "Giochi e strumenti",
    },
    services: {
      name: 'Servizi',

      title: 'Soluzioni complete per professionisti che vogliono crescere',
      description:
        'Sviluppo strategico focalizzato sulle prestazioni, sul design e sulla conversione. Tutto ciò che hai bisogno per avere presenza, autorità e risultati online.',

      landingPages: 'Landing Pages',
      landingPagesDescription:
        'Pagine di conversione alta per attraversare più lead e chiudere più negozi.',

      websitesForFreelancers: 'Siti per Freelancers',
      websitesForFreelancersDescription:
        'Siti professionali che trasmettono fiducia e generano nuove opportunità.',

      blogsAndPortofolios: 'Blog e Portfolio',
      blogsAndPortofoliosDescription:
        'Mostra il tuo lavoro, condividi conoscenza e attira il tuo pubblico ideale.',

      integrations: 'Integrazioni',
      integrationsDescription:
        'Formulari, marketing via e-mail, WhatsApp, pagamenti e molto altro.',
    },
    whyMe: {
      name: 'PER COSA TRADURREI CON LUI?',
      title: 'Compromesso con risultati e attenzione a ogni dettaglio',
      description:
        'Più del codice, offro strategia, comunicazione e un partner per aiutarti a raggiungere i tuoi obiettivi.',
      list: {
        '1Title': 'Comunicazione chiara e diretta',
        '1Subtitle': 'Tracciamento attraverso tutte le fasi',
        '2Title': 'Design moderno e personalizzato',
        '2Subtitle': 'Siti unici che rappresentano la tua marca',
        '3Title': 'Focus sulle prestazioni',
        '3Subtitle': 'Siti web rapidi che non perdono i visitatori',
        '4Title': 'Ottimizzato per motori di ricerca',
        '4Subtitle': 'Più visibilità per il tuo business',
      },
      yoE: '5+ anni',
      yoEDescription: 'Sviluppo di soluzioni digitali',
    },
    projects: {
      name: 'Portfolio',
      title: 'Progetti che generano risultati',
      description:
        'Alcuni lavori recenti sviluppati per professionisti e aziende che si sono fidati del mio lavoro.',
      viewAll: 'Vedi tutti i progetti',
    },
    testimonials: {
      name: 'Testimonianze',
      title: 'Cosa dicono i miei clienti:',
      previous: 'Testimonianze precedenti',
      next: 'Testimonianze successive',
      ctaTitle: 'Pronto ad avere un sito che porta risultati reali?',
      ctaDescription:
        'Parliamo dei tuoi progetti e trasformiamo le tue idee in realtà.',
      whatsapp: 'Parla su WhatsApp',
      whatsappMessage:
        'Ciao! Ho visto il tuo portfolio e vorrei parlare di un progetto.',
      requestBudget: 'Richiedi un preventivo',
      items: {
        '1': {
          text: 'Breno ha capito esattamente ciò di cui avevo bisogno e ha consegnato una pagina veloce, bella, che ha iniziato a portare contatti qualificati nella prima settimana.',
          name: 'Mariana Alves',
          profession: 'Architetta',
        },
        '2': {
          text: "Il processo è stato chiaro dall'inizio alla fine. Finalmente ho un sito professionale che spiega il mio lavoro e trasmette fiducia.",
          name: 'Rafael Costa',
          profession: 'Consulente aziendale',
        },
        '3': {
          text: "Oltre al design, l'attenzione alla performance ha fatto una grande differenza. Il sito carica velocemente e funziona perfettamente su mobile.",
          name: 'Camila Torres',
          profession: 'Titolare di studio beauty',
        },
        '4': {
          text: "Ha trasformato un'idea libera in una presenza digitale curata. La comunicazione è stata semplice e il risultato rispecchia il mio brand.",
          name: 'Lucas Mendes',
          profession: 'Personal trainer',
        },
      },
    },
    footer: {
      ctaTitle: 'Creiamo qualcosa di incredibile insieme?',
      ctaSubtitle:
        'Sono pronto a trasformare la tua idea in un sito professionale, veloce e capace di generare risultati reali.',
      cards: {
        closeService: {
          title: 'Assistenza vicina',
          subtitle: 'Foco sul tuo progetto',
        },
        transparentProcess: {
          title: 'Processo trasparente',
          subtitle: 'Segui ogni fase',
        },
        properSupport: {
          title: 'Supporto adeguato',
          subtitle: 'Lo lascio a modo tuo',
        },
      },
      brandSubtitle:
        'Programmatore freelance specializzato nella creazione di siti che generano risultati per autonomi e piccole imprese.',
      navigation: 'Navigazione',
      services: 'Servizi',
      letsTalk: 'Parliamone?',
      downloadCurriculum: 'Scarica CV',
      rights: 'Tutti i diritti riservati.',
    },
    estimateBudget: 'Richiedi un offerta',
  },
  servicesPage: {
    common: {
      backHome: 'Torna alla home',
      backToServices: 'Tutti i servizi',
      otherServices: 'Scopri gli altri servizi',
      requestBudget: 'Richiedi un preventivo',
      ready: 'Pronto a iniziare?',
      whatsappMessage:
        'Ciao! Ho visto il tuo portfolio e vorrei parlare di un progetto.',
    },
    index: {
      title: 'Servizi',
      subtitle:
        'Sviluppo strategico focalizzato su performance, design e conversione.',
      description:
        'Tutto ciò di cui hai bisogno per avere presenza, autorità e risultati reali online. Ogni servizio è creato per risolvere un problema specifico: veloce, moderno e ottimizzato per i motori di ricerca.',
      viewAll: 'Scopri di più',
      ctaTitle: 'Non sai quale servizio fa al caso tuo?',
      ctaSubtitle:
        'Mandami un messaggio e ti aiuto a scegliere la strada migliore per il tuo progetto.',
    },
    landingPages: {
      proofTitle: "Progetti già online",
      formTitle: "Richiedi un preventivo",
      formSubtitle: "Solo due campi. La conversazione continua su WhatsApp.",
      formName: "Il tuo nome",
      formOffer: "Cosa vuoi vendere o promuovere?",
      formOfferPlaceholder: "Es.: un corso, una consulenza, un lancio",
      messageIntro: "Ciao Breno! Voglio una landing page.",
      messageName: "Nome",
      messageOffer: "Offerta",
      anatomyTitle: 'Anatomia di una pagina che converte',
      anatomySubtitle: "Ogni blocco ha un compito. Ecco cosa fa ogni parte della tua landing page per portare il visitatore all'azione.",
      anatomy: {
        '1': {
          title: 'Titolo',
          text: 'Una promessa chiara che dice al visitatore, in pochi secondi, cosa ottiene e perché è importante.',
        },
        '2': {
          title: 'Riprova sociale',
          text: 'Testimonianze, loghi e numeri che dimostrano che altre persone si fidano già di te.',
        },
        '3': {
          title: 'Offerta e vantaggi',
          text: 'Cosa è incluso, presentato come risultati per il cliente e non come elenco di funzionalità.',
        },
        '4': {
          title: 'Modulo',
          text: 'Solo i campi davvero necessari, così compilarlo è semplice.',
        },
        '5': {
          title: "Invito all'azione",
          text: "Un'unica azione, ripetuta nei momenti giusti, con un pulsante impossibile da ignorare.",
        },
      },
      timeline: {
        '1': 'Giorno 1',
        '2': 'Giorni 2–3',
        '3': 'Giorni 3–6',
        '4': 'Dal giorno 7',
      },
      name: 'Landing Page',
      shortDescription:
        'Pagine ad alta conversione, progettate per trasformare i visitatori in contatti e vendite.',
      tagline: 'Pagine focalizzate sulla conversione',
      heroTitle: 'Landing page che trasformano i visitatori in clienti',
      intro:
        "Una landing page è una pagina mirata, con un unico scopo: guidare il visitatore verso un'azione chiara — acquistare, iscriversi, prenotare o richiedere un preventivo. A differenza di un sito completo, elimina le distrazioni e concentra tutta l'energia sulla conversione.",
      introP2:
        'Ogni elemento — titolo, testo, immagini, modulo e call-to-action — è progettato e testato per accompagnare il visitatore nel percorso. Il risultato è una pagina che funziona come un venditore che non dorme mai.',
      benefitsTitle: 'Perché investire in una landing page',
      benefits: {
        '1': {
          title: 'Più contatti',
          text: 'Una call-to-action chiara e un modulo ottimizzato catturano più contatti con lo stesso traffico.',
        },
        '2': {
          title: 'Miglior tasso di conversione',
          text: 'Testi e layout focalizzati aumentano la percentuale di visitatori che agiscono davvero.',
        },
        '3': {
          title: 'Risultati più rapidi',
          text: 'Una singola pagina va online in giorni, non mesi — e puoi iniziare a testare subito.',
        },
        '4': {
          title: 'Performance misurabile',
          text: 'Ogni clic, visualizzazione e invio è tracciato, così sai esattamente cosa funziona.',
        },
      },
      detailsTitle: 'Cosa consegno in ogni landing page',
      details: {
        '1': {
          title: 'Strategia prima dei pixel',
          text: "Iniziamo definendo la tua offerta, il tuo pubblico e l'unica azione desiderata. Struttura, testi e design sono costruiti attorno a quell'obiettivo — non attorno a ciò che è solo carino.",
        },
        '2': {
          title: 'Copywriting che vende',
          text: "Titoli, sottotitoli, elenchi e call-to-action sono scritti per convincere. Uso schemi collaudati per guidare il visitatore dall'attenzione all'azione.",
        },
        '3': {
          title: 'Velocità, SEO e mobile',
          text: 'Le pagine caricano in meno di un secondo, seguono le migliori pratiche SEO e si vedono perfette su ogni dispositivo — perché la maggior parte del tuo traffico arriva dal mobile.',
        },
      },
      processTitle: 'Come funziona il processo',
      process: {
        '1': {
          title: 'Call di scoperta',
          text: "Parliamo della tua attività, del tuo pubblico e dei tuoi obiettivi. Definisco l'offerta e il messaggio chiave.",
        },
        '2': {
          title: 'Design',
          text: 'Ricevi un mockup visivo della pagina da approvare prima di scrivere codice.',
        },
        '3': {
          title: 'Sviluppo',
          text: 'La pagina è costruita veloce, responsive e ottimizzata per la conversione.',
        },
        '4': {
          title: 'Lancio e miglioramenti',
          text: 'Andiamo online, monitoriamo i risultati e rifiniamo la pagina per migliorare la performance nel tempo.',
        },
      },
      faqTitle: 'Domande frequenti',
      faqs: {
        '1': {
          q: 'Quanto tempo richiede?',
          a: 'Una landing page tipica richiede da 3 a 7 giorni, in base allo scope e al contenuto.',
        },
        '2': {
          q: 'Devo scrivere io i contenuti?',
          a: 'Posso scrivere io i testi o partire dal materiale che già possiedi. Approvi tutto prima del lancio.',
        },
        '3': {
          q: 'Posso modificarla in seguito?',
          a: 'Sì. La pagina è costruita con una struttura facile da modificare e offro supporto dopo il lancio.',
        },
      },
      ctaTitle: 'Pronto a trasformare il traffico in clienti?',
      ctaSubtitle: 'Creiamo una landing page che si ripaga da sola.',
    },
    websitesForFreelancers: {
      compareTitle: 'Solo social vs. il tuo sito',
      compareWithoutTitle: 'Solo social',
      compareWithTitle: 'Con il tuo sito',
      compareWithout: {
        '1': "La tua visibilità dipende dall'algoritmo",
        '2': 'Le informazioni sui tuoi servizi sono sparse tra i post',
        '3': 'Il cliente deve scriverti per chiedere le cose di base',
        '4': 'Il tuo profilo può essere limitato o perso in qualsiasi momento',
      },
      compareWith: {
        '1': 'I clienti ti trovano su Google quando cercano ciò che fai',
        '2': 'Servizi, prezzi e metodo spiegati in un unico posto',
        '3': 'Domande risolte prima del primo messaggio',
        '4': 'Un indirizzo che è tuo, per sempre',
      },
      pagesTitle: 'Le pagine che il tuo sito può avere',
      pagesSubtitle: 'Una struttura semplice che risponde a ciò che ogni potenziale cliente vuole sapere.',
      pages: {
        '1': {
          title: 'Home',
          text: "Chi sei, cosa fai e come ingaggiarti, a colpo d'occhio.",
        },
        '2': {
          title: 'Servizi',
          text: 'Ogni servizio spiegato, con cosa include e come funziona.',
        },
        '3': {
          title: 'Chi sono',
          text: 'La tua storia, la tua esperienza e il tuo modo di lavorare.',
        },
        '4': {
          title: 'Portfolio',
          text: 'Progetti e risultati reali che dimostrano le tue capacità.',
        },
        '5': {
          title: 'Contatti',
          text: 'WhatsApp, modulo e prenotazioni a portata di clic.',
        },
      },
      name: 'Siti per Liberi Professionisti',
      shortDescription:
        'Siti professionali che generano fiducia e ti fanno ottenere più clienti.',
      tagline: 'Il tuo biglietto da visita digitale',
      heroTitle: 'Un sito professionale che ti fa ottenere clienti',
      intro:
        'Da libero professionista, il tuo sito è spesso la prima impressione che fai su un potenziale cliente. Un sito professionale fa più che essere bello: spiega cosa fai, mostra le prove del tuo lavoro e rende facile assumerti.',
      introP2:
        'La maggior parte dei liberi professionisti dipende da Instagram o dal passaparola. Un sito ti dà un luogo centrale e credibile verso cui indirizzare le persone — e continua a lavorare mentre dormi, rispondendo alle domande e generando opportunità.',
      benefitsTitle: 'Cosa fa un sito per te',
      benefits: {
        '1': {
          title: 'Credibilità',
          text: 'Un sito professionale ti fa sembrare affermato e affidabile.',
        },
        '2': {
          title: 'Contatti in pilota automatico',
          text: "I visitatori ti trovano, capiscono il tuo valore e ti contattano — anche fuori dall'orario di lavoro.",
        },
        '3': {
          title: 'Un portfolio che vende',
          text: 'Mostra i tuoi migliori lavori con casi studio che convincono nuovi clienti.',
        },
        '4': {
          title: 'Possiedi il tuo pubblico',
          text: 'Smetti di dipendere dai social. Il tuo sito, le tue regole, i tuoi dati.',
        },
      },
      detailsTitle: 'Cosa consegno',
      details: {
        '1': {
          title: 'Posizionamento chiaro',
          text: 'Definiamo cosa ti rende diverso e lo mettiamo al centro di ogni pagina.',
        },
        '2': {
          title: 'Servizi e prezzi',
          text: 'Pagine chiare su servizi, processo e prezzi riducono gli attriti e attirano clienti migliori.',
        },
        '3': {
          title: 'Contatto e prenotazioni',
          text: 'Pulsanti WhatsApp, moduli e prenotazioni così il cliente ti raggiunge con un clic.',
        },
      },
      processTitle: 'Come funziona il processo',
      process: {
        '1': {
          title: 'Scoperta',
          text: 'Mappiamo servizi, pubblico e obiettivi in una breve conversazione.',
        },
        '2': {
          title: 'Design',
          text: "Approvi l'aspetto e la struttura prima di una singola riga di codice.",
        },
        '3': {
          title: 'Sviluppo',
          text: 'Il tuo sito è costruito veloce, responsive e pronto per i motori di ricerca.',
        },
        '4': {
          title: 'Lancio',
          text: 'Pubblichiamo, colleghiamo il tuo dominio e rendiamo il sito facile da mantenere.',
        },
      },
      faqTitle: 'Domande frequenti',
      faqs: {
        '1': {
          q: 'Ho bisogno di un sito se ho già Instagram?',
          a: 'Instagram aiuta la visibilità, ma un sito ti dà credibilità, controllo e migliori conversioni. I due funzionano meglio insieme.',
        },
        '2': {
          q: 'Puoi copiare il design del mio concorrente?',
          a: 'Creo un design unico per il tuo brand. Copiare danneggia la tua credibilità e il tuo SEO.',
        },
        '3': {
          q: 'Mi aiuti con dominio e hosting?',
          a: 'Sì, gestisco tutta la parte tecnica così ti concentri solo sul tuo lavoro.',
        },
      },
      ctaTitle: 'Costruiamo la tua presenza professionale',
      ctaSubtitle: 'Mandami un messaggio e pianifichiamo il tuo sito.',
    },
    blogsAndPortfolios: {
      splitTitle: 'Due formati, un obiettivo: farsi ricordare',
      portfolio: {
        title: 'Portfolio',
        text: 'Quando il tuo lavoro parla da sé e merita di essere mostrato al meglio.',
        items: {
          '1': 'Pagine progetto con immagini, contesto e risultati',
          '2': 'Filtri per categoria o tipo di lavoro',
          '3': 'Testimonianze dei clienti accanto a ogni progetto',
        },
      },
      blog: {
        title: 'Blog',
        text: 'Quando la tua competenza fa la differenza e vuoi essere trovato nelle ricerche.',
        items: {
          '1': 'Articoli organizzati per categorie e tag',
          '2': 'Struttura pronta per la SEO in ogni articolo',
          '3': 'Iscrizione alla newsletter per tenere vicini i lettori',
        },
      },
      chapter: 'Capitolo',
      name: 'Blog e Portfolio',
      shortDescription:
        'Mostra il tuo lavoro, condividi conoscenza e attira il tuo pubblico ideale.',
      tagline: 'Contenuti e vetrina, insieme',
      heroTitle:
        'Un luogo per mostrare il tuo lavoro e condividere la tua conoscenza',
      intro:
        'Un portfolio o blog è più di una raccolta di progetti o articoli: è uno strumento che lavora per te. Attira persone interessate a ciò che fai, costruisce autorità nel tuo campo e trasforma i lettori in clienti.',
      introP2:
        'Progetto e costruisco siti dove il tuo lavoro brilla: veloci, belli, facili da aggiornare e strutturati perché i motori di ricerca ti trovino.',
      benefitsTitle: 'Perché avere un blog o portfolio',
      benefits: {
        '1': {
          title: 'Autorità',
          text: 'Contenuti costanti e di qualità ti posizionano come riferimento nel tuo campo.',
        },
        '2': {
          title: 'Traffico organico',
          text: 'Articoli ottimizzati per la ricerca attirano visitatori che cercano già i tuoi servizi.',
        },
        '3': {
          title: 'Mostra, non raccontare',
          text: 'Un portfolio ben strutturato dimostra la tua abilità meglio di qualsiasi discorso.',
        },
        '4': {
          title: 'Aggiornamenti facili',
          text: 'Aggiungere un progetto o un post richiede minuti, non uno sviluppatore.',
        },
      },
      detailsTitle: 'Cosa consegno',
      details: {
        '1': {
          title: 'Vetrine belle',
          text: 'Progetti presentati con immagini, descrizioni e risultati — fatti per impressionare clienti e partner.',
        },
        '2': {
          title: 'Un blog che cresce',
          text: 'Struttura editoriale con categorie, tag e basi SEO così ogni post continua a lavorare per te.',
        },
        '3': {
          title: 'Costruito per essere mantenuto',
          text: 'Modifica semplice per possedere i tuoi contenuti e non dipendere mai da uno sviluppatore per piccoli cambi.',
        },
      },
      processTitle: 'Come funziona il processo',
      process: {
        '1': {
          title: 'Obiettivi',
          text: 'Definiamo cosa vuoi attirare: clienti, lettori o entrambi.',
        },
        '2': {
          title: 'Struttura',
          text: 'Mappo sezioni, categorie e pagine che hanno senso per i tuoi contenuti.',
        },
        '3': {
          title: 'Design e costruzione',
          text: 'Il tuo sito è creato pensando al tuo stile e al tuo pubblico.',
        },
        '4': {
          title: 'Formazione',
          text: 'Impari a pubblicare e modificare i contenuti da solo, senza codice.',
        },
      },
      faqTitle: 'Domande frequenti',
      faqs: {
        '1': {
          q: 'Devo saper scrivere?',
          a: 'No. Ti aiuto a strutturare le idee e puoi anche affidarmi i primi articoli.',
        },
        '2': {
          q: 'Posso aggiornarlo da solo?',
          a: 'Sì. Il sito è costruito perché tu aggiunga progetti e post senza toccare una riga di codice.',
        },
        '3': {
          q: 'Scrivi anche i contenuti?',
          a: 'Sì, posso creare i testi del tuo portfolio e i primi post del blog.',
        },
      },
      ctaTitle: 'Il tuo lavoro merita un palco',
      ctaSubtitle: 'Creiamo un portfolio che ti porti opportunità.',
    },
    integrations: {
      hubCenter: 'Il tuo sito',
      tools: {
        '1': 'WhatsApp',
        '2': 'E-mail',
        '3': 'CRM',
        '4': 'Pagamenti',
        '5': 'Fogli di calcolo',
        '6': 'Analytics',
      },
      flowTitle: 'Come funziona in pratica',
      flowSubtitle: 'Un solo invio di modulo può avviare tutto ciò che prima si faceva a mano.',
      flow: {
        '1': {
          label: 'Attivatore',
          title: 'Un visitatore compila il modulo',
          text: 'Nome, contatto e interesse vengono raccolti sul tuo sito.',
        },
        '2': {
          label: 'Automazione',
          title: 'I dati vanno dove servono',
          text: 'Il contatto viene salvato nel tuo CRM o foglio di calcolo e ricevi un avviso su WhatsApp.',
        },
        '3': {
          label: 'Risultato',
          title: 'Rispondi in pochi minuti',
          text: "Il visitatore riceve un'e-mail di conferma e tu lo ricontatti mentre l'interesse è alto.",
        },
      },
      name: 'Integrazioni',
      shortDescription:
        'Form, email marketing, WhatsApp, pagamenti e molto altro.',
      tagline: 'Fai funzionare tutto insieme',
      heroTitle: 'Integrazioni che collegano il tuo sito alla tua attività',
      intro:
        "Un sito bello è solo parte dell'equazione. Per generare risultati reali, deve parlare con gli strumenti che già usi: email, CRM, pagamenti, notifiche e altro. È esattamente a questo che servono le integrazioni.",
      introP2:
        'Collego il tuo sito ai servizi che fanno girare la tua attività — automatizzando il lavoro, riducendo gli errori e assicurando che nessun contatto vada perso.',
      benefitsTitle: 'Perché integrare i tuoi sistemi',
      benefits: {
        '1': {
          title: 'Basta lavoro manuale',
          text: 'I dati circolano automaticamente tra il tuo sito e i tuoi strumenti.',
        },
        '2': {
          title: 'Nessun contatto perso',
          text: "Ogni invio di modulo raggiunge il posto giusto, all'istante.",
        },
        '3': {
          title: 'Follow-up automatizzato',
          text: 'Email e messaggi vengono attivati automaticamente dalle azioni dei visitatori.',
        },
        '4': {
          title: 'Dati in un unico posto',
          text: 'Tutto ciò che ti serve, sincronizzato nel tuo CRM, foglio o dashboard.',
        },
      },
      detailsTitle: 'Cosa posso collegare',
      details: {
        '1': {
          title: 'Form ed email marketing',
          text: 'Moduli di contatto che alimentano la tua lista email, automazioni e sequenze.',
        },
        '2': {
          title: 'WhatsApp e notifiche',
          text: 'Alert istantanei per non perdere mai un contatto, su WhatsApp, email o Telegram.',
        },
        '3': {
          title: 'Pagamenti e analytics',
          text: 'Checkout, link di pagamento, pixel e analytics per le tue campagne.',
        },
      },
      processTitle: 'Come funziona il processo',
      process: {
        '1': {
          title: 'Audit',
          text: 'Elenchiamo gli strumenti che usi e cosa deve comunicare tra loro.',
        },
        '2': {
          title: 'Piano',
          text: "Propongo l'architettura più semplice che risolve il tuo problema.",
        },
        '3': {
          title: 'Costruzione',
          text: "Le integrazioni vengono implementate e testate dall'inizio alla fine.",
        },
        '4': {
          title: 'Supporto',
          text: 'Ricevi documentazione e supporto per tutto ciò che è stato consegnato.',
        },
      },
      faqTitle: 'Domande frequenti',
      faqs: {
        '1': {
          q: 'Quali strumenti supporti?',
          a: 'I più popolari: Google Sheets, Mailchimp, WhatsApp, Stripe, Mercado Pago, Telegram e altro.',
        },
        '2': {
          q: 'Puoi integrare strumenti che già uso?',
          a: 'Sì. Lavoro con ciò che già possiedi ed evito costi inutili.',
        },
        '3': {
          q: 'È sicuro?',
          a: 'Sì. Seguo le migliori pratiche di sicurezza e non conservo mai dati sensibili senza reale necessità.',
        },
      },
      ctaTitle: 'Colleghiamo i tuoi sistemi',
      ctaSubtitle: 'Dimmi cosa usi e farò dialogare tutto.',
    },
  },
  queens: {
    queens: 'Regine',
    level: 'Livello',
    'level-1': 'Principiante',
    'level-2': 'Facile',
    'level-3': 'Medio',
    'level-4': 'Difficile',
    'level-5': 'Esperto',
    'new-game': 'Nuova Partita',
    hint: 'Suggerimento',
    congratulations: 'Complimenti! Puzzle risolto!',
    'queens-placed': 'regine piazzate',
    'check-errors': 'Controlla violazioni delle regole',
    loading: 'Caricamento...',
    'how-to-play': 'Come Giocare',
    'rule-row': 'Metti esattamente una regina in ogni riga.',
    'rule-col': 'Metti esattamente una regina in ogni colonna.',
    'rule-region': 'Metti esattamente una regina in ogni regione colorata.',
    'rule-adjacent': 'Due regine non possono toccarsi, nemmeno in diagonale.',
    'tip-tap':
      'Tocca una volta per segnare ✕, ancora per mettere ♫, ancora per pulire.',
    'tip-x':
      'Scorri il dito sulle celle per segnare rapidamente più ✕.',
    'tip-slide':
      'Usa i segni ✕ per indicare celle che non possono avere regine.',
    'faq-title': 'Domande Frequenti',
    'faq-q1': "Cos'è il gioco Regine?",
    'faq-a1':
      'Regine è un puzzle di logica dove posizioni regine sulla scacchiera in modo che ogni riga, colonna e regione colorata contenga esattamente una regina, senza che si tocchino.',
    'faq-q2': 'Come si gioca?',
    'faq-a2':
      'Tocca una cella per alternare tra: ✕ segno → ♫ regina → vuoto. Scorri il dito sulla scacchiera per segnare rapidamente più ✕. Le violazioni sono evidenziate in rosso.',
    'faq-q3': 'Cosa succede se sbaglio?',
    'faq-a3':
      "Le regine in conflitto vengono evidenziate in rosso. Rivedi e aggiusta fino a soddisfare tutte le regole. Non c'è limite di mosse!",
    'faq-q4': "C'è un nuovo puzzle ogni giorno?",
    'faq-a4':
      'Sì! La scacchiera viene generata quotidianamente in base alla data corrente, offrendo una nuova sfida ogni giorno. Condividi i tuoi risultati!',
    'seo-title': 'Gioca a Regine — Puzzle di Logica Quotidiano',
    'seo-p1':
      'Regine è un puzzle di logica quotidiano ispirato al classico problema delle N-Regine. Posiziona regine sulla scacchiera seguendo quattro semplici regole: una per riga, una per colonna, una per regione colorata, senza che si tocchino.',
    'seo-p2':
      'Scegli tra 5 livelli di difficoltà — Principiante (5×5), Facile (6×6), Medio (7×7), Difficile (8×8) ed Esperto (10×10). Ogni puzzle è generato deterministicamente dalla data.',
    'seo-p3':
      'Gioca online gratuitamente, senza registrazione. Allena il tuo ragionamento logico e le capacità di riconoscimento di pattern. Un nuovo puzzle ti aspetta ogni giorno!',
  },
  sudoku: {
    sudoku: 'Sudoku',
    size: 'Griglia',
    'size-4': '4×4 Mini',
    'size-6': '6×6',
    'size-9': '9×9 Classica',
    difficulty: 'Difficoltà',
    'difficulty-0': 'Facile',
    'difficulty-1': 'Medio',
    'difficulty-2': 'Difficile',
    'new-game': 'Nuova Partita',
    notes: 'Note',
    eraser: 'Cancella',
    undo: 'Annulla',
    hint: 'Suggerimento',
    mistakes: 'Errori',
    congratulations: 'Complimenti! Puzzle risolto!',
    loading: 'Caricamento...',
    'keyboard-hint':
      'Suggerimento: usa le frecce della tastiera per muoverti nella griglia, i numeri per riempire, N per attivare le note e Delete per cancellare.',
    'how-to-play': 'Come Giocare',
    'rule-1':
      'Ogni riga deve contenere ogni numero da 1 a N esattamente una volta.',
    'rule-2':
      'Ogni colonna deve contenere ogni numero da 1 a N esattamente una volta.',
    'rule-3':
      'Ogni blocco evidenziato deve contenere ogni numero da 1 a N esattamente una volta.',
    'tip-1':
      'Inizia dai blocchi che hanno già più numeri e cerca, in ogni riga, colonna e blocco, celle con un solo valore possibile.',
    'tip-2':
      'Usa le Note per scrivere i numeri candidati. Appaiono come cifre piccole e ti aiutano a seguire le possibilità.',
    'tip-3':
      'Gioca con il mouse, il touchscreen o la tastiera. I numeri ripetuti nella stessa riga, colonna o blocco vengono evidenziati in rosso.',
    'strategy-title': 'Consigli e Strategie',
    'strategy-p1':
      'Cerca candidati unici: se in una cella può entrare un solo numero, scrivilo subito. È la tecnica più importante per i principianti.',
    'strategy-p2':
      'Analizza righe, colonne e blocchi cercando i numeri mancanti. Quando un numero è già in due blocchi di una riga, il terzo spesso regala un indizio.',
    'strategy-p3':
      'Usa i segni a matita. Annota tutti i numeri possibili in ogni cella ed eliminali uno a uno mentre risolvi. Così i puzzle difficili diventano gestibili.',
    'strategy-p4':
      "Allenati un po' ogni giorno. Giocare a Sudoku con regolarità migliora concentrazione, riconoscimento di pattern e memoria a breve termine — ed è davvero rilassante.",
    'faq-title': 'Domande Frequenti',
    'faq-q1': "Cos'è il Sudoku?",
    'faq-a1':
      "Il Sudoku è un puzzle di logica basato sui numeri. L'obiettivo è riempire la griglia così che ogni riga, colonna e blocco contenga ogni numero da 1 a N esattamente una volta. Niente matematica, solo logica.",
    'faq-q2': 'Come si gioca a Sudoku?',
    'faq-a2':
      'Scegli la dimensione della griglia (4×4, 6×6 o 9×9), seleziona una difficoltà e tocca una cella per selezionarla. Poi inserisci un numero con la tastiera a schermo o la tastiera fisica. Ogni puzzle ha esattamente una soluzione.',
    'faq-q3': 'Cosa significano le dimensioni della griglia?',
    'faq-a3':
      '4×4 è un mini-Sudoku perfetto per principianti e bambini, 6×6 è una sfida compatta e 9×9 è il Sudoku classico giocato in tutto il mondo. Ogni dimensione usa i numeri da 1 a N.',
    'faq-q4': 'Il Sudoku fa bene al cervello?',
    'faq-a4':
      'Sì. Il Sudoku allena il ragionamento logico, la concentrazione e la memoria, e gli studi suggeriscono che risolvere puzzle con regolarità mantiene la mente attiva. È anche una pausa calma e produttiva lontano dai social.',
    'faq-q5': 'Questo Sudoku è davvero gratis?',
    'faq-a5':
      'Sì, 100% gratis. Nessuna registrazione, nessun download e nessun limite di tempo. Puoi giocare a Sudoku online direttamente nel browser, su qualsiasi dispositivo.',
    'seo-title':
      'Gioca a Sudoku Online — Generatore di Mini Sudoku Gratis',
    'seo-p1':
      'Benvenuto nel nostro generatore di Sudoku online gratuito. Gioca a Sudoku online nel browser con tre dimensioni di griglia — 4×4 mini, 6×6 e la classica 9×9 — e tre livelli di difficoltà, dal riscaldamento facile alla sfida difficile.',
    'seo-p2':
      "Ogni partita viene generata all'istante con una soluzione unica, quindi ottieni sempre un puzzle corretto e risolvibile. Scegli la tua griglia preferita, regola la difficoltà e clicca su Nuova Partita per ricevere un tabellone nuovo in un secondo.",
    'seo-p3':
      'Il Sudoku è uno dei puzzle di logica più popolari al mondo. Allena il ragionamento, affina la concentrazione ed è perfetto per una pausa breve. E il bello: il nostro Sudoku funziona su mobile, tablet e computer senza installare nulla.',
    'seo-p4':
      'Che tu voglia insegnare ai bambini con una mini-griglia 4×4, scaldarti con un 6×6 facile o metterti alla prova con un 9×9 difficile, puoi giocare a Sudoku online qui in qualsiasi momento. Note, suggerimenti, annulla, scorciatoie da tastiera ed evidenziazione degli errori rendono ogni partita facile da godere.',
    'seo-p5':
      'Aggiungi questa pagina ai preferiti e torna quando ti serve un allenamento mentale. Gioca a Sudoku online gratis, migliora la tua logica e divertiti — una griglia alla volta.',
  },
  wordLadder: {
    name: 'Scala di Parole',
    home: 'Home',
    intro:
      'Cambia una lettera alla volta per trasformare la parola iniziale nella parola obiettivo. Ogni passaggio deve essere una vera parola inglese. Gioca gratis nel tuo browser, con puzzle quotidiani e tre livelli di difficoltà.',
    mode: 'Modalità',
    'mode-classic': 'Classica',
    'mode-daily': 'Quotidiana',
    difficulty: 'Difficoltà',
    'difficulty-easy': 'Facile',
    'difficulty-medium': 'Media',
    'difficulty-hard': 'Difficile',
    'daily-today': 'La Scala di Parole di oggi',
    'new-game': 'Nuova Partita',
    moves: 'Mosse',
    best: 'Record',
    target: 'Obiettivo',
    time: 'Tempo',
    'daily-done':
      'Hai già risolto il puzzle di oggi. Torna domani per uno nuovo!',
    start: 'Partenza',
    'your-move': 'La tua prossima parola',
    'input-placeholder': 'PAROLA',
    submit: 'Vai',
    hint: 'Suggerimento',
    undo: 'Annulla',
    'start-game': 'Inizia',
    'err-empty': 'Scrivi prima una parola.',
    'err-length':
      'La parola deve avere la stessa lunghezza della parola iniziale.',
    'err-dictionary':
      "Questa parola non è nel nostro dizionario. Provane un'altra.",
    'err-one-letter': 'Cambia esattamente una lettera.',
    'hint-text':
      'Pensa a una parola che dista una lettera dalla tua parola attuale.',
    'hint-1': 'La tua prossima parola inizia con {letter}.',
    'hint-2': 'Prova a cambiare la lettera in posizione {position}.',
    'hint-3': 'Una possibile prossima parola è {word}.',
    'live-move': 'Ora sei a {word}.',
    'live-undo': 'Mossa annullata.',
    complete: 'Scala di Parole completata!',
    'result-moves':
      'Hai trasformato la parola iniziale nella parola obiettivo. Ottimo!',
    'result-optimal':
      'La prossima volta prova a finire con il minor numero di mosse.',
    'daily-streak': 'Serie quotidiana:',
    'play-again': 'Gioca di nuovo',
    'next-puzzle': 'Puzzle successivo',
    share: 'Condividi',
    'share-copied': 'Risultato copiato negli appunti.',
    'how-to-play': 'Come si gioca a Scala di Parole',
    'rule-1': 'Inizia con la parola blu in cima alla scala.',
    'rule-2':
      'Inserisci una nuova parola che differisca dalla tua parola attuale per esattamente una lettera.',
    'rule-3': 'Ogni parola inserita deve essere una vera parola inglese.',
    'rule-4':
      'Continua, un passo alla volta, finché raggiungi la parola obiettivo ambra.',
    'rule-5':
      'Cerca di finire con il minor numero di mosse per battere il tuo record.',
    'rules-title': 'Regole ufficiali della Scala di Parole',
    'rules-p1':
      'Una scala di parole è risolta quando trasformi la parola iniziale nella parola obiettivo usando solo parole vere, cambiando esattamente una lettera a ogni passo. Per esempio, CAT → COT → COG → DOG.',
    'rules-p2':
      'Puoi cambiare la posizione della lettera e il suo valore, ma a ogni mossa può cambiare solo una lettera. Puoi usare un suggerimento (fino a tre per partita) se ti blocchi, e annullare una mossa in qualsiasi momento.',
    'rules-p3':
      "Nella modalità Classica scegli la difficoltà e giochi tutti i puzzle che vuoi. Nella modalità Quotidiana c'è un puzzle condiviso al giorno, e completarlo mantiene viva la tua serie.",
    'tips-title': 'Consigli e strategie',
    'tip-1':
      'Concentrati sulle vocali. Le parole che differiscono per una sola vocale sono quasi sempre valide e le vocali aprono più percorsi.',
    'tip-2':
      "Lavora anche all'indietro dalla parola obiettivo. Spesso il percorso migliore diventa chiaro quando pianifichi da entrambe le estremità.",
    'tip-3':
      'Tieni a mente le posizioni delle lettere. Cambiare una lettera vicino alla fine della parola di solito lascia più opzioni.',
    'tip-4':
      'Cerca schemi comuni come -ATE, -ING o -IDE. Riusare uno schema ti permette di attraversare più parole rapidamente.',
    'tip-5':
      "Usa i tuoi tre suggerimenti con saggezza. L'ultimo rivela l'esatta prossima parola, molto prezioso nei puzzle difficili.",
    'whatis-title': "Cos'è una Scala di Parole?",
    'whatis-p1':
      'La scala di parole è un gioco di parole inventato da Lewis Carroll nel 1877, che lo chiamava Doublets. Inizi con due parole della stessa lunghezza e le colleghi attraverso una catena di parole vere, cambiando una lettera alla volta.',
    'whatis-p2':
      'Per esempio, trasformare COLD in WARM può avvenire così: COLD → CORD → WORD → WARD → WARM. Il gioco è popolare in classe perché sviluppa ortografia, vocabolario e ragionamento logico in modo divertente.',
    'levels-title': 'Livelli di difficoltà',
    'levels-easy': 'Facile:',
    'levels-easy-p':
      'Catene corte di 2-4 mosse tra parole molto comuni. Perfetto per bambini e principianti.',
    'levels-medium': 'Media:',
    'levels-medium-p':
      'Catene di 5-7 mosse. Un buon allenamento quotidiano per i giocatori abituali.',
    'levels-hard': 'Difficile:',
    'levels-hard-p':
      'Lunghe catene di 8 mosse o più. Solo i più esperti appassionati di parole le risolveranno.',
    'kids-title': 'Scala di Parole per bambini',
    'kids-p1':
      "Le scale di parole sono un'attività fantastica per i bambini che imparano a leggere e scrivere. Ogni mossa richiede di confrontare le lettere, pronunciare le parole e ragionare sul vocabolario, tutto mentre giocano.",
    'kids-p2':
      "Fai iniziare i bambini in modalità Facile, dove parole corte come CAT e DOG si collegano in poche mosse. È un'attività tranquilla, adatta agli schermi e segretamente educativa.",
    'faq-title': 'Domande frequenti',
    'faq-q1': "Cos'è il gioco Scala di Parole?",
    'faq-a1':
      "Una scala di parole è un puzzle in cui trasformi una parola in un'altra cambiando una singola lettera alla volta, usando una parola vera a ogni passo. Fu inventato da Lewis Carroll nel 1877.",
    'faq-q2': 'Come si gioca a Scala di Parole?',
    'faq-a2':
      'Parti dalla parola iniziale blu, poi inserisci parole che differiscano dalla precedente per esattamente una lettera. Continua finché raggiungi la parola obiettivo ambra. Meno mosse fai, meglio è.',
    'faq-q3': 'Quali sono le regole della Scala di Parole?',
    'faq-a3':
      'Ogni mossa cambia esattamente una lettera e ogni parola deve essere una vera parola inglese della stessa lunghezza delle parole iniziale e obiettivo. Non puoi ripetere una parola già presente nella tua scala.',
    'faq-q4': 'Si possono cambiare più lettere in una scala di parole?',
    'faq-a4':
      'No. Esattamente una lettera può cambiare per mossa. Cambiare due o più lettere contemporaneamente viola le regole del puzzle.',
    'faq-q5': 'Cosa rende difficile una scala di parole?',
    'faq-a5':
      'La difficoltà dipende dalla distanza tra le due parole, da quante parole vere esistono tra di esse e da quanto è facile rimanere bloccati in vicoli ciechi lungo il percorso.',
    'faq-q6': 'Le scale di parole fanno bene ai bambini?',
    'faq-a6':
      "Sì. Le scale di parole sono molto usate a scuola per esercitare ortografia, corrispondenza lettera-suono e vocabolario, e sono un'attività sullo schermo calma ed educativa.",
    'faq-q7': 'Questo gioco di Scala di Parole è gratuito?',
    'faq-a7':
      'Sì, completamente gratuito. Nessuna registrazione, nessun download e nessun limite di tempo. Gioca nel browser su qualsiasi dispositivo, incluso il telefono.',
    'related-title': 'Altri giochi gratuiti online',
    'related-p':
      'Se ti piacciono i giochi di parole, prova gli altri nostri giochi di logica gratuiti — funzionano tutti su mobile e desktop.',
    'related-sudoku':
      'Il classico gioco di logica con tre dimensioni di griglia.',
    'related-queens':
      'Un puzzle di posizionamento quotidiano ispirato alle N-Regine.',
  },
  seo: {
    cardTagline: 'Siti web, landing page e automazione',
    home: {
      title: 'Breno Carvalho — Landing page e siti web che convertono',
      description: 'Landing page e siti web veloci, moderni e ottimizzati per i motori di ricerca, pensati per trasformare i visitatori in clienti. Design, sviluppo, hosting e automazione.',
    },
    services: {
      title: 'Realizzazione di siti web e landing page',
      description: 'Landing page, siti professionali, blog, portfolio e integrazioni con WhatsApp, CRM e pagamenti. Trova il servizio giusto per la tua attività.',
    },
    landingPages: {
      title: 'Landing page che trasformano i visitatori in clienti',
      description: 'Landing page ad alta conversione con testi persuasivi, riprova sociale e una call to action chiara. Veloci, mobile-first e pronte per le campagne.',
    },
    websitesForFreelancers: {
      title: 'Siti professionali per freelance e liberi professionisti',
      description: 'Un sito professionale che trasmette fiducia e porta nuovi clienti: servizi, portfolio, testimonianze e contatto WhatsApp, veloce e facile da trovare su Google.',
    },
    blogsAndPortfolios: {
      title: 'Blog e portfolio per mostrare il tuo lavoro',
      description: 'Un blog o un portfolio per mostrare il tuo lavoro, pubblicare contenuti e attirare il pubblico giusto, con SEO, caricamento veloce e aggiornamenti semplici.',
    },
    integrations: {
      title: 'Integrazioni web con WhatsApp, CRM, email e pagamenti',
      description: 'Collega il tuo sito a WhatsApp, CRM, email marketing, pagamenti e fogli di calcolo per raccogliere e seguire i contatti in automatico.',
    },
    sudoku: {
      title: 'Sudoku online gratis con griglie 4×4, 6×6 e 9×9',
      description: 'Gioca a Sudoku gratis nel browser: griglie 4×4, 6×6 e 9×9, tre livelli di difficoltà, note, suggerimenti e annulla. Su smartphone e computer.',
    },
    queens: {
      title: 'Queens — gioco di logica online gratis',
      description: 'Posiziona una regina in ogni riga, colonna e regione colorata senza che due si tocchino. Cinque livelli di difficoltà e suggerimenti. Gioca gratis online.',
    },
    wordLadder: {
      title: 'Word Ladder — gioco di parole online gratis',
      description: 'Cambia una lettera alla volta per trasformare la parola iniziale in quella finale. Sfida giornaliera e tre livelli di difficoltà, gratis nel browser.',
    },
  },
};
