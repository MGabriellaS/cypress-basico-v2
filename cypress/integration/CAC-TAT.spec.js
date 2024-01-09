/// <reference types="Cypress" />

describe ('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Gabriella')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gsantos@exemplo.com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    //Alternativa para escrever textos longos sem perder tanto tempo no teste, assim pode-se sobrescrever para diminuir o valor do delay
    it('Exc.1- preenche os campos obrigatórios e envia o formulário', function() {
        const longtext='teste,testes,teste,teste,teste,teste,teste,teste,teste'
        cy.get('#firstName').type('Gabriella')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gsantos@exemplo.com')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('Exc.2-exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Gabriella')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gsantos@.com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
    })

    it('Exc.3-campo telefone continua vazio quando não preenchido coom valor não-numérico', function() {
        cy.get('#phone')
            .type('abcdefjhij')
            .should('have.value', '')
    })

    it('Exc.4-exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Gabriella')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gsantos@.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
    })

    it('Exc.5-preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Gabriella')
            .should('have.value', 'Gabriella')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Santos')
            .should('have.value', 'Santos')
            .clear()
            .should('have.value', '')
        
         cy.get('#email')
            .type('gsantos@example.com')
            .should('have.value', 'gsantos@example.com')
            .clear()
            .should('have.value', '')
        
         cy.get('#phone')
            .type('12345678')
            .should('have.value', '12345678')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value', '')
    })

    it('Exc.6-exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
    })

    it('Exc.7-envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Exc.8-substituir get por contains e verificar que o teste continua passando', () => {
        cy.get('#firstName').type('Gabriella')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gsantos@exemplo.com')
        cy.get('#open-text-area').type('teste')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
       cy.get('#product').select('YouTube')
       .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })

    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Gabriella')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('gsantos@.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.contains('span', 'Valide os campos obrigatórios!').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
         .should('not.have.value')
         .selectFile('./cypress/fixtures/example.json')
         .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
           // console.log($input)
         })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]#file-upload')
         .should('not.have.value')
         .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
         .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
           // console.log($input)
         })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
         .should('not.have.value')
         .selectFile('@sampleFile')
         .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
           // console.log($input)
         })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr','target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a página da política de privacidade de forma independente',function() {
        
    })

})


