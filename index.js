
$(document).ready(function(){
  $('.slide').slick({
    autoplay: true,
    arrows: false,
    dots: true
  });
  $('a[href^="#"]:not([href="#"])').click(function(event) {  // link starts with #, but not # alone
    let hash = this.hash;
    let duration = 1000;
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      if ("js-fast-scroll" in event.target.classList) {
        duration = 100;
        console.info('fast scroll');
      }
      let target = $(hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        },
        {
          duration: duration,
          complete: () => location.hash = hash,
        }
      );
    }
  }
  });
});
let i = 0;
togglePriority = (nameAndNumber) => {
  let numberPos = nameAndNumber.search(/[0-9]/);
  let number = nameAndNumber.substring(numberPos);
  let name = nameAndNumber.substring(0, numberPos);
  let otherNameAndNumber = name=="time" ? `cost${number}` : `time${number}`;
  label = document.querySelector(`[for=${nameAndNumber}]`);
  label.classList.add('selected');
  description = document.querySelector(`.description.${nameAndNumber}`);
  description.classList.remove('hidden');
  label = document.querySelector(`[for=${otherNameAndNumber}]`);
  label.classList.remove("selected");
  description = document.querySelector(`.description.${otherNameAndNumber}`);
  description.classList.add('hidden');
}
addOther = () => {
  product = document.getElementsByClassName('product')[0];
  toAppend = document.getElementById('other-products');
  div = document.createElement('div');
  div.innerHTML = "<hr/>" + product.innerHTML;
  div.innerHTML = div.innerHTML.replace(/([a-z])\d/g, `$1${i+1}`);
  console.log(typeof(div.innerHTML));
  div.classList.add('product');
  toAppend.appendChild(div);
  toAppend.classList.remove('hidden');
  i++;
}
