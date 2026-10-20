const fs = require('fs');
const path = require('path');

// 1. Subjects definition mapped directly from lib/subjects.ts
const ALL_SUBJECTS = [
  {
    id: "sub_maths_basic",
    slug: "maths-basic",
    track: "Maths_Basic",
    name: "Mathematics (Basic)",
    short_name: "Maths Basic",
    grade: "Class 10",
    exam_year: 2027,
    price_inr: 299,
    status: "published",
    question_count: 200,
    description: "Designed for CBSE Class 10 students enrolled in Mathematics Basic (Code 241). Focuses on core NCERT concepts, foundational arithmetic progressions, quadratic relations, coordinate geometry, and surface areas.",
    curriculum_ref: "CBSE Code 241 / NCERT Mathematics Class X",
    editorial_review_status: "verified",
    rights_review_status: "verified",
    review_notes: "Editorial review complete. Original worked solutions mapped to NCERT exercises.",
    verified_topics: [
      "Real Numbers", "Polynomials", "Pair of Linear Equations", "Quadratic Equations",
      "Arithmetic Progressions", "Triangles", "Coordinate Geometry", "Trigonometry",
      "Circles", "Surface Areas and Volumes", "Statistics", "Probability"
    ],
    sample_question_ids: ["MB-001", "MB-002", "MB-003", "MB-004", "MB-005"],
    track_comparison_note: "For students registered for CBSE Course 241. If your school has enrolled you in Course 041, select Mathematics (Standard). Students do not need both versions.",
    availability_note: null
  },
  {
    id: "sub_maths_standard",
    slug: "maths-standard",
    track: "Maths_Standard",
    name: "Mathematics (Standard)",
    short_name: "Maths Standard",
    grade: "Class 10",
    exam_year: 2027,
    price_inr: 299,
    status: "published",
    question_count: 200,
    description: "Designed for CBSE Class 10 students enrolled in Mathematics Standard (Code 041). Covers rigorous proof-based problems, complex algebraic formulations, trigonometric identities, and geometric deductions.",
    curriculum_ref: "CBSE Code 041 / NCERT Mathematics Class X",
    editorial_review_status: "verified",
    rights_review_status: "verified",
    review_notes: "Editorial review complete. Problem formulations verified against historical paper depth.",
    verified_topics: [
      "Real Numbers (Euclid & Fundamental Theorem)", "Polynomials & Zeros",
      "Linear Equations Systems", "Quadratic Equations & Discriminant",
      "Arithmetic Progressions (Sum & nth Term)", "Triangles & Similarity Proofs",
      "Coordinate Geometry (Section Formula)", "Trigonometric Identities & Applications",
      "Circles & Tangent Theorems", "Surface Areas & Combined Solids",
      "Statistics (Step Deviation & Median)", "Probability (Compound & Empirical)"
    ],
    sample_question_ids: ["MS-001", "MS-002", "MS-003", "MS-004", "MS-005"],
    track_comparison_note: "For students preparing for CBSE Course 041 and those planning to take Mathematics in Senior Secondary. You do not need Maths Basic.",
    availability_note: null
  },
  {
    id: "sub_science",
    slug: "science",
    track: "Science",
    name: "Science",
    short_name: "Science",
    grade: "Class 10",
    exam_year: 2027,
    price_inr: 299,
    status: "published",
    question_count: 200,
    description: "Balanced practice across Chemistry, Biology, and Physics. Emphasizes diagram-based reasoning, balanced chemical reactions, physiological processes, and ray optics calculation.",
    curriculum_ref: "CBSE Code 086 / NCERT Science Class X",
    editorial_review_status: "verified",
    rights_review_status: "verified",
    review_notes: "Reviewed for conceptual precision across Physics, Chemistry, and Life Sciences.",
    verified_topics: [
      "Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals",
      "Carbon and its Compounds", "Life Processes (Nutrition, Respiration, Transport, Excretion)",
      "Control and Coordination", "How do Organisms Reproduce?", "Heredity and Evolution",
      "Light - Reflection and Refraction", "The Human Eye and Colourful World",
      "Electricity and Circuit Analysis", "Magnetic Effects of Electric Current", "Our Environment"
    ],
    sample_question_ids: ["SC-001", "SC-002", "SC-003", "SC-004", "SC-005"],
    track_comparison_note: null,
    availability_note: null
  },
  {
    id: "sub_social_science",
    slug: "social-science",
    track: "Social_Science",
    name: "Social Science",
    short_name: "Social Science",
    grade: "Class 10",
    exam_year: 2027,
    price_inr: 299,
    status: "published",
    question_count: 200,
    description: "Structured revision covering History (India & Contemporary World II), Geography (Contemporary India II), Political Science (Democratic Politics II), and Economics (Understanding Economic Development).",
    curriculum_ref: "CBSE Code 087 / NCERT Social Science Class X",
    editorial_review_status: "verified",
    rights_review_status: "verified",
    review_notes: "Full syllabus coverage across four sub-disciplines with model source answers.",
    verified_topics: [
      "Rise of Nationalism in Europe", "Nationalism in India", "The Making of a Global World",
      "Print Culture and the Modern World", "Resources and Development", "Forest and Wildlife Resources",
      "Water Resources & Agriculture", "Minerals and Energy Resources", "Manufacturing Industries",
      "Power Sharing and Federalism", "Gender, Religion and Caste", "Political Parties",
      "Outcomes of Democracy", "Development & Sectors of the Indian Economy", "Money and Credit & Globalisation"
    ],
    sample_question_ids: ["SS-001", "SS-002", "SS-003", "SS-004", "SS-005"],
    track_comparison_note: null,
    availability_note: null
  },
  {
    id: "sub_english_ll",
    slug: "english-language-literature",
    track: "English_LL",
    name: "English (Language & Literature)",
    short_name: "English L&L",
    grade: "Class 10",
    exam_year: 2027,
    price_inr: 299,
    status: "published",
    question_count: 200,
    description: "Original practice questions covering First Flight prose and poetry, Footprints without Feet supplementary texts, analytical paragraphs, formal correspondence, and integrated grammar.",
    curriculum_ref: "CBSE Code 184 / NCERT First Flight & Footprints",
    editorial_review_status: "verified",
    rights_review_status: "verified",
    review_notes: "Editorial review complete. All practice passages and explanations are original models.",
    verified_topics: [
      "First Flight: A Letter to God, Nelson Mandela, Two Stories about Flying",
      "First Flight: From the Diary of Anne Frank, Glimpses of India, Madam Rides the Bus",
      "First Flight Poetry: Dust of Snow, Fire and Ice, A Tiger in the Zoo, Fog, Trees",
      "Footprints without Feet: A Triumph of Surgery, The Thief's Story, The Necklace",
      "Reading Comprehension & Discursive Passages", "Writing Skills: Analytical Paragraphs & Formal Letters",
      "Grammar: Tenses, Modals, Subject-Verb Concord, Reported Speech"
    ],
    sample_question_ids: ["EL-001", "EL-002", "EL-003", "EL-004", "EL-005"],
    track_comparison_note: "For students studying CBSE Subject Code 184 (the most common English course). If your school follows Code 101, select English (Communicative) instead.",
    availability_note: null
  },
  {
    id: "sub_english_comm",
    slug: "english-communicative",
    track: "English_Communicative",
    name: "English (Communicative)",
    short_name: "English Comm",
    grade: "Class 10",
    exam_year: 2027,
    price_inr: 299,
    status: "published",
    question_count: 200,
    description: "Practice questions aligned with CBSE Subject Code 101, featuring Literature Reader drama/poetry/fiction units, Main Course Book communicative themes, and advanced grammatical editing.",
    curriculum_ref: "CBSE Code 101 / CBSE Literature Reader & Main Course Book",
    editorial_review_status: "verified",
    rights_review_status: "verified",
    review_notes: "Editorial review complete. Mapped to CBSE Code 101 curriculum.",
    verified_topics: [
      "Fiction: Two Gentlemen of Verona, Mrs. Packletide's Tiger, The Letter",
      "Poetry: The Frog and the Nightingale, Not Marble nor the Gilded Monuments, Ozymandias",
      "Drama: The Dear Departed, Julius Caesar", "MCB Units: Health, Education, Environment, Science",
      "Communicative Writing & Dialogue Completion", "Integrated Grammar: Omission, Editing, Sentence Reordering"
    ],
    sample_question_ids: ["EC-001", "EC-002", "EC-003"],
    track_comparison_note: "Only for students registered for CBSE Code 101. Do not choose this track if you are enrolled in English Language & Literature (184).",
    availability_note: "Editorial review in progress. Available for preview samples."
  },
  {
    id: "sub_german",
    slug: "german",
    track: "German",
    name: "German (Deutsch)",
    short_name: "German",
    grade: "Class 10",
    exam_year: 2027,
    price_inr: 299,
    status: "published",
    question_count: 200,
    description: "German grammar, unseen reading comprehension, and structured written expression aligned with Class 10 German curriculum (B1.1 level concepts).",
    curriculum_ref: "CBSE Foreign Language - German (Code 017)",
    editorial_review_status: "verified",
    rights_review_status: "verified",
    review_notes: "German syllabus review completed. Grammar, reading comprehension, and written expression mapped to CBSE Foreign Language Code 017 guidelines.",
    verified_topics: [
      "Leseverstehen (Unseen Texts & Dialogues)", "Grammatik: Passiv Präsens & Präteritum",
      "Grammatik: Konjunktionen (weil, obwohl, dass, wenn)", "Grammatik: Relativsätze im Nominativ und Akkusativ",
      "Grammatik: Adjektivendungen", "Wortschatz: Umwelt, Medien, Freizeit, Berufe",
      "Schriftlicher Ausdruck: E-Mail & Forumsbeitrag"
    ],
    sample_question_ids: ["DE-001", "DE-002", "DE-003"],
    track_comparison_note: null,
    availability_note: null
  },
  {
    id: "sub_ai",
    slug: "artificial-intelligence",
    track: "AI",
    name: "Artificial Intelligence",
    short_name: "AI (Code 417)",
    grade: "Class 10",
    exam_year: 2027,
    price_inr: 299,
    status: "published",
    question_count: 200,
    description: "Original practice bank for CBSE Skill Subject 417. Spans Employability Skills, AI Project Cycle, Computer Vision, Natural Language Processing (TF-IDF, BoW, Syntax), and Evaluation Metrics.",
    curriculum_ref: "CBSE Skill Subject 417 (Artificial Intelligence)",
    editorial_review_status: "verified",
    rights_review_status: "verified",
    review_notes: "Editorial review complete. NLP equations, confusion matrices, and ethics cases verified.",
    verified_topics: [
      "Employability Skills: Communication & Self-Management", "Introduction to AI & AI Project Cycle",
      "Data Exploration & Data Acquisition", "Computer Vision: Pixels, Grayscale, Features, Classification",
      "Natural Language Processing: Text Normalisation, Bag of Words, TF-IDF",
      "Evaluation: Confusion Matrix, Accuracy, Precision, Recall, F1-Score", "AI Ethics, Bias and Data Privacy"
    ],
    sample_question_ids: ["AI-001", "AI-002", "AI-003", "AI-004", "AI-005"],
    track_comparison_note: "Designed for CBSE Skill Subject Code 417. Features worked evaluation metrics and step calculations.",
    availability_note: null
  }
];

