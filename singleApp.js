$(document).ready(init);
var num=0;
var count=0;
function init() {
    $('#dbInfoButton').click(getData);
    $('#apiInfoButton').click(()=>{

        insertDBfromAPI($('.fun').val());
    });


}
// for(var x=0;x<150;x++){
    
//     insertDBfromAPI(x);
// }

const keys2=[
    
   
   
    'ZGFlMDRiMWFlOTNiMDE1Y2U3YmY5OTdmNjFhMTY1MGU3MGU1M2ExYjpwYXNz','YThlNDRiMGFkMjJjYTNmZDE2Y2EzZGE5OGQ0YWU5MmVkOWIxZWQ3ZDpwYXNz',
    'YzA5NWM2ZGEyNTQyOTE1NDFlODIxNDc4YWM0OGI3ZTRiODJjNDMxNTpwYXNz','NTcwMjhiNGJhNjNlNmJjYWU2OGRiNTgzODNhODljZDU0Mzg0NTBjYjpwYXNz',
    'MzMwNDMwMmU1YzYzMTIzMzExZmY4NjVhYTdhNTgzMGU1MTNkNmU2YjpwYXNz','M2NlYWIwYmI4MDkwMjhmYjg3ZWY3ZTVhZTdiMzYzYjU1MjM2Y2MwNDpwYXNz', 
    'NDE1NDRhMWRiNjQxNmJmNzQxZWVjYTdlMDUzOWI1ZjRlZmMwZmY5MjpwYXNz','OWM2NzBiYWRlOGJkMmZiM2FmYzdmZDQzYzUxZTYzOWE2NjliZWVhNDpwYXNz',
    'Y2NlN2ZhYjYzNzcyYTk3ODQ1MjM2NDQ5YTk5YmQ0MzI3ODE0M2Y4ODpwYXNz','OWQ1YWNlYWI4MWNkY2ZhNmI3MzYzZWUzM2IxYjkxNWUyMWQ2MDc4OTpwYXNz',
    'NjFlZmIzMjk1MmU2NGY1Y2EyYjVjNDQ1ZTg3YmVhZWI5OWZjNmZkMDpwYXNz','YjY2MTUwYWNlMjdlZDkzNTExNGEwYzdmNGE5ZmVmM2ZhNzNjY2EwMzpwYXNz',
    'YTY2Y2Y1MjM3NTQ5ZjE5MzYxNDRkMWI5NzNlN2VmOGZmMDYwMWY5ODpwYXNz','M2JkMzYwOWI5MjBmNDQ2YmIzZmRkMGJiZTQwZWJkMDNiNWE3YTRiNTpwYXNz',
    'Y2Y4OGJkMjNmNTk0NTljMTZiNWE5N2IxNzRiZTU4OGJiZGMyMDNjOTpwYXNz','NzNjYzZhYTI3ZGEwYTE2ZjIxZDRhN2QwMjQyMGJiMzc4Nzc0YjBjYzpwYXNz',
    'MGFkMjNiY2RjY2E3YjViYjE5YjNiZTY0NzkxNmMzNTg0NTA0MTNkNjpwYXNz','ZmJkNzUzMWFjOTlmYmE1ZTEzOGJmYjBjODM3Y2EzMjk2ODU2MTVjYzpwYXNz',
    'ZTYzMmY1MmNjMjVjZDQ3YzA2ZjlhMWFkN2ZhOTgyMDlmZWE4MjM3ZTpwYXNz'

]

