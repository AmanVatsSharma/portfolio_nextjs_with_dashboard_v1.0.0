import axios from "axios";
import { Project } from "../../typing";

// export const fetchProjects = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getProject`);
//   const data = await res.json();
//   const projects: Project[] = data.projects;
//   return projects;
// };


export const fetchProjects = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getProjects`);
  const projects: Project[] = res.data.projects;
  return projects;
}