import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ERROR_IMAGE = require('../../../assets/images/404-error.png');

interface ErrorScreenProps {
  onRetry?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ onRetry }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Image
          source={ERROR_IMAGE}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  illustration: {
    width: 288,
    height: 288,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  retryButton: {
    backgroundColor: '#F99043',
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryText: {
    fontFamily: 'DM Sans',
    fontWeight: '600',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
