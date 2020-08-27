'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

 	const titleList = document.querySelector(optTitleListSelector);
 	console.log('titleList: ', titleList);
 	titleList.innerHTML = '';
 	console.log('titleList-after: ', titleList);

  /* for each article */

	
	const articles = document.querySelectorAll(optArticleSelector);
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

		const titleLink = '<li><a href=\"#' + articleID + '\"><span>' + 
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

  /* [DONE] remove class 'active' from all article links  */

	const activeLinks = document.querySelectorAll('.titles a.active');
	for(let activeLink of activeLinks)
	{
		activeLink.classList.remove('active');
	}

  /* [DONE] add class 'active' to the clicked link */

  	console.log('clickedElement:', clickedElement);
  	console.log('clickedElement (with plus): ' + clickedElement);
  	clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

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

