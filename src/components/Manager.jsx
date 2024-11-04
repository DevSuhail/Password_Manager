import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ website: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        console.log(form);
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye2.png";
            passwordRef.current.type = "text";
        }
        else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "password";
        }
    };

    const savePassword = () => {
        console.log(form);
        const updatedArray = [...passwordArray, { ...form, id: uuidv4() }];
        setPasswordArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
        console.log(updatedArray);
        setform({ website: "", username: "", password: "" });
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const editPassword = (id) => {
        console.log("editing password with id:", id);
        setform(passwordArray.filter(item => item.id === id)[0]);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const deletePassword = (id) => {
        console.log("deleting password with id:", id);
        let c = confirm("Do you want to delete?");
        if (c) {
            const updatedArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedArray);
            localStorage.setItem("passwords", JSON.stringify(updatedArray));
        }
    };

    return (
        <>
            <div className="fixed inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="container mx-auto max-w-4xl p-4 md:min-h-[88.7vh] md:p-20 text-white">
                <h1 className='font-bold text-3xl sm:text-4xl text-center'>
                    <span>&lt;  </span>
                    PassOP
                    <span> /&gt;</span>
                </h1>
                <p className='text-lg sm:text-xl text-center'>Your Password Manager</p>

                <div className='flex flex-col p-4 gap-5 items-center'>
                    <input value={form.website} onChange={handleChange} placeholder='Website' className='rounded-full border-4 border-purple-500 w-full text-black px-4' type="text" name='website' />
                    <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Username' className='rounded-full border-4 border-purple-500 w-full text-black px-4' type="text" name='username' />
                        <div className="relative w-full md:w-auto">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Password' className='rounded-full border-4 border-purple-500 w-full text-black px-4' type="password" name='password' />
                            <span className='absolute right-3 top-1.5 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={20} src="icons/eye2.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} disabled={form.website.length < 3 || form.username.length < 3 || form.password.length < 4} className='flex justify-center items-center rounded-full gap-2 w-[150px] p-1 bg-purple-500 disabled:bg-black hover:bg-purple-700 border border-white disabled:border-none'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" colors="primary:#ffffff"></lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords w-full">
                    <h2 className='font-bold text-xl sm:text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Saved Passwords</div>}
                    {passwordArray.length !== 0 && (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full bg-purple-500 rounded-md overflow-hidden">
                                <thead>
                                    <tr>
                                        <th className="bg-purple-600 px-2 md:px-4 py-2">Website</th>
                                        <th className="bg-purple-600 px-2 md:px-4 py-2">Username</th>
                                        <th className="bg-purple-600 px-2 md:px-4 py-2">Password</th>
                                        <th className="bg-purple-600 px-2 md:px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-center border px-2 md:px-4 py-2">{item.website}</td>
                                            <td className="text-center w-32 border px-2 md:px-4 py-2">{item.username}</td>
                                            <td className="text-center w-32 border px-2 md:px-4 py-2">{item.password}</td>
                                            <td className="text-center w-32 border px-2 md:px-4 py-2">
                                                <div className='flex justify-center items-center gap-2 md:gap-4'>
                                                    <span onClick={() => { editPassword(item.id) }} className='cursor-pointer' title='edit'><MdEdit size={20} /></span>
                                                    <span onClick={() => { deletePassword(item.id) }} className='cursor-pointer' title='delete'><MdDeleteForever size={20} /></span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
