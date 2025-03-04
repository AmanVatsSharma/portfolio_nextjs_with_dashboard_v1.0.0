import axios from 'axios';
import { Social } from '../../typing';

// export const fetchSocial = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSocials`);
//   const data = await res.json();
//   const socials: Social[] = data.socials;
//   return socials;
// };



export const fetchSocial = async (): Promise<Social[]> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSocials`);
    const socials: Social[] = res.data.socials || [];
    return socials;
  } catch (error) {
    console.error('Error fetching socials:', error);
    return [];
  }
};