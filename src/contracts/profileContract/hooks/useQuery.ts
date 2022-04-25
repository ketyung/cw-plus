import { useConnectedWallet } from "@terra-money/wallet-provider";
import { query } from "../../../common/utils";
import { contractAddress } from "../config";
import { Profile, ProfileFollower, ProfileFollowing } from "../models";
import { DEFAULT_PROFILE } from "../models/defaults";

export default function useQuery() {

    const wallet = useConnectedWallet();

    const queryProfile = async  (completion? : (profile : Profile ) => void) =>{

        await query( contractAddress, wallet, {"profile":{ "key" : "profile_"+ (wallet?.walletAddress ?? "")  }} ,(obj)=>{

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


    const queryProfileFollowers = async (
        startAfter? : string, 
        limit? : number, 
        completion? : (followers : ProfileFollower[]) => void) =>{

        await query( contractAddress, wallet, 
            {"followers":{ "key" : "profile_"+ (wallet?.walletAddress ?? ""),
            "start_after" : startAfter, "limit" : limit, 
            }} ,(obj)=>{

            if (obj instanceof Error){

                if ( completion )
                    completion([]);
            }
            else {

                if ( completion )
                    completion (obj.followers);
                
            }

        });
        
    }


    const queryProfileFollowings = async (
        startAfter? : string, 
        limit? : number, 
        completion? : (followings : ProfileFollowing[]) => void) =>{

        await query( contractAddress, wallet, 
            {"followings":{ "key" : "profile_"+ (wallet?.walletAddress ?? ""),
            "start_after" : startAfter, "limit" : limit, 
            }} ,(obj)=>{

            if (obj instanceof Error){

                if ( completion )
                    completion([]);
            }
            else {

                if ( completion )
                    completion (obj.followings);
                
            }

        });
        
    }

    return {queryProfile, queryProfileFollowers, queryProfileFollowings} as const;

}