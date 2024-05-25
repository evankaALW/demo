import { useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/videoUploadForm.css';
import config from '../config';

const apiUrl = `${config.apiBaseUrl}`;
const apiFrontEndUrl = `${config.apiUrl}`;
function UploadForm() { //The formData variable contains all the form data that is being fetched from the upload form. It will be sent in the request body.
  const [formData, setFormData] = useState({
    videoURL: '',
    imageURL: '',
    dateAndTime:'',
    questionType: '',
    videoType:'',
    questionDesc:'',
    questionTypeID: 0,
    option: 0,
    padX:'',
    padY:'',
    text:'',
    x:'',
    y:'',
    colours:'',
    duration:'',
    optionOne:'',
    optionTwo:'',
    optionThree:'',
    optionFour:'',
    optionFive:'',
    adStartTime:'',
    correctOption:'',
    isBrandExist:'',
    brandName:'',
    brandLogo:'',
    brandURL:'',
    contactPersonName:'',
    contactPersonNumber:''
  });
  const [brandDetails,setBrandDetails] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/allBrandDetails`)
      .then(response => response.json())
      .then(results => {
        setBrandDetails(results.results);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
    });
  const [numOptions, setNumOptions] = useState(2);
  const handleNumOptionsChange = (e) => {
    const selectedNumOptions = parseInt(e.target.value, 10);
    setNumOptions(selectedNumOptions);
    setFormData({
      ...formData,
      optionOne: '',
      optionTwo: '',
      optionThree: '',
      optionFour: '',
      optionFive: '',
      correctOption: '',
    });
  };
  const [showAlert, setShowAlert] = useState(false);
  var showAlertMessage = "";
  var buttonClick = false;
  const [videoType,setVideoType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const optionMapping = {
    2: [
      {"padx1":194,"padx2":206}, 
      {"pady1":65,"pady2":68,}, 
      {text: "Helvetica 38"}, 
      {"x1":0,"x2":0},
      {"y1":300,"y2":502},
      {color:"red"}
    ],
    3: [
      {"padx1":177,"padx2":192}, 
      {"pady1":60,"pady2":54}, 
      {"x1":0,"x2":0},
      {text: "font_style_45"}, 
      {"y1":424,"y2":617},
      {color:"red"}
    ],
    4: [
      {"padx1":126,"padx2":60, "padx3":84, "padx4":177},
      {"pady1":23, "pady2":23, "pady3":23, "pady4":23},
      {text:"Helvetica 38"},
      {"x1":0,"x2":0,"x3":0,"x4":0},
      {"y1":257,"y2":369,"y3":481,"y4":593},
      {color:"red"}
    ],
    5.1: [
      {"padx1":99,"padx2":81, "padx3":108, "padx4":157, "padx5":97},
      {"pady1":15, "pady2":17, "pady3":20, "pady4":17, "pady5":17},
      {text:"Helvetica 38"},
      {"x1":0,"x2":0,"x3":0,"x4":0,"x5":0},
      {"y1":197,"y2":295,"y3":396,"y4":506, "y5":606},
      {color:"red"}
    ],
    5.2: [
      {"padx1":156,"padx2":198,"padx3":195,"padx4":11,"padx5":136},
      {"pady1":15,"pady2":17,"pady3":22,"pady4":20,"pady5":17},
      {"text":"Helvetica 34"},
      {"x1":0,"x2":0,"x3":0,"x4":0,"x5":0},
      {"y1":197,"y2":295,"y3":396,"y4":506,"y5":606},
      {"color":"red"}
    ]};
    const [isBrandExisting, setBrandExisting] = useState(false);
    const handleCheckboxChange = () => {
      setBrandExisting(!isBrandExisting);
    };

    const handleQuestionTypeIDChange = (e) => {
      const selectedQuestionTypeID = e.target.value;
      setFormData({
        ...formData,
        questionTypeID: selectedQuestionTypeID,
      });
    };
    const handleoption = (e) => {
      const optionid = e.target.value;
      setFormData({
        ...formData,
        option: optionid,
        padX: JSON.stringify(optionMapping[optionid][0]) || "",
        padY: JSON.stringify(optionMapping[optionid][1])|| "",
        text: JSON.stringify(optionMapping[optionid][2]) || "",
        x: JSON.stringify(optionMapping[optionid][3])|| "",
        y: JSON.stringify(optionMapping[optionid][4]) || "",
        colours: JSON.stringify(optionMapping[optionid][5]) || "",
      });
    };

  const handleVideoTypeChange = (videoType) => {
    setVideoType(videoType);
    setFormData({ ...formData, 'videoType': videoType });
  }

  useEffect(() => {
    if(formData.questionType.trim() === ''){
        setShowAlert(true);
        showAlertMessage = "Please enter a valid Question type";
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
    else if(isNaN(formData.questionTypeID) || formData.questionTypeID < 1){
        setShowAlert(true);
        showAlertMessage = "Please enter a valid Question Type ID (a positive number)";
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  },[buttonClick===true]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'contactPersonNumber') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({...formData,[name]: numericValue,});
      }
    } else {
      setFormData({...formData,[name]: value,});
    }
  };

  const handleVideoChange = (e) => {
    const myArray = ( e.target.value).split("\\");
    setFormData({ ...formData, 'videoURL' :  myArray[2]});
  }
  
  const handleImageChange = (e) => {
    const myArray = ( e.target.value).split("\\");
    const file = apiFrontEndUrl + '//images//' + myArray[2];
    setFormData({ ...formData, 'imageURL' :  file});
  } 

  const handleBrandLogoChange = (e) => {
    const file = e.target.files[0].name;
    setFormData({ ...formData, brandLogo: file });
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, isBrandExist: isBrandExisting });
     try {
      const response = await fetch(`${apiUrl}/api/uploadVideo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Data saved successfully!');
               setFormData({// Reset the form fields
                videoURL: '',
                imageURL: '',
                dateAndTime: '',
                questionType: '',
                videoType: '',
                questionDesc: '',
                questionTypeID: '',
                option: '',
                padX: '',
                padY: '',
                text: '',
                x: '',
                y: '',
                colours: '',
                duration: '',
                optionOne: '',
                brandLogo: '',
                brandURL:'',
                optionTwo: '',
                optionThree: '',
                optionFour: '',
                optionFive: '',
                adStartTime: '',
                correctOption: '',
                isBrandExist:'',
                brandName: '',
                contactPersonName: '',
                contactPersonNumber: '',
              });
      } else {
        console.error('Error uploading data');
        alert('Error uploading data!');
      }
    } catch (error) {
      console.error('Error:', error);
    }};

  return (
    <form className="video-form" onSubmit={handleSubmit}>
      <h1>Add Video Data</h1>
      
    <label>
      <span>Video URL:</span>
      <div className="custom-file-input">
        <input type="file" onChange={handleVideoChange} />
        Choose a File
      </div>
      <span className="file-name">{formData.videoURL}</span>
    </label>
      

      <label>
        Image URL:
        <div className="custom-file-input">
        <input type="file" onChange={handleImageChange} />
        Choose an Image
        </div>
        <span className="file-name">{formData.imageURL}</span>
      </label>
           
      <label>
        Date:
        <input type="datetime-local" name="dateAndTime" value={formData.dateAndTime} onChange={handleChange} />
      </label>
       
      <label>
        Video Type:
        <select name="videoType" value={formData.videoType} onChange={handleChange}>
          <option value="" disabled selected>Select the video type</option>
          <option value="Content">Content</option>
          <option value="Advertisement">Advertisement</option>
        </select>
      </label>

      <div className="checkbox-container" style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>
      <h4>Choose Option:</h4>
  <label className={`checkbox-label ${isBrandExisting ? 'isBrandExisting' : ''}`}>
    <input
      type="checkbox"
      checked={isBrandExisting}
      onChange={handleCheckboxChange}
      className="checkbox-input"
    />
    Add New Brand
  </label>

  <label className={`checkbox-label ${!isBrandExisting ? 'isBrandExisting' : ''}`}>
    <input
      type="checkbox"
      checked={!isBrandExisting}
      onChange={handleCheckboxChange}
      className="checkbox-input"
    />
    Choose From Existing Brand
  </label>
</div>
     
  <label style={{ display: formData.videoType === "Advertisement" && isBrandExisting ? 'block' : 'none' }}>
  Brand Name:
  <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} />
