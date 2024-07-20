import { Button, Group } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineCloudUpload } from 'react-icons/md'

const UploadImage = ({propertyDetails,setPropertyDetails,prevStep, nextStep}) => {
    const [imageURL, setImageURL] = useState(propertyDetails.image)
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    const handleNext=()=>{
        setPropertyDetails((prev)=>({...prev, image:imageURL}))
        nextStep()
    }

    useEffect(() => {
        cloudinaryRef.current=window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName:"parvej-ansari",
                uploadPreset: "v22gdkdd",
                maxFiles: 1
            },
            (err,result) => {
                if (result.event==="success") {
                    setImageURL(result.info.secure_url)
                }
            }
        )
    })
  return (
    <div className='mt-12 flexCenter flex-col'>
        {
            !imageURL ? (
                <div onClick={()=>widgetRef.current?.open()} className="flexCenter flex-col w-3/4 h-[24rem] border-dashed border-2 cursor-pointer">
                    <MdOutlineCloudUpload size={24} color='grey' />
                    <span>Upload Image</span>
                </div>
            ) : (
                <div onClick={()=>widgetRef.current?.open()} className='w-3/4 h-[22rem] rounded-xl cursor-pointer overflow-hidden'>
                    <img src={imageURL} alt="" className='h-full w-full object-cover' />
                </div>
            )}
            <Group justify="center" mt="xl">
        <Button  onClick={prevStep}> Go Back</Button>
        <Button onClick={handleNext} disabled={!imageURL}>Next step</Button>
      </Group>
    </div>
  )
}

export default UploadImage