import { MVP } from "./types";

export const MVPAllowList: string[] = [
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
  "Baphomet",
  "Dark Lord",
  "Lord of the Dead",
  "Orc Lord",
  "Stormy Knight",
  "Kraken",
  "Detardeurus",
  "Valkyrie Randgris",
  "RSX-0806",
  "Bone Detardeurus",
  "Mistress ⚔️",
  "Moonlight Flower ⚔️",
  "Baphomet ⚔️",
  "Doppelganger ⚔️",
  "Valkyrie Reginleif",
  "Valkyrie Ingrid",
  "Giant Octopus",
  "Bacsojin",
  "Evil Snake Lord",
  "Lady Tanee",
];
export const filterMVPs = (MVPs: MVP[]) =>
  MVPs.filter((mvp) => MVPAllowList.includes(mvp.name));
