var boxSize = 140;
var paddingMTX = 25;
var paddingMTY = 25;
var difficulty = 4;

var arr2d = new Array(5);
var box = [4];
var index = 1;

for(var x = 0; x < arr2d.length;x++){
    arr2d[x] = new Array(5);
    for(var y = 0; y < arr2d.length;y++){
        arr2d[x][y] = 0;
    }
}

$(function(){

    
    $("#frontpage").show(1000,function(){
        $("h1").fadeIn(500);
    }).css("display","flex");;

    $("#difficulty").change(function(){
        difficulty = $(this).val();
        box = [difficulty];
    });
    
    $("button").click(function(){
        $("#frontpage").fadeOut(1000,function(){
            $("#memorytester").fadeIn(1000);
        });
        $("h1").fadeOut(1000);

        for(var x = 0; x < difficulty;){

            var rnd = randomPos(25);

            if(arr2d[parseInt(rnd/5)][rnd%5] === 0){
                arr2d[parseInt(rnd/5)][rnd%5] = x+1;
                x++;
            }
        }

        for(var x = 0; x < arr2d.length;x++){

            for(var y = 0; y < arr2d.length;y++){
                if(arr2d[x][y] > 0){
                    var tempBox = $(`<div class="box" style="left:${paddingMTY}px;top:${paddingMTX}px;"><p style="display:none;">${arr2d[x][y]}</p></div>`);
                    $("#memorytester").append(tempBox);
                    box[arr2d[x][y]-1] = tempBox;
                }
                paddingMTY += boxSize;
            }
            paddingMTY = 25;
            paddingMTX += boxSize; 
        }

        for(var x = 0; x < difficulty; x++){
            box[x].children().delay(x*3000).fadeIn(1000).delay(1000).fadeOut(1000);

            if(!x){
                setTimeout(function(){
                    $(".box").one("click",function(){
                        if($(this).children().html() == index){
                            index++;
                            $(this).append('<img src="icons8-checkmark-64.png" id="icon"/>');
                            if(index-1 === difficulty){
                                $(this).parent().append(`<div id="message">YOU COMPLETED LEVEL ${difficulty}.PRESS F5 TO PLAY AGAIN.<div>`);
                                $(this).parent().children().css({backgroundColor:"green"});
                            }
                        }else{
                            $(this).parent().children().unbind("click");
                            $(this).parent().append(`<div id="message">YOU FAILED LEVEL ${difficulty}.PRESS F5 TO PLAY AGAIN.<div>`);
                            $(this).parent().children().css({backgroundColor:"red"});
                            $(this).append('<img src="icons8-circled-x-50.png" id="icon"/>');
                        }
                    });
                },(difficulty)*3000);
            }
        }
    });
});

function randomPos(max){
    return Math.floor(Math.random() * max);
}