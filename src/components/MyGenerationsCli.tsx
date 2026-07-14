import { useEffect, useState } from "react"
import Softbackdrop from "./Softbackdrop"
import { IThumbnail } from "@/app/models/thumbnail.models"
import thumb_1 from "@/assets/thumb_1.jpg"
import thumb_2 from "@/assets/thumb_2.jpg"
import thumb_3 from "@/assets/thumb_3.jpg"
import thumb_4 from "@/assets/thumb_4.jpg"
import thumb_5 from "@/assets/thumb_5.jpg"
import thumb_6 from "@/assets/thumb_6.jpg"
import thumb_7 from "@/assets/thumb_7.jpg"
import { AspectRatio } from "./AspectRatioSelector"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Download, Loader, Loader2, MoreVertical, RefreshCcw, Trash2 } from "lucide-react"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { ApiResponse } from "@/app/types/ApiResponse"
export const dummyThumbnails = [
    {
        _id: "69451ff3c9ea67e4c930f6a6",
        userId: "6942b3bd2a93a220baa331b3",
        title: "Top smartwatch under 1499",
        style: "Bold & Graphic",
        aspect_ratio: "16:9",
        color_scheme: "vibrant",
        text_overlay: true,
        image_url: thumb_1.src,
        description: "add multiple smartwatches ",
        isGenerating: false,
        createdAt: "2025-12-19T09:50:43.727Z",
        updatedAt: "2025-12-19T09:51:07.874Z",
    },
    {
        _id: "69451d5bc9ea67e4c930f698",
        userId: "6942b3bd2a93a220baa331b3",
        title: "Learn How to make 100k in 10 days",
        style: "Bold & Graphic",
        aspect_ratio: "16:9",
        color_scheme: "vibrant",
        text_overlay: true,
        image_url: thumb_2.src,
        description: "add cash images graph and etc",
        isGenerating: false,
        createdAt: "2025-12-19T09:39:39.971Z",
        updatedAt: "2025-12-19T09:40:05.084Z",
    },
    {
        _id: "6943fb409fa048268a04f105",
        userId: "6942b3bd2a93a220baa331b3",
        title: "Learn NextJS 16 with a Project",
        style: "Bold & Graphic",
        aspect_ratio: "16:9",
        color_scheme: "vibrant",
        text_overlay: true,
        image_url: thumb_3.src,
        description: "add human with laptop",
        isGenerating: false,
        createdAt: "2025-12-18T13:01:52.205Z",
        updatedAt: "2025-12-18T13:02:13.766Z",
    },
    {
        _id: "6943e8c763d3d5ec3e4f5c8c",
        userId: "6942b3bd2a93a220baa331b3",
        title: "Learn how to use Photoshop",
        style: "Bold & Graphic",
        aspect_ratio: "16:9",
        color_scheme: "vibrant",
        text_overlay: true,
        image_url: thumb_4.src,
        description: "",
        isGenerating: false,
        createdAt: "2025-12-18T11:43:03.281Z",
        updatedAt: "2025-12-18T11:43:24.982Z",
    },
    {
        _id: "6943e2220611d25b40e529b3",
        userId: "6942b3bd2a93a220baa331b3",
        title: "Make Burger in 30 min",
        style: "Photorealistic",
        aspect_ratio: "1:1",
        color_scheme: "vibrant",
        text_overlay: true,
        image_url: thumb_5.src,
        isGenerating: false,
        createdAt: "2025-12-18T11:14:42.466Z",
        updatedAt: "2025-12-18T11:15:04.260Z",
    },
    {
        _id: "6943e04c0611d25b40e529ac",
        userId: "6942b3bd2a93a220baa331b3",
        title: "Learn Full Stack Development",
        style: "Bold & Graphic",
        aspect_ratio: "16:9",
        color_scheme: "vibrant",
        text_overlay: true,
        image_url: thumb_6.src,
        isGenerating: false,
        createdAt: "2025-12-18T11:06:52.555Z",
        updatedAt: "2025-12-18T11:07:18.715Z",
    },
    {
        _id: "6943d68d5b9fed7040154a0f",
        userId: "6942b3bd2a93a220baa331b3",
        title: "Learn ReactJS in 2 hours",
        style: "Bold & Graphic",
        aspect_ratio: "16:9",
        color_scheme: "ocean",
        text_overlay: true,
        image_url: thumb_7.src,
        isGenerating: false,
        createdAt: "2025-12-18T10:25:17.135Z",
        updatedAt: "2025-12-18T10:25:41.648Z",
    },
];


