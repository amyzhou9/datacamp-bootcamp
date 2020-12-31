import React from 'react';
import { Link } from 'react-router-dom';

class CardViewer extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            currentIndex: 0,
            displayFront: true,
        };
    }

    flipCard = () => this.setState({displayFront: !this.state.displayFront});

    nextCard = () => {
        if(this.state.currentIndex < this.props.cards.length - 1){
            this.setState({currentIndex: this.state.currentIndex + 1});
            this.setState({displayFront: true});
        }
    };

    previousCard = () => {
        this.setState({currentIndex: this.state.currentIndex - 1});
        this.setState({displayFront: true});
    };

    render(){
        const card = this.props.cards[this.state.currentIndex][this.state.displayFront ? 'front':'back'];
        return (
            <div>
                <h2>Card Viewer</h2>
                <hr/>
                <div>{'Card '+(this.state.currentIndex + 1) + '/' + this.props.cards.length}</div>
                <hr />
                <div onClick = {this.flipCard}>{card}</div>
                <div>
                    <button disabled = {this.state.currentIndex === 0} onClick = {this.previousCard}>Previous Card</button>
                    <button disabled = {this.state.currentIndex === this.props.cards.length - 1} onClick = {this.nextCard}>Next Card</button>
                </div>
                <Link to="/editor">Go to card editor</Link>
            </div>
        );
    }
}

export default CardViewer;