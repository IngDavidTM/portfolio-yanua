const monthNames = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
};

const experiences = [
  {
    id: 'udla-labs-2020',
    start: { month: 0, year: 2020 },
    end: { month: 2, year: 2020 },
    title: {
      en: 'Pre-professional practices in the University of the Americas Research Laboratories',
      es: 'Prácticas preprofesionales en los laboratorios de investigación de la Universidad de Las Américas',
    },
    description: {
      en: 'Isolation and microbiological and biochemical identification of colisstin resistant bacteria using microbiology and molecular biology. Quito, Ecuador',
      es: 'Aislamiento e identificación microbiológica y bioquímica de bacterias resistentes a la colistina mediante microbiología y biología molecular. Quito, Ecuador',
    },
  },
  {
    id: 'ciz-labs-2021',
    start: { month: 0, year: 2021 },
    end: { month: 8, year: 2021 },
    title: {
      en: 'Pre-professional practices in Zoonosis Research Institute - C.I.Z Laboratories from the Central University of Ecuador',
      es: 'Prácticas preprofesionales en el Instituto de Investigaciones de Zoonosis - Laboratorios C.I.Z de la Universidad Central del Ecuador',
    },
    description: {
      en: 'Immunological diagnosis of diseases such as neospora, Q-fever and prototheca. Culture and molecular identification of prototheca, tuberculous and environmental mycobacteria. Quito, Ecuador',
      es: 'Diagnóstico inmunológico de enfermedades como neospora, fiebre Q y prototheca. Cultivo e identificación molecular de prototheca, micobacterias tuberculosas y ambientales. Quito, Ecuador',
    },
  },
  {
    id: 'udla-labs-2021-2022',
    start: { month: 0, year: 2021 },
    end: { month: 1, year: 2022 },
    title: {
      en: 'Pre-professional practices in the University of the Americas Research Laboratories',
      es: 'Prácticas preprofesionales en los laboratorios de investigación de la Universidad de Las Américas',
    },
    description: {
      en: 'Molecular, bioinformatic and cladistic identification of non-tuberculous mycobacteria isolated from patients from Venezuela. Quito, Ecuador',
      es: 'Identificación molecular, bioinformática y cladística de micobacterias no tuberculosas aisladas de pacientes de Venezuela. Quito, Ecuador',
    },
  },
  {
    id: 'udla-research-assistant-2022-current',
    start: { month: 0, year: 2022 },
    end: null,
    title: {
      en: 'University of the Americas – Research Assistant',
      es: 'Universidad de Las Américas – Asistente de investigación',
    },
    description: {
      en: 'Sample processing, molecular diagnostics, epidemiological analysis, field coordination. Quito, Ecuador',
      es: 'Procesamiento de muestras, diagnóstico molecular, análisis epidemiológico, coordinación de campo. Quito, Ecuador',
    },
  },
  {
    id: 'udla-teaching-assistant-2025-current',
    start: { month: 2, year: 2025 },
    end: null,
    title: {
      en: 'University of the Americas – Teaching Assistant, Cell and Molecular Biology II',
      es: 'Universidad de Las Américas – Ayudante de cátedra, Biología Celular y Molecular II',
    },
    description: {
      en: 'Responsible for practical classes. Quito, Ecuador',
      es: 'Responsable de clases prácticas. Quito, Ecuador',
    },
  },
];

const formatMonthYear = (lang, { month, year }) => {
  const names = monthNames[lang] || monthNames.en;
  return `${names[month]} ${year}`;
};

const getExperienceData = (language = 'en') =>
  experiences
    .slice()
    // Sort by most recent end date first; ongoing (null end) comes first.
    .sort((a, b) => {
      const endA = a.end ? a.end.year * 12 + a.end.month : Infinity;
      const endB = b.end ? b.end.year * 12 + b.end.month : Infinity;
      if (endA !== endB) return endB - endA;
      // If same end (including both ongoing), sort by most recent start
      const startA = a.start.year * 12 + a.start.month;
      const startB = b.start.year * 12 + b.start.month;
      return startB - startA;
    })
    .map((item) => ({
      id: item.id,
      start: item.start,
      end: item.end,
      from: formatMonthYear('en', item.start), // for calculations
      to: item.end ? formatMonthYear('en', item.end) : 'Present',
      fromLabel: formatMonthYear(language, item.start),
      toLabel: item.end ? formatMonthYear(language, item.end) : language === 'es' ? 'Actualidad' : 'Present',
      isCurrent: !item.end,
      title: item.title[language] || item.title.en,
      description: item.description[language] || item.description.en,
    }));

export default getExperienceData;
