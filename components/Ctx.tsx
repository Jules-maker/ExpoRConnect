import React from 'react';
import { useStorageState } from '@/tools/UseStorage';
import { api } from '@/tools/Api';
import { router } from 'expo-router';

const AuthContext = React.createContext<{
  signIn: (email: string, password:string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
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

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          try {
          const res = await api.post('Auth/login', {
            Email: email,
            Password: password
            });
            if(res.status === 200) {
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
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
