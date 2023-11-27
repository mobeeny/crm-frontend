import React from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Card from '@mui/material/Card';

const PDFFile = () => {
    const componentPdf = useRef();

    const generatePdf = useReactToPrint({
        content: () => componentPdf.current,
        documentTitle: "userData",
    });
    const date = new Date().toLocaleDateString();

    return (
        <>
            <style>
                {`
          @media print {
            .header {
              text-align: center;
            }
            .prepared {
              text-align: right;
              margin-right: 4%;
              margin-top: 2%;
            }
            img {
              float: left;
              margin-left: 3%;
            }
            .scope,
            .prereqs,
            .fulfill,
            .timeline,
            .charges,
            .terms,
            .paymentSchedule,
            .bankDetails {
                margin-left: 3%;
                margin-top: 2%;
            }
            .card-for-print {
              box-shadow: none; /* Remove box shadow for print */
              page-break-inside: avoid; /* Avoid breaking the card across pages */
            }
          }
        `}
            </style>
            <div ref={componentPdf} style={{ width: '100%' }}>
                <div style={{ maxWidth: '1000px', minWidth: '1000px' }}>
                    <Card className="card-for-print" sx={{ p: 5, maxWidth: '1000px', minWidth: '1000px' }}>
                        <div className="page1"  >
                            <img className="logo" src='logo192.png' alt="Logo" />
                            <div style={{ clear: 'both' }}></div>

                            <div className="header" style={{ textAlign: 'center', }}>
                                <h1 style={{ fontSize: '70px', color: "#E45865", marginBottom: '0.2em', marginTop: '35%' }}>PROPOSAL</h1>
                                <Typography style={{ fontSize: 28, marginBottom: '0.2em', wordWrap: 'break-word', overflowWrap: "break-word" }}>Solar Buisness Registration with AEDB & PEC : C-2|upto 500kw</Typography>
                                <Typography style={{ fontSize: 22, wordWrap: 'break-word', overflowWrap: "break-word" }}>(For Grid Installations & Bank Requirments)</Typography>
                            </div>


                            <div style={{ textAlign: 'right', marginTop: '35%' }} className="prepared">
                                <Typography style={{ fontSize: 28 }}>Prepared For</Typography>
                                <Typography style={{ fontSize: 22 }}>Client Name</Typography>
                                <Typography style={{ fontSize: 22 }}>Client company</Typography>
                                <Typography style={{ fontSize: 28 }}>Prepared By</Typography>
                                <Typography style={{ fontSize: 22 }}>Tahir Farooq</Typography>

                            </div>
                        </div>
                    </Card>

                    <Card className="card-for-print" sx={{ p: 5, maxWidth: '1000px', minWidth: '1000px',  }}>
                        <div className="page2">
                            <h2>This <b style={{ color: 'rgb(209, 61, 16)' }}>PROPOSAL </b>is offered on <b>{date}.</b></h2>
                            <div className="scope">
                                <h3>1 - Scope Of Work</h3>
                                <ul>
                                    <li>
                                        <Typography style={{ fontSize: '18px', margin: "1%", wordWrap: 'break-word', overflowWrap: "break-word" }}>Product Title 1:</Typography>
                                        <ul style={{ listStyleType: "disc", wordWrap: 'break-word', overflowWrap: "break-word" }}>
                                            <li>Renewal of PEC registration for year 2024</li>
                                            <li>To get solar specialized electrical codes</li>
                                            <li>Endorsement of AEDB certificate for year 2024.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Typography style={{ fontSize: '18px', margin: "1%", wordWrap: 'break-word', overflowWrap: "break-word" }}>Product Title 2:</Typography>
                                        <ul style={{ listStyleType: "disc" }}>
                                            <li>Renewal of PEC registration for year 2024</li>
                                            <li>To get solar specialized electrical codes</li>
                                            <li>Endorsement of AEDB certificate for year 2024.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="prereqs">
                                <h3>2 - PreRequists fulfil to be provided by Client</h3>
                                <ul>
                                    <li>
                                        <Typography style={{ fontSize: '18px', margin: "1%", wordWrap: 'break-word', overflowWrap: "break-word" }}>Product Title 1:</Typography>
                                        <ul style={{ listStyleType: "disc" }}>
                                            <li>Renewal of PEC registration for year 2024</li>
                                            <li>To get solar specialized electrical codes</li>
                                            <li>Endorsement of AEDB certificate for year 2024.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Typography style={{ fontSize: '18px', margin: "1%", wordWrap: 'break-word', overflowWrap: "break-word" }}>Product Title 2:</Typography>
                                        <ul style={{ listStyleType: "disc" }}>
                                            <li>Renewal of PEC registration for year 2024</li>
                                            <li>To get solar specialized electrical codes</li>
                                            <li>Endorsement of AEDB certificate for year 2024.</li>
                                        </ul>
                                    </li>
                                </ul>

                            </div>

                            <div className="fulfill">
                                <h3> 3 - To be fulfil by company</h3>
                                <ul>
                                    <li>
                                        <Typography style={{ fontSize: '18px', margin: "1%", wordWrap: 'break-word', overflowWrap: "break-word" }}>Product Title 1:</Typography>
                                        <ul style={{ listStyleType: "disc" }}>
                                            <li>Renewal of PEC registration for year 2024</li>
                                            <li>To get solar specialized electrical codes</li>
                                            <li>Endorsement of AEDB certificate for year 2024.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Typography style={{ fontSize: '18px', margin: "1%", wordWrap: 'break-word', overflowWrap: "break-word" }}>Product Title 2:</Typography>
                                        <ul style={{ listStyleType: "disc" }}>
                                            <li>Renewal of PEC registration for year 2024</li>
                                            <li>To get solar specialized electrical codes</li>
                                            <li>Endorsement of AEDB certificate for year 2024.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="timeline">
                                <h3>4 -Timeline of the order</h3>
                                <ul>
                                    <li>
                                        <Typography style={{ fontSize: '18px', margin: "1%", wordWrap: 'break-word', overflowWrap: "break-word" }}>Product Title 1:</Typography>
                                        <ul style={{ listStyleType: "disc" }}>
                                            <li>Renewal of PEC registration for year 2024</li>
                                            <li>To get solar specialized electrical codes</li>
                                            <li>Endorsement of AEDB certificate for year 2024.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Typography style={{ fontSize: '18px', margin: "1%", wordWrap: 'break-word', overflowWrap: "break-word" }}>Product Title 2:</Typography>
                                        <ul style={{ listStyleType: "disc" }}>
                                            <li>Renewal of PEC registration for year 2024</li>
                                            <li>To get solar specialized electrical codes</li>
                                            <li>Endorsement of AEDB certificate for year 2024.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <Card className="card-for-print" sx={{ p: 5, maxWidth: '1000px', minWidth: '1000px', marginBottom: '20px' }}>
                        <div className="page3" style={{ minHeight: '100%' }}>
                            <div className="charges" style={{ width: "100%" }}>
                                <h3>5 - Charges</h3>
                                <table className="proposaltable" style={{ width: "80%" }}>
                                    <thead>
                                        <tr>
                                            <th>S.NO</th>
                                            <th>Task</th>
                                            <th>Cost(pkr)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={3}>Product 1 Name</td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>
                                                <ul style={{ textAlign: "left", wordWrap: 'break-word', overflowWrap: "break-word", margin: 0 }}>
                                                    <li>PEC Renewal for 2024</li>
                                                    <li>AEDB endorsement for year 2024</li>
                                                    <li>All challan / non-challan payments included.</li>
                                                    <li>All government cost included.</li>
                                                </ul>
                                            </td>
                                            <td>85,000-</td>
                                        </tr>


                                        {/* Copy the same content for the second product */}
                                        <tr>
                                            <td colSpan={3}>Product 2 Name</td>
                                        </tr>
                                        <tr>
                                            <td>1.</td>
                                            <td>
                                                <ul style={{ textAlign: "left", wordWrap: 'break-word', overflowWrap: "break-word", margin: 0 }}>
                                                    <li>PEC Renewal for 2024</li>
                                                    <li>AEDB endorsement for year 2024</li>
                                                    <li>All challan / non-challan payments included.</li>
                                                    <li>All government cost included.</li>
                                                </ul>
                                            </td>
                                            <td>85,000-</td>
                                        </tr>
                                        <tr>

                                            <td><b>Included-</b></td>
                                            <td style={{ textAlign: "left", wordWrap: 'break-word', overflowWrap: "break-word", }} colSpan={2}>
                                                <ul style={{ margin: 0 }}>
                                                    <li>PEC Renewal for 2024</li>
                                                    <li>AEDB endorsement for year 2024</li>
                                                </ul></td>
                                        </tr>
                                        <tr>

                                            <td><b>Excluded-</b></td>
                                            <td style={{ textAlign: "left", wordWrap: 'break-word', overflowWrap: "break-word", margin: 0 }} colSpan={2}>
                                                <ul style={{ margin: 0 }}>
                                                    <li>PEC Renewal for 2024</li>
                                                    <li>AEDB endorsement for year 2024</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>Discount</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}><b>Total</b></td>
                                            <td><b>-75,000/-</b></td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>




                            <div className="paymentSchedule" style={{ width: "100%" }}>
                                <h3>6 - Payment Schedule</h3>
                                <table className="proposaltable" style={{ width: "80%" }}>
                                    <thead>
                                        <tr>
                                            <th>S.NO</th>
                                            <th>Task</th>
                                            <th>Due % (Approx)</th>
                                            <th>Amount % (Approx)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={4} >Payment Terms</td>
                                        </tr>
                                        <tr >
                                            <td>1.</td>
                                            <td style={{ textAlign: 'left' }} >On agreement - Advance</td>
                                            <td>25%</td>
                                            <td>305,000 -</td>
                                        </tr>
                                        <tr>
                                            <td>2.</td>
                                            <td style={{ textAlign: 'left' }}>After issuance of Bank Guarantee</td>
                                            <td>40%</td>
                                            <td>490,000 -</td>
                                        </tr>
                                        <tr>
                                            <td>3.</td>
                                            <td style={{ textAlign: 'left' }}>After getting R&I Receiving – case submission with AEDB</td>
                                            <td>25%</td>
                                            <td>305,000 -</td>
                                        </tr>
                                        <tr>
                                            <td>4.</td>
                                            <td style={{ textAlign: 'left' }}>After getting AEDB approval Letter in C-2 (before certification)</td>
                                            <td>10%</td>
                                            <td>125,000 -</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}><b>Total</b></td>
                                            <td><b>100%</b></td>
                                            <td><b>1,225,000 -</b></td>
                                        </tr>

                                    </tbody>
                                </table>


                            </div>
                        </div>
                    </Card>

                    <Card className="card-for-print" sx={{ p: 5, maxWidth: '1000px', minWidth: '1000px' }}>
                        <div className="page4">

                            <div className='terms'>
                                <h3 >7 - Terms and Condition</h3>
                                <ul style={{ wordWrap: 'break-word', overflowWrap: "break-word" }}>
                                    <li>E-axon basedpproval in commited time.</li>
                                    <li>PEC & AEDB certificate will be valid till 30th june 2024.</li>
                                    <li>Electrical Engineer will be provided by Regrent.</li>
                                    <li>All charges are exclusive of all tax(s)</li>
                                </ul>
                            </div>

                            <div className='bankDetails'>
                                <h3 >8 - Bank Details</h3>
                                <div className="bank-info-card">
                                    <p>Meezan Bank Ltd</p>

                                    <p>Account Title  : TENCO Engineering</p>
                                    <p>IBAN #           PK89 MEZN 0003 1201 0736 1070</p>
                                    <p>Account #        03120107361070</p>
                                    <p>Branch code:     0312</p>

                                    <p>Meezan Bank Ltd, I-8 Markaz Islamabad</p>
                                </div>
                            </div>



                            <footer className="footer" style={{ bottom: 0, }}>
                                <img src="Images/code.png" style={{maxWidth:'20ch' , maxHeight:"20ch" ,alignItems:"center" , justifyContent:"center"}}></img>

                                <div className="icon-container">
                                    <div className="icon-label">
                                        <FaPhone className="icon" />
                                        <span className="label">+92 51 88 99 222</span>
                                    </div>
                                    <div className="icon-label">
                                        <FaWhatsapp className="icon" />
                                        <span className="label">+92 300 500 6839</span>
                                    </div>
                                    <div className="icon-label">
                                        <FaEnvelope className="icon" />
                                        <span className="label">info@e-axon.com</span>
                                    </div>
                                    <div className="icon-label">
                                        <FaMapMarkerAlt className="icon" />
                                        <span className="label">Office no# 3207,<br />3rd Floor,NSTP Nust</span>
                                    </div>
                                </div>

                            </footer>

                            <container className='footer_taskbar'>
                                <h4>www.e-axon.com</h4>
                                <h4>Your Buisness Partner</h4>
                            </container>
                        </div>
                    </Card>
                </div >
            </div >
            <button
                onClick={generatePdf}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#E45865',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    alignSelf: 'center',
                }}
            >
                Download PDF
            </button>
        </>
    );
};

export default PDFFile;
















