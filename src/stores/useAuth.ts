import { toast } from "react-toastify"
import { create } from "zustand"

export const useAuth = create((set) => ({
    isLogged: false,
    isLoading: false,
    fetchLoading: true,

    login: async (data: any) => {
        console.log(data)
        try {
            set({ isLoading: true })
            if (data?.userName == "bellissimo" && data?.password == "bellissimo") {
                set({ isLogged: true })
                localStorage.setItem("auth", "true")
                window.location.href = "/dashboard";
            }
            else
                toast.error("wrong credential")
        } catch (error) { }
        finally { set({ isLoading: false }) }
    },
    fetchLogin: async () => {
        try {
            set({ fetchLoading: true })
            let res = await localStorage.getItem("auth")
            if (res == "true")
                set({ isLogged: true })
            else
                set({ isLogged: false })
        } catch (error) { }
        finally {
            set({ fetchLoading: false })
        }
    }

})) 
