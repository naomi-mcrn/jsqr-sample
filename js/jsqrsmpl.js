"use strict";
//ui event
(() => {

  $(document).ready(() => {
    $("#qr_read").on("click", (e) => {
      Swal.fire({
        title: "scan QR",
        html: "<div id='qr_container'><div id='jsQRMsg'></div><canvas id='canvas' width='300' height='300' hidden></canvas</div>",
        showConfirmButton: false,
        showCancelButton: true,
        onRender: ()=>{
          var canvasElement = document.getElementById("canvas");
          window.jsQRLive.initialize(canvasElement);
          window.jsQRLive.scanOnce().then((result) => {
            if (result) {
              Swal.close({value: result});
            }else{
              Swal.close({dismiss: "readfail"});
            }
          }, (errobj) => {
            Swal.close({dismiss: "error", err: errobj});
          });
        }
      }).then((result)=>{
        window.jsQRLive.scanStop();
        if (result.value){
          //receive value
          Swal.fire({
            title: "QR read success",
            text: result.value
          });
        }
      });
    });
  });

})();