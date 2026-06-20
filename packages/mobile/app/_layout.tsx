import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="marketing" />
      <Stack.Screen name="soft-onboarding" />
      <Stack.Screen name="personalisation" />
      <Stack.Screen name="profile-completion" />
      <Stack.Screen name="contact-details" />
      <Stack.Screen name="profile-success" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="discover-therapists" />
      <Stack.Screen name="login" />
      <Stack.Screen name="therapist-register" />
      <Stack.Screen name="home" />
      <Stack.Screen name="care" />
      <Stack.Screen name="my-appointments" />
      <Stack.Screen name="book-appointment" />
      <Stack.Screen name="booking-confirmed" />
      <Stack.Screen name="session-confirm" />
      <Stack.Screen name="medical-profile-1" />
      <Stack.Screen name="medical-profile-2" />
      <Stack.Screen name="medical-profile-3" />
      <Stack.Screen name="medical-profile-4" />
    </Stack>
  );
}
