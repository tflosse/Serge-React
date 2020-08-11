# Serge,

### What is `Serge,`?

After what happened in 2020, we set out to help you bring back the two things we missed most: gathering friends and traveling. 

Serge is your new travel organizer, it compiles your flight, hotel, and other booking details to one place, shares your itinerary with friends, and helps you easily navigate your reservations details to budget for costs and split the bills.

<!-- Plan future trips on the **Serge** *Dashboard* and browse for reviews and recommadations by city when you look for *What's Around*. -->

![logo](https://i.imgur.com/UrKxoYx.png)

### User stories:
*As a user , I can...*

- Organize travel plans and reservations in one place.
- Manually input travel details or let `Serge,` scan my confirmation emails (Post-MVP).
- Invite friends to specific travel calendars and share my itinerary.
- Get a summary of costs and keep track of what has been paid, deposited, or is owed.
- Directly send or request money from friends for travel expenses (in a future version, or using a Venmo API)

****

## Development

#### User Journey
Pre-auth:
![](https://i.imgur.com/SJzmnfN.png)
With auth:
![](https://i.imgur.com/MlD0IX6.png)

#### Schema & Models
![](https://i.imgur.com/77q2pUT.png)

#### Routes

#### API Configuration

#### React Architecture

#### Authentication

#### External APIs

****

## Design

#### Wireframes

#### Theme & Fonts

Use:
```js
<span className="brand">Serge</span>
```

```js
font-family: 'Bebas Neue', cursive;
font-family: 'Lora', serif;
font-family: 'Roboto', sans-serif;

<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:ital@0;1&family=Roboto:wght@300;400&display=swap" rel="stylesheet">
```
![accents](https://i.imgur.com/3kLIr94.png)
![lora](https://i.imgur.com/yxGJ0xw.png)
![roboto-light](https://i.imgur.com/xX1T8wk.png)

###### Colors:
![Algarves](https://i.imgur.com/jZOsvcP.png)
Logo: rgb(3,52,76)
```js
colors: {
    royalblue: #032637 | rgb(3,38,55),
    offwhite: #F2ECF0 | rgb(242,236,240),
    teal: #2E8C8E | rgb(46,140,142),
    peach: #EFB67B | rgb(239,182,123),
    brick: #D87A51 | rgb(216,122,81),
    nude: #DDB8A9 | rgb(221,184,169)
}
```

#### Page Layouts