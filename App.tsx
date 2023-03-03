import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonComponent from './src/components/Button';
import DisplayComponent from './src/components/Display';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const initState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = {...initState};

  addDigit = (n: any) => {
    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return;
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({displayValue, clearDisplay: false});

    if (n !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({values});
    }
  };

  clearMemory = () => {
    this.setState({...initState});
  };

  setOperation = (operation: any) => {
    if (this.state.current === 0) {
      this.setState({operation, current: 1, clearDisplay: true});
    } else {
      const equals = operation === '=';
      const values = [...this.state.values];
      try {
        // eslint-disable-next-line no-eval
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (error) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <DisplayComponent value={this.state.displayValue} />
          <View style={styles.buttons}>
            <ButtonComponent label="AC" onClick={this.clearMemory} triple />
            <ButtonComponent
              label="/"
              onClick={() => this.setOperation('/')}
              operation
            />
            <ButtonComponent label="7" onClick={this.addDigit} />
            <ButtonComponent label="8" onClick={this.addDigit} />
            <ButtonComponent label="9" onClick={this.addDigit} />
            <ButtonComponent label="*" onClick={this.setOperation} operation />
            <ButtonComponent label="4" onClick={this.addDigit} />
            <ButtonComponent label="5" onClick={this.addDigit} />
            <ButtonComponent label="6" onClick={this.addDigit} />
            <ButtonComponent label="-" onClick={this.setOperation} operation />
            <ButtonComponent label="1" onClick={this.addDigit} />
            <ButtonComponent label="2" onClick={this.addDigit} />
            <ButtonComponent label="3" onClick={this.addDigit} />
            <ButtonComponent label="+" onClick={this.setOperation} operation />
            <ButtonComponent label="0" onClick={this.addDigit} double />
            <ButtonComponent label="." onClick={this.addDigit} />
            <ButtonComponent label="=" onClick={this.setOperation} operation />
          </View>
        </View>
      </React.Fragment>
    );
  }
}
