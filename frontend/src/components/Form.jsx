import React, { useState } from "react";
import axios from "axios";

function Form() {
    const [values, setValues] = useState({ value1: 0, value2: 0, value3: 0, value4: 0 });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: Number(e.target.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/data", {
                userId: "example-user-id", // Replace with dynamic user ID
                ...values,
            });
            alert(response.data.message);
        } catch (err) {
            alert("Error saving data.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(values).map((key, index) => (
                <div key={index}>
                    <label>{key}</label>
                    <input
                        type="number"
                        name={key}
                        value={values[key]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;
