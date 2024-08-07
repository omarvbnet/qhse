import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { EventAvailable ,Assessment } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { useRouter } from "next/navigation";
import { styled } from '@mui/material/styles';
import axios from 'axios';
import getConfig from 'next/config';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const { publicRuntimeConfig } = getConfig();
import dayjs from 'dayjs';
import e from 'cors';

const options = [
  {'type':'Fiber Site Opration',
'isPressed':false
},
{'type':'FTTH Route Opration',
'isPressed':false
},
{'type':'FDT Opration',
'isPressed':false
},
{'type':'Metro Route Opration',
'isPressed':false
},
  {'type':'FDT Handover',
'isPressed':false
},
{'type':'FDT Region',
'isPressed':false
},
  {'type':'Fiber Site Deployment',
'isPressed':false,

},
{'type':'Site Handover',
'isPressed':false
},
{'type':'Route Handover',
'isPressed':false
},
{'type':'Item Inspection',
'isPressed':false
},

{'type':'Other',
'isPressed':false
}, 
];
const typeOption = [

]
const visitsOptions = [
  'Request',
  'Random',
  'Support',
  'NCR Check',
  'Investor Handover',
  'Resettlement',
  'Home',
  'Training',
  'Office',
  'Vacation',
  'Back Office',
  'Way'
];
const requestStatus = [
  'Pending',
  'Clearance',
  'Compeleted',
  
];
const provincese = [
  'Bahgdad',
  'Kirkuk',
  'Basra',
  'Nineveh',
  'Anbar',
  'Karbala',
  'Babil',
  'Kut',
  'Nasria',
  'Missan',
  'Diwania',
  'Muthanna',
  'Diyala',
  'Najaf',
  'Sulaymanaia',
  'Erbil',
  'Dhock',
  'Salah-aldin',
  'Wasit'
];
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  }));

function ConfirmationDialogRaw(props) {
   
  const { onClose, value: valueProp, open, ...other } = props;
  const radioGroupRef = React.useRef(null);
  const [isUploaded, setIsUploaded] = React.useState(null);
  const [isValid, setIsValid,] = React.useState(null);
  let [visitCount, seVisitCount] = React.useState([]);
  const [province, setProvince] = React.useState([]);
  const [visitDate, setvisitDate] = React.useState([]);
  const [requestStatusV, setrequestStatus] = React.useState([]);
  const [visitType, setVisitType] = React.useState([]);
  const router = useRouter();
  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };
  
  async function onCheckInspection(e , i) {
    let d = Date(Date.now().toString)
    let checked = e.target.checked;
    let mapData = {
      type:e.target.value,
      siteID:'',
      province:'',
      visitType:'',
      date:''
    
    }
    visitCount.filter(function (element) {

      return element !== undefined;
      
      });
    if (checked) {
    
       options[i].isPressed = !options[i].isPressed
    
      seVisitCount([...visitCount ,mapData]);
        console.log(visitCount)
        
    }
    if (!checked) {
      options[i].isPressed = !options[i].isPressed
      
     setProvince([])
     setVisitType([])
     setvisitDate([])
     // setinspectionArray(inspectionArray.filter((ele) => ele !== e.target.value));
      seVisitCount(visitCount.filter((ele) => ele !==undefined && ele.type !== mapData.type));
 
        console.log(visitCount)
    }
  } 

  
async function handleOk() {
  var userInfo = JSON.parse(localStorage.getItem('user'))
  const currentDate = new Date().toUTCString();
  for(let i = 0; i < visitCount.length; i += 1) {
    if(visitCount[i].province !== '' && visitCount[i].siteID !=='' && visitCount[i].visitType !=='' ){
      if(visitCount[i].date == ''){
        visitCount[i].date = dayjs(Date.now()).toString()
      }
      setIsValid(true)
      axios.post(`${publicRuntimeConfig.apiUrl}/addData`, {
        province: visitCount[i].province,
        username: userInfo.firstName + " " + userInfo.lastName,
        date: visitCount[i].date,
        creationDate: currentDate,
        siteID: visitCount[i].siteID,
        visitType: visitCount[i].visitType,
        type: visitCount[i].type,
        province: visitCount[i].province,
        requestStatus:visitCount[i].requestStatus
      }).then (function (response) {
       setIsUploaded(response.data);
       console.log(isUploaded)
  
      if(response.data == 'true'){
        setInterval(function () {router.refresh();}, 2000);
        options[i].isPressed = false
      
        setProvince([])
        setVisitType([])
      }else{
        setIsValid(false)
      }
      
      })
    }
    
   
  }
 
  
    console.log('data', visitCount);

  }
  
