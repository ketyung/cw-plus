export interface Link {
    name : string,
    value : string, 
}

export interface Profile {

    wallet_address : string, 

    name : string, 

    profile_image_url? : string, 

    bio? : string, 

    hashtags? : string[], // up to 5

    emails? : string[], // up to 3, first email is the primary

    links? : Link[], 

    date_created? : Date, 

    date_updated? : Date, 

}

export enum MediaType {

    image = 1,

    video = 2,
}


export interface ProfileMediaType {

    type : MediaType,

    url : string, 

    date_created? : Date, 

    date_updated? : Date, 
}

export interface ProfileFollower {

    wallet_address : string, 

    date_created? : Date, 
}

export interface ProfileFollowing {

    wallet_address : string, 

    date_created? : Date, 
}

