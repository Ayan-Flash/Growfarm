import axios from "axios";
import React, { Component } from "react";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { FaBug, FaUpload, FaCamera, FaLeaf } from "react-icons/fa";
import "./style.css";

class App extends Component {
  state = {
    selectedFile: null,
    Diseas: [],
    Sugestions: [],
    previewimg: null,
    data: false,
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ previewimg: URL.createObjectURL(event.target.files[0]) });
  };
  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);
    console.log(this.state.selectedFile.name);

    // Mock data for demo - replace with actual API call
    setTimeout(() => {
      const mockResponse = {
        Crop: "Tomato",
        Diseas: "Early Blight",
        Cause: "Fungal infection caused by Alternaria solani, favored by warm, humid conditions",
        Sugession: "1. Remove affected leaves immediately\n2. Apply copper-based fungicide\n3. Improve air circulation\n4. Avoid overhead watering\n5. Use disease-resistant varieties"
      };
      this.setState({ 
        Diseas: mockResponse,
        data: true 
      });
    }, 2000);

    // Uncomment below for actual API call
    // const promise = axios.post("http://localhost:5000/Crop_Diseas", formData);
    // promise.then((data) => {
    //   this.setState({ Diseas: data.data });
    //   this.setState({ data: true });
    // });

    console.warn(this.state.Diseas);
    console.warn(formData);
  };

  render() {
    return (
      <>
        <motion.div 
          className="disease-detection-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="page-header">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FaBug className="header-icon" />
              Plant Disease Detection
            </motion.h1>
            <motion.p 
              className="page-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Upload a photo of your plant to instantly identify diseases and get treatment recommendations
            </motion.p>
          </div>

          <motion.div 
            className="upload-section"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="upload-container">
              <div className="upload-area">
                <FaCamera className="upload-icon" />
                <h4>Upload Plant Image</h4>
                <p>Choose a clear photo of the affected plant part</p>
                <input 
                  type="file" 
                  onChange={this.onFileChange} 
                  accept="image/*"
                  className="file-input"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="file-label">
                  <FaUpload className="upload-btn-icon" />
                  Choose Image
                </label>
              </div>
              
              {this.state.selectedFile && (
                <motion.div 
                  className="file-preview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p>Selected: {this.state.selectedFile.name}</p>
                  <Button 
                    className="enhanced-upload-btn" 
                    onClick={this.onFileUpload}
                  >
                    <FaLeaf className="btn-icon" />
                    Analyze Disease
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          <div className="results-container">
          {this.state.data ? (
            <motion.div 
              className="results-grid"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="Diseasedete">
                <motion.img 
                  src={this.state.previewimg} 
                  className="disease-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="Diseasedete2">
                <motion.table 
                  id="F_model_Table"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <tr>
                    <th>Crop Name</th>
                    <td> {this.state.Diseas.Crop} </td>
                  </tr>
                  <tr>
                    <th>Crop Disease</th>
                    <td>{this.state.Diseas.Diseas} </td>
                  </tr>
                  <tr>
                    <th>Crop Cause</th>
                    <td>{this.state.Diseas.Cause}</td>
                  </tr>

                 
                  <tr>
                    <th>Crop Suggestion</th>
                    <td>{this.state.Diseas.Sugession}</td>
                  </tr>
                </motion.table>
              </div>
            </motion.div>
          ) : null}
          </div>
        </motion.div>

        <br />
      </>
    );
  }
}

export default App;
