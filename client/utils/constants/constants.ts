import Ideas from "./Ideas.json";

export const contractAbi = Ideas.abi;
export const contractAddress = "0x9df885EDd5Be9DaDBA83b153f96eadaD6E3c2442";

export enum ErrorMessage {
  default = "",
  MetamaskNotInstalled = "Please install metamask",
  PleaseAcceptMetamaskRequest = "Please accept request on metamask",
  AccessToMetamaskWasDenied = "Access to metamask was denied",
  GeneralError = "An unespected error has ocurred",
  NoAccoutFound = "No account found",
  PendingMetamaskAuthorization = "Pending metamask uthorization",
}