const handleVisits = (e, data)=>{
  var mapData = {
    type: e.target.value,
    siteID:e.siteID,
    province: data.province,
    visitType:data.visitType,
    creationDate:Date.now().toString(),
    date:'',
    requestStatus:''
  }
  visitCount.filter(function (element) {

    return element !== undefined;
    
    });
  seVisitCount([...visitCount,mapData]);
    
}
const handleSiteIdTextBox = (e, i)=>{
  visitCount[i].siteID =  e.target.value;
    
}
const handleProvince = (event, i) => {
  province[i] =  event.target.value;
  visitCount[i].province =  event.target.value;
};
const  useFormik =({
  initialValues: {
      departureTime: Date.now(),
  },
  onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
  },
});
const handleVisitDate = (event, i) => {
 console.log('fffff',event.toString())
 visitCount[i].date = event.toString()
};
const handleVisitType = (event,i) => {
  visitType[i] =  event.target.value
  visitCount[i].visitType =  event.target.value;
};
const handlerequestStatus = (event,i) => {
  requestStatusV[i] =  event.target.value
  visitCount[i].requestStatus =  event.target.value;
};
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight:535 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
                {isUploaded == 'true'  ?     <Alert severity="success">Well Done!</Alert>
          :isUploaded == 'false'? <Alert severity="error">This is an error Alert.</Alert>
          
:!isValid ?<Alert severity="error">All fields are required.</Alert> : <div></div>}
      <DialogTitle>Daily Message</DialogTitle>
      <DialogContent dividers>
       
      

<div>
          {options.map((option , i) => (
            <div key = {'123'} className='dailyMassageBody'>
            <FormControlLabel
              value={option.type}
              key={option.type +1}
              control={<Checkbox value = {option.type}  onChange={ (e)=>onCheckInspection(e , i)} />}
              label={option.type}
            />
           { option.isPressed ? 
           <div className='addButton' 
           style={{
            display: 'gird',
            paddingLeft:'20px',
            width: '100%',
            paddingBottom:'10px',
            justifyContent: 'space-between',
        
           }}>
             
            {
          visitCount.map((data, i)=>(
            data !== undefined &&
           option.type === data.type ? 
             <div  key={ i} id='' className='inspectionMassageBody' style={{
              display: 'grid',
              paddingLeft:'20px',
              width: '50%',
              height:'280px',
              justifyContent: 'space-between',
          
             }}>
             <p key={i}>{i+1}</p>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
     
     <DatePicker
       label={'Visit Date'}
       value={dayjs(Date.now())}
       onChange={(date,value) => {
        handleVisitDate(dayjs(date),i);
        }}
     />
 
 </LocalizationProvider>
           <input   
           onChange={(e)=>handleSiteIdTextBox(e,i)}
           style={{
          height:'30px',
        }} type='text' placeholder='Site ID' required/>
           <Select
            style={{
              height:'30px',
            }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={province[i]}
        label={'Province'}
        onChange={(e)=>handleProvince(e,i)}
       
      >
       
      {provincese.map((prov, i1)=>
       <MenuItem key={i*100}value={prov}>{prov}</MenuItem>
      )}
      </Select>
        <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={visitType[i]}
        key={visitType.length++}
        label="Visit Type"
        style={{
          height:'30px',
          padding:'5px'
         
        }}
        onChange={(e)=> handleVisitType(e,i)}
      >
      {visitsOptions.map((visit, ip)=>
       <MenuItem key={i*200} value={visit}>{visit}</MenuItem>
      )}
      </Select>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={requestStatusV[i]}
        key={requestStatusV.length++}
        label="Visit Type"
        style={{
          height:'30px',
          padding:'5px'
         
        }}
        onChange={(e)=> handlerequestStatus(e,i)}
      >
      {requestStatus.map((type, ip)=>
       <MenuItem key={i*230} value={type}>{type}</MenuItem>
      )}
      </Select>
    
         
            </div>:<div key={100}></div>
            
          ))} <Button style={{
            height:'5px',
            paddingLeft:'5px'
           }} value={option.type}  onClick={(e)=>handleVisits(e,option)}>Add More</Button>  </div>: <div></div>}
            </div>
          ))}</div>:<div> 
                       
          
            </div>
      
   
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>

       {isUploaded == 'true'  ? <Button>Loading</Button> :<Button onClick={handleOk}>Ok</Button>}
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function AddDmsg() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');
  const [direction, setDirection] = React.useState('up');
  const [hidden, setHidden] = React.useState(false);
  const handleClickListItem = () => {
    setOpen(true);
  };
  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };
  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  const actions = [
    { icon: <Assessment />, name: 'FDT Handover' , onClick:() => handleClickListItem},
    { icon: <EventAvailable />, name: 'Daily Message', onClick:() => handleClickListItem()},
  ];
  return (
   
        <div className='addbutton' style={{
      position: 'fixed',
      top: '80%',
      right: 10,
      paddingRight:100,
      margin: 'auto',
      transform: 'translateY(-50%)',
      height: '2%',
      width: '10%',
      overflow: hidden,
      zIndex: '2',
      display: 'block',
       }}>
       <Box sx={{ 
      height:100,
      width:100,
      position: 'fixed',
      right:0,
      left:0
      }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          icon={<SpeedDialIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </StyledSpeedDial>
      </Box>
      <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </div>
    
      
       
    
  );
}