function sqlEscape(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
  return `'${String(val).replace(/'/g, "''")}'`;
}

function run() {
  const dbPath = path.join(__dirname, '..', 'data', 'private', 'database.json');
  if (!fs.existsSync(dbPath)) {
    console.error('database.json not found!');
    process.exit(1);
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const questions = Object.values(db.questions || {});
  console.log(`Found ${questions.length} questions in database.json.`);

  const sqlLines = [];
  sqlLines.push('-- ==============================================================================');
  sqlLines.push('-- LoopEdu Supabase Seed Data (8 Verified Tracks + 1600 Questions)');
  sqlLines.push('-- Safe, Idempotent: Run this in Supabase SQL Editor');
  sqlLines.push('-- ==============================================================================\n');

  // 1. Subjects
  sqlLines.push('-- 1. SEED SUBJECTS');
  for (const s of ALL_SUBJECTS) {
    sqlLines.push(`INSERT INTO public.subjects (
  id, slug, track, name, short_name, grade, exam_year, price_inr, status,
  question_count, description, curriculum_ref, editorial_review_status,
  rights_review_status, review_notes, verified_topics, sample_question_ids,
  track_comparison_note, availability_note
) VALUES (
  ${sqlEscape(s.id)}, ${sqlEscape(s.slug)}, ${sqlEscape(s.track)}, ${sqlEscape(s.name)},
  ${sqlEscape(s.short_name)}, ${sqlEscape(s.grade)}, ${sqlEscape(s.exam_year)}, ${sqlEscape(s.price_inr)},
  ${sqlEscape(s.status)}, ${sqlEscape(s.question_count)}, ${sqlEscape(s.description)}, ${sqlEscape(s.curriculum_ref)},
  ${sqlEscape(s.editorial_review_status)}, ${sqlEscape(s.rights_review_status)}, ${sqlEscape(s.review_notes)},
  ${sqlEscape(s.verified_topics)}, ${sqlEscape(s.sample_question_ids)},
  ${sqlEscape(s.track_comparison_note)}, ${sqlEscape(s.availability_note)}
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  description = EXCLUDED.description,
  verified_topics = EXCLUDED.verified_topics,
  sample_question_ids = EXCLUDED.sample_question_ids,
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());\n`);
  }

  // 2. Questions in chunks of 50
  sqlLines.push('\n-- 2. SEED QUESTIONS (1600 Items)');
  const chunkSize = 50;
  for (let i = 0; i < questions.length; i += chunkSize) {
    const chunk = questions.slice(i, i + chunkSize);
    const valueTuples = chunk.map((q) => {
      return `(
  ${sqlEscape(q.id)}, ${sqlEscape(q.subjectSlug)}, ${sqlEscape(q.track)}, ${sqlEscape(q.topic)},
  ${sqlEscape(q.chapter || 1)}, ${sqlEscape(q.pattern || 'Standard')}, ${sqlEscape(q.lens || null)},
  ${sqlEscape(q.question)}, ${sqlEscape(q.answer)}, ${sqlEscape(q.explanation)},
  ${sqlEscape(q.marks || 1)}, ${sqlEscape(q.source || 'NCERT')}, ${sqlEscape(q.source_type || 'Original worked solution')},
  ${sqlEscape(q.keywords || [])}, ${sqlEscape(q.original_index ?? 0)}, ${sqlEscape(q.priority_score ?? 50)},
  ${sqlEscape(q.years_observed || [2026])}, ${sqlEscape(!!q.current_sample_support)}, ${sqlEscape(q.priority_band || 'Core practice')},
  ${sqlEscape(q.rank || 1)}, ${sqlEscape(q.version || 1)}, ${sqlEscape(q.is_active !== false)}, ${sqlEscape(!!q.is_sample)}
)`;
    });

    sqlLines.push(`INSERT INTO public.questions (
  id, subject_slug, track, topic, chapter, pattern, lens,
  question, answer, explanation, marks, source, source_type,
  keywords, original_index, priority_score, years_observed,
  current_sample_support, priority_band, rank, version, is_active, is_sample
) VALUES
${valueTuples.join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  answer = EXCLUDED.answer,
  explanation = EXCLUDED.explanation,
  marks = EXCLUDED.marks,
  topic = EXCLUDED.topic,
  chapter = EXCLUDED.chapter,
  pattern = EXCLUDED.pattern,
  is_sample = EXCLUDED.is_sample,
  rank = EXCLUDED.rank,
  updated_at = timezone('utc'::text, now());\n`);
  }

  const outPath = path.join(__dirname, '..', 'supabase', 'seed.sql');
  fs.writeFileSync(outPath, sqlLines.join('\n'), 'utf8');
  console.log(`Generated seed SQL at: ${outPath} (${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB)`);
}

run();
