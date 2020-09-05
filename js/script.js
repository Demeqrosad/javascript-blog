'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList: ', titleList);
  titleList.innerHTML = '';
  console.log('titleList-after: ', titleList);

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles)
  {

    /* get the article id */

    const articleID = article.getAttribute('id');
    console.log('articleID: ', articleID);

    /* find the title element */

    const titleElement = article.querySelector(optTitleSelector);
    console.log('titleElement: ', titleElement);

    /* get the title from the title element */

    const title = titleElement.innerHTML;
    console.log('title: ', title);

    /* create HTML of the link */

    const titleLink = '<li><a href="#' + articleID + '"><span>' + 
		title + '</span></a></li>';
    console.log('titleLink: ', titleLink);

    /* insert link into titleList */

    titleList.insertAdjacentHTML('beforeend', titleLink);
    console.log('titleList: ', titleList.innerHTML);
  }

  const links = document.querySelectorAll('.titles a');
  for(let link of links)
  {
    link.addEventListener('click', titleClickHandler);
  }
}


function titleClickHandler(event)
{
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks)
  {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('article.active');
  for(let activeArticle of activeArticles)
  {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const targetArticleHref = clickedElement.getAttribute('href');
  console.log('href: ', targetArticleHref);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(targetArticleHref);
  console.log('targetArticle: ', targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

generateTitleLinks();

function generateTags()
{
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles)
  {

    /* find tags wrapper */

    console.log('article: ', article);
    const articleTagsHTML = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let liHTML = '';

    /* get tags from data-tags attribute */

    const articleDataTags = article.getAttribute('data-tags');
    console.log('articleDataTags: ', articleDataTags);

    /* split tags into array */

    const tagArray = articleDataTags.split(' ');
    console.log('tagArray: ', tagArray);

    /* START LOOP: for each tag */

    for (let tag of tagArray)
    {

      /* generate HTML of the link */

      console.log('tag: ', tag);
      const html = '<li><a href="#tag-' + tag +'">' + tag + '&nbsp' + '</a></li>';
      /* add generated code to html variable */

      liHTML = liHTML + html;

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    console.log('liHTML: ', liHTML);
    articleTagsHTML.insertAdjacentHTML('beforeend', liHTML);

  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event)
{
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('href: ', href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (let activeTag of activeTagLinks)
  {

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tagLink of tagLinks)
  {

    /* add class active */

    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags()
{
  /* find all links to tags */

  const linksToTags = document.querySelectorAll('.post-tags a');

  /* START LOOP: for each link */

  for (let linkToTag of linksToTags)
  {

    /* add tagClickHandler as event listener for that link */

    linkToTag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthor()
{
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles)
  {

    /* find authors wrapper */

    const articleAuthorHTML = article.querySelector(optArticleAuthorSelector);

    /* get author from data-author attribute */

    const articleDataAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */

    const html = '<a href="#author-' + articleDataAuthor.replace(' ', '_') +'">' + 'by ' + articleDataAuthor + '</a>';
    console.log('html with author: ', html);

    /* insert HTML of the link into the author wrapper */

    articleAuthorHTML.insertAdjacentHTML('beforeend', html);

  }
}

generateAuthor();

function addClickListenersToAuthors()
{
  /* find all links to authors */

  const linksToAuthors = document.querySelectorAll(optArticleAuthorSelector + ' a');

  /* START LOOP: for each link */

  for (let linkToAuthor of linksToAuthors)
  {

    /* add authorClickHandler as event listener for that link */

    linkToAuthor.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}

function authorClickHandler(event)
{
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author-', '').replace('_', ' ');
  console.log('Author from href: ', author);

  /* find all author links with class active */

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */

  for (let activeAuthor of activeAuthorLinks)
  {

    /* remove class active */
    activeAuthor.classList.remove('active');

  /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */

  for (let authorLink of authorLinks)
  {

    /* add class active */

    authorLink.classList.add('active');

  /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');

}

addClickListenersToAuthors();