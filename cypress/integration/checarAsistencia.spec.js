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
    cy.wait(10000)
    cy.get('#RegistrarAsistencia > div > div > div.card-body > div > button:nth-child(1)').contains('Oficina 1')
    cy.wait(15000)

      var date, today;
      var t = ""
      var d, m, y;
  
      cy.get(':nth-child(1) > .column_0 > div').then(function(e){
          t = Cypress.$(e).text()
          cy.log(t)
  
          d = String(t).substring(0,2) //OBTENER EL DIA
          m = String(t).substring(3,5) //OBTENER EL MES
          y = String(t).substring(6,10)  //OBTENER EL AÑO

          date = "${d}/${m}/${y}"

          var td = new Date();

          d = td.getDate().toString().padStart(2, '0')
          m = td.getMonth().toString().padStart(2, '0')
          y = td.getFullYear().toString()

          today = "${d}/${m}/${y}"

          if(date == today){
            cy.get(':nth-child(1) > .column_1 > div').then(function(e){
              t = Cypress.$(e).text()
              cy.log(t)

              if(t.toString() == "Falta"){
                cy.log("HAGO DE CLICK PARA LA ASISTENCIA")
                cy.get('#RegistrarAsistencia > div > div > div.card-body > div > button:nth-child(1)').click()
              }
              else{
                cy.log("YA SE REGISTRÓ LA ASISTENCIA")
              }
      
              })
          }
          else{
            cy.log("NO ES EL DÍA DE HOY")
          }
      })
  })


})