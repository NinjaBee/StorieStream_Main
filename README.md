# StorieStream
Capstone Project



## Project Overview: 

StorieStream is a webapp focused on providing writers with a platform to transform their compositions into interactive web-books they can share with friends, family, and fans.

Integration with Patreon will allow writers to offer StorieStreams to their followers as a reward or bonus for becoming a Patreon. It incliudes a registration page, login, and dashboard displaying current and ongoing projects for the writer as well as one (possibly two) editing areas. Once content has been uploaded, the writer will be able to use the editing panel to add interactive features to their content. 

#### Editing features may include: 

- Mapping a visual non-vertical path for authors content (writing).
- Named location markers to allow both writer and reader to jump to specific locations (for example, the start of chapters or specific visual/audio content).
- Adding stock background images and textures. 
- Adding stock sounds such as non-propriatary music or ocean waves crashing in the background. Two potential options are a player the reader can press "play" on, and an automatic loop that fades in when the reader gets to a designated area, and fades out as they leave it.  

#### Stretch goal editing features may include:

- User uploaded images
- User uploaded sounds/music 
- Editing text colors, fonts, and size 
  
#### StorieStream's user interface has two primary types of interaction, and hence two visually distinct account types. Author, and Reader. 

### 1. The Author account (may also be a Reader).
- May require more information at registration or when exporting/saving content
- Includes a dashboard for projects
- Allows author a simple hosting page for their personal StorieStream Bed 
- Author may restrict access to specific stories based on whether or not the guest has an Oauth code/authentication token/password. 

### 2. The Reader (may also be an Author). 

- Simple sign-up. May not be necessary to sign up simply to view public content posted in an author's StorieBed. 
- Simple login to view conent in their PebbleCollection 
- Stretch goals include:
  - Search function to find Authors and titles by name 
  - A way for readers to browse StreamBeds  
 
  



### Likely Using the Following: 
- Django 2.0 
- PostgresSQL 10.3
- virtualenv with virtualenvwrapper
- Python 3.6 
- JavaScript ES6
- Regex
- AJAX
- Patreon API (Possibly)
- Python Standard libs
  - os, os path
  - random 
  - math
  - decimal
  - datetime, time -
- Pillow
- psycopg2
- GRUNT
- whitenoise 
- sentry_for_error_reporting
- keep_local_envs_in_vcs
  

----- 
Considering: 
 https://docs.python.org/3/library/readline.html 
https://docs.python.org/3/library/crypto.html
http://pyx.sourceforge.net/examples/text/textalongpath.html
https://w3c.github.io/deviceorientation/spec-source-orientation.html
for saffari on iphone "onorientationchange event and querying window.orientation"  


## App Specific Terms 

- Author libraries referred to as __StorieBeds__
- Reader libraries referred to as __Pebble Collections__ 
- Interface for browsing stories referred to as  __StorieStream__/__Streams__



## Schedule 

#### Start Project: _Monday, March 26th, 2018_ 
- ~~Create project in virtualenv~~ 
- Create user registration and login app 
##### Notes 
  - Include security measures where possible for user authentication, etc. Double check later.
  - Include an area to either add an "alpha tester" code for free access or "betta tester" for discounted access
  - Link to TOS page 
- Create 2 user groups (Author and Reader) 
- Consider creating a 3rd "user group" for moderation purposes later on. 
  - moderation group should have ability to view any Author/Reader's content and disable the account. 
  - Disabling an account should send a notification email that the site is having issues 
  - "BL" the account should 

#### Complete Milestone 1.0 
- Create editing app
- View/app to view and scroll along text set to a path. 

#### Milestone 1.1 _ 
- Add view/page that holds unfinished projects _possible this is included in the model that uploads content to be edited_
- Add library apps for Author StorieBeds and Reader Pebble Collections 
- Make sure library apps have genre filtering capacity/tagging capacity 


#### Complete Milestone 1.2 
- Add editing view or modify upload area to be an ~~editing area + upload area~~
- Add ability for author to set path. 
- Make sure author can work on multiple projects/select projects. 

#### Complete 1.4  
- Add stock images
- Add stock sounds
- Work on finding a way to add them to the file. Drag and drop?

#### Complete Milestone 1.6 
- Access accelerometor data to move along text path 
- Improve user app profile content display (allow user image, maybe create bio section... )

#### Complete Milestone 1.8
- Create user specific image and sound folders 

#### Milestone 2.0 
- Author can add bold/italic text
- Author can adjust the width of text path 
- Author can grant access to completed projects. 
- Reader can add books they have access to to their Pebble Collection. 

#### Milestone 2.1 
- Reader can add bookmarks 
- Author can add coordinate markers and name them/link to them for a table of contents. 
- Table of contents app? In text? Links in the document that jumps to a t location? 

#### Milestone 2.6
- Webapp has a pleasing appearance. 
- Smooth the edges of the user interface
- Generally work on GUI appearance 
  

#### Milestone 2.8  
- ~~Make sure I know how to host Webapp online~~ 
- Soft launch app to AWS

#### Thursday, April 12th, 2018 
- Adjust app for presentation 
- Test

### Friday, April 13th, 2018 
- Present app 

#### Milestone 3.0 
- Add an area to browse webooks by genre, author, or all 
  - Possible extentions for browsing: Books aimed at specific age ranges, length, Picture-book or plain text... 
  
#### Milestone 3.3 
- Add additional editing features -- Not sure what these are yet. 
- Drag and drop CSS styling to content? (Paralax images! :wink: ) 
- Allow Reader to highlight sentences 
- Allow Reader to share public StoriePebbles to their social media? 



---
# Notes  
- Need a back/undo button 
- possibly need three user-types (Author, Reader, Moderation/not-top-level admin)
- Will either need to build in moderation functionality to apps or create a model that can moderate/both
- Need to adjust the speed of scroll. It goes very fast. 
- Need to find out why it only shows divs on Chrome. 





