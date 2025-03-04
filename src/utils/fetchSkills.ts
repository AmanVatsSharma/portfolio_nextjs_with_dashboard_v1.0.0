import axios from "axios";
import { Skill } from "../../typing";

// export const fetchSkills = async () => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkills`);
//     const data = await res.json();
//     const skills: Skill[] = data.skills;
//     console.log('Fetching:', skills)
//     return skills;
// }


export const fetchSkills = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkills`);
    const skills: Skill[] = res.data.skills || [];
    return skills
}