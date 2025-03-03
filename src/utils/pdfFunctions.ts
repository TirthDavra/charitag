import { clientCustomFetch } from "@/api/apiConfig";
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist/webpack";

export async function fetchPdfAsImage(url: string): Promise<string | null> {
  try {
    // Fetch the PDF from the server
    // const res = clientCustomFetch({
    //   url,
    //   customHeaders: {
    //     "Access-Control-Allow-Credentials": "true",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
    //     "Access-Control-Allow-Headers":
    //       "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    //   },
    // });
    // console.log("res", res);
    fetch(
      "http://ec2-35-182-192-85.ca-central-1.compute.amazonaws.com/storage/document/3/1721993279_852179016.pdf",
      {
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      },
    )
      .then((res) => {
      })
      .catch((err) => {
        console.log("err", err);
      });
    const response3 = await axios.get(
      "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
      {
        responseType: "blob",
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
          "Content-Type": "application/pdf",
        },
      },
    );
    const pdfBlob = new Blob([response3.data], { type: "application/pdf" });
    return "";
    fetch(
      "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
      {
        mode: "no-cors",
      },
    )
      .then((res) => res.blob())
      .then((blob) => {
        console.log("arrayBuffer", blob);
      })
      .catch((err) => {
        console.log("err", err);
      });
    const response = await fetch(
      "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
      {
        mode: "no-cors",
      },
    );
    console.log("response", await response.arrayBuffer());

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    console.log("arrayBuffer", arrayBuffer);

    // Load the PDF with pdf-lib
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Get the first page as a Uint8Array
    const firstPage = pdfDoc.getPage(0);

    // Load the PDF with pdfjs-dist
    const loadingTask = pdfjsLib.getDocument({ data: firstPage });
    const pdf = await loadingTask.promise;

    // Get the first page
    const page = await pdf.getPage(1);

    // Render the page to a canvas
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get canvas context");
    }
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;

    // Convert the canvas to an image
    const image = canvas.toDataURL("image/png");

    return image;
  } catch (error) {
    console.error("Error fetching or rendering PDF:", error);
    return null;
  }
}
