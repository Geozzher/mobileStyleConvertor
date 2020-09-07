/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/9
 */

$(function () {

        function datatoBlob(data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            // var byteCharacters = atob(data);
            var byteCharacters = JSON.stringify(data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        }

        $('#style-input-form').ajaxForm(function (data) {


            if (data.status === "fail") {
                alert(data.reason)
            } else {

                // let blob =  new Blob(data);
                let blob = datatoBlob(data,'text/json,charset=utf-8');
                let objectURL = window.URL.createObjectURL(blob);
                window.open(objectURL);

                // let a = document.createElement('a');
                // a.setAttribute('href', objectURL);
                // a.setAttribute('download', 'fileName');
                //
                // window.location.reload()
            }
        });
    }
);