# Project 2 - RobDido Music Festival Collection App
A place where you can save your favorite electronic music festivals. 
You may access it at [here](https://robdido.herokuapp.com/)
You may use the following user information to sign in:
- username: rubberdork
- password: 123456

## Project Description
Built my first full-stack application project based on one of my favourite things to do - attending electronic music festivals!

## Technologies Used
1. HTML
2. CSS / Bootstrap
3. Javascript
4. DOM
5. Node.js
6. Express
7. Mongoose

## Features
1. As a new user, you can register a new account to get access to the website. 
2. For any registered or existing user, they can add a new music festival to the collection, edit/delete an existing music festival.
3. Users can add their favourite music festivals to their wishlist, or delete it from the wishlist.
4. Flash message will be shown everytime user successfully done some actions, e.g. logged in, added new music festival, deleted music festival from wishlist, etc.
5. The website is styled with responsive CSS/Bootstrap.

## Challenges Faced
It took me a while to understand the knowledge needs to be applied into backend. Everytime I understook a concept or topic, I would apply to this project. Therefore, unlike my previous project- Tic Tac Toe that I did the mockup of the webpage first, I did the functionality first for this project:
1. Setup the models - MODEL
2. Setup the CRUD routes - CONTROLLERS
3. Setup ejs files - VIEW
4. Required and initiated necessary middleware - CONTROLLERS
5. Setup static asset files.
6. Setup sessions and Passport for authentication.
7. Setup the login and register routes.
8. Setup Flash, Cloudinary and Error Handling at last.

The second biggest challenge is Bootstrap part. Although Bootstrap is CSS framework, however we still need to get familiar with the shorthand code to apply, as if learning a (slightly easy) new language.

## Things I have learnt from this project
* The process of building a full-stack application and too many other things!

But here are some interesting and new code/things I have learnt by doing this project:
- Link 2 different models to each other by using Normalization or Reference Data Models, then convert the ObjectID to string and populate it. 

- Prefix the route under the controllers (Although this has caused me run into many errors by neglecting to include "/events" in some of my routes.)
```
app.use("/events", authController)
app.use("/events", eventsController)
```

- How to pre-select the event its own category in a dropdown menu by using ternary operator
```
<div class="form-group">
            <label for="category">Category:</label>
            <select class="form-control" name="category" id="category">
                <% categories.forEach((category) => { %>
                    <option <%= category === event.category ? 'selected' : '' %>><%= category %></>
                    <% }) %>
            </select>
        </div>
```

- The hardest part of this project: the "wishlist" button only show on the music festival that has not been added to the wishlist. 
I first did a conditional statement at the show.ejs as follows. However, it will also remove the wishlist button on the music festival that is not on the wishlist.
WRONG APPROACH:
On show.ejs
```
<% for (let list of user.wishList) { %>
        <% if (list.title === event.title) { %>
            <% if (list._id.valueOf() === event._id.valueOf()) { %>
                <button>Added into Wishlist</button>
            <% } else if (list._id.valueOf() !== event._id.valueOf()) { %>
                <form method="post" action="/events/wishlist/<%= event._id %>?_method=PUT">
                    <button type="submit">Add to Wishlist</button>
                </form>
            <% } %>
        <% } %>
    <% } %>
```

In additional, rather than doing this in the ejs file, this should be better to do it in the route handler file. 
CORRECT APPROACH:
On events.js (routes controller)
```
// SHOW
router.get("/:id", async (req, res, next) => {
//...
        const isInWishlist = user.wishList.some((item) => {
            return item.title === event.title 
        })
        // if return true, means the event is in the wishlist. button: "Added to wishlist"
//...
```
On show.ejs
```
<% if (isInWishlist) { %>
    <button class="btn btn-outline-success">Added into Wishlist</button>
<% } else {  %>
    <form method="post" action="/events/wishlist/<%= event._id %>?_method=PUT">
        <button type="submit" class="btn btn-outline-success">Add to Wishlist</button>
    </form>
<% }  %>
```

## Improvement and Problem Unsolved
- On edit.ejs I need to find out how to pre-upload or retain the music festival's original image URL. This is the only bug (I have discovered) so far.
- Definitely want to improve the styling better by using Bootstrap.

# Credits
The project could not have be done without the guidance of Dido and Rod from General Assembly and the support from my cohort.

Images are from:
- https://unsplash.com/
- https://icons8.com/
- https://www.flaticon.com/