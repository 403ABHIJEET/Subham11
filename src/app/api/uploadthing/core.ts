import { getSession } from "next-auth/react";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
        .middleware(async ( {req} ) => {
            const session = await getSession()
            const user = session?.user
            // If you throw, the user will not be able to upload
            // if (!user || user.email !== "abhijeet8745@gmail.com") throw new UploadThingError("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: session?.user?.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            // console.log("Upload complete for userId:", metadata.userId);

            // console.log("file url", file.url);

            // return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;