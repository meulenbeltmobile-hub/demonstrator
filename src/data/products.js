// Content managed via AAIA Configurator
const products = [
  {
    id: 4,
    categories: ['prepare'],
    languages: ['en', 'fr'],
    avatar: { type: 'image', url: 'clement.marinho.png' },
    name: 'Clément Marinho',
    shortTitle: {
      en: 'SEO Software',
      fr: 'Logiciel SEO',
    },
    title: {
      en: 'Automated SaaS solution for SEO optimization',
      fr: 'Optimisation SEO de Site Web',
      de: 'Website-SEO-Optimierung',
    },
    bio: {
      en: 'Clément has worked extensively in SEO and GEO for 5 years and co-founded Nazars.\nHe is an early adoptor of vibecoding and created several applications based on his in-depth domain know-how. Now is the time to scale up.  ',
      fr: 'Clément a beaucoup travaillé dans le SEO et le GEO pendant 5 ans et a co-fondé Nazars.\nIl est un des premiers à adopter le vibecoding et a créé plusieurs applications basées sur son savoir-faire approfondi dans le domaine. Il est maintenant temps de passer à l\'échelle supérieure.',
    },
    why: {
      en: 'Indepth SEO / GEO business knowledge thanks to working many years with customers, successfully generating traffic and leads for 20+ companies.',
      fr: 'Une grande expertise métier du référencement SEO et GEO grâce à de nombreuses années de travail avec les clients, générant avec succès du trafic et des prospects pour plus de 20 entreprises.',
    },
    shortDesc: {
      en: 'SEO analytics at a fraction of the cost a service provider would normally charge.',
      fr: 'Analyse SEO à une fraction du coût qu\'un fournisseur de services facturerait normalement.',
      de: 'Automatisierte SEO & GEO-Analyse mit detailliertem Website-Bericht und Expertenberatung.',
    },
    longDesc: {
      en: 'Clement: please provide a description of the solution',
      fr: 'Clément à fournir',
    },
    fullDesc: {
      en: 'Free 30-minute onboarding session\n20% discount during first 3 months of SaaS platform',
      fr: 'Séance d\'intégration gratuite de 30 minutes\n20% de réduction pendant les 3 premiers mois de la plateforme SaaS',
      de: 'Clément arbeitet seit 5 Jahren intensiv in SEO und GEO und hat automatisierte Dienste entwickelt. Die Setup-Gebühr umfasst eine detaillierte Website-Analyse und eine 30-minütige Besprechung der Ergebnisse mit Aktionsplan.',
    },
    ctaLabel: {
      en: 'Book a meeting',
      fr: 'Réserver un rendez-vous',
    },
    cta2Label: {
      en: 'Visit website',
      fr: 'Voir le site internet',
    },
    price: '',
    link: 'https://www.linkedin.com/in/clement-marinho-consultant-seo/',
  },
  {
    id: 1780483028013,
    categories: ['think'],
    languages: ['en', 'fr'],
    avatar: { type: 'image', url: 'nicolas.brequigny.png' },
    name: 'Nicolas Brequigny',
    shortTitle: {
      en: 'Landing page design',
      fr: 'Conception de la page d\'atterrissage',
    },
    title: {
      en: 'Product market alignment',
      fr: 'Alignement du marché des produits',
    },
    bio: {
      en: 'Nicolas has a backgournd of marketing roles with start- and scale-ups. He created Sumito 7 years ago to provide marketing expertise.',
      fr: 'Nicolas a un arriéré de rôles marketing avec des start-ups et des scale-ups. Il a créé Sumito il y a 7 ans pour apporter son expertise marketing.',
    },
    why: {
      en: 'It is never easy to obtain a product-market fit.\nThis requires a clear and proven methodology delivered at a competitive price.',
      fr: 'Il n\'est jamais facile d\'obtenir un ajustement produit-marché.\nCela nécessite une méthodologie claire et éprouvée livrée à un prix compétitif.',
    },
    shortDesc: {
      en: 'Landing page positioning and design',
      fr: 'Positionnement et conception de la page de renvoi',
    },
    longDesc: {
      en: 'A proven methodology to position a product that is aligned with the market and communicate this clearly in a landing page.',
      fr: 'Une méthodologie éprouvée pour positionner un produit qui est aligné sur le marché et le communiquer clairement dans une page de destination.',
    },
    fullDesc: {
      en: 'Free 30-minute discovery interview',
      fr: 'Entretien découverte gratuit de 30 minutes',
    },
    ctaLabel: {
      en: 'Book a meeting',
      fr: 'Réserver un rendez-vous',
    },
    price: '',
    link: 'https://www.linkedin.com/in/nicolas-brequigny/',
  },
  {
    id: 1780489336479,
    categories: ['think'],
    languages: ['en', 'fr'],
    avatar: { type: 'image', url: 'vincent.nibart.png' },
    name: 'Vincent Nibart',
    shortTitle: {
      en: 'AI implementation consultancy',
      fr: 'Conseil en implémentation',
    },
    title: {
      en: 'How to get quality AI enterprise applications to run at scale',
      fr: 'Comment faire fonctionner à grande échelle des applications d\'entreprise d\'IA de qualité',
    },
    bio: {
      en: 'VIncent is co-founder of Kairntech a former researcher and has been working for 25 years in natural language technologies. He has precious hands-on experience on bringing use-cases to production, and all the technical and organizational challenges that need to be addressed.',
      fr: 'VIncent est co-fondateur de Kairntech, un ancien chercheur qui travaille depuis 25 ans dans les technologies du langage naturel. Il possède une précieuse expérience pratique en matière de mise en production de cas d\'utilisation et de tous les défis techniques et organisationnels à relever.',
    },
    why: {
      en: 'Hands-on experience on all that is required to obtain high-quality and impactful AI applications in production.',
      fr: 'Expérience pratique sur tout ce qui est nécessaire pour obtenir des applications d\'IA de haute qualité et percutantes en production.',
    },
    shortDesc: {
      en: 'Consultancy on AI implementation',
      fr: 'Conseil sur la mise en œuvre de l\'IA',
    },
    longDesc: {
      en: 'Full review of how internal documents, audio and video are organized (Sharepoint, CMS...) to establish a semantic enrichment strategy. Review of AI Pipelines, technologies (LLMs) and processes, quality measurement and control, project KPIs (end user adoption metrics), assessment of resources.',
      fr: 'Revue complète de l\'organisation des documents internes, audio et vidéo (Sharepoint, CMS…) pour établir une stratégie d\'enrichissement sémantique. Revue des pipelines d\'IA, des technologies (LLM) et des processus, de la mesure et du contrôle de la qualité, des KPI du projet (mesures d\'adoption par l\'utilisateur final), de l\'évaluation des ressources.',
    },
    fullDesc: {
      en: '50% off first hour of consultancy',
      fr: '50 % de réduction sur la première heure de consultation',
    },
    ctaLabel: {
      en: 'Book a meeting',
      fr: 'Réserver un rendez-vous',
    },
    ctaUrl: {
      en: 'https://calendly.com/vincent-nibart-kairntech/30min?month=2026-06',
    },
    price: '',
    link: 'https://www.linkedin.com/in/vincentnibart/',
  },
  {
    id: 1780581122694,
    categories: ['build'],
    languages: ['en', 'fr', 'de'],
    avatar: { type: 'logo', url: 'logo-kairntech.png' },
    name: 'Kairntech',
    shortTitle: {
      en: 'Kairntech starter pack',
      fr: 'Pack DE démarrage Kairntech',
      de: 'Kairntech-Starterpaket',
    },
    title: {
      en: 'Consultancy + demonstration + first experiment',
      fr: 'Conseil + démonstration + première expérience',
      de: 'Beratung + Demonstration + erstes Experiment',
    },
    bio: {
      en: 'Kairntech is a company founded in 2019 by a tech team with 25+ years of experience in natural language technologies. The company successufly creates and deploys in production enterprise applications for teams (HR, purchasing, compliance, sales, marketing...).',
      fr: 'Kairntech est une société fondée en 2019 par une équipe technique avec plus de 25ans d\'expérience dans les technologies du langage naturel. L\'entreprise crée et déploie avec succès en production des applications d\'entreprise pour les équipes (RH, achats, conformité, ventes, marketing…).',
      de: 'Kairntech ist ein Unternehmen, das 2019 von einem Tech-Team mit mehr als 25Jahren Erfahrung in natürlichen Sprachtechnologien gegründet wurde. Das Unternehmen erstellt und implementiert erfolgreich in der Produktion Unternehmensanwendungen für Teams (HR, Einkauf, Compliance, Vertrieb, Marketing...).',
    },
    why: {
      en: 'Kairntech offers a unique combination of hands-on AI expertise for enterprise application combined with a production-ready API server and a self-service studio.',
      fr: 'Kairntech offre une combinaison unique d\'expertise pratique en IA pour les applications d\'entreprise, combinée à un serveur API prêt pour la production et à un studio en libre-service.',
      de: 'Kairntech bietet eine einzigartige Kombination aus praktischem KI-Know-how für Unternehmensanwendungen in Kombination mit einem produktionsbereiten API-Server und einem Self-Service-Studio.',
    },
    shortDesc: {
      en: 'Kairntech starter pack',
      fr: 'Pack DE démarrage Kairntech',
      de: 'Kairntech-Starterpaket',
    },
    longDesc: {
      en: 'Kairntech offers an enterprise-ready AI deployment server that can be deployed on premise. In addition a no-code Studio offers full autonomy to domain experts to experiment and customize AI pipelines. A great strength is the expertise in semantic enrichment, a prerequisite for accuracy, end-user adoption and ROI.',
      fr: 'Kairntech propose un serveur de déploiement d\'IA prêt pour l\'entreprise qui peut être déployé sur site. De plus, un studio sans code offre une autonomie totale aux experts du domaine pour expérimenter et personnaliser les pipelines d\'IA. Une grande force est l\'expertise dans l\'enrichissement sémantique, une condition préalable à la précision, à l\'adoption par l\'utilisateur final et au retour sur investissement.',
      de: 'Kairntech bietet einen unternehmensfähigen KI-Bereitstellungsserver, der vor Ort bereitgestellt werden kann. Darüber hinaus bietet ein No-Code-Studio Domänenexperten volle Autonomie beim Experimentieren und Anpassen von KI-Pipelines. Eine große Stärke ist das Know-how in der semantischen Anreicherung, eine Voraussetzung für Genauigkeit, Endbenutzerakzeptanz und ROI.',
    },
    fullDesc: {
      en: 'Free 30 minute discusion\nTypical budget: 5 - 10K Euro',
      fr: 'Discusion gratuite de 30 minutes\nBudget typique : 5 à 10 000 euros',
      de: 'Kostenlose 30-minütige Discusion\nTypisches Budget: 5 - 10.000 Euro',
    },
    ctaLabel: {
      en: 'Book a meeting',
      fr: 'Réserver un rendez-vous',
      de: 'Buchen Sie ein Meeting',
    },
    ctaUrl: {
      en: 'https://calendly.com/vincent-nibart-kairntech/30min?month=2026-06',
    },
    price: '',
    link: 'http://kairntech.com',
  },
];

export default products;
