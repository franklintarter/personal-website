// / <reference types="Cypress" />

const paths = require("../paths.json");

const exclude = ["/dev-404-page"];
const filtered = paths.filter(p => !exclude.some(e => p.includes(e)));
const sorted = filtered.sort((a, b) => (a.length > b.length ? 1 : -1));

// sorted = ["http://localhost:8000/"];

Cypress.on(`window:before:load`, win => {
  cy.stub(win.console, `error`, msg => {
    cy.now(`task`, `error`, msg);
    throw new Error(msg);
  });
});

context("Actions", () => {
  sorted.forEach(path => {
    it(`${path} - Has a valid description.`, () => {
      cy.visit(path)
        .get('head meta[name="description"]')
        .should("have.attr", "content")
        .and("not.contain", "null")
        .and("not.contain", "undefined")
        .and("not.eq", "");

      // TODO check char max length
    });
    it(`${path} - Has a valid title.`, () => {
      cy.visit(path)
        .get("head title")
        .should("not.contain", "null")
        .and("not.eq", "")
        .and("not.contain", "undefined");

      // TODO check char max length
    });

    // TODO
    // Print out all titles and descriptions

    // TODO
    // og:title
    // meta image
    // og:url
    // og:image
    // twitter:description
    // twitter:image
    // twitter:title
    // twitter:card
    // og:type
  });
});
