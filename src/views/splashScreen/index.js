import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image,Platform } from 'react-native';
import { LoginPhone } from "../../action/authAction";
import { _retrieveData } from "../../utils/asynStorage";
import { connect } from 'react-redux';
import { USER_NAME, PASSWORD, IDSHOP, TOKEN} from "../../utils/asynStorage/store";
import { GetIdShop } from "../../action/authAction";
import { getUserAgent,getDeviceType,getUniqueId,getVersion,getDeviceName } from "react-native-device-info";
import {getDevice} from "../../service/device";
import {
    sizeFont,
    sizeHeight,
    sizeWidth,
} from "../../utils/helper/size.helper";
class SplashScreen extends Component {
    handload = async () => {
        let [username, password] = ['', ''];
        let id = '';
        let accessToken = await _retrieveData(TOKEN).then((token) => token);
        let nameDevice=await getDeviceName().then((ua)=>ua)
        await _retrieveData(USER_NAME).then((result) => {
            if (result) {
                username = result.substr(1).slice(0, -1)
            }
        })
        await _retrieveData(PASSWORD).then((result) => {
            if (result) {
                password = result.substr(1).slice(0, -1)
            }
        }).catch((err) => {
        })
        this.props.LoginPhone({
            IDSHOP: 'F6LKFY',
            USERNAME: username,
            PASSWORD: password,
        })
            .then((result) => {
                    this.props.navigation.navigate("screenHome",{
                        CODE:1
                    }); 
            })
            .catch((err) => {
                
            });
            console.log("accessToken11===",accessToken);
            getDevice({
                USERNAME:username,
                APP_VERSION:getVersion(),
                MODEL_NAME:nameDevice,
                TOKEN_KEY:accessToken,
                DEVICE_TYPE:Platform.OS,
                OS_VERSION:getVersion(),
                UUID:getUniqueId(),
                IDSHOP:'F6LKFY'
            }).then((res)=>{
                console.log("updatedata use",res);
            })
    }
    componentDidMount() {
        this.handload();
    }
    render() {
       
        return (
        //     <View style={{ width: sizeWidth(100), height: sizeHeight(100),flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
        //     <Image
        //         source={require('../../assets/images/logo.png')}
        //         style={{ width: sizeWidth(70), height: sizeHeight(40) }}
        //     />
        // </View>
        <View></View>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        LoginPhone: (data) => dispatch(LoginPhone(data)),
        GetIdShop: (data) => dispatch(GetIdShop(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashScreen);
