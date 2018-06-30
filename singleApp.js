$(document).ready(init);

function init() {
    $('#dbInfoButton').click(getData);
    $('#apiInfoButton').click(insertDBfromAPI);
}
var num=0;
for(var x=0;x<150;x++){
    insertDBfromAPI();
}
function insertDBfromAPI() {
  num++
    //var url = "https://api.appmonsta.com/v1/stores/android/details/com.atomicadd.fotos.json?country=US" ;
    var url = "https://api.appmonsta.com/v1/stores/android/details/us.koller.cameraroll.json?country=US";
    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        headers: {
            "Authorization": "Basic YWU1NTliYzc5MWNhZTllNWZmYjFlNGEzMTA4MjI5YzRkZTU3NDRhMzoxMTEx"
        },
        // data: {
        //     action: 'readAll'
        // },
        success: function(APIresponse) {
            console.log(`response is ${num} `, APIresponse);
            //console.log('name', response['app_name']);
              //generateDOM(response.data);
            insertIntoDB(APIresponse);
        //     for(var i=0; i<response.data.length; i++) {
        //         generateDOM(response.data[i]);          
        //   }
        },
        error: function () {
            console.log(`no more request ${num} `);    
        }
    });

}//end insertDBfromAPI()

function insertIntoDB(APIresponse) {
    console.log('in insert into DB response is', APIresponse);
    console.log(APIresponse.genre);
   
    var url = 'server.php';
    var ajaxData = {
        action: 'insertAPI',
        app_name: APIresponse['app_name'],
        id: APIresponse.id,
        genre: APIresponse.genre,
        price: APIresponse.price
    };

    $.ajax({
        url: url,
        method: 'get',
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
   var url = 'server.php';
    $.ajax({
        url: url,
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
            //console.log('name', response['app_name']);
            //generateDOM(response.data);

            for(var i=0; i<response.data.length; i++) {
                generateDOM(response.data[i]);          
                //student_array.push(studentRecord.data[i]);
                
          }
        },
        error: function () {
            console.log('server not response');    
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
