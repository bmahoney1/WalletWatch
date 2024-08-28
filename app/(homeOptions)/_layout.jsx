import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import GlobalProvider from "../../context/GlobalProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const homeOptionsLayout = () => {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="Income" options={{ headerShown: false }} />
        <Stack.Screen name="TotalExpenses" options={{ headerShown: false }} />
        <Stack.Screen name="NetMoney" options={{ headerShown: false }} />
        <Stack.Screen name="AvgMonthlyExpenses" options={{ headerShown: false }} />
        <Stack.Screen name="MaximizeMoney" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default homeOptionsLayout;
