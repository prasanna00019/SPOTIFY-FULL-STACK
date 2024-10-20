import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { url } from '../App'
import { toast } from 'react-toastify'

const AddAlbum = () => {
  const [image, setimage] = useState(false)
  const [color, setcolor] = useState('#121212')
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("")
  const [loading, setloading] = useState(false)
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    setloading(true);
    try {
      const formData=new FormData();
      formData.append('name',name);
      formData.append('desc',desc);
      formData.append('image',image);
      formData.append('bgColor',color);
      const response= await axios.post(`${url}/api/album/add`,formData);
      if(response.data.success){
        toast.success("ALBUM ADDED !!! ");
        setdesc("");
        setimage(false);
        setname("");
      }
      else{
        toast.error("SOMETHING WENT WRONG !!!");
      }
    } catch (error) {
      toast.error("ERROR OCCURED !!! ");
    }
    setloading(false);
  }
    return loading?(<div className='grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-300 border-t-green-800 rounded-full animate-spin'>
   
      </div>
     </div>): (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
     <div className='flex flex-col gap-4'>
        <p>Upload Image</p>
       <input onChange={(e)=>setimage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
       <label htmlFor="image">
        <img className='w-24 cursor-pointer' src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
       </label>
     </div>
     <div className='flex flex-col gap-2.5'>
       <p>Album Name</p>
       <input onChange={(e)=>setname(e.target.value)} value={name} type="text" placeholder='Type Here' className='bg-transparent outline-green-600 border-4 border-gray-500 p-2.5 w-[max(40vw,250px)]' name="" id="" />
     </div>
     <div className='flex flex-col gap-2.5'>
       <p>Album Description</p>
       <input onChange={(e)=>setdesc(e.target.value)} value={desc} type="text" placeholder='Type Here' className='bg-transparent outline-green-600 border-4 border-gray-500 p-2.5 w-[max(40vw,250px)]' name="" id="" />
     </div>
     <div className='flex flex-col gap-3'>
      <p>Background Color</p>
      <input onChange={(e)=>setcolor(e.target.value)} value={color} type="color" />
     </div>
     <button type='submit' className='text-base  bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  )
}

export default AddAlbum