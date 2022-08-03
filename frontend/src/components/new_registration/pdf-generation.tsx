import React from 'react'
import { jsPDF } from 'jspdf'
import MzuLogo from '/assets/mzu-logo.jpg'
import Image from 'next/image'
import { DesktopComputerIcon, DotsCircleHorizontalIcon } from '@heroicons/react/solid'
import IStudentRegistration from '../../lib/interface/IRegistrationApplication'
import { mzu_logo } from '../../assets/image-url/mzu-logo'
import { DateTimeFormat } from 'intl'
import 'intl/locale-data/jsonp/en-IN'

// ---Config
const lineSpacing:number=1.14 //Y line spacing

const linespacing2:number=0

const generatePdf = (data: IStudentRegistration) => {
    
    //Every image have to be converted to url image before use 
  
    const doc = new jsPDF();
   
    doc.text('Mizoram University', 80, 10);
    doc.addImage(mzu_logo, 'JPEG', 94, 12, 20, 15)
    doc.setFontSize(13)
    doc.text('Student Online Registration Application', 68, 33);
    doc.line(10, 34, 200, 34);

    // --------Label    
    doc.setFontSize(12);
    doc.text('Personal Detail', 90, (35 * lineSpacing)+linespacing2,);
    doc.text('Name', 10, (40*lineSpacing)+linespacing2,);
    doc.text(':', 40, 40*lineSpacing,);
    doc.text('Fathers Name', 10, 50*lineSpacing);
    doc.text(':', 40, 50*lineSpacing,);
    doc.text('Mothers Name', 10, 60*lineSpacing);
    doc.text(':', 40, 60*lineSpacing,);
    doc.text('Date of Birth', 10, 70*lineSpacing);
    doc.text(':', 40, 70*lineSpacing,);
    doc.text('Gender', 80, 70*lineSpacing);
    doc.text(':', 100, 70*lineSpacing,);
    doc.text('Religion', 130, 70*lineSpacing);
    doc.text(':', 150, 70*lineSpacing,);
    doc.text('Category', 10, 80*lineSpacing);
    doc.text(':', 40, 80*lineSpacing,);
    doc.text('Adhaar', 100, 80*lineSpacing);
    doc.text(':', 120, 80*lineSpacing,);
    doc.text('Mobile No', 10, 90*lineSpacing);
    doc.text(':', 40, 90*lineSpacing,);
    doc.text('Email', 80, 90*lineSpacing);
    doc.text(':', 100, 90*lineSpacing,);
    doc.text('Permanent Address', 10, 100*lineSpacing);
    doc.text(':', 50, 100*lineSpacing,);
    doc.text('Country', 10, 110*lineSpacing);
    doc.text(':', 40, 110*lineSpacing,);
    doc.line(10 * lineSpacing, 120 * lineSpacing, 200, 120 * lineSpacing);
    // -----------ACADEMIC DETAILS--------
    doc.text('Academic Detail', 90, 125 * lineSpacing,);
    doc.text('Mode', 10, 135*lineSpacing);
    doc.text(':', 55, 135*lineSpacing,);
    doc.text('Programme Selected', 10, 145*lineSpacing);
    doc.text(':', 55, 145 * lineSpacing,);
    doc.text('Admission Batch', 10, 155*lineSpacing);
    doc.text(':', 55, 155 * lineSpacing,);
    doc.text('Rollno', 110, 155*lineSpacing);
    doc.text(':', 130, 155 * lineSpacing,);
    // -------Martriculation details--------
    doc.text('Matriculation', 10, 165 * lineSpacing);
    doc.text('Rollno', 10, 172*lineSpacing);
    doc.text(':', 55, 172 * lineSpacing,);
    doc.text('Year', 110, 172*lineSpacing);
    doc.text(':', 130, 172 * lineSpacing,);
    doc.text('Board', 10, 182*lineSpacing);
    doc.text(':', 55, 182 * lineSpacing,);
    //------Last Academic Degree-------
    doc.text('Last Academic Degree', 10, 194 * lineSpacing);
    doc.text('Programme/Degree', 10, 201*lineSpacing);
    doc.text(':', 55, 201 * lineSpacing,);
    doc.text('Rollno', 10, 211*lineSpacing);
    doc.text(':', 55, 211 * lineSpacing,);
    doc.text('Year', 110, 211*lineSpacing);
    doc.text(':', 130, 211 * lineSpacing,);
    doc.text('University/College', 10, 221*lineSpacing);
    doc.text(':', 55, 221 * lineSpacing,);
    
    // -------Submission Details----------
    doc.line(10, 228 * lineSpacing, 200, 228 * lineSpacing);
    doc.text('Submission Details', 90, 233 * lineSpacing,);
    doc.text('Application Id', 10, 243*lineSpacing);
    doc.text(':', 40, 243 * lineSpacing,);
    doc.text('Date', 90, 243*lineSpacing);
    doc.text(':', 103, 243 * lineSpacing,);
    doc.text('Fee Paid', 140, 243*lineSpacing);
    doc.text(':', 160, 243 * lineSpacing,);

    // // ---------Data-------
    doc.setFontSize(12)
    doc.text(data.fullName, 45, 40 * lineSpacing,);
    doc.text(data.fathersName, 45, 50*lineSpacing,);
    doc.text(data.mothersName, 45, 60 * lineSpacing,);
    doc.text(String(DateTimeFormat('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric' })
        .format(new Date(data.dateOfBirth))), 45, 70 * lineSpacing);
    doc.text(data.gender, 105, 70 * lineSpacing,);
    doc.text(data.religion, 155, 70 * lineSpacing,);
    doc.text(data.category, 45, 80 * lineSpacing,);
    doc.text(String(data.adhaar), 125, 80 * lineSpacing,);
   
    doc.output('dataurlnewwindow');
}

interface props {
    data: IStudentRegistration
}

const PdfGeneration = ({data}:props) => {
  return (
      <div>
          <Image src={MzuLogo} width={70} height={50} alt="MZU Logo" className='bg-red-400'/>
          <button onClick={() => {
                generatePdf(data)
          }}>
              Generate Pdfd
          </button>
    </div>
  )
}

export default PdfGeneration