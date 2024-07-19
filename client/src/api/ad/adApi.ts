import { useEffect, useState } from "react"
import { Ad } from '../../types/ad.types'
import { getAllAds as getAllAdsApi, getAd as getAdApi, addAd as addAdApi, updateAd as updateAdApi, deleteAd as deleteAdApi } from '../../services/ad.service'

// export default function Api() {
    const [ads, setAds] = useState<Ad[]>([])
    const [id, setId] = useState(1)
    const [title, setTitle] = useState(' ')
    const [context, setContext] = useState(' ')
    const [categoryId, setCategory] = useState(1)


    const getAds = async () => {
        try {
            const ads = await getAllAdsApi()
            // return ads;
            // setAds(products)
        } catch (error) {
            console.log("ERROR in get all ads")
        }
    }

    const addAd = async () => {
        try {
            const newAdd = {
                id: 1,
                title: title,
                context: context,
                categoryId: 1,
                userId: '214678351',
                date: new Date()
            }
            //בעקרון לא אמורים לשלוח מודעה עם id -יכול לעשות שגיאה
            const res = await addAdApi(newAdd)
            setAds([newAdd, ...ads])
        }

        catch (error) {
            console.log("error in add AD "+ error)
        }
    }

    const updateAd = async () => {
        try {
            //הלקוח לא אמור לכתוב את הid של המודעה
            const adIndex = ads.findIndex(a => a.id === id)
            const adToUpdate = { ...ads[adIndex] }
            adToUpdate.title = title
            adToUpdate.context = context
            adToUpdate.categoryId = categoryId
            //console.log(prodToUpdate)
            const updatedAd = await updateAdApi(adToUpdate)
            const newAds = [...ads]
            newAds[adIndex] = updatedAd
            setAds(newAds)
        } catch (error) {
            console.log("error in update ad "+ error)
        }
    }

    const deleteProductt = async () => {
        try {
            //המחיקה צריכה לקבל את הid של המודעה והלקוח לא כותב id
            const deleteItemId = id
            await deleteAdApi(deleteItemId)
            setAds(ads.filter(ad => ad.id !== deleteItemId))
        } catch (error) {
            console.log(error)
        }
    }
    // useEffect(
    //     // מה לבצע
    //     () => {
    //         getProducts()
    //     },
    //     // מתי לבצע
    //     [])



