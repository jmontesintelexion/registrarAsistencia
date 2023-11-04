/// <reference types="cypress" />


const fn = require("../functions/generalFunctions")


describe('Checar asistencia', () => {


  it.skip('Login', () => {

    cy.visit('https://workbeat.com/')
    cy.wait(10000)
    fn.login()
  })


  it('Registrar Asistencia', () => {
       
    cy.visit('https://shell.workbeat.com/')
    fn.login()
    cy.wait(10000)

    cy.get('.sidebar-toggle-button').click()
    cy.get('#container > div > div > div > div > div > div:nth-child(1) > div:nth-child(5) > ul > li:nth-child(7) > span').click()
    cy.get('#RegistrarAsistencia > div > div > div.card-body > div > button:nth-child(1)').contains('Oficina 1')
  })


})