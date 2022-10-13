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

<!-- &copy; -->