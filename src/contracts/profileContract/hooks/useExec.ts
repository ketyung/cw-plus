import { useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { contractAddress } from "../config";
import { TxInfo } from "@terra-money/terra.js";
import { execute } from "../../../common/utils";
import { Profile } from "../models";


export default function useExec() {

    const wallet = useConnectedWallet();
  
    const [loading, setLoading] = useState(false);

    
    const createProfile = async (profile : Profile, completion? : (obj : TxInfo | Error) => void) =>{

        await execute (contractAddress, wallet, { 
            create_profile : { profile : profile } }, completion, setLoading);
    }


    return {createProfile, loading} as const;
}