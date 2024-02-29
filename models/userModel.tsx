export interface User {
    _id:            ID;
    Username:       string;
    Password:       string;
    Email:          string;
    Firstname:      string;
    Lastname:       string;
    Birthdate:      Birthdate;
    Hobbies:        any[];
    Contacts:       any[];
    Rating:         any[];
    Missedmeetings: any[];
}

export interface Birthdate {
    $date: Date;
}

export interface ID {
    $oid: string;
}