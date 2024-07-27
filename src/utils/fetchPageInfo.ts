import axios from "axios";
import { PageInfo } from "../../typing";

// export const fetchPageInfo = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPageInfo`);
//   const data = await res.json();
//   const pageInfo: PageInfo = data.pageInfo;
//   return pageInfo;
// };



export const fetchPageInfo = async (): Promise<PageInfo> => {

  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPageInfo`);
  const arrayPageInfo: PageInfo[] = res.data.pageInfo;
  const pageInfo: PageInfo = arrayPageInfo[0]
  return pageInfo
};