import { Experience } from '../../typing';
import axios from 'axios';

// export const fetchExperience = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getExperience`);
//   const data = await res.json();
//   const experiences: Experience[] = data.experiences;
//   return experiences;
// };

export const fetchExperience = async (): Promise<Experience[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getExperience`);
   const experiences : Experience[] = res.data.experiences;
   return experiences
}
