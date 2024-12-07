import { useRef, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";


export interface GenerateThumbnailProps {
    setImage: Dispatch<SetStateAction<string>>;
    image: string;
}

const GenerateThumbnail = ({
    setImage,
    image,
}: GenerateThumbnailProps) => {
    //const [isImageLoading, setIsImageLoading] = useState(false);

    const imageRef = useRef<HTMLInputElement>(null);

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const files = e.target.files;
            if (!files) return;
            const file = files[0];

            const formData = new FormData();
            formData.append("file", file);

            //setIsImageLoading(true);

            const response = await axios.post("/api/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
            const publicId: string = response.data.publicId;

            setImage(
                `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`
            ); // Assuming the API returns the public ID

        } catch (error) {
            console.error("Error uploading image:", error);

        } finally {
            //setIsImageLoading(false);
        }
    };

    return (
        <>
            <Input
                type="file"
                className=""
                ref={imageRef}
                onChange={(e) => uploadImage(e)}
            />
        </>
    );
};

export default GenerateThumbnail;