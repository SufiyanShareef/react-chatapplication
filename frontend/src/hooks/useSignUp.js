import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()
    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender, })
        if (!success) return;
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            //local storage
            localStorage.setItem("chat-user", JSON.stringify(data));
            //context
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { signup, loading }
}

export default useSignUp

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('please fill all the fields');
        return false;
    }
    if (password !== confirmPassword) {
        toast.error('password did not match');
        return false;
    }
    if (password.length < 6) {
        toast.error('password should be at least 6 characters long');
        return false;
    }
    return true;
}