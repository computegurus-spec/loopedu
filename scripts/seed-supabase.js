/**
 * LoopEdu Supabase Database Seeder
 * Uploads all 8 verified subjects and 1600 questions into cloud Supabase PostgreSQL.
 * Run with: node scripts/seed-supabase.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse environment variables manually from .env.local to avoid dotenv dependency
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      env[key] = val;
    }
  }
  return env;
}

const env = loadEnv();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

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

async function seed() {
  console.log('========================================================');
  console.log('       🌱 LOOPEDU / SUPABASE SEEDING SCRIPT             ');
  console.log('========================================================\n');

  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Supabase credentials missing in .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 1. Seed Subjects
  console.log('1. Seeding 8 Subject Tracks...');
  const { data: subData, error: subErr } = await supabase
    .from('subjects')
    .upsert(ALL_SUBJECTS, { onConflict: 'id' });

  if (subErr) {
    console.error('❌ Error inserting subjects:', subErr.message);
    if (subErr.message.includes('row-level security')) {
      console.log('\n💡 RLS Note: To seed via API, SUPABASE_SERVICE_ROLE_KEY is required.');
      console.log('   Alternatively, open Supabase SQL Editor and execute: supabase/seed.sql');
    }
    process.exit(1);
  }
  console.log('✅ Successfully seeded 8 Subject tracks into Supabase!');

  // 2. Seed Questions
  const dbPath = path.join(__dirname, '..', 'data', 'private', 'database.json');
  if (!fs.existsSync(dbPath)) {
    console.error('❌ data/private/database.json not found!');
    process.exit(1);
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const rawQuestions = Object.values(db.questions || {});
  console.log(`\n2. Seeding ${rawQuestions.length} Questions in batches of 100...`);

  const formatted = rawQuestions.map((q) => ({
    id: q.id,
    subject_slug: q.subjectSlug,
    track: q.track,
    topic: q.topic,
    chapter: q.chapter || 1,
    pattern: q.pattern || 'Standard',
    lens: q.lens || null,
    question: q.question,
    answer: q.answer,
    explanation: q.explanation,
    marks: q.marks || 1,
    source: q.source || 'NCERT',
    source_type: q.source_type || 'Original worked solution',
    keywords: q.keywords || [],
    original_index: q.original_index ?? 0,
    priority_score: q.priority_score ?? 50,
    years_observed: q.years_observed || [2026],
    current_sample_support: !!q.current_sample_support,
    priority_band: q.priority_band || 'Core practice',
    rank: q.rank || 1,
    version: q.version || 1,
    is_active: q.is_active !== false,
    is_sample: !!q.is_sample,
  }));

  const batchSize = 100;
  let totalUploaded = 0;

  for (let i = 0; i < formatted.length; i += batchSize) {
    const batch = formatted.slice(i, i + batchSize);
    const { error: qErr } = await supabase
      .from('questions')
      .upsert(batch, { onConflict: 'id' });

    if (qErr) {
      console.error(`❌ Batch [${i} - ${i + batch.length}] failed:`, qErr.message);
      process.exit(1);
    }
    totalUploaded += batch.length;
    process.stdout.write(`   Uploaded ${totalUploaded}/${formatted.length} questions...\r`);
  }

  console.log(`\n🎉 SUCCESS: All ${totalUploaded} questions synced to Supabase!`);
}

seed();
