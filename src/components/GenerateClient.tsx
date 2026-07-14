import { IThumbnail } from "@/app/models/thumbnail.models";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Softbackdrop from "./Softbackdrop";
import { Image, Loader2, Sparkle } from "lucide-react";
import { AspectRatio, AspectRatioSelector } from "./AspectRatioSelector";
import StyleSelector from "./StyleSelector";
import ColorSchemeSelector from "./ColorSchemeSelector";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ApiResponse } from "@/app/types/ApiResponse";
import PreviewThumbnailSection from "./PreviewThumbnailSection";
import thumb_1 from "@/assets/thumb_1.jpg";

export const colorSchemes = [
  { id: "vibrant", name: "Vibrant", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"] },
  { id: "sunset", name: "Sunset", colors: ["#FF8C42", "#FF3C38", "#A23B72"] },
  { id: "ocean", name: "Ocean", colors: ["#0077B6", "#00B4D8", "#90E0EF"] },
  { id: "forest", name: "Forest", colors: ["#2D6A4F", "#40916C", "#95D5B2"] },
  {
    id: "purple",
    name: "Purple Dream",
    colors: ["#7B2CBF", "#9D4EDD", "#C77DFF"],
  },
  {
    id: "monochrome",
    name: "Monochrome",
    colors: ["#212529", "#495057", "#ADB5BD"],
  },
  { id: "neon", name: "Neon", colors: ["#FF00FF", "#00FFFF", "#FFFF00"] },
  { id: "pastel", name: "Pastel", colors: ["#FFB5A7", "#FCD5CE", "#F8EDEB"] },
] as const;
export type ColorScheme = (typeof colorSchemes)[number];

export const thumbnailStyles = [
  "Bold & Graphic",
  "Minimalist",
  "Photorealistic",
  "Illustrated",
  "Tech/Futuristic",
];
export type ThumbnailStyle = (typeof thumbnailStyles)[number];

function GenerateClient() {
  const session = useSession();
  const user = session.data?.user;
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [previewThumbnail, setPreviewThumbnail] = useState<IThumbnail | null>(null
  );
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState<string>(
    colorSchemes[0].id,
  );
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropDownOpen, setStyleDropDownOpen] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/user/generate-thumbnail`, {
        title,
        description: additionalDetails,
        style,
        aspect_ratio: aspectRatio,
        color_scheme: colorSchemeId,
      });
      toast.success(
        response.data.message || "Thumbnail generated successfully",
      );
      setPreviewThumbnail(response.data?.thumbnail);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Thumbnail generation failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Softbackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* Left wala part */}

            <div className="space-y-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl p-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-100 mb-1">
                  Create Your Thumbnail
                </h2>
                <p className="text-sm text-zinc-400">
                  Describe your vision and let AI bring it to life
                </p>
              </div>
              <div className="space-y-5">
                {/* title */}
                <div className="space-y-2 ">
                  <label className="block text-sm font-medium">
                    Title or Topic
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 10 Tips for Better Sleep"
                    value={title}
                    maxLength={100}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <div className="flex justify-end">
                    <span className="text-xs text-zinc-400">
                      {title.length}/100
                    </span>
                  </div>
                </div>

                {/* aspect ratio */}
                <AspectRatioSelector
                  value={aspectRatio}
                  onChange={setAspectRatio}
                />

                {/* style selector */}
                <StyleSelector
                  value={style}
                  onChange={setStyle}
                  isOpen={styleDropDownOpen}
                  setIsOpen={setStyleDropDownOpen}
                />

                {/* colorScheme selector */}
                <ColorSchemeSelector
                  value={colorSchemeId}
                  onChange={setColorSchemeId}
                />
                {/* Details */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Additional Prompt{" "}
                    <span className="text-zinc-400 text-xs">(optional)</span>
                  </label>
                  <textarea
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    rows={3}
                    placeholder="Add any specific elements, mood, or style preferences..."
                    className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  ></textarea>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={title === "" || loading}
                className="flex items-center justify-center gap-4 bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 hover:to-pink-800 disabled:cursor-not-allowed disabled:text-white/70 text-white text-[15px] w-full py-3.5 rounded-xl font-medium active:scale-98 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkle size={20} />
                    Generate Thumbnail
                  </>
                )}
              </button>
            </div>

            {/* right wala part */}
            <div className=" rounded-2xl bg-white/8 border border-white/10 shadow-xl p-6 h-auto">
              <div>
                <h2 className="text-xl font-bold text-zinc-100 mb-5">
                  Preview
                </h2>
              </div>
                <PreviewThumbnailSection
                  isLoading={loading}
                  thumbnail={previewThumbnail}
                  aspectRatio={aspectRatio}
                />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default GenerateClient;
