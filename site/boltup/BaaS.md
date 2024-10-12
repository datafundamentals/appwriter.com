---
layout: layout-sidebar
title: Boltup BaaS
eleventyNavigation:
  key: authentication
  title: Boltup BaaS
  parent: shared_infrastructue
  # order: 42
---

# Boltup BaaS

Boltup uses Firebase as a `Backend as a Service` 

Why a BaaS or Back end as a Service? That's [a separate question!]()

## What is Boltup BaaS?

Boltup BaaS is a very minimal amount of code which you add on top of signing up for Firebase - which you do on your own, regardless.

What it adds is: 

- A simple serverless function that gives your Firebase Authentication a JWT with a role and a scope attribute that Boltup Java Spring uses to authorize the JWT.
- Some modestly helpful defaults that you could also have done yourelf easily.
- A project to deploy your primary hosting from
- A project manage your _local_ Firebase emulator (recommended!)

## Why Firebase?

The easy ven diagram plots these 3 competing concerns
- `affordability` (Firebase is free at low volumes)
- `power` (Firebase has many more back end features than we need for demos)
- `convenience` (Firebase is well documented and has been for a decade)

There are other choices available, this one works. I've been using it a long time with good success. (Pete Carapetyan)

## As Currently SetUP

- Hosting platform for HTML, JS, CSS sites (not java)
- Hosts the authentication service
- Sets up Authentication as a JWT for [Boltup Java Spring](yada)
- Runs locally as emulator

## Easy Options:

- large file storage (video, etc. Think AWS SS3)
- Firestore database
- Relational (SQL) database
- too many others to list here