import { axios } from "@/lib/axios";
import { isAxiosError } from "axios";

type FileResponse = [Blob | null, any];

export const getFileUrl = (filename: string): string => {
  // Remove 'uploads/' prefix if present
  const cleanFilename = filename.replace(/^uploads\//, "");
  return `/files/${cleanFilename}`;
};

export const getFileBlob = async (filename: string): Promise<FileResponse> => {
  try {
    const response = await axios.get(getFileUrl(filename), {
      responseType: "blob",
    });
    return [response.data, null];
  } catch (error) {
    if (isAxiosError(error)) return [null, error.response?.data];
    return [null, { message: "Failed to fetch file" }];
  }
};

export const openFileFromResponse = async (blob: Blob, filename: string) => {
  const fileUrl = URL.createObjectURL(blob);
  const newWindow = window.open("", "_blank");

  if (newWindow) {
    if (/\.(pdf)$/i.test(filename)) {
      newWindow.document.write(`
        <embed 
          width="100%" 
          height="100%" 
          src="${fileUrl}" 
          type="application/pdf"
        />
      `);
    } else if (/\.(jpe?g|png|gif)$/i.test(filename)) {
      newWindow.document.write(`
        <img 
          src="${fileUrl}" 
          style="max-width: 100%; max-height: 100vh;" 
          alt="Preview"
        />
      `);
    } else {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = filename;
      newWindow.document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        newWindow.document.body.removeChild(a);
        URL.revokeObjectURL(fileUrl);
      }, 100);
    }
  }
};

export const getAndOpenFile = async (filename: string) => {
  const [blob, error] = await getFileBlob(filename);
  if (blob) {
    await openFileFromResponse(blob, filename);
    return true;
  }
  throw error || new Error("Failed to open file");
};
