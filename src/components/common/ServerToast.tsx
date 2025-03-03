"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const ServerToast = (props: {
  message: string | undefined;
  type: string | undefined;
}) => {
  useEffect(() => {
    if (!!props.message && !!props.type) {
      if (props.type === "success") {
        toast.success(props.message);
      } else if (props.type === "error") {
        toast.error(props.message);
      }
    }
  }, [props.message, props.type]);
  return null;
};

export default ServerToast;
