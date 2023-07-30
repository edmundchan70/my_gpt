import  { useEffect } from 'react'
 
 
import { useNavigate } from 'react-router-dom'
 
 
 
 
import Navbar from '../../comp/Navbar'
 
import { getAccessToken } from '../../util/getToken/getToken'
import Header from '../../comp/Header'


type Props = {}

function Home({ }: Props) {
  const nav = useNavigate()
try{
  useEffect(() => {
    if (!getAccessToken())
      nav('/Login');
  }, [])
 
  return (
    <>

           <Header />
           <Navbar />
     
    </>



  )}
  catch(err:any){
    alert(err);
     nav("/login")
     return(<></>)
  }
}

export default Home