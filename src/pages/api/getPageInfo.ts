import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "./sanity";
import { PageInfo } from "../../../typing";

const query = groq`
*[_type == "pageInfo"] 

`

type Data = {
    pageInfo: PageInfo[]
}    

export default async function  handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

  // Add CORS headers

  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins or specify a specific origin

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }


    const pageInfo: PageInfo[] = await sanityClient.fetch(query);
    res.status(200).json({ pageInfo })
}