import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../Store';
import { firebase, db } from './FirebaseConfig';

const ColorPicker = () => {
  const [colorHexCode, setColorHexCode] = useState('#000000');
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    console.log('Changed hexcode');
    console.log(`
      local hexcode: ${colorHexCode}
      global hexcode: ${state.colorHexCode}
    `);
  }, [colorHexCode]);

  const writeIsDrawing = (hexCode) => {
    //Writes colorHexCode to firebase
    console.log("written")
    firebase.database().ref('board/' + state.googleObj.googleId).update({
          colorHexCode: hexCode
    });
  }

  return (
    <div>
      <div>
        Select Brush Color: &nbsp;
        <input
          type="color"
          value={colorHexCode}
          onChange={(e) => {
            dispatch({ type: 'setColorHexCode', obj: e.target.value });
            setColorHexCode(e.target.value);
            writeIsDrawing(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
