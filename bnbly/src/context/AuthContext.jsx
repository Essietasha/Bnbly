import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext(null);
// const user = auth.currentUser; Not so reliable on first page refresh.

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stopAuthListener = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => stopAuthListener();
    }, []);

    const logout = () => signOut(auth);

    const ctxValue = {
        user,
        logout,
    }

    return <AuthContext.Provider value={ctxValue} >
        {!loading && children}
    </AuthContext.Provider>
}; 