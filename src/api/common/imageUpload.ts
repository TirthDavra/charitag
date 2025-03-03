import axios from "axios";
import { ApiResponse, clientCustomFetch } from "../apiConfig";
import { getSession } from "next-auth/react";

export interface IUploadPhotoApi {
  filename: string;
  path: string;
  thumbnail_path: string;
  medium_path: string;
  type: number;
  action_by: number;
  updated_at: Date;
  created_at: Date;
  id: number;
  message?: string;
}
// export const uploadPhotoApi = async (file: File, token: string) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("type", "product");
//   formData.append("file", file);
//   formData.append("type", "product");
//   // const formData = {
//   //   file: file,
//   //   type: "product",
//   // };
//   const res = await clientCustomFetch<IUploadPhotoApi>({
//     url: "/media/upload",
//     method: "POST",
//     data: formData,
//     customHeaders: {
//       // "Content-Type": "multipart/form-data",
//       "Content-Type": "application/json",
//       Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4xLjE3OjgwMDEvYXBpL2xvZ2luIiwiaWF0IjoxNzEyMTI0NjA5LCJleHAiOjE3MTI3Mjk0MDksIm5iZiI6MTcxMjEyNDYwOSwianRpIjoiUnl5RGxYRmRXM0p0RzgycCIsInN1YiI6IjE3IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.k2PDDl2w3mE_Hk9PkaP2EQpb2WOHI4XPDg1Ps5j2l38`,
//     },
//   });
//   return res.data;
// };

// use only in client component
export const uploadPhotoApi = async (
  data: File[],
  type: string,
): Promise<ApiResponse<IUploadPhotoApi>> => {
  const session = await getSession();
  const formData = new FormData();
  data.forEach((file) => {
    formData.append("file[]", file);
  });
  formData.append("type", type);
  const response: ApiResponse<IUploadPhotoApi> = {
    error: false,
    data: {} as IUploadPhotoApi,
    statusCode: -1,
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/media/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/formdata",
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );
    if (res.data) {
      response.data = res.data.data;
      return response;
    }
    response.error = true;
    return response;
  } catch (error) {
    response.error = true;
    response.data = {
      message: "Network error or invalid JSON response.",
    } as IUploadPhotoApi;
    return response;
  }
};

export const deleteImageById = async (id: number) => {
  const response = await clientCustomFetch({
    url: `/media/delete/${id}`,
    method: "DELETE",
  });
  return response;
};
