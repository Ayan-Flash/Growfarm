import style from "./style.css"
import React, { Component } from 'react'
import axios from "axios";
import { motion } from "framer-motion";
import { Form, Card, ProgressBar } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import ApexCharts from 'apexcharts'
import Button from "react-bootstrap/Button";
import { FaSeedling, FaLeaf, FaThermometerHalf, FaTint } from "react-icons/fa";
import { useEffect, useState } from 'react';
import {
	Container,
	Col,
	Row,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { v1 as uuid } from 'uuid';
const auth = localStorage.getItem('user');

export default function Croprek ()  {
  const[top5datacrop0 , setTop5data0] = useState([]);
  const[Cropfert , setCropfert] = useState("");
  const [loading, setLoading] = useState(false);
  const [Nitrogen, setNitrogen] = useState("85");
  const [City, setCity] = useState(JSON.parse(auth).Taluka
  );
  const [Phosphorus, setPhosphorus] = useState("70");
  const [Potassium, setPotassium] = useState("60");
  const [Ph, setPh] = useState("6");
  const [Rain, setRain] = useState("90");
  const [shownCrop, setshownCrop] = useState(false);
  const [showntop5, setshowntop5] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleShow = (crop) => {
		setshownCrop(crop);
    console.warn(crop)
    console.log(crop.Fert)
    setCropfert(crop.Fert)
    console.log(crop.Requir_Nitro)
	};
  console.log(Cropfert)

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(Ph, Nitrogen, Phosphorus, Potassium);

setIsLoading(true);
setshowntop5(true)

  const getCropData = () => {
     axios.get(`https://1a78-117-254-32-101.in.ngrok.io/Crop_Recommandation/%3Ccity%3E/%3Cint:N%3E/%3Cint:P%3E/%3Cint:K%3E/%3Cstring:Ph%3E/%3Cstring:rain%3E?city=${City}&N=${Nitrogen}&P=${Phosphorus}&K=${Potassium}&Ph=${Ph}&rain=${Rain}` , {withCredentials: true})
    // .then((response) =>  response.json())
      .then((data) => {
const Crops = data.data.Top; 
console.log(data.data.Top[0].Fert)
        setTop5data0(Crops);
        console.warn(Crops)
        setIsLoading(false);
      }); 
  };
  getCropData();
  }
  
  if (isLoading) {
    return (
      <div className="loading-container">
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaSeedling />
        </motion.div>
        <p>Analyzing soil conditions...</p>
      </div>
    );
  }

let chartvalue = top5datacrop0.map((i => (i.Prob* 100)))
// let Cropvalue = top5datacrop0.map((i => (i.Crop)))
// console.log(Cropvalue)
let Labalevalue = top5datacrop0.map((i => (i.Crop)))


    return (
      auth ?
      <> 
       <motion.div 
         className="crop-recommendation-container"
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
             <FaSeedling className="header-icon" />
             Smart Crop Recommendation
           </motion.h1>
           <motion.p 
             className="page-subtitle"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4, duration: 0.6 }}
           >
             Get AI-powered crop recommendations based on your soil and weather conditions
           </motion.p>
         </div>

         <motion.div 
           className="form-container"
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3, duration: 0.6 }}
         >
           <form onSubmit={handleSubmit} className="recommendation-form">
             <div className="form-grid">
               <motion.div 
                 className="form-group"
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.2 }}
               >
                 <label><FaLeaf className="input-icon" /> Location</label>
                 <input
                   className="form-control enhanced-input"
                   placeholder="Enter Your City"
                   value={City}
                   onChange={(event) => setCity(event.target.value)}
                 />
               </motion.div>
               
               <motion.div 
                 className="form-group"
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.2 }}
               >
                 <label>Nitrogen (N)</label>
                 <input
                   type="number"
                   className="form-control enhanced-input"
                   placeholder="Nitrogen content"
                   value={Nitrogen}
                   onChange={(event) => setNitrogen(event.target.value)}
                 />
               </motion.div>
               
               <motion.div 
                 className="form-group"
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.2 }}
               >
                 <label>Phosphorus (P)</label>
                 <input
                   type="number"
                   className="form-control enhanced-input"
                   placeholder="Phosphorus content"
                   value={Phosphorus}
                   onChange={(event) => setPhosphorus(event.target.value)}
                 />
               </motion.div>
               
               <motion.div 
                 className="form-group"
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.2 }}
               >
                 <label>Potassium (K)</label>
                 <input
                   type="number"
                   className="form-control enhanced-input"
                   placeholder="Potassium content"
                   value={Potassium}
                   onChange={(event) => setPotassium(event.target.value)}
                 />
               </motion.div>
               
               <motion.div 
                 className="form-group"
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.2 }}
               >
                 <label><FaThermometerHalf className="input-icon" /> pH Level</label>
                 <input
                   type="number"
                   step="0.1"
                   className="form-control enhanced-input"
                   placeholder="pH value (0-14)"
                   value={Ph}
                   onChange={(event) => setPh(event.target.value)}
                 />
               </motion.div>
               
               <motion.div 
                 className="form-group"
                 whileHover={{ scale: 1.02 }}
                 transition={{ duration: 0.2 }}
               >
                 <label><FaTint className="input-icon" /> Rainfall</label>
                 <input
                   type="number"
                   className="form-control enhanced-input"
                   placeholder="Expected rainfall (mm)"
                   value={Rain}
                   onChange={(event) => setRain(event.target.value)}
                 />
               </motion.div>
             </div>
             
             <motion.div 
               className="submit-container"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <Button 
                 variant="success" 
                 type="submit" 
                 className="enhanced-submit-btn"
                 disabled={isLoading}
               >
                 {isLoading ? (
                   <>
                     <motion.div 
                       className="btn-spinner"
                       animate={{ rotate: 360 }}
                       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                     />
                     Analyzing...
                   </>
                 ) : (
                   <>
                     <FaSeedling className="btn-icon" />
                     Get Recommendations
                   </>
                 )}
               </Button>
             </motion.div>
           </form>
         </motion.div>
        </div>
        </div>

