import React from "react";

export const handleChange =
    <T extends Record<string, any>>(setForm: React.Dispatch<React.SetStateAction<T>>) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            const typedValue = type === "number" ? Number(value) : value;
            const checked = (e.target as HTMLInputElement).checked;

            setForm((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? checked : typedValue,
            }));
        };
