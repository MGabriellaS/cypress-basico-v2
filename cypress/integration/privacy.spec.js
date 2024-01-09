/// <reference types="Cypress" />

describe ('CAC TAT - Política de privacidade', function() {
    beforeEach(function () {
        cy.visit('./src/privacy.html')
    })

    Cypress._.times(3, function(){
        it.only('testa a página da política de privacidade de forma independente', function () {
            /*         cy.get('#title').contains('CAC TAT - Política de privacidade')
                        .should('be.visible') */
                    cy.contains('h1', 'CAC TAT - Política de privacidade')
                        .should('be.visible')
                })
    
    })

})



