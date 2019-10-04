let button = document.getElementById('sobotnie-kodowanie-wiecej');

const scrollDown = (ev) =>
{
    console.log(ev);
    let height = ev.view.innerHeight-120;
    
    const smoothScrollEffect = (int) =>
    {
        let i = int;
        if(i < height+30)
        {
            setTimeout(()=> 
            {
                window.scrollTo(0,i);
                smoothScrollEffect(i + 30);
            },10);
        }
    };    
    smoothScrollEffect(window.scrollY);
};

button.addEventListener('click',scrollDown);
