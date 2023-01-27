# Martey's Journal

[TOC]

## January 26, 2023

Today, I worked on:

* Front-end for the in-game shop
* Stitching the navigation from the different
  components together
* Protected the front-end routes behind a login
* Finalized and merged unit tests with the team
* Added additional graphics to the front-end with
  the team
* Refactoring code using Redux

Our goal as a team for the day was to flesh out
the front-end with all of the pieces flowing smoothly
from one to the next without any disturbances. We
also worked extra hours collaboratively to put
things together and to make the front-end appealing
despite it still being in the development stage
towards the MVP.

Today, I learned more about state management and
logic using Lazy Queries and Mutations in RTK
Query. This allowed me to protect the front-end
routes behind a login to properly guide the
user to traverse the happy path.

---
## January 25, 2023

Today, I worked on:

* Started beginning to connect the individual
  components within each team member's scope
  to one another
* Creating the front-end character selection
  page with Edmund
* Discussed maps with Jackie
* Writing unit tests for my endpoints
* Generated image assets using 3rd party
  software with the whole team

The team and I started seeing everything really
coming together and taking a more concrete
form. It was truly an experience to go from
concept to reality and knowing that it was from
all of our collaboration together.

Today, I got to witness AI-generated images which
we are planning to use as assets in the game. It
is both terrifying and mind-blowing to see how
far technology has evolved to be able to have
the ability to generate images by feeding an
AI some prompts, and it able to do so in a matter
of seconds.

---
## January 24, 2023

Today, I worked on:

* Merge Request for the front-end authorization
  (login/logout, signup) with RTK Query with David
* Merge Request for protecting all the back-end
  endpoints with the whole team.
* Refactored the front-end components related to
  characters using RTK Query with Edmund
* Answering questions front-end with Elviza
* Front-end styling with the team
* Discussed maps with Jackie
* Discussed Redux/RTK/Query with the team

This week has been a different experience for
the team as we progressed from heavily working
on the back-end, to now the front-end with all
of its intricacies with state management and
using functional components in React. In the
previous module of the program, we had been
using class-based components to learn how to
navigate legacy code, so it is exciting to be
able to start implementing a more modern
approach using hooks.

Today, we continued using Redux with Redux
Toolkit and RTK Query and found ourselves having
a much easier time writing the logic for the
front-end code.

---
## January 23, 2023

Today, I worked on:

* Signup/Login forms for the front-end with RTK
  Query with David
* Discussed maps with Jackie
* Answering questions page on the front-end with
  Elviza
* Discussed Redux/RTK/Query with the whole team
* Discussed useEffect and dependencies with the
  team

The team and I collaborated on multiple parts of
the overall web app together. We were able to
discuss new topics as well as review previous ones
as we were going through the day coding.

Today, I used RTK Query for the first time, which
seemed complicated at first to set-up, but was
tremendously much easier to use for state
management on the front-end.

---
## January 20, 2023

Today, I worked on:

* Endpoints for retrieving and updating quests
  with Jackie followed by merge request
* Discussed using Redux with Redux Toolkit for
  state and logic management in the front-end
  with the whole group
* Discussed CI/CD with the group

By the end of the day, the group and I wanted to
finish as much of the backend that was necessary
to start working on the front-end of the project.
We were unable to start working on CI/CD due to
time constraints.

Today, I learned more about writing unit tests
while collaborating with another group.

---
## January 19, 2023

Today, I worked on:

* Adding bootstrap for the FE with Edmund
* Merge requests for auth, login/out, and signup backend with David
* Merge requests for my endpoints for retrieving shop items,
* purchasing items, and retrieving character details
* Merge requests for answering questions endpoint with Elviza
* Character details page on the FE with Edmund
* Continued discussion of maps with Jackie
* Reviewed Git commands with the entire group

By the end of the day, the group and I wanted to
finish as much of the backend that was necessary
to start working on the front-end of the project.

Today, I learned more about functional hooks
and the dependencies section of React hooks'
useEffect while collaborating with another
group that was already working on their FE.

---
## January 18, 2023

Today, I worked on:

* Merge Requests for quests, instructors, and
  character tables now containing references
* FE character creation/form without styling
  with Edmund
