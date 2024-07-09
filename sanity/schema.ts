import { type SchemaTypeDefinition } from "sanity";
import pageInfo from "./pageInfo";
import experience from "./experience";
import skill from "./skill";
import social from "./social";
import projects from "./projects";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skill, pageInfo, experience, social, projects],
};
