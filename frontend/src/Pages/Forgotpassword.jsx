import React, {  useState } from 'react'
import { IoEyeOff ,IoEye } from 'react-icons/io5'
import ClipLoader from 'react-spinners/ClipLoader'
import { serverUrl } from '../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Forgotpassword() {

    const [step, setstep] = useState(1)
    const [inputClicked, setinputClicked] = useState({
        email: false,
        otp: false,
        password: false,
        cpassword:false
    })
    const [formdata, setformdata] = useState({
        email: "",
        otp: "",
        password: "",
        cpassword:""
    })
    const [isloading, setisloading] = useState(false)
  const [showpassword, setshowpassword] = useState(false)
  const [error, seterror] = useState("")
  const navigate=useNavigate()
    
  const handlestep1 = async () => {
    setisloading(true)
    seterror("")
    try {
      const email = formdata.email
      if (!email) {
         seterror("Please Enter Email")
        setisloading(false)
        return
      }
        const response = await axios.post(`${serverUrl}/api/auth/sendotp`, formdata)
        console.log(response.data)
        setstep(2)
        setisloading(false)
      } catch (error) {
        console.log(error)
        seterror(error.response?.data?.message)
        setisloading(false)
      }
    }
  const handlestep2 = async () => {
    setisloading(true)
    seterror("")
    try {
      const otp = formdata.otp
      if (!otp) {
        seterror("Please Enter OTP")
        setisloading(false)
        return
      }
        const response = await axios.post(`${serverUrl}/api/auth/verifyotp`, formdata)
        console.log(response.data)
        setisloading(false)
        setstep(3)
      } catch (error) {
        console.log(error)
        seterror(error.response?.data?.message)
        setisloading(false)
      }
    }
  
  const handlestep3 = async () => {
    setisloading(true)
    seterror("")
     try {
       const npassword = formdata.password
       const cpassword = formdata.cpassword
       if (!npassword || !cpassword) {
         seterror("Please enter and confirm your new password")
         setisloading(false)
         return
       }
       if (npassword !== cpassword) {
         console.log("password does not match")
         seterror("password does not match")
         setisloading(false)
         return
       }
       const response = await axios.post(`${serverUrl}/api/auth/resetpassword`, formdata)
       console.log(response.data)
       if (response?.data?.message === "Password reset Successfully") {
      navigate("/signin");
    }
       setisloading(false)
      
      } catch (error) {
       console.log(error)
       seterror(error.response?.data?.message)
        setisloading(false)
      }
    }
  
    const handlechange = (e) => {
        setformdata({...formdata,[e.target.name]:e.target.value})
    }





  return (
   <div className='w-full h-screen bg-gradient-to-b from-black to-gray-950 flex flex-col justify-center items-center'>
          {step == 1 &&
              <div className='w-[90%] lg:max-w-[500px] h-[500px] bg-white rounded-3xl flex flex-col justify-center items-center border-2 border-[#1a1f23]'>
             <h2 className='font-semibold text-[30px]'>Forgot Password</h2>
             
               <div className='relative flex items-center justify-start w-[90%] h-[50px] mt-[30px] rounded-2xl border-2 border-black'onClick={()=>setinputClicked({...inputClicked,email:true})} >
            <label htmlFor='email' className={`text-gray-900 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email?"top-[-15px]":''}  `}>Enter Email</label>
            <input type='email' id='email' name='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
            onChange={handlechange} value={formdata.email}
            />
            
            
          </div>
          {error && <p style={{color:"red"}}>{error}</p>}
                  <button onClick={handlestep1} disabled={isloading} className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] mt-[20px] cursor-pointer rounded-2xl'>
            {isloading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>
        </div>}
          

           {step == 2 &&
              <div className='w-[90%] lg:max-w-[500px] h-[500px] bg-white rounded-3xl flex flex-col justify-center items-center border-2 border-[#1a1f23]'>
             <h2 className='font-semibold text-[30px]'>Forgot Password</h2>
             
               <div className='relative flex items-center justify-start w-[90%] h-[50px] mt-[30px] rounded-2xl border-2 border-black'onClick={()=>setinputClicked({...inputClicked,otp:true})} >
            <label htmlFor='otp' className={`text-gray-900 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.otp?"top-[-15px]":''}  `}>Enter OTP</label>
            <input type='text' id='otp' name='otp' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
            onChange={handlechange} value={formdata.otp}
            />
            
            
          </div>
          {error && <p style={{color:"red"}}>{error}</p>}
                  <button onClick={handlestep2} disabled={isloading} className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] mt-[20px] cursor-pointer rounded-2xl'>
            {isloading ? <ClipLoader size={30} color="white" /> : "Submit"}
          </button>
          </div>}
          
 
          {step == 3 &&
              <div className='w-[90%] lg:max-w-[500px] h-[500px] bg-white rounded-3xl flex flex-col justify-center items-center border-2 border-[#1a1f23]'>
             <h2 className='font-semibold text-[30px]'>Reset Password</h2>
             
                <div className='relative flex items-center justify-start w-[90%] h-[50px] mt-[30px] rounded-2xl  border-2 border-black'onClick={()=>setinputClicked({...inputClicked,password:true})} >
                           <label htmlFor='password' className={`text-gray-900 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.password?"top-[-15px]":''}  `}>Enter New Password</label>
                           <input type={showpassword ? 'text' : 'password'} id='password' name='password' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
                           onChange={handlechange} value={formdata.password}
                           />
                           {!showpassword ? <IoEye onClick={() => setshowpassword(true)} className='cursor-pointer absolute right-[20px] w-[25px] h-[25px]' />
                             :<IoEyeOff onClick={()=>setshowpassword(false)} className='cursor-pointer right-[20px] w-[25px] h-[25px] absolute'/>
                                     }
                  </div>
                  
                   <div className='relative flex items-center justify-start w-[90%] h-[50px] mt-[30px] rounded-2xl  border-2 border-black'onClick={()=>setinputClicked({...inputClicked,cpassword:true})} >
                              <label htmlFor='cpassword' className={`text-gray-900 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.cpassword?"top-[-15px]":''}  `}>Confirm New Password</label>
                              <input type={showpassword ? 'text' : 'password'} id='cpassword' name='cpassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required
                              onChange={handlechange} value={formdata.cpassword}
                              />
                              {!showpassword ? <IoEye onClick={() => setshowpassword(true)} className='cursor-pointer absolute right-[20px] w-[25px] h-[25px]' />
                                :<IoEyeOff onClick={()=>setshowpassword(false)} className='cursor-pointer right-[20px] w-[25px] h-[25px] absolute'/>
                                        }
          </div>
          {error && <p style={{color:"red"}}>{error}</p>}
                  <button onClick={handlestep3}  disabled={isloading} className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] mt-[20px] cursor-pointer rounded-2xl'>
            {isloading ? <ClipLoader size={30} color="white" /> : "Reset Password"}
          </button>
        </div>}
      
      </div>
             
  )
}

export default Forgotpassword
