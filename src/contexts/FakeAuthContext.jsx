import { createContext, useContext, useReducer } from "react"

const FakeAuthContext = createContext()

const initialState = {
    user: null,
    isAuthentificated: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthentificated: true
            }
        case "logout":
            return {
                ...state,
                user: null,
                isAuthentificated: false
            }

        default:
            throw new Error("Unknown action type")
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function FakeAuthProvider({ children }) {
    const [{ user, isAuthentificated }, dispatch] = useReducer(reducer, initialState)


    const login = (email, password) => {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER })
        }
    }
    const logout = () => {
        dispatch({ type: "logout" })
    }

    return (
        <FakeAuthContext.Provider value={{ user, isAuthentificated, login, logout }}>
            {children}
        </FakeAuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(FakeAuthContext)
    if (context === undefined) throw new Error("FakeAuthContext was used outside CitiesProvider");
    return context
}


export { useAuth, FakeAuthProvider }