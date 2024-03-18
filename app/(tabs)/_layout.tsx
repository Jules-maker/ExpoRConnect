import React from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useSession } from "@/components/Ctx";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <ActivityIndicator size={'large'} />
  }

  if (!session) {
    console.log("not session")
    return <Redirect href="/homeLauncher" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true),
        headerShown: false,
        headerTitleAlign: 'center',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          href: '/',
          title: 'Accueil',
          tabBarIcon: ({ color }) => <TabBarIcon name="feed" color={color} />,
            headerRight: () => (
                <Link href="/modal" asChild>
                    <Pressable>
                        {({ pressed }) => (
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={Colors[colorScheme ?? 'light'].text}
                                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </Link>
            ),
       
        }}
      />
      <Tabs.Screen 
        name="events"
        options={{
          href: '/events',
          title: 'Notifications',
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          href: '/map',
          title: 'Carte',
          tabBarIcon: ({ color }) => <TabBarIcon name="map-pin" color={color} />,
        }}
      />
      <Tabs.Screen
        name="host"
        options={{
          href: '/host',
          title: 'Lieux',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          href: '/profil',
          title: 'Profil',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />
        }}
      />
    </Tabs>
  );
}
