"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import TrashIcon from "./TrashIcon";

const InputCategorizer = ({ onDelete, id, className }) => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const timerRef = useRef(null);

  const categorizeInput = async (input) => {
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (data && data.category) {
        return data.category;
      } else {
        throw new Error(`Invalid Response: ${data.error}`);
      }
    } catch (error) {
      return error?.message || "Unknown";
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setInput(input);
    setCategory("...");

    // Clear the previous timer if it exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set up a new timer
    timerRef.current = setTimeout(async () => {
      setCategory("validating...");
      const category = await categorizeInput(input);
      setCategory(category);
    }, 2000); // 2000ms delay
  };

  return (
    <div className={`${className}`}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="inline-block"
      />
      <p className="inline-block ml-5 w-[200px]">Category: {category}</p>
      {onDelete && (
        <button
          className="inline-block mx-5 float-right mt-3"
          onClick={() => onDelete(id)}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default InputCategorizer;
