
function retryClickElement(e1, e2){

    cy.log("RETRY")

    var t = ""
    cy.get(e1).then(function(e){
      t = Cypress.$(e).is(":hidden")
      cy.log(t)
      
      if(t){
        cy.log("RETRY1")
        cy.get(e2).click()
        cy.wait(7000)

        cy.get(e1).then(function(e){
            t = Cypress.$(e).is(":hidden")
            cy.log(t)

            if(t){
                cy.log("RETRY2")
                cy.get(e2).click()
                cy.wait(7000)
            }
        })
        }

    })

   
}


function retryClickElementChildClass(btnList, fatherelement, childelement, listOption){

    cy.log("RETRY LENGTH ELEMENT")

    var t = ""
    cy.get(fatherelement).then(function(e){
      t = Cypress.$(e).find(childelement).length
      cy.log(t)
      
      //SIDE PANEL NO SE DEPLIEGA
      if(t == 0){
        cy.log("RETRY LENGTH ELEMENT 1")
        cy.get(btnList).click()
        cy.get(listOption).click()
        cy.wait(7000)

        cy.get(fatherelement).then(function(e){
            t = Cypress.$(e).find(childelement).length
            cy.log(t)


            //SIDE PANEL NO SE DEPLIEGA
            if(t == 0){
                cy.log("RETRY LENGTH ELEMENT 2")
                cy.get(btnList).click()
                cy.get(listOption).click()
                cy.wait(7000)
            }
        })
        }

    })
   
}



function chooseLaterDate(boxChooseDate, boxAltaDate){

    var date;
    var t = ""
    var d, m, y;

    cy.get(boxAltaDate).then(function(e){
        t = Cypress.$(e).removeAttr('disabled').val()
        cy.log(t)

        d = String(t).substring(0,2) //OBTENER EL DIA
        m = String(t).substring(3,5) //OBTENER EL MES
        y = String(t).substring(6,10)  //OBTENER EL AÑO


        //SI ES FEBRERO (28 DIAS)
        if(m == "02"){
            d = String(parseInt(Math.random()*(28 - 1) + 1, 10))
            m = "03"
        }
        //MESES CON 31 DIAS
        else if(m == "03" || "05" || "07" || "08" || "10" || "12"){
            d = String(parseInt(Math.random()*(31 - 1) + 1))

            //SI ES DICIEMBRE
            if(m == 12){
                m = "01"
                y = String(parseInt(y, 10) + 1)
            }
            //SI TIENE UN CERO ANTES DEL NUMERO
            else if(parseInt(m, 10) < 9){
                m = "0" + String(parseInt(m, 10) + 1)
            }
            else{
                m = String(parseInt(m, 10) + 1)
            }

        }
        //MESES CON 30 DIAS
        else if(m == "01" || "04" || "06" || "09" || "11"){
            d = String(parseInt(Math.random()*(30 - 1) + 1, 10))

            if(parseInt(m, 10) < 9){
                m = "0" + String(parseInt(m, 10) + 1)
            }
            else{
                m = String(parseInt(m, 10) + 1)
            }
        }

        date = d + "/" + m + "/" + y

        cy.log(date)

        cy.get(boxChooseDate).type(date + ' {enter}')
    })
}


function chooseEarlierDate(boxChooseDate, boxAltaDate){

    var date;
    var t = ""
    var d, m, y;

    cy.get(boxAltaDate).then(function(e){
        t = Cypress.$(e).removeAttr('disabled').val()
        cy.log(t)

        d = String(t).substring(0,2) //OBTENER EL DIA
        m = String(t).substring(3,5) //OBTENER EL MES
        y = String(t).substring(6,10)  //OBTENER EL AÑO


        //SI ES FEBRERO (28 DIAS)
        if(m == "02"){
            d = String(parseInt(Math.random()*(28 - 1) + 1, 10))
            m = "01"
        }
        //MESES CON 31 DIAS
        else if(m == "03" || "05" || "07" || "08" || "10" || "12"){
            d = String(parseInt(Math.random()*(31 - 1) + 1))

            //SI TIENE UN CERO ANTES DEL NUMERO
            if(parseInt(m, 10) < 10){
                m = "0" + String(parseInt(m, 10) - 1)
            }
            else{
                m = String(parseInt(m, 10) - 1)
            }

        }
        //MESES CON 30 DIAS
        else if(m == "01" || "04" || "06" || "09" || "11"){
            d = String(parseInt(Math.random()*(30 - 1) + 1, 10))

            //SI ES ENERO
            if(m == "01"){
                m = "12"
                y = String(parseInt(y, 10) - 1)
            }

            if(parseInt(m, 10) < 9){
                m = "0" + String(parseInt(m, 10) - 1)
            }
            else{
                m = String(parseInt(m, 10) - 1)
            }
        }

        date = d + "/" + m + "/" + y

        cy.log(date)

        cy.get(boxChooseDate).type(date + ' {enter}')
    })
}



function login(){

    cy.wait(10000)
    var t = ""
    cy.get('head > title').then(function(e){
      t = Cypress.$(e).text()
      cy.log("Title: " + t)
      //cy.title().should('eq', 'Workbeat - Iniciar Sesión')

      if(t == "Workbeat - Iniciar Sesión"){
        cy.log("LOGIN")
        cy.wait(5000)
        cy.wait(10000)
        cy.get('#Username').type("jmontes@intelexion.com")
        cy.get('#btnSubmit').click()
        cy.get('#pwd').type("Josso199.")
        cy.get('#login').click()
        cy.wait(10000)
      }

    })
}


