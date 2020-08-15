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

```rb
# Users:
## has_many :flights, :accommodations, :activities, :others
## has_many :trips
## has_many :reservations, through :trips
rails g scaffold user username password_diggest
# Reservations by type:
## belongs_to :user
## has_one :reservation
rails g scaffold flight user:references nickname confirmation_number cost:decimal{6.2} on_date:date time:time airline flight_number from_city to_city
rails g scaffold accommodation user:references nickname confirmation_number cost:decimal{6.2} location check_in_date:date check_out_date:date 
rails g scaffold activity user:references nickname confirmation_number cost:decimal{6.2} on_date:date location details
rails g scaffold other user:references nickname confirmation_number cost:decimal{6.2} on_date:date location details
# Itineraries:
## belongs_to :flight, :accommodation, :activity, :other
## has_many :trips
## has_many :users, through :trips
rails g scaffold reservation flight:references accommodation:references activity:references other:references
## belongs_to :user
## belongs_to :reservation
rails g scaffold trip user:references reservation:references
```

#### Routes

| Prefix | Verb | URI Pattern | Actions |
| :---: | :---: | :----: | :-----: |
| registrations | POST | /registrations | Register as a new user |
| sessions | POST | /sessions | Login as a user |
| flights, accommodations, activities, others | POST | */flights* etc. | Create a new reservation |
| *-idem-* | READ | */flights* etc. | Get and render existing reservations by user |
| *-idem-* | PUT | */flights* etc. | Update reservation information |
| *-idem-* | DELETE | */flights* etc. | Delete a reservation |
| reservations | POST | */reservations* | Create corresponding reservation |
| trips | POST | /trips | Link reservation to user |

#### API Configuration

#### React Architecture

#### Authentication

Authentication was built in Rails using bcrypt and rack-cors gems. Users are able to register, login, and logout using http cookies.

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