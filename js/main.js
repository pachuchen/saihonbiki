var now_tutor="main_line";

$(document).ready(function() {
	 $('#story_btn,#tutor_btn,#black_bg,#story_operator,#video_btn').on('click', showContent);
});

function showContent(event){
	event.preventDefault();
	
	var clickId=$(event.currentTarget).attr('id');
	//console.log(clickId);
	switch(clickId)
	{
		case 'story_btn':
				$('#story_area').load("contents/story.html #story",popContents);
			break;

		case'tutor_btn':
				$('#tutor_content').load("contents/main/teach1.html #content",showLightbox);
			break;

		case'video_btn':
				$('#story_area').load("contents/video.html #video",popContents);
			break;	

		case'black_bg':
				$('#black_bg,#content').css('display', 'none');
			break;	
		case'story_operator':
			emptyStoryArea();
			break			
	}
}

function popContents(){
	$('.story_content').css('display', 'block');
	TweenMax.to($('.story_content'),1.5,{top:"30%",ease:Back.easeOut,onComplete:function(){$(".easyhtml5video").css('visibility', 'visible');}
	});
}


function showLightbox(){
	emptyStoryArea();

	$('#black_bg,#content').css('display', 'block');
    TweenMax.from($('#content,#black_bg'),0.4,{scale:0.01,ease:Power0.easeIn});

    $('#'+now_tutor).addClass('tutor_selected');

    $('.tutor_h1 ul li').on('click',changeTutor);
    
    yellowAnimat();

    changeSlide();
}


function changeSlide(){
	 if($(".yellow div").length==0){
		 yellowAnimat();	 	
	 }

	$("#"+now_tutor).addClass('tutor_selected');
	 $('.tutor_h1 ul li').on('click',changeTutor);

	$('.tutor_slideShow').on('click', function(event) {
		event.preventDefault();
		var nowtu;
		var nextSlideURL;
				switch(now_tutor){
					case 'main_line':
						nowtu="main/"
					break;

					case 'branch_bet':
						nowtu="branch/"			
					break;

					case 'single_win':
						nowtu="single/"	
					break;
				}
			nextSlideURL="contents/"+nowtu+$(event.currentTarget).attr('href')+" #content";

		if($(event.currentTarget).attr('href')){	
				$('#tutor_content').load(nextSlideURL,changeSlide);
		}else{
				$('#black_bg,#content').css('display', 'none');
		}
	});
}


function yellowAnimat(){
	$(".yellow").append('<div></div>');
	TweenMax.to($('.triangle'), 1, {margin:"-45px 0 0 0",repeat:-1, yoyo:true});
	TweenMax.to($('.yellow'), 0.4, {borderColor:"#C48B06",repeat:-1, yoyo:true});
}

function emptyStoryArea(){
	$('.easyhtml5video').css('visibility', 'hidden');
	TweenMax.to($('.story_content'),1.5,{top:"100%",ease:Back.easeOut,onComplete:function(){
		$('.story_content').css('display', 'none');
		$('#story_area').empty();
			}
		}
	)
};

function changeTutor(event) {
	 	event.preventDefault();
	 	var tuTarget=$(event.currentTarget);
	 	var loadFile;

	 	//如果是載入的內容增加CLASS，不用把之前的清掉，因為載入的檔案都是原始的狀態，所以不用把之前有加過CLASS的項目，清除CLASS
	 	//$("#"+now_tutor).removeClass('tutor_selected');
	 	
		switch(tuTarget.attr('id'))
			{
				case 'main_line':
						loadFile="contents/main/teach1.html #content";
					now_tutor="main_line";
					break;

				case'branch_bet':
						loadFile="contents/branch/teach_branch.html #content";
					now_tutor="branch_bet";
					break;

				case'single_win':
						loadFile="contents/single/teach_single1.html #content";
					now_tutor="single_win";
					break;	
			}

			$('#tutor_content').load(loadFile,function(){
			$("#"+now_tutor).addClass('tutor_selected');	
			$('.tutor_h1 ul li').on('click',changeTutor);
			changeSlide();

		});

}