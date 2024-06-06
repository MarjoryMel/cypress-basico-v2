Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Marjory')
    cy.get('#lastName').type('Lemos')
    cy.get('#email').type('exemplo@exemplo.com')
    cy.get('#open-text-area').type('Test')
    cy.contains('button', 'Enviar').click()
})