import React from "react";
import style from './login.module.css'
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
    username : string;
    password: string;
}

export default function Login () {
    const {register, handleSubmit, formState: {errors}, watch } =useForm<Inputs>({mode: "onChange"})
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => 
    localStorage.setItem('testObject', JSON.stringify(data))

    const user = watch('username')
    const pw = watch('password')

    const isValid = user && pw
    return (
        <div className={style.section}>
            <h2 className={style.title}>Log in</h2>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <label className={style.label} >username or email</label>
                <input  className={style.input} {...register('username', {required: "this is required"})}/>
                <span>{errors.username?.message}</span>
                <label className={style.label}>password</label>
                <input  className={style.input} 
                        type="password" 
                        {...register('password', 
                        {required: "this is required", 
                        minLength: {
                            value: 4,
                            message: "min length thaner 4"
                }})}/>
                <span>{errors.password?.message}</span>
                <div className={style.forgotPW}>
                    Forgot password <a href="/">Reset your password</a>
                </div>
                <input className={style.btnSubmit} disabled={!isValid || (Object.keys(errors).length > 0)} type="submit" value="Log in"/>
            </form>
        </div>
    )
}