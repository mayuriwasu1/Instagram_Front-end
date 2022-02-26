import React from "react";
import "./Pro.css";
import "./UploadPopup"
import "./secNav.css"
import { BsFillChatFill } from 'react-icons/bs';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BiBadge } from "react-icons/bi"
import { FaRegBookmark } from 'react-icons/fa';
import { BiGrid } from "react-icons/bi";
import { BiUserPin } from "react-icons/bi";
import { BiBookAlt } from "react-icons/bi";
import axios from 'axios'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

//popup
import  { useState,useEffect,useRef } from 'react';
import  Popup from './PopUp';
//import UploadPop from "./UploadPopup";

import styled from 'styled-components';


const Button = styled.button`
border: none;
background-color: transparent;

`;
export const ProfileFinal = () => {
    
  const [isOpenFallowing, setIsOpenFallowing] = useState(false);
  const [isOpenFallower, setIsOpenFallower] = useState(false);
  const [loading,setloading]=useState(true)
  const [userPost,setuserPost]=useState()
   const ref=useRef()
  const toggleFollowers = () => {
    setIsOpenFallower(!isOpenFallower);
  }
  let user_id=localStorage.getItem('user_id')
  const [data,setdata]=useState()
  useEffect(()=>{
      getData()
      getPost()
      timeout()
  },[])
  
     const getData=()=>{
      axios.get(`http://localhost:5000/user/${user_id}`).then(({data})=>{
        setdata(data)
       
      }) 
     }
     var user_post=[]
  const getPost=()=>{
    axios.get('http://localhost:5000/post').then(({data})=>{
         for(let i=0;i<data.length;i++){
               if(data[i].user_id._id===user_id){
                user_post.push(data[i])
               }
         }
        //  setuserPost(user_post)
        console.log(user_post) 
        ref.current={user_post}
        console.log("use",ref.current)   
    }) 
  }

  // if(i==2){
  //   setloading(false)
  // }
  const timeout=()=>{
   setTimeout(()=>{
      setloading(false)
   },2000)
  }


  const toggleFollowing = () => {
    setIsOpenFallowing(!isOpenFallowing);
  } 
  return loading? <Box sx={{ width: '100%' }}>
  <LinearProgress />
</Box>: (
    <div>
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img style={{width:"150px",height:"150px",borderRadius:"80px"}}
                src={data.profile_pic}
                alt=""
               
              />
            </div>

            <div className="profile-user-settings">
              <h1 className="profile-user-name">{data.username}</h1>

              <button className="btn profile-edit-btn">Edit Profile</button>

              <button
                className="btn profile-settings-btn"
                aria-label="profile settings"
                id= "Settings"
              >
               <BiBadge />
              </button>
            </div>

            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count"> {ref.current.user_post.length}</span> posts 
                </li>
                <li>
                <Button  onClick={toggleFollowers} ><span className="profile-stat-count">{data.follower.length}</span> followers  </Button>
                </li>

                
   
   {isOpenFallower && <Popup
     content={<>
       <h3 style={{textAlign: "center"}}>Followers</h3>
       <hr color="	#DCDCDC"/>
     {data.follower.map(e=>(
       <div style={{display:"flex" ,justifyContent:"space-between" , margin:"1.3rem 0"}}>
       <div>
           <img style={{width:"40px",height:"40px",borderRadius:"80px"}} src={e.profile_pic} alt=""/> 
          
       </div>
       <div>
       <p>{e.username}</p>
       </div>
       <div>
           <button class="fallowBtn">Fallow</button>
       </div>
   </div>
     ))}
     
     </>}
     handleClose={toggleFollowers}
   />}

                <li>
                <Button  onClick={toggleFollowing} > <span className="profile-stat-count">{data.following.length}</span> following </Button>
                </li>
   {isOpenFallowing && <Popup
     content={<>
       <h3 style={{textAlign: "center"}}>Following</h3>
       <hr color="	#DCDCDC"/>
    {data.following.map(e=>(
        <div style={{display:"flex" ,justifyContent:"space-between" , margin:"1.3rem 0"}}>
        <div>
            <img style={{width:"40px",height:"40px",borderRadius:"80px"}} src={e.profile_pic} alt=""/> 
           
        </div>
        <div>
        <p>{e.username}</p>
        </div>
        <div>
            <button class="fallowBtn">Fallowing</button>
        </div>
    </div>
    ))}
     
     </>}
     handleClose={toggleFollowing}
   />}
 
              </ul>
            </div>

            <div className="profile-bio">
              <p>
                <span className="profile-real-name">{data.name}</span> 
                <br />
                Life on weels 📷✈️🏕️
              </p>
            </div>
          </div>
        </div>
      </header>
      
<hr width="67%" color="	#DCDCDC"/>
      <div>

      <nav className="navigation-bar">
  <ul className="nav-item">
    <li className="item">
        {/* <BsFillGrid3X3GapFill />   */}
        <BiGrid />     POSTS
       
    </li>
    <li className="item">
    <FaRegBookmark />    SAVED
    </li>
    <li className="item" >
       <BiUserPin />     TAGGED
    </li>
  </ul>
</nav>
      </div>

      <main>
        <div className="container">
          <div className="gallery">

          {ref.current.user_post.map(e=>(
            <div className="gallery-item" tabindex="0">
            <img
              src={e.picture}
              className="gallery-image"
              alt=""
            />

            <div className="gallery-item-info">
              <ul>
                <li className="gallery-item-likes">
                  <span className="visually-hidden">Likes:</span>
                  <BsFillSuitHeartFill /> {e.likes.length}
                </li>
                <li className="gallery-item-comments">
                  <span className="visually-hidden">Comments:</span>
                    <BsFillChatFill /> {e.comment.length}
                </li>
              </ul>
            </div>
          </div>
          ))}
</div>
        </div>
      </main>
    </div>
  );
};

export default ProfileFinal;