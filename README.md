# project2


## New Things

- only match the group on the enum list
```
category: {
        type: String,
        enum: ["Mixed genres", "Trance", "Techno", "House", "DnB", "Trap", "Hardstyle", "Others"]
    },
```

- prefix the route under the controllers
```
app.use("/events", authController)
app.use("/events", eventsController)
```

- Take out logout button on Register & Login pages by editing head.ejs

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

```
<label for="category">Category:</label>
            <select name="category" id="category">
                <% categories.forEach((category) => { %>
                    <option <%= category === event.category ? 'selected' : '' %>><%= category %></>
                  <% }) %>
            </select>
```
<!-- &copy; -->

# Credits:
Icon: https://icons8.com/
Unsplash: https://unsplash.com/

# need to solve:
- how to retain image file on edit.ejs