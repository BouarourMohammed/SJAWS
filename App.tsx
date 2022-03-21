import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { AppContainer } from "./src/navigation";
import { store } from "./src/state";

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({});
