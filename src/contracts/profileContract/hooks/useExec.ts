import { useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { contractAddress } from "../config";
import { TxInfo } from "@terra-money/terra.js";
import { execute } from "../../../common/utils";
import { Profile } from "../models";
import useQuery from "./useQuery";

export default function useExec() {

    const wallet = useConnectedWallet();
  
    const [loading, setLoading] = useState(false);

    const {profileKey} = useQuery();
    
    const createProfile = async (profile : Profile, completion? : (obj : TxInfo | Error) => void) =>{

        await execute (contractAddress, wallet, { 
            create_profile : { profile : profile } }, completion, setLoading);
    }


    const updateProfile = async (profile : Profile, completion? : (obj : TxInfo | Error) => void) =>{

        await execute (contractAddress, wallet, { 
            update_profile : { key : profileKey, profile : profile } }, completion, setLoading);
    }


    const updateProfileImageUrl = async (url : string, completion? : (obj : TxInfo | Error) => void) =>{

        await execute (contractAddress, wallet, { 
            update_profile_image : { key : profileKey, url : url } }, completion, setLoading);
    }


    return {createProfile,updateProfile,updateProfileImageUrl, loading} as const;
}