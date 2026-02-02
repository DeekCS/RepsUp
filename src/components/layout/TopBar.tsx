/**
 * TopBar Component
 * 
 * Top navigation bar with location, notifications, favorites, and profile
 * Based on design system with orange brand background
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LocationIcon } from '@/src/components/icons/TabIcons';

interface TopBarProps {
  /** Main location title */
  locationTitle?: string;
  /** Secondary location details */
  locationSubtitle?: string;
  /** Profile image URI */
  profileImage?: string;
  /** Callback when location is pressed */
  onLocationPress?: () => void;
  /** Callback when message/chat icon is pressed */
  onMessagePress?: () => void;
  /** Callback when heart/favorite icon is pressed */
  onFavoritePress?: () => void;
  /** Callback when profile is pressed */
  onProfilePress?: () => void;
}

export function TopBar({
  locationTitle = '6th Cross Rd',
  locationSubtitle = 'HAL 2nd Stage, Indiranagar...',
  profileImage,
  onLocationPress,
  onMessagePress,
  onFavoritePress,
  onProfilePress,
}: TopBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {/* Left Section - Location */}
      <TouchableOpacity 
        style={styles.locationContainer}
        onPress={onLocationPress}
        activeOpacity={0.7}
      >
        <LocationIcon width={24} height={24} color="#FFFFFF" />
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationTitle} numberOfLines={1}>
            {locationTitle}
          </Text>
          <Text style={styles.locationSubtitle} numberOfLines={1}>
            {locationSubtitle}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Right Section - Actions */}
      <View style={styles.actionsContainer}>
        {/* Message/Chat Icon */}
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onMessagePress}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Heart/Favorite Icon */}
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onFavoritePress}
          activeOpacity={0.7}
        >
          <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Profile Picture */}
        <TouchableOpacity 
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          {profileImage ? (
            <Image 
              source={{ uri: profileImage }} 
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Ionicons name="person" size={20} color="#FF8643" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F99043', // Primary orange - exact from design
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginEnd: 16,
  },
  locationTextContainer: {
    marginStart: 8,
    flex: 1,
  },
  locationTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'left',
  },
  locationSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'left',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profilePlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default TopBar;
