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

    it('shows all initial bugs', () => {
      cy.get('[data-testid="bug-list"]').should('be.visible')
      cy.get('[data-testid^="bug-"]').should('have.length', 4)
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
    it('filters high severity bugs correctly', () => {
      cy.get('[data-testid="filter-high"]').click()
      cy.get('[data-testid^="bug-"]').should('have.length', 1)
      cy.contains('Login button not working on mobile').should('be.visible')
      cy.contains('Dashboard loading slowly').should('not.exist')
    })

    it('filters medium severity bugs correctly', () => {
      cy.get('[data-testid="filter-medium"]').click()
      cy.get('[data-testid^="bug-"]').should('have.length', 1)
      cy.contains('Dashboard loading slowly').should('be.visible')
      cy.contains('Login button not working on mobile').should('not.exist')
    })

    it('filters low severity bugs correctly', () => {
      cy.get('[data-testid="filter-low"]').click()
      cy.get('[data-testid^="bug-"]').should('have.length', 1)
      cy.contains('Minor UI alignment issue').should('be.visible')
      cy.contains('Dashboard loading slowly').should('not.exist')
    })

    // THIS TEST WILL FAIL - DEMONSTRATES THE CRITICAL FILTER BUG
    it('DEMO BUG: critical filter should show only critical bugs but shows all', () => {
      cy.get('[data-testid="filter-critical"]').click()
      
      // This test will fail because the critical filter is broken
      // Expected: Only 1 critical bug should be shown
      // Actual: All 4 bugs are shown due to the bug in the filter logic
      cy.get('[data-testid^="bug-"]').should('have.length', 1) // This will fail - shows 4 instead of 1
      cy.contains('Email notifications broken').should('be.visible')
      cy.contains('Login button not working on mobile').should('not.exist')
      cy.contains('Dashboard loading slowly').should('not.exist')
      cy.contains('Minor UI alignment issue').should('not.exist')
    })

    it('returns to all bugs when all filter is clicked', () => {
      // First filter to high
      cy.get('[data-testid="filter-high"]').click()
      cy.get('[data-testid^="bug-"]').should('have.length', 1)
      
      // Then return to all
      cy.get('[data-testid="filter-all"]').click()
      cy.get('[data-testid^="bug-"]').should('have.length', 4)
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

    // THIS TEST WILL FAIL - DEMONSTRATES THE EMPTY INPUT BUG
    it('DEMO BUG: should prevent adding bugs with empty title but allows it', () => {
      cy.get('[data-testid="add-bug-button"]').click()
      
      // Leave title empty and try to submit
      cy.get('[data-testid="bug-severity-select"]').select('high')
      cy.get('[data-testid="submit-bug-button"]').click()
      
      // This test will fail because the app allows empty titles
      // The bug count should not increase, but it will
      cy.get('[data-testid="total-bugs"]').should('contain', '4') // This will fail - shows 5 instead
      
      // An empty bug should not be added, but it will be
      cy.get('[data-testid^="bug-"]').should('have.length', 4) // This will fail - shows 5 instead
    })

    it('allows selection of all severity levels', () => {
      cy.get('[data-testid="add-bug-button"]').click()
      
      const severities = ['critical', 'high', 'medium', 'low']
      severities.forEach(severity => {
        cy.get('[data-testid="bug-severity-select"]').select(severity)
        cy.get('[data-testid="bug-severity-select"]').should('have.value', severity)
      })
    })

    it('updates statistics after adding bugs of different severities', () => {
      // Add a high severity bug
      cy.get('[data-testid="add-bug-button"]').click()
      cy.get('[data-testid="bug-title-input"]').type('High severity test bug')
      cy.get('[data-testid="bug-severity-select"]').select('high')
      cy.get('[data-testid="submit-bug-button"]').click()
      
      cy.get('[data-testid="total-bugs"]').should('contain', '5')
      
      // Add a critical severity bug
      cy.get('[data-testid="add-bug-button"]').click()
      cy.get('[data-testid="bug-title-input"]').type('Critical test bug')
      cy.get('[data-testid="bug-severity-select"]').select('critical')
      cy.get('[data-testid="submit-bug-button"]').click()
      
      cy.get('[data-testid="total-bugs"]').should('contain', '6')
      cy.get('[data-testid="critical-bugs"]').should('contain', '2')
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

    it('clears form after successful submission', () => {
      cy.get('[data-testid="add-bug-button"]').click()
      
      cy.get('[data-testid="bug-title-input"]').type('Test bug')
      cy.get('[data-testid="bug-description-input"]').type('Test description')
      cy.get('[data-testid="submit-bug-button"]').click()
      
      // Open form again and check it's empty
      cy.get('[data-testid="add-bug-button"]').click()
      cy.get('[data-testid="bug-title-input"]').should('have.value', '')
      cy.get('[data-testid="bug-description-input"]').should('have.value', '')
      cy.get('[data-testid="bug-severity-select"]').should('have.value', 'medium')
    })
  })

  describe('UI Components and Styling', () => {
    it('displays severity badges with appropriate styling', () => {
      cy.get('[data-testid="bug-3"]').within(() => {
        cy.contains('CRITICAL').should('be.visible')
      })
      
      cy.get('[data-testid="bug-1"]').within(() => {
        cy.contains('HIGH').should('be.visible')
      })
      
      cy.get('[data-testid="bug-2"]').within(() => {
        cy.contains('MEDIUM').should('be.visible')
      })
      
      cy.get('[data-testid="bug-4"]').within(() => {
        cy.contains('LOW').should('be.visible')
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

  describe('Complete User Workflow', () => {
    it('demonstrates a complete bug tracking workflow', () => {
      // View initial state
      cy.get('[data-testid="total-bugs"]').should('contain', '4')
      
      // Filter to view critical bugs (this will show the bug)
      cy.get('[data-testid="filter-critical"]').click()
      // Note: Due to the bug, this will show all bugs instead of just critical
      
      // Add a new critical bug
      cy.get('[data-testid="add-bug-button"]').click()
      cy.get('[data-testid="bug-title-input"]').type('Production server down')
      cy.get('[data-testid="bug-severity-select"]').select('critical')
      cy.get('[data-testid="bug-description-input"]').type('Main production server is unresponsive')
      cy.get('[data-testid="submit-bug-button"]').click()
      
      // Verify the bug was added
      cy.contains('Production server down').should('be.visible')
      cy.get('[data-testid="total-bugs"]').should('contain', '5')
      cy.get('[data-testid="critical-bugs"]').should('contain', '2')
      
      // Switch between different filters
      cy.get('[data-testid="filter-high"]').click()
      cy.get('[data-testid="filter-medium"]').click()
      cy.get('[data-testid="filter-low"]').click()
      cy.get('[data-testid="filter-all"]').click()
      
      // Verify all bugs are shown
      cy.get('[data-testid^="bug-"]').should('have.length', 5)
    })
  })
})