{/* {top5datacrop0.map ((newfert , idx) => {
  return (
<>
<p>{newfert.Fert}</p>
</>
  )
})} */}


<br />
{showntop5 ?
 <div className="auth-innerCropretop5">
 <Container fluid className='contant-container'>
 <h6 style={{ fontSize: "21px" }}> <span style={{color : "green"}}>Five</span> most suitable crop of <b style={{color : "green"}}>{City}</b>  with nitrogen value of <b style={{color : "green"}}>{Nitrogen}</b> , phosphorus of <b style={{color : "green"}}>{Phosphorus}</b>, potassium value of <b style={{color : "green"}}>{Potassium}</b> , pH value of <b style={{color : "green"}}>{Ph}</b>  and rain value of <b style={{color : "green"}}>{Rain}</b> .</h6>
     <Row>
       {top5datacrop0.map((crop, idx) =>
        {
         return (
           <>
             <Col key={idx}>
              
               <Card
                 style={{
                   width: "18rem",
                   margin: "auto",
                   marginTop: "50px",
                 }}>
                 <Card.Img
                   variant='top'
                   src={`/crop_image/${crop.Crop}.jpg`}
                 />
                 <Card.Body>
                   <Card.Title>
                   <h6>{idx + 1}</h6>
                     {crop.Crop}
                   </Card.Title>
                   <Card.Text
                     style={{ fontWeight: "bold", textAlign: "center" }}>
                     Success Chances
                   </Card.Text>
                   <ProgressBar
                     animated now={crop.Prob *100}
                     max = {100}
                     label={(crop.Prob)* 100}
                     style={{ marginBottom: "20px", marginRight: "0px" }}
                   />
                   <Button
                     variant='primary'
                     key={idx}
                     className='me-2'
                     onClick={() => handleShow(crop)}
                     >
                     Get Info
                   </Button>
                 </Card.Body>
               </Card>
             </Col>
           </>
         );
       })}
     </Row>
   </Container>
   </div>

:null}
       
          <br></br>
          {shownCrop ?
          (
            <>
            <div className="auth-innerCropretop5">

            <h6 style={{fontSize : "22px"}}>Soil and weather analysis of <b style={{color : "green"}}>{shownCrop.Crop}.</b>   </h6>
            <Container fluid className='contant-container'>
					<Row>
						{/* <Col xs={3} style={{ margin: "auto" }}>
							<h2 style={{ fontWeight: "bold" }}>Pi Chart of Success</h2>
						</Col> */}
						<Col xs={15} style={{ margin: "auto" }}>
							<ReactApexChart className="chartgh3"
								options={{
                  chart: {
                    type: "bar",
                    height: 430,
                    width : 700
                  },
                  title: {
                    text: "Soil Analysis",
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      dataLabels: {
                        position: "top",
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    offsetX: -6,
                    style: {
                      fontSize: "12px",
                      colors: ["#fff"],
                    },
                  },
                  stroke: {
                    show: true,
                    width: 1,
                    colors: ["#fff"],
                  },
                  tooltip: {
                    shared: true,
                    intersect: false,
                  },
                  xaxis: {
                    categories:
                      ["Nitrogen" , "Phosphorus" , "Potassium" ,  " Ph"],
                  },
                }}
                series={[
                  {
                    name: "Current",
                    data: [Nitrogen , Phosphorus , Potassium ,  Ph ],
                  },
                  {
                    name: "Required",
                    data: [shownCrop.Requir_Nitro , shownCrop.Require_Phosp, shownCrop.Require_cal , shownCrop.Requir_Ph , ],
                  },
                ]}
                type='bar'
                height={500}
							/>
						</Col>
					</Row>
				</Container>
            <Container fluid className='contant-container'>
					<Row>
						<Col xs={15} style={{ margin: "auto" }}>
							<ReactApexChart className="chartgh2"
								options={{
                  chart: {
                    type: "bar",
                    height: 430,
                    width : 700
                  },
                  title: {
                    text: "Weather analysis",
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      dataLabels: {
                        position: "top",
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    offsetX: -6,
                    style: {
                      fontSize: "12px",
                      colors: ["#fff"],
                    },
                  },
                  stroke: {
                    show: true,
                    width: 1,
                    colors: ["#fff"],
                  },
                  tooltip: {
                    shared: true,
                    intersect: false,
                  },
                  xaxis: {
                    categories:
                      ["Rain" , "Temperature" , "Humidity"],
                  },
                }}
                series={[
                  {
                    name: "Current",
                    data: [  Rain ,Math.trunc(shownCrop.User_temp) , Math.trunc(shownCrop.User_humidity)],
                  },
                  {
                    name: "Required",
                    data: [ Math.trunc(shownCrop.Require_rain), Math.trunc(shownCrop.Require_temp) , Math.trunc(shownCrop.Require_humidity) ],
                  },
                ]}
                type='bar'
                height={500}
							/>
						</Col>
					</Row>
				</Container>
        <br />
        <h6>Fertilizer suggestions</h6>
        <p>{Cropfert}</p>
              </div>
              </>
              ) : null}
         <br />

{showntop5 ? 
 <div className="auth-innerCroprepie">
 <Container fluid className='contant-container'>
 <Row>
   <Col xs={3} style={{ margin: "auto" }}>
     <h2 style={{ fontWeight: "bold" , marginRight : "70px" }}>Pi Chart of Success</h2>
   </Col>
   <Col xs={1} style={{ margin: "auto" }}>
     <ReactApexChart className="chat1pie"
       options={{
         chart: {
           width: 500,
           align: 'Center',
           type: "pie",
           
         },
       plotOptions: {
         pie: {
           offsetX : 10,
           offsetY: 0,
           startAngle: 0,
           endAngle: 360,
           hollow: {
             margin: 20,
             size: '10%',
             background: 'transparent',
             image: undefined,
           },
           dataLabels: {
             name: {
               show: true,
             },
             value: {
               show: true,
             }
           }
         }
       },
         labels:
         Labalevalue,
         responsive: [
           {
             breakpoint: 480,
             options: {
               chart: {
                 width: 200,
               },
               legend: {
                 position: "bottom",
               },
             },
           },
         ],
       }}
       series={
         chartvalue
       }
       type='pie'
       width={500}
     />
   </Col>
 </Row>
</Container>
</div>


: null}
 
        

        <br />
      </>
    
      : 
       <>
      <div style={{marginTop : "150px"}}><h2>Login Require</h2></div>
      </>
    )
  
}