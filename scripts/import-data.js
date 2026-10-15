const fs = require('fs');
const path = require('path');

const SOURCE_DIR =
  process.env.SOURCE_QUESTION_BANKS_DIR ||
  'C:\\Users\\sadis\\Documents\\Codex\\2026-10-13\\i-x20\\outputs\\CBSE_2027_Question_Banks';

const EDITORIAL_FILE = path.join(SOURCE_DIR, 'Editorial_Content.json');
const TARGET_DIR = path.join(__dirname, '..', 'data', 'private');
const TARGET_DB = path.join(TARGET_DIR, 'database.json');

const TRACK_SLUG_MAP = {
  Maths_Basic: 'maths-basic',
  Maths_Standard: 'maths-standard',
  Science: 'science',
  Social_Science: 'social-science',
  English_LL: 'english-language-literature',
  English_Communicative: 'english-communicative',
  German: 'german',
  AI: 'artificial-intelligence',
};

function runImport() {
  console.log('=== BoardEdge AI Data Importer ===');
  console.log(`Checking source: ${EDITORIAL_FILE}`);

  if (!fs.existsSync(EDITORIAL_FILE)) {
    console.error(`ERROR: Source file does not exist at ${EDITORIAL_FILE}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(EDITORIAL_FILE, 'utf8');
  const sourceData = JSON.parse(raw);
  const trackKeys = Object.keys(sourceData);

  console.log(`Found ${trackKeys.length} tracks in source JSON.`);

  // Validation report
  const validationErrors = [];
  const allIds = new Set();
  const importedQuestions = {};
  let totalImported = 0;

  // Load existing DB if present to protect manual edits
  let existingDb = null;
  if (fs.existsSync(TARGET_DB)) {
    try {
      existingDb = JSON.parse(fs.readFileSync(TARGET_DB, 'utf8'));
    } catch (e) {
      console.warn('Could not parse existing DB, creating fresh.');
    }
  }

  for (const track of trackKeys) {
    const slug = TRACK_SLUG_MAP[track];
    if (!slug) {
      validationErrors.push(`Unknown track in source: ${track}`);
      continue;
    }

    const items = sourceData[track];
    if (!Array.isArray(items)) {
      validationErrors.push(`Track ${track} is not an array`);
      continue;
    }

    if (items.length !== 200) {
      validationErrors.push(`Track ${track} expected 200 items, found ${items.length}`);
    }

    let trackCount = 0;
    items.forEach((item, idx) => {
      const qId = item.id || `${track}-${idx + 1}`;

      // Duplicate check
      if (allIds.has(qId)) {
        validationErrors.push(`Duplicate question ID detected: ${qId}`);
      }
      allIds.add(qId);

      // Field integrity check
      if (!item.question || typeof item.question !== 'string' || item.question.trim().length === 0) {
        validationErrors.push(`Missing question text for ${qId}`);
      }
      if (!item.answer || typeof item.answer !== 'string' || item.answer.trim().length === 0) {
        validationErrors.push(`Missing answer text for ${qId}`);
      }
      if (!item.explanation || typeof item.explanation !== 'string' || item.explanation.trim().length === 0) {
        validationErrors.push(`Missing explanation text for ${qId}`);
      }

      // Check for previously edited versions to avoid silent overwrite
      const existingQuestion = existingDb?.questions?.[qId];
      if (existingQuestion && existingQuestion.version > 1) {
        console.log(`Preserving modified question ${qId} (v${existingQuestion.version})`);
        importedQuestions[qId] = existingQuestion;
        trackCount++;
        totalImported++;
        return;
      }

      // Select first 5 questions per track as public samples (German only first 3)
      const isSample = track === 'German' ? idx < 3 : idx < 5;

      importedQuestions[qId] = {
        id: qId,
        track: track,
        subjectSlug: slug,
        topic: item.topic || 'General Practice',
        chapter: item.chapter || 1,
        pattern: item.pattern || 'Standard question',
        lens: item.lens || undefined,
        question: item.question.trim(),
        answer: item.answer.trim(),
        explanation: item.explanation.trim(),
        marks: Number(item.marks) || 1,
        source: item.source || 'Curriculum reference',
        source_type: item.source_type || 'Original model explanation',
        keywords: Array.isArray(item.keywords) ? item.keywords : [],
        original_index: item.original_index ?? idx,
        priority_score: Number(item.priority_score) || 50,
        years_observed: Array.isArray(item.years_observed) ? item.years_observed : [2026],
        current_sample_support: Boolean(item.current_sample_support),
        priority_band: item.priority_band || 'Core revision',
        rank: Number(item.rank) || idx + 1,
        version: 1,
        is_active: true,
        is_sample: isSample,
      };

      trackCount++;
      totalImported++;
    });

    console.log(`Validated track ${track}: ${trackCount} questions.`);
  }

  if (validationErrors.length > 0) {
    console.error('Validation errors encountered during import:');
    validationErrors.forEach((err) => console.error(`  - ${err}`));
  } else {
    console.log('ALL integrity checks passed: 0 missing fields, 0 duplicate IDs.');
  }

  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  // Preserve existing DB metadata or initialize
  const outputDb = existingDb || {
    subjects: [],
    questions: {},
    question_versions: [],
    profiles: {},
    orders: {},
    entitlements: {},
    user_progress: {},
    user_bookmarks: {},
    user_last_studied: {},
    subject_requests: [],
    content_error_reports: [],
    admin_audit_logs: [],
  };

  outputDb.questions = importedQuestions;

  fs.writeFileSync(TARGET_DB, JSON.stringify(outputDb, null, 2), 'utf8');
  console.log(`Successfully written ${totalImported} questions to ${TARGET_DB}`);
}

runImport();
