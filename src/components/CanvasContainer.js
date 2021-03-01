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
    console.log("From Container:" + state.canvasId)
    return (
        <div style={{height: "600px", width: "60%", backgroundColor: "powderblue"}} ref ={ref}>
            <Canvas width={dimensions.width} height = {dimensions.height} uid = {state.googleObj.googleId} canvasId = {state.canvasId}/>
        </div>
    )
}

export default CanvasContainer
