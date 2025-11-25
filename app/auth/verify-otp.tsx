import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { OtpInput, OtpInputRef } from 'react-native-otp-entry';
import { Container, Spacer, Button } from '../../src/components/ui';

export default function VerifyOTPScreen() {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const otpRef = useRef<OtpInputRef>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const phoneNumber = Array.isArray(params.phone) ? params.phone[0] : (params.phone || '81900');

  // Mask phone number: show country code + masked prefix to avoid confusion with OTP
  const getMaskedPhone = (phone: string) => {
    const digits = String(phone).replace(/\D/g, '');
    if (digits.length <= 4) return digits;
    // Show format like: +962 ••••••••1234 (country code + mostly masked + last 4)
    const last4 = digits.slice(-4);
    const countryCode = '+962';
    return `${countryCode} ••••••••${last4}`;
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
    console.log('Verify pressed, OTP length:', otp.length);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Navigating to tabs...');
      router.replace('/tabs');
    }, 1500);
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
          <Container className="flex-1 justify-between pt-16 pb-10">
            {/* Header */}
            <View className="mt-8">
              <Text className="text-white text-3xl font-bold mb-4 ">
                {t('auth.verifyOtp.title')}
              </Text>
              <View className="mb-2">
                <Text className="text-white text-base ">
                  {t('auth.verifyOtp.subtitle', { phone: maskedPhone })}
                </Text>
              </View>
              <Pressable onPress={handleEditPhone}>
                <Text className="text-fadedOrange font-semibold text-base ">
                  {t('common.edit')}
                </Text>
              </Pressable>
            </View>

            {/* Middle Section - OTP Input */}
            <View className="mb-20">

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
                        flexDirection: 'row',
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
                        textAlign: 'center',
                      },
                      focusedPinCodeContainerStyle: {
                        borderColor: '#FF8643',
                        borderWidth: 2,
                      },
                    }}
                    textInputProps={{
                      accessibilityLabel: 'One-Time Password',
                      testID: 'otp-input',
                      autoCorrect: false,
                      autoComplete: 'one-time-code',
                    }}
                  />
                </View>

                {/* Resend OTP */}
                <View className="mb-6">
                  {countdown > 0 ? (
                    <Text className="text-white text-sm text-center">
                      {t('auth.verifyOtp.resendIn')} ({countdown}s)
                    </Text>
                  ) : (
                    <View>
                      <Text className="text-white text-sm text-center mb-2">
                        {t('auth.verifyOtp.didntReceive')}
                      </Text>
                      <Pressable onPress={handleResendOTP}>
                        <Text className="text-fadedOrange font-semibold text-sm text-center">
                          {t('auth.verifyOtp.resend')}
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>

                {/* Verify Button */}
                <Button
                  title={t('auth.verifyOtp.verify')}
                  onPress={handleVerifyOTP}
                  variant="primary"
                  size="lg"
                  rounded="3xl"
                  fullWidth
                  loading={isLoading}
                />

                <Spacer size={6} />
              </View>
          </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
