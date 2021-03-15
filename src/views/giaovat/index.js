import React, { Component } from 'react'
import { StyleSheet, TextInput, Text, View, Image, Button, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { connect } from "react-redux";
import moment from "moment";
import { sizeWidth, sizeHeight, sizeFont } from '../../utils/helper/size.helper';
import { COLOR } from '../../utils/color/colors';
import Mybuy from './mybuy';
import Needbuy from './needbuy';
import Needsell from './needsell';
import { SafeAreaView } from 'react-native';
import {getText} from '../../service/giaovat';

var numeral = require("numeral");
class Giaovat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: moment()
                .add(-60, "day")
                .format("DD/MM/YYYY"),
            endTime: moment(new Date()).format("DD/MM/YYYY"),
            Data: [],
            isDatePickerVisible: false,
            inDateEndPicker: false,
            loading: false,
            momney: '',
            status: 1,

        }
    }
    handleText = () => {
        getText({
            TYPE: 'sell',
            STATUS: '',
            PAGE: 1,
            NUMOFPAGE: 10,
            SEARCH: '',
            ID: '',
            START_TIME: '',
            END_TIME: ''
        }).then((res) => {
            console.log("hí anh em ======");
            if (res.data.ERROR == "0000") {
                
            }else{
                
            }
            
        }).catch((err) => err)
    }

    componentDidMount() {

    }
    render() {
        const { status } = this.state;
        const { navigation } = this.props;
        return (
            <SafeAreaView >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 21, fontWeight: '600' }}>Rao vặt</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("addread",{
                            reload:this.handleText
                        })}
                        style={{ backgroundColor: '#4285F4', width: sizeWidth(25), justifyContent: 'center', alignItems: 'center', borderRadius: 40, height: sizeHeight(4) }}
                    >
                        <Text style={{ color: '#fff', fontSize: 17 }}>Đăng tin</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.setState({ status: 1 })} style={[styles.headerText, { backgroundColor: status == 1 ? '#edf1ea' : null }]}><Text style={{ color: status == 1 ? COLOR.HEADER : '#999999', fontWeight: status == 1 ? '600' : '400', fontSize: 17 }}>Cần bán</Text></TouchableOpacity >
                    <TouchableOpacity onPress={() => this.setState({ status: 2 })} style={[styles.headerText, { backgroundColor: status == 2 ? '#edf1ea' : null }]}><Text style={{ color: status == 2 ? COLOR.HEADER : '#999999', fontWeight: status == 2 ? '600' : '400', fontSize: 17 }}>Cần mua</Text></TouchableOpacity >
                    <TouchableOpacity onPress={() => this.setState({ status: 3 })} style={[styles.headerText, { backgroundColor: status == 3 ? '#edf1ea' : null }]}><Text style={{ color: status == 3 ? COLOR.HEADER : '#999999', fontWeight: status == 3 ? '600' : '400', fontSize: 17 }}>Của tôi</Text></TouchableOpacity >
                </View>
                <ScrollView>
                    <View>
                        {status == 1 ? <Needbuy navigation={navigation} controller={this.handle}/> : status == 2 ? <Needsell navigation={navigation} /> : <Mybuy navigation={navigation} />}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        status: state.authUser.status,
        authUser: state.authUser.authUser,
        username: state.authUser.username,
        idshop: state.product.database,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Giaovat);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginBottom:10

    },
    headerText: {
        width: sizeWidth(30),
        height: sizeHeight(4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,

    }
})
