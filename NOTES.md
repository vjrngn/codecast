This document outlines the features, data model etc of codecast. It serves to be a single
pane of glass for a high level view of the architecture of the project.

This is an evolving document and will change as the high level design and requirements
of the project grows.


### Data Model

1. Videos
  - uuid
  - title
	- url
  - description 
	- published\_at

Videos can exist by themselves and don't need to be part of a course. A video is the "base" unit
of consumption in codecast.

A video may be associated with any number of tags.
----

2. Courses
  - uuid
  - title
	- description
	- published\_at
	- listed_price

A course is a collection of videos. A course may be free or paid.

The description of the course allows administrators to store HTML content 
of their course description to display to the end-user. The description of 
the course is populated by the use a very light-weight CMS implementation 
that is only accessible to course creators.
----

3. Tags
  - uuid
  - name

Tags are a way to attach labels to both courses and videos.
----

4. course\_video
  - course\_id
	- video\_id
	- is\_preview

Holds the list of videos associated with a given course. Videos
in a course may be marked as a 'preview' video to allow the consumer
to get a sneak-peek of what the course is about.
----

5. content\_tag
  - tag\_id
  - course\_id?
	- video\_id?

Videos and courses may be labelled with tags.
----

