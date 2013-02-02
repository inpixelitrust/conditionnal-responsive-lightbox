/* IE support for this object */
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}
var size = window.getComputedStyle(document.body,':after').getPropertyValue('content');


$(document).ready(function(){
 
	/* we want to add all our a that target an image a class */
	$('a[href*=".png"], a[href*=".gif"], a[href*=".jpg"]').addClass("let-there-be-light");
  	lightboxInit();
});


function lightboxInit() {
  // console.log(size);

  $('.let-there-be-light').click(function(e){
    var positiontop= $(document).scrollTop();
  
  	/* if we get a value for the size var, we have mq */
  	if((size === 'widescreen') || (size === '"widescreen"')) {
  	      e.preventDefault();
  	      var $thisHref = $(this).attr('href');
  	      buildLightBox($thisHref,positiontop);
      }
    else{
     /* we used a mq from 1px to 779 to check if mq is supported or not, if not, we open the bog (old browser that won't use RWD anyway) */ 
    if(!(size === 'mqsupport' || size === '"mqsupport"') ){
        e.preventDefault();
        var $thisHref = $(this).attr('href');
        buildLightBox($thisHref,positiontop);        
      }      
    }

  }); 
}

function buildLightBox(src, positiontop) {
	var height = $(document).height();
	$('<div class="lightbox">').appendTo('body').height(height).html('<img style="padding-top:'+positiontop+'px" src="'+src+'" alt="" />');
  
	$('body').on('click','.lightbox',function(e) {
	$('.lightbox').remove();
  });
}

$(window).resize(function() {
    size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
});