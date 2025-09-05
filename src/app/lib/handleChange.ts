import React from "react";

export const handleChange =
    (setForm: any) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            const checked = (e.target as HTMLInputElement).checked;
            setForm((prevData: any) => ({
                ...prevData,
                [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
            }));
        };
