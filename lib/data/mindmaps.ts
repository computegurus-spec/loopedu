export interface MindMapNode {
  id: string;
  label: string;
  description?: string;
  formula?: string;
  ncertRef?: string;
  mastery?: 'mastered' | 'review_due' | 'learning';
  importance?: 'high' | 'medium' | 'critical';
  children?: MindMapNode[];
  examTips?: string[];
  practiceQuery?: string;
}

export interface ChapterMindMap {
  id: string;
  subjectId: string;
  subjectName: string;
  grade: string;
  board: string;
  chapterNumber: number;
  chapterTitle: string;
  totalSubtopics: number;
  rootNode: MindMapNode;
}

export const OFFICIAL_MIND_MAPS: ChapterMindMap[] = [
  {
    id: 'science-10-electricity',
    subjectId: 'science',
    subjectName: 'Science',
    grade: 'Class 10',
    board: 'CBSE',
    chapterNumber: 12,
    chapterTitle: 'Electricity & Circuits',
    totalSubtopics: 18,
    rootNode: {
      id: 'elec-root',
      label: 'Electricity',
      description: 'Study of electrical charge, flow, circuits, and heat dissipation',
      ncertRef: 'NCERT Science Chapter 12',
      importance: 'critical',
      children: [
        {
          id: 'elec-charge-current',
          label: 'Electric Current & Circuit',
          description: 'Rate of flow of electric charges through a conductor',
          formula: 'I = Q / t (1 Ampere = 1 Coulomb / 1 sec)',
          importance: 'high',
          mastery: 'mastered',
          children: [
            {
              id: 'elec-c-defn',
              label: 'Conventional Current vs Electron Flow',
              description: 'Electrons flow from -ve to +ve; conventional current flows from +ve to -ve.',
              ncertRef: 'Sec 12.1',
              examTips: ['CBSE frequently tests the direction of conventional current in 1-mark MCQs.'],
            },
            {
              id: 'elec-ammeter',
              label: 'Ammeter',
              description: 'Low resistance device connected in series to measure current.',
              examTips: ['Always connected in SERIES. Low resistance prevents voltage drop.'],
            },
          ],
        },
        {
          id: 'elec-potential',
          label: 'Electric Potential & Potential Difference',
          description: 'Work done to move a unit positive charge between two points',
          formula: 'V = W / Q (1 Volt = 1 Joule / 1 Coulomb)',
          importance: 'critical',
          mastery: 'review_due',
          children: [
            {
              id: 'elec-voltmeter',
              label: 'Voltmeter',
              description: 'High resistance device connected in parallel across components.',
              examTips: ['Always connected in PARALLEL. High resistance avoids drawing circuit current.'],
            },
          ],
        },
        {
          id: 'elec-ohms-law',
          label: "Ohm's Law & Resistance",
          description: 'Current is directly proportional to potential difference at constant temperature',
          formula: 'V = I · R  ⇒  R = V / I (Unit: Ohm Ω)',
          importance: 'critical',
          mastery: 'learning',
          children: [
            {
              id: 'elec-factors-r',
              label: 'Factors Affecting Resistance',
              formula: 'R = ρ · (L / A)',
              description: 'Directly proportional to length (L), inversely to cross-section area (A), dependent on resistivity (ρ).',
              examTips: ['If wire is stretched to double length, area halves and R becomes 4×! High recurrence.'],
            },
            {
              id: 'elec-resistivity',
              label: 'Resistivity (ρ)',
              formula: 'ρ = (R · A) / L (Unit: Ω·m)',
              description: 'Characteristic property of material. Independent of length or area; changes with temperature.',
              examTips: ['Alloys have higher resistivity and do not oxidize easily, used in heating appliances.'],
            },
          ],
        },
        {
          id: 'elec-combinations',
          label: 'Combinations of Resistors',
          importance: 'critical',
          children: [
            {
              id: 'elec-series',
              label: 'Series Combination',
              formula: 'R_eq = R₁ + R₂ + R₃ ...',
              description: 'Current remains constant through each resistor. Total voltage divides (V = V₁ + V₂).',
              examTips: ['Disadvantage: If one component fails, entire circuit breaks.'],
            },
            {
              id: 'elec-parallel',
              label: 'Parallel Combination',
              formula: '1 / R_eq = 1/R₁ + 1/R₂ + 1/R₃ ...',
              description: 'Voltage remains identical across branches. Current divides based on branch resistance.',
              examTips: ['Household wiring is always parallel: independent switches and lower effective resistance.'],
            },
          ],
        },
        {
          id: 'elec-heating',
          label: 'Joule’s Law of Heating & Power',
          importance: 'high',
          formula: 'H = I² · R · t   |   P = V·I = I²·R = V² / R',
          description: 'Thermal dissipation in resistive conductors.',
          children: [
            {
              id: 'elec-commercial-unit',
              label: 'Commercial Energy Unit (kWh)',
              formula: '1 kWh = 1 Unit = 3.6 × 10⁶ Joules',
              examTips: ['Numerical problem: Calculating electricity bill for household appliances in 30 days.'],
            },
            {
              id: 'elec-fuse',
              label: 'Electric Fuse',
              description: 'Safety device with low melting point alloy connected in series with live wire.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'science-10-light',
    subjectId: 'science',
    subjectName: 'Science',
    grade: 'Class 10',
    board: 'CBSE',
    chapterNumber: 10,
    chapterTitle: 'Light: Reflection & Refraction',
    totalSubtopics: 16,
    rootNode: {
      id: 'light-root',
      label: 'Light & Optics',
      description: 'Propagation, reflection at curved surfaces, refraction, lens mechanics',
      ncertRef: 'NCERT Science Chapter 10',
      importance: 'critical',
      children: [
        {
          id: 'light-spherical-mirrors',
          label: 'Spherical Mirrors',
          description: 'Concave (converging) and Convex (diverging) mirrors',
          formula: 'Mirror Formula: 1/f = 1/v + 1/u  |  m = -v/u = h₂/h₁',
          importance: 'critical',
          children: [
            {
              id: 'light-concave',
              label: 'Concave Mirror',
              description: 'Forms real & inverted images for u > f; virtual & erect magnified image when object between P and F.',
              examTips: ['Shaving mirrors and dentist headlamps use concave mirrors for magnified erect view.'],
            },
            {
              id: 'light-convex',
              label: 'Convex Mirror',
              description: 'Always forms virtual, erect, and diminished images regardless of object position.',
              examTips: ['Vehicle rear-view mirrors use convex mirrors due to wide field of view.'],
            },
          ],
        },
        {
          id: 'light-refraction',
          label: 'Refraction & Snell’s Law',
          description: 'Bending of light rays at media boundaries due to speed differential',
          formula: 'n = sin(i) / sin(r) = c / v',
          importance: 'high',
          children: [
            {
              id: 'light-snell',
              label: "Snell's Law",
              description: 'Ratio of sine of angle of incidence to sine of angle of refraction is constant for a given pair of media.',
            },
            {
              id: 'light-refractive-index',
              label: 'Refractive Index (n)',
              formula: 'n₂₁ = v₁ / v₂ = n₂ / n₁',
              description: 'Denser medium bends ray towards normal; rarer medium bends ray away from normal.',
            },
          ],
        },
        {
          id: 'light-lenses',
          label: 'Spherical Lenses',
          description: 'Convex (converging) and Concave (diverging) lenses',
          formula: 'Lens Formula: 1/f = 1/v - 1/u  |  m = +v/u',
          importance: 'critical',
          children: [
            {
              id: 'light-lens-power',
              label: 'Power of a Lens (P)',
              formula: 'P = 1 / f (in meters)  |  Unit: Dioptre (D)',
              description: 'Convex lens has +ve power; Concave lens has -ve power.',
              examTips: ['Combination power: P_total = P₁ + P₂ + P₃. Very common 2-mark question.'],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'maths-10-trigonometry',
    subjectId: 'maths',
    subjectName: 'Mathematics',
    grade: 'Class 10',
    board: 'CBSE',
    chapterNumber: 8,
    chapterTitle: 'Introduction to Trigonometry',
    totalSubtopics: 14,
    rootNode: {
      id: 'trig-root',
      label: 'Trigonometry',
      description: 'Ratios of right triangle sides, standard angle values, and Pythagorean identities',
      ncertRef: 'NCERT Maths Chapter 8',
      importance: 'critical',
      children: [
        {
          id: 'trig-ratios',
          label: 'Trigonometric Ratios',
          description: 'Defined for acute angles in a right-angled triangle',
          formula: 'sin θ = Opp/Hyp | cos θ = Adj/Hyp | tan θ = Opp/Adj',
          importance: 'high',
          children: [
            {
              id: 'trig-reciprocals',
              label: 'Reciprocal Ratios',
              formula: 'cosec θ = 1/sin θ | sec θ = 1/cos θ | cot θ = 1/tan θ',
            },
            {
              id: 'trig-quotient',
              label: 'Quotient Relations',
              formula: 'tan θ = sin θ / cos θ | cot θ = cos θ / sin θ',
            },
          ],
        },
        {
          id: 'trig-specific-angles',
          label: 'Specific Angles (0°, 30°, 45°, 60°, 90°)',
          description: 'Exact geometric values for standard angles',
          formula: 'sin 30° = 1/2 | sin 45° = 1/√2 | sin 60° = √3/2',
          importance: 'critical',
          examTips: ['Memorize the 0, 1/4, 2/4, 3/4, 1 square root trick for quick tabular construction.'],
        },
        {
          id: 'trig-identities',
          label: 'Pythagorean Trigonometric Identities',
          description: 'Fundamental algebraic equations holding true for all acute angles',
          formula: '1. sin² θ + cos² θ = 1\n2. 1 + tan² θ = sec² θ\n3. 1 + cot² θ = cosec² θ',
          importance: 'critical',
          examTips: ['Board 4-mark and 5-mark proofs invariably require substituting sec²θ - tan²θ = 1.'],
        },
      ],
    },
  },
  {
    id: 'maths-10-quadratic',
    subjectId: 'maths',
    subjectName: 'Mathematics',
    grade: 'Class 10',
    board: 'CBSE',
    chapterNumber: 4,
    chapterTitle: 'Quadratic Equations',
    totalSubtopics: 12,
    rootNode: {
      id: 'quad-root',
      label: 'Quadratic Equations',
      description: 'Second-degree polynomials equated to zero: ax² + bx + c = 0 (a ≠ 0)',
      ncertRef: 'NCERT Maths Chapter 4',
      importance: 'critical',
      children: [
        {
          id: 'quad-solutions',
          label: 'Methods of Finding Roots',
          importance: 'high',
          children: [
            {
              id: 'quad-factorisation',
              label: 'Factorisation (Splitting the Middle Term)',
              description: 'Find two numbers whose sum is b and product is a·c.',
            },
            {
              id: 'quad-formula',
              label: 'Quadratic Formula (Sridharacharya Method)',
              formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
              description: 'Universal analytical solution for any quadratic equation.',
            },
          ],
        },
        {
          id: 'quad-discriminant',
          label: 'Nature of Roots (Discriminant D)',
          formula: 'D = b² - 4ac',
          importance: 'critical',
          children: [
            {
              id: 'quad-d-pos',
              label: 'D > 0: Two Distinct Real Roots',
              description: 'Roots are x = (-b + √D)/2a and (-b - √D)/2a',
            },
            {
              id: 'quad-d-zero',
              label: 'D = 0: Two Equal Real Roots',
              formula: 'x = -b / (2a)',
              examTips: ['Common exam problem: Find value of k for which equation has equal roots (set D = 0).'],
            },
            {
              id: 'quad-d-neg',
              label: 'D < 0: No Real Roots',
              description: 'Roots are complex conjugates; non-real in real number space.',
            },
          ],
        },
      ],
    },
  },
];
