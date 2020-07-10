import { MVP } from "./types";

export const MVPWhitelist: string[] = [
  "Eddga",
  "Tao Gunka",
  "Amon Ra",
  "Dracula",
  "Golden Thief Bug",
  "Phreeoni",
  "Mistress",
  "Moonlight Flower",
  "Osiris",
  "Drake",
  "Pharaoh",
  "Hatii",
  "Turtle General",
  "Maya",
  "Doppelganger",
  "Orc Hero",
  "Samurai Specter",
  "Vesper",
  "White Lady",
  "Baphomet",
  "Dark Lord",
  "Lord of the Dead",
  "Orc Lord",
  "Stormy Knight",
  "Kraken",
  "Detardeurus",
  "Valkyrie Randgris",
  //"Bone Detardeurus""
];
export const filterMVPs = (MVPs: MVP[]) =>
  MVPs.filter((mvp) => MVPWhitelist.includes(mvp.name));
