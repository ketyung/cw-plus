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
            {"followings":{ "key" : "profile_"+ (wallet?.walletAddress ?? ""),
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

    const followersCount = async ( completion? : (count : number) => void) =>{

        await query( contractAddress, wallet, 
            {"followers_count":{ "key" : "profile_"+ (wallet?.walletAddress ?? "")}} ,(obj)=>{

            if (obj instanceof Error){

                if ( completion )
                    completion(0);
            }
            else {

                if ( completion )
                    completion (obj.count);
                
            }

        });
    }

    const followingsCount = async ( completion? : (count : number) => void) =>{

        await query( contractAddress, wallet, 
            {"followings_count":{ "key" : "profile_"+ (wallet?.walletAddress ?? "")}} ,(obj)=>{

            if (obj instanceof Error){

                if ( completion )
                    completion(0);
            }
            else {

                if ( completion )
                    completion (obj.count);
                
            }

        });
    }

    return {queryProfile, queryProfileFollowers, queryProfileFollowings, 
        followersCount, followingsCount} as const;

}