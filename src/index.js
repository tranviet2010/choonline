import React, { Component } from "react";
import { View, Image, Text, SafeAreaView } from "react-native";
import AppNavigation from "./navigation";
import { Provider, connect } from "react-redux";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Root } from "native-base";
import { store, persistor } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { YellowBox } from "react-native";
import { _retrieveData } from "./utils/asynStorage";
import { MenuProvider } from "react-native-popup-menu";
// import codePush from "react-native-code-push";
import ProgressCircle from "react-native-progress-circle";
import SplashScreen from "react-native-splash-screen";
import { sizeWidth, sizeHeight, sizeFont } from "./utils/helper/size.helper";
import { COLOR } from "./utils/color/colors";
import { Platform } from "react-native";
var totalPercen = 0;


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      timeout: 0,
      syncMessage: "",
      loading: false,
      isSubscribed:'',
      tolal: 1,
      recived: 0,
    };
    this.time = setTimeout(() => {
      this.time = 10;
    }, 2000);
  }

  onSyncStatusChange = (SyncStatus) => {
    switch (SyncStatus) {
      case SyncStatus.CHECKING_FOR_UPDATE:
        // Show "Checking for update" notification
        break;
      case SyncStatus.AWAITING_USER_ACTION:
        // Show "Checking for update" notification
        break;
      case SyncStatus.DOWNLOADING_PACKAGE:
        // Show "downloading" notification
        break;
      case SyncStatus.INSTALLING_UPDATE:
        // Show "installing" notification
        break;
    }
  };
  onDownloadProgress = (downloadProgress) => {
    this.setState(
      {
        loading: true,
        tolal: downloadProgress.totalBytes,
        recived: downloadProgress.receivedBytes,
      },
      () => {
        totalPercen = (
          (parseFloat(this.state.recived) / parseFloat(this.state.tolal)) *
          100
        ).toFixed(2);
      }
    );
    if (downloadProgress.receivedBytes == downloadProgress.totalBytes) {
      this.time = setTimeout(() => {
        this.setState({ loading: false });
      }, 2500);
    }
    //this.setState({loading: false});
  };
  async componentDidMount() {
    //  if (Platform.OS === "android") {
    SplashScreen.hide();
    // }
    //   codePush.sync({
    //     updateDialog: true,
    //     installMode: codePush.InstallMode.IMMEDIATE
    // })
    OneSignal.setAppId("b3d24376-502b-4aa4-9f5b-8a695f5d9cf6");
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      this.OSLog("Prompt response:", response);
    });

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      this.OSLog("OneSignal: notification will show in foreground:", notifReceivedEvent);
      let notif = notifReceivedEvent.getNotification();
      const button1 = {
        text: "Cancel",
        onPress: () => { notifReceivedEvent.complete(); },
        style: "cancel"
      };
      const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); } };

      Alert.alert("Complete notification?", "Test", [button1, button2], { cancelable: true });
    });
    OneSignal.setNotificationOpenedHandler(notification => {
      this.OSLog("OneSignal: notification opened:", notification);
    });
    OneSignal.setInAppMessageClickHandler(event => {
      this.OSLog("OneSignal IAM clicked:", event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      this.OSLog("OneSignal: email subscription changed: ", event);
    });
    OneSignal.addSubscriptionObserver(event => {
      this.OSLog("OneSignal: subscription changed:", event);
      this.setState({ isSubscribed: event.to.isSubscribed })
    });
    OneSignal.addPermissionObserver(event => {
      this.OSLog("OneSignal: permission changed:", event);
    });

    const deviceState = await OneSignal.getDeviceState();

    this.setState({
      isSubscribed: deviceState.isSubscribed
    });

  }
  onError = (error) => {
    console.log("An error occurred. " + error);
  };
  // async UNSAFE_componentWillMount() {
  //   var updateDialogOptions = {
  //     updateTitle: "You have an update",
  //     optionalUpdateMessage: "Update available. Install?",
  //     //optionalIgnoreButtonLabel: "Nop",
  //     optionalInstallButtonLabel: "Install",
  //   };
  //   this.setState({ loading: true });
  //   codePush.sync(
  //     { installMode: codePush.InstallMode.IMMEDIATE },
  //     this.onSyncStatusChange,
  //     this.onDownloadProgress,
  //     this.onError
  //   );

  //   this.setState({ loading: false }, () => {});

  //   codePush.allowRestart();
  //   //SplashScreen.show();
  // }
  // componentWillUnmount() {
  //   clearTimeout(this.time);
  // }
  render() {
    return this.state.loading == true ? (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          marginTop: sizeHeight(25),
        }}
      >
        <Image
          source={require("./assets/images/logo.png")}
          resizeMode="contain"
          style={{
            width: Platform.OS === "android" ? sizeWidth(55) : sizeWidth(60),
            height: sizeHeight(15),
            //marginBottom: sizeHeight(2),
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: "#000",
            fontSize: sizeFont(4),
            marginBottom: sizeHeight(1),
          }}
        >
          Cập nhật phiên bản mới !{" "}
        </Text>

        <ProgressCircle
          percent={totalPercen}
          radius={55}
          borderWidth={8}
          color={COLOR.BUTTON}
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text style={{ fontSize: 18 }}>
            {totalPercen}
            {"%"}{" "}
          </Text>
        </ProgressCircle>
      </View>
    ) : (
        <Root>
          <SafeAreaProvider>
            {/* <SafeAreaView> */}
            <Provider store={store}>

              <AppNavigation />

            </Provider>
            {/* </SafeAreaView> */}
          </SafeAreaProvider>
        </Root>
      );
  }
}
