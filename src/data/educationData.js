const educationEntries = [
  {
    id: 'udla',
    image: 'udla.jpg',
    href: 'https://www.udla.edu.ec/',
    year: '2017 - 2022',
    name: {
      en: 'University of the Americas (UDLA)',
      es: 'Universidad de Las Américas (UDLA)',
    },
    degree: {
      en: 'Degree in Biotechnology',
      es: 'Título en Biotecnología',
    },
    description: {
      en: [
        'Biotechnology Engineer',
        'Senescyt register: 1040-2022-2444386',
      ],
      es: [
        'Ingeniera en Biotecnología',
        'Registro Senescyt: 1040-2022-2444386',
      ],
    },
  },
  {
    id: 'uba',
    image: 'uba.jpg',
    href: 'https://www.uba.ar/',
    year: '2024',
    name: {
      en: 'University of Buenos Aires (UBA)',
      es: 'Universidad de Buenos Aires (UBA)',
    },
    degree: {
      en: 'Doctor`s Degree, Veterinary Sciences',
      es: 'Doctorado en Ciencias Veterinarias',
    },
    description: {
      en: [
        'Doctorate',
      ],
      es: [
        'Doctorado',
      ],
    },
  },
];

const getEducationData = (language = 'en') =>
  educationEntries.map((entry) => ({
    ...entry,
    name: entry.name[language] || entry.name.en,
    degree: entry.degree[language] || entry.degree.en,
    description: entry.description[language] || entry.description.en,
  }));

export default getEducationData;

