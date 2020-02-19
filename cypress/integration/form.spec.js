/* eslint-disable */

describe('Form', () => {
  beforeEach(() => {
    cy.visit('/add-product')
  })

  const correctTitleInput = "Learn about Cypress"
  const falseTitleInput = "Cypress"
  it('it passes title validation', () => {
    cy.get('.title-input > input')
    	.type(correctTitleInput)
      .should('have.value', correctTitleInput)
      .blur()
      .get('.title-input > i')
      .should('have.class', 'check')
  })
  it('it does not pass title validation', () => {
    cy.get('.title-input > input')
      .type(falseTitleInput)
      .should('have.value', falseTitleInput)
      .blur()
      .get('.title-input > i')
      .should('have.class', 'times')
  })

  const correctDescriptionInput = "Book"
  const falseDescriptionInput = "book"
  it('it passes description validation', () => {
    cy.get('.description-input > input')
      .type(correctDescriptionInput)
      .should('have.value', correctDescriptionInput)
      .blur()
      .get('.description-input > i')
      .should('have.class', 'check')
  })
  it('it does not pass description validation', () => {
    cy.get('.description-input > input')
      .type(falseDescriptionInput)
      .should('have.value', falseDescriptionInput)
      .blur()
      .get('.description-input > i')
      .should('have.class', 'times')
  })

  const correctCategoriesInput = "Sci-fi, thriller"
  const falseCategoriesInput = "Sci-fi, thriller, comedy, romance, novel"
  it('it passes categories validation', () => {
    cy.get('.categories-input > input')
      .type(correctCategoriesInput)
      .should('have.value', correctCategoriesInput)
      .blur()
      .get('.categories-input > i')
      .should('have.class', 'check')
  })
  it('it does not pass categories validation', () => {
    cy.get('.categories-input > input')
      .type(falseCategoriesInput)
      .should('have.value', falseCategoriesInput)
      .blur()
      .get('.categories-input > i')
      .should('have.class', 'times')
  })

  const correctAuthorInput = "Nick Johnson, Jamie Jones"
  const falseAuthorInput = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  it('it passes author validation', () => {
    cy.get('.author-input > input')
      .type(correctAuthorInput)
      .should('have.value', correctAuthorInput)
      .blur()
      .get('.author-input > i')
      .should('have.class', 'check')
  })
  it('it does not pass author validation', () => {
    cy.get('.author-input > input')
      .type(falseAuthorInput)
      .should('have.value', falseAuthorInput)
      .blur()
      .get('.author-input > i')
      .should('have.class', 'times')
  })

  const correctPublisherInput = "Oreilly"
  const falsePublisherInput = "One"
  it('it passes publisher validation', () => {
    cy.get('.publisher-input > input')
      .type(correctPublisherInput)
      .should('have.value', correctPublisherInput)
      .blur()
      .get('.publisher-input > i')
      .should('have.class', 'check')
  })
  it('it does not pass publisher validation', () => {
    cy.get('.publisher-input > input')
      .type(falsePublisherInput)
      .should('have.value', falsePublisherInput)
      .blur()
      .get('.publisher-input > i')
      .should('have.class', 'times')
  })

  const correctYearInput = "2020"
  const falseYearInput = "500"
  it('it passes year validation', () => {
    cy.get('.year-input > input')
      .type(correctYearInput)
      .should('have.value', correctYearInput)
      .blur()
      .get('.year-input > i')
      .should('have.class', 'check')
  })
  it('it does not pass year validation', () => {
    cy.get('.year-input > input')
      .type(falseYearInput)
      .should('have.value', falseYearInput)
      .blur()
      .get('.year-input > i')
      .should('have.class', 'times')
  })

  const correctPagesInput = "9999"
  const falsePagesInput = "10000"
  it('it passes pages validation', () => {
    cy.get('.pages-input > input')
      .type(correctPagesInput)
      .should('have.value', correctPagesInput)
      .blur()
      .get('.pages-input > i')
      .should('have.class', 'check')
  })
  it('it does not pass pages validation', () => {
    cy.get('.pages-input > input')
      .type(falsePagesInput)
      .should('have.value', falsePagesInput)
      .blur()
      .get('.pages-input > i')
      .should('have.class', 'times')
  })

  const correctRatingInput = "5"
  const falseRatingInput = "6"
  it('it passes rating validation', () => {
    cy.get('.rating-input > input')
      .type(correctRatingInput)
      .should('have.value', correctRatingInput)
      .blur()
      .get('.rating-input > i')
      .should('have.class', 'check')
  })
  it('it does not pass rating validation', () => {
    cy.get('.rating-input > input')
      .type(falseRatingInput)
      .should('have.value', falseRatingInput)
      .blur()
      .get('.rating-input > i')
      .should('have.class', 'times')
  })

  const correctIsbn10Input = "0123456789"
  const falseIsbn10Input = "01321231"
  it('it passes isbn10 validation', () => {
    cy.get('.isbn10-input > input')
      .type(correctIsbn10Input)
      .should('have.value', correctIsbn10Input)
      .blur()
      .get('.isbn10-input > i')
      .should('have.class', 'check')
  })
  it('it does not pass isbn10 validation', () => {
    cy.get('.isbn10-input > input')
      .type(falseIsbn10Input)
      .should('have.value', falseIsbn10Input)
      .blur()
      .get('.isbn10-input > i')
      .should('have.class', 'times')
  })

  const correctIsbn13Input = "0123456789123"
  const falseIsbn13Input = "01321231"
  it('it passes isbn13 validation', () => {
    cy.get('.isbn13-input > input')
      .type(correctIsbn13Input)
      .should('have.value', correctIsbn13Input)
      .blur()
      .get('.isbn13-input > i')
      .should('have.class', 'check')
  })
  it('it does not pass isbn13 validation', () => {
    cy.get('.isbn13-input > input')
      .type(falseIsbn13Input)
      .should('have.value', falseIsbn13Input)
      .blur()
      .get('.isbn13-input > i')
      .should('have.class', 'times')
  })

  it('it submits the form', () => {
    cy.get('.title-input > input')
      .type(correctTitleInput)
      .get('.description-input > input')
      .type(correctDescriptionInput)
      .get('.categories-input > input')
      .type(correctCategoriesInput)
      .get('.author-input > input')
      .type(correctAuthorInput)
      .get('.publisher-input > input')
      .type(correctPublisherInput)
      .get('.year-input > input')
      .type(correctYearInput)
      .get('.pages-input > input')
      .type(correctPagesInput)
      .get('.rating-input > input')
      .type(correctRatingInput)
      .get('.isbn10-input > input')
      .type(correctIsbn10Input)
      .get('.isbn13-input > input')
      .type(correctIsbn13Input)
      .get('.field:nth-child(11) > button')
      .contains('Add Book')
      .click()
      .get('p')
      .contains('Book added successfully')
  })
})