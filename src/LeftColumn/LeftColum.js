import React, { Component } from 'react';
import Touit from '../Touit/Touit';
import apiTouits from "../Utils/apiTouits";

class LeftColumn extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            messages: [],
            ts: 0,
            items: 100,
            loadingState: false,
        }
    }



    componentDidMount() {
        setInterval(this.makeApiCall, 1000)
        window.addEventListener('scroll', this.onInfiniteScroll);
    }

    makeApiCall = () => {
        return apiTouits.getTouits(this.state.ts).then(
            result => this.setState( {
                isLoaded: true,
                messages: result.messages.reverse().concat([...this.state.messages]),
                ts: result.messages.length > 0 ? result.messages[0].ts : this.state.ts
            })
        )
    }


    componentDidUpdate = () => {
        if(!this.checkIfMessagesContainsValue()){
            this.loadMoreItems();
        }
    }

    checkIfMessagesContainsValue = () => {
        let found = false;
        this.state.messages.slice(0, this.state.items ).map(
            message => {
                if(message.message.toLowerCase().includes(this.props.filter)){
                    found = true;
                    return found;
                }
            });
        return found;
    }



    onInfiniteScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            this.loadMoreItems();
        }
    };

    loadMoreItems = () => {
        if (this.state.loadingState) {
            return;
        }
        this.setState({ loadingState: true });
        setTimeout(() => {
            this.setState(old => ({ items: old.items + 100, loadingState: false }));
        }, 1000);
    }



    render(){
        return (
            <div className="col-12 order-2 order-lg-1 col-lg-7 p-3 touits-list bg-light">
                <div className="container">
                    <h2>Touits récents</h2>
                    <div className="row text-start flex-column align-items-center justify-content-between" >
                        {this.state.isLoaded ? 
                        this.state.messages.slice(0, this.state.items ).map(
                            (message)=> message.message.toLowerCase().includes(this.props.filter) ? <Touit pseudo={message.name} message={message.message} id={message.id} key={`touit-${message.id}`} nbComments={message.comments_count} nbLikes={message.likes}/> : null
                            )
                        :
                        null
                        }
                        {
                        this.state.messages.length > this.state.items || this.state.ts ===0 ? 
                            <img src="./loading.gif" alt="loading" className="loading-img"/>
                            :
                            <div>Plus de touits à charger...</div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default LeftColumn;