</label>

<label style={{ display: formData.videoType === "Advertisement" && !isBrandExisting ? 'block' : 'none' }}>
        Brand Name Dropdown:
        <select name="brandName" value={formData.brandName} onChange={handleChange}>
        {/* Default options */}
        <option value="">Select Brand</option>
        {/* Populate options from API */}
        {brandDetails.map((brand, index) => (
          <option key={index} value={brand.brandName}>
            {brand.brandName}
          </option>
        ))}
      </select>
      </label>
      
     
      <label style={{ display: formData.videoType =="Advertisement" && isBrandExisting ? 'block' : 'none' }}>
       <span>Brand Logo:</span>
       <div className="custom-file-input">
       <input type="file" onChange={handleBrandLogoChange} />
       Choose a Brand Logo
      </div>
      <span className="file-name">{formData.brandLogo}</span>
      </label>
     
      <label style={{ display: formData.videoType =="Advertisement" && isBrandExisting ? 'block' : 'none' }}>        Brand Contact Name:
        <input type="text" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} />
      </label>
      

      <label style={{ display: formData.videoType =="Advertisement" && isBrandExisting ? 'block' : 'none' }}>        Brand Contact Phone:
        <input type="text" name="contactPersonNumber" value={formData.contactPersonNumber} onChange={handleChange} />
      </label>
     

      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>
        Question Type:       
          <select name="questionType" value={formData.questionType} aria-placeholder="" onChange={handleChange}>
            <option value="" disabled selected>Select the question type</option>
            <option value="Image" >Image</option>
            <option value="Text" >Text</option>
          </select>
      </label>
      

      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>
        Question Type ID:
        <select
          name="questionTypeID"
          value={formData.questionTypeID}
          onChange={handleQuestionTypeIDChange}
        >
          <option value="">Select Question Type ID</option>
          {[0, 1, 2, 3, 4].map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </label>
      


      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>         Question:
        <input
          type="text"
          name="questionDesc"
          value={formData.questionDesc}
          onChange={handleChange}
          
        />
      </label> 
    


      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>         Option Type:
        <select
          name="option"
          value={formData.option}
          onChange={handleoption}
        >
          <option value="">Select Available Options</option>
          {[2, 3, 4, 5].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
 

<label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>         Padx:
        <input
          type="text"
          name="padX"
          value={formData.padX}
          onChange={handleoption}
          readOnly
        />
      </label>
     

      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>         Pady:
        <input
          type="text"
          name="padY"
          value={formData.padY}
          onChange={handleoption}
          
          readOnly
        />
      </label>
      
      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>         Text:
        <input
          type="text"
          name="text"
          value={formData.text}
          onChange={handleoption}
          readOnly
        />
      </label>
      

      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }} >         X:
        <input
          type="text"
          name="x"
          value={formData.x}
          onChange={handleoption}
          readOnly
        />
      </label>
    


      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>         Y:
        <input
          type="text"
          name="y"
          value={formData.y}
          onChange={handleoption}
          readOnly
        />
      </label>
    
      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>         Color:
        <input
          type="text"
          name="colours"
          value={formData.colours}
          onChange={handleoption}
          readOnly/>
      </label>
     


      <label>
      Duration ( in seconds ):
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
      </label>
      
      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>
        Number of Options:
        <select
          name="numOptions"
          value={numOptions}
          onChange={handleNumOptionsChange}>
          {[2, 3, 4, 5].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      

      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>         Option 1:
        <input type="text" name="optionOne" value={formData.optionOne} onChange={handleChange} />
      </label>
     
      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>         Option 2:
        <input
          type="text"
          name="optionTwo"
          value={formData.optionTwo}
          onChange={handleChange}
        />
      </label>
      
      <label style={{ display: numOptions > 2 ? 'block' : 'none' }}>
        Option 3:
        <input
          type="text"
          name="optionThree"
          value={formData.optionThree}
          onChange={handleChange}
        />
      </label>
     
      <label style={{ display: numOptions > 3 ? 'block' : 'none' }}>
        Option 4:
        <input
          type="text"
          name="optionFour"
          value={formData.optionFour}
          onChange={handleChange}
        />
      </label>
      
      <label style={{ display: numOptions > 4 ? 'block' : 'none' }}>
        Option 5:
        <input
          type="text"
          name="optionFive"
          value={formData.optionFive}
          onChange={handleChange}
        />
      </label>
     
      
      
      <label style={{ display: formData.videoType =="Advertisement" ? 'block' : 'none' }}>       Correct Option ( ENTER nil WHEN THIS OPTION ISNT NEEDED FOR THE QUESTION GIVEN):
        <input type="text" name="correctOption" value={formData.correctOption} onChange={handleChange} />
      </label>
    


      <label>
      Seconds when AD starts:
        <input type="text" name="adStartTime" value={formData.adStartTime} onChange={handleChange} />
      </label>
     

      <button type="submit" onClick={() =>{
        buttonClick = true
      }}>Upload Video</button>
      <br/>
    </form>
    
  );
}
export default UploadForm;