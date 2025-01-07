import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { navigationRef } from "./helpers/navigation";

import { StatusBar } from "expo-status-bar";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import AuthContextProvider from "./store/auth-context";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
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
			<Drawer.Screen name="profile" component={Profile} />
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
						<Stack.Screen name="login" component={Login} />
						<Stack.Screen
							name="authStack"
							component={AuthStack}
							options={{ headerShown: false, headerShadowVisible: false }}
						/>
					</Stack.Navigator>
				</AuthContextProvider>
			</NavigationContainer>
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
