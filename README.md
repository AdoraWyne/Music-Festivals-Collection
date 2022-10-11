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