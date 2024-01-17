import Ideas from "./Ideas.json";

export const contractAbi = Ideas.abi;
export const contractAddress = "0xf0CeAC33970331CbBBDC8DF2FdD4F3185185ef68";

export enum ErrorMessage {
    default = "",
    MetamaskNotInstalled = "Please install metamask",
    PleaseAcceptMetamaskRequest = "Please accept request on metamask",
    AccessToMetamaskWasDenied = "Access to metamask was denied",
    GeneralError = "An unespected error has ocurred",
    NoAccoutFound = "No account found",
  }
  