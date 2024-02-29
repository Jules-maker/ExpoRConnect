export interface Host {
    _id:          ID;
    Name:         string;
    Description:  string;
    Address:      string;
    City:         string;
    Phone:        string;
    Mainphoto:    string;
    Createdat:    Date;
    Isverified:   boolean;
    Openinghours: string[];
}

export interface ID {
    $oid: string;
}