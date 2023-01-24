# Cian's Code Institute Final Grade Calculator - PP2:

![Main Image (Calculator Section)](docs/readme-images/intro-image-large.png)

## [Link to live website](https://lastraeus.github.io/pp2-cians-ci-grade-calculator/)

## __Purpose of the Project__
To create a website that allows Code Institute students (studying the Full Stack Development Course) to simulate what Final Grade they might get by either manually inputting potential Project Grades, or randomly generating possible grades (In various configurations) to generate a corresponding Final Grade. 

Additional Useful information can be provided to the user such as a breakdown of what each project is worth and links to pre-existing “Days until” calculators(to see time left before deadlines in a more practical format) and other useful websites.

## __Research__
__Understanding the Target Problem__

The below image is from a snippet of the assesment rules copied from the Official Assessement guide for the course, found in the Code Institute website learning enviroment.

By understanding the various components of the final grade calculation and bearing them in mind, this focused the project on automating the calculation process and allowing rapid simulation of different grade combinations and their final grade outcomes.

![Official Calculation Weights and rules](docs/readme-images/target-rules-from-official-assessment-guide.png)

__Audience Needs__

“It can be difficult to figure out how much each project grade impacts the final grade at the end of the course”

“I’d love to see a clearer breakdown of how my previous projects have impacted my potential final grade.”

"Having to manually calculate your past grades and potential future ones can be difficult/tedious and time consuming, especially to repeat for different combinations"

__Search For Similar Sites__

I inspected some websites found on google searches for possible similar projects/solutions I might not have thought of but the calculators I found were suited instead to other types of systems and courses.
* [Link to a innapropriate Final Grade Calculator which is based off both percentages & Letter Grades](https://www.rapidtables.com/calc/grade/final-grade-calculator.html)

I had interest in developing additional site functionality non-specific to this course, such as a day's until calculator but this proved to be a exceptionally well trodden road and I narrowed down the project scope to the unsolved problem of the Code Institute grade calculator, and simply link to a existing Day's until calculator instead of re-inventing the wheel.

## __Features__
A single page website featuring:

__1.__	A title, Nav Bar and into blurb for the site. Responsive down to extremely small sizes.

   *	Responsive Main Logo and nav bar. The Nav Buttons quickly scrolls users to relevant sections which may be offscreen and facilitates bookmarking.) Nav buttons include hover highlighting for UX/asthetic considerations. Logo line spacing shrinks as well as Nav Buttons change from text to icons at smaller sizes.

  
  ![Large Header](docs/readme-images/header-wide.png)

  ![Small Header](docs/readme-images/header-narrow.png)

  *	A blurb featuring information about the calculator’s purpose and functionality.

  ![Intro Blurb](docs/readme-images/intro-blurb.png)

__2.__ An expandable modal opened with a button containing the official calculation weights and rules explanation, used by the calander, and for general refference. This modal features:

  *	A button to open the modal.
  ![Modal Button](docs/readme-images/modal-button.png)
  *	Responsive sizeing to display information on all screen sizes in a clear way.
  *	A overlay to focus the user on the newly displayed information and a opacity to encourage the user to realize they can click the overlay area to get back to the site behind. (Clicking the overlay closes the modal)
  *	A specifc "X" to close the modal in it's title as the obvious choice of closing the modal.
  *	A scroll function built into the modal if the screensize is too small to display all content.

  ![Large Size Modal](docs/readme-images/modal-large.png)
  ![Small Size Modal](docs/readme-images/modal-small.png)
  ![Small Size Modal Scrolled down](docs/readme-images/modal-small-scrolled.png)

__3.__	The Final Grade Calculator itself, with two display modes depending on screen size.
  ![Large Size Final Grade Calculator](docs/readme-images/grade-calc-table-wide.png)
  ![Small Size Final Grade Calculator](docs/readme-images/grade-calc-table-small.png)

    *	Selectable grades for each project, which when changed will live update the Total Points (on each row, and final total) as well as the displayed Final Result Grade

  ![Selectable grades](docs/readme-images/selector-click-small.png)

    *	Large/Main Table Mode for Large Screens with potential grades selectable
    *	Truncated table with less padding space and removed least important columns. These are hidden with css media queries and classes for narrow screen sizes.

__4.__ The Calculator will also be controllable by 4 different selections of randomisation which will be:
  * Totally Random Grade Selection 
  * Randomly selected results bounded by only combinations that result in a Final Pass Grade
  * Randomly selected results bounded by only combinations that result in a Final merit Grade
  * Randomly selected results bounded by only combinations that result in a Final distinction Grade



  * These buttons (as well as the above modal button) have been styled with a pleasing 3d effect which seem to press down when clicked.

__5.__ About/Useful Links Page/Contact Form
  * Links to pre-existing Days Until calculator (originally planned to be constructed from scratch on this site, but scope creep was reigned in since this functionality has been done many times before.)
  * Other Useful Links such as to Code Institute Website / Useful Subreddits etc.
  
__6.__	A small footer with copyright and site info on all pages. Looks clean and unintrusive, but clear when read.

### __Color Scheme__
A lighter color scheme with orange/light grey/ and white featured https://coolors.co/ea7600-ececec-717575-ffc180-ffffff 
Site is responsive and adapts to smaller screen sizes while maintaining structure and clarity (even down to extremely small phone sizes.

### __Technology Used__

1.  HTML                Used to build markup stucture of the site.                  
2.  CSS                 Used to provide both global and targated styling to the HTML
3.  Javascript          Used to provide site interactivity.    
4.  GitHub              Used as a repository for the project                        https://github.com/
5.  GitPod              Used as the VDE of the project.                             https://www.gitpod.io/
6.  Firefox             Used as main browser of the project (Browsing, Editing, Dev Tools, Screenshot capablilites)     https://www.mozilla.org/en-US/firefox/new/
7.  Chrome              Used as alt browser of the project (Testing, Dev Tools)     https://www.google.com/intl/en_ie/chrome/
8.  Grammarly           Used to proof this page.                                    https://app.grammarly.com
9.  FontAwesome         Source of fonts used in website.                            https://fontawesome.com/
10.  Unsplash            Source of copyright-free images used in website.            https://unsplash.com/
11.  Pexels             Source of copyright-free images used in website.            https://www.pexels.com/

### __Existing Features__

### __Features Left to Implement__

## Testing
### Validator Testing
__HTML__
__CSS__
__Javascript__
### Unfixed Bugs

## __Credits__
### Content
Misc reference 
https://www.w3schools.com/css/

### Media


