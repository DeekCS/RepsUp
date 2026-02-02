/**
 * HeroBanner Component
 * 
 * Main hero banner with greeting, motivational message, and workout image
 */

import React from 'react';
import { View, Text, StyleSheet, Image, I18nManager } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

interface HeroBannerProps {
  /** Greeting text */
  greeting?: string;
  /** Name to display */
  name?: string;
  /** Motivational message */
  message?: string;
  /** Background image URI */
  image?: any;
}

const isRTL = I18nManager.isRTL;

const DecorativeWave = () => (
  <Svg 
    width={103} 
    height={25} 
    viewBox="0 0 103 25" 
    fill="none" 
    style={[
      styles.decorativeWave,
      isRTL && { transform: [{ scaleX: -1 }], right: -16, left: undefined }
    ]}
  >
    <Path
      d="M0.248779 21.6782C12.7488 14.5116 36.8488 5.27822 33.2488 25.6782C61.5821 6.67814 114.349 -19.922 98.7488 25.6782"
      stroke="white"
      strokeWidth={1}
      fill="none"
    />
  </Svg>
);

export function HeroBanner({
  greeting = 'Hey !',
  name = 'Buddy',
  message = 'Workouts are more fun and motivating with a partner by your side',
  image,
}: HeroBannerProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isRTL ? ['#FFFFFF', '#F99043'] : ['#F99043', '#FFFFFF']}
        start={{ x: isRTL ? 1.99 : 0, y: 0.5 }}
        end={{ x: isRTL ? 0 : 1.99, y: 0.5 }}
        locations={[0, 1]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>
              {greeting} {name}
            </Text>
            <Text style={styles.message}>{message}</Text>
            
            {/* Decorative Wave */}
            <DecorativeWave />
          </View>

          {/* Workout Image */}
          {image && (
            <Image
              source={image}
              style={[
                styles.workoutImage,
                isRTL && { transform: [{ scaleX: -1 }] }
              ]}
              resizeMode="cover"
            />
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0, // No horizontal margin - full width
    marginTop: 16, // Standard spacing from header
    marginBottom: 20,
    width: '100%', // Full width
    height: 157, // 9.8125rem = 157px
    borderRadius: 12, // 0.75rem = 12px
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    borderRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingStart: 16, // RTL-aware padding
    paddingEnd: 0,
    paddingVertical: 16,
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingEnd: 8, // RTL-aware padding
    position: 'relative',
  },
  greeting: {
    color: '#FFFFFF',
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 16, // 1rem = 16px
    fontWeight: '600',
    lineHeight: 16,
    width: 67, // 4.1875rem = 67px
    marginBottom: 8,
    textAlign: 'left', // Will auto-flip in RTL
  },
  message: {
    width: 223, // 13.9375rem = 223px
    color: '#FFFFFF',
    fontFamily: 'DMSans_500Medium',
    fontSize: 12, // 0.75rem = 12px
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 40,
    textAlign: 'left', // Will auto-flip in RTL
  },
  decorativeWave: {
    position: 'absolute',
    bottom: -10,
    start: -16, // RTL-aware positioning
  },
  workoutImage: {
    width: 234.3, // 14.64475rem = 234.3px
    height: 159, // 9.9375rem = 159px
    borderTopStartRadius: isRTL ? 12 : 0,
    borderTopEndRadius: isRTL ? 0 : 12,
    borderBottomStartRadius: isRTL ? 20 : 0,
    borderBottomEndRadius: isRTL ? 0 : 20,
  },
});

export default HeroBanner;
