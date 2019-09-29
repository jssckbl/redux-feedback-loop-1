import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

class Review extends Component {

    handleSubmit = () => {
        // axios POST to send redux state to database;
        axios.post('/feedback', this.props.reduxStore.feedbackReducer).then((result) => {
            console.log('feedback submitted', result);
        }).catch((error) => {
            console.log(error);
        })
        // clear redux state after POST
        this.props.dispatch({
            type: 'CLEAR_FORM'
        })
    }

    render() {
        return (
            <Router>
                <h1>Review your feedback</h1>
                <h3>Feeling: {this.props.reduxStore.feedbackReducer.feeling}</h3>
                <h3>Understanding: {this.props.reduxStore.feedbackReducer.understanding}</h3>
                <h3>Support: {this.props.reduxStore.feedbackReducer.support}</h3>
                <h3>Comments: {this.props.reduxStore.feedbackReducer.comments}</h3>
                <Link to='/comments'>
                    <button className="backButton" >Back</button>
                </Link>
                <Link to='/submitted'>
                    <button onClick={this.handleSubmit}>Submit</button>
                </Link>
            </Router>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(Review);