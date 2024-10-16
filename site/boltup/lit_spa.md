---
layout: layout-sidebar
title: Web Component SPA
eleventyNavigation:
  key: lit_spa
  title: Web Component SPA
  parent: starter_apps
  order: 3
---

# Boltup Lit Based Web Component SPA

What is a Lit SPA?

If you're familiar with a typical React app, it's identical in many ways.

Except instead of using React and JSX under the covers, it uses Web Components under the covers, and the basic functionality within the standard browser as a rendering engine.

A very tiny helper library - in this case `Lit` by the google chrome team provides some helper functions to help write Web Components. The code written herein is often similar in semantics and syntax to React code.

This SPA builds and deploys in much the same way as a React app would.

## First Principles:

As with any starter app:

- must pass first day test
- must host decoupled authentication
- must access Boltup BaaS

Specific to this only

- task, signals, ...
- and of course, Lit WCs

