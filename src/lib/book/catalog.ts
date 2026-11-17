// Choices offered in the builder. Ids are stored — add, never rename.

export const OCCASIONS = [
  { id: "anniversary", label: "Anniversary" },
  { id: "valentines", label: "Valentine's Day" },
  { id: "birthday", label: "Birthday" },
  { id: "wedding", label: "Wedding" },
  { id: "engagement", label: "Engagement" },
  { id: "christmas", label: "Christmas" },
  { id: "justbecause", label: "Just because" },
  { id: "thinking", label: "Thinking of you" },
] as const;

export const RELATIONSHIPS = [
  { id: "partner", label: "Partner", word: "partner" },
  { id: "wife", label: "Wife", word: "wife" },
  { id: "husband", label: "Husband", word: "husband" },
  { id: "girlfriend", label: "Girlfriend", word: "girlfriend" },
  { id: "boyfriend", label: "Boyfriend", word: "boyfriend" },
  { id: "fiance", label: "Fiancé(e)", word: "fiancé(e)" },
] as const;

export const COVERS = [
  { id: "hearts", label: "Floating hearts" },
  { id: "stars", label: "Starry night" },
  { id: "bigheart", label: "Big heart" },
  { id: "sunrise", label: "Golden sunrise" },
  { id: "city", label: "City lights" },
  { id: "garden", label: "In bloom" },
  { id: "beach", label: "Seaside" },
  { id: "snow", label: "Snowy night" },
] as const;

export type CoverId = (typeof COVERS)[number]["id"];
export type OccasionId = (typeof OCCASIONS)[number]["id"];
export type RelationshipId = (typeof RELATIONSHIPS)[number]["id"];

export const FEATURES = [
  { id: "eyes", label: "Your eyes" },
  { id: "smile", label: "Your smile" },
  { id: "laugh", label: "Your laugh" },
  { id: "hair", label: "Your hair" },
  { id: "hugs", label: "Your hugs" },
  { id: "hands", label: "Your hands" },
  { id: "voice", label: "Your voice" },
  { id: "style", label: "Your style" },
  { id: "kisses", label: "Your kisses" },
  { id: "sleepy", label: "Your sleepy face" },
] as const;

export const QUALITIES = [
  { id: "kind", label: "Kind" },
  { id: "funny", label: "Funny" },
  { id: "smart", label: "Smart" },
  { id: "patient", label: "Patient" },
  { id: "adventurous", label: "Adventurous" },
  { id: "caring", label: "Caring" },
  { id: "honest", label: "Honest" },
  { id: "creative", label: "Creative" },
  { id: "brave", label: "Brave" },
  { id: "loyal", label: "Loyal" },
  { id: "hardworking", label: "Hard-working" },
  { id: "calm", label: "Calm" },
] as const;

export const ACTIVITIES = [
  { id: "cooking", label: "Cooking together" },
  { id: "movies", label: "Movie nights" },
  { id: "travel", label: "Travelling" },
  { id: "hiking", label: "Hiking" },
  { id: "dancing", label: "Dancing" },
  { id: "coffee", label: "Coffee dates" },
  { id: "roadtrips", label: "Road trips" },
  { id: "gaming", label: "Playing games" },
  { id: "music", label: "Music" },
  { id: "beach", label: "Beach days" },
  { id: "walks", label: "Long walks" },
  { id: "reading", label: "Reading" },
  { id: "pets", label: "Our pets" },
  { id: "stargazing", label: "Stargazing" },
] as const;

export const DEDICATION_TEMPLATES = [
  "To {B}, the best thing that ever happened to me. All my love, {A}",
  "{B}, every page of this book is true. Love always, {A}",
  "For {B} — my favourite person, my best friend, my home. Love, {A}",
  "To my {rel}: thank you for every ordinary day that felt like magic. Yours, {A}",
  "{B}, I made this so you never forget how loved you are. Forever yours, {A}",
] as const;
