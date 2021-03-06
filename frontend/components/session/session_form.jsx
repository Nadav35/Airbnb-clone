import React from 'react';
import { withRouter } from 'react-router-dom';
import merge from 'lodash/merge';

class Sessionform extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.formType === 'Sign up') {
      this.state = {
        email: '',
        username: '',
        password: '',
        photoFile: null,
        photoUrl: null
      };
    } else {
      this.state = {
        username: '',
        password: ''
      };
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.formType === 'Sign up') {
      const formData = new FormData();
      formData.append('user[username]', this.state.username);
      formData.append('user[email]', this.state.email);
      formData.append('user[password]', this.state.password);
      if (this.state.photoFile) {
        formData.append('user[photo]', this.state.photoFile);
      }
      this.props.processForm(formData).then(this.props.closeModal);
    } else {
      const user = merge({}, this.state);
      this.props.processForm(user).then(this.props.closeModal);
    }
  }

  getErrors() {
    return (
      <ul className="session-errors">
        {this.props.errors.map((error, idx) => (
          <li key={`error-${idx}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  emailInput() {
    return (
      <div className="form-group">
        <input value={this.state.email}
          type="text"
          placeholder="Email address"
          onChange={this.update('email')}
        />
        <i className="fas fa-envelope-square"></i>
      </div>
    );
  }

  fileInput() {
    return (
      <div className="form-group">
        <input type="file"
          onChange={this.handleFile}>
        </input>
        <i className="fas fa-camera"></i>
      </div>
    );
  }
  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {

      this.setState({ photoFile: file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  formFooter() {
    if (this.props.formType === 'Sign up') {
      return (
        <React.Fragment>
          <span>Alread have an Airbnb account?</span>
          <span onClick={this.props.clearErrors}>{this.props.otherForm}</span>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <span>Don't have an account?</span>
          <span onClick={this.props.clearErrors}>{this.props.otherForm}</span>
        </React.Fragment>
      );
    }
  }

  render() {
    const fileInp = this.props.formType === 'Sign up' ? this.fileInput() : null;
    const emailInp = this.props.formType === 'Sign up' ? this.emailInput() : null;
    return (
      <div className="login-form-container">
        <form className="login-form-box form" onSubmit={this.handleSubmit}>
          <i className="fas fa-window-close"
            onClick={this.props.closeModal}>
          </i>
          {this.getErrors()}
          <h1 className="text-primary large">{this.props.formType} to continue</h1>
          {emailInp}
          <div className="form-group">
            <input value={this.state.username}
              type="text"
              placeholder="Username"
              onChange={this.update('username')}
            />
            <i className="far fa-user"></i>

          </div>

          <div className="form-group">
            <input value={this.state.password}
              type="password"
              placeholder="Create a password"
              onChange={this.update('password')}
            />
            <i className="fas fa-lock"></i>

          </div>
          {fileInp}

          <div className="form-submit">
            <input className="btn btn-primary"
              type="submit"></input>
            <div className="form1">
              {this.formFooter()}
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default withRouter(Sessionform);
