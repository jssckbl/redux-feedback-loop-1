import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

class Admin extends Component {

    // Run contained functions on page load
    componentDidMount = () => {
        this.getFeedback();
    }

    // DELETE call to database to delete feedback item on confirm
    deleteFeedback = (id) => {
        if (window.confirm('are you sure you want to delete this record?')) {
            axios.delete('/feedback/' + id).then((response) => {
                this.getFeedback();
            }).catch((error) => {
                console.log('error in delete', error);
            })
        }
    }

    // GET call to database to send to global redux state
    getFeedback = () => {
        axios.get('/feedback').then((response) => {
            this.props.dispatch({ type: 'SHOW_FEEDBACK', payload: response.data });
        }).catch((error) => {
            console.log('error in GET', error);
        })
    }

    render() {
        let responses = this.props.reduxStore.displayReducer;

        return (
            <div className="adminTable">
                <h1>Admin Page</h1>
                <h3>Feedback history</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Feeling</th>
                            <th>Understanding</th>
                            <th>Support</th>
                            <th>Comments</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{responses.map(response =>
                        <tr className="response" key={response.id}>
                            <td>{moment(response.date).format("MMMM Do YYYY")}</td>
                            <td>{response.feeling}</td>
                            <td>{response.understanding}</td>
                            <td>{response.support}</td>
                            <td>{response.comments}</td>
                            <td><button className="backButton" onClick={() =>
                                this.deleteFeedback(response.id)}>Delete</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(Admin);