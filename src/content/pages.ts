// The page library. Every book is assembled from these templates.
// Text is written from the giver ({A}) to the recipient ({B}).
// Tokens: {A} {B} {rel} {since} {years}. Keep each text under ~200 chars.

import type { Pose } from "@/components/avatar/Avatar";

export type SceneId =
  | "letter"
  | "hearts"
  | "park"
  | "stars"
  | "kitchen"
  | "couch"
  | "beach"
  | "mountains"
  | "dance"
  | "cafe"
  | "car"
  | "rain"
  | "home"
  | "spotlight"
  | "bigheart"
  | "garden"
  | "city"
  | "games"
  | "music"
  | "sunrise"
  | "pets"
  | "books"
  | "snow"
  | "cake"
  | "arch"
  | "plane";

export type Category = "core" | "feature" | "quality" | "activity" | "occasion" | "extra";

export interface PageTemplate {
  id: string;
  category: Category;
  scene: SceneId;
  text: string;
  /** Poses for [A, B]. Scenes pick sensible defaults if omitted. */
  poses?: [Pose, Pose];
  /** Short name shown in the page library. */
  label: string;
}

const t = (
  id: string,
  category: Category,
  scene: SceneId,
  label: string,
  text: string,
  poses?: [Pose, Pose],
): PageTemplate => ({ id, category, scene, label, text, poses });

