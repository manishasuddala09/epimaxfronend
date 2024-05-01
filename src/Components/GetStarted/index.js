import React,{Component} from 'react';
import TaskHomePage from '../TaskHomePage'
import './index.css'

class GetStarted extends Component {
    state =  {isClicked: false}

    onClickGetStarted = () => {
        this.setState({
            isClicked: true,
        })
    }

    renderGetStaterted = () => {
        return(
            <div className="getStarted-bg">
                <h1 className='heading'>You can Manage your tasks, and accomplish your goals</h1>
                <button type="button" className="get-started-btn" onClick={this.onClickGetStarted}>Get Started</button>
            </div>
        )
    }

    render() {
        const {isClicked} = this.state
        return isClicked ? <TaskHomePage /> : this.renderGetStaterted()
    }
}

export default GetStarted