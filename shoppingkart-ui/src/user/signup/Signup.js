import React, { Component } from 'react';
import { signup, checkUsernameAvailability } from '../../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, MOBILE_LENGTH
} from '../../constants';

import { Form, Input, Button, notification, Select } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: {
                value: ''
            },
            lastName: {
                value: ''
            },
            username: {
                value: ''
            },
            password: {
                value: ''
            },
            contactNumber:{
                value:''
            },
            emailAddress:{
                value:''
            },
            gender:{
                value:''
            },
            address:{
                value:''
            },
            genderObj:{}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleGenderChange =this.handleGenderChange.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleNumberChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                number: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleGenderChange(input) { 
        this.setState({
            genderObj: input
        });
        console.log(input)
        this.setState({
            gender: {
                value: input,
                ...this.validateGender(input)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        const signupRequest = {
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            username: this.state.username.value,
            password: this.state.password.value,
            contactNumber: this.state.contactNumber.value,
            emailAddress: this.state.emailAddress.value,
            gender: this.state.gender.value,
            address:this.state.address.value
        };
        signup(signupRequest)
        .then(response => {
            notification.success({
                message: 'ShoppingKart',
                description: "Thank you! You're successfully registered. Please Login to continue!",
            });          
            this.props.history.push("/login");
        }).catch(error => {
            notification.error({
                message: 'ShoppingKart',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.firstName.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success' &&
            this.state.contactNumber.validateStatus === 'success' &&
            this.state.lastName.validateStatus === 'success' &&
            this.state.gender.validateStatus === 'success' &&
            this.state.emailAddress.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>
                <div className="signup-content">
                    <Form labelCol={{span: 8,}} wrapperCol={{span: 16,}} onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem 
                            label="First Name"
                            validateStatus={this.state.firstName.validateStatus}
                            help={this.state.firstName.errorMsg}>
                            <Input 
                                size="large"
                                name="firstName"
                                autoComplete="off"
                                placeholder="Your First name"
                                value={this.state.firstName.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem 
                            label="Last Name"
                            validateStatus={this.state.lastName.validateStatus}
                            help={this.state.lastName.errorMsg}>
                            <Input 
                                size="large"
                                name="lastName"
                                autoComplete="off"
                                placeholder="Your last name"
                                value={this.state.lastName.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem label="Username"
                            hasFeedback
                            validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg}>
                            <Input 
                                size="large"
                                name="username" 
                                autoComplete="off"
                                placeholder="A unique username"
                                value={this.state.username.value} 
                                onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)} />    
                        </FormItem>
                        <FormItem 
                            label="Password"
                            hasFeedback
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input 
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters" 
                                value={this.state.password.value} 
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
                        </FormItem>
                        <FormItem 
                            label="Contact Number"
                            hasFeedback
                            validateStatus={this.state.contactNumber.validateStatus}
                            help={this.state.contactNumber.errorMsg}>
                            <Input 
                                size="large"
                                name="contactNumber" 
                                type="text"
                                autoComplete="off"
                                placeholder="Please enter contact number" 
                                value={this.state.contactNumber.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateContactNumber)} />    
                        </FormItem>
                        <FormItem 
                            label="Email Address"
                            hasFeedback
                            validateStatus={this.state.emailAddress.validateStatus}
                            help={this.state.emailAddress.errorMsg}>
                            <Input 
                                size="large"
                                name="emailAddress" 
                                type="text"
                                autoComplete="off"
                                placeholder="Please enter email address" 
                                value={this.state.emailAddress.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateEmailAddress)} />    
                        </FormItem>
                        <FormItem validateStatus={this.state.gender.validateStatus} label="Gender"
                            help={this.state.gender.errorMsg} className="patient-form-row">
                              
                                <Select  name="gender" 
                                placeholder="Select a option and change input text above"
                                value = {this.state.gender.value}
                                onChange = {this.handleGenderChange}
                                >
                                    <Option key="1" value="Male">Male</Option>
                                    <Option key="2" value="Female">Female</Option>
                                    <Option key="3" value="Others">Others</Option>
                            </Select>
                        </FormItem>
                        <FormItem 
                            label="Address"
                            hasFeedback
                            validateStatus={this.state.address.validateStatus}
                            help={this.state.address.errorMsg}>
                            <Input 
                                size="large"
                                name="address" 
                                type="text"
                                autoComplete="off"
                                placeholder="Address" 
                                value={this.state.address.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateAddress)} />    
                        </FormItem>
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>Sign up</Button>
                            Already registed? <Link to="/login">Login now!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }


    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'error',
                        errorMsg: 'This username is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }


    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

    validateContactNumber = (value) => {
        var numbers = /^[0-9]+$/;
      if(!value.match(numbers)){
        return {
            validateStatus: 'error',
            errorMsg: `Contact number must be digits only.`
        }
      }else  if(value.length !== MOBILE_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Contact number must be 10 digits.`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

    validateEmailAddress = (value) => {
        if(value.length < MOBILE_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Enter valid email address`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

    validateSalary = (value) => {
        console.log(value)
        var numbers = /^[0-9]+$/;
        if(!value.match(numbers)){
            return {
                validateStatus: 'error',
                errorMsg: `Contact number must be digits only.`
            }
          }else if(value <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `Salary must be greatr than 0.`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

    validateAddress = (text) => {
        if(text.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Address is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

    validateGender = (text) => {
        if(text ==="") {
            return {
                validateStatus: 'error',
                errorMsg: `Invalid Gender`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

    validateEmployeeType = (text) => {
        if(text.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Employee Type is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

    validateDob = (text) => {
        if(text.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Date of birth is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }
}

export default Signup;