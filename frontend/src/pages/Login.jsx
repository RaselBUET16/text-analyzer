import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../contexts/useAuth";

const Login = ()=> {
    const {isAuthenticated, loginWithGoogle} = useAuth();
    const navigate = useNavigate();

    useEffect(()=> {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card p-4 text-center" style={{ width: '100%', maxWidth: '400px' }}>
            <h1 className="mb-4">Text Analyzer</h1>
            <button 
                className="btn btn-danger"
                onClick={loginWithGoogle}
                style={{ width: '100%' }}
            >
                Login with Google
            </button>
        </div>
        </div>
    )
}

export default Login;