* Continuing auth with David
* Discussed flow of maps with the group
* Read more on Git and FastAPI query parameters

Our priority for the day was getting the tables
that required references all set up and connected
on the main branch.

We did not spend as much time on the project today
as we had a guest lecturer (Shahzad) host a
review session on these topics:
- Big O Notation
- Recursion
- Searching Algorithms (linear & binary)
- Sorting Algorithms (Bubble, Selection, Insertion, Merge, Quick)
- Treeeeeeeeeees
- Graphs!

After experimenting with using `git log` with
its various options, I learned about alternate
ways to display the log on the terminal. I am
really liking the combination of these options:

    git --no-pager log --decorate=short --pretty=oneline --graph

---
## January 17, 2023

Today, I worked on:

* Adjusted the create a character endpoint
  with Edmund
* Established the relation between the
  characters and class tables
* Discussed quests endpoint with Elviza
* Established the relation between the quests
  and instructor tables
* Discussed authorization and user microservice
  details with David
* Discussed front-end aspects for characters and
  maps with Edmund and Jackie

As a group, we recouped from the long 3-day
weekend to resume our momentum on the project.
While getting started on working on the front-end,
we reviewed as a group concepts including using
link and script tags in HTML.

Today, I got to experience trying out the
Materials UI package for the front-end with
Edmund.

---
## January 15, 2023

Today, I worked on:

* Finished Retrieving shop items endpoint
* Finished Purchasing shop items endpoint
* Started on retrieving Character details
  items endpoint

I worked independently on multiple of my
designated endpoints today. I am unable to
finish the Character details endpoint since
it requires relationships between tables
that are currently not set up yet.

Today, I learned successfully attempted
to refactor my migrations such that the
shops, items, and shop items DBs are
abstracted into separate text files. I
needed to find a way to inject text from
a text file into a SQL statement in a
.py file.

---
## January 13, 2023

Today, I worked on:

* Merge requesting endpoints for maps,
  questions, and characters
* Users endpoints with David
* Discussed strategies for handling
  update with the whole group

As a group, we went through the process
of merge requests together once again
for three issues related to endpoints.
We also practiced explaining code to
one another to foster our own ability
to communicate code verbally in a
clear manner.

We also had social hack hour today and
was able to spend time socializing
with other students from different
cohorts.

Today, I learned more about how the
front-end tackles authentication as I
read more into FastAPI's documentation.

---
## January 12, 2023

Today, I worked on:

* Multiple endpoints with different group
  members
* Setting up pgadmin with David
* Discussed maps with Jackie

We reviewed together as a group how each
endpoint is tackled in the context of
FastAPI. We also worked together as a
group to demonstrate the set up for
pgAdmin on David's computer.

Today, I worked with Edmund on tackling
the update endpoint for characters and in
the process learned more about SQL statements
and their interaction with python linters, as
well as trying out various ways to incorporate
variables into SQL statements in a .py file.

---
## January 11, 2023

Today, I worked on:

* Locked down initial migration tables for
  each component of the game with the group
* Merge requests for initial migrations for
  each member of the group (5 merge requests)
* Discussed questions about Git along with
  Module 3 technical details with Instructor
  Rosheen

The entire group and I tried to finalize the
tables we each were working on in order to
begin merging them into main and executing
merge requests.

Today, I learned more about `git stash` and
`git cherry-pick`, which allows for picking
certain commits from a branch to apply to
another.

---
## January 10, 2023

Today, I worked on:

* Concept mapping and designing maps, quests, and
  questions database tables with the group
* Studied and reviewed Git and feature branch
  development workflow with the group
* Redoing my journal due to lost work from
  `git stash` experimentation

The entire group and I discussed more on how
the concepts of the game are related to each
other and how that is reflected in the database
tables.

We also reviewed Git as a VCS along with its CLI
commands, as well as the process of development
using the feature branches strategy. In the
process of learning Git CLI commands, I lost
work that I had done previously after I used
`git stash` followed by `git clear` without
doing a backup beforehand.

Today, I learned more about Git CLI commands,
especially when to use `git stash` and the
potential consequences that may happen, which
include losing your work if using it without
much caution.
