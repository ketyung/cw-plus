export interface Link {
    name : string,

    value : string, 
}

export interface Profile {

    wallet_address : string, 

    name : string, 

    profile_image_url? : string, 

    bio? : string, 

    location? : string, 

    hashtags? : string[], // up to 5

    emails? : string[], // up to 3, first email is the primary

    links? : Link[], 

    date_created? : number, // date in timestamp, will need to convert JS Date type for display

    date_updated? : number, 

}

export enum MediaType {

    image = 1,

    video = 2,
}


export interface ProfileMediaType {

    type : MediaType,

    url : string, 

    date_created? : number, 

    date_updated? : number, 
}

export interface ProfileFollower {

    wallet_address : string, 

    date_created? : number, 
}

export interface ProfileFollowing {

    wallet_address : string, 

    date_created? : number, 
}

