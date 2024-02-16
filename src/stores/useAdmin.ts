import { toast } from "react-toastify"
import { create } from "zustand"
import axios from "axios"
import { API_URL } from "@/constants/API_URL"
import { uploadMultipleFiles, uploadSingleFile } from "@/utils/upload"
type AdminState = {
    isProductsLoading: boolean,
    allProducts: any[],
    isOrdersLoading: boolean,
    allOrders: any[],
    isUsersLoading: boolean,
    allUsers: any[],
    isCategoryLoading: boolean,
    allCategory: any[],
    isLocationLoading: boolean,
    allLocations: any[],
    test: any[],
    isUploadLoading: boolean,
    uploadedUrl: string,

    fetchAllUsers: () => void,
    fetchAllProducts: () => void,
    addProducts: (data: any) => void,
    updateProducts: (data: any, _id: any) => void,
    deleteProducts: (_id: any) => void,
    fetchAllOrders: () => void,
    fetchAllCategory: () => void,
    addCategory: (data: any) => void,
    updateCategory: (data: any, _id: any) => void,
    deleteCategory: (_id: any) => void,
    fetchAllLocation: () => void,
    addLocation: (data: any) => void,
    updateLocation: (data: any, _id: any) => void,
    deleteLocation: (_id: any) => void,
    uploadImage: (image: File) => void
}

