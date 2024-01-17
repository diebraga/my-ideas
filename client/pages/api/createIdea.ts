import { contractAbi, contractAddress } from "@/utils/constants/constants";
import { Contract } from "ethers";
import { JsonRpcSigner } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

interface IdeaData {
  title: string;
  idea: string;
  signer: JsonRpcSigner;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const idea: IdeaData = req.body;

    const contract = new Contract(contractAddress, contractAbi, idea.signer);

    // const transactionHash = await contract.addIdea(
    //   addressTo,
    //   value,
    //   message,
    //   Date.now(),
    //   keyword
    // );
    // await transactionHash.wait();
    res.status(200).json(contract);
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
