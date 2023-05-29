import { createContext, useEffect, useState, useRef, useContext } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import { Keyboard } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const SystemContext = createContext({});

export function SystemProvider({ children }) {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(true);
  const [keyboardStatus, setKeyboardStatus] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#0d6efd",
        icon: "https://auth.uniaraxa.edu.br/app/Content/img/banner-logo-nova.png",
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }

  function getTokenNotification() {
    if (expoPushToken === "") {
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    }
    return expoPushToken;
  }

  async function sendTokenForUser(userId) {
    try {
      const tokenPush = getTokenNotification();
      const data = {
        token: tokenPush,
        iD_PESSOA: userId,
      };
      await api.post("/token/pushUserId", data);
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("hidden");
    });

    // return () => {
    //   showSubscription.remove();
    //   hideSubscription.remove();
    // };
  }, []);

  return (
    <SystemContext.Provider
      value={{
        getTokenNotification,
        sendTokenForUser,
        visibleMenu,
        setVisibleMenu,
        keyboardStatus,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export default SystemContext;

export const useSystem = () => {
  const context = useContext(SystemContext);
  return context;
};
