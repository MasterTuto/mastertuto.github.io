import type { Translations } from './english';
import { minesweeper } from './games/minesweeper/de';
import { nonogram } from './games/nonogram/de';
import { binaryPuzzle } from './games/binary-puzzle/de';
import { memory } from './games/memory/de';
import { colorLink } from './games/color-link/de';

export const germanTranslations: Translations = {
  minesweeper,
  nonogram,
  binaryPuzzle,
  memory,
  colorLink,
  catalog: {
    explore: 'Spiele und Werkzeuge entdecken',
    toggle: 'Menü ein- oder ausklappen',
    close: 'Menü schließen',
    skip: 'Zum Inhalt springen',
    gamesTitle: 'Kostenlose Logik- und Wortspiele online',
    gamesIntro:
      "Spiele Sudoku, Queens, Word Ladder, Minensucher, Nonogramm, Binärpuzzle, Gedächtnisspiel und Farben verbinden kostenlos im Browser, auf Smartphone, Tablet oder Computer.",
    gamesHeading: 'Wähle deine nächste Herausforderung',
    gamesText:
      "Trainiere Logik mit Sudoku, Queens, Nonogramm und Binärpuzzle, teste dein Gedächtnis, weiche Minen aus oder verbinde Farben und Wörter. Jedes Spiel hat Stufen, eine Uhr, die mit deinem ersten Zug startet, und ein Ergebnis zum Teilen.",
    toolsTitle: "Kostenlose Online-Werkzeuge für Profis",
    toolsIntro:
      "Erstelle Rechnungen, dimensioniere Kabel und Klimaanlagen, berechne Fristen und mehr, oder formatiere JSON und dekodiere JWTs. Kostenlose Werkzeuge direkt im Browser.",
    toolsHeading: "Werkzeuge für den Arbeitsalltag",
    toolsText:
      "Die Fachrechner und der Rechnungsgenerator sind auf Portugiesisch und folgen brasilianischen Regeln. Die Entwicklerwerkzeuge formatieren JSON und dekodieren JWT-Tokens. Für eine Pause gibt es unsere Logikspiele.",
  },
  backHome: 'Zurück zur Startseite',
  cases: {
    viewCase: "Ganze Fallstudie ansehen",
    visitSite: "Website besuchen",
    backToProjects: "Zurück zu den Projekten",
    myRole: "Was ich gemacht habe",
    aboutTitle: "Über das Projekt",
    highlightsTitle: "Highlights",
    galleryTitle: "Auf Desktop und Smartphone",
    techTitle: "Unter der Haube",
    desktop: "Desktop-Version",
    mobile: "Mobile Version",
    ctaTitle: "Hast du ein ähnliches Projekt im Kopf?",
    ctaText: "Erzähl mir, was du brauchst, und ich antworte mit den nächsten Schritten.",
    ctaButton: "Über mein Projekt sprechen",
    roles: {
      design: "Design",
      implementation: "Umsetzung",
      hosting: "Hosting",
      maintenance: "Wartung",
    },
    items: {
      jingle: {
        tagline: "Plattform zur Erstellung von Jingles mit künstlicher Intelligenz",
        summary: "Eine Plattform, auf der jeder eine Idee in einen Jingle verwandelt: Künstliche Intelligenz schreibt den Text, erstellt die Musik und erzeugt den Gesang, mit Download als MP3. Ich habe Design, Umsetzung und Hosting übernommen und kümmere mich um die Wartung.",
        about: "jingle.ia.br holt den Jingle aus dem Studio. Bäckereien, Pizzerien, Supermärkte, Radiosender und Agenturen beschreiben ihre Botschaft, wählen einen brasilianischen Rhythmus wie Forró, Sertanejo oder Pagode, vergleichen drei Textvorschläge und laden den fertigen Song herunter. Dieselbe Plattform eignet sich für Geburtstage, Events, Podcasts und Kampagnen, ganz ohne Songwriting-Kenntnisse.",
        work: {
          design: {
            intro: "Die Zielgruppe hat noch nie einen Song geschrieben. Jede Designentscheidung räumt einen Zweifel aus dem Weg.",
            decisions: {
              '1': {
                title: "Vier Schritte, eine Frage nach der anderen",
                text: "Idee, Ton, Text und Download. Kurze Schritte verhindern das leere Blatt bei Menschen, die nicht wissen, wo sie anfangen sollen.",
              },
              '2': {
                title: "Auswählen statt schreiben",
                text: "Man vergleicht drei Texte, bevor das Audio erzeugt wird. Auswählen ist leichter als Schreiben, und Guthaben wird nur für Freigegebenes verbraucht.",
              },
              '3': {
                title: "Ein typisch brasilianischer Look",
                text: "Grün und Gelb, ein Megafon und regionale Rhythmen zeigen schon auf dem ersten Screen, für wen das Produkt ist.",
              },
            },
          },
          implementation: {
            intro: "Musik zu erzeugen dauert und kann scheitern. Die Umsetzung sorgt dafür, dass das den Nutzer nicht belastet.",
            decisions: {
              '1': {
                title: "Generierung im Hintergrund",
                text: "Der Jingle wird weiter erzeugt, auch wenn die Seite geschlossen wird. Man verfolgt den Status und lädt das MP3 herunter, sobald es fertig ist.",
              },
              '2': {
                title: "Fehler kosten kein Guthaben",
                text: "Schlägt die Texterstellung fehl, geht der Jingle zurück ins Guthaben des Plans und der Screen erklärt, was passiert ist.",
              },
              '3': {
                title: "Abo-Pläne",
                text: "Drei Monatspläne mit Jingle-Kontingent und jederzeit kündbar. Der Einstiegsplan hat ein gesprochenes Wasserzeichen.",
              },
            },
          },
          hosting: {
            intro: "Die Nutzung kommt in Spitzen, etwa an Feiertagen und bei Kampagnen. Die Infrastruktur folgt diesem Rhythmus.",
            decisions: {
              '1': {
                title: "Zahlen, was man nutzt",
                text: "Serverless-Architektur: keine Server, die untätig auf Besucher warten, und die Kapazität wächst automatisch mit dem Traffic.",
              },
              '2': {
                title: "Eine Domain, die sich selbst erklärt",
                text: "Die .ia.br-Domain sagt, was das Produkt tut und dass es brasilianisch ist, noch bevor die Seite geöffnet wird.",
              },
            },
          },
          maintenance: {
            intro: "Das Produkt entwickelt sich nach dem Launch weiter.",
            decisions: {
              '1': {
                title: "Kontinuierliche Weiterentwicklung",
                text: "Neue Jingle-Typen, Briefing-Ideen und Inhalte kommen dazu, sobald die echte Nutzung zeigt, was fehlt.",
              },
              '2': {
                title: "Schnelle Fehlerbehebung",
                text: "Ich beobachte Fehler und die Kosten der KI-Dienste, um Probleme zu lösen, bevor daraus Beschwerden werden.",
              },
            },
          },
        },
        tech: {
          intro: "Ein Serverless-Stack auf AWS, der mehrere KI-Modelle orchestriert und über die Edge ausgeliefert wird.",
          frontend: "Angular-SPA in einem Monorepo zusammen mit dem Backend: ein Repository, ein Build- und Deploy-Flow.",
          backend: "Serverless-Backend in Node.js auf AWS Lambda, mit DynamoDB als NoSQL-Datenbank. Skaliert nach Bedarf und wird pro Ausführung abgerechnet.",
          ai: "Asynchrone Pipeline, die LLMs von OpenAI und Gemini, Modell-Inferenz auf Replicate und Sprachsynthese mit ElevenLabs orchestriert.",
          payments: "Wiederkehrende Abos über Asaas, per API und Webhooks angebunden, um das Kontingent jedes Plans freizugeben.",
          infra: "Statische Assets über das CloudFront-CDN, DNS und Edge-Proxy mit Cloudflare und die .ia.br-Domain bei Registro.br.",
        },
        highlights: {
          '1': {
            value: "3",
            label: "Textvorschläge pro Jingle",
          },
          '2': {
            value: "8",
            label: "brasilianische Musikgenres",
          },
          '3': {
            value: "60 s",
            label: "Jingle, als MP3 herunterladbar",
          },
          '4': {
            value: "R$ 9,90",
            label: "pro Monat im Einstiegsplan",
          },
        },
      },
      supervegetariano: {
        tagline: "Vegetarisches Restaurant in Santos (Brasilien) seit 1986",
        summary: "Die Website eines traditionellen vegetarischen Restaurants in Santos, Brasilien. Die Website gab es bereits: Ich habe sie an einem Tag zu einem neuen Hosting umgezogen, die E-Mails bei KingHost eingerichtet und kleine Anpassungen vorgenommen.",
        about: "Super Vegetariano serviert seit Februar 1986 hausgemachtes, leckeres und gesundes Essen in Santos. Die Website zeigt die Geschichte des Hauses, die Standorte, das Tagesmenü in den sozialen Medien und den Kontakt per WhatsApp. Sie wurde von einem anderen Team mit WordPress erstellt.",
        work: {
          hosting: {
            intro: "Die Website funktionierte bereits und die Gäste kannten sie. Ziel war es, die Infrastruktur zu wechseln, ohne dass es jemand merkt.",
            decisions: {
              '1': {
                title: "Umzug an einem Tag",
                text: "Dateien, Datenbank und Domain der WordPress-Seite zogen an einem einzigen Tag zum neuen Hosting um, Inhalt und Design blieben erhalten.",
              },
              '2': {
                title: "E-Mail bei KingHost",
                text: "Ich habe die E-Mail-Konten der Domain bei KingHost eingerichtet, damit das Restaurant weiter unter der eigenen Adresse erreichbar ist.",
              },
              '3': {
                title: "Kleine Anpassungen",
                text: "Nach dem Umzug habe ich einzelne Details korrigiert, ohne die Identität zu verändern, die die Gäste kennen.",
              },
            },
          },
        },
        highlights: {
          '1': {
            value: "40",
            label: "Jahre gesundes Essen",
          },
          '2': {
            value: "2",
            label: "Standorte in Santos, Brasilien",
          },
          '3': {
            value: "1 Tag",
            label: "für den kompletten Umzug",
          },
          '4': {
            value: "1986",
            label: "Gründungsjahr",
          },
        },
      },
    },
  },
  scheduling: {
    title: 'Gespräch vereinbaren',
    description:
      'Wählen Sie einen Termin für ein 30-minütiges Gespräch über Ihr Projekt.',
    openCalendar: 'Kalender öffnen',
  },
  games: {
    label: 'Spiele',
    subtitle: 'Eine Sammlung von Spielen, die ich gebaut habe.',
    play: 'Spielen',
    share: "Ergebnis teilen",
    shareCopied: "Link kopiert!",
    time: "Zeit",
    timerHint: "Die Uhr startet mit deinem ersten Zug.",
    moves: "Züge",
    newGame: "Neues Spiel",
    playAgain: "Nochmal spielen",
    level: "Stufe",
    queensDescription:
      'Ein tägliches Logikrätsel, inspiriert vom klassischen N-Damen-Problem.',
    sudokuDescription:
      'Ein Sudoku-Generator mit 4×4-, 6×6- und 9×9-Gittern und einstellbarem Schwierigkeitsgrad.',
    wordLadderDescription:
      'Ein Worträtsel, bei dem du jeweils einen Buchstaben änderst, um ein Wort in ein anderes zu verwandeln, mit täglichen Rätseln und drei Schwierigkeitsgraden.',
  },
  tools: {
    label: 'Tools',
    subtitle: 'Nützliche Tools, die ich gebaut habe.',
    emptyTitle: 'Noch keine Tools verfügbar',
    emptyDescription:
      'Neue Tools sind unterwegs. Schauen Sie bald wieder vorbei!',
  },
  home: {
    title:
      'Profi-Programmierer, der speziell auf <span class="text-foreground-emphasis">Landingpages</span> und <span class="text-foreground-emphasis">autonome Websites</span> spezialisiert ist.',
    description:
      'Ich erstelle schnelle, moderne und optimierte Websites, um Besucher in Kunden zu konvertieren und Ihre Online-Präsenz zu stärken.',
    websiteLikeThis: 'Ich möchte eine Website wie diese',
    whatsappMessage:
      'Hallo! Ich würde gerne ein Angebot für eine Website anfragen.',
    nav: {
      home: 'Start',
      services: 'Services',
      whyMe: 'Warum ich',
      projects: 'Projekte',
      testimonials: 'Referenzen',
      allServices: "Alle Leistungen",
      segments: "Branchen",
      gamesAndTools: "Spiele und Tools",
    },
    services: {
      name: 'Services',

      title:
        'Vollständige Lösungen für professionelle, die sich erweitern wollen',
      description:
        'Strategische Entwicklung, die auf Leistung, Design und Konvertierung fokussiert ist. Alles, was Sie benötigen, um Präsenz, Autorität und Online-Ergebnisse zu haben.',

      landingPages: 'Landingpages',
      landingPagesDescription:
        'Hoch-konvertierende Seiten, um mehr Leads zu erhalten und mehr Geschäfte zu schließen.',

      websitesForFreelancers: 'Websites für Freelancer',
      websitesForFreelancersDescription:
        'Professional-Websites, die Vertrauen und neue Chancen erzeugen.',

      blogsAndPortofolios: 'Blogs und Portfolios',
      blogsAndPortofoliosDescription:
        'Zeigen Sie Ihre Arbeit, teilen Sie Wissen und attraktieren Sie Ihren idealen Publikum.',

      integrations: 'Integrationen',
      integrationsDescription:
        'Formulare, E-Mail-Marketing, WhatsApp, Zahlungen und vieles mehr.',
    },
    whyMe: {
      name: 'WIE KANN ICH MIT DIR ARBEITEN?',
      title: 'Commitment zu Ergebnissen und Aufmerksamkeit an jeder Detail',
      description:
        'Mehr als Code, biete ich Strategie, Kommunikation und einen Partner, um Sie bei Ihren Zielen zu helfen.',
      list: {
        '1Title': 'Klare und direkte Kommunikation',
        '1Subtitle': 'Verfolgung über alle Schritte',
        '2Title': 'Modernes und anpassbares Design',
        '2Subtitle': 'Einzelne Websites, die Ihre Marke darstellen',
        '3Title': 'Fokus auf Performance',
        '3Subtitle': 'Schnelle Websites, die keine Besucher verlieren',
        '4Title': 'Optimiert für Suchmaschinen',
        '4Subtitle': 'Mehr Sichtbarkeit für Ihr Geschäft',
      },
      yoE: '5+ Jahre',
      yoEDescription: 'Entwicklung digitaler Lösungen',
    },
    projects: {
      name: 'Portfolio',
      title: 'Projekte, die Ergebnisse erzielen',
      description:
        'Einige aktuelle Arbeiten für Fachleute und Unternehmen, die meiner Arbeit vertraut haben.',
      viewAll: 'Alle Projekte ansehen',
    },
    testimonials: {
      name: 'Kundenstimmen',
      title: 'Was meine Kunden sagen:',
      previous: 'Vorherige Kundenstimmen',
      next: 'Nächste Kundenstimmen',
      ctaTitle: 'Bereit für eine Website, die echte Ergebnisse bringt?',
      ctaDescription:
        'Lass uns über deine Projekte sprechen und deine Ideen umsetzen.',
      whatsapp: 'Auf WhatsApp sprechen',
      whatsappMessage:
        'Hallo! Ich habe dein Portfolio gesehen und würde gerne über ein Projekt sprechen.',
      requestBudget: 'Angebot anfordern',
      items: {
        '1': {
          text: 'Breno verstand genau, was ich brauchte, und lieferte eine schnelle, schöne Seite, die schon in der ersten Woche qualifizierte Kontakte brachte.',
          name: 'Mariana Alves',
          profession: 'Architektin',
        },
        '2': {
          text: 'Der Prozess war von Anfang bis Ende klar. Endlich habe ich eine professionelle Website, die meine Arbeit erklärt und Vertrauen schafft.',
          name: 'Rafael Costa',
          profession: 'Unternehmensberater',
        },
        '3': {
          text: 'Neben dem Design machte die Sorgfalt bei der Performance einen großen Unterschied. Die Website lädt schnell und funktioniert perfekt mobil.',
          name: 'Camila Torres',
          profession: 'Inhaberin eines Beauty-Studios',
        },
        '4': {
          text: 'Er verwandelte eine lose Idee in einen klaren digitalen Auftritt. Die Kommunikation war einfach und das Ergebnis passt zu meiner Marke.',
          name: 'Lucas Mendes',
          profession: 'Personal Trainer',
        },
      },
    },
    footer: {
      ctaTitle: 'Lassen Sie uns gemeinsam etwas Großartiges schaffen?',
      ctaSubtitle:
        'Ich bin bereit, Ihre Idee in eine professionelle, schnelle Website zu verwandeln, die echte Ergebnisse bringt.',
      cards: {
        closeService: {
          title: 'Persönliche Betreuung',
          subtitle: 'Fokus auf Ihr Projekt',
        },
        transparentProcess: {
          title: 'Transparenter Prozess',
          subtitle: 'Sie verfolgen jeden Schritt',
        },
        properSupport: {
          title: 'Passender Support',
          subtitle: 'Ich passe es an Sie an',
        },
      },
      brandSubtitle:
        'Freelance-Programmierer, spezialisiert auf Websites, die Ergebnisse für Selbstständige und kleine Unternehmen erzielen.',
      navigation: 'Navigation',
      services: 'Services',
      letsTalk: 'Sprechen wir?',
      downloadCurriculum: 'Lebenslauf herunterladen',
      rights: 'Alle Rechte vorbehalten.',
    },
    estimateBudget: 'Angebot anfordern',
  },
  servicesPage: {
    common: {
      backHome: 'Zurück zur Startseite',
      backToServices: 'Alle Services',
      otherServices: 'Weitere Services entdecken',
      requestBudget: 'Angebot anfordern',
      ready: 'Bereit zu starten?',
      whatsappMessage:
        'Hallo! Ich habe dein Portfolio gesehen und möchte über ein Projekt sprechen.',
    },
    index: {
      title: 'Services',
      subtitle:
        'Strategische Entwicklung mit Fokus auf Performance, Design und Conversion.',
      description:
        'Alles, was du brauchst, um online Präsenz, Autorität und echte Ergebnisse zu haben. Jeder Service löst ein bestimmtes Problem — schnell, modern und für Suchmaschinen optimiert.',
      viewAll: 'Mehr erfahren',
      ctaTitle: 'Du weißt nicht, welcher Service zu dir passt?',
      ctaSubtitle:
        'Schreib mir eine Nachricht und ich helfe dir, den besten Weg für dein Projekt zu wählen.',
    },
    landingPages: {
      proofTitle: "Projekte, die bereits online sind",
      formTitle: "Angebot anfordern",
      formSubtitle: "Nur zwei Felder. Das Gespräch geht auf WhatsApp weiter.",
      formName: "Dein Name",
      formOffer: "Was möchtest du verkaufen oder bewerben?",
      formOfferPlaceholder: "Z. B. ein Kurs, eine Beratung, ein Launch",
      messageIntro: "Hallo Breno! Ich möchte eine Landingpage.",
      messageName: "Name",
      messageOffer: "Angebot",
      anatomyTitle: 'Anatomie einer Seite, die konvertiert',
      anatomySubtitle: 'Jeder Block hat eine Aufgabe. So bringt jeder Teil Ihrer Landingpage den Besucher zum Handeln.',
      anatomy: {
        '1': {
          title: 'Überschrift',
          text: 'Ein klares Versprechen, das dem Besucher in Sekunden sagt, was er bekommt und warum es wichtig ist.',
        },
        '2': {
          title: 'Social Proof',
          text: 'Bewertungen, Logos und Zahlen, die zeigen, dass andere Ihnen bereits vertrauen.',
        },
        '3': {
          title: 'Angebot und Vorteile',
          text: 'Was enthalten ist – als Ergebnis für den Kunden dargestellt, nicht als Liste von Funktionen.',
        },
        '4': {
          title: 'Formular',
          text: 'Nur die Felder, die wirklich nötig sind, damit das Ausfüllen mühelos ist.',
        },
        '5': {
          title: 'Call to Action',
          text: 'Eine einzige Aktion, an den richtigen Stellen wiederholt, mit einem Button, den man nicht übersehen kann.',
        },
      },
      timeline: {
        '1': 'Tag 1',
        '2': 'Tag 2–3',
        '3': 'Tag 3–6',
        '4': 'Ab Tag 7',
      },
      name: 'Landing Pages',
      shortDescription:
        'Konversionsstarke Seiten, die Besucher in Leads und Verkäufe verwandeln.',
      tagline: 'Seiten mit Fokus auf Conversion',
      heroTitle: 'Landing Pages, die Besucher in Kunden verwandeln',
      intro:
        'Eine Landing Page ist eine fokussierte Seite mit einem einzigen Ziel: den Besucher zu einer klaren Handlung zu führen — kaufen, registrieren, buchen oder ein Angebot anfordern. Anders als eine vollständige Website beseitigt sie Ablenkungen und bündelt die gesamte Energie auf die Conversion.',
      introP2:
        'Jedes Element — Überschrift, Text, Bilder, Formular und Call-to-Action — wird entworfen und getestet, um den Besucher auf seiner Reise voranzubringen. Das Ergebnis ist eine Seite, die wie ein Verkäufer funktioniert, der niemals schläft.',
      benefitsTitle: 'Warum in eine Landing Page investieren',
      benefits: {
        '1': {
          title: 'Mehr Leads',
          text: 'Ein klarer Call-to-Action und ein optimiertes Formular gewinnen mit demselben Traffic mehr Kontakte.',
        },
        '2': {
          title: 'Bessere Conversion-Rate',
          text: 'Fokussierte Texte und Layout erhöhen den Anteil der Besucher, die wirklich handeln.',
        },
        '3': {
          title: 'Schnellere Ergebnisse',
          text: 'Eine einzelne Seite geht in Tagen live, nicht in Monaten — und du kannst sofort testen.',
        },
        '4': {
          title: 'Messbare Performance',
          text: 'Jeder Klick, jede Ansicht und jeder Versand wird getrackt, damit du genau weißt, was funktioniert.',
        },
      },
      detailsTitle: 'Was ich in jede Landing Page einbringe',
      details: {
        '1': {
          title: 'Strategie vor Pixels',
          text: 'Wir beginnen mit deinem Angebot, deiner Zielgruppe und der einen gewünschten Handlung. Struktur, Text und Design entstehen rund um dieses Ziel — nicht rund um das, was nur hübsch aussieht.',
        },
        '2': {
          title: 'Copywriting, das verkauft',
          text: 'Überschriften, Unterüberschriften, Bulletpoints und Call-to-Actions sind darauf ausgelegt, zu überzeugen. Ich nutze bewährte Muster, um den Besucher von Aufmerksamkeit zu Handlung zu führen.',
        },
        '3': {
          title: 'Geschwindigkeit, SEO und Mobile',
          text: 'Seiten laden in unter einer Sekunde, folgen den SEO-Best-Practices und sehen auf jedem Gerät perfekt aus — denn der meiste Traffic kommt vom Handy.',
        },
      },
      processTitle: 'So läuft der Prozess ab',
      process: {
        '1': {
          title: 'Kennenlerngespräch',
          text: 'Wir sprechen über dein Business, deine Zielgruppe und deine Ziele. Ich lege das Angebot und die Kernbotschaft fest.',
        },
        '2': {
          title: 'Design',
          text: 'Du erhältst vor dem Codieren einen visuellen Entwurf der Seite zur Freigabe.',
        },
        '3': {
          title: 'Entwicklung',
          text: 'Die Seite wird schnell, responsiv und konversionsoptimiert gebaut.',
        },
        '4': {
          title: 'Launch und Verbesserungen',
          text: 'Wir gehen live, verfolgen die Ergebnisse und verfeinern die Seite, um die Performance zu steigern.',
        },
      },
      faqTitle: 'Häufige Fragen',
      faqs: {
        '1': {
          q: 'Wie lange dauert es?',
          a: 'Eine typische Landing Page dauert 3 bis 7 Tage, je nach Umfang und Inhalt.',
        },
        '2': {
          q: 'Muss ich den Inhalt schreiben?',
          a: 'Ich kann den Text für dich schreiben oder auf deinem vorhandenen Material aufbauen. Du gibst alles vor dem Launch frei.',
        },
        '3': {
          q: 'Kann ich sie später ändern?',
          a: 'Ja. Die Seite ist einfach zu bearbeiten und ich biete nach dem Launch Support an.',
        },
      },
      ctaTitle: 'Bereit, Traffic in Kunden zu verwandeln?',
      ctaSubtitle: 'Lass uns eine Landing Page bauen, die sich selbst bezahlt.',
    },
    websitesForFreelancers: {
      compareTitle: 'Nur Social Media vs. eigene Website',
      compareWithoutTitle: 'Nur Social Media',
      compareWithTitle: 'Mit eigener Website',
      compareWithout: {
        '1': 'Ihre Reichweite hängt vom Algorithmus ab',
        '2': 'Infos zu Ihren Leistungen sind über viele Beiträge verstreut',
        '3': 'Kunden müssen Ihnen schreiben, um das Grundlegende zu erfragen',
        '4': 'Ihr Profil kann jederzeit eingeschränkt werden oder verloren gehen',
      },
      compareWith: {
        '1': 'Kunden finden Sie bei Google, wenn sie nach Ihrer Leistung suchen',
        '2': 'Leistungen, Preise und Ablauf an einem Ort erklärt',
        '3': 'Fragen beantwortet, bevor die erste Nachricht kommt',
        '4': 'Eine Adresse, die dauerhaft Ihnen gehört',
      },
      pagesTitle: 'Seiten, die Ihre Website haben kann',
      pagesSubtitle: 'Eine einfache Struktur, die beantwortet, was jeder potenzielle Kunde wissen will.',
      pages: {
        '1': {
          title: 'Startseite',
          text: 'Wer Sie sind, was Sie tun und wie man Sie beauftragt – auf einen Blick.',
        },
        '2': {
          title: 'Leistungen',
          text: 'Jede Leistung erklärt, mit Umfang und Ablauf.',
        },
        '3': {
          title: 'Über mich',
          text: 'Ihre Geschichte, Ihre Erfahrung und Ihre Arbeitsweise.',
        },
        '4': {
          title: 'Portfolio',
          text: 'Echte Projekte und Ergebnisse, die Ihr Können belegen.',
        },
        '5': {
          title: 'Kontakt',
          text: 'WhatsApp, Formular und Terminbuchung – nur einen Klick entfernt.',
        },
      },
      name: 'Websites für Freelancer',
      shortDescription:
        'Professionelle Websites, die Vertrauen aufbauen und dir mehr Kunden sichern.',
      tagline: 'Deine digitale Visitenkarte',
      heroTitle: 'Eine professionelle Website, die dir Kunden sichert',
      intro:
        'Als Freelancer ist deine Website oft der erste Eindruck bei einem potenziellen Kunden. Eine professionelle Site tut mehr als nur gut aussehen — sie erklärt, was du tust, beweist deine Arbeit und macht es einfach, dich zu engagieren.',
      introP2:
        'Die meisten Freelancer verlassen sich auf Instagram oder Mundpropaganda. Eine Website gibt dir einen zentralen, glaubwürdigen Ort, zu dem du Menschen schicken kannst — und sie arbeitet weiter, während du schläfst, beantwortet Fragen und erzeugt Chancen.',
      benefitsTitle: 'Was eine Website für dich tut',
      benefits: {
        '1': {
          title: 'Glaubwürdigkeit',
          text: 'Eine professionelle Website lässt dich etabliert und vertrauenswürdig wirken.',
        },
        '2': {
          title: 'Leads im Autopilot',
          text: 'Besucher finden dich, verstehen deinen Wert und kontaktieren dich — auch außerhalb der Geschäftszeiten.',
        },
        '3': {
          title: 'Ein Portfolio, das verkauft',
          text: 'Zeige deine besten Arbeiten mit Fallstudien, die neue Kunden überzeugen.',
        },
        '4': {
          title: 'Eigene Zielgruppe',
          text: 'Hör auf, von sozialen Plattformen abzuhängen. Deine Website, deine Regeln, deine Daten.',
        },
      },
      detailsTitle: 'Was ich liefere',
      details: {
        '1': {
          title: 'Klares Positioning',
          text: 'Wir definieren, was dich unterscheidet, und setzen es ins Zentrum jeder Seite.',
        },
        '2': {
          title: 'Services und Preise',
          text: 'Klare Seiten zu deinen Leistungen, deinem Prozess und deinen Preisen reduzieren Reibung und ziehen bessere Kunden an.',
        },
        '3': {
          title: 'Kontakt und Buchung',
          text: 'WhatsApp-Buttons, Kontaktformulare und Terminbuchung, damit Kunden dich mit einem Klick erreichen.',
        },
      },
      processTitle: 'So läuft der Prozess ab',
      process: {
        '1': {
          title: 'Kennenlernen',
          text: 'Wir erfassen deine Leistungen, Zielgruppe und Ziele in einem kurzen Gespräch.',
        },
        '2': {
          title: 'Design',
          text: 'Du gibst Look und Struktur frei, bevor eine Zeile Code entsteht.',
        },
        '3': {
          title: 'Entwicklung',
          text: 'Deine Website wird schnell, responsiv und suchmaschinenbereit gebaut.',
        },
        '4': {
          title: 'Launch',
          text: 'Wir veröffentlichen, verbinden deine Domain und machen die Seite leicht pflegbar.',
        },
      },
      faqTitle: 'Häufige Fragen',
      faqs: {
        '1': {
          q: 'Brauche ich eine Website, wenn ich schon Instagram habe?',
          a: 'Instagram hilft bei der Sichtbarkeit, aber eine Website bringt dir Glaubwürdigkeit, Kontrolle und bessere Conversion. Beides funktioniert zusammen am besten.',
        },
        '2': {
          q: 'Kannst du das Design meines Konkurrenten kopieren?',
          a: 'Ich erstelle ein einzigartiges Design für deine Marke. Kopieren schadet deiner Glaubwürdigkeit und deinem SEO.',
        },
        '3': {
          q: 'Hilfst du bei Domain und Hosting?',
          a: 'Ja, ich übernehme die gesamte technische Einrichtung, damit du dich nur auf deine Arbeit konzentrierst.',
        },
      },
      ctaTitle: 'Lass uns deine professionelle Präsenz aufbauen',
      ctaSubtitle: 'Schreib mir und wir planen deine Website.',
    },
    blogsAndPortfolios: {
      splitTitle: 'Zwei Formate, ein Ziel: in Erinnerung bleiben',
      portfolio: {
        title: 'Portfolio',
        text: 'Wenn Ihre Arbeit für sich spricht und im besten Licht gezeigt werden soll.',
        items: {
          '1': 'Projektseiten mit Bildern, Kontext und Ergebnissen',
          '2': 'Filter nach Kategorie oder Art der Arbeit',
          '3': 'Kundenstimmen direkt bei jedem Projekt',
        },
      },
      blog: {
        title: 'Blog',
        text: 'Wenn Ihr Wissen der Unterschied ist und Sie in Suchmaschinen gefunden werden wollen.',
        items: {
          '1': 'Artikel nach Kategorien und Tags geordnet',
          '2': 'SEO-fertige Struktur für jeden Beitrag',
          '3': 'Newsletter-Anmeldung, um Leser an sich zu binden',
        },
      },
      chapter: 'Kapitel',
      name: 'Blogs und Portfolios',
      shortDescription:
        'Zeige deine Arbeit, teile Wissen und ziehe deine ideale Zielgruppe an.',
      tagline: 'Inhalt und Bühne, zusammen',
      heroTitle: 'Ein Ort, um deine Arbeit zu zeigen und Wissen zu teilen',
      intro:
        'Ein Portfolio oder Blog ist mehr als eine Sammlung von Projekten oder Artikeln — es ist ein Werkzeug, das für dich arbeitet. Es zieht Menschen an, die sich für dein Tun interessieren, baut Autorität auf und macht aus Lesern Kunden.',
      introP2:
        'Ich entwerfe und baue Seiten, auf denen deine Arbeit glänzt: schnell, schön, leicht zu pflegen und so strukturiert, dass Suchmaschinen dich finden.',
      benefitsTitle: 'Warum einen Blog oder ein Portfolio haben',
      benefits: {
        '1': {
          title: 'Autorität',
          text: 'Konsistente, hochwertige Inhalte positionieren dich als Referenz in deinem Bereich.',
        },
        '2': {
          title: 'Inbound-Traffic',
          text: 'Suchmaschinenoptimierte Artikel ziehen Besucher an, die bereits nach deinen Leistungen suchen.',
        },
        '3': {
          title: 'Zeigen statt erzählen',
          text: 'Ein gut strukturiertes Portfolio beweist dein Können besser als jede Präsentation.',
        },
        '4': {
          title: 'Einfache Updates',
          text: 'Ein Projekt oder einen Beitrag hinzufügen dauert Minuten, nicht einen Entwickler.',
        },
      },
      detailsTitle: 'Was ich liefere',
      details: {
        '1': {
          title: 'Schöne Vitrinen',
          text: 'Projekte präsentiert mit Bildern, Beschreibungen und Ergebnissen — gemacht, um Kunden und Partner zu beeindrucken.',
        },
        '2': {
          title: 'Ein Blog, der wächst',
          text: 'Eine redaktionelle Struktur mit Kategorien, Tags und SEO-Grundlagen, damit jeder Beitrag für dich arbeitet.',
        },
        '3': {
          title: 'Gebaut für Pflege',
          text: 'Einfache Bearbeitung, damit du deine Inhalte selbst besitzt und für kleine Änderungen nie von einem Entwickler abhängst.',
        },
      },
      processTitle: 'So läuft der Prozess ab',
      process: {
        '1': {
          title: 'Ziele',
          text: 'Wir definieren, was du anziehen willst: Kunden, Leser oder beides.',
        },
        '2': {
          title: 'Struktur',
          text: 'Ich lege die Abschnitte, Kategorien und Seiten fest, die zu deinen Inhalten passen.',
        },
        '3': {
          title: 'Design und Bau',
          text: 'Deine Seite entsteht mit Blick auf deinen Stil und deine Zielgruppe.',
        },
        '4': {
          title: 'Schulung',
          text: 'Du lernst, Inhalte selbst zu veröffentlichen und zu bearbeiten — ganz ohne Code.',
        },
      },
      faqTitle: 'Häufige Fragen',
      faqs: {
        '1': {
          q: 'Muss ich schreiben können?',
          a: 'Nein. Ich helfe dir, deine Ideen zu strukturieren, und du kannst mich auch mit den ersten Artikeln beauftragen.',
        },
        '2': {
          q: 'Kann ich selbst aktualisieren?',
          a: 'Ja. Die Website ist so gebaut, dass du Projekte und Beiträge ohne eine Zeile Code hinzufügen kannst.',
        },
        '3': {
          q: 'Schreibst du auch die Inhalte?',
          a: 'Ja, ich kann die Texte für dein Portfolio und die ersten Blogbeiträge erstellen.',
        },
      },
      ctaTitle: 'Deine Arbeit verdient eine Bühne',
      ctaSubtitle: 'Lass uns ein Portfolio schaffen, das dir Chancen bringt.',
    },
    integrations: {
      hubCenter: 'Ihre Website',
      tools: {
        '1': 'WhatsApp',
        '2': 'E-Mail',
        '3': 'CRM',
        '4': 'Zahlungen',
        '5': 'Tabellen',
        '6': 'Analytics',
      },
      flowTitle: 'So sieht das in der Praxis aus',
      flowSubtitle: 'Ein einziges abgeschicktes Formular kann alles auslösen, was früher von Hand erledigt wurde.',
      flow: {
        '1': {
          label: 'Auslöser',
          title: 'Ein Besucher füllt das Formular aus',
          text: 'Name, Kontakt und Anliegen werden auf Ihrer Website erfasst.',
        },
        '2': {
          label: 'Automatisierung',
          title: 'Die Daten landen, wo sie hingehören',
          text: 'Der Lead wird in Ihrem CRM oder Ihrer Tabelle gespeichert und Sie erhalten eine Benachrichtigung per WhatsApp.',
        },
        '3': {
          label: 'Ergebnis',
          title: 'Sie antworten innerhalb von Minuten',
          text: 'Der Besucher erhält eine Bestätigungs-E-Mail und Sie melden sich, solange das Interesse groß ist.',
        },
      },
      name: 'Integrationen',
      shortDescription:
        'Formulare, E-Mail-Marketing, WhatsApp, Zahlungen und vieles mehr.',
      tagline: 'Lass alles zusammenarbeiten',
      heroTitle:
        'Integrationen, die deine Website mit deinem Business verbinden',
      intro:
        'Eine schöne Website ist nur ein Teil der Gleichung. Für echte Ergebnisse muss sie mit den Tools sprechen, die du bereits nutzt: E-Mail, CRM, Zahlungen, Benachrichtigungen und mehr. Genau dafür sind Integrationen da.',
      introP2:
        'Ich verbinde deine Website mit den Diensten, die dein Business antreiben — automatisiert Arbeit, reduziert Fehler und stellt sicher, dass kein Lead verloren geht.',
      benefitsTitle: 'Warum Systeme integrieren',
      benefits: {
        '1': {
          title: 'Schluss mit manueller Arbeit',
          text: 'Daten fließen automatisch zwischen deiner Website und deinen Tools.',
        },
        '2': {
          title: 'Keine verlorenen Leads',
          text: 'Jede Formularübermittlung erreicht sofort den richtigen Ort.',
        },
        '3': {
          title: 'Automatisiertes Follow-up',
          text: 'E-Mails und Nachrichten werden durch Besucheraktivitäten automatisch ausgelöst.',
        },
        '4': {
          title: 'Daten an einem Ort',
          text: 'Alles, was du brauchst, synchronisiert in deinem CRM, deiner Tabelle oder deinem Dashboard.',
        },
      },
      detailsTitle: 'Was ich verbinden kann',
      details: {
        '1': {
          title: 'Formulare und E-Mail-Marketing',
          text: 'Kontaktformulare, die deine E-Mail-Liste, Automatisierungen und Sequenzen speisen.',
        },
        '2': {
          title: 'WhatsApp und Benachrichtigungen',
          text: 'Sofortige Alerts, damit du nie einen Lead verpasst — per WhatsApp, E-Mail oder Telegram.',
        },
        '3': {
          title: 'Zahlungen und Analytics',
          text: 'Checkout, Zahlungslinks, Pixel-Tracking und Analytics für deine Kampagnen.',
        },
      },
      processTitle: 'So läuft der Prozess ab',
      process: {
        '1': {
          title: 'Audit',
          text: 'Wir listen deine Tools auf und was miteinander kommunizieren muss.',
        },
        '2': {
          title: 'Plan',
          text: 'Ich schlage die einfachste Architektur vor, die dein Problem löst.',
        },
        '3': {
          title: 'Umsetzung',
          text: 'Die Integrationen werden implementiert und durchgehend getestet.',
        },
        '4': {
          title: 'Support',
          text: 'Du erhältst Dokumentation und Support für alles, was geliefert wurde.',
        },
      },
      faqTitle: 'Häufige Fragen',
      faqs: {
        '1': {
          q: 'Welche Tools unterstützt du?',
          a: 'Die gängigsten: Google Sheets, Mailchimp, WhatsApp, Stripe, Mercado Pago, Telegram und mehr.',
        },
        '2': {
          q: 'Kannst du Tools integrieren, die ich schon nutze?',
          a: 'Ja. Ich arbeite mit dem, was du bereits hast, und vermeide unnötige Kosten.',
        },
        '3': {
          q: 'Ist es sicher?',
          a: 'Ja. Ich folge den Sicherheits-Best-Practices und speichere sensible Daten nur bei echtem Bedarf.',
        },
      },
      ctaTitle: 'Lass uns deine Systeme verbinden',
      ctaSubtitle: 'Sag mir, was du nutzt, und ich bringe alles zum Reden.',
    },
  },
  queens: {
    queens: 'Damen',
    level: 'Stufe',
    'level-1': 'Anfänger',
    'level-2': 'Leicht',
    'level-3': 'Mittel',
    'level-4': 'Schwer',
    'level-5': 'Experte',
    hint: 'Hinweis',
    congratulations: 'Glückwunsch! Puzzle gelöst!',
    'check-errors': 'Regelverstöße prüfen',
    loading: 'Lädt...',
    'how-to-play': 'Spielanleitung',
    'rule-row': 'Platziere genau eine Dame in jeder Zeile.',
    'rule-col': 'Platziere genau eine Dame in jeder Spalte.',
    'rule-region': 'Platziere genau eine Dame in jeder farbigen Region.',
    'rule-adjacent':
      'Keine zwei Damen dürfen sich berühren, auch nicht diagonal.',
    'tip-tap': 'Tippe oder klicke ein Feld einmal für ✕, noch einmal für ♛ und ein weiteres Mal, um es zu leeren.',
    'tip-x': 'Ziehe Finger oder Maus über die Felder, um sie in einem Zug alle mit ✕ zu markieren. Beginnst du auf einem ✕, werden Markierungen gelöscht. Damen bleiben dabei unberührt.',
    'tip-slide': 'Schalte Auto ✕ ein, um die Felder zu sehen, die jede Dame ausschließt. Mit der Tastatur: Pfeiltasten und Leertaste.',
    'faq-title': 'Häufig gestellte Fragen',
    'faq-q1': 'Was ist das Damen-Spiel?',
    'faq-a1':
      'Damen ist ein Logikpuzzle, bei dem du Damen so auf dem Brett platzierst, dass jede Zeile, Spalte und farbige Region genau eine Dame enthält und sich keine zwei Damen berühren.',
    'faq-q2': 'Wie spielt man?',
    'faq-a2': 'Tippe auf ein Feld, um zwischen ✕-Markierung → Dame ♛ → leer zu wechseln, oder ziehe über das Brett, um viele Felder auf einmal mit ✕ zu markieren. Regelverstöße werden rot hervorgehoben und jeder Zug lässt sich rückgängig machen.',
    'faq-q3': 'Was passiert bei einem Fehler?',
    'faq-a3':
      'Konflikte werden rot markiert. Überprüfe und korrigiere, bis alle Regeln erfüllt sind. Es gibt keine Zugbegrenzung!',
    'faq-q4': 'Gibt es jeden Tag ein neues Puzzle?',
    'faq-a4': 'Ja! Das tägliche Brett wird aus dem Datum erzeugt, sodass alle jeden Tag dieselbe Aufgabe bekommen. Wähle Zufällig oder Neues Spiel für unbegrenzt viele weitere Bretter und teile am Ende deine Zeit.',
    'seo-title': 'Spiele Damen — Tägliches Logikpuzzle',
    'seo-p1':
      'Damen ist ein tägliches Logikpuzzle, inspiriert vom klassischen N-Damen-Problem. Platziere Damen auf dem Brett nach vier einfachen Regeln: eine pro Zeile, eine pro Spalte, eine pro farbiger Region, und keine Dame darf eine andere berühren.',
    'seo-p2':
      'Wähle aus 5 Schwierigkeitsstufen — Anfänger (5×5), Leicht (6×6), Mittel (7×7), Schwer (8×8) und Experte (10×10). Jedes Puzzle wird deterministisch aus dem Datum generiert.',
    'seo-p3':
      'Spiele online kostenlos, ohne Registrierung. Trainiere dein logisches Denken und deine Mustererkennung. Ein brandneues Puzzle wartet jeden Tag auf dich!',
    mode: 'Rätsel',
    'mode-daily': 'Täglich',
    'mode-random': 'Zufällig',
    undo: 'Rückgängig',
    clear: 'Leeren',
    'auto-x': 'Auto ✕',
    'auto-x-title': 'Felder, die deine Damen ausschließen, automatisch mit ✕ zeigen',
    'hints-left': 'Tipps übrig',
    'hints-used': 'Tipps',
    'tip-short': 'Tippen: ✕ → ♛ → leer. Ziehen markiert viele ✕.',
    'solved-summary': 'Gelöst in',
    'share-text': '👑 Ich habe Queens ({puzzle}) in ⏱ {time} mit 💡 {hints} Tipps gelöst!',
    'cell-label': 'Zeile {row}, Spalte {col}',
    'cell-queen': 'Dame',
    'cell-x': 'mit ✕ markiert',
    'cell-empty': 'leer',
    'board-label': 'Queens-Brett. Pfeiltasten bewegen, Leertaste oder Enter wechselt ✕ / Dame, Entf leert.',
    undone: 'Zug rückgängig gemacht.',
  },
  sudoku: {
    sudoku: 'Sudoku',
    size: 'Raster',
    'size-4': '4×4 Mini',
    'size-6': '6×6',
    'size-9': '9×9 Klassisch',
    difficulty: 'Schwierigkeit',
    'difficulty-0': 'Leicht',
    'difficulty-1': 'Mittel',
    'difficulty-2': 'Schwer',
    notes: 'Notizen',
    eraser: 'Löschen',
    undo: 'Rückgängig',
    hint: 'Hinweis',
    mistakes: 'Fehler',
    congratulations: 'Glückwunsch! Puzzle gelöst!',
    loading: 'Lädt...',
    'keyboard-hint':
      'Tipp: Nutze die Pfeiltasten zum Navigieren im Raster, die Zahlen zum Ausfüllen, N zum Umschalten der Notizen und Entf zum Löschen.',
    'how-to-play': 'Spielanleitung',
    'rule-1': 'Jede Zeile muss jede Zahl von 1 bis N genau einmal enthalten.',
    'rule-2': 'Jede Spalte muss jede Zahl von 1 bis N genau einmal enthalten.',
    'rule-3':
      'Jeder fett umrandete Block muss jede Zahl von 1 bis N genau einmal enthalten.',
    'tip-1':
      'Beginne mit den Blöcken, die bereits die meisten Zahlen haben, und suche in jeder Zeile, Spalte und jedem Block nach Zellen mit nur einer möglichen Zahl.',
    'tip-2':
      'Nutze Notizen, um mögliche Zahlen zu markieren. Sie erscheinen als kleine Ziffern und helfen dir, die Möglichkeiten im Blick zu behalten.',
    'tip-3':
      'Spiele mit Maus, Touchscreen oder Tastatur. Zahlen, die sich in derselben Zeile, Spalte oder demselben Block wiederholen, werden rot markiert.',
    'strategy-title': 'Tipps und Strategien',
    'strategy-p1':
      'Suche nach eindeutigen Kandidaten: Wenn nur eine Zahl in eine Zelle passt, trage sie sofort ein. Das ist die wichtigste Technik für Anfänger.',
    'strategy-p2':
      'Analysiere Zeilen, Spalten und Blöcke auf fehlende Zahlen. Steht eine Zahl bereits in zwei Blöcken einer Zeile, verrät der dritte Block oft eine freie Zelle.',
    'strategy-p3':
      'Nutze Bleistift-Markierungen. Notiere alle möglichen Zahlen in jeder Zelle und streiche sie beim Lösen eine nach der anderen. So werden schwere Puzzles überschaubar.',
    'strategy-p4':
      'Übe ein wenig jeden Tag. Regelmäßiges Sudoku-Spielen verbessert Konzentration, Mustererkennung und Kurzzeitgedächtnis — und es entspannt wirklich.',
    'faq-title': 'Häufig gestellte Fragen',
    'faq-q1': 'Was ist Sudoku?',
    'faq-a1':
      'Sudoku ist ein Logikrätsel auf Zahlenbasis. Ziel ist es, das Raster so auszufüllen, dass jede Zeile, Spalte und jeder Block jede Zahl von 1 bis N genau einmal enthält. Es braucht keine Mathematik — nur Logik.',
    'faq-q2': 'Wie spielt man Sudoku?',
    'faq-a2':
      'Wähle die Rastergröße (4×4, 6×6 oder 9×9), stelle die Schwierigkeit ein und tippe auf eine Zelle, um sie auszuwählen. Gib dann eine Zahl über die Bildschirmtastatur oder die Tastatur ein. Jedes Puzzle hat genau eine Lösung.',
    'faq-q3': 'Was bedeuten die Rastergrößen?',
    'faq-a3':
      '4×4 ist ein Mini-Sudoku, perfekt für Anfänger und Kinder, 6×6 ist eine kompakte Herausforderung und 9×9 ist das klassische Sudoku, das weltweit gespielt wird. Jede Größe verwendet die Zahlen von 1 bis N.',
    'faq-q4': 'Ist Sudoku gut für das Gehirn?',
    'faq-a4':
      'Ja. Sudoku trainiert logisches Denken, Konzentration und Gedächtnis, und Studien legen nahe, dass regelmäßiges Rätsellösen den Geist fit hält. Es ist auch eine ruhige, produktive Pause von den sozialen Medien.',
    'faq-q5': 'Ist dieses Sudoku wirklich kostenlos?',
    'faq-a5':
      'Ja, 100 % kostenlos. Ohne Registrierung, ohne Downloads und ohne Zeitlimit. Du kannst Sudoku direkt im Browser auf jedem Gerät online spielen.',
    'seo-title':
      'Sudoku Online Spielen — Kostenloser Mini-Sudoku-Generator',
    'seo-p1':
      'Willkommen bei unserem kostenlosen Sudoku-Generator. Spiele Sudoku online im Browser mit drei Rastergrößen — 4×4 Mini, 6×6 und das klassische 9×9 — und drei Schwierigkeitsgraden, vom leichten Aufwärmen bis zur harten Herausforderung.',
    'seo-p2':
      'Jedes Spiel wird sofort mit einer eindeutigen Lösung generiert, sodass du immer ein faires und lösbares Puzzle erhältst. Wähle dein Lieblingsraster, stelle die Schwierigkeit ein und klicke auf Neues Spiel — in einer Sekunde ist ein frisches Brett da.',
    'seo-p3':
      'Sudoku ist eines der beliebtesten Logikrätsel der Welt. Es trainiert das Denken, schärft die Konzentration und ist perfekt für eine kurze Pause. Und das Beste: Unser Sudoku funktioniert auf Handy, Tablet und Computer, ohne etwas zu installieren.',
    'seo-p4':
      'Ob du Kindern mit einem 4×4-Miniraster etwas beibringen, dich mit einem leichten 6×6 aufwärmen oder mit einem schweren 9×9 testen möchtest — hier kannst du jederzeit Sudoku online spielen. Notizen, Hinweise, Rückgängig, Tastaturkürzel und Fehlermarkierung machen jede Partie einfach genießbar.',
    'seo-p5':
      'Setze ein Lesezeichen und komm wieder, wann immer du ein mentales Training brauchst. Spiele kostenlos Sudoku online, verbessere deine Logik und hab Spaß — ein Raster nach dem anderen.',
    'hints-left': 'Tipps übrig',
    'hints-used': 'Tipps',
    'notes-on': 'Notizen an: Zahlen werden als Bleistiftnotizen eingetragen.',
    'select-first': 'Wähle zuerst ein Feld.',
    'given-cell': 'Diese Zahl ist Teil des Rätsels.',
    empty: 'leer',
    'cell-label': 'Zeile {row}, Spalte {col}',
    'board-label': 'Sudoku-Gitter. Pfeiltasten bewegen, Zifferntasten füllen, N schaltet Notizen, Entf löscht.',
    'share-text': '🧩 Ich habe ein {size}-Sudoku ({level}) in ⏱ {time} mit {mistakes} Fehlern und 💡 {hints} Tipps gelöst!',
  },
  wordLadder: {
    name: 'Wortleiter',
    home: 'Startseite',
    intro:
      'Ändere jeweils einen Buchstaben, um das Startwort in das Zielwort zu verwandeln. Jeder Schritt muss ein echtes englisches Wort sein. Spiele kostenlos im Browser, mit täglichen Rätseln und drei Schwierigkeitsgraden.',
    mode: 'Modus',
    'mode-classic': 'Klassisch',
    'mode-daily': 'Täglich',
    difficulty: 'Schwierigkeit',
    'difficulty-easy': 'Leicht',
    'difficulty-medium': 'Mittel',
    'difficulty-hard': 'Schwer',
    'daily-today': 'Die Wortleiter von heute',
    moves: 'Züge',
    best: 'Rekord',
    target: 'Ziel',
    'daily-done':
      'Du hast das Rätsel von heute schon gelöst. Komm morgen für ein neues wieder!',
    start: 'Start',
    'your-move': 'Dein nächstes Wort',
    'input-placeholder': 'WORT',
    submit: 'OK',
    hint: 'Hinweis',
    undo: 'Rückgängig',
    'err-empty': 'Gib zuerst ein Wort ein.',
    'err-length': 'Das Wort muss dieselbe Länge wie das Startwort haben.',
    'err-dictionary':
      'Das Wort ist nicht in unserem Wörterbuch. Versuch ein anderes.',
    'err-one-letter': 'Ändere genau einen Buchstaben.',
    'hint-text':
      'Denke an ein Wort, das einen Buchstaben von deinem aktuellen Wort entfernt ist.',
    'hint-1': 'Dein nächstes Wort beginnt mit {letter}.',
    'hint-2': 'Versuche, den Buchstaben an Position {position} zu ändern.',
    'hint-3': 'Ein mögliches nächstes Wort ist {word}.',
    'live-move': 'Du bist jetzt bei {word}.',
    'live-undo': 'Zug rückgängig gemacht.',
    complete: 'Wortleiter geschafft!',
    'result-moves':
      'Du hast das Startwort in das Zielwort verwandelt. Großartig!',
    'daily-streak': 'Tägliche Serie:',
    'next-puzzle': 'Nächstes Rätsel',
    'how-to-play': 'So spielst du Wortleiter',
    'rule-1': 'Beginne mit dem blauen Wort oben auf der Leiter.',
    'rule-2':
      'Gib ein neues Wort ein, das sich von deinem aktuellen Wort um genau einen Buchstaben unterscheidet.',
    'rule-3': 'Jedes eingegebene Wort muss ein echtes englisches Wort sein.',
    'rule-4':
      'Mache Schritt für Schritt weiter, bis du das bernsteinfarbene Zielwort erreichst.',
    'rule-5':
      'Versuche, in so wenigen Zügen wie möglich zu enden, um deinen Rekord zu schlagen.',
    'rules-title': 'Offizielle Wortleiter-Regeln',
    'rules-p1':
      'Eine Wortleiter ist gelöst, wenn du das Startwort mithilfe echter Wörter in das Zielwort verwandelst und dabei bei jedem Schritt genau einen Buchstaben änderst. Zum Beispiel CAT → COT → COG → DOG.',
    'rules-p2':
      'Du kannst die Position des Buchstabens und seinen Wert ändern, aber pro Zug darf sich nur ein Buchstabe ändern. Du kannst einen Hinweis verwenden (bis zu drei pro Spiel), wenn du feststeckst, und jederzeit einen Zug rückgängig machen.',
    'rules-p3':
      'Im Modus Klassisch wählst du die Schwierigkeit und spielst so viele Rätsel, wie du möchtest. Im Modus Täglich gibt es ein gemeinsames Rätsel pro Tag, und das Lösen hält deine Serie am Leben.',
    'tips-title': 'Tipps & Strategien',
    'tip-1':
      'Konzentriere dich auf die Vokale. Wörter, die sich nur durch einen Vokal unterscheiden, sind fast immer gültig, und Vokale öffnen die meisten Wege.',
    'tip-2':
      'Arbeite auch rückwärts vom Zielwort. Oft wird der beste Weg klar, wenn du von beiden Enden aus planst.',
    'tip-3':
      'Behalte die Buchstabenpositionen im Kopf. Das Ändern eines Buchstabens am Wortende lässt meist mehr Optionen offen.',
    'tip-4':
      'Achte auf häufige Muster wie -ATE, -ING oder -IDE. Ein Muster wiederzuverwenden lässt dich schnell mehrere Wörter überqueren.',
    'tip-5':
      'Setze deine drei Hinweise mit Bedacht ein. Der letzte Hinweis verrät das genaue nächste Wort, was bei schweren Rätseln sehr wertvoll ist.',
    'whatis-title': 'Was ist eine Wortleiter?',
    'whatis-p1':
      'Die Wortleiter ist ein Worträtsel, das Lewis Carroll 1877 erfunden hat und Doublets nannte. Du beginnst mit zwei Wörtern gleicher Länge und verbindest sie durch eine Kette echter Wörter, wobei du jeweils einen Buchstaben änderst.',
    'whatis-p2':
      'Zum Beispiel kann die Verwandlung von COLD in WARM so ablaufen: COLD → CORD → WORD → WARD → WARM. Das Rätsel ist in Klassenzimmern beliebt, weil es Rechtschreibung, Wortschatz und logisches Denken spielerisch fördert.',
    'levels-title': 'Schwierigkeitsgrade',
    'levels-easy': 'Leicht:',
    'levels-easy-p':
      'Kurze Ketten von 2 bis 4 Zügen zwischen sehr gebräuchlichen Wörtern. Perfekt für Kinder und Anfänger.',
    'levels-medium': 'Mittel:',
    'levels-medium-p':
      'Ketten von 5 bis 7 Zügen. Ein gutes tägliches Training für regelmäßige Spieler.',
    'levels-hard': 'Schwer:',
    'levels-hard-p':
      'Lange Ketten von 8 Zügen oder mehr. Nur die schärfsten Worträtsel-Fans knacken diese.',
    'kids-title': 'Wortleiter für Kinder',
    'kids-p1':
      'Wortleitern sind eine fantastische Aktivität für Kinder, die Lesen und Rechtschreibung lernen. Jeder Zug erfordert, Buchstaben zu vergleichen, Wörter laut auszusprechen und über den Wortschatz nachzudenken — und dabei spielen sie ein Spiel.',
    'kids-p2':
      'Lass Kinder im Modus Leicht beginnen, wo kurze Wörter wie CAT und DOG in wenigen Zügen verbunden werden. Es ist bildschirmfreundlich, ruhig und heimlich lehrreich.',
    'faq-title': 'Häufige Fragen',
    'faq-q1': 'Was ist eine Wortleiter?',
    'faq-a1':
      'Eine Wortleiter ist ein Worträtsel, bei dem du ein Wort in ein anderes verwandelst, indem du jedes Mal nur einen Buchstaben änderst und nach jedem Schritt ein echtes Wort verwendest. Erfunden wurde sie 1877 von Lewis Carroll.',
    'faq-q2': 'Wie spielt man Wortleiter?',
    'faq-a2':
      'Beginne mit dem blauen Startwort und gib dann Wörter ein, die sich vom vorherigen um genau einen Buchstaben unterscheiden. Mache weiter, bis du das bernsteinfarbene Zielwort erreichst. Je weniger Züge, desto besser.',
    'faq-q3': 'Was sind die Regeln der Wortleiter?',
    'faq-a3':
      'Jeder Zug ändert genau einen Buchstaben, und jedes Wort muss ein echtes englisches Wort derselben Länge wie Start- und Zielwort sein. Du darfst ein bereits in deiner Leiter verwendetes Wort nicht wiederholen.',
    'faq-q4':
      'Darf man in einer Wortleiter mehr als einen Buchstaben ändern?',
    'faq-a4':
      'Nein. Pro Zug darf sich genau ein Buchstabe ändern. Zwei oder mehr Buchstaben auf einmal zu ändern, verstößt gegen die Regeln des Rätsels.',
    'faq-q5': 'Was macht eine Wortleiter schwer?',
    'faq-a5':
      'Die Schwierigkeit hängt von der Entfernung zwischen den beiden Wörtern ab, davon, wie viele echte Wörter dazwischen liegen, und davon, wie leicht man unterwegs in Sackgassen gerät.',
    'faq-q6': 'Sind Wortleitern gut für Kinder?',
    'faq-a6':
      'Ja. Wortleitern werden in Schulen häufig eingesetzt, um Rechtschreibung, Laut-Buchstaben-Zuordnung und Wortschatz zu üben, und sie sind eine ruhige, lehrreiche Bildschirmaktivität.',
    'faq-q7': 'Ist dieses Wortleiter-Spiel kostenlos?',
    'faq-a7':
      'Ja, völlig kostenlos. Ohne Registrierung, ohne Downloads und ohne Zeitlimit. Spiele im Browser auf jedem Gerät, auch auf dem Handy.',
    'related-title': 'Weitere kostenlose Online-Spiele',
    'related-p':
      'Wenn dir Worträtsel gefallen, probiere unsere anderen kostenlosen Logikspiele — alle funktionieren auf Mobilgeräten und am Computer.',
    'related-sudoku':
      'Das klassische Logikrätsel mit drei Rastergrößen.',
    'related-queens':
      'Ein tägliches Platzierungsrätsel, inspiriert vom N-Damen-Problem.',
    'share-text': '🪜 Wortleiter ({label}): {start} → {target} in {moves} Zügen (Par {par}) · ⏱ {time} · 💡 {hints} Tipps',
    par: 'Par',
    'par-hint': 'Die Zahl nach dem Schrägstrich ist Par: die kürzestmögliche Leiter.',
    history: 'Deine bisherige Leiter',
    'history-empty': 'Deine Wörter sammeln sich hier, das neueste direkt über dem Eingabefeld.',
  },
  seo: {
    cardTagline: 'Websites, Landing Pages und Automatisierung',
    home: {
      title: 'Breno Carvalho — Landing Pages und Websites, die konvertieren',
      description: 'Schnelle, moderne und suchmaschinenoptimierte Landing Pages und Websites, die Besucher zu Kunden machen. Design, Entwicklung, Hosting und Automatisierung.',
    },
    services: {
      title: 'Website- und Landing-Page-Entwicklung',
      description: 'Landing Pages, professionelle Websites, Blogs, Portfolios und Integrationen mit WhatsApp, CRM und Zahlungen. Finde den passenden Service für dein Business.',
    },
    landingPages: {
      title: 'Landing Pages, die Besucher zu Kunden machen',
      description: 'Landing Pages mit hoher Conversion: überzeugende Texte, Social Proof und ein klarer Call-to-Action. Schnell, mobil optimiert und bereit für Werbeanzeigen.',
    },
    websitesForFreelancers: {
      title: 'Professionelle Websites für Selbstständige und Freelancer',
      description: 'Eine professionelle Website, die Vertrauen schafft und neue Kunden bringt: Leistungen, Portfolio, Referenzen und WhatsApp-Kontakt, schnell und gut auffindbar bei Google.',
    },
    blogsAndPortfolios: {
      title: 'Blogs und Portfolios, die deine Arbeit zeigen',
      description: 'Ein Blog oder Portfolio, um deine Arbeit zu zeigen, Inhalte zu veröffentlichen und deine Zielgruppe zu erreichen, mit SEO, schneller Ladezeit und einfacher Pflege.',
    },
    integrations: {
      title: 'Website-Integrationen mit WhatsApp, CRM, E-Mail und Zahlungen',
      description: 'Verbinde deine Website mit WhatsApp, CRM, E-Mail-Marketing, Zahlungen und Tabellen, um Anfragen automatisch zu erfassen und nachzuverfolgen.',
    },
    sudoku: {
      title: 'Kostenloses Online-Sudoku mit 4×4-, 6×6- und 9×9-Gittern',
      description: 'Spiele Sudoku kostenlos im Browser: 4×4-, 6×6- und 9×9-Gitter, drei Schwierigkeitsstufen, Notizen, Hinweise und Rückgängig. Auf Handy und Computer.',
    },
    queens: {
      title: 'Queens — kostenloses Online-Logikspiel',
      description: 'Setze eine Dame in jede Zeile, Spalte und farbige Region, ohne dass sich zwei berühren. Fünf Schwierigkeitsstufen und Hinweise. Kostenlos online spielen.',
    },
    wordLadder: {
      title: 'Word Ladder — kostenloses Online-Wortspiel',
      description: 'Ändere jeweils einen Buchstaben, um das Startwort in das Zielwort zu verwandeln. Tägliches Rätsel und drei Schwierigkeitsstufen, kostenlos im Browser.',
    },
  },
};
