import React, {Component} from 'react';
import { StyleSheet,
         Text,
         View,
         Image,
         Dimensions,
         Button} from 'react-native';

const {width, height} = Dimensions.get("window");
const rule = {
    '가위':1,
    '바위':0,
    '보':-1
}

class RSPGame extends Component {
    state = {
        result: "",
        score: 0,
        currentRSP: "가위"
    };

    changeRSP = () =>{
        const {currentRSP} = this.state
        if (currentRSP === '가위'){
            this.setState({
                currentRSP: '바위'
            })
        } else if (currentRSP ==='바위') {
            this.setState({
                currentRSP: '보'
            })
        } else {
            this.setState({
                currentRSP: '가위'
            })
        }
    };

    interval;
    changePhoto = ()=>{
        const {currentRSP} = this.state;
        if (currentRSP === '가위'){
            return require("./img/scissors.png")
        } else if (currentRSP ==='바위') {
            return require("./img/rock.png")
        } else {
            return require("./img/paper.png")
        }
    }

    componentDidMount()    {
        this.interval = setInterval(this.changeRSP, 100)
    }
    componentWillunmount() {
        clearInterval(this.interval)
    }

    onPressBtn = press => () => {
        clearInterval(this.interval)
        const appScore = rule[this.state.currentRSP];
        const myScore = rule[press];
        const diff = myScore - appScore;

        if (diff===0) {
          this.setState({
            result:'Tied'});
        } else if ([-1,2].includes(diff)) {
          this.setState(prevState=>{
            return({
                    result:"Welp, Congrats boo!!",
                    score: prevState.score + 1
             })
          })
        } else {
          this.setState(prevState=>{
             return({
                    result:"You Lost!!! LOL",
                    score: prevState.score -1
             })
           })
        }

        setTimeout(()=>{
            this.interval = setInterval(this.changeRSP, 100);
        }, 2000);
    }

    render() {
        return (
            <React.Fragment>
            <View style={styles.imgstyle}>
                <Image source={this.changePhoto()}
                       style={{width:width/2, height:height/2}}
                       resizeMode="contain"
                />
            </View>
            <View style={styles.btnstyle}>
                <View style={{flex:1}}><Button title="가위"
                                               color = {"#F1C41C"}
                                               onPress={this.onPressBtn("가위")} /></View>
                <View style={{flex:1}}><Button title="바위"
                                               color = {"#DE5A4A"}
                                               onPress={this.onPressBtn("바위")} /></View>
                <View style={{flex:1}}><Button title="보"
                                               color = {"#8BAC3D"}
                                               onPress={this.onPressBtn("보")} /></View>
            </View>
            <View style={{flex:1}}>
                <Text>결과: {this.state.result}</Text>
            </View>
            <View style={{flex:1}}>
                <Text>점수: {this.state.score}</Text>
            </View>
            </React.Fragment>
        );
    }
}

export default RSPGame;

const styles = StyleSheet.create({
    imgstyle: {
         flex: 3,
         justifyContent: "center",
         alignItems:"center"
    }, btnstyle: {
         flex:1,
         flexDirection: "row"
    }
});





