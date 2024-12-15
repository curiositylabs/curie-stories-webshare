# Stories Web

### Description:

Need to create a landing webpage for sharing an existing story in the database for a user. 

This existing story will be accessed from the database using an API call. The data given would be in JSON format, so processing that data and displaying it on the screen according to the respective UI from Figma Designs.


### Local Development
```
deno task build
deno run --allow-net --allow-read --allow-env main.ts
```


### Requirements:

- Mobile Friendly/ Responsive UI Design according to Figma Requirements
  - Priority : Mobile page
- Setup the host server for this developed webpage

### Tasks:

- [x] Working Document
  - [x] Draft 1 - Description, Requirements
  - [x] Draft 2 - Basic Overview of tasks, tech stack and specifications
  - [x] Final: Work done: 28-01-2024 (Sunday)
- [x] Tech Stack and specifications
- [x] Develop
  - [x] Setup deno js, fresh and work environment
  - [x] Get API JSON data onto the Application 
    - [x] dynamic web page generation based on storyID
  - [x] Work on UI elements
    - [x] Top On Screen pop-up
    - [x] Story Showcase UI component with some JSON data
      - [x] Responsive Designs
    - [x] View Story Page component which expands the story
      - [x] Responsive Page Views
  - [x] setup error pages
  - [x] Link between the View story and showcase component
  - [x] Setting up all the routes for access
- [x] Testing
  - [x] functional testing, UI testing from users
- [x] Release and hosting
  - [x] Deno deploy setup
  - [x] Make more changes and test CI/CD
  - [x] Custom Domian: DNS Rules: Validated.
- [x] Documentation and Maintenance
- [x] Wrap up

### Requirement Gathering Meetings:

##### Meeting 0: 

Idea conveyed, postman API share

##### API : 

you can use this in postman to fetch the story. This is the URL format -

https://curie-backend-pwxppjv6ha-uw.a.run.app/stories/<string:profile_id>/<string:id>

profile_id can be random. id is the Story ID. I can send you a few ids to test it out

Few more ids - oaE2iTT2AvIDaH0Kvh9O, o8bV15GtfUSlKwgH8Xxx, s1HDCA1i6GNQW8qPBLb5, vv27qHKDNEnqdbQiGesA

API works based on the story ID, tested the API links with several ids.

##### Meeting 1:

Question: If the Share link is provided by the story sharer, then how do I get the parameters of the story
Answer: 

Ideally I would get the parameters from the URL query and load the webpage from that parameter passed onto the web page request.

My server should be ready to accept this queried parameter request. 

I need to generate a web view story link dynamically based on the URL queried request with story ID parameters that I receive. 

This would also add on some testing for the parameter as input.

### Tech Stack and Specifications:

An API call to the database will be made whenever the share link is accessed, to get the story JSON data.

The application is stateless in this scenario, as there is no relation to the client state. A standalone web page dynamically generated with the JSON API data is used whenever the share link is accessed. So, for such a stateless application and simple UI graphics, deno and fresh framework would be an ideal choice, considering free hosting provided by deno deploy.

Reference: https://deno.com/, https://fresh.deno.dev/ 
Both deno runtime and fresh framework are production ready.

Step 1:

Get JSON data from API, and show the first basic UI elements based on that data. (Stateless, but fetching data through API call and returning it back )

- Dynamic web page creation using storyID parameters done, if given a storyID, for the same link the story showcase share web page.
  - Like given any storyID, a webpage is dynamically generated for the story with the UI

----

#### Task Breakdown

Check all the tasks for the work done through out developing this feature and hosting it.

----

### Future Work:

- The notification to install the app
- Maybe a Header to represent the company (Curiosity Labs)

### Deployment Instructions
A commit automatically triggers a deployment throught GitHub workflow/actions
