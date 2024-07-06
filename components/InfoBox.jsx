import { View, Text } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text style={titleStyles}>
        {title}
      </Text>
      <Text className="text-sm text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
