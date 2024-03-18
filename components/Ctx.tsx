import React, { useEffect } from 'react';
import { useStorageState } from '@/tools/UseStorage';
import { api } from '@/tools/Api';
import { router } from 'expo-router';
import { Buffer } from 'buffer';

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  idUser?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => { },
  signOut: () => null,
  session: null,
  idUser: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [[_, idUser], setIdUser] = useStorageState('idUser');

  useEffect(() => {
    if (session) {
      // get the user id from the JWT token 
      const parts: Buffer[] = session.split('.').map((part: string): Buffer => {
        return Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
      });
      const payload = JSON.parse(parts[1].toString());
      setIdUser(payload.nameid);
    }
  }
    , [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          try {
            const res = await api.post('Auth/login', {
              Email: email,
              Password: password
            });
            if (res.status === 200) {
              console.log(res.data);
              setSession(res.data.token);
              router.replace('/(tabs)');
            }
            else {
              alert('Email ou mot de passe incorrecte');
            }
          } catch (error) {
            // TODO remove error 
            console.error(error);
            alert('Email ou mot de passe incorrecte');
          }
        },
        signOut: () => {
          setSession(null);
          router.replace('/login');
        },
        session,
        idUser,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
