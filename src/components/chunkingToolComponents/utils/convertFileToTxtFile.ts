import { pdfjs } from "react-pdf";

export function convertFileToTxtFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      switch (file && file.type) {
        case "application/pdf":
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

              console.log("file", file);

              // const blob = new Blob([finalText], { type: "text/plain" });
              // const pdf2txtFile = new File([blob], `${file.name}.txt`, {
              //   type: "text/plain",
              // });

              resolve(finalText);
            });
          });

          reader.readAsDataURL(file as Blob);
          break;

        case "text/plain":
          // resolve(file);

          reader.addEventListener("loadend", async (e) => {
            resolve(e.target?.result as string);

            // const loadedText = e.target.result;
            //   reader.readAsBinaryString(file);
            //   resolve(loadedText);
            // });
          });

          reader.readAsBinaryString(file as Blob);
          break;
        default:
          reject("Unsupported file type");
      }
    } catch (e) {
      reject(e);
    }
  });
}
