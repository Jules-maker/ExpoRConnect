export interface Meeting {
    _id:         ID;
    Users:       string[];
    Host:        string;
    Date:        DateClass;
    BilledUsers: string[];
}

export interface DateClass {
    $date: Date;
}

export interface ID {
    $oid: string;
}
