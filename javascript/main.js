document.addEventListener('DOMContentLoaded', () => {

/*
 *  Side Menu
*/

const postLinks = document.getElementsByClassName('post-link')
const faqSideMenuLinks = document.getElementsByClassName('sidebar-link')
faqSideMenuLinks[0].classList.add('selected')
const faqPosts = document.getElementsByClassName('faq-posts')

for (index = 0; index < faqSideMenuLinks.length; ++index) {
  const className = 'sidemenu-link' + index
  faqSideMenuLinks[index].classList.add(className)
  faqSideMenuLinks[index].addEventListener('click', (e) => {
    const selector = 'section-' + e.target.attributes.href.value
    document.getElementById(selector).scrollIntoView({
      behavior: 'smooth'
    })
  })
}

const clearSelectedSideMenuLinks = () => {
  const selected = document.getElementsByClassName('selected')
  for (var i = selected.length - 1; i >= 0; i--) {
    selected[i].classList.remove('selected')
  }
}

for (var i = postLinks.length - 1; i >= 0; i--) {
  postLinks[i].addEventListener('click', e => {
    e.target.classList.add('selected')
  })
}

// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault()
//     document.querySelector(this.getAttribute('href')).scrollIntoView({
//       behavior: 'smooth'
//     })
//   })
// })

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
  dropdownMenu.classList.add('hide')
}	

/*
 *  Faq
*/

const questions = document.querySelectorAll('div.faq-content > h3')
const subjects = document.querySelectorAll('.content > h1')
for (index = 0; index < subjects.length; ++index) {
  const className = 'sidemenu-ref' + index
  subjects[index].classList.add(className)
}

// generate caret toggles

for(keys in questions) {
  const parent = questions[keys].parentNode
  const wrapper = document.createElement('div')
  wrapper.className = 'toggle-header'
  const upCaret = document.createElement('img')
  upCaret.src = '/img/up-caret.svg'
  upCaret.className = 'faq-caret-up'
  const downCaret = document.createElement('img')
  downCaret.className = 'faq-caret-down'
  downCaret.src = '/img/down-caret.svg'
  const toggleUp = document.createElement('span')
  const toggleDown = document.createElement('span')
  toggleUp.appendChild(upCaret)
  toggleDown.appendChild(downCaret)
  if(parent) {
    parent.replaceChild(wrapper, questions[keys])
    wrapper.appendChild(questions[keys])
  }
  wrapper.appendChild(toggleUp)
  wrapper.appendChild(toggleDown)
}

const content = document.querySelector('content > .wrapper')
const answers = document.querySelectorAll('div.faq-content > p')
for (index = 0; index < answers.length; ++index) {
  answers[index].classList.add('answers')
}
const faqCaretsUp = document.getElementsByClassName('faq-caret-up')
const faqCaretsDown = document.getElementsByClassName('faq-caret-down')
for (index = 0; index < faqCaretsDown.length; ++index) {
  faqCaretsDown[index].parentElement.classList.add('hide')
}
let lastFaqTarget = null

window.onscroll = () => {
  for (index = 0; index < subjects.length; ++index) {
    const subject = 'sidemenu-ref' + index
    const subjectTitle = document.getElementsByClassName(subject)
    const sideMenuSubject = 'sidemenu-link' + index
    const subjectSideMenuLink = document.getElementsByClassName(sideMenuSubject)

    if (subjects[index].offsetTop < window.pageYOffset) {
      for (j = 0; j < subjects.length; ++j) {
        faqSideMenuLinks[j].classList.remove('selected')
      }
      faqSideMenuLinks[index].classList.add('selected')
    }
  }
}

const setFaqCaretUp = () => {
  for (index = 0; index < faqCaretsUp.length; ++index) {
    faqCaretsUp[index].parentElement.classList.remove('hide')
    faqCaretsDown[index].parentElement.classList.add('hide')
  }
}

const openFaqMobileMenu = target => {

  if (target === lastFaqTarget) {
    target.children[2].classList.add('hide')
    target.children[1].classList.remove('hide')
  } else if (lastFaqTarget !== null) {
    lastFaqTarget.children[1].classList.remove('hide')
    lastFaqTarget.children[2].classList.remove('hide')
  }

  const answer = target.nextElementSibling

  if(answer.classList.contains('open')) {
    return answer.classList.remove('open')
  }

  Array.prototype.forEach.call(answers, (item) => {
    item.classList.remove('open')
  })

  setFaqCaretUp()
  answer.classList.add('open')
  target.children[1].classList.add('hide')
  target.children[2].classList.remove('hide')
}

content.addEventListener('click', e => {

  const target = e.target
 
  if (target.classList.contains('toggle-header')) {
    openFaqMobileMenu(target)
    lastFaqTarget = target
  } else if (target.parentElement.classList.contains('toggle-header')) {
    openFaqMobileMenu(target.parentElement)
    lastFaqTarget = target.parentElement
  }

})

/*
 *  Footer
*/

const footer = document.getElementById('footer')
const footerLinks = document.getElementsByClassName('links')
const footerCaretsUp = document.getElementsByClassName('footer-caret-up')
const footerCaretsDown = document.getElementsByClassName('footer-caret-down')
let lastFooterTarget = null

const setFooterCaretUp = () => {
  for (index = 0; index < footerCaretsUp.length; ++index) {
    footerCaretsUp[index].classList.remove('hide')
    footerCaretsDown[index].classList.add('hide')
  }
}

const openFooterMobileMenu = target => {

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

  setFooterCaretUp()
  links.classList.add('open')
  target.children[1].classList.add('hide')
  target.lastElementChild.children[0].classList.remove('hide')
}

footer.addEventListener('click', (e) => {

  const target = e.target

  if (target.classList.contains('header')) {
    openFooterMobileMenu(target)
    lastFooterTarget = target
  } else if (target.parentElement.classList.contains('header')) {
    openFooterMobileMenu(target.parentElement)
    lastFooterTarget = target.parentElement
  }

})

})
