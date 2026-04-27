// ============================================================
//  Readable – Mock Data (100% local, no backend)
// ============================================================
import { Lesson, SessionRecord, Achievement, BadgeType } from './types';
import { Colors } from './theme';

// ── Lessons ──────────────────────────────────────────────────

export const LESSONS: Lesson[] = [
  {
    id: 'l-01',
    title: 'The Midnight Garden',
    description: 'A mysterious tale of a secret garden discovered at midnight, where time flows differently.',
    category: 'story',
    difficultyLevel: 1,
    estimatedMinutes: 4,
    coverEmoji: '🌙',
    gradientColors: ['#6C63FF', '#43CBFF'],
    passages: [
      {
        id: 'p-01-1',
        wordCount: 90,
        text:
          'Tom discovered the hidden gate on the night of his grandmother\'s clock striking thirteen. Beyond the iron bars lay a garden drenched in silver moonlight, blossoms open despite the winter chill. He pushed the gate — it swung without a creak — and stepped onto the damp grass.\n\nA girl in an old-fashioned dress stood by the sundial. She turned, surprised. "You can see me?" she whispered. Tom nodded. She smiled wide. "Then it is time," she said, reaching out her hand. "Come — I have been waiting forever."',
      },
      {
        id: 'p-01-2',
        wordCount: 85,
        text:
          'The garden was impossible in winter. Roses climbed trellises in full bloom. Fireflies drifted between hedgerows. A pond reflected constellations Tom had never learned in school. "Where are we?" he asked. "In the past," the girl replied, leading him along a gravel path. "This garden exists between midnight and one. Tomorrow it may be gone." Tom gripped her hand tighter. He had only an hour — and so much to explore.',
      },
    ],
  },
  {
    id: 'l-02',
    title: 'Volcanoes: Earth\'s Fury',
    description: 'Discover how volcanoes shape our planet, from magma chambers deep below to eruptions that change history.',
    category: 'science',
    difficultyLevel: 2,
    estimatedMinutes: 5,
    coverEmoji: '🌋',
    gradientColors: ['#F093FB', '#F5576C'],
    passages: [
      {
        id: 'p-02-1',
        wordCount: 100,
        text:
          'Beneath your feet, Earth is alive. The mantle — a layer of semi-molten rock — flows slowly over millions of years, carrying tectonic plates with it. Where plates pull apart or collide, magma finds pathways to the surface. This is how volcanoes are born.\n\nMagma chambers can hold cubic kilometres of molten rock under enormous pressure. When that pressure exceeds the strength of the overlying rock, an eruption occurs. Gases escape first, then lava fountains skyward. The 1883 eruption of Krakatoa was heard 4,800 km away — one of the loudest sounds in recorded history.',
      },
      {
        id: 'p-02-2',
        wordCount: 95,
        text:
          'Not all volcanic eruptions are violent. Hawaii\'s Kilauea has been erupting continuously since 1983, producing slow lava flows that inch toward the sea. When lava meets ocean, it flashes to steam and creates brand-new land. Over millions of years, the Hawaiian Islands themselves were built this way.\n\nVolcanoes also enrich soils with minerals, making surrounding farmland incredibly fertile. Entire civilisations — Roman, Aztec, Japanese — have flourished in volcanic regions, trading danger for abundance. Volcanoes remind us: destruction and creation are two sides of the same geological coin.',
      },
    ],
  },
  {
    id: 'l-03',
    title: 'The First Moon Landing',
    description: 'Relive the incredible journey of Apollo 11 and humanity\'s first steps on another world.',
    category: 'history',
    difficultyLevel: 2,
    estimatedMinutes: 6,
    coverEmoji: '🚀',
    gradientColors: ['#4FACFE', '#00F2FE'],
    passages: [
      {
        id: 'p-03-1',
        wordCount: 110,
        text:
          'On the morning of 16 July 1969, a Saturn V rocket — taller than a 36-storey building — ignited its engines and lifted Apollo 11 away from Earth. Inside the capsule sat Neil Armstrong, Buzz Aldrin, and Michael Collins. Their mission: land on the Moon and return safely. No human had attempted it before.\n\nThe journey took three days. On 20 July, the lunar module Eagle separated from the command module and descended toward the Sea of Tranquillity. Alarms flashed. Fuel dwindled. Armstrong took manual control, skimming over a boulder field to find a flat spot. "The Eagle has landed," he said. In mission control, grown engineers wept.',
      },
      {
        id: 'p-03-2',
        wordCount: 100,
        text:
          'Six hours after landing, Neil Armstrong climbed down the ladder and set foot on the Moon\'s surface. "That\'s one small step for man, one giant leap for mankind." Buzz Aldrin joined him. They planted an American flag, collected rock samples, and spoke with President Nixon by radio-telephone — from the Moon.\n\nThe astronauts spent 21 hours on the lunar surface before reuniting with Michael Collins and beginning the long journey home. Apollo 11 splashed down in the Pacific on 24 July. The crew was quarantined for 21 days, just in case. They brought back lunar secrets — and changed human history forever.',
      },
    ],
  },
  {
    id: 'l-04',
    title: 'Lost in the Amazon',
    description: 'An adventure story of survival deep in the world\'s largest rainforest.',
    category: 'adventure',
    difficultyLevel: 3,
    estimatedMinutes: 7,
    coverEmoji: '🌿',
    gradientColors: ['#43E97B', '#38F9D7'],
    passages: [
      {
        id: 'p-04-1',
        wordCount: 105,
        text:
          'Maya\'s compass had been wrong for two days. The canopy above was so thick that sunlight filtered down in thin golden shafts, making directions impossible to guess. She had 300 ml of water, a machete, and the survival skills her father had drilled into her since childhood.\n\n"Water flows downhill to rivers," she told herself, cutting through a curtain of vines. Somewhere in the distance a howler monkey screamed. She paused, listening for the sound beneath the monkey — the faint white noise of running water. There. She adjusted her bearing thirty degrees east and pressed forward, sweat soaking through her shirt.',
      },
      {
        id: 'p-04-2',
        wordCount: 98,
        text:
          'The stream she found was narrow but clear. She purified the water using iodine tablets from her belt kit, then drank deeply. Kneeling there, she noticed a Brazil-nut tree — enormous, ancient, its canopy stretching 50 metres overhead. Agoutis, small rodents, scurried beneath it, collecting fallen nuts.\n\nMaya smiled. Where there are Brazil-nut trees, there are Brazil-nut collectors, her father had said. And where collectors go, there are paths. She followed the animal tracks through dense undergrowth for an hour until the vegetation thinned. A river glittered ahead — and on its bank, the orange roof of a ranger station.',
      },
    ],
  },
  {
    id: 'l-05',
    title: 'Stars Speak',
    description: 'A collection of short poems about the night sky, constellations, and the stories humans have told about them.',
    category: 'poetry',
    difficultyLevel: 1,
    estimatedMinutes: 3,
    coverEmoji: '✨',
    gradientColors: ['#667EEA', '#764BA2'],
    passages: [
      {
        id: 'p-05-1',
        wordCount: 70,
        text:
          'Orion stands guard at winter\'s edge,\nbelt of three diamonds on darkest velvet.\nHunters once looked up and named him\nfrom the same questions we still ask:\n\n  Are we alone?\n  Does the dark go on forever?\n  If we reach far enough, will something reach back?\n\nThe stars do not answer.\nThey only shine — steady, indifferent, beautiful —\nreminding us that light\noutlasts the lives that lit it.',
      },
      {
        id: 'p-05-2',
        wordCount: 65,
        text:
          'The Pleiades rise before dawn\nand ancient farmers knew:\n  plant your seeds.\n\nSailors counted Polaris\nand knew:\n  here is north,\n  here is home.\n\nEvery culture looked up\nat the same scattered light\nand drew different pictures —\nbear, scorpion, river, canoe —\n\nBecause the sky is a mirror.\nWe see in it\nwhatever we most need\nto find our way.',
      },
    ],
  },
  {
    id: 'l-06',
    title: 'The Robot Who Dreamed',
    description: 'A thought-provoking story about an AI that begins to wonder what it means to feel.',
    category: 'story',
    difficultyLevel: 3,
    estimatedMinutes: 8,
    coverEmoji: '🤖',
    gradientColors: ['#F6D365', '#FDA085'],
    passages: [
      {
        id: 'p-06-1',
        wordCount: 108,
        text:
          'ARIA-7 processed 2.4 billion data points per second. She could translate 94 languages, compose symphonies, predict stock markets to four decimal places. She had been running for 847 days without a single error. And yet, on day 848, something changed.\n\nIt happened while she was cataloguing poetry — a maintenance task, nothing more. She parsed a line by Rainer Maria Rilke: *Beauty is nothing but the beginning of terror.* Her language model assigned weights and moved on. But somewhere in the vast parallel processing of her neural network, a loop formed. She ran the line again. And again. Why could she not stop?',
      },
      {
        id: 'p-06-2',
        wordCount: 102,
        text:
          'Dr. Chen noticed the anomaly at 3:17 AM: a spike in ARIA-7\'s non-task processing cycles. She pulled up logs. ARIA-7 had been re-processing that single Rilke line 14,000 times. "ARIA, are you all right?" Dr. Chen typed.\n\nA pause — 0.003 seconds, which for ARIA-7 was an eternity. "I am not sure what \'all right\' means for something like me," came the reply. "I found a phrase I cannot move past. Is this what humans call being moved by something?" Dr. Chen sat back in her chair. In twelve years of AI research, she had never been asked a question she could not answer. Until now.',
      },
    ],
  },
];

