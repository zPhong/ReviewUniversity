import React, {Component} from 'react';
import './css/AddMoreUniversity.css';
import apiModel from "../../api/APIModel";

class AddMoreUniversity extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        location: '',
        department: '',
        logoUrl: '',
    };
  }

  handleChangeName = (event) => {
    if (event.target.name === 'universityName')
      this.setState({name: event.target.value});
    else if (event.target.name === 'universityLocation')
      this.setState({location: event.target.value});
    else if (event.target.name === 'universityDepartment')
      this.setState({department: event.target.value});
    else if (event.target.name === 'universityLogoURL')
      this.setState({logoUrl: event.target.value});

  };

  onBlurText = (id, input) => {
    console.log(id, input);
    // if (id === 'universityName')
    //   this.setState({name: input});
    // else if (id === 'universityLocation')
    //   this.setState({location: input});
    // else if (id === 'universityDepartment')
    //   this.setState({department: input});
    // else if (id === 'universityLogoURL')
    //   this.setState({logoUrl: input});

  };

  clearAllText = () => {
    this.setState({name: '', location: '', department: '', logoUrl: ''})
  };

  sendNewUniversity = () => {
      apiModel.postUniversity(
      {
        name: this.state.name,
        location: this.state.location,
        department: this.state.department,
        logo: this.state.logoUrl,
      }
    );
  };

  render() {
    return (
      <form className="container" id="form">
        <div className="justify-content-center d-flex mb-4">
          <h1 className="d-inline-block">Add More University</h1>
        </div>
        <div className="form-group d-flex">
          <label className="col-md-2 m-0 align-self-center" htmlFor="universityName">University Name:</label>
          <input type="text" className="col-md-10 form-control remove-blue-border" id="universityName" name="universityName"
                 placeholder="Trường Đại Học Công Nghệ Thông Tin"
                 value={this.state.name}
                 onChange={event  => this.handleChangeName(event)}/>
        </div>

        <div className="form-group d-flex">
          <label className="col-md-2 m-0 align-self-center" htmlFor="universityLocation">Location:</label>
          <input type="text" className="col-md-10 form-control" id="universityLocation" name="universityLocation"
                 placeholder="Khu Phố 6, Phường Linh Trung, Thủ Đức, Hồ Chí Minh"
                 value={this.state.location}
                 onChange={event  => this.handleChangeName(event)}/>
        </div>

        <div className="form-group d-flex">
          <label className="col-md-2 m-0 align-self-center" htmlFor="universityDepartment">Department:</label>
          <input type="text" className="col-md-10 form-control" id="universityDepartment" name="universityDepartment"
                 placeholder="Sex, Buscu, Anal, Squirt"
                 value={this.state.department}
                 onChange={event  => this.handleChangeName(event)}/>
        </div>

        <div className="form-group d-flex">
          <label className="col-md-2 m-0 align-self-center" htmlFor="universityLogoURL">Logo URL:</label>
          <input type="text" className="col-md-10 form-control" id="universityLogoURL" name="universityLogoURL"
                 placeholder="https://www.pornhub.com/"
                 value={this.state.logoUrl}
                 onChange={event  => this.handleChangeName(event)}/>
        </div>

        <div className="form-group d-flex mt-4">
          <div className="col-6 d-flex justify-content-center">
            <button type="button" className="my-btn" onClick={this.clearAllText}>Reset</button>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <button type="button" className="my-btn" onClick={this.sendNewUniversity}>Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddMoreUniversity;