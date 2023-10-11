import React from "react";
import { useState, useEffect } from 'react';


const Banned = ({ bannedCharacteristics, setBannedCharacteristics}) => {
    const unbanCharacteristic = (type, characteristic) => {
        // function to remove a characteristic from banned characteristics
        setBannedCharacteristics(bannedCharacteristics => bannedCharacteristics.filter(bannedChar => bannedChar[0] !== type && bannedChar[1] !== characteristic));
    };
    

    return (
        <div className="banned-container">
            {bannedCharacteristics && bannedCharacteristics.length > 0 ? (
                bannedCharacteristics.map((characteristic, index) => (
                <li>
                    <button
                    type="button"
                    className="button characteristic banned-characteristic"
                    onClick={() => unbanCharacteristic(characteristic[0], characteristic[1])}>
                    {characteristic[1]}
                    
                    </button>
                </li>
                ))
            ) : (
                <div>
                <h3 className="none-title">You haven't banned anything yet!</h3>
                </div>
            )}
        </div>
    )
};


export default Banned;
