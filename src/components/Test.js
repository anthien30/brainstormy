import React,{useRef,useState,useLayoutEffect,useEffect} from 'react'
import Canvas from './Canvas'
//This was used to test the Canvas Component size
function Test() {
    const ref = useRef(null)
    const [dimensions,setDimensions] = useState({width: 0, height: 0})
    useEffect(() => {
        setDimensions({width:ref.current.clientWidth, height:ref.current.clientHeight})
    },[])
    console.log(dimensions.width)
    console.log(dimensions.height)
    return (
        <div style={{height: "500px", width: "50%", backgroundColor: "powderblue"}} ref ={ref}>
            <Canvas width={dimensions.width} height = {dimensions.height}/>
        </div>
    )
}

export default Test
