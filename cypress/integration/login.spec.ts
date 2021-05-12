import { iterateInputFields, iterateValidationMessages } from "../support/commands/commands";
import { $inputFieldAge, $inputFieldEmail, $inputFieldName, $inputFieldSurname, $messageAgeMustBeAPositiveNumber, $messageAgeNaN, $messageInvalidEmail, $messageIsRequired, $messageTooShort, $submitButton, $submitMessage, $submitMessageValue, $validationAge, $validationEmail, $validationName, $validationSurname } from "../support/selectors";


context('Check the Register Form Functionality',() => {

    beforeEach(() => {
        cy.visit('/');

        cy.url().should('contain', 'https://coffeemug.z33.web.core.windows.net/')
    });
    
    it('F_01 - User can register with all fields populated', () => {


        iterateInputFields(
            [$inputFieldName,$inputFieldSurname,$inputFieldEmail,$inputFieldAge],
            ['testName','testSurname','test@test.email.com','27']);
        
        cy.get($submitButton).click();

        cy.get($submitMessage).should('have.text', $submitMessageValue);
    });

    it('F_02 - User can register with only Name and Email', () => {


        iterateInputFields(
            [$inputFieldName,'',$inputFieldEmail],
            ['testName','','test@test.email.com']);
        
        cy.get($submitButton).click()

        cy.get($submitMessage).should('have.text', $submitMessageValue);
    });

    it('F_03 - User cannot register with invalid values', () => {


        iterateInputFields(
            [$inputFieldName,$inputFieldSurname,$inputFieldEmail,$inputFieldAge],
            ['A','A','A','A']);

        cy.get($submitButton).click()
    
        cy.get($submitMessage).should('not.have.text', $submitMessageValue);

        iterateValidationMessages(
            [$validationName,$validationSurname,$validationEmail,$validationAge],
            [$messageTooShort,$messageTooShort,$messageInvalidEmail,$messageAgeNaN]
        );
        
        
    });

    it('F_04 - User cannot register with incorrect Name and Surname', () => {


        iterateInputFields(
            [$inputFieldName,$inputFieldSurname,$inputFieldEmail],
            ['12','12','test@test.email.com']);
        
        cy.get($submitButton).click();

        cy.get($submitMessage).should('have.text', $submitMessageValue);
    });

    it('F_05 - User cannot register with negative Age', () => {


        iterateInputFields(
            [$inputFieldName,$inputFieldSurname,$inputFieldEmail,$inputFieldAge],
            ['testName','testSurname','test@test.email.com','-27']);

        cy.get($submitButton).click()
    
        cy.get($submitMessage).should('not.have.text', $submitMessageValue);
        
        cy.get($validationAge)
        .should('have.text', $messageAgeMustBeAPositiveNumber);
    });

    it('F_06 - User cannot register with all fields empty', () => {

        
        cy.get($submitButton).click();

        cy.get($submitMessage).should('not.have.text', $submitMessageValue);

        iterateValidationMessages(
            [$validationName,'',$validationEmail],
            [$messageIsRequired,'', $messageIsRequired]
        );
    });

});