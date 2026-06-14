import React from "react";
class UserClass extends React.Component {
  constructor(th) {
    super(th);
    this.state = {
      count: 0,
      count2: 1,
      userInfo: {
        avatar_url: null,
        login: "Waiting for Username",
      },
    };
    //console.log(this.props.name + " Constructor is invoked");
  }
  async componentDidMount() {
    console.log(this.props.name + " componentDidMount is invoked");
    const data = await fetch("https://api.github.com/users/NMSaiTharun");
    const json = await data.json();
    this.setState({
      userInfo: json,
    });
    //console.log(json);
  }
  componentDidUpdate() {
    //console.log("componetDidUpdate is invoked");
  }
  componentWillUnmount() {
    //console.log("component mounting is ended");
  }

  render() {
    const { name, location } = this.props;
    const { count, count2 } = this.state;
    //console.log(this.props.name + " render is invoked");
    return (
      <div className="user-card">
        <h1>Count from useState: {this.state.count}</h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
              count2: this.state.count2 + 1,
            });
          }}
        >
          change count
        </button>
        <h1>Count2 from useState: {count2}</h1>
        <h1>This is a React project for learning!</h1>
        <h2>Name: {name}</h2>
        <h3>Location:{this.props.location}</h3>
        <h1>Name: {this.state.userInfo.login}</h1>
        <img src={this.state.userInfo.avatar_url}></img>
      </div>
    );
  }
}
export default UserClass;