function validateTextAndRetryChangeListElement(btnDisplayList,listDisplayed, txt){

    var title = ""
    cy.get('head > title').then(function(e){
      title = Cypress.$(e).text()
      cy.log("Title: " + title)

      cy.log("VALIDANDO LISTA")

      var t = ""
      cy.get(btnDisplayList).then(function(e){
        t = Cypress.$(e).text()
        cy.log(t)
        
        //ES DIFERENTE EL TEXTO DEL BOTON SELECCIONADO?
        if(t != txt){
          cy.get(btnDisplayList).click()
          cy.get(listDisplayed).contains(txt).click()
          cy.wait(7000)
        }

        cy.get('head > title').then(function(e){
            var title2 = Cypress.$(e).text()
            cy.log("Title2: " + title2)


            if(title2 == title){
                
                cy.log("VALIDANDO LISTA 2")
                cy.get(btnDisplayList).then(function(e){
                    t = Cypress.$(e).text()
                    cy.log(t)

                    //ES DIFERENTE EL TEXTO DEL BOTON SELECCIONADO?
                    if(t != txt){
                        cy.get(btnDisplayList).click()
                        cy.get(listDisplayed).contains(txt).click()
                        cy.wait(7000)

                        }
                })

            }
        
        })  

      })

    })
   
}

function reingreso(){
    cy.visit('https://test.workbeat.com/Nom/PayrollEmployee/Index')
    login()
    cy.wait(10000)
    cy.get('.module-item-1').click()
    cy.wait(20000)
    login()

    //cy.get('#divCboLegalName > .btn').click()
    //cy.get('#divCboLegalName > ul').contains('Mi Empresa').click()

    cy.wait(10000)
    cy.get('.module-item-1').click()
    validateTextAndRetryChangeListElement('#divCboLegalName > .btn', '#divCboLegalName > .dropdown-menu', 'Mi Empresa')


    cy.wait(10000)
    cy.get('.module-item-1').click()
    cy.wait(20000)

    //cy.title().should('eq', 'Workbeat - Iniciar Sesión')
    login()
    //cy.get('.action-area > .btn-primary').click()
    cy.get('.action-area > .btn-primary').click()
    cy.wait(10000)

    cy.log(Cypress.$('body > div.slidePanel.slidePanel-right.slidePanel-dragging.slidePanel-big.slidePanel-show > div.slidePanel-scrollable.scrollable.is-enabled.scrollable-vertical > div.scrollable-container').length == 0)
    
    cy.wait(15000)
    cy.get('.col-md-12 > .form-group > .input-search > .form-control').type('PRUEBA APELLIDO PAT APELLIDO MAT ')
    cy.wait(5000)
    cy.get('.media-body > div').click()
    cy.wait(5000)
    //cy.get('#wiz_step_Paso1 > div > div:nth-child(3) > div > div > div:nth-child(2) > div:nth-child(3) > div.form-group > input').click()
    //cy.get('.table-condensed > tbody > :nth-child(4) > :nth-child(3)').click()
    cy.get('.wizard-buttons > .btn-primary').click()
    cy.get('.wizard-buttons > .btn-primary').click()
    cy.get('.wizard-buttons > .btn-primary').click()
    cy.get('#wizard-1 > div.wizard-buttons.padding-top-10 > a.btn.btn-primary.btn-outline.pull-right').click()
    cy.get('#wiz_step_Paso3 > div > div:nth-child(3) > div > div > div:nth-child(3) > div:nth-child(1) > div.form-group > input').click()
    cy.get('tr:nth-child(4) > .day:nth-child(3)').click()
    cy.wait(10000)
    cy.get('.wizard-buttons > .btn-primary').click()
    cy.wait(5000)
    cy.get('#wizard-1 > div.wizard-buttons.padding-top-10 > a.btn.btn-success.btn-outline.pull-right').click()  
    cy.wait(5000)
    cy.get('#generar_aviso_alta > .modal-dialog > .modal-content > .modal-footer > .btn-secondary').click()
}

function baja(){
    cy.visit('https://test.workbeat.com/Nom/PayrollEmployee/Index')
    cy.wait(10000)
    login()
    cy.wait(5000)
    login()
    cy.get('.module-item-1').click()
    cy.wait(15000)
    login()
    cy.get('#inputSearch').type('PRUEBA APELLIDO PAT APELLIDO MAT {enter}')
    cy.wait(10000)
    cy.get('.action-buttons > .btn').click()
    cy.wait(10000)
    chooseLaterDate('[data-schemapath="root.Fecha"] > .form-group > .form-control', '#editEntityArea_0 > div > div:nth-child(3) > div > div > div:nth-child(1) > div:nth-child(2) > div.form-group > input')
    cy.wait(5000)
    cy.get('#editEntityArea_0 > div > div:nth-child(3) > div > div > div:nth-child(2) > div:nth-child(2) > div.form-group.has-error.has-error.has-error > select').select('Renuncia voluntaria - Estudiar')
    cy.wait(5000)
    //cy.get('#editEntityArea_0 > div > div:nth-child(3) > div > div > div:nth-child(2) > div:nth-child(2) > div.form-group > select > ').click()
    cy.get('#editEntitySave_0').click()
    cy.wait(10000)
    cy.get('#EntityConfirmBajaAdm > div > div > div.modal-footer > button.btn.btn-secondary').click()
}


module.exports = {
    "retryClickElement": retryClickElement,
    "login": login,
    "retryClickElementChildClass": retryClickElementChildClass,
    "chooseLaterDate": chooseLaterDate,
    "validateTextAndRetryChangeListElement": validateTextAndRetryChangeListElement,
    "reingreso": reingreso,
    "chooseEarlierDate": chooseEarlierDate,
    "baja": baja
}