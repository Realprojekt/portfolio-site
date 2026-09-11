export const projects = [
  {
    tech: ['Python', 'PostgreSQL', 'REST APIs', 'React', 'TypeScript'],
    repoUrl: '',
    demoUrl: '',
    highlight: true,
    en: {
      title: 'License Management System',
      description:
        'Web-based license management system that automatically monitors company licenses and notifies responsible personnel about upcoming renewals, archiving or expiration. Built as a graduation project and actively used in production.',
    },
    de: {
      title: 'Lizenzmanagement-System',
      description:
        'Webbasiertes Lizenzmanagement-System, das automatisch die Lizenzen eines Unternehmens überwacht und zuständige Mitarbeitende rechtzeitig über anstehende Verlängerungen, Archivierung oder den Ablauf benachrichtigt. Entwickelt als Abschlussprojekt und im produktiven Einsatz.',
    },
  },
  {
    tech: ['React', 'Vite', 'Custom i18n', 'Vercel'],
    repoUrl: 'https://github.com/Realprojekt/portfolio-site',
    demoUrl: 'https://portfolio-site-oeltjen.vercel.app',
    highlight: false,
    en: {
      title: 'Portfolio Website',
      description:
        'This site itself. A bilingual (DE/EN) React and Vite app with a custom i18n system, WCAG-compliant accessibility (skip links, focus states, verified contrast ratios), GDPR-compliant legal pages, and automatic CI deployment via Vercel.',
    },
    de: {
      title: 'Portfolio-Website',
      description:
        'Diese Website selbst. Eine zweisprachige (DE/EN) React- und Vite-Anwendung mit eigenem i18n-System, barrierefreier Umsetzung nach WCAG (Skip-Links, Fokuszustände, geprüfte Kontrastwerte), DSGVO-konformen rechtlichen Seiten und automatischem CI-Deployment über Vercel.',
    },
  },
  {
    tech: ['TypeScript', 'React', 'Canvas API'],
    repoUrl: '',
    demoUrl: '',
    highlight: true,
    demoKey: 'perceptron',
    en: {
      title: 'Perceptron From Scratch',
      description:
        'A single-layer perceptron implemented from scratch (no ML libraries) while learning the fundamentals of neural networks. Adjust the learning rate and batch size and watch the decision boundary converge live in the browser.',
    },
    de: {
      title: 'Perzeptron von Grund auf',
      description:
        'Ein von Grund auf implementiertes einfaches Perzeptron (ohne ML-Bibliotheken), entstanden beim Erlernen der Grundlagen neuronaler Netze. Lernrate und Batch-Größe sind einstellbar; die Entscheidungsgrenze konvergiert live im Browser.',
    },
  },
]
