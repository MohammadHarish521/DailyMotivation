import { Quote } from "../types";

/**
 * Local quote bank (~100 entries) tagged with onboarding struggle/category
 * ids (stress, focus, procrastination, self-doubt, burnout, motivation,
 * mindfulness, productivity, confidence, gratitude, positivity) so the
 * Home screen can prioritize quotes relevant to the user's picks.
 */
export const QUOTES: Quote[] = [
  // motivation
  {
    id: "m01",
    text: "Small steps every day add up to big change.",
    categories: ["motivation"],
  },
  {
    id: "m02",
    text: "You don't have to see the whole staircase, just the next step.",
    categories: ["motivation"],
  },
  { id: "m03", text: "Progress, not perfection.", categories: ["motivation"] },
  {
    id: "m04",
    text: "Start where you are. Use what you have. Do what you can.",
    categories: ["motivation"],
  },
  {
    id: "m05",
    text: "Discipline is choosing between what you want now and what you want most.",
    categories: ["motivation", "productivity"],
  },
  {
    id: "m06",
    text: "Every accomplishment starts with the decision to try.",
    categories: ["motivation"],
  },
  {
    id: "m07",
    text: "You are one decision away from a completely different life.",
    categories: ["motivation"],
  },
  {
    id: "m08",
    text: "Momentum builds from motion, not from motivation.",
    categories: ["motivation", "procrastination"],
  },
  {
    id: "m09",
    text: "The only bad workout is the one that didn't happen.",
    categories: ["motivation"],
  },
  {
    id: "m10",
    text: "Do it today, tomorrow it may be illegal to feel this motivated.",
    categories: ["motivation"],
  },
  {
    id: "m11",
    text: "Fall down seven times, get up eight.",
    categories: ["motivation"],
  },
  {
    id: "m12",
    text: "Your future is created by what you do today, not tomorrow.",
    categories: ["motivation", "procrastination"],
  },
  {
    id: "m13",
    text: "Great things never came from comfort zones.",
    categories: ["motivation"],
  },
  {
    id: "m14",
    text: "Push yourself, because no one else is going to do it for you.",
    categories: ["motivation"],
  },
  {
    id: "m15",
    text: "Success is the sum of small efforts repeated daily.",
    categories: ["motivation", "productivity"],
  },

  // mindfulness
  {
    id: "md01",
    text: "Breathe in. This moment is the only one you need.",
    categories: ["mindfulness", "stress"],
  },
  {
    id: "md02",
    text: "Wherever you are, be all there.",
    categories: ["mindfulness"],
  },
  {
    id: "md03",
    text: "You can't stop the waves, but you can learn to surf.",
    categories: ["mindfulness", "stress"],
  },
  {
    id: "md04",
    text: "Notice five things you can see, four you can hear, three you can feel.",
    categories: ["mindfulness", "stress"],
  },
  {
    id: "md05",
    text: "Peace begins with a single breath.",
    categories: ["mindfulness"],
  },
  {
    id: "md06",
    text: "The present moment is the only moment available to us.",
    categories: ["mindfulness"],
  },
  {
    id: "md07",
    text: "Slow down. Everything you need is already here.",
    categories: ["mindfulness", "burnout"],
  },
  {
    id: "md08",
    text: "Let go of what you can't control, and breathe.",
    categories: ["mindfulness", "stress"],
  },
  {
    id: "md09",
    text: "Stillness is where clarity lives.",
    categories: ["mindfulness"],
  },
  {
    id: "md10",
    text: "You are not your thoughts. You are the one noticing them.",
    categories: ["mindfulness", "self-doubt"],
  },
  {
    id: "md11",
    text: "One mindful breath can reset your whole day.",
    categories: ["mindfulness", "stress"],
  },
  {
    id: "md12",
    text: "Come back to your breath whenever your mind runs ahead.",
    categories: ["mindfulness", "focus"],
  },

  // productivity
  {
    id: "p01",
    text: "Done is better than perfect.",
    categories: ["productivity", "procrastination"],
  },
  {
    id: "p02",
    text: "Eat the frog: do the hardest task first.",
    categories: ["productivity", "procrastination"],
  },
  {
    id: "p03",
    text: "A goal without a plan is just a wish.",
    categories: ["productivity"],
  },
  {
    id: "p04",
    text: "Protect your mornings, they set the tone for everything else.",
    categories: ["productivity"],
  },
  {
    id: "p05",
    text: "You don't need more time, you need fewer distractions.",
    categories: ["productivity", "focus"],
  },
  {
    id: "p06",
    text: "Batch the small stuff so your focus stays for the big stuff.",
    categories: ["productivity", "focus"],
  },
  {
    id: "p07",
    text: "One task, fully finished, beats five tasks half-done.",
    categories: ["productivity", "focus"],
  },
  {
    id: "p08",
    text: "Plan tonight what tomorrow's you will thank you for.",
    categories: ["productivity"],
  },
  {
    id: "p09",
    text: "The two-minute task you're avoiding takes longer to dread than to do.",
    categories: ["productivity", "procrastination"],
  },
  {
    id: "p10",
    text: "Clear space, clear mind, clear work.",
    categories: ["productivity", "stress"],
  },
  {
    id: "p11",
    text: "Say no to the good so you can say yes to the great.",
    categories: ["productivity"],
  },
  {
    id: "p12",
    text: "Consistency beats intensity over time.",
    categories: ["productivity", "motivation"],
  },

  // confidence
  {
    id: "c01",
    text: "You are more capable than your doubts give you credit for.",
    categories: ["confidence", "self-doubt"],
  },
  {
    id: "c02",
    text: "Confidence is built one kept promise to yourself at a time.",
    categories: ["confidence"],
  },
  {
    id: "c03",
    text: "You don't need permission to take up space.",
    categories: ["confidence"],
  },
  {
    id: "c04",
    text: "Speak to yourself the way you'd speak to someone you love.",
    categories: ["confidence", "self-doubt"],
  },
  {
    id: "c05",
    text: "You've survived every hard day so far. That's proof, not luck.",
    categories: ["confidence", "self-doubt"],
  },
  {
    id: "c06",
    text: "Trust the version of you that's still learning.",
    categories: ["confidence", "self-doubt"],
  },
  {
    id: "c07",
    text: "Nobody is born confident, they just practiced showing up scared.",
    categories: ["confidence"],
  },
  {
    id: "c08",
    text: "Your worth was never up for debate.",
    categories: ["confidence", "self-doubt"],
  },
  {
    id: "c09",
    text: "Stand tall. You've earned your seat at this table.",
    categories: ["confidence"],
  },
  {
    id: "c10",
    text: "Comparison is a thief that only steals from you.",
    categories: ["confidence", "self-doubt"],
  },
  {
    id: "c11",
    text: "You are allowed to be a work in progress and proud of yourself.",
    categories: ["confidence", "self-doubt"],
  },
  {
    id: "c12",
    text: "The doubt in your head is not a fact, it's just noise.",
    categories: ["confidence", "self-doubt"],
  },

  // gratitude
  {
    id: "g01",
    text: "Gratitude turns what we have into enough.",
    categories: ["gratitude"],
  },
  {
    id: "g02",
    text: "Name one small good thing about today. Start there.",
    categories: ["gratitude", "positivity"],
  },
  {
    id: "g03",
    text: "The little things are the big things, if you notice them.",
    categories: ["gratitude"],
  },
  {
    id: "g04",
    text: "Thank the version of you that got through yesterday.",
    categories: ["gratitude", "confidence"],
  },
  {
    id: "g05",
    text: "A grateful heart finds reasons to smile in ordinary moments.",
    categories: ["gratitude", "positivity"],
  },
  {
    id: "g06",
    text: "What you appreciate, appreciates.",
    categories: ["gratitude"],
  },
  {
    id: "g07",
    text: "Today, look for what's going right, not just what's going wrong.",
    categories: ["gratitude", "positivity"],
  },
  {
    id: "g08",
    text: "Even on hard days, something small is still good.",
    categories: ["gratitude", "burnout"],
  },
  {
    id: "g09",
    text: "Gratitude is the quiet cousin of joy.",
    categories: ["gratitude", "positivity"],
  },
  {
    id: "g10",
    text: "Say thank you to someone today, even if it's just yourself.",
    categories: ["gratitude"],
  },

  // positivity
  {
    id: "po01",
    text: "This is a good day to have a good day.",
    categories: ["positivity"],
  },
  {
    id: "po02",
    text: "Choose the thought that makes tomorrow easier.",
    categories: ["positivity"],
  },
  {
    id: "po03",
    text: "Optimism is a decision you get to make again each morning.",
    categories: ["positivity", "motivation"],
  },
  {
    id: "po04",
    text: "There is always a little light, even on cloudy days.",
    categories: ["positivity"],
  },
  {
    id: "po05",
    text: "Your attitude is the one thing that's always in your hands.",
    categories: ["positivity"],
  },
  {
    id: "po06",
    text: "Look for the good. It's always there if you look.",
    categories: ["positivity", "gratitude"],
  },
  {
    id: "po07",
    text: "A hopeful mind finds a way where a fearful mind sees a wall.",
    categories: ["positivity", "motivation"],
  },
  {
    id: "po08",
    text: "Not every day will be good, but there is good in every day.",
    categories: ["positivity", "gratitude"],
  },
  {
    id: "po09",
    text: "Smile first. The reason often follows.",
    categories: ["positivity"],
  },
  {
    id: "po10",
    text: "Good things grow in the space positivity leaves open.",
    categories: ["positivity"],
  },

  // stress
  {
    id: "s01",
    text: "This feeling is temporary, even when it doesn't feel like it.",
    categories: ["stress"],
  },
  {
    id: "s02",
    text: "You can't pour from an empty cup. Rest counts as progress.",
    categories: ["stress", "burnout"],
  },
  {
    id: "s03",
    text: "Unclench your jaw. Drop your shoulders. You're allowed to soften.",
    categories: ["stress"],
  },
  {
    id: "s04",
    text: "One thing at a time. That's all anyone can actually do.",
    categories: ["stress", "focus"],
  },
  {
    id: "s05",
    text: "Not everything needs to be solved today.",
    categories: ["stress", "burnout"],
  },
  {
    id: "s06",
    text: "Your nervous system believes what you tell it. Speak calmly to it.",
    categories: ["stress", "mindfulness"],
  },
  {
    id: "s07",
    text: "You are doing better than the anxious voice in your head admits.",
    categories: ["stress", "self-doubt"],
  },
  {
    id: "s08",
    text: "It's okay to close the laptop before the to-do list is empty.",
    categories: ["stress", "burnout"],
  },
  {
    id: "s09",
    text: "Deep breath in. Slow breath out. You've got this next moment.",
    categories: ["stress", "mindfulness"],
  },
  {
    id: "s10",
    text: "Pressure is not the same as danger. You're safer than you feel.",
    categories: ["stress"],
  },

  // focus
  {
    id: "f01",
    text: "Where your attention goes, your energy flows.",
    categories: ["focus"],
  },
  {
    id: "f02",
    text: "One tab open, one task done.",
    categories: ["focus", "productivity"],
  },
  {
    id: "f03",
    text: "Distraction is loud, but focus is where the results live.",
    categories: ["focus"],
  },
  {
    id: "f04",
    text: "Put the phone down. This moment deserves your full attention.",
    categories: ["focus", "mindfulness"],
  },
  {
    id: "f05",
    text: "Deep work beats busy work every time.",
    categories: ["focus", "productivity"],
  },
  {
    id: "f06",
    text: "You don't lack discipline, you lack a clear next step. Pick one.",
    categories: ["focus", "procrastination"],
  },
  {
    id: "f07",
    text: "Give this next 25 minutes everything, then rest.",
    categories: ["focus", "productivity"],
  },
  {
    id: "f08",
    text: "A focused hour is worth an unfocused day.",
    categories: ["focus"],
  },
  {
    id: "f09",
    text: "Silence the noise, even just for one task.",
    categories: ["focus", "stress"],
  },

  // procrastination
  {
    id: "pr01",
    text: "The best time to start was earlier. The next best time is now.",
    categories: ["procrastination"],
  },
  {
    id: "pr02",
    text: "You don't have to feel ready to begin.",
    categories: ["procrastination", "motivation"],
  },
  {
    id: "pr03",
    text: "Just open the document. That's the whole task right now.",
    categories: ["procrastination"],
  },
  {
    id: "pr04",
    text: "Future you is counting on the you of right now.",
    categories: ["procrastination", "motivation"],
  },
  {
    id: "pr05",
    text: "Waiting for motivation is how good ideas die on the shelf.",
    categories: ["procrastination"],
  },
  {
    id: "pr06",
    text: "Five minutes of starting beats another hour of dreading.",
    categories: ["procrastination", "focus"],
  },
  {
    id: "pr07",
    text: "The task is rarely as bad as the anticipation of it.",
    categories: ["procrastination", "stress"],
  },
  {
    id: "pr08",
    text: "Momentum is a gift you give yourself by starting small.",
    categories: ["procrastination", "motivation"],
  },

  // self-doubt
  {
    id: "sd01",
    text: "You are not behind. You are exactly on your own timeline.",
    categories: ["self-doubt"],
  },
  {
    id: "sd02",
    text: "The fact that you're trying already sets you apart.",
    categories: ["self-doubt", "motivation"],
  },
  {
    id: "sd03",
    text: "You don't need to have it all figured out to move forward.",
    categories: ["self-doubt"],
  },
  {
    id: "sd04",
    text: "Everyone you admire started out unsure too.",
    categories: ["self-doubt", "confidence"],
  },
  {
    id: "sd05",
    text: "That inner critic isn't the truth, it's just fear talking.",
    categories: ["self-doubt", "confidence"],
  },
  {
    id: "sd06",
    text: "You are allowed to take up space while you're still learning.",
    categories: ["self-doubt", "confidence"],
  },
  {
    id: "sd07",
    text: "Doubt is a passenger, not the driver. Keep driving.",
    categories: ["self-doubt", "motivation"],
  },
  {
    id: "sd08",
    text: "Your effort counts even when your confidence hasn't caught up yet.",
    categories: ["self-doubt"],
  },

  // burnout
  { id: "b01", text: "Rest is productive too.", categories: ["burnout"] },
  {
    id: "b02",
    text: "You are not a machine. You're allowed to slow down.",
    categories: ["burnout", "stress"],
  },
  {
    id: "b03",
    text: "Burnout isn't a lack of willpower, it's a signal to rest.",
    categories: ["burnout"],
  },
  {
    id: "b04",
    text: "Your worth isn't measured by your output today.",
    categories: ["burnout", "self-doubt"],
  },
  {
    id: "b05",
    text: "It's okay to do less and still be enough.",
    categories: ["burnout", "confidence"],
  },
  {
    id: "b06",
    text: "A short break now prevents a long crash later.",
    categories: ["burnout", "stress"],
  },
  {
    id: "b07",
    text: "You can care about your work and still protect your energy.",
    categories: ["burnout"],
  },
  {
    id: "b08",
    text: "Recovery is part of the work, not a break from it.",
    categories: ["burnout", "productivity"],
  },
];
