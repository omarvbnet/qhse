import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';
import axios from 'axios';
import { ExportToExcel } from 'components/ExportToExcel';
export { Nav };

function Nav() {
    const [user, setUser] = useState(null);
    const [data, setData] = useState([])
    const fileName = "QHSE_TEAM_ACTIVITIES";
    useEffect(() => {
        axios.get('http://localhost:3000/api/getData').then(postData => {
            const customHeadings = postData.data.map(item=>({
                "ID": item.id,
                "Inspector Name":item.username,
                "site_id":item.site_id,
                "inspection_type":item.inspection_type,
                'Visit Date':item.visit_date,
                "Province": item.province,
                "added_date":item.added_date,
                "location":item.location,
               
              }))
         
               setData(customHeadings) 
            })
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
            
    }, []);

    // only show nav when logged in
    if (!user) return null;
    var userInfo = JSON.parse(localStorage.getItem('user'))
    console.log(userInfo)
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="#" className="nav-item nav-link">{userInfo.firstName}</NavLink>
                {userInfo.username == 'admin' ?<NavLink href="/users" className="nav-item nav-link">Users Management</NavLink>: <div></div>}
                <ExportToExcel apiData={data} fileName={fileName} />
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}