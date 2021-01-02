import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
        if (!isLoaded(this.props.cards)) {
            return <div>Loading...</div>;
          }
      
          if (isEmpty(this.props.cards)) {
            return <div>Page not found!</div>;
          }

        const card = this.props.cards[this.state.currentIndex][this.state.displayFront ? 'front':'back'];
        return (
            <div>
                <h2>{this.props.name}</h2>
                <hr/>
                <div>{'Card '+(this.state.currentIndex + 1) + '/' + this.props.cards.length}</div>
                <hr />
                <div onClick = {this.flipCard}>{card}</div>
                <div>
                    <button disabled = {this.state.currentIndex === 0} onClick = {this.previousCard}>Previous Card</button>
                    <button disabled = {this.state.currentIndex === this.props.cards.length - 1} onClick = {this.nextCard}>Next Card</button>
                </div>
                <Link to="/">Home</Link>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return { cards: cards, name: name };
  };
  
  export default compose(
    withRouter,
    firebaseConnect(props => {
      const deckId = props.match.params.deckId;
      return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
    }),
    connect(mapStateToProps),
  )(CardViewer);