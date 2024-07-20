import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import  {MdAddHome, MdHomeWork, MdPermContactCalendar} from "react-icons/md"
import  {RiCheckboxMultipleBlankFill} from "react-icons/ri"
import AddPropertyModal from './AddPropertyModal'
import useAuthCheck from '../hooks/useAuthCheck'

const Navbar = ({containerStyles}) => {
    const [modalOpened, setModalOpened] = useState(false)
    const {validateLogin} = useAuthCheck()
    const handleAddPropertyClick = () => {
        if(validateLogin()){
            setModalOpened(true)
        }
    }
  return (
    <nav className={`${containerStyles}`}>
        <NavLink to={"/"}className={({isActive})=> isActive ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1":"flexCenter gap-x-1 rounded-full  px-2 py-1"}>
            <MdHomeWork />
            <div>Home</div>
        </NavLink>
        <NavLink to={"/listing"} 
        className={({isActive})=> isActive ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1":"flexCenter gap-x-1 rounded-full  px-2 py-1"}
        >
            <RiCheckboxMultipleBlankFill />
            <div>Listing</div>
        </NavLink>
        <NavLink to={"mailto:inquiries.parvejansari8417000@gmail.com"} className={"flexCenter gap-x-1 rounded-full  px-2 py-1 cursor-pointer"}>
            <MdPermContactCalendar />
            <div>Contact</div>
        </NavLink>
        <div onClick={handleAddPropertyClick} to={"/addproperty"} 
        className={"flexCenter gap-x-1 rounded-full  px-2 py-1 cursor-pointer"}
        >
            <MdAddHome />
            <div>Add Property</div>
        </div>
        <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
       
    </nav>
  )
}

export default Navbar