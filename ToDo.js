import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

class ToDo extends Component {
    state = {
      isEditing: false,
      isCompleted: false
    };
    render() {
        const { isCompleted, isEditing } = this.state;
        return (
            <View sttle={styles.container}>
                <View style={styles.column}>
                <TouchableOpacity onPressOut={this._finishEditing}>
                    <View style={[
                        styles.circle,
                        isCompleted ? styles.completedCircle : styles.uncompletedCircle
                    ]} 
                    />
                </TouchableOpacity>
                <Text style={[
                    styles.text,
                    isCompleted ? styles.completedText : styles.uncompletedText
                ]}>
                Hello, I'm a To Do
                </Text>
                </View>
                    {isEditing ? (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>V</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>E</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>X</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        );
    }
    _toggleComplete = {
        this.setState(prevState => {
            return ({
                isCompleted: !prevState.isCompleted
            };
        });
    };
    _startEditing = () => {
        this.setState({
            isEditing: true  
        });
    };
    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 30
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    unCompletedCircle: {
        borderColor: "#f23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    unCompletedText: {
        color: "red"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
        justifyContent: "space-between"
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    }
})