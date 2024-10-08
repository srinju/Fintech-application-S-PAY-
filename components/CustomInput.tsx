"use client"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from 'react'
import { formSchema } from "./AuthForm"
import { Control, FieldPath } from "react-hook-form"
import {z} from 'zod'

interface CustomInput {
  control : Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string 
  
}

const CustomInput = ({control,name,label,placeholder}:CustomInput) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <div className='form-item'>
                <FormLabel className='form-label'>
                    {label}
                </FormLabel>
                <div className='flex w-full flex-col'>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            type={name === 'password' ? 'password' : 'text'}
                            className='input-class'
                            {...field} //we have to spread the field here this is how react hook forms work 
                        />
                    </FormControl>
                    <FormMessage className='form-message mt-2' />
                </div>
            </div>
        )}
    />
  )
}

export default CustomInput