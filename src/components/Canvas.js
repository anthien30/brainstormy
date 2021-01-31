import React,{useState, useEffect, useRef} from 'react'
/* Followed tutorial by Maksim Ivanov (thank you) https://www.youtube.com/watch?v=FLESHMJ-bI0&t=189s */
function Canvas() {

    const canvasRef = useRef(null) //Create Ref object to canvas
    const contextRef = useRef(null) //Create Ref object to context
    const [isDrawing,setIsDrawing] = useState(false) 

    useEffect(() => {
        /*Adjust the height and width of the canvas here to fit the "post-it" notes
        canvas.width and canvas.height are html attributes
        style.width and style.height are css attributes
        */
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        const context = canvas.getContext("2d")
        context.scale(2,2)
        context.lineCap = "round"  //butt, round, square
        context.strokeStyle = "black" //Color of Stroke
        context.lineWidth = 10 //Line Width
        contextRef.current = context;
    }, [])

    const startDrawing = ({nativeEvent}) => {
        const {offsetX,offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX,offsetY)
        setIsDrawing(true)
    }
    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }
    const draw = ({nativeEvent})  => {
        if(!isDrawing){
            return
        }
        const {offsetX,offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX,offsetY)
        contextRef.current.stroke()
    }
    return (
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
    )
}

export default Canvas
