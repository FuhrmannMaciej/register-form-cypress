

export const iterateInputFields = (errorSelectorsArray: string[], inputValuesArray: string[] ) => {

	for (let i = 0; i < errorSelectorsArray.length; i++) {

        if (errorSelectorsArray[i] === '') {
            continue;
        } else{
            cy.get(errorSelectorsArray[i])
            .focus()
            .type(inputValuesArray[i])
            .should('have.attr', 'value', inputValuesArray[i]);
        }
	}
};

export const iterateValidationMessages = (errorSelectorsArray: string[], errorValuesArray: string[] ) => {

	for (let i = 0; i < errorSelectorsArray.length; i++) {

        if (errorSelectorsArray[i] === '') {
            continue;
        } else{
            cy.get(errorSelectorsArray[i])
            .should('contain', errorValuesArray[i]);
        }
	}
};