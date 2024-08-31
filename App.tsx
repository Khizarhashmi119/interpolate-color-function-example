import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Dimensions, StyleSheet, Switch, useColorScheme } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const COLORS = {
  dark: {
    background: "#1e1e1e",
    circle: "#252525",
    text: "#f8f8f8",
  },
  light: {
    background: "#f8f8f8",
    circle: "#ffffff",
    text: "#1e1e1e",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256, 0, 256, 0.2)",
  false: "rgba(0, 0, 0, 0.1)",
};

const { width } = Dimensions.get("screen");
const SIZE = width * 0.7;

type Theme = "dark" | "light";

export default function App() {
  const colorScheme = useColorScheme();

  console.log({ colorScheme });

  const [theme, setTheme] = React.useState<Theme>(colorScheme ?? "dark");

  const themeValue = useDerivedValue(() => {
    return withTiming(theme === "light" ? 0 : 1);
  }, [theme]);

  const handleChangeTheme = (value: boolean) =>
    setTheme(value ? "dark" : "light");

  const containerAnimatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      themeValue.value,
      [0, 1],
      [COLORS.light.background, COLORS.dark.background]
    );

    return {
      backgroundColor,
    };
  });

  const textAnimatedStyles = useAnimatedStyle(() => {
    const color = interpolateColor(
      themeValue.value,
      [0, 1],
      [COLORS.light.text, COLORS.dark.text]
    );

    return {
      color,
    };
  });

  const switchContainerAnimatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      themeValue.value,
      [0, 1],
      [COLORS.light.circle, COLORS.dark.circle]
    );

    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.container, containerAnimatedStyles]}>
      <Animated.Text style={[styles.text, textAnimatedStyles]}>
        THEME
      </Animated.Text>
      <Animated.View
        style={[styles.switchContainer, switchContainerAnimatedStyles]}
      >
        <Switch
          value={theme === "dark"}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor="#8f00ff"
          onValueChange={handleChangeTheme}
        />
      </Animated.View>
      <StatusBar style="auto" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 70,
    fontWeight: "700",
    letterSpacing: 14,
    marginBottom: 20,
  },
  switchContainer: {
    alignItems: "center",
    borderRadius: SIZE / 2,
    elevation: 8,
    height: SIZE,
    justifyContent: "center",
    width: SIZE,
  },
});
