export const electricianProjectTemplate = `<!DOCTYPE html><html lang="pt-BR"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>VOLT &amp; WIRE - Eletricista</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700;800&amp;family=Source+Serif+4:wght@400;600&amp;display=swap" rel="stylesheet">
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Config -->
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "outline-variant": "#d1c6ab",
                    "inverse-primary": "#eec200",
                    "primary-fixed": "#ffe083",
                    "on-tertiary-container": "#51596f",
                    "tertiary-fixed-dim": "#bec6e0",
                    "on-tertiary-fixed-variant": "#3f465c",
                    "on-surface-variant": "#4d4632",
                    "secondary-fixed-dim": "#b6c4ff",
                    "surface-tint": "#735c00",
                    "on-secondary-container": "#1d3989",
                    "on-tertiary": "#ffffff",
                    "background": "#f7f9fb",
                    "on-secondary-fixed-variant": "#264191",
                    "on-tertiary-fixed": "#131b2e",
                    "on-primary-fixed-variant": "#574500",
                    "secondary-fixed": "#dce1ff",
                    "error-container": "#ffdad6",
                    "surface-dim": "#d8dadc",
                    "primary": "#735c00",
                    "secondary": "#4059aa",
                    "inverse-on-surface": "#eff1f3",
                    "on-secondary": "#ffffff",
                    "on-primary-container": "#6c5700",
                    "inverse-surface": "#2d3133",
                    "on-primary": "#ffffff",
                    "outline": "#7f7660",
                    "surface-container": "#eceef0",
                    "error": "#ba1a1a",
                    "surface-container-highest": "#e0e3e5",
                    "on-background": "#191c1e",
                    "on-error-container": "#93000a",
                    "secondary-container": "#8fa7fe",
                    "primary-container": "#facc15",
                    "surface-container-low": "#f2f4f6",
                    "surface-variant": "#e0e3e5",
                    "on-surface": "#191c1e",
                    "tertiary": "#565e74",
                    "surface": "#f7f9fb",
                    "surface-container-lowest": "#ffffff",
                    "tertiary-container": "#c9d0ea",
                    "on-secondary-fixed": "#00164e",
                    "primary-fixed-dim": "#eec200",
                    "surface-container-high": "#e6e8ea",
                    "on-primary-fixed": "#231b00",
                    "tertiary-fixed": "#dae2fd",
                    "on-error": "#ffffff",
                    "surface-bright": "#f7f9fb"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "section-gap-mobile": "64px",
                    "grid-margin": "24px",
                    "container-max": "1280px",
                    "base": "8px",
                    "grid-gutter": "24px",
                    "section-gap-desktop": "128px"
            },
            "fontFamily": {
                    "headline-sm": [
                            "Hanken Grotesk"
                    ],
                    "label-sm": [
                            "Hanken Grotesk"
                    ],
                    "body-md": [
                            "\\"Source Serif 4\\""
                    ],
                    "display-lg": [
                            "Hanken Grotesk"
                    ],
                    "body-lg": [
                            "\\"Source Serif 4\\""
                    ],
                    "label-bold": [
                            "Hanken Grotesk"
                    ],
                    "display-lg-mobile": [
                            "Hanken Grotesk"
                    ],
                    "headline-md": [
                            "Hanken Grotesk"
                    ]
            },
            "fontSize": {
                    "headline-sm": [
                            "24px",
                            {
                                    "lineHeight": "32px",
                                    "fontWeight": "700"
                            }
                    ],
                    "label-sm": [
                            "12px",
                            {
                                    "lineHeight": "16px",
                                    "fontWeight": "500"
                            }
                    ],
                    "body-md": [
                            "16px",
                            {
                                    "lineHeight": "24px",
                                    "fontWeight": "400"
                            }
                    ],
                    "display-lg": [
                            "64px",
                            {
                                    "lineHeight": "72px",
                                    "letterSpacing": "-0.02em",
                                    "fontWeight": "800"
                            }
                    ],
                    "body-lg": [
                            "20px",
                            {
                                    "lineHeight": "32px",
                                    "fontWeight": "400"
                            }
                    ],
                    "label-bold": [
                            "14px",
                            {
                                    "lineHeight": "20px",
                                    "letterSpacing": "0.05em",
                                    "fontWeight": "700"
                            }
                    ],
                    "display-lg-mobile": [
                            "40px",
                            {
                                    "lineHeight": "48px",
                                    "letterSpacing": "-0.01em",
                                    "fontWeight": "800"
                            }
                    ],
                    "headline-md": [
                            "32px",
                            {
                                    "lineHeight": "40px",
                                    "fontWeight": "700"
                            }
                    ]
            }
    },
        },
      }
    </script>

<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        /* Custom thick divider for sections */
        .section-divider {
            height: 8px;
            background-color: theme('colors.secondary');
            width: 100%;
        }

        /* Voltage pattern texture for transition areas if needed */
        .voltage-pattern {
            background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px);
        }

        /* Details/Summary overrides */
        details > summary {
            list-style: none;
        }
        details > summary::-webkit-details-marker {
            display: none;
        }
    </style>
</head>
<body class="bg-background text-on-background font-body-md antialiased pb-24 md:pb-0 pt-16">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 flex justify-between items-center h-16 px-grid-margin bg-surface border-b-4 border-secondary">
<div class="flex items-center gap-4">
<span aria-hidden="true" class="material-symbols-outlined text-primary text-3xl">bolt</span>
</div>
<div class="font-display-lg-mobile text-display-lg-mobile font-extrabold text-primary tracking-tighter text-2xl">
            VOLT &amp; WIRE
        </div>
<button aria-label="Menu" class="p-2 hover:bg-primary-container hover:text-on-primary-fixed active:translate-y-1 transition-transform rounded">
<span aria-hidden="true" class="material-symbols-outlined text-primary text-3xl">menu</span>
</button>
</header>
<main class="w-full">
<!-- Hero Section -->
<section class="relative min-h-[80vh] flex flex-col justify-center px-grid-margin py-16 bg-surface">
<!-- Background Image Placeholder using exact token -->
<div aria-hidden="true" class="absolute inset-0 z-0 bg-cover bg-center" style="background-image: url(&quot;https://lh3.googleusercontent.com/aida/AP1WRLtb0moUEM9QMlEhdckTFdKolESQgqHXnfKlqCUf2GDZlFl-WWtGSda8Myzo_wDXi3of9DboDZFJsVK9qGI906MtB85tfjHa6h5wFMrvPcaTvKMCjAG0D_xRI1rMOZaLq8XRyUvdrqvQ3CpGJvDxJX9GmCtW5NVVBo9aqz1y3byHQiGOR7bvMEQu7mRjZNdIz_QDnn-5vxbKfxuKos5cBL4YoIiSqGwMh4h20tVQ9ocp8n8tuuqELGcQYQ&quot;);"><div class="absolute inset-0 bg-on-background opacity-40"></div></div>
<div class="relative z-10 max-w-container-max mx-auto w-full">
<h1 class="font-display-lg-mobile text-display-lg-mobile mb-6 max-w-2xl text-surface" style="opacity: 0;">Eletricista: Soluções em Instalações Elétricas</h1>
<p class="font-body-lg text-body-lg mb-10 max-w-xl text-surface-variant">
                    Segurança e modernidade para seu imóvel residencial ou comercial.
                </p>
<button class="bg-primary-container text-on-primary-container font-label-bold text-label-bold px-8 py-4 border-2 border-on-primary-container uppercase hover:bg-primary-fixed-dim active:translate-y-1 transition-transform inline-flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(25,28,30,1)]">
<span aria-hidden="true" class="material-symbols-outlined">bolt</span>
                    Solicitar Orçamento
                </button>
</div>
</section>
<div class="section-divider"></div>
<!-- Services Section -->
<section class="py-section-gap-mobile px-grid-margin bg-surface">
<div class="max-w-container-max mx-auto">
<div class="mb-12">
<span class="inline-block bg-primary-container text-on-primary-container font-label-bold text-label-bold px-3 py-1 border border-on-primary-container mb-4 uppercase">Nossos Serviços</span>
<h2 class="font-headline-md text-headline-md text-secondary">Soluções Completas em Eletricidade</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Service Card 1 -->
<div class="bg-surface-container-lowest p-6 border-2 border-outline hover:border-primary transition-colors flex items-start gap-4 shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="bg-primary-container p-3 rounded-none border border-outline flex-shrink-0">
<span aria-hidden="true" class="material-symbols-outlined text-on-primary-container text-3xl">domain</span>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-secondary mb-2">Instalações Prediais</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Projetos elétricos completos para condomínios e edifícios comerciais, garantindo adequação às normas vigentes e máxima segurança estrutural.</p>
</div>
</div>
<!-- Service Card 2 -->
<div class="bg-surface-container-lowest p-6 border-2 border-outline hover:border-primary transition-colors flex items-start gap-4 shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="bg-primary-container p-3 rounded-none border border-outline flex-shrink-0">
<span aria-hidden="true" class="material-symbols-outlined text-on-primary-container text-3xl">home</span>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-secondary mb-2">Instalações Residenciais</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Do quadro de distribuição às tomadas, executamos a infraestrutura elétrica da sua casa com precisão e acabamento impecável.</p>
</div>
</div>
<!-- Service Card 3 -->
<div class="bg-surface-container-lowest p-6 border-2 border-outline hover:border-primary transition-colors flex items-start gap-4 shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="bg-primary-container p-3 rounded-none border border-outline flex-shrink-0">
<span aria-hidden="true" class="material-symbols-outlined text-on-primary-container text-3xl">engineering</span>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-secondary mb-2">Manutenção Elétrica</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Diagnóstico preciso e reparo rápido de panes, curtos-circuitos e adequação de cargas para prevenir riscos de incêndio.</p>
</div>
</div>
<!-- Service Card 4 -->
<div class="bg-surface-container-lowest p-6 border-2 border-outline hover:border-primary transition-colors flex items-start gap-4 shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="bg-primary-container p-3 rounded-none border border-outline flex-shrink-0">
<span aria-hidden="true" class="material-symbols-outlined text-on-primary-container text-3xl">lightbulb</span>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-secondary mb-2">Projeto de Iluminação</h3>
<p class="font-body-md text-body-md text-on-surface-variant">Estudos luminotécnicos para otimizar o consumo de energia e valorizar a arquitetura dos ambientes com soluções em LED.</p>
</div>
</div>
</div>
</div>
</section>
<div class="section-divider bg-primary-container"></div>
<!-- Gallery Section -->
<section class="py-section-gap-mobile px-grid-margin bg-background voltage-pattern">
<div class="max-w-container-max mx-auto">
<div class="mb-12">
<span class="inline-block bg-secondary text-on-secondary font-label-bold text-label-bold px-3 py-1 border border-secondary-fixed mb-4 uppercase">Portfólio</span>
<h2 class="font-headline-md text-headline-md text-on-background">Projetos Realizados</h2>
</div>
<div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
<div class="border-2 border-outline p-2 bg-surface-container-lowest">
<img alt="Projeto 1" class="w-full h-48 md:h-64 object-cover border border-surface-dim" data-alt="A modern industrial electrical panel wiring process, showing neatly organized cables in bright primary colors against a stark white background. Sharp focus, high contrast lighting emphasizing the systematic precision of the work." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQkyoNVnFHwlSGSipX1qbxCH99OhecJo4w8rU5CPGssegEkQ8csUiiw1guws-M6VqdqBXA2ZYFNjbRGn4fjBVStUrPRcPUo2TJTyk53RfJ8d3uQPXHJmBDlPYiJ6n7TKnroTNzA9r9VAQSICXi0Pw92ryFFS5zYEFNWnR9DO9p_n-k9h6LMHECd1LhabU03IDyBVz_3IQA9pu2GvRE79PN8eOvnG5E9YxZgLNfPndhLAK3x9siw0Y">
<div class="p-3">
<p class="font-label-bold text-label-bold text-secondary">Comercial</p>
</div>
</div>
<div class="border-2 border-outline p-2 bg-surface-container-lowest">
<img alt="Projeto 2" class="w-full h-48 md:h-64 object-cover border border-surface-dim" data-alt="Close up of a skilled electrician hands installing a sleek modern wall switch in a minimalist home interior. Bright natural lighting, white walls, showing safety and attention to detail. High contrast aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc7hqwzLs6Ylg-_14yugVZ0sNPREzIEo8GdymE9tyqqflHnIwBYfpNHmBITj0nAXAkuq-cXb_DEykS8VAFPtY8VsaU8TdbnAtsvru7cuosAaXqlh4vfsXU-KFtztZ9A0fkugFxmEbJU2GUERUnXbXHe1npW-43t9HzbnPt249tR7grcWaSVMzwevq_NipVA_4XfS8KEymrePEyfT4394zg48Vq1Vf6MRye9lz2x9bdW_6xoKR0b2s">
<div class="p-3">
<p class="font-label-bold text-label-bold text-secondary">Residencial</p>
</div>
</div>
<div class="border-2 border-outline p-2 bg-surface-container-lowest">
<img alt="Projeto 3" class="w-full h-48 md:h-64 object-cover border border-surface-dim" data-alt="A striking digital installation art piece featuring glowing, generative geometric shapes suspended in a vast, minimalist gallery space. The room is illuminated by high-key, soft white lighting that creates a bright, modern light-mode aesthetic. The artwork relies on a sophisticated palette of deep blacks and pristine whites, punctuated by intense accents of vibrant red. The mood is serene yet technologically advanced." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4_gjPON0cyPw625HaioyCi9qwHRIZ6ZkCaqVtx343MrSDfk05tkiMbGvDBsHlDxcO-k_o1UkTWTlEfdlzGR8W0lkoangGf09OS9TUfNzs-9AvReiiLEeXTNTmTYAgVJhaD-9l2B16RfEb4dsVQxtUkUoUCmHOJdoEdmNgtG7v6JiVyn5KjSYtNl3L5RkmbYHwTxg3_W_n2EN0dmw2npFYmjvSAWqQsFRNqQXfHVMoQq_J2GmVuXk">
<div class="p-3">
<p class="font-label-bold text-label-bold text-secondary">Iluminação</p>
</div>
</div>
<div class="border-2 border-outline p-2 bg-surface-container-lowest">
<img alt="Projeto 4" class="w-full h-48 md:h-64 object-cover border border-surface-dim" data-alt="Wide shot of a newly constructed industrial warehouse ceiling showing extensive structural conduit work. Bright safety yellow accents against deep navy beams. Clean, organized, high-energy industrial vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-bKmK0J1-PlpaGvSOwYQgFBQpopyx3jvj7svE9QtNg4RMundPcDnrWjO0nNRrj17nQibpxi4_mWRfBYnmrrQ4x_1tUF5YP6FUjQC3wfCWWgdwYkupCxjPSRqOaXpUqvQWckKRl-zXrVqx46g_BBsM3g50kfe20BdVCx5bMKr5r0IY1Ys283tIBQYmeI6g_pMNqcaTT9v8z8YHG8DYv2lB9qXuOiGQt8eIJ99emnNGTIw2B_YTJpE">
<div class="p-3">
<p class="font-label-bold text-label-bold text-secondary">Industrial</p>
</div>
</div>
<div class="border-2 border-outline p-2 bg-surface-container-lowest">
<img alt="Projeto 5" class="w-full h-48 md:h-64 object-cover border border-surface-dim" data-alt="Detailed view of a residential smart home wiring hub being tested by a professional. High contrast, sharp execution, emphasizing modern technological integration and reliability. White background with bold technical elements." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzHrIC8ACa_zHIcH_L7zWtAw-Ji26EFzQnIw2uAYJZmpctIw-VsUJjKGApVGODJU0Jihwh278KHPX9Vt378cQOz8mgjt6KXjS4CnvLc277TqsTDW2vtkJJuLecpWjHuVUwxPOBX1UGZqFwLDBSMV6YeRzeNCgQk31deTCQHCni1IDtd0YPujg6EzifQEx9VFusKQkZpd5rOPdGqzFTt85Ir_jFlWYj2G9bGhMEa0Bnr8VVLeCXI2E">
<div class="p-3">
<p class="font-label-bold text-label-bold text-secondary">Automação</p>
</div>
</div>
<div class="border-2 border-outline p-2 bg-surface-container-lowest">
<img alt="Projeto 6" class="w-full h-48 md:h-64 object-cover border border-surface-dim" data-alt="A safety-focused image showing proper grounding techniques being applied to a large outdoor commercial electrical box. Strong directional light highlighting the safety yellow warning labels against a stark grey metallic surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEs8p9zh3PElWGYb4ooQ_gbuWwk4J3xxsuIzzN472Oaqoo4HHNaS-OT1Ta4C92r3FMdW7FGD3vfxzlLAOJE8gw3Tqt8nFDwFeCaMXYdkTFw3W7a4t4W5HU58-vT_n95DsL6sBEzU42S3I8jLnoQfa1aWVHTUgLXslmmaMel8dtQUyIzJoMWp-Iuqe8nLapQXeBJfNEABvTcktew41gVNCVtsHR5DGOuaihrAMedIwTlHzFuqxT3RY">
<div class="p-3">
<p class="font-label-bold text-label-bold text-secondary">Manutenção</p>
</div>
</div>
</div>
</div>
</section>
<div class="section-divider bg-primary"></div>
<!-- Prova Social Section -->
<section class="py-12 px-grid-margin bg-surface-container-low">
<div class="max-w-container-max mx-auto">
<div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
<div class="p-4 bg-surface-container-lowest border-2 border-outline shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="text-primary font-display-lg text-4xl mb-2 flex justify-center items-center gap-1">
<span class="">4.9</span>
<span aria-hidden="true" class="material-symbols-outlined text-2xl" data-weight="fill">star</span>
</div>
<p class="font-label-bold text-on-surface-variant uppercase text-sm">Avaliação no Google</p>
</div>
<div class="p-4 bg-surface-container-lowest border-2 border-outline shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="text-secondary font-display-lg text-4xl mb-2">
<span class="">+15</span>
</div>
<p class="font-label-bold text-on-surface-variant uppercase text-sm">Anos de Mercado</p>
</div>
<div class="p-4 bg-surface-container-lowest border-2 border-outline shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="text-secondary font-display-lg text-4xl mb-2">
<span class="">+2.5k</span>
</div>
<p class="font-label-bold text-on-surface-variant uppercase text-sm">Clientes Atendidos</p>
</div>
<div class="p-4 bg-surface-container-lowest border-2 border-outline shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="text-secondary font-display-lg text-4xl mb-2 flex justify-center items-center">
<span aria-hidden="true" class="material-symbols-outlined text-4xl">verified</span>
</div>
<p class="font-label-bold text-on-surface-variant uppercase text-sm">NR10, NR35, CREA</p>
</div>
</div>
</div>
</section>
<div class="section-divider"></div>
<!-- Depoimentos Section -->
<section class="py-section-gap-mobile px-grid-margin bg-surface">
<div class="max-w-container-max mx-auto">
<div class="mb-12 text-center">
<span class="inline-block bg-primary-container text-on-primary-container font-label-bold text-label-bold px-3 py-1 border border-on-primary-container mb-4 uppercase">Depoimentos</span>
<h2 class="font-headline-md text-headline-md text-secondary">O que dizem nossos clientes</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div class="bg-surface-container-lowest p-6 border-2 border-outline shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="flex text-primary mb-4">
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
</div>
<p class="font-body-md text-on-surface-variant mb-6">"Serviço impecável! Trocaram todo o quadro de força da minha casa com muita organização e limpeza. O preço foi justo e o atendimento excelente."</p>
<p class="font-label-bold text-secondary uppercase">- Carlos Mendes</p>
</div>
<div class="bg-surface-container-lowest p-6 border-2 border-outline shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="flex text-primary mb-4">
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
</div>
<p class="font-body-md text-on-surface-variant mb-6">"Fizeram o projeto luminotécnico da minha loja e ficou incrível. A equipe é super profissional, cumpriram o prazo e deram ótimas sugestões de economia de energia."</p>
<p class="font-label-bold text-secondary uppercase">- Mariana Silva</p>
</div>
<div class="bg-surface-container-lowest p-6 border-2 border-outline shadow-[4px_4px_0px_0px_rgba(127,118,96,0.2)]">
<div class="flex text-primary mb-4">
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
<span aria-hidden="true" class="material-symbols-outlined" data-weight="fill">star</span>
</div>
<p class="font-body-md text-on-surface-variant mb-6">"Tivemos uma emergência de madrugada na empresa e eles nos atenderam prontamente. Resolveram o curto-circuito rápido e com total segurança. Recomendo muito!"</p>
<p class="font-label-bold text-secondary uppercase">- Roberto Almeida</p>
</div>
</div>
<div class="text-center">
<a class="inline-flex items-center gap-2 text-secondary font-label-bold hover:text-primary transition-colors underline" href="#">
                    Ver todas as avaliações no Google
                    <span aria-hidden="true" class="material-symbols-outlined text-sm">open_in_new</span>
</a>
</div>
</div>
</section>
<div class="section-divider bg-primary-container"></div>
<!-- FAQ Section -->
<section class="py-section-gap-mobile px-grid-margin bg-surface">
<div class="max-w-container-max mx-auto max-w-3xl">
<div class="mb-12 text-center">
<span class="inline-block bg-primary-container text-on-primary-container font-label-bold text-label-bold px-3 py-1 border border-on-primary-container mb-4 uppercase">Informações</span>
<h2 class="font-headline-md text-headline-md text-secondary">Dúvidas Frequentes</h2>
</div>
<div class="space-y-4">
<details class="group border-2 border-outline bg-surface-container-lowest p-6 hover:border-primary transition-colors cursor-pointer" open="">
<summary class="font-headline-sm text-headline-sm text-on-background flex justify-between items-center outline-none">
                            Como funciona a garantia do serviço?
                            <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div class="mt-4 pt-4 border-t border-outline-variant font-body-md text-body-md text-on-surface-variant">
<p class="">Todos os nossos serviços contam com garantia de 90 dias para mão de obra, conforme prevê o Código de Defesa do Consumidor. Para materiais fornecidos por nós, aplica-se a garantia do fabricante. Emitimos laudo técnico e ART (Anotação de Responsabilidade Técnica) quando necessário, assegurando a total legalidade e segurança da instalação.</p>
</div>
</details>
<details class="group border-2 border-outline bg-surface-container-lowest p-6 hover:border-primary transition-colors cursor-pointer">
<summary class="font-headline-sm text-headline-sm text-on-background flex justify-between items-center outline-none">
                            Vocês realizam visitas de emergência?
                            <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div class="mt-4 pt-4 border-t border-outline-variant font-body-md text-body-md text-on-surface-variant">
<p class="">Sim, dispomos de uma equipe de plantão para atendimentos emergenciais em casos de curtos-circuitos, quedas de energia parciais ou totais na residência ou empresa, e situações de risco iminente. O tempo de resposta varia conforme a localidade, mas priorizamos chamados críticos.</p>
</div>
</details>
<details class="group border-2 border-outline bg-surface-container-lowest p-6 hover:border-primary transition-colors cursor-pointer">
<summary class="font-headline-sm text-headline-sm text-on-background flex justify-between items-center outline-none">
                            Como é calculado o preço do orçamento?
                            <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<div class="mt-4 pt-4 border-t border-outline-variant font-body-md text-body-md text-on-surface-variant">
<p class="">O orçamento é baseado na complexidade técnica do projeto, estimativa de horas trabalhadas e custo de materiais (caso o cliente opte por incluir no pacote). Realizamos uma visita técnica inicial para avaliar o escopo real do trabalho e apresentar uma proposta transparente, sem custos ocultos.</p>
</div>
</details>
</div>
</div>
</section>
</main>
<!-- Footer Section -->
<footer class="bg-inverse-surface text-inverse-on-surface py-12 px-grid-margin pb-32 md:pb-12 border-t-8 border-secondary">
<div class="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
<div class="md:col-span-1">
<div class="flex items-center gap-2 mb-4">
<span aria-hidden="true" class="material-symbols-outlined text-primary text-3xl">bolt</span>
<span class="font-display-lg-mobile text-xl font-extrabold text-primary tracking-tighter">VOLT &amp; WIRE</span>
</div>
<p class="font-body-md text-surface-variant mb-6">Sua parceira de confiança para soluções elétricas seguras e inovadoras, residenciais e comerciais.</p>
<div class="flex gap-4">
<a aria-label="Facebook" class="text-surface-variant hover:text-primary transition-colors" href="#">
<span aria-hidden="true" class="material-symbols-outlined">thumb_up</span>
</a>
<a aria-label="Instagram" class="text-surface-variant hover:text-primary transition-colors" href="#">
<span aria-hidden="true" class="material-symbols-outlined">photo_camera</span>
</a>
<a aria-label="LinkedIn" class="text-surface-variant hover:text-primary transition-colors" href="#">
<span aria-hidden="true" class="material-symbols-outlined">work</span>
</a>
</div>
</div>
<div>
<h4 class="font-label-bold uppercase text-surface mb-4">Contato</h4>
<ul class="space-y-3 font-body-md text-surface-variant">
<li class="flex items-start gap-2">
<span aria-hidden="true" class="material-symbols-outlined text-sm mt-1">location_on</span>
<span class="">Rua da Eletricidade, 123<br>Centro, São Paulo - SP</span>
</li>
<li class="flex items-center gap-2">
<span aria-hidden="true" class="material-symbols-outlined text-sm">phone</span>
<span class="">(11) 99999-9999</span>
</li>
<li class="flex items-center gap-2">
<span aria-hidden="true" class="material-symbols-outlined text-sm">mail</span>
<span class="">contato@voltandwire.com.br</span>
</li>
</ul>
</div>
<div>
<h4 class="font-label-bold uppercase text-surface mb-4">Links Úteis</h4>
<ul class="space-y-3 font-body-md text-surface-variant">
<li class=""><a class="hover:text-primary transition-colors" href="#">Sobre Nós</a></li>
<li class=""><a class="hover:text-primary transition-colors" href="#">Nossos Serviços</a></li>
<li class=""><a class="hover:text-primary transition-colors" href="#">Portfólio</a></li>
<li class=""><a class="hover:text-primary transition-colors" href="#">Solicitar Orçamento</a></li>
</ul>
</div>
<div>
<h4 class="font-label-bold uppercase text-surface mb-4">Legal</h4>
<ul class="space-y-3 font-body-md text-surface-variant">
<li class=""><a class="hover:text-primary transition-colors" href="#">Termos de Uso</a></li>
<li class=""><a class="hover:text-primary transition-colors" href="#">Política de Privacidade</a></li>
<li class=""><span class="text-surface-variant opacity-75">CNPJ: 00.000.000/0001-00</span></li>
</ul>
</div>
</div>
<div class="max-w-container-max mx-auto mt-12 pt-8 border-t border-outline font-body-md text-sm text-surface-variant text-center">
<p class="">© 2023 Volt &amp; Wire Soluções Elétricas. Todos os direitos reservados.</p>
</div>
</footer>
<!-- FAB -->
<a aria-label="Contato via WhatsApp" class="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 bg-primary-container text-on-primary-container p-4 rounded-full border-2 border-on-surface shadow-[4px_4px_0px_0px_rgba(25,28,30,1)] hover:bg-primary-fixed-dim hover:-translate-y-1 transition-all flex items-center justify-center" href="#">
<span aria-hidden="true" class="material-symbols-outlined text-3xl" data-weight="fill">chat</span>
</a>
<!-- BottomNavBar (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-20 bg-surface border-t-4 border-secondary px-4 pb-2 z-50">
<!-- Active Tab: Home -->
<a aria-current="page" class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-none p-2 border-2 border-on-surface w-16 h-14" href="#">
<span aria-hidden="true" class="material-symbols-outlined text-2xl mb-1" data-weight="fill">home</span>
<span class="font-label-bold text-[10px] uppercase tracking-wider">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 w-16 h-14 hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors" href="#services">
<span aria-hidden="true" class="material-symbols-outlined text-2xl mb-1">electrical_services</span>
<span class="font-label-bold text-[10px] uppercase tracking-wider">Services</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 w-16 h-14 hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors" href="#gallery">
<span aria-hidden="true" class="material-symbols-outlined text-2xl mb-1">construction</span>
<span class="font-label-bold text-[10px] uppercase tracking-wider">Work</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 w-16 h-14 hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors" href="#faq">
<span aria-hidden="true" class="material-symbols-outlined text-2xl mb-1">chat</span>
<span class="font-label-bold text-[10px] uppercase tracking-wider">Contact</span>
</a>
</nav>
<script>
        // Simple script to handle accordion exclusive open behavior if desired,
        // but native details/summary works well enough for this simple use case.
        const detailsElements = document.querySelectorAll('details');
        detailsElements.forEach((targetDetail) => {
            targetDetail.addEventListener('click', () => {
                detailsElements.forEach((detail) => {
                    if (detail !== targetDetail) {
                        detail.removeAttribute('open');
                    }
                });
            });
        });
    </script>


</body></html>`;
