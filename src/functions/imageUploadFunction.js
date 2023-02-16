import fire from "../config/config";

const getFrontBase64 = (file, type) => {
    const docId = Math.floor(Math.random() * 1000000000000);
    var reader = new FileReader();
    var metadata = {
        contentType: 'image/png',
    };
    if (type === "First Image") {
        reader.readAsDataURL(file);
        reader.onload = () => {
            fire.storage().ref(`images/${docId}`)
                .putString(reader.result.split(',')[1], "base64", metadata).then(() => {
                    fire.storage().ref("images/").child(`${docId}`).getDownloadURL().then((url) => {

                        return url;
                    }).then(() => {
                        return "Url Not Found"
                    }).catch(e => console.log(e.code))

                })
        };
    } else if (type === "Second Image") {
        reader.readAsDataURL(file);
        reader.onload = () => {
            fire.storage().ref(`images/${docId}`)
                .putString(reader.result.split(',')[1], "base64", metadata).then(() => {
                    fire.storage().ref("images/").child(`${docId}`).getDownloadURL().then((url) => {
                        return url
                    }).then(() => {
                        return "Url Not Found"
                    }).catch(e => console.log(e.code))

                })
        };
    } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
            fire.storage().ref(`images/${docId}`)
                .putString(reader.result.split(',')[1], "base64", metadata).then(() => {
                    fire.storage().ref("images/").child(`${docId}`).getDownloadURL().then((url) => {
                        return url
                    }).then(() => {
                        return "Url Not Found"
                    }).catch(e => console.log(e.code))

                })
        };
    }

};

export const onUploadFrontImage = (file, type) => {
    if (file.file.status === "done" || file.file.status === "error") {
        getFrontBase64(file.file.originFileObj, type);
        console.log("yes")
    }
};