const keys=[


'YmRkYzYzNDZiMjdkZGZmMGVhYmMyMDljZjgwYjdjNzdiYjA4NTNiYTpwYXNz','NjdjOTA4MTlmMTE5YzdmMGZhMGVjMTU5YmU3NTRmMjVjZWVjOWVkYjpwYXNz',
'Y2I0N2U2ZDBkZjMwZTRhNGYzZGE3ZTI1YzdlZGVhMDhmZDRmNTA4ZTpwYXNz','YWE3YjJmNDlmNjhhODI2ZGYxNWE1ODdlY2E4ZTFhODRhN2UyNTFjNjpwYXNz',
'MDYxODQ4MzBmNzczZTU3M2QzYzRlN2EwMDRlZmFkYzdkZGRmMmRhNzpwYXNz','MDc3NTA0MTcxZmE3OGQwZTViOWM3YjExOTdkNTk3NWEzMWFjNjQ3NDpwYXNz',
'ZjZhZTM2MGM4MzI5YjcyMDc2MGRhOWZhMTkyN2RlY2ZkYTZkMWNhODpwYXNz','ZDg3ZjU4MDUzMGJiZjJmMDc0ZGNlODUxYzdkODdjNDFhOGFlMzJkOTpwYXNz',
'N2E5NjhiNDUwMTRhNWU1MTVkMTRkN2QyMDc1OTVkY2YyNGI4OGU0MDpwYXNz','ZWZkNWU2ODZiOTNiNWQ3MmI5MzZmYWIwZDcyMzhmNmI1YzMzZGFlZjpwYXNz',
'ZTliNDZmZTU4NGJhMmM4NzZjZGEzNDZkYzIzMGI0M2IxM2QyZDcwNDpwYXNz','NjNmNzk0MjQwYjE2MGU4ZDZmYTI1NzAwNGVmNDQ1ZDZlMWNkYWExNzpwYXNz',
'MmExYTFiYmYxYWZlNTIxZGE2NGFkNjBmZTYzNDVkMzJlZWVjNjBkMzpwYXNz','YzljYTlmM2VlMWNhNzQyOGVhOTY5NWYwYWU5MGIyNzhhMDJkZTU4NDpwYXNz',
'NjFhMTlkMDZkZTFjMDdiMzJiOWY4OWQ1OWRjYmE0N2ExZTQ1OWZhODpwYXNz',
'NjUwZmQ4Y2VhMDIwZjI4OTc1MmI2YzM5MGUyMTIxMTNjMTE3NzZjMzpwYXNz','OGYyMDU3OTFkNGU1ZGE2NWRhODk2NmIyMGQ3OGFiMjVmMDA2N2YyMzpwYXNz',
'YTUyNWU2NDk3ZDY3MGM1YjkzYTRhMDFhMzE4ZmYyNjRlM2I4ZDViMiA6cGFzcw==','YzllYTdlN2ZiNmUzNTE1OWIzOGQ3YTE5YjNmMjlmMTIwMGM2MmRhNjpwYXNz',
'Zjg3Zjc2ZDNkMTg4YzFkZjA3MGI2NDU4NDllM2EzMjA4MGJjZmEzMjpwYXNz','MzY2MzQ3OGUxY2QwYjc5NWUxNDliYTEyZGU5Njk3MTRmOGE4ODU1NTpwYXNz',
'NWFiMTQ2MDFhY2U3YWVkYWQyOWVhOTUyNWQwZGExZDAyNzA2MGM5ZjpwYXNz',];
//ZGJlZTg3OWNkMzlhY2JhZmZiNzcwZmI0ZTIyYjAzOTEyYzc0NmY2YjpwYXNz
function insertDBfromAPI(x) {
num++
    //var url = "https://api.appmonsta.com/v1/stores/android/details/com.atomicadd.fotos.json?country=US" ;
    // var url = "https://api.appmonsta.com/v1/stores/android/details/com.orbital.donttouchit.json?country=US";
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": `https://api.appmonsta.com/v1/stores/android/details/${x}.json?country=US`,
        "method": "GET",
        "headers": {
          "Authorization": `Basic ZGJlZTg3OWNkMzlhY2JhZmZiNzcwZmI0ZTIyYjAzOTEyYzc0NmY2YjpwYXNz `,
         
                               
          
        },
        
      
        "success": function(APIresponse) {
            console.log(`response is ${x} `, APIresponse.related.related_apps);
            for(var i=0;i<APIresponse.related.related_apps.length;i++){
                console.log("API GAME RELATED",APIresponse.related.related_apps[i]);
            loop(APIresponse.related.related_apps[i]);
            }
          
        },
        error: function (e) {
            console.log(x); 
            console.dir(e)   
        }
    });

}//end insertDBfromAPI()
function loop(x){
    if(count>90){
        console.log("num",num);
        num++
   
        count=0;
    }else{
        console.log("Count",count);
        count++;
    }
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": `https://api.appmonsta.com/v1/stores/android/details/${x}.json?country=US`,
        "method": "GET",
        "headers": {
          "Authorization": `Basic ${keys2[num]}`,
                                    
                               
          
        },
        
      
        "success": function(APIresponse) {
            console.log(`response is ${x} `, APIresponse.related.related_apps);
       
            //console.log('name', response['app_name']);
              //generateDOM(response.data);
            insertIntoDB(APIresponse);
        //     for(var i=0; i<response.data.length; i++) {
        //         generateDOM(response.data[i]);          
        //   }
        },
        error: function (e) {
         num++
        }
    });


}
function insertIntoDB(APIresponse) {
  
    let relatedApps=APIresponse.related.related_apps.join();
    let screenshotUrls=APIresponse.screenshot_urls.join();
    let videoUrls=APIresponse.video_urls.join();
    let permissionApi=APIresponse.permissions.join();
    var url = 'http://localhost/appmostatest/appmonstaTest/server.php?action=insertAPI';
    var ajaxData = {
        action: 'insertAPI',
        app_name: APIresponse.app_name,
        related_apps:relatedApps,
        content_rating:APIresponse.content_rating,
        requires_os:APIresponse.requires_os,
        video_urls:videoUrls,
        iap_price_range:APIresponse.iap_price_range,
        publisher_name:APIresponse.publisher_name,
        game_id:APIresponse.id,
        icon_url:APIresponse.icon_url,
        publisher_url:APIresponse.publisher_url,
        screenshot_urls:screenshotUrls,
        description:APIresponse.description,
        all_rating:APIresponse.all_rating,
        store_url:APIresponse.store_url,
        release_date:APIresponse.release_date,
        permission:permissionApi,
        genre:APIresponse.genre,
        price: APIresponse.price
    };

    $.ajax({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: ajaxData,
        success: function(response) {
            console.log('AJAX CALL response is ', response);
            //console.log('name', response['app_name']);
            //generateDOM(response.data)
        },
        error: function () {
            console.log('server not response');    
        }
    });
}


