import {
  uniqueNamesGenerator,
  adjectives,
  names,
  type Config,
} from "unique-names-generator";

export function generateRandomName(seed: string): string {
  const config: Config = {
    dictionaries: [adjectives, names],
    separator: "",
    style: "capital",
    seed,
    length: 2,
  };

  return uniqueNamesGenerator(config);
}
