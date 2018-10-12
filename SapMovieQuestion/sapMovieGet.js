
const client = require('https');
var country = "A";
var targeturl = "https://jsonmock.hackerrank.com/api/countries/search?name="+country+'&page=';




  

var responseBody="";
var result =0;
var tpages = 0;
var output = [];
//res is an instance of httpIncomingMessage
client.get(targeturl+'1', (res)=>{
    res.setEncoding("UTF-8");
    let body = "";
    res.once('data', (chunk)=>{
        console.log('callback executing for data event');
        body+=chunk;
        console.log("chunk recvd: ", chunk );
        console.log('================================');
        
    }).on('end', ()=>{
        console.log('callback executing for end event');
        tpages = JSON.parse(body).total_pages;
        console.log('tpages: ', tpages);
        output.push(JSON.parse(body).page);
        for(var i=2; i<=tpages; i++){
           ((i)=>{
            client.get(targeturl+i.toString(), (res)=>{
                let body = "";
                res.on('data', (chunk)=>{
                    
                    console.log('callback executing for  data event: ', i );
                    body+=chunk;
                   
                }).on('end', ()=>{
                    console.log('callback executing for end event: ', i);
                    console.log("-------------");
                    console.log('body is: ', JSON.parse(body).page);
                    output.push(JSON.parse(body).page);
                    for(var x=0; x< output.length; x++)
                        console.log(output[x]);
                        //how do i print the output array only once? i.e after all the
                        //queries append the result.
                    console.log("+++++++++++++++++++++++++++++++++");
                }).on('error', (er)=>{
                    console.log("some error: ", er.toString());
                })
            })
           })(i); 
            
        }
        
    })
    
})

// var reqall = function(nextpage){
    
//     client.get(targeturl+nextpage, (res)=>{
//         res.setEncoding("UTF-8");
//         res.once("data", (chunk)=>{
//             console.log("reqall inside started");
//           var  responseBody=chunk;
//             console.log(responseBody);
//             var parsedresponse = JSON.parse(responseBody);
//             nextpage = parsedresponse.page+1;
            
//             var temp=0;
//             for(var i=0; i<parsedresponse.data.length; i++){
//                 if(parsedresponse.data[i].population >p ){
//                     temp++;
//                     console.log(parsedresponse.data[i].name);
//                 }
                
//             }
//             var retval = {'nextpage': nextpage, 'tempsum':temp};
//             return retval;
//         });
//     })
// } 

// var req = client.get(targeturl+"1", (res)=>{
//     console.log("response rcvd");
//    // console.log(`url is: ${targeturl}`);
//     res.setEncoding("UTF-8");
//     res.once("data", (chunk)=>{
//         responseBody+=chunk;
//         console.log(responseBody);
//         var parsedresponse = JSON.parse(responseBody);
//         totalpages = parsedresponse.total_pages;
//         console.log(parsedresponse.total_pages);
//         console.log();
//         console.log();
//         for(var i=0; i<parsedresponse.data.length; i++){
//             if(parsedresponse.data[i].population >p ){
//                 result++;
//             }
//             console.log(parsedresponse.data[i].name);
//             console.log();
//             console.log();
//         }
//         var nextpage = parsedresponse.page+1;
//         while(nextpage<=totalpages){
//             var tempresult=reqall(nextpage);
            
//             console.log(tempresult);
//             result+= tempresult.tempsum;
//             nextpage = tempresult.nextpage;
//         }
//         console.log(result); 
//     });
    
// })

