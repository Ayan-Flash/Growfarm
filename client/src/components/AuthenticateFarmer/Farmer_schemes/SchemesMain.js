import React from "react";
import { motion } from "framer-motion";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaListAlt, FaCheckCircle, FaTimesCircle, FaClipboardList } from "react-icons/fa";
import Approved from "./Approved";
import Applied from "./Applied";
import Schemes from "./schemes";
import Rejected from "./Rejected";
import "./SchemesMain.css";

function SchemesMain() {
  return (
    <>
      <motion.div 
        className="Main_Farmer_Schemes"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="Mainin_Farmer_Schemes"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="Farmer_Tabs">
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="profile" title={
                <span>
                  <FaListAlt className="tab-icon" />
                  Beneficiary Schemes
                </span>
              }>
                <Schemes />
              </Tab>
              <Tab eventKey="home" title={
                <span>
                  <FaClipboardList className="tab-icon" />
                  Applied Schemes
                </span>
              }>
                <Applied />
              </Tab>
              <Tab eventKey="contact" title={
                <span>
                  <FaCheckCircle className="tab-icon" />
                  Approved Schemes
                </span>
              }>
                <Approved />
              </Tab>
              <Tab eventKey="info" title={
                <span>
                  <FaTimesCircle className="tab-icon" />
                  Rejected Schemes
                </span>
              }>
                <Rejected/>
              </Tab>
            </Tabs>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default SchemesMain;
