import { useState } from "react";

export default function useForm(initialState: { [key in string]: any }) {
    const [form, setForm] = useState(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm({ ...form, [name]: value });
    };

    return { form, handleChange, setForm };
}