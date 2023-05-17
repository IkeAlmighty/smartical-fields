"use client";

import React, { useState, useRef } from 'react';
import axios from 'axios';
import TrashIcon from './TrashIcon';

const InputCategorizer = ({ onDelete, id, className }) => {
    const [input, setInput] = useState("");
    const [category, setCategory] = useState("");
    const timerRef = useRef(null);

    const categorizeInput = async (input) => {
        console.log(input);
        try {
            const response = await axios.post('/api/validate', { input });
            if (response.data && response.data.category) {
                return response.data.category;
            } else {
                throw new Error(`Invalid Response: ${response.data.error}`);
            }
        } catch (error) {
            console.error(error);
            return "Unknown";
        }
    };

    const handleChange = (e) => {
        const input = e.target.value;
        setInput(input);

        // Clear the previous timer if it exists
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Set up a new timer
        timerRef.current = setTimeout(async () => {
            const category = await categorizeInput(input);
            setCategory(category);
        }, 2000); // 2000ms delay
    };

    return (
        <div className={`${className}`}>
            <input type="text" value={input} onChange={handleChange} className="inline-block" />
            <p className="inline-block ml-5 w-[200px]">Category: {category}</p>
            {onDelete && <button className="inline-block mx-5 float-right mt-3" onClick={() => onDelete(id)}><TrashIcon /></button>}
        </div>
    );
};

export default InputCategorizer;
