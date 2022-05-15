import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
import { useNavigation } from 'react-day-picker';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
       const navigate = useNavigate()

    let signInError;

    if (loading || gLoading || updating) {
        return <Loading></Loading>
    }
    if (error || gError || updateError) {
        signInError = <p className='text-red-500'>{error?.message || gError?.message || updateError?.message}</p>
    }
    if (user || gUser) {
        console.log(gUser || user)
    }
    const onSubmit = async data => {
        console.log(data);
        await createUserWithEmailAndPassword(data.email, data.Password)
        await updateProfile({ displayName: data.name });
        console.log('update done')
        navigate('/appointment')
    }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="text-center text-2xl font-bold">SignUp</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Name</span>

                            </label>
                            <input {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is Required'
                                },
                            })}
                                type="text" placeholder="your name" class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                                {errors.name?.type === 'required' && <span class="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Email</span>

                            </label>
                            <input {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,

                                    message: 'Provide a valid Email' // JS only: <p>error message</p> TS only support string
                                }
                            })}
                                type="email" placeholder="your email" class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                                {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Password</span>

                            </label>
                            <input {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters' // JS only: <p>error message</p> TS only support string
                                }
                            })}
                                type="password" placeholder="your password" class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                                {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.Password.message}</span>}
                            </label>
                        </div>

                        <input className='btn w-full max-w-xs' type="Submit" value="SignUp" />
                    </form>
                    <p>Already have an Account ? <Link to='/login' className='text-secondary'>Please Login</Link></p>
                    <div class="divider">OR</div>

                    <button onClick={() => signInWithGoogle()} class="btn">CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;