export const TEMPLATES: PageTemplate[] = [
  // Core pages, always included
  t("core-dedication", "core", "letter", "Dedication", ""),
  t("core-intro", "core", "hearts", "This book is about you", "{B}, this little book is all about you — and all the reasons I love you.", ["reachRight", "reachLeft"]),
  t("core-since", "core", "park", "Since we met", "We've been together since {since}. That's {years} of you and me, and I'd choose every single day again.", ["reachRight", "reachLeft"]),
  t("core-features", "core", "spotlight", "Things I adore", "First, let's talk about some of my favourite things about you…", ["stand", "wave"]),
  t("core-qualities", "core", "sunrise", "Who you are", "But what I love most isn't what I see. It's who you are.", ["stand", "stand"]),
  t("core-activities", "core", "city", "Us, together", "And then there's us. Some of my happiest moments are the simple ones we share.", ["reachRight", "reachLeft"]),
  t("core-future-1", "core", "plane", "Adventures ahead", "There are so many adventures still waiting for us, {B}. I can't wait for every one of them.", ["cheer", "cheer"]),
  t("core-future-2", "core", "home", "Growing old", "When we're old and grey, I'll still be holding your hand and laughing at your jokes.", ["reachRight", "reachLeft"]),
  t("core-closing", "core", "bigheart", "I love you", "I love you, {B}. Today, tomorrow, and on every page still to come.\n— {A}", ["hugRight", "hugLeft"]),

  // Features (one page per chosen feature)
  t("feature-eyes", "feature", "stars", "Your eyes", "I love your eyes. One look from you and the whole world goes quiet.", ["stand", "stand"]),
  t("feature-smile", "feature", "spotlight", "Your smile", "I love your smile. It's my favourite thing to wake up to.", ["stand", "wave"]),
  t("feature-laugh", "feature", "park", "Your laugh", "I love your laugh — especially when you can't stop and I end up laughing too.", ["cheer", "cheer"]),
  t("feature-hair", "feature", "garden", "Your hair", "I love your hair, even on the mornings it has a mind of its own.", ["stand", "wave"]),
  t("feature-hugs", "feature", "bigheart", "Your hugs", "I love your hugs. They fix just about everything.", ["hugRight", "hugLeft"]),
  t("feature-hands", "feature", "park", "Your hands", "I love your hands, and how perfectly mine fits in them.", ["reachRight", "reachLeft"]),
  t("feature-voice", "feature", "music", "Your voice", "I love your voice. I could listen to you talk about anything for hours.", ["stand", "wave"]),
  t("feature-style", "feature", "city", "Your style", "I love your style. You always look like you, and you always look good.", ["stand", "wave"]),
  t("feature-kisses", "feature", "hearts", "Your kisses", "I love your kisses — the long ones, the quick ones, and the sneaky ones.", ["hugRight", "hugLeft"]),
  t("feature-sleepy", "feature", "stars", "Your sleepy face", "I love your sleepy face first thing in the morning. Nobody else gets to see it but me.", ["sit", "sit"]),

  // Qualities
  t("quality-kind", "quality", "garden", "Kind", "You are so kind, {B}. You make everyone around you feel at home — especially me.", ["stand", "wave"]),
  t("quality-funny", "quality", "spotlight", "Funny", "You are hilarious. Nobody has ever made me laugh as hard as you do.", ["cheer", "cheer"]),
  t("quality-smart", "quality", "books", "Smart", "You are brilliant. I learn something new from you all the time.", ["sit", "sit"]),
  t("quality-patient", "quality", "rain", "Patient", "You are patient with me, even when I'm not easy. Thank you for that.", ["reachRight", "reachLeft"]),
  t("quality-adventurous", "quality", "mountains", "Adventurous", "You are adventurous. With you, life never feels small.", ["cheer", "wave"]),
  t("quality-caring", "quality", "home", "Caring", "You are so caring. You notice the little things and you always show up.", ["hugRight", "hugLeft"]),
  t("quality-honest", "quality", "cafe", "Honest", "You are honest, even when it's hard. I always know where I stand with you.", ["sit", "sit"]),
  t("quality-creative", "quality", "music", "Creative", "You are so creative. The way your mind works amazes me.", ["stand", "cheer"]),
  t("quality-brave", "quality", "mountains", "Brave", "You are braver than you know. I'm so proud of you.", ["stand", "cheer"]),
  t("quality-loyal", "quality", "rain", "Loyal", "You are loyal. Rain or shine, you're always in my corner.", ["reachRight", "reachLeft"]),
  t("quality-hardworking", "quality", "city", "Hard-working", "You work so hard, and you never give up. You inspire me every day.", ["stand", "wave"]),
  t("quality-calm", "quality", "sunrise", "Calm", "You are my calm. When life gets loud, you're my quiet place.", ["sit", "sit"]),

  // Activities
  t("activity-cooking", "activity", "kitchen", "Cooking together", "I love cooking with you — even when we make a mess and order pizza anyway.", ["wave", "cheer"]),
  t("activity-movies", "activity", "couch", "Movie nights", "I love our movie nights: blanket, snacks, and you falling asleep before the end.", ["sit", "sit"]),
  t("activity-travel", "activity", "plane", "Travelling", "I love exploring the world with you. Every place is better with you in it.", ["wave", "cheer"]),
  t("activity-hiking", "activity", "mountains", "Hiking", "I love our hikes — the views are great, but you're the best part.", ["reachRight", "reachLeft"]),
  t("activity-dancing", "activity", "dance", "Dancing", "I love dancing with you, in the kitchen, at weddings, anywhere at all.", ["cheer", "cheer"]),
  t("activity-coffee", "activity", "cafe", "Coffee dates", "I love our coffee dates and the long talks that come with them.", ["sit", "sit"]),
  t("activity-roadtrips", "activity", "car", "Road trips", "I love our road trips: your playlist, my snacks, and nowhere to be.", ["wave", "cheer"]),
  t("activity-gaming", "activity", "games", "Playing games", "I love playing games with you — even when you win. Especially when you win.", ["sit", "sit"]),
  t("activity-music", "activity", "music", "Music", "I love sharing music with you. So many of our songs are about you.", ["stand", "cheer"]),
  t("activity-beach", "activity", "beach", "Beach days", "I love our beach days: salty hair, sunny skies, and you.", ["cheer", "wave"]),
  t("activity-walks", "activity", "park", "Long walks", "I love our long walks, where we talk about everything and nothing.", ["reachRight", "reachLeft"]),
  t("activity-reading", "activity", "books", "Reading", "I love reading next to you on quiet afternoons.", ["sit", "sit"]),
  t("activity-pets", "activity", "pets", "Our pets", "I love our little family — furry members included.", ["stand", "wave"]),
  t("activity-stargazing", "activity", "stars", "Stargazing", "I love looking up at the stars with you and feeling like the luckiest person alive.", ["reachRight", "reachLeft"]),

  // Occasion page (one, matched to the chosen occasion)
  t("occasion-anniversary", "occasion", "hearts", "Happy anniversary", "Happy anniversary, {B}! Here's to every year so far — and all the ones still to come.", ["cheer", "cheer"]),
  t("occasion-valentines", "occasion", "bigheart", "Happy Valentine's Day", "Happy Valentine's Day, {B}. You'll always be my valentine.", ["hugRight", "hugLeft"]),
  t("occasion-birthday", "occasion", "cake", "Happy birthday", "Happy birthday, {B}! The world got a lot better the day you arrived.", ["cheer", "cheer"]),
  t("occasion-wedding", "occasion", "arch", "Our wedding", "Today we start forever. I can't believe I get to marry you, {B}.", ["reachRight", "reachLeft"]),
  t("occasion-engagement", "occasion", "stars", "We're engaged", "You said yes! I can't wait to spend the rest of my life with you.", ["cheer", "cheer"]),
  t("occasion-christmas", "occasion", "snow", "Merry Christmas", "Merry Christmas, {B}. You're the best gift I've ever been given.", ["wave", "cheer"]),
  t("occasion-justbecause", "occasion", "garden", "Just because", "No special reason for this book. I just wanted you to know how loved you are.", ["wave", "stand"]),
  t("occasion-thinking", "occasion", "rain", "Thinking of you", "Wherever you are as you read this, know that I'm thinking of you.", ["stand", "stand"]),

  // Extras — the default book uses three of these; the rest are in the library
  t("extra-little-things", "extra", "home", "The little things", "It's the little things: the texts, the tea you make me, the way you say my name.", ["stand", "wave"]),
  t("extra-support", "extra", "rain", "You've got me", "Thank you for always having my back. With you, I can do anything.", ["reachRight", "reachLeft"]),
  t("extra-home", "extra", "home", "You are home", "Home isn't a place. Home is wherever you are.", ["hugRight", "hugLeft"]),
  t("extra-first-date", "extra", "cafe", "Our first date", "I still remember our first date. I knew right away you were someone special.", ["sit", "sit"]),
  t("extra-lazy-sundays", "extra", "couch", "Lazy Sundays", "My favourite plan is no plan at all, as long as it's with you.", ["sit", "sit"]),
  t("extra-inside-jokes", "extra", "spotlight", "Inside jokes", "We have a hundred inside jokes and I love every single one.", ["cheer", "cheer"]),
  t("extra-mornings", "extra", "sunrise", "Mornings with you", "Good mornings are the ones that start next to you.", ["stand", "wave"]),
  t("extra-favorite-person", "extra", "hearts", "My favourite person", "Out of everyone in the whole world, you're my favourite person.", ["reachRight", "reachLeft"]),
  t("extra-team", "extra", "mountains", "The best team", "You and me against the world. We make the best team.", ["cheer", "cheer"]),
  t("extra-dreams", "extra", "stars", "Our dreams", "I love dreaming about our future with you. It looks so bright.", ["reachRight", "reachLeft"]),
  t("extra-rainy-days", "extra", "rain", "Rainy days", "Even rainy days are good days with you.", ["reachRight", "reachLeft"]),
  t("extra-city-nights", "extra", "city", "City nights", "Late nights, city lights, and you by my side.", ["reachRight", "reachLeft"]),
];

export const TEMPLATE_MAP = new Map(TEMPLATES.map((tpl) => [tpl.id, tpl]));

export function getTemplate(id: string): PageTemplate | undefined {
  return TEMPLATE_MAP.get(id);
}

export const DEFAULT_EXTRAS = ["extra-little-things", "extra-support", "extra-home"];

export const CATEGORY_LABELS: Record<Category, string> = {
  core: "Story pages",
  feature: "Things I adore",
  quality: "Who you are",
  activity: "Things we love doing",
  occasion: "Occasions",
  extra: "Little extras",
};
