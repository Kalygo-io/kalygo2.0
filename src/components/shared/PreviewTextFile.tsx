import React, { useEffect, useState } from "react";
import { fileURLToPath } from "url";

interface P {
  file: File | null;
}

export const PreviewTextFile = (p: P) => {
  const { file } = p;

  const [fileData, setFileData] = useState<string | ArrayBuffer | null>();

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      setFileData(reader.result);
    });

    reader.readAsText(file as Blob);
  }, []);

  return <>{fileData?.toString()}</>;
};
