---
layout: layout-sidebar
title: Back End
eleventyNavigation:
  key: authentication
  title: Back End
  parent: common
  # order: 42
---

# dF BaaS

dF uses Firebase as a `Backend as a Service` 

Why a BaaS or **Back end as a Service**? That's [a separate question!](/principles/why_baas/)

## What is dF BaaS?

dF BaaS is a very minimal amount of code which you add on top of signing up for Firebase - which you do on your own, regardless.

What it adds is: 

- A simple serverless function that gives your Firebase Authentication a JWT with a role and a scope attribute that dF Java Spring uses to authorize the JWT.
- Some modestly helpful defaults that you could also have done yourelf easily.
- A project to deploy your primary hosting from
- A project manage your _local_ Firebase emulator (recommended!)

## How To Use It

- do not clone, instead use as template
- modify firebase config to fit your own
- copy relevant code into your specific project (such as functions)
- ignore that which you prefer to set up using firebase init
- modify according to your project's needs

## Why Firebase?

The easy ven diagram plots these 3 competing concerns
- `affordability` (Firebase is free at low volumes)
- `power` (Firebase has many more back end features than we need for demos)
- `convenience` (Firebase is well documented and has been for a decade)

There are other choices available, this one works. I've been using it a long time with good success. (Pete Carapetyan)

## As Currently SetUP

- Hosting platform for HTML, JS, CSS sites (not java)
- Hosts the authentication service
- Sets up Authentication as a JWT for [dF Java Spring](yada)
- Runs locally as emulator

## Easy Options:

- large file storage (video, etc. Think AWS SS3)
- Firestore database
- Relational (SQL) database
- too many others to list here