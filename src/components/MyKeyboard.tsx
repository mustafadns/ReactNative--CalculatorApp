import * as React from 'react';
import Button from './Button';
import { View, Text } from 'react-native';
import { Styles } from '../styles/GlobalStyles';
import { myColors } from '../styles/Colors';

export default function MyKeyboard() {
    const [firstNumber, setFirstNumber] = React.useState("");
    const [secondNumber, setSecondNumber] = React.useState("");
    const [operation, setOperation] = React.useState("");
    const [result, setResult] = React.useState<Number | null>(null);

    const handleNumberPress = (buttonValue: string) => {
        if (firstNumber.length < 10) {
            setFirstNumber(firstNumber + buttonValue);
        }
    };

    const handleOperationPress = (buttonValue: string) => {
        setOperation(buttonValue);
        setSecondNumber(firstNumber);
        setFirstNumber("");
    };

    const clear = () => {
        setFirstNumber("");
        setSecondNumber("");
        setOperation("");
        setResult(null);
    }

    const getResult = () => {
        switch (operation) {
            case "+":
                clear();
                setResult(parseFloat(secondNumber) + parseFloat(firstNumber));
                break;
            case "-":
                clear();
                setResult(parseFloat(secondNumber) - parseFloat(firstNumber));
                break;
            case "*":
                clear();
                setResult(parseFloat(secondNumber) * parseFloat(firstNumber));
                break;
            case "/":
                clear();
                setResult(parseFloat(secondNumber) / parseFloat(firstNumber));
                break;
            case "+/-":
                setFirstNumber((parseFloat(firstNumber) * -1).toString());
                break;
            default:
                clear();
                setResult(0);
                break;
        }
    }

    const firstNumberDisplay = () => {
        if (result !== null) {
            return <Text style={result < 99999 ? [Styles.screenFirstNumber, { color: myColors.result }] : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]}>{result?.toString()}</Text>
        }
        if (firstNumber && firstNumber.length < 6) {
            return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>
        }
        if (firstNumber === "") {
            return <Text style={Styles.screenFirstNumber}>{"0"}</Text>
        }
        if (firstNumber.length > 5 && firstNumber.length < 8) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
                    {firstNumber}
                </Text>
            );
        }
        if (firstNumber.length > 7) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
                    {firstNumber}
                </Text>
            )
        }
    }

    return (
        <View style={Styles.viewBottom}>
            <View
                style={{
                    height: 120,
                    width: "90%",
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                }}
            >
                <Text style={Styles.screenSecondNumber}>
                    {secondNumber}
                    <Text style={{ color: '#ff7f00', fontSize: 50, fontWeight: '500' }}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>
            <View style={Styles.row}>
                <Button title='C' isGray onPres={clear} />
                <Button title='+/-' isGray onPres={() => handleOperationPress("+/-")} />
                <Button title='%' isGray onPres={() => handleOperationPress("%")} />
                <Button title='/' isBlue onPres={() => handleOperationPress("/")} />
            </View>
            <View style={Styles.row}>
                <Button title='7' onPres={() => handleNumberPress("7")} />
                <Button title='8' onPres={() => handleNumberPress("8")} />
                <Button title='9' onPres={() => handleNumberPress("9")} />
                <Button title='*' isBlue onPres={() => handleOperationPress("*")} />
            </View>
            <View style={Styles.row}>
                <Button title='4' onPres={() => handleNumberPress("4")} />
                <Button title='5' onPres={() => handleNumberPress("5")} />
                <Button title='6' onPres={() => handleNumberPress("6")} />
                <Button title='-' isBlue onPres={() => handleOperationPress("-")} />
            </View>
            <View style={Styles.row}>
                <Button title='1' onPres={() => handleNumberPress("1")} />
                <Button title='2' onPres={() => handleNumberPress("2")} />
                <Button title='3' onPres={() => handleNumberPress("3")} />
                <Button title='+' isBlue onPres={() => handleOperationPress("+")} />
            </View>
            <View style={Styles.row}>
                <Button title='.' onPres={() => handleNumberPress(".")} />
                <Button title='0' onPres={() => handleNumberPress("0")} />
                <Button title='<-' onPres={() => setFirstNumber(firstNumber.slice(0, -1))} />
                <Button title='=' isBlue onPres={() => getResult()} />
            </View>
        </View>
    )
}