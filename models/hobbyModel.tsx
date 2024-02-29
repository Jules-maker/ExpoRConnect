export interface Hobby {
    _id:         ID;
    Name:        string;
    Description: string;
}

export interface ID {
    $oid: string;
}