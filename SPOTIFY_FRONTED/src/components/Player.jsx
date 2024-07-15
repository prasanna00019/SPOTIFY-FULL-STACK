import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
const Player = () => {
  const [mutestatus, setmutestatus] = useState(false)
  const handleVolume=(track)=>{
    console.log(track)
    // track.pause();
  }
  const {track,seekbar,seekbg,playerstatus,play,pause,time,next,prev,seeksong,forw5,back5,mute,seekaudio,audioseek}=useContext(PlayerContext)
  return track? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <div className='hidden lg:flex  items-center gap-4 '>
        <img className='w-12' src={track.image} alt="" />
         <div >
          <p>{track.name}</p>
          <p>{track.desc.slice(0,15)}</p>
         </div>
      </div>
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
            <img  className='w-6 cursor-pointer' src={assets.shuffle_icon} alt="" />
            <img onClick={back5} className='w-6 cursor-pointer invert-[1]' src={assets.back5} alt="" />
            <img onClick={()=>prev()} className='w-5 cursor-pointer' src={assets.prev_icon} alt="" />
            {playerstatus? <img onClick={pause} className='w-5 cursor-pointer' src={assets.pause_icon} alt="" />:
             <img onClick={play} className='w-5 cursor-pointer' src={assets.play_icon} alt="" />}
            <img onClick={()=>next()} className='w-5 cursor-pointer' src={assets.next_icon} alt="" />
            <img onClick={forw5} className='w-6 cursor-pointer invert-[1]' src={assets.forw5} alt="" />
            <img  className='w-6 cursor-pointer' src={assets.loop_icon} alt="" />
        </div>
        <div className='flex items-center gap-5'>
              <p>{time.currenttime.minute}:{time.currenttime.second}</p>
              <div  ref={seekbg} onClick={seeksong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                 <hr ref={seekbar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
              </div>
              <p>{time.totaltime.minute}:{time.totaltime.second}</p>
        </div>
      </div>
      <div className='hidden lg:flex  items-center gap-2 opacity-75'>
         <img className='w-4' src={assets.plays_icon} alt="" />
         <img className='w-4' src={assets.mic_icon} alt="" />
         <img className='w-4' src={assets.queue_icon} alt="" />
         <img className='w-4' src={assets.speaker_icon} alt="" />
         <img onClick={()=>{mute(),setmutestatus(!mutestatus)}} className='w-4 invert-[1]' src={mutestatus?assets.volume_mute:assets.volume_icon} alt="" />
         <div onClick={seekaudio} ref={audioseek} className='w-20 cursor-pointer bg-slate-50 h-1 rounded-full'>
         <hr ref={seekbar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
         </div>
         <img className='w-4' src={assets.mini_player_icon} alt="" />
         <img className='w-4' src={assets.zoom_icon} alt="" />
      </div>
    </div>
  ):null
}

export default Player