import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios  from 'axios'
import { url } from '../App';
import { toast } from 'react-toastify';
const AddSong = () => {
    const [image, setimage] = useState(false);
    const [song, setsong] = useState(false);
    const [name, setname] = useState("");
    const [desc, setdesc] = useState("");
    const [album, setalbum] = useState("");
    const [loading, setloading] = useState(false);
    const [albumdata, setalbumdata] = useState([]);
    const logFormData = (formData) => {
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    };
    const onSubmitHandler=async(e)=>{
         e.preventDefault();
         setloading(true);
         try {
             const formdata= new FormData();
             formdata.append('name',name);
             formdata.append('desc',desc);
             formdata.append('image',image);
             formdata.append('audio',song);
             formdata.append('album',album);
             logFormData(formdata)
             const response =await axios.post(`${url}/api/song/add`,formdata);
             if(response.data.success){
                toast.success("SONG ADDED")
                setname("");
                setdesc("")
                setalbum("")
                setimage(false)
                setsong(false)
             }
             else{
                toast.error("SOMETHING WENT WRONG!!!")
                
             }
         } catch (error) {
            toast.error("ERROR OCCURED !!! ")
            console.log(error);
         }
         setloading(false)
    }
    const loadalbumdata=async()=>{
        try {
            const response=await axios.get(`${url}/api/album/list`)
            if(response.data.success){
                setalbumdata(response.data.albums)
            }
            else{
                toast.error("UNABLE TO LOAD ALBUMS!!!")
            }
        } catch (error) {
            toast.error("ERRRO OCCURED !!!")
        }
    }
    useEffect(() => {
     loadalbumdata();
    }, [])
    
  return loading? <div className='grid place-items-center min-h-[80vh]'>
   <div className='w-16 h-16 place-self-center border-4 border-gray-300 border-t-green-800 rounded-full animate-spin'>

   </div>
  </div> : (
  <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8  text-gray-700'>
      <div className='flex gap-8'>
       <div className='flex flex-col gap-4'>
          <p>Upload Song</p>
          <input onChange={(e)=>setsong(e.target.files[0])}  type="file" id='song' accept='audio/*' hidden />
          <label htmlFor="song">
            <img src={song? assets.upload_added: assets.upload_song} className='w-24 cursor-pointer' alt="" />
          </label>
       </div>
       <div className='flex flex-col gap-4 '>
        <p className>Upload Image</p>
        <input onChange={(e)=>setimage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
        <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} className='w-24 cursor-pointer' alt="" />
        </label>
       </div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song Name</p>
        <input onChange={(e)=>setname(e.target.value)} value={name} type="text" className='bg-transparent outline-green-600 border-4 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required/>
      </div>
      <div onChange={(e)=>setdesc(e.target.value)} value={desc} className='flex flex-col gap-2.5'>
        <p>Song Description</p>
        <input type="text" className='bg-transparent outline-green-600 border-4 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required/>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select onClick={(e)=>{setalbum(e.target.value) , console.log(e.target.value)}} defaultValue={album} className='bg-transparent outline-green-400 border-2 border-gray-400 p-2.5 w-[150px]'>
          {
            albumdata.map((item,index)=>(
                <option key={index} value={item.name}>{item.name}</option>
                
            ))
          }
        </select>
      </div>
      <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
  </form>
  )
}

export default AddSong