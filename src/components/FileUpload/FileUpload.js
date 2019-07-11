import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './FileUpload.css';
//material ui
import Button from '@material-ui/core/Button';

class FileUpload extends Component {
    state = {
      success : false,
      url : "",
    }
  
  handleChange = (ev) => {
    this.setState({success: false, url : ""});
  }
  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload", fileName, fileType);
    axios.post('/api/s3',{
      fileName : fileName,
      fileType : fileType,
      job_id: this.props.job_id,
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url, fileName: fileName})
      console.log("Received a signed request " + signedRequest);

      
     // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
        //after image upload successful, trigger post route to add image url into database
        this.props.dispatch({
          type: 'ADD_URL',
          payload: {
            url: this.state.url,
            fileName: this.state.fileName,
            job_id: this.props.job_id,
          },
        })
      })
      .catch(error => {
        alert("error with put " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }
  
  
  render() {
    const Success_message = () => (
      <div style={{padding:50}}>
        <h2 style={{color: 'green'}}>SUCCESS!</h2>
        {/* <a href={this.state.url}>Access the file here</a> */}
        <br/>
      </div>
    )
    return (
      <div className="chooseFile">
          <h2>Upload Application Document</h2>
          <pre>
            {/* {JSON.stringify(this.state)} */}
          </pre>
          {this.state.success ? <Success_message/> : null}
          <label for="chooseFile" class="customize-file-upload">
            Choose your file
          </label>
          <input id="chooseFile" onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <Button variant="outlined" color="primary" className='uploadButton' onClick={this.handleUpload}>UPLOAD</Button>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
})
export default connect(mapReduxStateToProps)(FileUpload);
