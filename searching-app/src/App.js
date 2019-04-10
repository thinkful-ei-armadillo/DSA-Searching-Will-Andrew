import React, { Component } from "react";
import store from "./store";

class App extends Component {
  state = {
    input: "",
    searchChoice: "linear",
    outputString: ""
  };

  linearSearch = (array, value) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  };

  binarySearch = (array, value, start, end, counter = 0) => {
    start = start === undefined ? 0 : start;
    end = end === undefined ? array.length : end;

    if (start > end) {
      return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];
    if (item === value) {
      return counter;
    } else if (item < value) {
      counter++;
      return this.binarySearch(array, value, index + 1, end, counter);
    } else if (item > value) {
      counter++;
      return this.binarySearch(array, value, start, index - 1, counter);
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchChoice === "linear") {
      let number = Number(this.state.input);
      const result = this.linearSearch(store, number);
      this.setState({
        outputString: `Found value in ${result + 1} operations!`
      });
    }

    if (this.state.searchChoice === "binary") {
      const sortedArray = store.sort((a, b) => a - b);
      console.log(sortedArray);
      let number = Number(this.state.input);
      const result = this.binarySearch(store, number);
      if (result > -1) {
        this.setState({ outputString: `Found value in ${result} operations!` });
      } else {
        this.setState({ outputString: "Input not found." });
      }
    }
  };

  handleFormChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSearchChoiceChange = e => {
    this.setState({ searchChoice: e.target.value });
  };

  render() {
    return (
      <div>
        <form type="submit" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleFormChange}
          />
          <button type="submit">Submit</button>
        </form>
        <select onChange={this.handleSearchChoiceChange}>
          <option value="linear">Linear</option>
          <option value="binary">Binary</option>
        </select>
        <p>{this.state.outputString}</p>
      </div>
    );
  }
}

export default App;
