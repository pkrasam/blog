document.addEventListener('DOMContentLoaded', () => {

/*
 *  Side Menu
*/

window.scrollToSpot = (elm) => {
	const element = document.getElementById(elm.id)
	element.scrollIntoView()
}	

/*
 *  Nav Bar
*/

const bars = document.getElementById('nav-toggle');
const sideNav = document.getElementById('burgernav');
const overlay = document.getElementById('overlay');

function toggleNav(e){
  sideNav.classList.toggle('dropped');
  document.body.classList.toggle('active-nav');
}

sideNav.addEventListener('click', function(e){
  // if a tag has a #id for the href
  if( e.target.nodeName === 'A' && e.target.hash){ toggleNav(); }
});


bars.addEventListener('click', toggleNav);
overlay.addEventListener('click', toggleNav);

/*
 * Drop down
 *
 * Supports multiple dropdowns
*/

const dropdownMenus = document.getElementsByClassName('dropdown');

Array.prototype.forEach.call( dropdownMenus, function( item, index, arr ){
  // add event listeners to all dropdown elements
  item.addEventListener( 'mouseover', showDropDown );
  item.addEventListener( 'mouseleave', hideDropDown );
});

function showDropDown( e ){
  const target = e.target;
  // if dropdown link then dont show dropdown
  if( target.nodeName !== 'A' ||
     e.fromElement.classList.contains('dropdown-menu') ) { return }

  const dropdownMenu = target.nextElementSibling;
  dropdownMenu.classList.remove('hide');
}

function hideDropDown( e ){
  const dropdownMenu = e.fromElement.lastElementChild;
  dropdownMenu.classList.add('hide');
}	

/*
 *  Footer
*/

// variable declarations

const footer = document.getElementById('footer')
const footerHeader = document.getElementsByClassName('header')
const footerLinks = document.getElementsByClassName('links')
const footerCaretsUp = document.getElementsByClassName('footer-caret-up')
const footerCaretsDown = document.getElementsByClassName('footer-caret-down')
let lastFooterTarget = null

// functions

const setCaretOrientationToClosed = () => {
  for (index = 0; index < footerCaretsUp.length; ++index) {
    footerCaretsUp[index].classList.remove('hide')
    footerCaretsDown[index].classList.add('hide')
  }
}

const open = (target) => {

  if (target === lastFooterTarget) {
    target.children[1].classList.remove('hide')
    target.lastElementChild.children[0].classList.add('hide')
  } else if (lastFooterTarget !== null) {
    lastFooterTarget.children[1].classList.remove('hide')
  }

  const links = target.nextElementSibling

  if(links.classList.contains('open')) {
    return links.classList.remove('open')
  }

  Array.prototype.forEach.call(footerLinks, (item) => {
    item.classList.remove('open')
  })

  setCaretOrientationToClosed()
  links.classList.add('open')
  target.children[1].classList.add('hide')
  target.lastElementChild.children[0].classList.remove('hide')
}

// event listeners

footer.addEventListener('click', (e) => {

  const target = e.target

  if (target.classList.contains('header')) {
    open(target)
    lastFooterTarget = target
  } else if (target.parentElement.classList.contains('header')) {
    open(target.parentElement)
    lastFooterTarget = target.parentElement
  }

})

})