function MyGenerationsCli() {
    const [thumbnails, setThumbnails] = useState<IThumbnail[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    const aspectClassMap:Record<AspectRatio, string> = {
        '16:9' : 'aspect-video',
        '1:1'  :  'aspect-square',
        '9:16' :  'aspect-[9/16]'   
    }

    const fetchThumbnails = async () => {
        setThumbnails(dummyThumbnails as IThumbnail[])
        setIsLoading(true)
        try {
           const response = await axios.get(`/api/user/get-thumbnails`);
        //    console.log(response.data.thumbnails) 
        setThumbnails(response.data.thumbnails as IThumbnail[])
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast.error(axiosError.response?.data.message || "Failed to fetch your thumbnails")
        }finally{
            setIsLoading(false) ;
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchThumbnails()
    }, [])

    const handleDownload = (imageUrl: string) => {
        window.open(imageUrl, '_blank')
    }

    // TODO
    const handleDelete = async(thumbnailId:string) => {
        setIsLoading(true)
        try {
            const response = await axios.delete(`/api/user/delete-thumbnail/${thumbnailId}`)
            toast.success(response.data.message || "Thumbnail deleted")
            await fetchThumbnails()
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast.error(axiosError.response?.data.message || "Deletion failed")
        }finally{setIsLoading(false)}
    }

    const handleRefresh = async () => {
        setRefreshing(true)
        await fetchThumbnails()
    }
    const router = useRouter()

  return (
    <>
    <Softbackdrop/>

    <div className="mt-32 h-auto px-6 md:px-16 lg:px-24 xl:px-32">

        <div className="w-full flex justify-between items-center mb-8">
    <div>
        <h2 className="text-xl md:text-2xl font-bold text-zinc-200">My Generations</h2>
        <p className="text-xs md:text-sm text-zinc-400 mt-1">View and manage all your AI-generated thumbnails</p>
    </div>
    
    <div>
        <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border backdrop-blur-md
            ${refreshing 
                ? 'bg-white/5 border-white/5 text-zinc-500 cursor-not-allowed' 
                : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white hover:border-white/20 active:scale-95 shadow-sm'
            }`}
        >
            {refreshing ? (
                <>
                    <Loader2 className="size-4 animate-spin text-zinc-400"/> Refreshing...
                </>
            ) : (
                <>
                    <RefreshCcw className="size-4"/> Refresh
                </>
            )}
        </button>
    </div>
</div>

        {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length:6}).map((a, idx) => (
                    <div key={idx} className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]">
                        
                    </div>
                ))}
            </div>
        )}

        {!isLoading && thumbnails.length === 0 && (
            <div className="text-center py-24">
                <h3 className="text-lg font-semibold text-zinc-200">No thumbnails yet</h3>
                <p className="text-sm text-zinc-400 mt-2">Generate your first thumbnail to see it here</p>
            </div>
        )}


        {!isLoading && thumbnails.length>0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                {thumbnails.map((th, idx) => {
                    const aspectClass = aspectClassMap[th.aspect_ratio || "16:9"]
                    const isMenuOpen = activeMenu === th._id;
                    return (
                        <div key={th._id}
                        // onClick={ () => router.push(`/user/generate/${th._id!.toString()}`)}
                        className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid w-full inline-block"
                        >  

                        <div className={`absolute top-3 right-3 z-20 transition-opacity  duration-200 ${isMenuOpen ? 'opacity-100' : 'opacity-100 lg:opacity-0 group-hover:opacity-100'}`}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveMenu(isMenuOpen ? null : th._id as string)
                                    }}
                                    className="p-2 rounded-full bg-black/60 text-zinc-300 hover:bg-black/80 hover:text-white backdrop-blur-md border border-white/10 transition-all"
                                >
                                    <MoreVertical className="size-4" />
                                </button>

                                {isMenuOpen && th.image_url && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-30 cursor-default" 
                                            onClick={(e) => { e.stopPropagation(); setActiveMenu(null); }}
                                        />
                                        
                                        <div className="absolute top-12 right-0 z-40 w-48 p-1.5 bg-[#18181b]/80 backdrop-blur-2xl border border-white/10 ring-1 ring-white/5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col text-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                            
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setActiveMenu(null); 
                                                    router.push(`/user/preview?thumbnail_url=${th.image_url}&title=${th.title}`)
                                                 }} 
                                                className="group flex items-center gap-2.5 px-3 py-2.5 text-left text-zinc-300 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200"
                                            >
                                                <ArrowUpRight className="size-4 group-hover:scale-110 group-hover:text-white transition-transform duration-200" /> Preview
                                            </button>
                                            
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setActiveMenu(null); 
                                                    handleDownload(th.image_url!)
                                                }} 
                                                className="group flex items-center gap-2.5 px-3 py-2.5 text-left text-zinc-300 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200"
                                            >
                                                <Download className="size-4 group-hover:scale-110 group-hover:text-white transition-transform duration-200" /> Download
                                            </button>
                                            
                                            <div className="h-px w-full bg-white/10 my-1" />
                                            
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setActiveMenu(null);
                                                    handleDelete(th._id!.toString())
                                                 }} 
                                                className="group flex items-center gap-2.5 px-3 py-2.5 text-left text-red-400 hover:bg-red-500/15 hover:text-red-300 rounded-lg transition-all duration-200"
                                            >
                                                <Trash2 className="size-4 group-hover:scale-110 transition-transform duration-200" /> Delete
                                            </button>

                                        </div>
                                    </>
                                )}
                            </div>

                        <div className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}>
                            {th.image_url ? (
                                <img src={th.image_url} alt={th.title} 
                                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                                />
                            )
                        : (
                            <div className="w-full h-full flex items-center justify-center text-sm text-zinc-400">
                                {th.isGenerating ? ('Generating...') : ('No image')}
                            </div>
                        )}

                        {th.isGenerating && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white">
                                <Loader className="size-5 text-zinc-400 animate-spin"/>Generating...
                            </div>
                        )}
                        </div>

                            <div className="p-4 space-y-2">
                            <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">{th.title}</h3>

                            <div className="flex flex-col flex-wrap items-start justify-between gap-2 text-xs text-zinc-400 mt-2">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-0.5 rounded bg-white/8">{th.style}</span>
                                    <span className="px-2 py-0.5 rounded bg-white/8">{th.color_scheme}</span>
                                    <span className="px-2 py-0.5 rounded bg-white/8">{th.aspect_ratio}</span>
                                </div>
                                <p className="text-xs text-zinc-500">{new Date(th.createdAt!).toLocaleDateString()}</p>
                            </div>

                        </div>
                        </div>
                    )
        })}
            </div>
        )}

    </div>
    </>
  )
}

export default MyGenerationsCli
