import { FC , useEffect, useState} from "react";
import { abbNum } from "../../../common/utils/funcs";
import useQuery from "../../../contracts/profileContract/hooks/useQuery";

export enum CountType {

    followers = 1,

    followings = 2, 
}

export interface CountViewProps {

    type? : CountType, 
}

export const CountView : FC <CountViewProps> = ({type}) => {

    const {followersCount, followingsCount} = useQuery();

    const [count, setCount] = useState(0);

    useEffect(()=>{

       if (type){
           if( type === CountType.followers){

                followersCount((c)=>{

                    setCount(c);
                })
           }
           else {
  
                followingsCount((c)=>{

                    setCount(c);
                })
   
           }
       }

    },[]);

    return <div className="countView"><span className="count">{abbNum(count)}</span><br/>
    <span className="text">{type === CountType.followers ? "Followers" : "Following"}</span>
    </div>

};