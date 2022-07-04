import '../css/main.scss'

const AppView = () => {
    document.body.innerHTML = `<h1>Simple Example</h1>
        <form action="#">
            <fieldset>
                <label for="fileSelector">Select an Image file</label>
                <input type="file" id="fileSelector" />
            </fieldset>
        </form>

        <canvas id="editorCanvas" width="1440" height="960"></canvas>
        
        <button id="submitButton">Submit</button>
    

        <form id="jsonFile" name="jsonFile" enctype="multipart/form-data" method="post">
            <fieldset>
                <h2>Json File</h2>
                <input type='file' id='fileinput'>
                <input type='button' id='btnLoad' value='Load' onclick='loadFile();'>
            </fieldset>
        </form>
        `;


    // grab DOM elements inside index.html
    const fileSelector = document.getElementById("fileSelector");
    const editorCanvas = document.getElementById("editorCanvas");
    const submitButton = document.getElementById("submitButton");

    var printObject = {};

    const ctx = editorCanvas.getContext('2d');
    let files;

    function previewImage(file) {
        // check if file is valid Image (just a MIME check)
        switch (file.type) {
            case "image/jpeg":
            case "image/png":
            case "image/gif":
                // read Image contents from file
                const reader = new FileReader();
                reader.onload = function (e) {
                    // create HTMLImageElement holding image data
                    let img = new Image();
                    img.src = reader.result;

                    img.onload = function () {
                        // grab some data from the image
                        const width = img.naturalWidth;
                        const height = img.naturalHeight;

                        editorCanvas.height = editorCanvas.width * height / width;
                        ctx.drawImage(img, 0, 0, width, height, 0, 0, editorCanvas.width, editorCanvas.height);
                    }
                    // do your magic here...
                    printObject =
                    {
                        "canvas": {
                            "width": editorCanvas.width,
                            "height": editorCanvas.height,
                            "photo": {
                                "fileName": file.name,
                                "imageObj": reader.result,
                                "width": img.naturalWidth,
                                "height": img.naturalHeight,
                                "x": editorCanvas.getBoundingClientRect().left,
                                "y": editorCanvas.getBoundingClientRect().top
                            }
                        }
                    }
                    submitButton.onclick = function (e) {
                        saveJsonLocally(printObject);
                    };
                };
                reader.readAsDataURL(file);
                // process just one file.
                return;

            // }
        }
    }

    fileSelector.onchange = function (e) {
        // get all selected Files
        files = e.target.files;
        previewImage(files[0]);
    };

    function clearCanvas(context, canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var w = canvas.width;
        canvas.width = 1;
        canvas.width = w;
    }

    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }


    /**
     * Clear the uploaded image and showing a canvas that contains the photo from the stored printObject
     */
    document.getElementById("btnLoad").loadFile = function (e) {
        var input, file, fr;
        input = document.getElementById('fileinput');
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);

        function receivedText(e) {
            let lines = e.target.result;
            var retievedJson = JSON.parse(lines);

            let img = new Image();
            img.src = retievedJson.canvas.photo.imageObj;
            img.onload = function () {
                ctx.drawImage(img, 0, 0, retievedJson.canvas.photo.width, retievedJson.canvas.photo.height, 0, 0, retievedJson.canvas.width, retievedJson.canvas.height);
            }

            var fileObj = dataURLtoFile(retievedJson.canvas.photo.imageObj, retievedJson.canvas.photo.fileName);
            previewImage(fileObj);
        }
    }

    /**
     * The function is used to save the print description locally as a JSON file
     * @param {Object} printObj 
     * @param {String} fileName 
     */
    function saveJsonLocally(printObj) {
        // document.getElementById("fileSelector").value = "";
        clearCanvas(ctx, editorCanvas);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(printObj)], {
            type: "text/json"
        }));
        a.setAttribute("download", "print.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

}

AppView();

