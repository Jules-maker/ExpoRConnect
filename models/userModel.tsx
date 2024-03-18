export interface User {
    id:             string;
    username:       string;
    password:       string;
    email:          string;
    firstname:      string;
    lastname:       string;
    birthdate:      Birthdate;
    hobbies:        any[];
    contacts:       any[];
    rating:         any[];
    missedmeetings: any[];
}

export interface Birthdate {
    $date: Date;
}

export interface ID {
    $oid: string;
}