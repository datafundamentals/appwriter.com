---
layout: layout-sidebar
title: index
eleventyNavigation:
  key: boltup
  title: Boltup
  # parent: boltup
  order: 3
---

# Boltup

If PEG is a game for proving your skills with electives, then Boltup is the equivalent of a playing board. A canvas to paint your colors on, if painting was the analogy.

Please see [this](/membership) if there is any question about your qualification requirements.

What prevents success with a 10 app portfolio showing off skills with 20 or more electives? Usually we burn all our time budget on the app basics, which have little to do with the electives being demonstrated.

## Boltup is a Host Collection for Electives

#### Shared Infrastructue:

- Boltup Authentication
- Boltup BaaS

#### Secured App Starters

- Boltup Spring Boot
- Boltup Lit SPA
- Boltup SSG PWA

Pending:

- node/express
- python
- Boltup React
- 

## Focus on the Demonstrating Electives

We want you to be able to build your Portfolio Electives based on decoupled standards.

Technology stacks used for Boltup is as decoupled or as standard as we can make it:

- Firebase for BaaS - Back End Infrastructure
- Web Components (Lit based) for SPA
- React because - well, it owns the market
- 11ty as the SSG

Boltup Infrastructure and Secured App Starters are designed to work as well as reasonably possible, with each other.

## Firebase

Notes here from elsewhere on how Firebase is free and fully featured

## How To Re-Create Your Own

The main thing is you want it to be tightly coupled enough to both your BaaS and Authentication piece to work, but otherwise as decoupled as possible so that you can swap out front ends whenever you wish.

Once you get a job, your new boss will probably want you to stick with this or that front end. Until then - yeah you need to show your boss that you can handle it, no matter what front end he pairs you with.

Sequence:

- pair up your authentication widget
- pair up your back end
- do enough hello-world stuff to POC that everything works

Swapping out authentication and back ends:

- any authentication OK as long as it works with back end and your front end
- any back end works as long as it works with your authentication and front end
- pay special attention when you can't swap out front ends easily without touching back end or authentication
- pay special attention when your back end costs too much or has limited capabilities
- pay special attention when you are doing your own authentication. Very bad.




