export type Attributes =
  | "Strength"
  | "Dexterity"
  | "Constitution"
  | "Intelligence"
  | "Wisdom"
  | "Charisma";

export type Skills =
  | "Acrobatics"
  | "Dexterity"
  | "Animal Handling"
  | "Arcana"
  | "Athletics"
  | "Deception"
  | "History"
  | "Insight"
  | "Intimidation"
  | "Investigation"
  | "Medicine"
  | "Nature"
  | "Perception"
  | "Performance"
  | "Persuasion"
  | "Religion"
  | "Sleight of Hand"
  | "Stealth"
  | "Survival";

export type Class = "Barbarian" | "Wizard" | "Bard";

export type SkillCheck = {
  character: string;
  skill: Skills;
  skillVal: number;
  dc: number;
  roll: number;
};

export type AttributeModifier = { points: number; modifier: number };

export type AttributeResults = {
  [key in Attributes]: AttributeModifier;
};

export type SkillAttributeModifier = {
  points: number;
  attributeModifier: Attributes;
};

export type SkillResults = {
  [key in Skills]: SkillAttributeModifier;
};

export type CharacterSheetResults = { results: CharacterSheet[] };
export type CharacterSheet = {
  characterId: string;
  attributes: AttributeResults;
  skills: SkillResults;
};

export type SkillList = {
  name: string;
  attributeModifier: Attributes;
};
