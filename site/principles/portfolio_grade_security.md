---
layout: layout-sidebar
title: Portfolio Grade Security
eleventyNavigation:
  key: portfolio_grade_security
  title: Portfolio Grade Security
  parent: principles
  # order: 42
---

# Portfolio Grade Security

Portfolio Grade Security is defined by this - _**not suitable for production.**_

Portfolio Grade Security means at least these 3 things:

- Adequate for an app or site designed solely to act as a coder's portfolio
- Sufficient to demonstrate more granular skills with basic role based authorization
- Sufficient infrastructure to creat admin of roles for specific users

## Specific exclusions:

- unbreakable security
- updates - real time or other
- custom authentication
- ... many more not mentioned here

## Excellent, but not by Boltup

That portion of security which comes from the Firebase system, which is most of what is provided within the Boltup infrastructure, is excellent by almost any measure. Firebase is a well designed and well maintained system.

That portion of Boltup written by us - which was designed for "first day" highly decoupled app and site setup - this is the weak link in the chain. Since security is no better than the weakest link ... there's the source of the issue.

## No Apology Offered

First day and highly decoupled portfolio app setups are the critical feature offered here.

Since this is much more important to a coder's portfolio than perfect security, no apology is warranted for this decision.

## Pull Requests Welcomed

If you just can't help yourself, and feel that our Portfolio Grade Security needs an upgrade, you are welcome to submit pull requests, however you need to understand how it will be evaluated.

The following aspects will immediately disqualify consideration of any submittal:

- If it adds to the difficulty of the "first day" setup.
- If it tightly couples or becomes an integral part of one or more Secured Starter Apps
- If it doesn't stand alone, or causes one or more [Boltup Starter Apps](/boltup/starter_apps/) to not be able to stand alone and be swappable with security.
- If it is needlessly or measureably more difficult to code against when in a PEG or Portfolio Electives Game

If your submittal is unacceptable for the above reasons, we would be happy to promote your contribution for others, we just can't in good conscience include it in our own Boltup.
