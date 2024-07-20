import React, { useContext } from 'react'
import { Avatar, Menu } from "@mantine/core"
import { useNavigate } from 'react-router'
// import UserDetailContext from '../context/userDetailContext'

const ProfileMenu = ({user,logout}) => {
  const navigate = useNavigate()
  return (
    <Menu>
        <Menu.Target>
            <Avatar src={user?.picture} alt='userImage' radius={'xl'} />
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Item>Application</Menu.Item>
            <Menu.Item onClick={()=>navigate("./favourites",{replace:true})}>Favourites</Menu.Item>
            <Menu.Item onClick={()=>navigate("./bookings",{replace:true})}>Booking</Menu.Item>
            <Menu.Label>go back</Menu.Label>
            <Menu.Item onClick={()=> {localStorage.clear();logout(); }} color='red'>Logout</Menu.Item>
        </Menu.Dropdown>
    </Menu>
  )
}

export default ProfileMenu