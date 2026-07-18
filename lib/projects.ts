export type ProjectImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type PortfolioProject = {
  num: string;
  title: string;
  description: string;
  images: ProjectImage[];
  href: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    num: "01",
    title: "DUO",
    description:
      "La plateforme d’agents IA qui aide les entrepreneurs à vendre, répondre et organiser leur activité sur WhatsApp.",
    images: [
      {
        src: "/duo.png",
        alt: "DUO — plateforme d’agents IA sur WhatsApp",
        width: 2594,
        height: 1490,
      },
    ],
    href: "https://duo.nodes-hub.com/",
  },
  {
    num: "02",
    title: "Nodes Technology",
    description:
      "Un site web pour une entreprise qui travaille dans l’automatisation et la transformation digitale.",
    images: [
      {
        src: "/nodes.png",
        alt: "Nodes Technology — site web automatisation et transformation digitale",
        width: 2594,
        height: 1490,
      },
    ],
    href: "https://nodes-hub.com/",
  },
];