export const useAdmin = create<AdminState>((set: any) => ({
    isProductsLoading: false,
    allProducts: [],
    isOrdersLoading: false,
    allOrders: [],
    isUsersLoading: false,
    allUsers: [],
    isCategoryLoading: false,
    allCategory: [],
    isLocationLoading: false,
    allLocations: [],
    test: [1],
    isUploadLoading: false,
    uploadedUrl: "",

    // manage users api
    fetchAllUsers: async () => {
        try {
            set({ isUsersLoading: true })
            let res = await axios.get(`${API_URL}/users/all`)
            if (res.data.status == "OK") {
                set({
                    allUsers: res.data.data
                })
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isUsersLoading: false })
        }
    },

    //manage Prodcuts api
    fetchAllProducts: async () => {
        try {
            set({ isProductsLoading: true })
            let res = await axios.get(`${API_URL}/products/all`)
            console.log("res products ", res)
            if (res.data.status == "OK") {
                set({
                    allProducts: res.data.data
                })
            }
        } catch (error) {
            console.log("error in products : ", error)
            toast.error("server issue")
        }
        finally {
            set({ isProductsLoading: false })
        }
    },
    addProducts: async (data: any) => {
        try {
            const requiredFields = ["name", "price", "category", "images", "description", "stock", "deliveryLocations", "eanCode", "hsnCode", "multiPack", "howToUse", "gstRate"]
            if (!requiredFields.every(e => data[e])) {
                return toast.error(`
                Please fill all required fields
                Expected fields: ${requiredFields.join(", ")}
                Missing fields: ${requiredFields.filter(e => !data[e]).join(", ")}`
                )
            }
            set({ isCategoryLoading: true })
            const images = await uploadMultipleFiles(data.images)
            console.log("images ", images)
            const dataToBeSent = { ...data, images }
            let res = await axios.post(`${API_URL}/products/create`, dataToBeSent)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allProducts
                set({
                    allProducts: [...prevarr, res.data.data]
                })
                toast.success("added successfully")
            }
        } catch (error) {
            console.log("error in add products : ", error)
            toast.error("server issue")
        }
        finally {
            set({ isCategoryLoading: false })
        }
    },
    updateProducts: async (data: any, _id: any) => {
        try {
            set({ isCategoryLoading: true })
            let res = await axios.patch(`${API_URL}/products/update/${_id}`, data)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allProducts;
                prevarr.forEach((e: any) => {
                    if (e._id == _id) {
                        e = { ...e, ...data };
                    }
                });
                set({
                    allProducts: prevarr
                })
                toast.success("updated successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isCategoryLoading: false })
        }
    },
    deleteProducts: async (_id: any) => {
        try {
            set({ isCategoryLoading: true })
            let res = await axios.delete(`${API_URL}/products/delete/${_id}`)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allCategory;
                let newArr = prevarr.filter((e: any) => {
                    return e = e._id != _id
                });
                set({
                    allProducts: newArr
                })
                toast.success("deleted successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isCategoryLoading: false })
        }
    },

    // manage orders api
    fetchAllOrders: async () => {
        try {
            set({ isOrderLoading: true })

        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isOrderLoading: false })
        }
    },

    // categories apis
    fetchAllCategory: async () => {
        try {
            set({ isCategoryLoading: true })
            let res = await axios.get(`${API_URL}/category/all`)
            if (res.data.status == "OK") {
                set({
                    allCategory: res.data.data
                })
            }
        } catch (error) {
            console.log("fetch categories error : ", error)
            toast.error("server issue")
        }
        finally {
            set({ isCategoryLoading: false })
        }
    },
    addCategory: async (data: any) => {
        try {
            const requiredFields = ["name", "icon"]
            if (!requiredFields.every(e => data[e])) {
                return toast.error(`
                Please fill all required fields
                Expected fields: ${requiredFields.join(", ")}
                `)
            }
            set({ isCategoryLoading: true })
            const icon = await uploadSingleFile(data.icon)
            const dataToBeSent = { ...data, icon }
            let res = await axios.post(`${API_URL}/category/create`, dataToBeSent)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allCategory
                set({
                    allCategory: [...prevarr, res.data.data]
                })
                toast.success("Added successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isCategoryLoading: false })
        }
    },
    updateCategory: async (data: any, _id: any) => {
        try {
            set({ isCategoryLoading: true })
            if (data.icon) {
                const icon = await uploadSingleFile(data.icon)
                data = { ...data, icon }
            }
            let res = await axios.patch(`${API_URL}/category/update/${_id}`, data)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allCategory;
                prevarr.forEach((e: any) => {
                    if (e._id == _id) {
                        e.name = data.name;
                    }
                });
                set({
                    allCategory: prevarr
                })
                toast.success("updated successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isCategoryLoading: false })
        }
    },
    deleteCategory: async (_id: any) => {
        try {
            set({ isCategoryLoading: true })
            let res = await axios.delete(`${API_URL}/category/delete/${_id}`)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allCategory;
                let newArr = prevarr.filter((e: any) => {
                    return e = e._id != _id
                });
                set({
                    allCategory: newArr
                })
                toast.success("deleted successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isCategoryLoading: false })
        }
    },
    fetchAllLocation: async () => {
        try {
            set({ isLocationLoading: true })
            let res = await axios.get(`${API_URL}/delivery/all`)
            if (res.data.status == "OK") {
                set({
                    allLocations: res.data.data
                })
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLocationLoading: false })
        }
    },
    addLocation: async (data: any) => {
        try {
            const requiredFields = ["name", "location", "pincode", "deliveryCharge"]
            if (!requiredFields.every(e => data[e])) {
                return toast.error(`
                Please fill all required fields
                Expected fields: ${requiredFields.join(", ")}
                Missing fields: ${requiredFields.filter(e => !data[e]).join(", ")}`
                )
            }
            set({ isLocationLoading: true })
            let res = await axios.post(`${API_URL}/delivery/create`, data)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allLocations
                set({
                    allLocations: [...prevarr, res.data.data]
                })
                toast.success("added successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLocationLoading: false })
        }
    },
    updateLocation: async (data: any, _id: any) => {
        try {
            set({ isLocationLoading: true })
            let res = await axios.patch(`${API_URL}/delivery/update/${_id}`, data)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allLocations;
                prevarr.forEach((e: any) => {
                    if (e._id == _id) {
                        e.name = data.name;
                        e.location = data.location;
                        e.deliveryCharge = data.deliveryCharge;
                        e.pincode = data.pincode;
                    }
                });
                set({
                    allLocations: prevarr
                })
                toast.success("updated successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLocationLoading: false })
        }
    },
    deleteLocation: async (_id: any) => {
        try {
            set({ isLocationLoading: true })
            let res = await axios.delete(`${API_URL}/delivery/delete/${_id}`)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allLocations;
                let newArr = prevarr.filter((e: any) => {
                    return e = e._id != _id
                });
                set({
                    allLocations: newArr
                })
                toast.success("deleted successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLocationLoading: false })
        }
    },
    uploadImage: async (image: File) => {
        try {
            set({ isUploadLoading: true })
            let formData = new FormData();
            formData.append("image", image)
            let res = await axios.post(`${API_URL}/upload/single`, formData)
            if (res.data.status == "OK") {
                toast.success("uploaded successfully")
            }
            set({ isUploadLoading: false, uploadedUrl: res.data.data })
        } catch (error) {
            toast.error("server issue")
            set({ isUploadLoading: false })
        }
    }
}))