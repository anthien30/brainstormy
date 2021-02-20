import React,{useRef,useState,useLayoutEffect,useEffect,useContext} from 'react'
import Canvas from './Canvas'
import { googleAuthProvider } from './FirebaseConfig'
import {Context} from '../Store'
//This was used to test the Canvas Component size
function CanvasContainer() {
    const ref = useRef(null)
    const [dimensions,setDimensions] = useState({width: 0, height: 0})
    const [state,dispatch] = useContext(Context)
    useEffect(() => {
        setDimensions({width:ref.current.clientWidth, height:ref.current.clientHeight})
    },[])
    return (
        <div style={{height: "500px", width: "50%", backgroundColor: "powderblue"}} ref ={ref}>
            <Canvas width={dimensions.width} height = {dimensions.height} uid = {state.googleObj.googleId}/>
        </div>
    )
}

export default CanvasContainer
