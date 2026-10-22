export interface Flashcard {
  id: string;
  subjectId: string;
  subjectName: string;
  chapterTitle: string;
  topic: string;
  cardType: 'formula' | 'definition' | 'law' | 'concept' | 'diagram_rule';
  frontPrompt: string;
  backSolution: string;
  keyFormula?: string;
  ncertReference: string;
  commonTrapWarning?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  leitnerBox?: 1 | 2 | 3 | 4 | 5;
}

export const OFFICIAL_FLASHCARD_DECKS: Flashcard[] = [
  // Science - Electricity
  {
    id: 'fc-sci-1',
    subjectId: 'science',
    subjectName: 'Science',
    chapterTitle: 'Electricity',
    topic: "Ohm's Law",
    cardType: 'law',
    frontPrompt: "State Ohm's Law and its mathematical formulation. What condition is strictly required?",
    backSolution:
      'The electric current flowing through a conductor is directly proportional to the potential difference across its ends, provided temperature and other physical conditions remain constant.\n\nV = I · R (where R is constant of proportionality called resistance).',
    keyFormula: 'V = I · R',
    ncertReference: 'NCERT Science Class 10, Ch 12, Sec 12.4',
    commonTrapWarning: 'Students often forget the mandatory condition: "at constant temperature". Without it, zero marks are awarded in CBSE boards.',
    difficulty: 'easy',
    leitnerBox: 1,
  },
  {
    id: 'fc-sci-2',
    subjectId: 'science',
    subjectName: 'Science',
    chapterTitle: 'Electricity',
    topic: 'Factors Affecting Resistance',
    cardType: 'formula',
    frontPrompt: 'A wire of resistance R is stretched such that its length is doubled. What is its new resistance?',
    backSolution:
      'When stretched to 2× length, the volume remains constant (V = A · L). Therefore, cross-sectional area becomes A / 2.\n\nR_new = ρ · (2L) / (A / 2) = 4 · [ρ · (L / A)] = 4R.\n\nThe new resistance becomes 4 times the original resistance.',
    keyFormula: 'R = ρ · (L / A) ⇒ 4R',
    ncertReference: 'NCERT Science Class 10, Ch 12, Example 12.6',
    commonTrapWarning: 'Never assume area remains unchanged when stretching a wire. Stretching changes BOTH length and area.',
    difficulty: 'medium',
    leitnerBox: 1,
  },
  {
    id: 'fc-sci-3',
    subjectId: 'science',
    subjectName: 'Science',
    chapterTitle: 'Electricity',
    topic: 'Joule’s Law of Heating',
    cardType: 'formula',
    frontPrompt: 'State the mathematical relations for electric power (P) in terms of (V, I), (I, R), and (V, R).',
    backSolution: '1. P = V · I\n2. P = I² · R\n3. P = V² / R\n\nSI unit of electric power is Watt (W) = 1 Joule / second.',
    keyFormula: 'P = V·I = I²R = V²/R',
    ncertReference: 'NCERT Science Class 10, Ch 12, Sec 12.7',
    commonTrapWarning: 'Use P = I²R for series circuits (current is constant) and P = V²/R for parallel circuits (voltage is constant).',
    difficulty: 'easy',
    leitnerBox: 2,
  },
  // Science - Light
  {
    id: 'fc-sci-4',
    subjectId: 'science',
    subjectName: 'Science',
    chapterTitle: 'Light: Reflection & Refraction',
    topic: 'Sign Conventions',
    cardType: 'diagram_rule',
    frontPrompt: 'According to Cartesian sign convention, what are the signs of focal length (f) for: (a) Concave mirror, (b) Convex mirror, (c) Convex lens, (d) Concave lens?',
    backSolution:
      '(a) Concave Mirror: Negative (-)\n(b) Convex Mirror: Positive (+)\n(c) Convex Lens: Positive (+)\n(d) Concave Lens: Negative (-)',
    ncertReference: 'NCERT Science Class 10, Ch 10, Sec 10.2.4',
    commonTrapWarning: 'All converging systems (concave mirror, convex lens) focus parallel rays in front/right, but mirrors and lenses differ in side. Memorize: Convex lens is (+), Concave lens is (-).',
    difficulty: 'medium',
    leitnerBox: 1,
  },
  {
    id: 'fc-sci-5',
    subjectId: 'science',
    subjectName: 'Science',
    chapterTitle: 'Light: Reflection & Refraction',
    topic: 'Lens Power',
    cardType: 'formula',
    frontPrompt: 'Define Power of a Lens. What is 1 Dioptre? What is the power of a lens combination with f₁ = +20 cm and f₂ = -50 cm?',
    backSolution:
      'Power is the reciprocal of focal length expressed in meters: P = 1 / f(m).\n1 Dioptre is the power of a lens whose focal length is 1 meter.\n\nP₁ = 100/20 = +5 D\nP₂ = 100/-50 = -2 D\nP_total = P₁ + P₂ = +5 - 2 = +3 Dioptres (converging nature).',
    keyFormula: 'P = 1 / f(m)  |  Unit: Dioptre (D)',
    ncertReference: 'NCERT Science Class 10, Ch 10, Sec 10.3.8',
    commonTrapWarning: 'Always convert focal length to METERS before dividing 1/f, or use 100/f when f is in centimeters.',
    difficulty: 'medium',
    leitnerBox: 2,
  },
  // Maths - Trigonometry
  {
    id: 'fc-math-1',
    subjectId: 'maths',
    subjectName: 'Mathematics',
    chapterTitle: 'Trigonometry',
    topic: 'Pythagorean Identities',
    cardType: 'formula',
    frontPrompt: 'State the 3 fundamental Pythagorean Trigonometric Identities.',
    backSolution:
      '1. sin² θ + cos² θ = 1\n2. 1 + tan² θ = sec² θ   (sec² θ - tan² θ = 1)\n3. 1 + cot² θ = cosec² θ (cosec² θ - cot² θ = 1)',
    keyFormula: 'sin²θ + cos²θ = 1',
    ncertReference: 'NCERT Mathematics Class 10, Ch 8, Sec 8.4',
    commonTrapWarning: 'Remember that (sec θ - tan θ)(sec θ + tan θ) = 1. This factorisation property appears frequently in 4-mark proof problems.',
    difficulty: 'easy',
    leitnerBox: 3,
  },
  {
    id: 'fc-math-2',
    subjectId: 'maths',
    subjectName: 'Mathematics',
    chapterTitle: 'Trigonometry',
    topic: 'Standard Angle Values',
    cardType: 'formula',
    frontPrompt: 'State exact values of: (a) sin 30°, (b) cos 45°, (c) tan 60°, (d) sin 90°, (e) tan 90°',
    backSolution:
      '(a) sin 30° = 1/2\n(b) cos 45° = 1/√2 (or √2/2)\n(c) tan 60° = √3\n(d) sin 90° = 1\n(e) tan 90° = Not Defined (undefined)',
    keyFormula: 'sin 30° = 1/2, tan 60° = √3',
    ncertReference: 'NCERT Mathematics Class 10, Ch 8, Table 8.1',
    commonTrapWarning: 'tan 90° is NOT infinity in rigorous board evaluations; write "Not Defined" as given in NCERT.',
    difficulty: 'easy',
    leitnerBox: 4,
  },
  // Maths - Quadratic Equations
  {
    id: 'fc-math-3',
    subjectId: 'maths',
    subjectName: 'Mathematics',
    chapterTitle: 'Quadratic Equations',
    topic: 'Nature of Roots (Discriminant)',
    cardType: 'formula',
    frontPrompt: 'For ax² + bx + c = 0, state the condition on discriminant D = b² - 4ac for: (a) 2 distinct real roots, (b) 2 equal real roots, (c) no real roots.',
    backSolution:
      '(a) D > 0: Two distinct real roots: x = (-b ± √D) / 2a\n(b) D = 0: Two equal real roots: x = -b / 2a\n(c) D < 0: No real roots (roots are non-real complex numbers).',
    keyFormula: 'D = b² - 4ac',
    ncertReference: 'NCERT Mathematics Class 10, Ch 4, Sec 4.4',
    commonTrapWarning: 'If the question says "equation has REAL roots", condition is D ≥ 0 (greater than OR equal to zero), not just D > 0.',
    difficulty: 'medium',
    leitnerBox: 2,
  },
  // Social Science - History
  {
    id: 'fc-sst-1',
    subjectId: 'social_science',
    subjectName: 'Social Science',
    chapterTitle: 'Nationalism in India',
    topic: 'Non-Cooperation Movement Milestone',
    cardType: 'concept',
    frontPrompt: 'Why did Mahatma Gandhi decide to withdraw the Non-Cooperation Movement in February 1922?',
    backSolution:
      'At Chauri Chaura in Gorakhpur (Uttar Pradesh), a peaceful demonstration turned into a violent clash with police. An angry crowd set fire to a police station, killing 22 policemen.\n\nMahatma Gandhi felt the movement was turning violent and that satyagrahis needed proper training before they would be ready for mass struggles.',
    ncertReference: 'NCERT History Class 10, Ch 2, Sec 2.1',
    commonTrapWarning: 'CBSE frequently asks for the exact year and location: Chauri Chaura, Gorakhpur, February 1922.',
    difficulty: 'easy',
    leitnerBox: 3,
  },
];
