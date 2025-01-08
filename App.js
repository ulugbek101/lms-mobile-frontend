import { MaterialIcons } from "@expo/vector-icons"; // Import FontAwesome for the user icon
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { navigationRef } from "./helpers/navigation";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack({ navigation }) {
	const { authTokens, logout } = useContext(AuthContext);

	useEffect(() => {
		if (!authTokens) {
			navigation.navigate("login");
		}
	}, [authTokens]);

	return (
		<Drawer.Navigator
			initialRouteName="profile"
			screenOptions={{
				drawerItemStyle: {
					borderRadius: 6,
				},
				drawerActiveBackgroundColor: "rgba(0, 0, 0, 0.05)",
				drawerActiveTintColor: "rgba(0, 0, 0, 0.5)",
				drawerLabelStyle: {
					fontWeight: "bold",
				},
			}}
		>
			<Drawer.Screen
				name="profile"
				component={Profile}
				options={{
					headerRight: () => (
						<MaterialIcons
							name="logout"
							size={24}
							style={{ marginRight: 8 }}
							onPress={logout}
						/>
					),
				}}
			/>
		</Drawer.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer ref={navigationRef}>
				<AuthContextProvider>
					<Stack.Navigator initialRouteName="authStack">
						<Stack.Screen
							name="login"
							component={Login}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="authStack"
							component={AuthStack}
							options={{ headerShown: false, headerShadowVisible: false }}
						/>
					</Stack.Navigator>
				</AuthContextProvider>
			</NavigationContainer>
			<Toast />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
