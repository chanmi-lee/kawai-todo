import React, { Component } from "react";
import { View, 
        Text, 
        TouchableOpacity, 
        StyleSheet, 
        Dimensions,
        TextInput
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = { isEditing: false, toDoValue: props.text };
    }
    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired
    }
    render() {
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text, id, deleteToDo } = this.props;
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
                { isEditing ? (
                <TextInput 
                    style={[ 
                        styles.text, 
                        styles.input,
                        isCompleted ? styles.completedText : styles.uncompletedText
                    ]} 
                    value={toDoValue}
                    multiline={true}
                    onChangeText={this._controllInput}
                    returnKeyType={"done"}
                    onBlur={this._finishEditing}
                />
                ) : (
                <Text 
                    style={[
                        styles.text,
                        isCompleted ? styles.completedText : styles.uncompletedText
                    ]}
                >
                    {text}
                </Text>
                )}
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
                            <TouchableOpacity onPressOut={() => deleteToDo(id) }>
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
            isEditing: true, toDoValue: text 
        });
    };
    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };
    _controllInput = {} => {
        this.setState({
            toDoValue: text
        })
    }
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
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 10,
        width: width / 2,
        paddingBottom: 5
    }
})