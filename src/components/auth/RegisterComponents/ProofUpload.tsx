import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useField } from "formik";
import Dropzone, { DropzoneRef } from "react-dropzone";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Image from "next/image";
import { toast } from "react-toastify";
import PdfPreview from "@images/PDF-preview.png";
import { FileText } from "lucide-react";
import Link from "next/link";

interface ProofUploadProps {
  name: string;
  maxSize?: number;
  maxSingleFileSize?: number;
  limit?: number;
  className?: string;
  classNameDrag?: string;
  setFieldValue?: (name: string, value: any) => any;
  removedFiles?: number[];
  initialFiles?: CustomFile[];
  isDisabled?: boolean;
}

export interface CustomFile {
  path: string;
  file_type: string;
  file_name: string;
  id?: number;
  size: number;
}

const ProofUpload: React.FC<ProofUploadProps> = ({
  name,
  maxSize = 2097152,
  maxSingleFileSize = 1048576,
  limit,
  className,
  classNameDrag,
  setFieldValue,
  removedFiles,
  initialFiles = [],
  isDisabled = false,
}) => {
  const [field, , helpers] = useField<File[]>(name);
  const files = field.value || [];
  const dropzoneRef = useRef<DropzoneRef | null>(null);

  function isCustomFile(file: File | CustomFile): file is CustomFile {
    return (file as CustomFile).file_name !== undefined;
  }

  function isFile(file: File | CustomFile): file is File {
    return (file as File)?.size !== undefined;
  }

  const handleRemoveFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      helpers.setValue(newFiles);

      const deletedFile = files[index];
      if (isCustomFile(deletedFile) && deletedFile?.id) {
        setFieldValue?.("remove_doc", [
          ...(removedFiles || []),
          deletedFile?.id,
        ]);
      }
    },
    [files, helpers, setFieldValue, removedFiles],
  );

  const handleRemoveFileFromInitial = useCallback(
    (index: number) => {
      const newFiles = initialFiles.filter((_, i) => i !== index);
      setFieldValue && setFieldValue("initialFiles", newFiles);

      const deletedFile = initialFiles[index];
      if (deletedFile?.id) {
        setFieldValue?.("remove_doc", [
          ...(removedFiles || []),
          deletedFile?.id,
        ]);
      }
    },
    [initialFiles, setFieldValue, removedFiles],
  );

  const PreviewComponent = useMemo(() => {
    return files.map((file, i) => (
      <li key={i} className="relative flex flex-col items-center">
        {file.type === "application/pdf" ? (
          <div
            className="flex h-36 w-24 flex-col items-center justify-center  overflow-hidden rounded-lg border border-gray-300"
            onClick={() => {
              const fileUrl = URL.createObjectURL(file);
              window.open(fileUrl, "_blank");
            }}
          >
            {/* <Document file={URL.createObjectURL(file)}>
              <Page pageNumber={1} height={150} />
            </Document> */}

            <FileText className="h-16 w-16" />
            <p>Click to view</p>
          </div>
        ) : (
          <Image
            className="mr-2 h-36 w-24 rounded object-contain"
            src={URL.createObjectURL(file)}
            alt="preview"
            width={100}
            height={100}
          />
        )}
        <div className="line-clamp-1 w-24">{file.name}</div>
        <button
          type="button"
          onClick={() => handleRemoveFile(i)}
          className="absolute right-0 top-0 z-[2] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
        >
          &times;
        </button>
      </li>
    ));
  }, [files, handleRemoveFile]);
  const onDrop = (acceptedFiles: File[]) => {
    let size: number = 0;

    // Calcula1te the total size of the initial files
    for (let x of initialFiles) {
      size += x?.size || 0;
    }

    // Check if the initial total size exceeds the max size
    if (size > maxSize) {
      toast.error(
        `Total file size should be less than ${(maxSize / 1048576).toFixed(2)}MB`,
      );
      return;
    }

    const validFiles: File[] = [];

    // Check each newly accepted file
    for (let x of acceptedFiles) {
      if (x.size > maxSingleFileSize) {
        toast.error(
          `Each file should be less than ${(maxSingleFileSize / 1048576).toFixed(2)}MB`,
        );
        continue;
      }

      if (size + x.size < maxSize) {
        size += x.size;
        validFiles.push(x);
      } else {
        toast.error(
          `Adding this file exceeds the total size limit of ${(maxSize / 1048576).toFixed(2)}MB`,
        );
      }
    }

    // Update the files with the valid files
    helpers.setValue([...files, ...validFiles]);
  };

  return (
    <div
      className={`rounded-lg border-2 border-dashed border-blue-500 bg-gray-50 p-6 text-center ${className}`}
    >
      {!isDisabled && (
        <Dropzone
          // onDrop={(acceptedFiles) =>
          //   helpers.setValue([...files, ...acceptedFiles])
          // }
          onDrop={onDrop}
          ref={dropzoneRef}
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "application/pdf": [".pdf"],
          }}
          maxSize={maxSize}
          multiple={true}
          maxFiles={limit}
        >
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <div
              {...getRootProps({ className: "dropzone" })}
              className={`cursor-pointer rounded-lg border-2 border-dashed border-blue-500 bg-white p-6 transition-colors duration-300 ease-in-out ${classNameDrag}`}
            >
              <input {...getInputProps()} />
              <div className="text-blue-500">
                {isDragActive
                  ? "This file is authorized"
                  : isDragReject
                    ? "This file is not authorized"
                    : "Drag and Drop files here."}
              </div>
              <label className="text-sm">
                Note: Each file should be under{" "}
                {(maxSingleFileSize / 1048576).toFixed()}MB and the total size
                under {(maxSize / 1048576).toFixed()}MB.
              </label>
            </div>
          )}
        </Dropzone>
      )}
      {!isDisabled && (
        <button
          type="button"
          onClick={() => dropzoneRef.current?.open()}
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-blue-600"
        >
          Open File Dialog
        </button>
      )}
      <ul className="mt-4 flex flex-wrap gap-3">
        {initialFiles &&
          initialFiles.length > 0 &&
          initialFiles.map((file, i) => {
            return (
              <li key={i} className="relative flex flex-col items-center">
                {file.file_type === "application/pdf" ? (
                  <div className="flex h-36 w-24 items-center justify-center overflow-hidden rounded-lg border border-gray-300">
                    <Link target="_blank" href={file.path}>
                      <FileText className="h-16 w-16" />
                    </Link>
                  </div>
                ) : (
                  <Image
                    className="mr-2 h-36 w-24 rounded"
                    src={file.path}
                    alt="preview"
                    width={100}
                    height={100}
                  />
                )}
                <div className="line-clamp-1 w-24">{file.file_name}</div>
                {!isDisabled && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFileFromInitial(i)}
                    className="absolute right-0 top-0 z-[2] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    &times;
                  </button>
                )}
              </li>
            );
          })}
        {files && files.length > 0 && PreviewComponent}
      </ul>
    </div>
  );
};

export default ProofUpload;
