import { ConnectedWallet } from "@terra-money/wallet-provider";

export const isValidAddr = (address : string) : boolean => {
    // check the string format:
    // - starts with "terra1"
    // - length == 44 ("terra1" + 38)
    // - contains only numbers and lower case letters
    return /(terra1[a-z0-9]{38})/g.test(address);
}


export const toMicro = (num : number ) => {
  return 1000000 * num; 
}


export const addDecimals = ( num : number, decimals : number ) : string =>{

  let v = num * Math.pow(10, decimals);
   
  return v.toLocaleString('fullwide', {useGrouping:false});
}

export const terraFinderURI = (txHash : string, 
  wallet : ConnectedWallet | undefined ) : string|undefined => {

  if ( !wallet) { return; }

  let t : string = "https://finder.terra.money/"+wallet.network.name + "/tx/"+ txHash;
  return t; 

}


export const copy = (copyText : string ) =>{
 
    navigator.clipboard.writeText(copyText);
}