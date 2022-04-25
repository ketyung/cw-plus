import { useConnectedWallet } from "@terra-money/wallet-provider";
import { query } from "../../../common/utils";
import { contractAddress } from "../config";
import { Profile, ProfileFollower, ProfileFollowing } from "../models";
import { DEFAULT_PROFILE } from "../models/defaults";


export default function useQuery() {

    const wallet = useConnectedWallet();

    const profileKey = "profile_"+ (wallet?.walletAddress ?? "");
    
    const queryProfile = async  (completion? : (profile : Profile ) => void) =>{

        await query( contractAddress, wallet, {"profile":{ "key" : profileKey  }} ,(obj)=>{

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
            {"followers":{ "key" :profileKey ,
            "start_after" : "fwr_"+wallet?.walletAddress+"_"+startAfter, "limit" : limit, 
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
            {"followings":{ "key" : profileKey,
            "start_after" : "flw_"+wallet?.walletAddress+"_"+startAfter, "limit" : limit, 
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

    const followersCount = async ( completion? : (count : number) => void, defaultValue : number = 220 ) =>{

        await query( contractAddress, wallet, 
            {"followers_count":{ "key" : profileKey }} ,(obj)=>{

            if (obj instanceof Error){

                if ( completion )
                    completion(defaultValue);
            }
            else {

                if ( completion )
                    completion (obj.count);
                
            }

        });
    }

    const followingsCount = async ( completion? : (count : number) => void,  defaultValue : number = 135000) =>{

        await query( contractAddress, wallet, 
            {"followings_count":{ "key" : profileKey }} ,(obj)=>{

            if (obj instanceof Error){

                if ( completion )
                    completion(defaultValue);
            }
            else {

                if ( completion )
                    completion (obj.count);
                
            }

        });
    }

    return {queryProfile, queryProfileFollowers, queryProfileFollowings, 
        followersCount, followingsCount, profileKey} as const;

}