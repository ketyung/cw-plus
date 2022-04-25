import { useConnectedWallet } from "@terra-money/wallet-provider";
import { query } from "../../../common/utils";
import { contractAddress } from "../config";
import { Profile } from "../models";
import { DEFAULT_PROFILE } from "../models/defaults";

export default function useQuery() {

    const wallet = useConnectedWallet();

    const queryProfile = (completion? : (profile : Profile ) => void) =>{

        query( contractAddress, wallet, {"profile":{ "key" : "profile_"+ (wallet?.walletAddress ?? "")  }} ,(obj)=>{

            if (obj instanceof Error){

                if ( completion )
                    completion(DEFAULT_PROFILE);
            }
            else {

                if ( completion )
                    completion (obj);
                
            }

        });
        
    }

    return {queryProfile} as const;
    
}