describe('Category Page with CategoryForm (Admin)', () => {
  beforeEach(() => {
    // 1. Admin Login
    cy.visit('http://localhost:3000/login'); // Assuming '/login' is your login route
    cy.get('input[type="email"]').type('admin@gmail.com');
    cy.get('input[type="password"]').type('12345678');
    cy.contains('button', 'Submit').click();

    // Wait for successful login and navigation (adjust as needed)
    cy.url().should('include', 'http://localhost:3000/dashboard/admin'); // Or any other admin dashboard URL part

    // 2. Visit Create Category Page
    cy.visit('http://localhost:3000/dashboard/admin/create-category');
  });

  it('should render the CategoryForm within the admin category page', () => {
    cy.get('input[placeholder="Enter new category"]').should('be.visible');
    cy.contains('button', 'Submit').should('be.visible');
  });

  it('should allow typing into the category input', () => {
    cy.get('input[placeholder="Enter new category"]').type('Test Category');
    cy.get('input[placeholder="Enter new category"]').should('have.value', 'Test Category');
  });

  it('should submit the category form with a new category', () => {
    // Assuming you have a way to intercept the form submission (e.g., API call)
    cy.intercept('POST', 'http://localhost:5000/api/v1/category/create-category', { // Adjust URL
      statusCode: 201, // Created
      body: { message: 'Category created successfully' },
    }).as('createCategory');

    cy.get('input[placeholder="Enter new category"]').type('New Category');
    cy.contains('button', 'Submit').click();

    cy.wait('@createCategory');

    // Add assertions to check for success (e.g., toast message, updated list)
    cy.get('.Toastify__toast-body').should('contain', 'Category created successfully'); // example of toast message.
  });

  // Add more tests for error handling, form validation, etc.
});