import React, { useState, useEffect, useRef, useLayoutEffect, useContext } from 'react'
import { firebase, db } from './FirebaseConfig'
/* Followed tutorial by Maksim Ivanov (thank you) https://www.youtube.com/watch?v=FLESHMJ-bI0&t=189s */

//Pass 2 props: height and width
function Canvas(props) {

    const canvasRef = useRef(null) //Create Ref object to canvas
    const contextRef = useRef(null) //Create Ref object to context
    const parentRef = useRef(null) //Create Ref object to parent component
    const [isDrawing, setIsDrawing] = useState(false)
    const [CanDraw, setCanDraw] = useState(false)
    const [buttonStr, setButtonStr] = useState("Draw")

    useEffect(() => {
        /*Adjust the height and width of the canvas here to fit the "post-it" notes
        canvas.width and canvas.height are html attributes
        style.width and style.height are css attributes
        */
        console.log("From Canvas: " + props.uid)
        console.log("Props.width: " + props.width)
        console.log("Props.height: " + props.height)
        const canvas = canvasRef.current
        canvas.width = props.width * 2
        canvas.height = props.height * 2
        canvas.style.width = `${props.width}px`
        canvas.style.height = `${props.height}px`

        const context = canvas.getContext("2d") //gets the 2d context   
        context.scale(2, 2)
        context.lineCap = "round"  //butt, round, square
        context.strokeStyle = "black" //Color of Stroke
        context.lineWidth = 10 //Line Width
        contextRef.current = context;
    }, [props.width, props.height])

    const writeData = (mouseX, mouseY, userId) => {
        firebase.database().ref('board/' + props.uid).set({
            x: mouseX,
            y: mouseY
        })
    }

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY) //Begins path at current mouse Position
        setIsDrawing(true)
    }
    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }
    const draw = ({ nativeEvent }) => {
        if (!isDrawing || !CanDraw) {
            return
        }
        const { offsetX, offsetY } = nativeEvent;
        writeData(offsetX, offsetY, "")
        console.log(`${offsetX} and ${offsetY} is written to the database by ${props.uid}`);
        contextRef.current.lineTo(offsetX, offsetY) //Moves path to current mouse Position
        contextRef.current.stroke() //Renders the Stroke
    }
    const clickHandler1 = () => {
        if (!CanDraw) {
            setCanDraw(true)
            setButtonStr("Stop Draw")
        } else {
            setCanDraw(false)
            setButtonStr("Draw")
        }
    }
    const clickHandler2 = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    console.log("Props.width: " + props.width)
    console.log("Props.height: " + props.height)
    return (
        <div>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
            <div>
                <button type="button" onClick={clickHandler1}>{buttonStr}</button>
                <div style={{ width: '50px', height: 'auto', display: "inline-block" }} />
                <button type="button" onClick={clickHandler2}>Clear</button>
            </div>
        </div>
    )
}

export default Canvas
