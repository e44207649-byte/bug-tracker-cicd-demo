describe('Bug Tracker E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Initial Page Load', () => {
    it('loads the dashboard successfully', () => {
      cy.contains('Bug Tracker Dashboard').should('be.visible')
      cy.get('[data-testid="total-bugs"]').should('contain', '4')
      cy.get('[data-testid="critical-bugs"]').should('contain', '1')
    })

    it('displays environment information', () => {
      cy.contains('Environment:').should('be.visible')
    })

    it('shows initial bugs', () => {
      cy.get('[data-testid="bug-list"]').should('be.visible')
      cy.contains('Login button not working on mobile').should('be.visible')
      cy.contains('Dashboard loading slowly').should('be.visible')
      cy.contains('Email notifications broken').should('be.visible')
      cy.contains('Minor UI alignment issue').should('be.visible')
    })
  })

  describe('Bug Statistics', () => {
    it('displays correct bug counts in statistics cards', () => {
      cy.get('[data-testid="total-bugs"]').should('contain', '4')
      cy.get('[data-testid="critical-bugs"]').should('contain', '1')
      cy.get('[data-testid="open-bugs"]').should('contain', '3')
      cy.get('[data-testid="in-progress-bugs"]').should('contain', '1')
    })

    it('shows bug counts in filter buttons', () => {
      cy.get('[data-testid="filter-critical"]').should('contain', 'Critical (1)')
      cy.get('[data-testid="filter-high"]').should('contain', 'High (1)')
      cy.get('[data-testid="filter-medium"]').should('contain', 'Medium (1)')
      cy.get('[data-testid="filter-low"]').should('contain', 'Low (1)')
    })
  })

  describe('Bug Filtering Functionality', () => {
    it('filters critical bugs correctly', () => {
      cy.get('[data-testid="filter-critical"]').click()
      cy.contains('Email notifications broken').should('be.visible')
      cy.contains('Login button not working on mobile').should('not.exist')
    })

    it('updates active filter button styling', () => {
      cy.get('[data-testid="filter-all"]').should('have.class', 'bg-blue-600')
      
      cy.get('[data-testid="filter-high"]').click()
      cy.get('[data-testid="filter-high"]').should('have.class', 'bg-blue-600')
      cy.get('[data-testid="filter-all"]').should('not.have.class', 'bg-blue-600')
    })
  })

  describe('Add Bug Functionality', () => {
    it('opens and closes add bug form', () => {
      cy.get('[data-testid="add-bug-button"]').click()
      cy.get('[data-testid="bug-title-input"]').should('be.visible')
      cy.get('[data-testid="bug-severity-select"]').should('be.visible')
      cy.get('[data-testid="submit-bug-button"]').should('be.visible')
      
      cy.get('[data-testid="cancel-bug-button"]').click()
      cy.get('[data-testid="bug-title-input"]').should('not.exist')
    })

    it('adds a new bug successfully with valid input', () => {
      cy.get('[data-testid="add-bug-button"]').click()
      
      cy.get('[data-testid="bug-title-input"]').type('New critical system bug')
      cy.get('[data-testid="bug-severity-select"]').select('critical')
      cy.get('[data-testid="bug-description-input"]').type('System is completely down')
      
      cy.get('[data-testid="submit-bug-button"]').click()
      
      // Verify the bug was added
      cy.contains('New critical system bug').should('be.visible')
      cy.get('[data-testid="total-bugs"]').should('contain', '5')
      cy.get('[data-testid="critical-bugs"]').should('contain', '2')
      cy.get('[data-testid="open-bugs"]').should('contain', '4')
      
      // Form should close after submission
      cy.get('[data-testid="bug-title-input"]').should('not.exist')
    })

    it('prevents adding bugs with empty title', () => {
      cy.get('[data-testid="add-bug-button"]').click()
      
      // Leave title empty and try to submit
      cy.get('[data-testid="bug-severity-select"]').select('high')
      cy.get('[data-testid="submit-bug-button"]').click()
      
      // Bug count should not increase
      cy.get('[data-testid="total-bugs"]').should('contain', '4')
    })

    it('allows selection of all severity levels', () => {
      cy.get('[data-testid="add-bug-button"]').click()
      
      const severities = ['critical', 'high', 'medium', 'low']
      severities.forEach(severity => {
        cy.get('[data-testid="bug-severity-select"]').select(severity)
        cy.get('[data-testid="bug-severity-select"]').should('have.value', severity)
      })
    })
  })

  describe('Form Interactions', () => {
    it('allows typing in all form fields', () => {
      cy.get('[data-testid="add-bug-button"]').click()
      
      cy.get('[data-testid="bug-title-input"]')
        .type('Test bug title')
        .should('have.value', 'Test bug title')
      
      cy.get('[data-testid="bug-description-input"]')
        .type('Test bug description')
        .should('have.value', 'Test bug description')
      
      cy.get('[data-testid="bug-severity-select"]')
        .select('high')
        .should('have.value', 'high')
    })
  })

  describe('UI Components and Styling', () => {
    it('displays severity badges with appropriate styling', () => {
      cy.get('[data-testid="bug-3"]').within(() => {
        cy.contains('critical').should('be.visible')
      })
      
      cy.get('[data-testid="bug-1"]').within(() => {
        cy.contains('high').should('be.visible')
      })
      
      cy.get('[data-testid="bug-2"]').within(() => {
        cy.contains('medium').should('be.visible')
      })
      
      cy.get('[data-testid="bug-4"]').within(() => {
        cy.contains('low').should('be.visible')
      })
    })

    it('shows status icons for bugs', () => {
      cy.get('[data-testid^="bug-"]').each($bug => {
        // Each bug should have a status icon (we can't easily test specific icons, but we can verify they exist)
        cy.wrap($bug).within(() => {
          cy.get('svg').should('exist')
        })
      })
    })

    it('displays bug creation dates', () => {
      cy.contains('Created: 2024-08-19').should('be.visible')
      cy.contains('Created: 2024-08-18').should('be.visible')
      cy.contains('Created: 2024-08-17').should('be.visible')
      cy.contains('Created: 2024-08-16').should('be.visible')
    })
  })

  describe('Responsive Design and Layout', () => {
    it('maintains layout on different screen sizes', () => {
      // Test mobile viewport
      cy.viewport(375, 667)
      cy.contains('Bug Tracker Dashboard').should('be.visible')
      cy.get('[data-testid="bug-list"]').should('be.visible')
      
      // Test tablet viewport
      cy.viewport(768, 1024)
      cy.contains('Bug Tracker Dashboard').should('be.visible')
      cy.get('[data-testid="bug-list"]').should('be.visible')
      
      // Test desktop viewport
      cy.viewport(1920, 1080)
      cy.contains('Bug Tracker Dashboard').should('be.visible')
      cy.get('[data-testid="bug-list"]').should('be.visible')
    })
  })
})