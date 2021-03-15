import React, { Component } from "react";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import { changePass } from "../../../service/auth";
import { connect } from "react-redux";
import {
    sizeHeight,
    sizeWidth,
    sizeFont,
} from "../../../utils/helper/size.helper";
import { COLOR } from "../../../utils/color/colors";
import { Alert } from "react-native";
class ChangePass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: '',
            loading: true,
        };
    }
    changePassWord = () => {
        const { oldPassword, newPassword, confirmPassword } = this.state;
        if (newPassword != confirmPassword) {
            Alert.alert("Thông báo", "Mật khẩu đã nhập không trùng nhau");
        }
        else if (oldPassword.length == 0 || newPassword.length == 0 || confirmPassword.length == 0) {
            Alert.alert("Thông báo", "Mật khẩu không được để trống");
        }
        else if (oldPassword == newPassword) {
            Alert.alert("Thông báo", "Mật khẩu mới giống mật khẩu cũ, nhập lại");
        }
        else {
            changePass({
                OLD_PWD: oldPassword,
                NEW_PWD: newPassword
            })
                .then((res) => {
                    Alert.alert(`${<Image source={require('../../../assets/images/tick.png')} />}`, `${res.data.RESULT}`);

                })
                .catch({

                })
        }
    }
    componentDidMount() {

    }
    render() {
        const { loading, data, oldPassword, newPassword, confirmPassword } = this.state;
        return (
            <View style={{ marginTop: sizeHeight(3) }}>

                <View style={[styles.viewCommon, { marginTop: sizeHeight(3) }]}>
                    <Text style={styles.text}>Nhập mật khẩu hiện tại<Text style={{ color: 'red' }}>*</Text></Text>
                    <TextInput
                        value={oldPassword}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ oldPassword: text })}
                        style={styles.textInputChild}
                    />
                </View>
                <View style={[styles.viewCommon, { width: sizeWidth(100), marginTop: 0 }]}>

                    <Text style={{ color: '#999999', fontStyle: 'italic', fontSize: 13 }}>Mật khẩu đăng nhập lần đầu là 123456, nếu đã đổi hãy soạn tin nhắn MKH GD gửi 8079 để lấy lại mật khẩu (Cước tin nhắn: 1000đ)</Text>
                </View>
                <View style={[styles.viewCommon, { marginTop: sizeHeight(3) }]}>
                    <Text style={styles.text}>Nhập mật khẩu mới<Text style={{ color: 'red' }}>*</Text></Text>
                    <TextInput
                        value={newPassword}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ newPassword: text })}
                        style={styles.textInputChild}
                    />

                </View>
                <View style={[styles.viewCommon, { marginTop: sizeHeight(3) }]}>
                    <Text style={styles.text}>Nhập lại mật khẩu mới<Text style={{ color: 'red' }}>*</Text></Text>
                    <TextInput
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                        style={styles.textInputChild}
                    />

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: sizeHeight(5) }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.changePassWord()
                        }}
                        style={{ backgroundColor: COLOR.HEADER, borderRadius: 100, width: sizeWidth(60), height: sizeHeight(5), justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ color: '#fff' }}>Cập nhật</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    viewCommon: {
        paddingHorizontal: sizeWidth(2.5),
        marginVertical: sizeHeight(1),


    },
    viewTextInput: {
        width: sizeWidth(70),
        borderWidth: 1,
        borderColor: "gray",
        paddingVertical: sizeHeight(1.5),
        paddingHorizontal: sizeWidth(2),
    },
    textTitle: {
        fontSize: sizeFont(4),
        fontWeight: "500",
    },
    textInputChild: {
        width: sizeWidth(95),
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLOR.HEADER,
        paddingVertical: sizeHeight(1.5),
        paddingHorizontal: sizeWidth(2),
    },
    text: {
        marginBottom: 10,
    }
});
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
)(ChangePass);