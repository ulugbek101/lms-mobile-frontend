import {
	CommonActions,
	createNavigationContainerRef,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params = null, reset = false) {
	if (navigationRef.isReady()) {
		if (reset) {
			navigationRef.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name, params }],
				})
			);
		} else {
			navigationRef.navigate(name, params);
		}
	}
}
