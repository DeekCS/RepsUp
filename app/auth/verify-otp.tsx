import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { OtpInput, OtpInputRef } from 'react-native-otp-entry';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Container, Spacer, Button } from '../../src/components/ui';

export default function VerifyOTPScreen() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const otpRef = useRef<OtpInputRef>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const phoneNumber = Array.isArray(params.phone) ? params.phone[0] : (params.phone || '81900');

  // Mask phone number - show first digits and mask last 5 with stars
  const getMaskedPhone = (phone: string) => {
    const phoneStr = String(phone);
    if (phoneStr.length <= 5) return phoneStr;
    const visiblePart = phoneStr.slice(0, -5);
    return `${visiblePart} *****`;
  };

  const maskedPhone = getMaskedPhone(phoneNumber);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyOTP = async () => {
    if (otp.length === 5) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        router.replace('/tabs');
      }, 1500);
    }
  };

  const handleResendOTP = () => {
    if (countdown === 0) {
      setCountdown(60);
      otpRef.current?.clear();
      setOtp('');
      // Add your resend OTP logic here
      console.log('Resending OTP...');
    }
  };

  const handleEditPhone = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <Image
        source={require('../../assets/images/login/1.jpg')}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        contentFit="cover"
        cachePolicy="memory-disk"
        priority="high"
      />
      
      {/* Dark overlay */}
      <View className="flex-1 bg-black/60">
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bottomOffset={20}
        >
          <Container className="flex-1 justify-between pt-16 pb-10">
          {/* Header */}
          <View className="mt-8">
            <Text className="text-white text-3xl font-bold">Verification</Text>
          </View>

          {/* Middle Section - Pushed up */}
          <View className="mb-20">
                {/* Title and Description */}
                <Text className="text-white text-2xl font-bold mb-1">
                  Awesome Thanks
                </Text>
                <View className="flex-row items-center  mb-8">
                  <Text className="text-white text-base text-center">
                    We have just Send an OTP to {maskedPhone}{' '}
                  </Text>
                  <Pressable onPress={handleEditPhone}>
                    <Text className="text-fadedOrange font-semibold text-base mx-1">Edit</Text>
                  </Pressable>
                </View>

                {/* OTP Input */}
                <View className="mb-6">
                  <OtpInput
                    ref={otpRef}
                    numberOfDigits={5}
                    onTextChange={setOtp}
                    onFilled={(text) => {
                      console.log('OTP filled:', text);
                      setOtp(text);
                    }}
                    autoFocus
                    focusColor="#FF8643"
                    focusStickBlinkingDuration={500}
                    theme={{
                      containerStyle: {
                        gap: 12,
                      },
                      pinCodeContainerStyle: {
                        backgroundColor: 'white',
                        borderRadius: 12,
                        height: 64,
                        width: 56,
                        borderWidth: 2,
                        borderColor: 'transparent',
                      },
                      pinCodeTextStyle: {
                        color: '#3D3D26',
                        fontSize: 24,
                        fontFamily: 'DMSans-Bold',
                      },
                      focusedPinCodeContainerStyle: {
                        borderColor: '#FF8643',
                        borderWidth: 2,
                      },
                    }}
                    textInputProps={{
                      accessibilityLabel: 'One-Time Password',
                      testID: 'otp-input',
                    }}
                  />
                </View>

                {/* Resend OTP */}
                <View className="flex-row items-center justify-center mb-6">
                  <Text className="text-white text-sm">
                    Don't receive the OTP ?{' '}
                  </Text>
                  <Pressable onPress={handleResendOTP} disabled={countdown > 0}>
                    <Text 
                      className={`font-semibold text-sm ${
                        countdown > 0 ? 'text-gray-400' : 'text-fadedOrange'
                      }`}
                    >
                      Resend OTP {countdown > 0 && `(${countdown}s)`}
                    </Text>
                  </Pressable>
                </View>

                {/* Verify Button */}
                <Button
                  title="Verify OTP"
                  onPress={handleVerifyOTP}
                  variant="primary"
                  size="lg"
                  rounded="3xl"
                  fullWidth
                  loading={isLoading}
                  disabled={otp.length < 5}
                />

                <Spacer size={6} />
              </View>
          </Container>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
