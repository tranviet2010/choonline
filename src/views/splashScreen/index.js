import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native';
import { LoginPhone } from "../../action/authAction";
import { _retrieveData } from "../../utils/asynStorage";
import { connect } from 'react-redux';
import { USER_NAME, PASSWORD, IDSHOP } from "../../utils/asynStorage/store";
import { GetIdShop } from "../../action/authAction";
import {
    sizeFont,
    sizeHeight,
    sizeWidth,
} from "../../utils/helper/size.helper";


class SplashScreen extends Component {
    handload = async () => {
        let [username, password] = ['', ''];
        let id = '';
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
            console.log('err')
        })
        this.props.LoginPhone({
            IDSHOP: 'F6LKFY',
            USERNAME: username,
            PASSWORD: password,
        })
            .then((result) => {
                console.log("this is spalce", result);
                    this.props.navigation.navigate("screenHome");
               
            })
            .catch((err) => {
                
            });
    }
    componentDidMount() {
        this.handload();
    }
    render() {
        return (
            <View>
                <Image
                    style={{ width: sizeWidth(100), height: sizeHeight(100) }}
                />
            </View>
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
