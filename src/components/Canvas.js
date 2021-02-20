import { render } from '@testing-library/react'
import React, { useState, useEffect, useRef, useLayoutEffect, useContext } from 'react'
import { firebase, db } from './FirebaseConfig'

/* Followed tutorial by Maksim Ivanov (thank you) https://www.youtube.com/watch?v=FLESHMJ-bI0&t=189s */

//Pass 2 props: height and width
function Canvas(props) {

    const canvasRef = useRef(null) //Create Ref object to canvas
    const contextRef = useRef(null) //Create Ref object to context
    const parentRef = useRef(null) //Create Ref object to parent component
    const [isDrawing, setIsDrawing] = useState(false) //isDrawing State
    const [CanDraw, setCanDraw] = useState(false)
    const [buttonStr, setButtonStr] = useState("Draw")
    const [someoneIsDrawing, setSomeoneIsDrawing] = useState(false)
    const [timer,setTimer] = useState(5)
    const [prevMouseX,setPrevMouseX] = useState(0);
    const [prevMouseY, setPrevMouseY] = useState(0);

    useEffect(() => {
        //Sets up the canvas
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

        // Firebase On Event
        firebase.database().ref('board/').on('value', (snapshot) => {
            if (snapshot.exists()) {
                let b = false;
                snapshot.forEach((child) => {
                    if(child.val().isDrawing){
                        b = true;
                        if(child.key == props.uid){
                            return;
                        }
                        contextRef.current.beginPath();
                        contextRef.current.moveTo(child.val().x1,child.val().y1);
                        contextRef.current.lineTo(child.val().x2,child.val().y2);
                        contextRef.current.stroke();
                        contextRef.current.closePath();
                    }
                  });
                  if(b){
                      setSomeoneIsDrawing(true);
                  }else{
                      setSomeoneIsDrawing(false);
                     
                  }
            }
            else {
                console.log("No data available");
            }
        })
    }, [props.width, props.height])



    const writeCoordinates = async (mouseX, mouseY, prevMouseX, prevMouseY) => { //Writes data to firebase
        if(!isDrawing){
            firebase.database().ref('board/' + props.uid).update({
                x1: mouseX,
                y1: mouseY,
                x2: mouseX,
                y2: mouseY
            })
        }else{
            firebase.database().ref('board/' + props.uid).update({
                x1: prevMouseX,
                y1: prevMouseY,
                x2: mouseX,
                y2: mouseY
            })
        }
    }
    const writeIsDrawing = (b) => { //Writes data to firebase
        firebase.database().ref('board/' + props.uid).update({
            isDrawing: b
        }, (error) => {
            if (error) {
                console.log("writeNotDrawing Failed");
            }
        })
    }
    const startDrawing = async ({ nativeEvent }) => {
        if(!CanDraw){
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY); //Begins path at current mouse Position
        await writeCoordinates(offsetX,offsetY,0,0);
        setPrevMouseX(offsetX);
        setPrevMouseY(offsetY);
        setIsDrawing(true);
        writeIsDrawing(true);
    }
    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
        writeIsDrawing(false);
    }


    const draw = async ({ nativeEvent }) => {
        if (!isDrawing || !CanDraw) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        await writeCoordinates(offsetX, offsetY,prevMouseX,prevMouseY);

        setPrevMouseX(offsetX);
        setPrevMouseY(offsetY);

        contextRef.current.lineTo(offsetX, offsetY); //Moves path to current mouse Position
        contextRef.current.stroke(); //Renders the Stroke
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
            <div>
                {someoneIsDrawing ? "Someone is Drawing" : "No one is Drawing"}
            </div>
        </div>
    )
}

export default Canvas
