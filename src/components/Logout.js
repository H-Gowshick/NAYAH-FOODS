import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
// import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';



const ProfileLogout = () => {

    const navigate=useNavigate();

    const user = localStorage.getItem("userData");
    const Token = localStorage.getItem("userToken");
    // console.log(user);

    // const navigate = useNavigate();
    const [anchorElement, setanchorElementement] = React.useState(null);
    const open = Boolean(anchorElement);
    const handleClick = (event) => {
        setanchorElementement(event.currentTarget);
    };
    const handleClose = () => {
        setanchorElementement(null);
    };


    const logoutuser = async () => {

        const res = await fetch("http://localhost:8080/api/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Token,
                Accept: "application/json"
            },
            credentials: "include",
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 201) {
            console.log("use logout");
            localStorage.removeItem("userData");
            localStorage.removeItem("UserId");
            localStorage.removeItem("userToken");
            Swal.fire({
                icon: "success",
                title: "Logout successfully!",
                
            }).then(() => {
                // Redirect to the login page
                navigate('/');
            });            
        } else if(data.status === 401){

            console.log("error");
        }
    }

    return (
        <div>
            <Nav style={{
                display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "15px", paddingRight: "10px"
            }}>

                <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                {user && <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize", marginTop: "-50%" }} onClick={handleClick}>{user[0]}</Avatar>}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorElement={anchorElement}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', }}
                        className='mt-5'
                    >

                        <MenuItem onClick={() => {
                            logoutuser()
                            handleClose()
                        }}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Sign Out
                        </MenuItem>
                    </Menu>
                </React.Fragment>

            </Nav>
        </div>
    )
}

export default ProfileLogout;