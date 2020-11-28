const zipCodeForm = document.getElementById("zipCodeForm");
const searchField = document.getElementById("search");
const getlatLangForm = document.getElementById("getlatLang");
const getlatLangBtn = document.getElementById("getlatLangBtn");
const latField = document.getElementById("lat");
const langField = document.getElementById("lang");

let timer;





searchField.addEventListener('input',function({target}){
    if(timer || !target.value) clearTimeout(timer);
    
        timer = setTimeout(function(){
            zipCodeForm.submit();
        },1000);
    
});

getlatLangBtn.addEventListener('click',async function(e){
    e.preventDefault();
    if (navigator.geolocation) {
        const latLangPromise = new Promise(function(resolve,reject){
            navigator.geolocation.getCurrentPosition(resolve,reject);
        });
        try{
            const {coords} = await latLangPromise;
            const {latitude,longitude} = coords;
            langField.value = longitude;
            latField.value = latitude;
            getlatLangForm.submit();
            
        }
        catch{
            alert("Try Again...");
            e.target.href="";
        }
        
      } else {
        alert("Geolocation is not supported");
        e.target.href="";
      }
});





      