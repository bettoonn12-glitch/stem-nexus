import { Challenge } from '../types';
import { Language } from './i18n';

// Accurate bilingual mapping for challenges so when English is selected,
// all titles, subtitles, scenarios, and questions display in clear English
const CHALLENGE_TRANSLATIONS_EN: Record<
  string,
  { title: string; subtitle: string; question: string; scenario?: string }
> = {
  'math-1': {
    title: 'School Sports Field Area & Perimeter',
    subtitle: 'Elementary Geometry: Area of a Rectangle (SD 3-6 / SMP 7)',
    question:
      'A rectangular school sports field is 20 meters long and 10 meters wide. What is the total area of the field in square meters (m²)?',
    scenario:
      'The primary school is renovating its rectangular athletic field. The physical education teacher measures the field to be 20 meters long and 10 meters wide. Calculate the total surface area.',
  },
  'math-2': {
    title: 'School Stationery Discount Calculation',
    subtitle: 'Social Arithmetic: Percentage Discount (SD 4-6 / SMP 7)',
    question:
      'A set of school textbooks costs Rp 100,000. The store provides a 20% back-to-school discount. How much is the discount amount in rupiah (Rp)?',
    scenario:
      'At the beginning of the school semester, a stationery shop offers a 20% discount on study book packages priced at Rp 100,000.',
  },
  'math-3': {
    title: 'Healthy Juice & Baking Recipe Proportions',
    subtitle: 'Direct Proportions & Ratios (SD 5-6 / SMP 7)',
    question:
      'To make 2 bottles of healthy fruit juice, 6 oranges are needed. How many oranges are required to prepare 10 bottles of juice at the same ratio?',
    scenario:
      'During school nutrition week, students are preparing orange juice. 2 bottles require 6 fresh oranges. Find the quantity needed for 10 bottles.',
  },
  'math-4': {
    title: 'Speed, Distance, and Travel Time',
    subtitle: 'Motion & Velocity: Distance = Speed × Time (SD 5-6 / SMP 7)',
    question:
      'A student rides a bicycle at a constant speed of 15 km/h for 2 hours to visit the science museum. What is the total distance traveled in kilometers (km)?',
    scenario:
      'On a science excursion, a student pedals at 15 km/h consistently for 2 hours. Calculate the total distance covered.',
  },
  'sci-1': {
    title: 'Electric Circuits & Ohm’s Law',
    subtitle: 'Physics: Electric Current I = V / R (SD 6 / SMP 8-9)',
    question:
      'An experiment circuit has a battery voltage of 12 Volts connected to a 4 Ohm resistor. What is the electric current flowing in Amperes (A)?',
    scenario:
      'In the science lab, students connect a 12V battery across a 4-Ohm electrical resistor to determine current flow.',
  },
  'sci-2': {
    title: 'Temperature & Boiling Point of Pure Water',
    subtitle: 'States of Matter & Heat: Boiling State (SD 4-6 / SMP 7)',
    question:
      'At normal atmospheric sea-level pressure (1 atm), at what temperature does pure water boil into steam in degrees Celsius (°C)?',
    scenario:
      'During a laboratory thermal experiment, clean water is heated in a beaker over a burner at standard sea-level air pressure.',
  },
  'sci-3': {
    title: 'Solar System: Planet Closest to the Sun',
    subtitle: 'Astronomy: Celestial Planets (SD 6 / SMP 7)',
    question:
      'Which planet orbits closest to the Sun in our Solar System?',
    scenario:
      'Students are studying a 3D model of the solar system and identifying the orbital positions of terrestrial planets.',
  },
  'sci-4': {
    title: 'Water Cycle & Freezing Point of Water into Ice',
    subtitle: 'States of Matter: Freezing Phase (SD 3-5 / SMP 7)',
    question:
      'At normal atmospheric pressure, at what temperature does pure liquid water freeze into solid ice in degrees Celsius (°C)?',
    scenario:
      'Observing thermodynamic changes in the school refrigerator freezer when pure water solidifies into ice cubes.',
  },
  'ict-1': {
    title: 'Computer Memory Units: Bytes and Bits',
    subtitle: 'Informatics: Digital Data Units (SD 4-6 / SMP 7-8)',
    question:
      'In basic computer architecture, exactly how many bits (binary digits) are in 1 Byte?',
    scenario:
      'Learning digital data representation in the computer lab and converting binary bits into standard bytes.',
  },
  'ict-2': {
    title: 'Computer Logic AND Gate: Series Switches',
    subtitle: 'Computational Thinking: Logic Gates (SMP 7-9)',
    question:
      'In a digital logic AND gate, what is the output value when both Input A is 1 and Input B is 1?',
    scenario:
      'Simulating electrical logic circuits where an LED only illuminates when two serial safety switches are closed simultaneously.',
  },
  'ict-3': {
    title: 'Keyboard Shortcut for Copying Data',
    subtitle: 'Computer Practical: Keyboard Shortcuts (SD 3-6 / SMP 7)',
    question:
      'What standard keyboard shortcut is universally used to COPY highlighted text or files?',
    scenario:
      'Typing assignments in a word processor and quickly replicating selected scientific notes without retyping.',
  },
  'ict-4': {
    title: 'Understanding 4-Bit Binary Numbers',
    subtitle: 'Number Systems: Binary to Decimal (SD 5-6 / SMP 7-9)',
    question:
      'What is the decimal equivalent value of the 4-bit binary number 0101₂?',
    scenario:
      'Decoding electronic machine code pulses where binary bit positions correspond to powers of two (8, 4, 2, 1).',
  },
  'int-1': {
    title: 'School Science Rover Planetary Mission',
    subtitle: 'Integrated Velocity, Robotics, and Command Telemetry',
    question:
      'The planetary rover travels 120 meters in 30 seconds across the test track. What is its speed in meters per second (m/s)?',
    scenario:
      'Field testing an autonomous robotics rover across an obstacle course to verify propulsion speed and navigation sensors.',
  },
  'int-2': {
    title: 'Smart School Hydroponic Greenhouse Mission',
    subtitle: 'Integrated Chemistry Ratios, Plant Biology & Automated Sensors',
    question:
      'A nutrient solution requires 10 ml of concentrated mineral formula for every 5 liters of water. How many ml are needed for 25 liters of water?',
    scenario:
      'Calibrating automated hydroponic pumps to deliver proportional mineral nutrients to lettuce seedlings in the school garden.',
  },
  'int-3': {
    title: 'Eco-Friendly Solar Panel School Array',
    subtitle: 'Integrated Renewable Electrical Power & Digital Monitoring',
    question:
      'Four rooftop solar panels each produce 150 Watts of peak power in direct sunlight. What is the total peak output in Watts (W)?',
    scenario:
      'Installing solar photovoltaic panels on the school laboratory roof to supply clean electrical power for computers.',
  },
};

