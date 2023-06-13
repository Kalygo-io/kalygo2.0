import { pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

export function convertFileToTxtFile(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    try {
      switch (file && file.type) {
        case "application/pdf":
          const reader = new FileReader();
          reader.addEventListener("loadend", async () => {
            const loadingTask = pdfjs.getDocument(reader.result as ArrayBuffer);

            loadingTask.promise.then(async function (pdf: any) {
              // you can now use *pdf* here
              const maxPages = pdf.numPages;
              var countPromises = []; // collecting all page promises
              for (var j = 1; j <= maxPages; j++) {
                var page = pdf.getPage(j);

                var txt = "";
                countPromises.push(
                  page.then(function (page: any) {
                    // add page promise
                    var textContent = page.getTextContent();
                    return textContent.then(function (text: any) {
                      // return content promise
                      return text.items
                        .map(function (s: any) {
                          return s.str;
                        })
                        .join(""); // value page text
                    });
                  })
                );
              }

              const finalText = await Promise.all(countPromises).then(function (
                texts
              ) {
                return texts.join("");
              });

              const blob = new Blob([finalText], { type: "text/plain" });
              const pdf2txtFile = new File([blob], "pdf2txt.txt", {
                type: "text/plain",
              });

              console.log("pdf2TxtFile");

              resolve(pdf2txtFile);
            });
          });

          reader.readAsDataURL(file as Blob);
          break;

        case "text/plain":
          resolve(file);
          break;
        default:
          reject("Unsupported file type");
      }
    } catch (e) {
      reject(e);
    }
  });
}
