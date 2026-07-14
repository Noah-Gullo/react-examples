import {Component} from "react"

class Count extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <p>Count: {this.props.totalTodos} todos</p>
        )
    }
}

export default Count;