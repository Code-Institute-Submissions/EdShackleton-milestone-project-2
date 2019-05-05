THE HOLIDAY HELPER

The Holiday Helper was created to provide an easy way to plan your holiday.
With a few simple clicks, you can know where you're going, where you're sleeping, where you're eating, and what you're visiting.
The focus with this project was simplicity, making it as easy as possible for the user to work out what to do with their holiday.



UX

I wanted to make this website for holiday-goers of all ages, by making the process as obvious as possible.
They can see hotels, restaurants, and sights of their chosen place, along with user ratings to help work 
out where they'd like to go.
I used repetition to make this as simple for the user a I could. I acheieved this
by constantly updating the page, so the user knew to press the same button to continue, knew where the results
would be. I deviated from my initial framework for this reason, initially the reset button would be next to the 
next button, however when arriving at the results page, I needed to move it to the top corner. I moved it permenantly
to the corner to avoid any confusion.
To be on the safe side, I added an evolving title at the top, which prompts the user what page they are on and what they are selecting.

Here is a link to my initial framework:
https://docs.google.com/presentation/d/1eS6gdvzqeXR-zi_645XLYlKzeHEZM96zIK_5DFSB0Pw/edit?usp=sharing



FEATURES

In this section, you should go over the different parts of your project, and describe each in a sentence or so.

Existing Features

Search bar - Allows users to search for the city of their choosing.
Autocomplete - The search bar will give suggestions as the user types.
Selection box - The selection box appears, showing the user the hotels, restaurants, or sights in the chosen city.
Results - The results page displays all the users chosen hotels, restaurants, or sights.

Future Features

Links to websites to be shown on the results page so users can visit the webpage of the chosen hotel/restaurant/sight.
More in depth user control eg. radius settings for results.

Technologies Used

In this project I used the following:

HTML
https://html.com/

SASS
https://sass-lang.com/
This was used to make the styling process more streamlined.

Bootstrap
https://getbootstrap.com/
This was used to help keep the layout structured and neat.

Google Maps API
https://developers.google.com/maps/documentation/
I used this for the map and search functions.

Javascript
https://www.javascript.com/
This was used for the functionality of the website.

Jquery
https://code.jquery.com
I used this to simplify some Javascript functions.



TESTING

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

I did rigorous testing on the selection box, to make sure you would get consistent results wherever you chose.
Tried to click next with an empty search bar, and added an alert to advise the user to enter a place.
Tested that you could type in a new place half way through selecting items for the previous place. This would originally
add all the items selected from the previous location, as well as the new items from the new location. I fixed this by
clearing the selection arrays everytime the 'Go' button is pressed.
Tested what would happen if nothing was chosen, no results are shown.

I tested this on every screen size available, tailoring the experience to make sure each one looks right. Initially,
there was an issue that caused there to be an overhang of the background image, meaning you could scroll right and down past
the opaque layer. I realised this was being caused by a container-fluid being nested within another container-fluid, and fixed this.

I had trouble getting the google maps to display the markers, thanks to a chat with my mentor, Chris Zielinski, he managed to help me
find the appropriate Maps API information, and I resolved this.



DEPLOYMENT

I deployed the project using Github.

I regularly pushed my code to Github to keep it up-to-date and safe.


In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:

MEDIA

The background photo is the only outside asset, which was taken from:

https://www.istockphoto.com/gb/photos/sand?sort=mostpopular&mediatype=photography&phrase=sand

ACKNOWLEDGEMENTS

I researched other holiday websites to get a feel for the aesthetic, such as https://www.expedia.co.uk/, https://www.inspirock.com/
and https://travelplanners.co.uk/

I also used https://coolors.co/ to help choose my color scheme.