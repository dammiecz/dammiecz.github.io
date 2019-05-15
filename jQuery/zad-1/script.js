$(document).ready(function()
{
    
    const animacja = () =>
    {
        $('div').animate(
            {
                'width': '100px',
                'height': '100px',
                'margin-left': '100px'
            },
            3000,
            function() {$('div').css('background-color','blue').append('<h2></h2>');
                        setTimeout(function() {$('h2').text('Animacja zakonczona');},500); 
                       }                    
        );
    };    
    
    $('button').click(animacja);
});