export function getChallengeTitle(challenge: Challenge, lang: Language): string {
  if (lang === 'id') {
    if (challenge.titleId) return challenge.titleId;
    return challenge.title;
  }
  if (challenge.titleEn) return challenge.titleEn;
  const trans = CHALLENGE_TRANSLATIONS_EN[challenge.id];
  if (trans) return trans.title;
  return challenge.title;
}

export function getChallengeSubtitle(challenge: Challenge, lang: Language): string {
  if (lang === 'id') {
    if (challenge.subtitleId) return challenge.subtitleId;
    return challenge.subtitle;
  }
  if (challenge.subtitleEn) return challenge.subtitleEn;
  const trans = CHALLENGE_TRANSLATIONS_EN[challenge.id];
  if (trans) return trans.subtitle;
  return challenge.subtitle;
}

export function getChallengeQuestion(challenge: Challenge, lang: Language): string {
  if (lang === 'id') {
    if (challenge.questionId) return challenge.questionId;
    return challenge.question;
  }
  if (challenge.questionEn) return challenge.questionEn;
  const trans = CHALLENGE_TRANSLATIONS_EN[challenge.id];
  if (trans) return trans.question;
  return challenge.question;
}

export function getChallengeScenario(challenge: Challenge, lang: Language): string {
  if (lang === 'id') {
    if (challenge.scenarioId) return challenge.scenarioId;
    return challenge.scenario;
  }
  if (challenge.scenarioEn) return challenge.scenarioEn;
  const trans = CHALLENGE_TRANSLATIONS_EN[challenge.id];
  if (trans?.scenario) return trans.scenario;
  return challenge.scenario;
}
