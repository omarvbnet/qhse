import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios'
import AddDmsg from './dailog';
import MUIDataTable from 'mui-datatables';
import Link from 'next/link';
import { userService } from 'services';
export default Home;
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function Home() {
    return (
        <div>
            
                <DataTable/>
               
            
        </div>
    );
}
let columns = [
  { 
  name: 'id', 
  lable: 'ID',
  options: {
  filtter:false,
  sort:true,
  }
 },
 { 
  name: 'Inspector_Name', 
  lable: 'Inspector_Name',
  options: {
  filtter:true,
  sort:true,
  }
 },
 { 
  name: 'province', 
  lable: 'Province',
  options: {
  filtter:true,
  sort:true,
  }
 },
 { 
  name: 'site_id', 
  lable: 'Site ID',
  options: {
  filtter:true,
  sort:true,
  display : true,
  }
 },
 { 
  name: 'visit_type', 
  lable: 'Visit Type',
  options: {
  filtter:true,
  sort:true,
  }
 },
 { 
  name: 'visit_date', 
  lable: 'Inspection Date',
  options: {
  filtter:true,
  sort:true,
  }
 },
 { 
  name: 'request_status', 
  lable: 'request_status',
  options: {
  filtter:true,
  sort:true,
  }
 },
 { 
  name: 'added_date', 
  lable: 'Added Date',
  options: {
  filtter:true,
  sort:true,
  }
 },
 
 { 
  name: 'inspection_type', 
  lable: 'inspection_type',
  options: {
  filtter:true,
  sort:true,
  }
 },
  
  
];

 function DataTable() {
  const [direction, setDirection] = React.useState('up');
  const [hidden, setHidden] = React.useState(false);
  const [data, setData] = React.useState([])
  const fileName = "QHSE_TEAM_ACTIVITIES"; // here enter filename for your excel file

  React.useEffect(() => {
    const fetchData = () =>{
     axios.get(`${publicRuntimeConfig.apiUrl}/getData`).then(postData => {
setData(postData.data)     // reshaping the array
    console.log(postData.data)
     })
    }
    fetchData()
  }, [])

 
 const options = {
  filter:true,
  sorting:true,
  print:true,
  download:true,
  fixedHeader:true,
  caseSensitive:false,
  selectableRows:true,
  customSearch:false,

  responsive:'simple'
 }
  
  return (
    <div
    style={{
   
      }}
    >
    <Box  sx={{ flexGrow: 2, width:'100%%',padding:'10px', fontSize:'5px'

  }}>
   
    
     <div style={{
  paddingTop:'20px',
  paddingRight:'50px',
  paddingLeft:'50px',
  fontSize:'5px'
     }}>
     <MUIDataTable
     title={'Daily Log'}
        data={data}
        columns={columns}
       options={options}
      sx={{
        fontSize:'5px'
      }}
       
      />
    </div>
      
    </Box>
   
    <AddDmsg/>
    </div>
  );
}