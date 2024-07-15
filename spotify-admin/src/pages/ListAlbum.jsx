import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const[data,setdata]=useState([]);
  // const[name,setname]=useState('');
  const fetchalbums=async()=>{
    try {
      const response =await axios.get(`${url}/api/album/list`);
       if(response.data.success){
        setdata(response.data.albums);
       }
    } catch (error) {
      toast.error("ERROR OCCURED !!! ")
    }
  }
  const RemoveAlbum=async(id)=>{
    try {
       const response=await axios.post(`${url}/api/album/remove`,{id});
       if(response.data.success){
        toast.success(response.data.message);
        await fetchalbums();
       }
    } catch (error) {
      toast.error("ERROR OCCURED !!! ")
    }
  }
  const updateColor = async (id, color) => {
    try {
      const response = await axios.post(`${url}/api/album/updateAlbum`, { id, bgColor: color });
      if (response.data.success) {
        toast.success("Color updated successfully!");
        await fetchalbums();
      }
    } catch (error) {
      toast.error("ERROR OCCURED 11 ");
    }
  };
  useEffect(() => {
    fetchalbums();
  }, [])
  
  return (
    <div>
        <p>All Albums List</p>
        <br />
        <div>
          <div className='sm:grid hidden grid-cols-[0.5fr_0.5fr_2fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
             <b>Image</b>
             <b>Name</b>
             <b>Description</b>
             <b>Album Color</b>
             <b>Action</b>
          </div>
          {data.map((item,index)=>{
            return (
              <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_0.5fr_2fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                <img src={item.image} className='w-12' alt="" />
                 <p>{item.name}</p>
                 <p>{item.desc}</p>
                 <input type="color" value={item.bgColor} 
                  onChange={(e) => updateColor(item._id, e.target.value)} />
                 <p  onClick={()=>
                  {if (window.confirm('Are you sure you want to delete this album?')) {
                  RemoveAlbum(item._id)}}} className='cursor-pointer'>X </p>
               
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default ListAlbum