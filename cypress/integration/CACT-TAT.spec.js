/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function (){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'test, test, test, test, test, test, test, test, test, test, test, test, test, test, test'
        
        cy.get('#firstName').type('Marjory')
        cy.get('#lastName').type('Lemos')
        cy.get('#email').type('exemplo@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay : 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Marjory')
        cy.get('#lastName').type('Lemos')
        cy.get('#email').type('exemplo@exemplo,com')
        cy.get('#open-text-area').type('Test')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo de telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
        .type('abdefg')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Marjory')
        cy.get('#lastName').type('Lemos')
        cy.get('#email').type('exemplo@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Test')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Marjory')
        .should('have.value', 'Marjory')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Lemos')
        .should('have.value', 'Lemos')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('exemplo@exemplo.com')
        .should('have.value', 'exemplo@exemplo.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('12345678')
        .should('have.value', '12345678')
        .clear()
        .should('have.value', '')
    })
})
  