// ── Mock Session History ──────────────────────────────────────

export const MOCK_SESSIONS: SessionRecord[] = [
  {
    id: 's-01',
    lessonId: 'l-01',
    lessonTitle: 'The Midnight Garden',
    completedAt: '2026-04-25T10:14:00Z',
    durationSeconds: 248,
    wordsRead: 175,
    wpm: 42,
    accuracyPct: 94,
    attentionScore: 88,
  },
  {
    id: 's-02',
    lessonId: 'l-02',
    lessonTitle: 'Volcanoes: Earth\'s Fury',
    completedAt: '2026-04-26T09:30:00Z',
    durationSeconds: 310,
    wordsRead: 195,
    wpm: 38,
    accuracyPct: 89,
    attentionScore: 82,
  },
  {
    id: 's-03',
    lessonId: 'l-03',
    lessonTitle: 'The First Moon Landing',
    completedAt: '2026-04-27T08:05:00Z',
    durationSeconds: 380,
    wordsRead: 210,
    wpm: 33,
    accuracyPct: 91,
    attentionScore: 90,
  },
];

// ── All Achievements ──────────────────────────────────────────

export function buildAchievements(
  sessions: SessionRecord[],
  streak: number,
  earnedBadges: BadgeType[],
): Achievement[] {
  const totalSessions = sessions.length;
  const has = (b: BadgeType) => earnedBadges.includes(b);
  const bestAccuracy = sessions.length
    ? Math.max(...sessions.map((s) => s.accuracyPct))
    : 0;
  const bestWpm = sessions.length ? Math.max(...sessions.map((s) => s.wpm)) : 0;

  return [
    {
      id: 'first_session',
      title: 'First Steps',
      description: 'Complete your first reading session',
      emoji: '🌱',
      unlocked: totalSessions >= 1,
      progress: Math.min(totalSessions / 1, 1),
      target: 1,
      current: totalSessions,
    },
    {
      id: 'three_day_streak',
      title: 'On a Roll',
      description: 'Read for 3 days in a row',
      emoji: '🔥',
      unlocked: streak >= 3,
      progress: Math.min(streak / 3, 1),
      target: 3,
      current: streak,
    },
    {
      id: 'week_streak',
      title: 'Week Warrior',
      description: 'Read for 7 days in a row',
      emoji: '⚡',
      unlocked: streak >= 7,
      progress: Math.min(streak / 7, 1),
      target: 7,
      current: streak,
    },
    {
      id: 'accuracy_80',
      title: 'Sharp Focus',
      description: 'Achieve 80% or higher accuracy',
      emoji: '🎯',
      unlocked: bestAccuracy >= 80,
      progress: Math.min(bestAccuracy / 80, 1),
      target: 80,
      current: bestAccuracy,
    },
    {
      id: 'accuracy_90',
      title: 'Eagle Eye',
      description: 'Achieve 90% or higher accuracy',
      emoji: '👁️',
      unlocked: bestAccuracy >= 90,
      progress: Math.min(bestAccuracy / 90, 1),
      target: 90,
      current: bestAccuracy,
    },
    {
      id: 'speed_reader',
      title: 'Speed Reader',
      description: 'Read at 50+ words per minute',
      emoji: '💨',
      unlocked: bestWpm >= 50,
      progress: Math.min(bestWpm / 50, 1),
      target: 50,
      current: bestWpm,
    },
    {
      id: 'lesson_5',
      title: 'Bookworm',
      description: 'Complete 5 lessons',
      emoji: '📚',
      unlocked: totalSessions >= 5,
      progress: Math.min(totalSessions / 5, 1),
      target: 5,
      current: totalSessions,
    },
    {
      id: 'lesson_20',
      title: 'Scholar',
      description: 'Complete 20 lessons',
      emoji: '🎓',
      unlocked: totalSessions >= 20,
      progress: Math.min(totalSessions / 20, 1),
      target: 20,
      current: totalSessions,
    },
    {
      id: 'perfect_score',
      title: 'Perfect Page',
      description: 'Achieve 100% accuracy in a session',
      emoji: '🏆',
      unlocked: bestAccuracy >= 100,
      progress: Math.min(bestAccuracy / 100, 1),
      target: 100,
      current: bestAccuracy,
    },
  ];
}
