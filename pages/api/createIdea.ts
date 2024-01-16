import { JsonRpcSigner } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

interface IdeaData {
  title: string;
  idea: string;
  signer: JsonRpcSigner;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const idea: IdeaData = req.body;

    res.status(200).json(idea);
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