function getData() {
   // alert('db Info app ');
    //var url = "https://api.appmonsta.com/v1/stores/android/details/com.atomicadd.fotos.json?country=US" ;
   var urls ='http://localhost/appmostatest/appmonstaTest/server.php';
    $.ajax({
        url: urls,
        method: 'get',
        dataType: 'json',
        // headers: {
        //     "Authorization": "Basic YWU1NTliYzc5MWNhZTllNWZmYjFlNGEzMTA4MjI5YzRkZTU3NDRhMzoxMTEx"
        // },
        data: {
            action: 'readAll'
        },
        success: function(response) {
            console.log('response is ', response);
            
            $('body').html(response.data[16].description
            );
            //console.log('name', response['app_name']);
            //generateDOM(response.data);

        //     for(var i=0; i<response.data.length; i++) {
        //         generateDOM(response.data[i]);          
        //         //student_array.push(studentRecord.data[i]);
                
        //   }
        },
        error: function (r) {
            console.log('server not response:',r);    
        }
    });
}

// Response['app_name']
// id
// description
// genre
// price
// publisher_url
// store_url
// icon_url
// description
// whats_new
function generateDOM(response) {
    console.log('inside dom response is ', response);
   
    //console.log('inside generateDOM des: ', response.description);
    // var description = JSON.stringify(response.description);
    // var text = $('<td>').html(description);
    //console.log('inside generateDOM genre: ', response.genre);
    //console.log('inside generateDOM id: ', response.id);
    var tr = $('<tr>');
    var tdAppName = $('<td>', {
        text: response['app_name']
    });
    
    var tdID = $('<td>', {
        text: response.id
    });
    var tdgenre = $('<td>', {
        text: response.genre
    });
    var tdDescription = $('<td>', {
        //text: text
        text: response.price
    });

    tr.append(tdAppName);
    tr.append(tdID);
    tr.append(tdgenre);
    tr.append(tdDescription);

    $('.app-list tbody').append(tr);
}
