export interface HostResponse {
    data:       Host[];
    totalCount: number;
}

export interface Host {
    address:      string;
    city:         string;
    createdat:    Date;
    description:  string;
    id:           string;
    isverified:   boolean;
    mainphoto:    string;
    name:         string;
    openinghours: string[];
    phone:        string;
}
