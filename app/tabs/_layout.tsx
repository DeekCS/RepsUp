import { Tabs } from 'expo-router';
import { View, Platform, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon, UsersIcon, CameraIcon, DumbbellIcon } from '@/src/components/icons/TabIcons';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  // Tab bar height calculation (72px = 4.5rem)
  const TAB_BAR_HEIGHT = 72;
  const BOTTOM_MARGIN = 0;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F99043', // Primary orange
        tabBarInactiveTintColor: '#A79D95', // dustyGrey
        headerShown: false,
        tabBarShowLabel: false, // Hide labels for cleaner look
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FBEEE4',
          borderTopWidth: 0,
          height: TAB_BAR_HEIGHT,
          paddingBottom: 0,
          paddingTop: 16,
          paddingHorizontal: 16,
          marginHorizontal: 0,
          marginBottom: BOTTOM_MARGIN,
          borderRadius: 0,
          shadowColor: 'transparent',
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 0,
          paddingHorizontal: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 40, // 2.5rem
              height: 40, // 2.5rem
              padding: 8, // 0.5rem
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              backgroundColor: focused ? '#F99043' : 'transparent',
            }}>
              <HomeIcon 
                width={24} 
                height={24} 
                color={focused ? '#FFFFFF' : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 40, // 2.5rem
              height: 40, // 2.5rem
              padding: 8, // 0.5rem
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              backgroundColor: focused ? '#F99043' : 'transparent',
            }}>
              <UsersIcon 
                width={24} 
                height={24} 
                color={focused ? '#FFFFFF' : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 40, // 2.5rem
              height: 40, // 2.5rem
              padding: 8, // 0.5rem
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              backgroundColor: focused ? '#F99043' : 'transparent',
            }}>
              <CameraIcon 
                width={24} 
                height={24} 
                color={focused ? '#FFFFFF' : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 40, // 2.5rem
              height: 40, // 2.5rem
              padding: 8, // 0.5rem
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              backgroundColor: focused ? '#F99043' : 'transparent',
            }}>
              <DumbbellIcon 
                width={24} 
                height={24} 
                color={focused ? '#FFFFFF' : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
