var $btnMenu = document.getElementById('btnMenu');
var $navbarMenu = document.getElementById('navbarMenu');
var $header = document.querySelector('.header');
document.addEventListener('DOMContentLoaded', onDOMLoad);

function onScroll()
{
  if(window.scrollY >= 200)
  {
    $header.classList.add('header--light');
  }
  else
  {
    $header.classList.remove('header--light');
  }
}

function onClickMenu()
{
  $navbarMenu.classList.toggle('header-menu-list--show');
}

function onDOMLoad()
{
  $btnMenu.addEventListener('click', onClickMenu);
  window.addEventListener('scroll',onScroll);
}
