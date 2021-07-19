



function getBHKValue(){
    var bhk = document.getElementsByName("uiBHK");
    for( var i in bhk){
        if(bhk[i].checked)
        {
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getBathValue(){
    var bhk = document.getElementsByName("uiBathrooms");
    for( var i in bhk){
        if(bhk[i].checked)
        {
            return parseInt(i)+1;
        }
    }
    return -1;
}



function onClickedEstimatePrice()
{
    console.log("estimated price");
    var sqft =  document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var locations = document.getElementById("uiLocations");
    var estprice = document.getElementById("uiEstimateddPrice");
    var url = " http://127.0.0.1:5000/predict_home_price";
     $.post(url,{
        total_sqft: parseFloat(sqft.value),
        location:locations.value,
        bhk:bhk,
        bath:bathrooms
    }, function(data, status) {
        console.log(data.estimated_price);
        estprice.innerHTML = "<h2>"+data.estimated_price.toString()+"Lakh</h2>";
        console.log(status);
        
    });
}


function onPageLoad()
{
    console.log("document loaded");
    var url ="http://127.0.0.1:5000/get_location_names";
        $.get(url,function(data, status){
        console.log("got response for get_location name");
        if(data){

             var locations = data.locations;
             var uiLocations = document.getElementById("uiLocations");
             $('#uiLocations').empty();
             for (var i in locations)
               {
               var opt = new Option(locations[i]);
               $('#uiLocations').append(opt); 
               }
            }  
        });
}
window.onload=onPageLoad;