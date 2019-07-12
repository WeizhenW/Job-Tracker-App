import React, { Component } from 'react';
import { connect } from 'react-redux';

class FileDisplay extends Component {
    componentDidMount() {
        // console.log('in component did mount');
        this.props.dispatch({
            type: 'FETCH_URL',
            payload: {job_id: this.props.job_id},
        });
    }

    render() {
        return(
            <div>
                <h2>Document Uploaded</h2>
                <pre>
                    {/* {JSON.stringify(this.props.reduxState.s3Url.s3UrlReducer, null, 2)} */}
                </pre>
                <div className='images'>
                    <ul>                    
                        {this.props.reduxState.s3Url.s3UrlReducer.map(file => <li key={file.id}><a href={file.url}>{file.file}</a></li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
  })
  export default connect(mapReduxStateToProps)(FileDisplay);
  