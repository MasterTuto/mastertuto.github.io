import type { Translations } from './english';

export const spanishTranslations: Translations = {
  catalog: {
    explore: 'Explorar juegos y herramientas',
    toggle: 'Contraer o expandir menú',
    close: 'Cerrar menú',
    skip: 'Saltar al contenido',
    gamesTitle: 'Juegos de lógica y palabras gratis online',
    gamesIntro:
      'Juega Sudoku, Queens y Word Ladder en el navegador. Descubre desafíos de números, estrategia y palabras en tu móvil, tableta u ordenador.',
    gamesHeading: 'Elige tu próximo desafío',
    gamesText:
      'Practica con Sudoku, planifica la posición de cada reina o conecta palabras cambiando una letra cada vez. Abre un juego para ver sus reglas, controles y consejos.',
    toolsTitle: 'Herramientas online para el día a día',
    toolsIntro:
      'Formatea JSON e inspecciona tokens JWT con herramientas gratuitas para desarrolladores que funcionan en tu navegador.',
    toolsHeading: 'Herramientas para el desarrollo diario',
    toolsText:
      'Valida y minimiza JSON o consulta los claims y la caducidad de tokens JWT. También puedes explorar nuestros juegos de lógica.',
  },
  backHome: 'Volver al inicio',
  cases: {
    viewCase: "Ver caso completo",
    visitSite: "Visitar el sitio",
    backToProjects: "Volver a los proyectos",
    myRole: "Lo que hice",
    aboutTitle: "Sobre el proyecto",
    highlightsTitle: "Destacados",
    galleryTitle: "En computadora y en celular",
    techTitle: "Bajo el capó",
    desktop: "versión para computadora",
    mobile: "versión para celular",
    ctaTitle: "¿Tienes un proyecto parecido en mente?",
    ctaText: "Cuéntame lo que necesitas y te respondo con los próximos pasos.",
    ctaButton: "Hablar sobre mi proyecto",
    roles: {
      design: "Diseño",
      implementation: "Implementación",
      hosting: "Hosting",
      maintenance: "Mantenimiento",
    },
    items: {
      jingle: {
        tagline: "Plataforma de creación de jingles con inteligencia artificial",
        summary: "Una plataforma en la que cualquier persona convierte una idea en un jingle: la inteligencia artificial escribe la letra, crea la música y genera la voz, con descarga en MP3. Hice el diseño, la implementación y el hosting, y me encargo del mantenimiento.",
        about: "jingle.ia.br saca el jingle del estudio. Panaderías, pizzerías, supermercados, radios y agencias describen su mensaje, eligen un ritmo brasileño como forró, sertanejo o pagode, comparan tres opciones de letra y descargan la canción lista. La misma plataforma sirve para cumpleaños, eventos, podcasts y campañas, sin necesidad de saber componer.",
        work: {
          design: {
            intro: "El público nunca compuso una canción. Cada decisión de diseño elimina una duda del camino.",
            decisions: {
              '1': {
                title: "Cuatro pasos, una pregunta a la vez",
                text: "Idea, tono, letra y descarga. Pasos cortos evitan la página en blanco de quien no sabe por dónde empezar.",
              },
              '2': {
                title: "Elegir en lugar de escribir",
                text: "La persona compara tres letras antes de generar el audio. Elegir es más fácil que escribir, y el crédito solo se gasta en lo que aprobó.",
              },
              '3': {
                title: "Una estética muy brasileña",
                text: "Verde y amarillo, un megáfono y ritmos regionales dejan claro desde la primera pantalla para quién es el producto.",
              },
            },
          },
          implementation: {
            intro: "Generar música lleva tiempo y puede fallar. La implementación evita que eso pese sobre el usuario.",
            decisions: {
              '1': {
                title: "Generación en segundo plano",
                text: "El jingle se sigue generando aunque se cierre la página. La persona sigue el estado y descarga el MP3 cuando está listo.",
              },
              '2': {
                title: "Un fallo no cuesta crédito",
                text: "Si falla la creación de la letra, el jingle vuelve al saldo del plan y la pantalla explica lo que pasó.",
              },
              '3': {
                title: "Planes de suscripción",
                text: "Tres planes mensuales con cuota de jingles y cancelación en cualquier momento. El plan inicial incluye una marca de agua hablada.",
              },
            },
          },
          hosting: {
            intro: "El uso llega en picos, como fechas especiales y campañas. La infraestructura sigue ese ritmo.",
            decisions: {
              '1': {
                title: "Pagas por lo que usas",
                text: "Arquitectura serverless: sin servidores ociosos esperando visitas, y la capacidad crece sola cuando aumenta el tráfico.",
              },
              '2': {
                title: "Un dominio que se explica solo",
                text: "El .ia.br dice qué hace el producto y que es brasileño, antes incluso de abrir el sitio.",
              },
            },
          },
          maintenance: {
            intro: "El producto sigue evolucionando después del lanzamiento.",
            decisions: {
              '1': {
                title: "Evolución continua",
                text: "Nuevos tipos de jingle, ideas de briefing y contenidos se suman a medida que el uso real muestra lo que falta.",
              },
              '2': {
                title: "Correcciones rápidas",
                text: "Sigo los errores y los costos de los servicios de IA para corregir problemas antes de que se conviertan en quejas.",
              },
            },
          },
        },
        tech: {
          intro: "Un stack serverless en AWS, que orquesta varios modelos de IA y se entrega desde el edge.",
          frontend: "SPA en Angular, en un monorepo junto con el back end: un repositorio, un flujo de build y deploy.",
          backend: "Back end serverless en Node.js sobre AWS Lambda, con DynamoDB como base NoSQL. Escala bajo demanda y cobra por ejecución.",
          ai: "Pipeline asíncrono que orquesta LLMs de OpenAI y Gemini, inferencia de modelos en Replicate y síntesis de voz con ElevenLabs.",
          payments: "Suscripciones recurrentes en Asaas, integradas por API y webhooks para liberar la cuota de cada plan.",
          infra: "Assets estáticos servidos por la CDN de CloudFront, DNS y proxy en el edge con Cloudflare y dominio .ia.br registrado en Registro.br.",
        },
        highlights: {
          '1': {
            value: "3",
            label: "opciones de letra para cada jingle",
          },
          '2': {
            value: "8",
            label: "géneros musicales brasileños",
          },
          '3': {
            value: "60 s",
            label: "de jingle, con descarga en MP3",
          },
          '4': {
            value: "R$ 9,90",
            label: "al mes en el plan inicial",
          },
        },
      },
      supervegetariano: {
        tagline: "Restaurante vegetariano en Santos (Brasil) desde 1986",
        summary: "Sitio institucional de un restaurante vegetariano tradicional de Santos, Brasil. El sitio ya existía: lo migré a un nuevo hosting en 1 día, configuré el correo en KingHost e hice pequeños ajustes.",
        about: "Super Vegetariano sirve comida casera, sabrosa y saludable en Santos desde febrero de 1986. El sitio presenta la historia de la casa, sus locales, el menú del día en las redes sociales y el contacto por WhatsApp. Fue hecho en WordPress por otro equipo.",
        work: {
          hosting: {
            intro: "El sitio ya funcionaba y los clientes lo conocían. El objetivo era cambiar la infraestructura sin que nadie lo notara.",
            decisions: {
              '1': {
                title: "Migración en 1 día",
                text: "Los archivos, la base de datos y el dominio de WordPress pasaron al nuevo hosting en un solo día, manteniendo contenido y diseño.",
              },
              '2': {
                title: "Correo en KingHost",
                text: "Configuré las cuentas de correo del dominio en KingHost, para que el restaurante siga recibiendo mensajes con su propia dirección.",
              },
              '3': {
                title: "Pequeños ajustes",
                text: "Después de la migración, corregí detalles puntuales sin tocar la identidad que los clientes ya reconocen.",
              },
            },
          },
        },
        highlights: {
          '1': {
            value: "40",
            label: "años sirviendo comida saludable",
          },
          '2': {
            value: "2",
            label: "locales en Santos, Brasil",
          },
          '3': {
            value: "1 día",
            label: "para completar la migración",
          },
          '4': {
            value: "1986",
            label: "año de fundación",
          },
        },
      },
    },
  },
  scheduling: {
    title: 'Agenda una conversación',
    description:
      'Elige un horario para una conversación de 30 minutos sobre tu proyecto.',
    openCalendar: 'Abrir calendario',
  },
  games: {
    label: 'Juegos',
    subtitle: 'Una colección de juegos que he creado.',
    play: 'Jugar',
    queensDescription:
      'Un rompecabezas de lógica diario inspirado en el clásico problema de las N-Reinas.',
    sudokuDescription:
      'Un generador de Sudoku con cuadrículas de 4×4, 6×6 y 9×9 y dificultad ajustable.',
    wordLadderDescription:
      'Un juego de palabras en el que cambias una letra a la vez para transformar una palabra en otra, con puzzles diarios y tres niveles de dificultad.',
  },
  tools: {
    label: 'Herramientas',
    subtitle: 'Herramientas útiles que he creado.',
    emptyTitle: 'Aún no hay herramientas disponibles',
    emptyDescription: 'Nuevas herramientas están en camino. ¡Vuelve pronto!',
  },
  home: {
    title:
      'Programador profesional especializado en <span class="text-foreground-emphasis">landing pages</span> y <span class="text-foreground-emphasis">sitios autonomos</span>.',
    description:
      'Creo sitios rápidos, modernos y optimizados para convertir visitantes en clientes y fortalecer su presencia en línea.',
    websiteLikeThis: 'Quiero un sitio como este',
    whatsappMessage:
      '¡Hola! Me gustaría solicitar un presupuesto para un sitio web.',
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      whyMe: 'Por qué yo',
      projects: 'Proyectos',
      testimonials: 'Testimonios',
      allServices: "Todos los servicios",
      segments: "Segmentos",
      gamesAndTools: "Juegos y herramientas",
    },
    services: {
      name: 'Servicios',

      title: 'Soluciones completas para profesionales que quieren crecer',
      description:
        'Desarrollo estratégico enfocado en performance, diseño y conversión. Todo lo que necesitas para tener presencia, autoridad y resultados en línea.',

      landingPages: 'Páginas de lanzamiento',
      landingPagesDescription:
        'Páginas de conversión alta para capturar más leads y cerrar más negocios.',

      websitesForFreelancers: 'Sitios para Freelancers',
      websitesForFreelancersDescription:
        'Sitios profesionales que transmiten confianza y generan nuevas oportunidades.',

      blogsAndPortofolios: 'Blogs y Portfolios',
      blogsAndPortofoliosDescription:
        'Muestre tu trabajo, comparta conocimiento y atrae tu público ideal.',

      integrations: 'Integraciones',
      integrationsDescription:
        'Formularios, marketing por correo electrónico, WhatsApp, pagos y mucho más.',
    },
    whyMe: {
      name: '¿PARA QUÉ TRABAJAR CON MI?',
      title: 'Compromiso con resultados y atención a cada detalle',
      description:
        'Más que código, ofrezco estrategia, comunicación y un socio para ayudarte a alcanzar tus objetivos.',
      list: {
        '1Title': 'Comunicación clara y directa',
        '1Subtitle': 'Seguimiento a través de todos los pasos',
        '2Title': 'Diseño moderno y personalizado',
        '2Subtitle': 'Sitios únicos que representan tu marca',
        '3Title': 'Foco en el rendimiento',
        '3Subtitle': 'Sitios rápidos que no perderán a los visitantes',
        '4Title': 'Optimizado para motores de búsqueda',
        '4Subtitle': 'Más visibilidad para tu negocio',
      },
      yoE: '5+ años',
      yoEDescription: 'Desarrollo de soluciones digitales',
    },
    projects: {
      name: 'Portfolio',
      title: 'Proyectos que generan resultados',
      description:
        'Algunos trabajos recientes desarrollados para profesionales y empresas que confiaron en mi trabajo.',
      viewAll: 'Ver todos los proyectos',
    },
    testimonials: {
      name: 'Testimonios',
      title: 'Lo que dicen mis clientes:',
      previous: 'Testimonios anteriores',
      next: 'Siguientes testimonios',
      ctaTitle: '¿Listo para tener un sitio que traiga resultados reales?',
      ctaDescription:
        'Hablemos sobre tus proyectos y llevemos tus ideas al mundo real.',
      whatsapp: 'Hablar por WhatsApp',
      whatsappMessage:
        '¡Hola! Vi tu portafolio y me gustaría hablar sobre un proyecto.',
      requestBudget: 'Solicitar presupuesto',
      items: {
        '1': {
          text: 'Breno entendió exactamente lo que necesitaba y entregó una página rápida, bonita y que empezó a traer contactos calificados en la primera semana.',
          name: 'Mariana Alves',
          profession: 'Arquitecta',
        },
        '2': {
          text: 'El proceso fue claro de principio a fin. Por fin tengo un sitio profesional que explica mi trabajo y transmite confianza.',
          name: 'Rafael Costa',
          profession: 'Consultor de negocios',
        },
        '3': {
          text: 'Además del diseño, el cuidado con el rendimiento marcó una gran diferencia. El sitio carga rápido y funciona perfectamente en móvil.',
          name: 'Camila Torres',
          profession: 'Dueña de estudio de belleza',
        },
        '4': {
          text: 'Transformó una idea suelta en una presencia digital pulida. La comunicación fue fácil y el resultado se sintió fiel a mi marca.',
          name: 'Lucas Mendes',
          profession: 'Entrenador personal',
        },
      },
    },
    footer: {
      ctaTitle: '¿Creamos algo increíble juntos?',
      ctaSubtitle:
        'Estoy listo para transformar tu idea en un sitio profesional, rápido y que realmente genere resultados.',
      cards: {
        closeService: {
          title: 'Atención cercana',
          subtitle: 'Foco en tu proyecto',
        },
        transparentProcess: {
          title: 'Proceso transparente',
          subtitle: 'Sigues cada etapa',
        },
        properSupport: {
          title: 'Soporte adecuado',
          subtitle: 'Lo dejo a tu manera',
        },
      },
      brandSubtitle:
        'Programador freelance especializado en crear sitios que generan resultados para autónomos y pequeños negocios.',
      navigation: 'Navegación',
      services: 'Servicios',
      letsTalk: '¿Hablamos?',
      downloadCurriculum: 'Descargar currículum',
      rights: 'Todos los derechos reservados.',
    },
    estimateBudget: 'Solicitar una cotización',
  },
  servicesPage: {
    common: {
      backHome: 'Volver al inicio',
      backToServices: 'Todos los servicios',
      otherServices: 'Explora otros servicios',
      requestBudget: 'Solicitar presupuesto',
      ready: '¿Listo para empezar?',
      whatsappMessage:
        '¡Hola! Vi tu portafolio y me gustaría hablar de un proyecto.',
    },
    index: {
      title: 'Servicios',
      subtitle:
        'Desarrollo estratégico enfocado en rendimiento, diseño y conversión.',
      description:
        'Todo lo que necesitas para tener presencia, autoridad y resultados reales en línea. Cada servicio está creado para resolver un problema específico: rápido, moderno y optimizado para motores de búsqueda.',
      viewAll: 'Saber más',
      ctaTitle: '¿No sabes qué servicio se ajusta a lo que necesitas?',
      ctaSubtitle:
        'Envíame un mensaje y te ayudo a elegir el mejor camino para tu proyecto.',
    },
    landingPages: {
      proofTitle: "Proyectos que ya están en línea",
      formTitle: "Pide tu presupuesto",
      formSubtitle: "Solo dos campos. La conversación sigue en WhatsApp.",
      formName: "Tu nombre",
      formOffer: "¿Qué quieres vender o promocionar?",
      formOfferPlaceholder: "Ej.: un curso, una consultoría, un lanzamiento",
      messageIntro: "¡Hola, Breno! Quiero una landing page.",
      messageName: "Nombre",
      messageOffer: "Oferta",
      anatomyTitle: 'Anatomía de una página que convierte',
      anatomySubtitle: 'Cada bloque tiene una función. Mira lo que hace cada parte de tu landing page para llevar al visitante a la acción.',
      anatomy: {
        '1': {
          title: 'Titular',
          text: 'Una promesa clara que le dice al visitante, en segundos, qué obtiene y por qué importa.',
        },
        '2': {
          title: 'Prueba social',
          text: 'Testimonios, logotipos y cifras que demuestran que otras personas ya confían en ti.',
        },
        '3': {
          title: 'Oferta y beneficios',
          text: 'Lo que incluye, presentado como resultados para el cliente y no como una lista de funciones.',
        },
        '4': {
          title: 'Formulario',
          text: 'Solo los campos realmente necesarios, para que completarlo sea fácil.',
        },
        '5': {
          title: 'Llamada a la acción',
          text: 'Una sola acción, repetida en los momentos adecuados, con un botón imposible de ignorar.',
        },
      },
      timeline: {
        '1': 'Día 1',
        '2': 'Días 2–3',
        '3': 'Días 3–6',
        '4': 'Día 7+',
      },
      name: 'Landing Pages',
      shortDescription:
        'Páginas de alta conversión, diseñadas para convertir visitantes en clientes y ventas.',
      tagline: 'Páginas enfocadas en conversión',
      heroTitle: 'Landing pages que convierten visitantes en clientes',
      intro:
        'Una landing page es una página enfocada, con un único propósito: guiar al visitante hacia una acción clara: comprar, registrarse, agendar o solicitar un presupuesto. A diferencia de un sitio completo, elimina distracciones y concentra toda la energía en la conversión.',
      introP2:
        'Cada elemento — título, texto, imágenes, formulario y llamada a la acción — está creado y probado para llevar al visitante a lo largo del recorrido. El resultado es una página que funciona como un vendedor que nunca duerme.',
      benefitsTitle: 'Por qué invertir en una landing page',
      benefits: {
        '1': {
          title: 'Más clientes potenciales',
          text: 'Una llamada clara y un formulario optimizado captan más contactos con el mismo tráfico.',
        },
        '2': {
          title: 'Mejor tasa de conversión',
          text: 'Texto y diseño enfocados aumentan el porcentaje de visitantes que realmente actúan.',
        },
        '3': {
          title: 'Resultados más rápidos',
          text: 'Una sola página se publica en días, no meses — y puedes empezar a probar de inmediato.',
        },
        '4': {
          title: 'Rendimiento medible',
          text: 'Cada clic, vista y envío se rastrea, así sabes exactamente qué funciona.',
        },
      },
      detailsTitle: 'Qué entrego en cada landing page',
      details: {
        '1': {
          title: 'Estrategia antes que píxeles',
          text: 'Empezamos definiendo tu oferta, tu público y la única acción que deseas. La estructura, el texto y el diseño se construyen en torno a ese objetivo — no en torno a lo que solo se ve bonito.',
        },
        '2': {
          title: 'Copywriting que vende',
          text: 'Títulos, subtítulos, viñetas y llamadas están escritos para persuadir. Uso marcos probados para guiar al visitante de la atención a la acción.',
        },
        '3': {
          title: 'Velocidad, SEO y móvil',
          text: 'Las páginas cargan en menos de un segundo, siguen las mejores prácticas de SEO y se ven impecables en cualquier dispositivo — porque la mayor parte de tu tráfico viene del móvil.',
        },
      },
      processTitle: 'Cómo funciona el proceso',
      process: {
        '1': {
          title: 'Llamada de descubrimiento',
          text: 'Hablamos de tu negocio, tu público y tus objetivos. Mapeo la oferta y el mensaje clave.',
        },
        '2': {
          title: 'Diseño',
          text: 'Recibes una maqueta visual de la página para revisar antes de escribir código.',
        },
        '3': {
          title: 'Desarrollo',
          text: 'La página se construye rápida, responsiva y optimizada para conversión.',
        },
        '4': {
          title: 'Lanzamiento y mejoras',
          text: 'Publicamos, seguimos los resultados y refinamos la página para mejorar el rendimiento con el tiempo.',
        },
      },
      faqTitle: 'Preguntas frecuentes',
      faqs: {
        '1': {
          q: '¿Cuánto tiempo lleva?',
          a: 'Una landing page típica tarda de 3 a 7 días, según el alcance y el contenido.',
        },
        '2': {
          q: '¿Necesito escribir el contenido?',
          a: 'Puedo escribir el texto por ti o trabajar con el material que ya tengas. Apruebas todo antes del lanzamiento.',
        },
        '3': {
          q: '¿Puedo cambiarla después?',
          a: 'Sí. La página se construye con una estructura fácil de editar y ofrezco soporte después del lanzamiento.',
        },
      },
      ctaTitle: '¿Listo para convertir tráfico en clientes?',
      ctaSubtitle: 'Creemos una landing page que se pague sola.',
    },
    websitesForFreelancers: {
      compareTitle: 'Solo redes sociales vs. tu propio sitio web',
      compareWithoutTitle: 'Solo redes sociales',
      compareWithTitle: 'Con tu propio sitio web',
      compareWithout: {
        '1': 'Tu alcance depende del algoritmo',
        '2': 'La información sobre tus servicios queda dispersa entre publicaciones',
        '3': 'El cliente tiene que escribirte para preguntar lo básico',
        '4': 'Tu perfil puede ser limitado o perderse en cualquier momento',
      },
      compareWith: {
        '1': 'Los clientes te encuentran en Google cuando buscan lo que haces',
        '2': 'Servicios, precios y proceso explicados en un solo lugar',
        '3': 'Dudas resueltas antes del primer mensaje',
        '4': 'Una dirección que es tuya, para siempre',
      },
      pagesTitle: 'Páginas que puede tener tu sitio',
      pagesSubtitle: 'Una estructura sencilla que responde a lo que todo cliente potencial quiere saber.',
      pages: {
        '1': {
          title: 'Inicio',
          text: 'Quién eres, qué haces y cómo contratarte, de un vistazo.',
        },
        '2': {
          title: 'Servicios',
          text: 'Cada servicio explicado, con lo que incluye y cómo funciona.',
        },
        '3': {
          title: 'Sobre mí',
          text: 'Tu historia, tu experiencia y tu forma de trabajar.',
        },
        '4': {
          title: 'Portafolio',
          text: 'Proyectos y resultados reales que demuestran tu habilidad.',
        },
        '5': {
          title: 'Contacto',
          text: 'WhatsApp, formulario y agenda a un clic.',
        },
      },
      name: 'Sitios para Autónomos',
      shortDescription:
        'Sitios profesionales que generan confianza y conquistan más clientes.',
      tagline: 'Tu tarjeta de presentación digital',
      heroTitle: 'Un sitio profesional que conquista clientes',
      intro:
        'Como autónomo, tu sitio suele ser la primera impresión que causas en un cliente potencial. Un sitio profesional hace más que verse bien: explica lo que haces, muestra pruebas de tu trabajo y facilita que te contraten.',
      introP2:
        'La mayoría de los autónomos dependen de Instagram o del boca a boca. Un sitio te da un lugar central y confiable para dirigir a las personas — y sigue trabajando mientras duermes, respondiendo preguntas y generando oportunidades.',
      benefitsTitle: 'Qué hace un sitio por ti',
      benefits: {
        '1': {
          title: 'Credibilidad',
          text: 'Un sitio profesional te hace ver establecido y confiable.',
        },
        '2': {
          title: 'Clientes en piloto automático',
          text: 'Los visitantes te encuentran, entienden tu valor y te contactan — incluso fuera del horario laboral.',
        },
        '3': {
          title: 'Un portafolio que vende',
          text: 'Muestra tus mejores trabajos con casos de estudio que convencen a nuevos clientes.',
        },
        '4': {
          title: 'Ten tu propia audiencia',
          text: 'Deja de depender de las redes sociales. Tu sitio, tus reglas, tus datos.',
        },
      },
      detailsTitle: 'Qué entrego',
      details: {
        '1': {
          title: 'Posicionamiento claro',
          text: 'Definimos qué te hace diferente y lo ponemos en el centro de cada página.',
        },
        '2': {
          title: 'Servicios y precios',
          text: 'Páginas claras que explican tus servicios, proceso y valores reducen fricción y atraen mejores clientes.',
        },
        '3': {
          title: 'Contacto y reservas',
          text: 'Botones de WhatsApp, formularios y agenda para que el cliente te alcance con un clic.',
        },
      },
      processTitle: 'Cómo funciona el proceso',
      process: {
        '1': {
          title: 'Descubrimiento',
          text: 'Mapeamos tus servicios, tu público y tus objetivos en una conversación corta.',
        },
        '2': {
          title: 'Diseño',
          text: 'Apruebas el aspecto y la estructura antes de una sola línea de código.',
        },
        '3': {
          title: 'Desarrollo',
          text: 'Tu sitio se construye rápido, responsivo y listo para los buscadores.',
        },
        '4': {
          title: 'Lanzamiento',
          text: 'Publicamos, conectamos tu dominio y dejamos el sitio fácil de mantener.',
        },
      },
      faqTitle: 'Preguntas frecuentes',
      faqs: {
        '1': {
          q: '¿Necesito un sitio si ya tengo Instagram?',
          a: 'Instagram ayuda con la visibilidad, pero un sitio te da credibilidad, control y mejor conversión. Ambos funcionan mejor juntos.',
        },
        '2': {
          q: '¿Puedes copiar el diseño de mi competidor?',
          a: 'Creo un diseño único para tu marca. Copiar perjudica tu credibilidad y tu SEO.',
        },
        '3': {
          q: '¿Ayudas con dominio y hosting?',
          a: 'Sí, me encargo de toda la parte técnica para que solo te concentres en tu trabajo.',
        },
      },
      ctaTitle: 'Construyamos tu presencia profesional',
      ctaSubtitle: 'Envíame un mensaje y planifiquemos tu sitio.',
    },
    blogsAndPortfolios: {
      splitTitle: 'Dos formatos, un objetivo: ser recordado',
      portfolio: {
        title: 'Portafolio',
        text: 'Para cuando tu trabajo habla por sí solo y necesita mostrarse de la mejor manera.',
        items: {
          '1': 'Páginas de proyecto con imágenes, contexto y resultados',
          '2': 'Filtros por categoría o tipo de trabajo',
          '3': 'Testimonios de clientes junto a cada proyecto',
        },
      },
      blog: {
        title: 'Blog',
        text: 'Para cuando tu conocimiento es el diferencial y quieres que te encuentren en las búsquedas.',
        items: {
          '1': 'Artículos organizados por categorías y etiquetas',
          '2': 'Estructura preparada para SEO en cada publicación',
          '3': 'Suscripción al boletín para mantener cerca a tus lectores',
        },
      },
      chapter: 'Capítulo',
      name: 'Blogs y Portafolios',
      shortDescription:
        'Muestra tu trabajo, comparte conocimiento y atrae a tu audiencia ideal.',
      tagline: 'Contenido y vitrina, juntos',
      heroTitle: 'Un lugar para mostrar tu trabajo y compartir tu conocimiento',
      intro:
        'Un portafolio o blog es más que una colección de proyectos o artículos: es una herramienta que trabaja por ti. Atrae a personas interesadas en lo que haces, construye autoridad en tu área y convierte lectores en clientes.',
      introP2:
        'Diseño y construyo sitios donde tu trabajo brilla: rápidos, bonitos, fáciles de actualizar y estructurados para que los buscadores te encuentren.',
      benefitsTitle: 'Por qué tener un blog o portafolio',
      benefits: {
        '1': {
          title: 'Autoridad',
          text: 'Contenido consistente y de calidad te posiciona como referente en tu campo.',
        },
        '2': {
          title: 'Tráfico orgánico',
          text: 'Artículos optimizados para búsqueda atraen visitantes que ya buscan tus servicios.',
        },
        '3': {
          title: 'Muestra, no cuentes',
          text: 'Un portafolio bien estructurado demuestra tu habilidad mejor que cualquier discurso.',
        },
        '4': {
          title: 'Actualizaciones fáciles',
          text: 'Agregar un proyecto o un post toma minutos, no un desarrollador.',
        },
      },
      detailsTitle: 'Qué entrego',
      details: {
        '1': {
          title: 'Vitrinas hermosas',
          text: 'Proyectos presentados con imágenes, descripciones y resultados — hechos para impresionar a clientes y socios.',
        },
        '2': {
          title: 'Un blog que crece',
          text: 'Estructura editorial con categorías, etiquetas y bases de SEO para que cada post siga trabajando por ti.',
        },
        '3': {
          title: 'Hecho para mantenerse',
          text: 'Edición simple para que seas dueño de tu contenido y nunca dependas de un desarrollador para cambios pequeños.',
        },
      },
      processTitle: 'Cómo funciona el proceso',
      process: {
        '1': {
          title: 'Objetivos',
          text: 'Definimos qué quieres atraer: clientes, lectores o ambos.',
        },
        '2': {
          title: 'Estructura',
          text: 'Mapeo las secciones, categorías y páginas que tienen sentido para tu contenido.',
        },
        '3': {
          title: 'Diseño y construcción',
          text: 'Tu sitio se crea pensando en tu estilo y tu audiencia.',
        },
        '4': {
          title: 'Capacitación',
          text: 'Aprendes a publicar y editar contenido por tu cuenta, sin código.',
        },
      },
      faqTitle: 'Preguntas frecuentes',
      faqs: {
        '1': {
          q: '¿Necesito saber escribir?',
          a: 'No. Te ayudo a estructurar tus ideas, y también puedes contratarme para escribir los primeros artículos.',
        },
        '2': {
          q: '¿Puedo actualizarlo yo mismo?',
          a: 'Sí. El sitio se construye para que agregues proyectos y posts sin tocar una línea de código.',
        },
        '3': {
          q: '¿También escribes el contenido?',
          a: 'Sí, puedo crear los textos de tu portafolio y los primeros posts del blog.',
        },
      },
      ctaTitle: 'Tu trabajo merece un escenario',
      ctaSubtitle: 'Creemos un portafolio que te traiga oportunidades.',
    },
    integrations: {
      hubCenter: 'Tu sitio web',
      tools: {
        '1': 'WhatsApp',
        '2': 'Correo',
        '3': 'CRM',
        '4': 'Pagos',
        '5': 'Hojas de cálculo',
        '6': 'Analítica',
      },
      flowTitle: 'Cómo se ve en la práctica',
      flowSubtitle: 'Un solo envío de formulario puede activar todo lo que antes se hacía a mano.',
      flow: {
        '1': {
          label: 'Disparador',
          title: 'Un visitante completa el formulario',
          text: 'Nombre, contacto e interés se capturan en tu sitio.',
        },
        '2': {
          label: 'Automatización',
          title: 'Los datos van a donde deben ir',
          text: 'El lead se guarda en tu CRM u hoja de cálculo y recibes un aviso en WhatsApp.',
        },
        '3': {
          label: 'Resultado',
          title: 'Respondes en minutos',
          text: 'El visitante recibe un correo de confirmación y tú haces el seguimiento mientras el interés está alto.',
        },
      },
      name: 'Integraciones',
      shortDescription:
        'Formularios, email marketing, WhatsApp, pagos y mucho más.',
      tagline: 'Haz que todo funcione junto',
      heroTitle: 'Integraciones que conectan tu sitio con tu negocio',
      intro:
        'Un sitio bonito es solo parte de la ecuación. Para generar resultados reales, debe hablar con las herramientas que ya usas: email, CRM, pagos, notificaciones y más. Para eso sirven las integraciones.',
      introP2:
        'Conecto tu sitio con los servicios que mueven tu negocio — automatizando tareas, reduciendo errores y asegurando que ningún cliente potencial se pierda.',
      benefitsTitle: 'Por qué integrar tus sistemas',
      benefits: {
        '1': {
          title: 'Fin del trabajo manual',
          text: 'Los datos circulan automáticamente entre tu sitio y tus herramientas.',
        },
        '2': {
          title: 'Ningún cliente perdido',
          text: 'Cada envío de formulario llega al lugar correcto, al instante.',
        },
        '3': {
          title: 'Seguimiento automatizado',
          text: 'Emails y mensajes se disparan automáticamente por las acciones del visitante.',
        },
        '4': {
          title: 'Datos en un solo lugar',
          text: 'Todo lo que necesitas, sincronizado en tu CRM, hoja de cálculo o panel.',
        },
      },
      detailsTitle: 'Qué puedo conectar',
      details: {
        '1': {
          title: 'Formularios y email marketing',
          text: 'Formularios de contacto que alimentan tu lista de email, automatizaciones y secuencias.',
        },
        '2': {
          title: 'WhatsApp y notificaciones',
          text: 'Alertas instantáneas para que nunca pierdas un cliente, por WhatsApp, email o Telegram.',
        },
        '3': {
          title: 'Pagos y analítica',
          text: 'Checkout, enlaces de pago, píxel y analítica para tus campañas.',
        },
      },
      processTitle: 'Cómo funciona el proceso',
      process: {
        '1': {
          title: 'Auditoría',
          text: 'Listamos las herramientas que usas y qué necesita comunicarse entre sí.',
        },
        '2': {
          title: 'Plan',
          text: 'Propongo la arquitectura más simple que resuelve tu problema.',
        },
        '3': {
          title: 'Construcción',
          text: 'Las integraciones se implementan y prueban de extremo a extremo.',
        },
        '4': {
          title: 'Soporte',
          text: 'Recibes documentación y soporte para todo lo entregado.',
        },
      },
      faqTitle: 'Preguntas frecuentes',
      faqs: {
        '1': {
          q: '¿Qué herramientas soportas?',
          a: 'Las más populares: Google Sheets, Mailchimp, WhatsApp, Stripe, Mercado Pago, Telegram y más.',
        },
        '2': {
          q: '¿Integras herramientas que ya uso?',
          a: 'Sí. Trabajo con lo que ya tienes y evito costos innecesarios.',
        },
        '3': {
          q: '¿Es seguro?',
          a: 'Sí. Sigo buenas prácticas de seguridad y nunca guardo datos sensibles sin necesidad real.',
        },
      },
      ctaTitle: 'Conectemos tus sistemas',
      ctaSubtitle: 'Dime qué usas y haré que todo hable entre sí.',
    },
  },
  queens: {
    queens: 'Reinas',
    level: 'Nivel',
    'level-1': 'Principiante',
    'level-2': 'Fácil',
    'level-3': 'Medio',
    'level-4': 'Difícil',
    'level-5': 'Experto',
    'new-game': 'Nuevo Juego',
    hint: 'Pista',
    congratulations: '¡Felicidades! Puzzle resuelto!',
    'queens-placed': 'reinas colocadas',
    'check-errors': 'Verifique violaciones de reglas',
    loading: 'Cargando...',
    'how-to-play': 'Cómo Jugar',
    'rule-row': 'Coloca exactamente una reina en cada fila.',
    'rule-col': 'Coloca exactamente una reina en cada columna.',
    'rule-region': 'Coloca exactamente una reina en cada región de color.',
    'rule-adjacent': 'Dos reinas no pueden tocarse, ni en diagonal.',
    'tip-tap':
      'Toca una vez para marcar ✕, otra para colocar ♫, otra para limpiar.',
    'tip-x':
      'Desliza el dedo sobre las celdas para marcar varias con ✕ rápidamente.',
    'tip-slide':
      'Usa marcas ✕ para señalar celdas que sabes que no tienen reina.',
    'faq-title': 'Preguntas Frecuentes',
    'faq-q1': '¿Qué es el juego Reinas?',
    'faq-a1':
      'Reinas es un puzzle de lógica donde colocas reinas en el tablero de modo que cada fila, columna y región de color contenga exactamente una reina, y ninguna se toque.',
    'faq-q2': '¿Cómo se juega?',
    'faq-a2':
      'Toca una celda para alternar entre: ✕ marca → ♫ reina → vacío. Desliza el dedo por el tablero para marcar varias celdas con ✕ rápidamente. Las violaciones se señalan en rojo.',
    'faq-q3': '¿Qué pasa si me equivoco?',
    'faq-a3':
      'Las reinas en conflicto se resaltan en rojo. Revisa y ajusta hasta cumplir todas las reglas. ¡No hay límite de movimientos!',
    'faq-q4': '¿Hay un puzzle nuevo cada día?',
    'faq-a4':
      '¡Sí! El tablero se genera diariamente según la fecha actual, ofreciendo un nuevo desafío cada día. ¡Comparte tus resultados!',
    'seo-title': 'Juega Reinas — Puzzle de Lógica Diario',
    'seo-p1':
      'Reinas es un puzzle de lógica diario inspirado en el problema clásico de las N-Reinas. Coloca reinas en el tablero siguiendo cuatro reglas simples: una por fila, una por columna, una por región de color, y ninguna puede tocarse.',
    'seo-p2':
      'Elige entre 5 niveles de dificultad — Principiante (5×5), Fácil (6×6), Medio (7×7), Difícil (8×8) y Experto (10×10). Cada puzzle se genera determinísticamente a partir de la fecha.',
    'seo-p3':
      'Juega en línea gratis, sin registro. Entrena tu razonamiento lógico y reconocimiento de patrones. ¡Un nuevo puzzle te espera cada día!',
  },
  sudoku: {
    sudoku: 'Sudoku',
    size: 'Cuadrícula',
    'size-4': '4×4 Mini',
    'size-6': '6×6',
    'size-9': '9×9 Clásico',
    difficulty: 'Dificultad',
    'difficulty-0': 'Fácil',
    'difficulty-1': 'Medio',
    'difficulty-2': 'Difícil',
    'new-game': 'Nuevo Juego',
    notes: 'Notas',
    eraser: 'Borrar',
    undo: 'Deshacer',
    hint: 'Pista',
    mistakes: 'Errores',
    congratulations: '¡Felicidades! Puzzle resuelto!',
    loading: 'Cargando...',
    'keyboard-hint':
      'Consejo: usa las flechas del teclado para moverte por la cuadrícula, los números para rellenar, N para alternar notas y Delete para borrar.',
    'how-to-play': 'Cómo Jugar',
    'rule-1':
      'Cada fila debe contener cada número del 1 al N exactamente una vez.',
    'rule-2':
      'Cada columna debe contener cada número del 1 al N exactamente una vez.',
    'rule-3':
      'Cada bloque resaltado debe contener cada número del 1 al N exactamente una vez.',
    'tip-1':
      'Empieza por los bloques que ya tienen más números y busca, en cada fila, columna y bloque, celdas con un único valor posible.',
    'tip-2':
      'Usa las Notas para apuntar números candidatos. Aparecen como dígitos pequeños y te ayudan a seguir las posibilidades.',
    'tip-3':
      'Juega con el ratón, la pantalla táctil o el teclado. Los números repetidos en la misma fila, columna o bloque se resaltan en rojo.',
    'strategy-title': 'Consejos y Estrategias',
    'strategy-p1':
      'Busca candidatos únicos: si solo un número cabe en una celda, escríbelo ya. Es la técnica más importante para principiantes.',
    'strategy-p2':
      'Analiza filas, columnas y bloques buscando números que faltan. Cuando un número ya está en dos bloques de una fila, el tercero suele regalarte una pista.',
    'strategy-p3':
      'Usa marcas de lápiz. Apunta todos los números posibles en cada celda y elimínalos uno a uno mientras resuelves. Así los puzzles difíciles se vuelven manejables.',
    'strategy-p4':
      'Practica un poco cada día. Jugar Sudoku con regularidad mejora la concentración, el reconocimiento de patrones y la memoria a corto plazo — y además relaja.',
    'faq-title': 'Preguntas Frecuentes',
    'faq-q1': '¿Qué es el Sudoku?',
    'faq-a1':
      'El Sudoku es un puzzle de lógica basado en números. El objetivo es completar la cuadrícula para que cada fila, columna y bloque contenga cada número del 1 al N exactamente una vez. No hace falta matemática, solo lógica.',
    'faq-q2': '¿Cómo juego al Sudoku?',
    'faq-a2':
      'Elige el tamaño de la cuadrícula (4×4, 6×6 o 9×9), selecciona una dificultad y toca cualquier celda para seleccionarla. Después escribe un número con el teclado en pantalla o el del ordenador. Cada puzzle tiene exactamente una solución.',
    'faq-q3': '¿Qué significan los tamaños de cuadrícula?',
    'faq-a3':
      '4×4 es un mini-Sudoku perfecto para principiantes y niños, 6×6 es un reto compacto y 9×9 es el Sudoku clásico que se juega en todo el mundo. Cada tamaño usa números del 1 al N.',
    'faq-q4': '¿El Sudoku es bueno para el cerebro?',
    'faq-a4':
      'Sí. El Sudoku entrena el razonamiento lógico, la concentración y la memoria, y los estudios sugieren que resolver puzzles con regularidad mantiene la mente despierta. También es un descanso tranquilo y productivo lejos de las redes sociales.',
    'faq-q5': '¿Este Sudoku es realmente gratis?',
    'faq-a5':
      'Sí, 100% gratis. Sin registro, sin descargas y sin límite de tiempo. Puedes jugar Sudoku en línea directamente en tu navegador, en cualquier dispositivo.',
    'seo-title':
      'Juega Sudoku en Línea — Generador de Mini Sudoku Gratis',
    'seo-p1':
      'Bienvenido a nuestro generador de Sudoku en línea gratis. Juega Sudoku en línea en tu navegador con tres tamaños de cuadrícula — 4×4 mini, 6×6 y el clásico 9×9 — y tres niveles de dificultad, de calentamientos fáciles a retos difíciles.',
    'seo-p2':
      'Cada juego se genera al instante con una solución única, así que siempre obtienes un puzzle justo y resoluble. Elige tu cuadrícula favorita, ajusta la dificultad y haz clic en Nuevo Juego para recibir un tablero nuevo en un segundo.',
    'seo-p3':
      'El Sudoku es uno de los puzzles de lógica más populares del mundo. Entrena el razonamiento, afila la concentración y es perfecto para un descanso corto. Y lo mejor: nuestro Sudoku funciona en el móvil, la tableta y el ordenador sin instalar nada.',
    'seo-p4':
      'Tanto si quieres enseñar a los niños con una mini cuadrícula 4×4, calentar con un 6×6 fácil o ponerte a prueba con un 9×9 difícil, puedes jugar Sudoku en línea aquí en cualquier momento. Notas, pistas, deshacer, atajos de teclado y resaltado de errores hacen que cada partida sea fácil de disfrutar.',
    'seo-p5':
      'Guarda esta página en marcadores y vuelve siempre que necesites un entrenamiento mental. Juega Sudoku en línea gratis, mejora tu lógica y diviértete — una cuadrícula a la vez.',
  },
  wordLadder: {
    name: 'Escalera de Palabras',
    home: 'Inicio',
    intro:
      'Cambia una letra a la vez para transformar la palabra inicial en la palabra objetivo. Cada paso debe ser una palabra real en inglés. Juega gratis en tu navegador, con puzzles diarios y tres niveles de dificultad.',
    mode: 'Modo',
    'mode-classic': 'Clásico',
    'mode-daily': 'Diario',
    difficulty: 'Dificultad',
    'difficulty-easy': 'Fácil',
    'difficulty-medium': 'Media',
    'difficulty-hard': 'Difícil',
    'daily-today': 'La Escalera de Palabras de hoy',
    'new-game': 'Nuevo Juego',
    moves: 'Movimientos',
    best: 'Récord',
    target: 'Objetivo',
    time: 'Tiempo',
    'daily-done':
      'Ya resolviste el puzzle de hoy. ¡Vuelve mañana para uno nuevo!',
    start: 'Inicio',
    'your-move': 'Tu próxima palabra',
    'input-placeholder': 'PALABRA',
    submit: 'Ir',
    hint: 'Pista',
    undo: 'Deshacer',
    'start-game': 'Empezar',
    'err-empty': 'Escribe primero una palabra.',
    'err-length':
      'La palabra debe tener el mismo largo que la palabra inicial.',
    'err-dictionary':
      'Esa palabra no está en nuestro diccionario. Prueba otra.',
    'err-one-letter': 'Cambia exactamente una letra.',
    'hint-text':
      'Piensa en una palabra que esté a una letra de tu palabra actual.',
    'hint-1': 'Tu próxima palabra empieza con {letter}.',
    'hint-2': 'Intenta cambiar la letra en la posición {position}.',
    'hint-3': 'Una próxima palabra posible es {word}.',
    'live-move': 'Ahora estás en {word}.',
    'live-undo': 'Movimiento deshecho.',
    complete: '¡Escalera de Palabras completada!',
    'result-moves':
      'Transformaste la palabra inicial en la palabra objetivo. ¡Excelente!',
    'result-optimal':
      'La próxima vez intenta terminar con el menor número de movimientos.',
    'daily-streak': 'Racha diaria:',
    'play-again': 'Jugar de nuevo',
    'next-puzzle': 'Siguiente puzzle',
    share: 'Compartir',
    'share-copied': 'Resultado copiado al portapapeles.',
    'how-to-play': 'Cómo jugar a la Escalera de Palabras',
    'rule-1':
      'Empieza con la palabra azul en la parte superior de la escalera.',
    'rule-2':
      'Escribe una palabra nueva que difiera de tu palabra actual en exactamente una letra.',
    'rule-3':
      'Cada palabra que escribas debe ser una palabra real en inglés.',
    'rule-4':
      'Sigue, paso a paso, hasta llegar a la palabra objetivo en ámbar.',
    'rule-5':
      'Intenta terminar con el menor número de movimientos para batir tu récord.',
    'rules-title': 'Reglas oficiales de la Escalera de Palabras',
    'rules-p1':
      'Una escalera de palabras se resuelve cuando transformas la palabra inicial en la palabra objetivo usando solo palabras reales, cambiando exactamente una letra en cada paso. Por ejemplo, CAT → COT → COG → DOG.',
    'rules-p2':
      'Puedes cambiar la posición de la letra y su valor, pero solo una letra puede cambiar por movimiento. Puedes usar una pista (hasta tres por partida) si te atascas, y deshacer un movimiento en cualquier momento.',
    'rules-p3':
      'En el modo Clásico eliges la dificultad y juegas tantos puzzles como quieras. En el modo Diario hay un puzzle compartido al día, y completarlo mantiene viva tu racha.',
    'tips-title': 'Consejos y estrategias',
    'tip-1':
      'Concéntrate en las vocales. Las palabras que difieren por una sola vocal casi siempre son válidas, y las vocales abren más caminos.',
    'tip-2':
      'Trabaja también hacia atrás desde la palabra objetivo. Muchas veces el mejor camino se ve claro cuando planificas desde ambos extremos.',
    'tip-3':
      'Ten en cuenta las posiciones de las letras. Cambiar una letra cerca del final de la palabra suele dejar más opciones.',
    'tip-4':
      'Busca patrones comunes como -ATE, -ING o -IDE. Reutilizar un patrón te permite cruzar varias palabras rápido.',
    'tip-5':
      'Usa tus tres pistas con sabiduría. La última revela la próxima palabra exacta, algo muy valioso en puzzles difíciles.',
    'whatis-title': '¿Qué es una Escalera de Palabras?',
    'whatis-p1':
      'La escalera de palabras es un juego de palabras inventado por Lewis Carroll en 1877, que lo llamó Doublets. Empiezas con dos palabras del mismo largo y las conectas mediante una cadena de palabras reales, cambiando una letra a la vez.',
    'whatis-p2':
      'Por ejemplo, transformar COLD en WARM puede ser COLD → CORD → WORD → WARD → WARM. El juego es popular en las aulas porque desarrolla ortografía, vocabulario y razonamiento lógico de forma divertida.',
    'levels-title': 'Niveles de dificultad',
    'levels-easy': 'Fácil:',
    'levels-easy-p':
      'Cadenas cortas de 2 a 4 movimientos entre palabras muy comunes. Perfecto para niños y principiantes.',
    'levels-medium': 'Media:',
    'levels-medium-p':
      'Cadenas de 5 a 7 movimientos. Un buen entrenamiento diario para jugadores habituales.',
    'levels-hard': 'Difícil:',
    'levels-hard-p':
      'Cadenas largas de 8 movimientos o más. Solo los fans más afilados de las palabras las resolverán.',
    'kids-title': 'Escalera de Palabras para niños',
    'kids-p1':
      'Las escaleras de palabras son una actividad fantástica para niños que están aprendiendo a leer y deletrear. Cada movimiento exige comparar letras, pronunciar palabras y pensar en el vocabulario, todo mientras juegan.',
    'kids-p2':
      'Haz que los niños empiecen en el modo Fácil, donde palabras cortas como CAT y DOG se conectan en pocos movimientos. Es una actividad tranquila, apta para pantallas y, en secreto, educativa.',
    'faq-title': 'Preguntas frecuentes',
    'faq-q1': '¿Qué es el juego de la Escalera de Palabras?',
    'faq-a1':
      'Una escalera de palabras es un puzzle en el que transformas una palabra en otra cambiando una sola letra a la vez, usando una palabra real en cada paso. Fue inventado por Lewis Carroll en 1877.',
    'faq-q2': '¿Cómo se juega a la Escalera de Palabras?',
    'faq-a2':
      'Empieza por la palabra inicial azul y escribe palabras que difieran de la anterior en exactamente una letra. Sigue hasta llegar a la palabra objetivo en ámbar. Cuantos menos movimientos, mejor.',
    'faq-q3': '¿Cuáles son las reglas de la Escalera de Palabras?',
    'faq-a3':
      'Cada movimiento cambia exactamente una letra, y cada palabra debe ser una palabra real en inglés del mismo largo que las palabras inicial y objetivo. No puedes repetir una palabra que ya está en tu escalera.',
    'faq-q4':
      '¿Se puede cambiar más de una letra en una escalera de palabras?',
    'faq-a4':
      'No. Exactamente una letra puede cambiar por movimiento. Cambiar dos o más letras a la vez rompe las reglas del puzzle.',
    'faq-q5': '¿Qué hace difícil una escalera de palabras?',
    'faq-a5':
      'La dificultad depende de la distancia entre las dos palabras, de cuántas palabras reales existen entre ellas y de lo fácil que es quedarse atrapado en callejones sin salida.',
    'faq-q6': '¿Las escaleras de palabras son buenas para los niños?',
    'faq-a6':
      'Sí. Las escaleras de palabras se usan mucho en las escuelas para practicar ortografía, correspondencia letra-sonido y vocabulario, y son una actividad de pantalla tranquila y educativa.',
    'faq-q7': '¿Este juego de Escalera de Palabras es gratuito?',
    'faq-a7':
      'Sí, completamente gratuito. Sin registro, sin descargas y sin límite de tiempo. Juega en tu navegador en cualquier dispositivo, incluido el móvil.',
    'related-title': 'Más juegos gratuitos en línea',
    'related-p':
      'Si te gustan los juegos de palabras, prueba nuestros otros juegos de lógica gratuitos — todos funcionan en móvil y escritorio.',
    'related-sudoku':
      'El clásico juego de lógica con tres tamaños de cuadrícula.',
    'related-queens':
      'Un puzzle de colocación diario inspirado en las N-Reinas.',
  },
};
