import { MaterialIcons } from "@expo/vector-icons";
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
import Subjects from "./screens/Subjects";
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
				drawerActiveBackgroundColor: "rgba(0, 0, 0, 0.1)",
				drawerActiveTintColor: "rgba(0, 0, 0, 0.5)",
				drawerLabelStyle: {
					fontWeight: "bold",
				},
				headerTitleAlign: "center",
				headerTitleStyle: {
					fontSize: 18,
					fontWeight: "bold",
				},
				headerBackTitle: "Orqaga",
				headerRight: () => (
					<MaterialIcons
						name="logout"
						size={24}
						style={{ marginRight: 8 }}
						onPress={logout}
					/>
				),
			}}
		>
			<Drawer.Screen
				name="profile"
				component={Profile}
				options={{
					title: "Shaxsiy kabinet",
					drawerIcon: () => (
						<MaterialIcons
							name="person"
							size={28}
							style={{ color: "rgba(0, 0, 0, 0.5)" }}
						/>
					),
				}}
			/>

			<Drawer.Screen
				name="subjects"
				component={Subjects}
				options={{
					title: "Fanlar",
					drawerIcon: () => (
						<MaterialIcons
							name="book"
							size={28}
							style={{ color: "rgba(0, 0, 0, 0.5)" }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="profile4"
				component={Profile}
				options={{
					title: "Guruhlar",
					drawerIcon: () => (
						<MaterialIcons
							name="view-list"
							size={28}
							style={{ color: "rgba(0, 0, 0, 0.5)" }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="profile1"
				component={Profile}
				options={{
					title: "Ustozlar",
					drawerIcon: () => (
						<MaterialIcons
							name="groups"
							size={28}
							style={{ color: "rgba(0, 0, 0, 0.5)" }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="profile5"
				component={Profile}
				options={{
					title: "O'quvchilar",
					drawerIcon: () => (
						<MaterialIcons
							name="school"
							size={28}
							style={{ color: "rgba(0, 0, 0, 0.5)" }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="profile6"
				component={Profile}
				options={{
					title: "Tushumlar",
					drawerIcon: () => (
						<MaterialIcons
							name="payments"
							size={28}
							style={{ color: "rgba(0, 0, 0, 0.5)" }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="profile7"
				component={Profile}
				options={{
					title: "Chiqimlar",
					drawerIcon: () => (
						<MaterialIcons
							name="paid"
							size={28}
							style={{ color: "rgba(0, 0, 0, 0.5)" }}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name="profile8"
				component={Profile}
				options={{
					title: "Analitika",
					drawerIcon: () => (
						<MaterialIcons
							name="pie-chart"
							size={28}
							style={{ color: "rgba(0, 0, 0, 0.5)" }}
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
