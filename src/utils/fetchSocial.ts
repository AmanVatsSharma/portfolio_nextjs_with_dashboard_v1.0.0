import { Social } from "../../typing";
import axios from 'axios';

// export const fetchSocial = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSocial`);
//   const data = await res.json();
//   const socials: Social[] = data.socials;
//   return socials;
// };


export const fetchSocial = async (): Promise<Social[]> => {
  try {
    const res = await axios.get('${Process.env.NEXT_PUBLIC_BASE_URL}/api/getSocial');
    const socials: Social[] = await res.data.socials;
    return socials;
  } catch (error) {
    console.error('Error fetching socials:', error);
    return [];
  }
}