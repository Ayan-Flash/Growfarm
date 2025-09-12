import React, { Component, useContext, useState } from "react";
import { sha256 } from 'js-sha256'
import { motion } from "framer-motion";
import { AppContext } from "../AuthenticateFarmer/Farmer_account/appContext";
import io from 'socket.io-client'
import "./login.css"
import Button from 'react-bootstrap/Button';
import { FaUser, FaMobile, FaLock, FaSignInAlt } from "react-icons/fa";


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: localStorage.getItem("user"),
      Mobilenum: "",
      Password: "",
      Mobilenumfield: false,
      Uniqeidfield: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = io('http://localhost:7000')
  }

  selectMobilenum(e) {
    this.setState({
      Mobilenumfield: true,
      Uniqeidfield: false,
    })
  }
  selectUniqeid(e) {
    this.setState({
      Mobilenumfield: false,
      Uniqeidfield: true
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.Password === "") {
      const Password = this.state.Password;
      const { Mobilenum, Farmerid } = this.state;
      console.log(Mobilenum, Password, Farmerid);
      fetch("http://localhost:8000/farmer/farmerlogin", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          Mobilenum,
          Farmerid,
          Password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Farmerid) {
            console.log(data)
            console.log(Password, "pin")
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "./Myaccount";
          }
          else {
            // alert(data)
            console.log(data, "else")
            console.log(Password, "pin")
            console.log(data.error, "hahahaha")
            const loginerroralert = data.error
          }
        });
    } else {
      const Password = sha256(this.state.Password);
      const { Mobilenum, Farmerid } = this.state;
      console.log(Mobilenum, Password);
      fetch("http://localhost:8000/farmer/farmerlogin", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          Mobilenum,
          Farmerid,
          Password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Farmerid) {
            console.log(data)
            console.log(Password, "pin")
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "./Myaccount";
          }
          else {
            // alert(data)
            console.log(data, "else")
            console.log(Password, "pin")
            console.log(data.error, "hahahaha")
            const loginerroralert = data.error
            this.setState({
              loginerroralert
            })

          }
        });
    }
  }

  render() {

    return (
      <motion.div 
        className="auth-wrapper_Login"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="auth-inner_Login"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.form 
            className="form" 
            id="loginform" 
            onSubmit={this.handleSubmit}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.h2 
              id="loginh2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <FaSignInAlt className="login-icon" />
              Welcome Back
            </motion.h2>
            <div className="radio_div">
              <label>

                <input className="radiobut_div"
                  type="radio"
                  name="subject"
                  onChange={(e) => this.selectMobilenum(e)}
                />Mobile Number
              </label>
              <label>
                <input className="radiobut_div"
                  type="radio"
                  name="subject"
                  onChange={(e) => this.selectUniqeid(e)}
                />Unique Id

              </label>
            </div>



            {this.state.Mobilenumfield ?
              <div className="mb-3">
                <label><FaMobile className="input-icon" /> Mobile Number</label>
                <input

                  className="form-control"
                  id="logindata"
                  placeholder="Enter Your Mobile number"
                  onChange={(e) => this.setState({ Mobilenum: e.target.value })}
                />
              </div> : null
            }
            {this.state.Uniqeidfield ?
              <div className="mb-3">
                <label><FaUser className="input-icon" /> Unique Farmer Id</label>
                <input

                  className="form-control"
                  id="logindata"
                  placeholder="Enter Your Unique Id"
                  onChange={(e) => this.setState({ Farmerid: e.target.value })}

                />
              </div> : null

            }

            <div className="mb-3">
              <label><FaLock className="input-icon" /> Password</label>
              <input
                type="password"
                className="form-control"
                id="logindata"
                placeholder="Enter Password"
                onChange={(e) => this.setState({ Password: e.target.value })}
              />
              <p style={{ color: "red", marginTop: "3px" }}>{this.state.loginerroralert}</p>
            </div>

            <div className="d-grid">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="success" type="submit" className="btn btn-primary enhanced-login-btn" id="singinbtn">
                  <FaSignInAlt className="btn-icon" />
                  Sign In
                </Button>
              </motion.div>
            </div>
            <p className="forgot-password text-right" >
              <a id="login_pageflow" href="/sign-up">Sign Up</a> <br />
              <a id="login_pageflow" href="/adminlogin">Admin Login</a>
            </p>

          </motion.form>

          <motion.div 
            id="rightside"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <img id="rightimg" src="./imgs/login_pic.jpg" alt="loginimg"></img>
          </motion.div>
        </motion.div>


      </motion.div>


    );
  }
}
