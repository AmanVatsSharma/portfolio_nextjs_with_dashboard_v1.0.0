import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "./sanity";
import { Project } from "../../../typing";

const query = groq`
*[_type == "projects"] {
...,
technologies[]->
}

`

type Data = {
    projects: Project[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins or specify a specific origin

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }


    const projects: Project[] = await sanityClient.fetch(query);
    res.status(200).json({ projects })
}