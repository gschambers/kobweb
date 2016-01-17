import React, { Component } from "react";

export class Body extends Component {
    render() {
        return (
            <div style={bodyStyle}>
                {React.Children.only(this.props.children)}
            </div>
        );
    }
}

const bodyStyle = {
    marginLeft: "calc(20vw + 20px)",
    marginTop: 80
};
