"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner'

const Form = () => {
    const [urls, setUrls] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        const files = e.target.elements[0].files;
    
        if (files.length === 0) return;
    
        const formData = new FormData();
        Array.from(files).forEach((file, index) => {
            formData.append(`file`, file);
        });
    
        const toastId = toast.loading('Uploading files...');
    
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                toast.error('Upload failed', { id: toastId });
                throw new Error('Upload failed');
            }
    
            const result = await response.json();
            toast.success('Uploaded successfully', { id: toastId });
            setUrls(result.urls);
        } catch (error) {
            toast.error(`Error uploading files: ${error.message}`, { id: toastId });
            console.error('Error uploading files:', error);
        }
    };
    


    if (!urls) {
        return (
            <form onSubmit={submit} className='flex flex-col gap-y-4 items-center'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="htmlFile">HTML Only.</Label>
                    <Input
                        id="htmlFile"
                        type="file"
                        accept=".html"
                        className="text-black"
                        multiple
                    />
                </div>
                <Button type="submit">Upload</Button>

            </form>
        );
    } else {
        return (
            <div className='flex flex-col gap-y-2'>
                <p>ID: {urls && urls[0].split("/")[0]}</p>
                {urls && urls.map((el, i) => (
                    <Link className='text-blue-600 underline' href={`/onk/${el}`} key={i}>{el.split("/")[1]}</Link>
                ))}
            </div>
        )
    }
};

export default Form;
