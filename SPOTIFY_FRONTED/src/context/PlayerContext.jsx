import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
export const PlayerContext = createContext();
const PlayerContextProvider = (props) => {
  const audioref = useRef();
  const seekbg = useRef();
  const audioseek=useRef();
  const seekbar = useRef();
  const  url='https://spotify-frontend-ldf0.onrender.com';
  const [songsData,setsongsdata]=useState([]);
  const[albumsData,setalbumsdata]=useState([]);
  const [track, settrack] = useState(songsData[0]);
  const [playerstatus, setplayerstatus] = useState(false);
  const [time, settime] = useState({
    currenttime: {
      second: 0, minute: 0
    }, totaltime: {
      second: 0, minute: 0
    }
  })
  const play=()=>{
    audioref.current.play();
    setplayerstatus(true);

  }
  const mute=()=>{
    audioref.current.muted=audioref.current.muted?false:true;

    // console.log(audioref)
    // setplayerstatus(false);
  }
  const pause=()=>{
    audioref.current.pause();
    setplayerstatus(false);
  }
  const playwithId=async(id)=>{
   await songsData.map((item)=>{
    if(id===item._id){
      settrack(item);
    }
   })
   await audioref.current.play()
   setplayerstatus(true)
  }
  const prev=async()=>{
  songsData.map(async(item,index)=>{
    if(track._id===item._id && index>0 ){
      await settrack(songsData[index-1]);
      await audioref.current.play();
      setplayerstatus(true);
    }
  })
  }
  const next=async()=>{
    songsData.map(async(item,index)=>{
      if(track._id===item._id && index<songsData.length ){
        await settrack(songsData[index+1]);
        await audioref.current.play();
        setplayerstatus(true);
      }
    })
  }
  const forw5=async()=>{
    songsData.map(async(item,index)=>{
     audioref.current.currentTime+=5;

    })
  };
  const back5=async()=>{
    songsData.map(async(item,index)=>{
     audioref.current.currentTime-=5;

    })
  };
  const seeksong=async(e)=>{
    // console.log(e)
      audioref.current.currentTime=((e.nativeEvent.offsetX/seekbg.current.offsetWidth)*audioref.current.duration)
  }
  const seekaudio=async(e)=>{
    const newVolume = (e.nativeEvent.offsetX / seekbg.current.offsetWidth);
  console.log('New Volume:', newVolume); // Debug log
  audioseek.current.style.width=(newVolume)*100+"%"
  audioref.current.volume = newVolume;
  console.log('Audio Element Volume:', audioref.current.volume); // Debug log
  }
  const getsongsdata=async()=>{
    try {
      const response=await axios.get(`${url}/api/song/list`);
      setsongsdata(response.data.songs)
      settrack(response.data.songs[0])
    } catch (error) {
      
    }
  }
  const getalbumsdata=async()=>{
    try {
      const response=await axios.get(`${url}/api/album/list`);
      setalbumsdata(response.data.albums)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    setTimeout(() => {
      audioref.current.ontimeupdate=()=>{
        seekbar.current.style.width=(Math.floor(audioref.current.currentTime/audioref.current.duration*100))+"%"
        settime(
          {
            currenttime: {
              second: Math.floor(audioref.current.currentTime%60), minute:  Math.floor(audioref.current.currentTime/60)
            }, totaltime: {
              second: Math.floor(audioref.current.duration%60), minute:  Math.floor(audioref.current.duration/60)
            }
          } 
        )
      }
    }, 1000);
  }, [audioref])
  useEffect(() => {
  getsongsdata();getalbumsdata();
  }, [])
  
  const contextvalue = {
    audioref, seekbar, seekbg
    ,track,settrack,playerstatus,setplayerstatus,time,settime,play,pause,playwithId,next,prev,seeksong,
    songsData,albumsData,forw5,back5,mute,seekaudio,audioseek
  };
 
  return (
    <PlayerContext.Provider value={contextvalue}>
      {props.children}
    </PlayerContext.Provider>
  );
}
export default PlayerContextProvider
