$('.multipledestinations').tinytip({
    tooltip : 'Hello',
    position : 'bottom',
    animation : {
        top : -10
    },
    fix : {
        top: 10,
        left: -5
    },
    speed : 100,
    on : 'click',
    off: 'click',
    preventClose : true,
    onLoad : function(e){
        alert('tool tip box loaded');
    }
});