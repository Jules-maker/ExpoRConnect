import { User } from "@/models/userModel";
import { api } from "@/tools/Api";
import React, { useEffect } from "react";
import { useSession } from "./Ctx";



const UserContext = React.createContext<{
    getUser: () => Promise<void>;
    user: null | User;
}>({
    getUser: async () => { },
    user: null,
});

// This hook can be used to access the user info.
export function useUserSession() {
    const value = React.useContext(UserContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useUserSession must be wrapped in a <SessionUserProvider />');
        }
    }

    return value;
}

export function SessionUserProvider(props: React.PropsWithChildren) {
    const { session, idUser } = useSession();
    const [user, setUser] = React.useState<User | null>(null);
    

    const fetchUser = async () => {
        try {
            const response = await api.get(`api/User/${idUser}`, { headers: { Authorization: session } });
            console.log(response.data);
            setUser(response.data);
        } catch (e) {
            setUser(null);
        } 
    }
    return (
        <UserContext.Provider
            value={{
                getUser: fetchUser,
                user,
            }}>
            {props.children}
        </UserContext.Provider>
    );
}