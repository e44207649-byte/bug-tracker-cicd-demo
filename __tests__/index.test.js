import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BugTracker from '../pages/index'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
    }
  },
}))

describe('Bug Tracker Dashboard', () => {
  beforeEach(() => {
    // Reset environment variables
    process.env.NEXT_PUBLIC_APP_ENV = 'test'
  })

  describe('Initial Rendering', () => {
    test('renders dashboard with correct title', () => {
      render(<BugTracker />)
      expect(screen.getByText('Bug Tracker Dashboard')).toBeInTheDocument()
    })

    test('displays environment information', () => {
      render(<BugTracker />)
      expect(screen.getByText('Environment: test')).toBeInTheDocument()
    })

    test('shows initial bug statistics', () => {
      render(<BugTracker />)
      expect(screen.getByTestId('total-bugs')).toHaveTextContent('4')
      expect(screen.getByTestId('critical-bugs')).toHaveTextContent('1')
      expect(screen.getByTestId('open-bugs')).toHaveTextContent('3')
      expect(screen.getByTestId('in-progress-bugs')).toHaveTextContent('1')
    })

    test('displays initial bugs in the list', () => {
      render(<BugTracker />)
      expect(screen.getByText('Login button not working on mobile')).toBeInTheDocument()
      expect(screen.getByText('Dashboard loading slowly')).toBeInTheDocument()
      expect(screen.getByText('Email notifications broken')).toBeInTheDocument()
      expect(screen.getByText('Minor UI alignment issue')).toBeInTheDocument()
    })
  })

  describe('Bug Filtering', () => {
    test('shows all bugs by default', () => {
      render(<BugTracker />)
      const bugList = screen.getByTestId('bug-list')
      expect(bugList).toBeInTheDocument()
      expect(screen.getAllByTestId(/^bug-\d+$/)).toHaveLength(4)
    })

    test('filters high severity bugs correctly', async () => {
      render(<BugTracker />)
      const highFilter = screen.getByTestId('filter-high')
      await userEvent.click(highFilter)
      
      expect(screen.getByText('Login button not working on mobile')).toBeInTheDocument()
      expect(screen.queryByText('Dashboard loading slowly')).not.toBeInTheDocument()
      expect(screen.getAllByTestId(/^bug-\d+$/)).toHaveLength(1)
    })

    test('filters medium severity bugs correctly', async () => {
      render(<BugTracker />)
      const mediumFilter = screen.getByTestId('filter-medium')
      await userEvent.click(mediumFilter)
      
      expect(screen.getByText('Dashboard loading slowly')).toBeInTheDocument()
      expect(screen.queryByText('Login button not working on mobile')).not.toBeInTheDocument()
      expect(screen.getAllByTestId(/^bug-\d+$/)).toHaveLength(1)
    })

    test('filters low severity bugs correctly', async () => {
      render(<BugTracker />)
      const lowFilter = screen.getByTestId('filter-low')
      await userEvent.click(lowFilter)
      
      expect(screen.getByText('Minor UI alignment issue')).toBeInTheDocument()
      expect(screen.queryByText('Dashboard loading slowly')).not.toBeInTheDocument()
      expect(screen.getAllByTestId(/^bug-\d+$/)).toHaveLength(1)
    })

    // THIS TEST WILL FAIL - DEMONSTRATES THE CRITICAL FILTER BUG
    // test('DEMO BUG: critical filter should show only critical bugs but shows all bugs', async () => {
    //   render(<BugTracker />)
    //   const criticalFilter = screen.getByTestId('filter-critical')
    //   await userEvent.click(criticalFilter)
      
    //   // This test will fail because the critical filter is broken
    //   // Expected: Only 1 critical bug should be shown
    //   // Actual: All 4 bugs are shown due to the bug in the filter logic
    //   expect(screen.getAllByTestId(/^bug-\d+$/)).toHaveLength(1) // This will fail - shows 4 instead of 1
    //   expect(screen.getByText('Email notifications broken')).toBeInTheDocument()
    //   expect(screen.queryByText('Login button not working on mobile')).not.toBeInTheDocument()
    //   expect(screen.queryByText('Dashboard loading slowly')).not.toBeInTheDocument()
    //   expect(screen.queryByText('Minor UI alignment issue')).not.toBeInTheDocument()
    // })

    test('returns to all bugs when all filter is selected', async () => {
      render(<BugTracker />)
      
      // First filter to high
      const highFilter = screen.getByTestId('filter-high')
      await userEvent.click(highFilter)
      expect(screen.getAllByTestId(/^bug-\d+$/)).toHaveLength(1)
      
      // Then back to all
      const allFilter = screen.getByTestId('filter-all')
      await userEvent.click(allFilter)
      expect(screen.getAllByTestId(/^bug-\d+$/)).toHaveLength(4)
    })
  })

  describe('Add Bug Functionality', () => {
    test('shows add bug form when button is clicked', async () => {
      render(<BugTracker />)
      const addButton = screen.getByTestId('add-bug-button')
      await userEvent.click(addButton)
      
      expect(screen.getByTestId('bug-title-input')).toBeInTheDocument()
      expect(screen.getByTestId('bug-severity-select')).toBeInTheDocument()
      expect(screen.getByTestId('submit-bug-button')).toBeInTheDocument()
    })

    test('hides add bug form when cancel is clicked', async () => {
      render(<BugTracker />)
      const addButton = screen.getByTestId('add-bug-button')
      await userEvent.click(addButton)
      
      const cancelButton = screen.getByTestId('cancel-bug-button')
      await userEvent.click(cancelButton)
      
      expect(screen.queryByTestId('bug-title-input')).not.toBeInTheDocument()
    })

    test('adds a new bug successfully with valid input', async () => {
      render(<BugTracker />)
      const addButton = screen.getByTestId('add-bug-button')
      await userEvent.click(addButton)
      
      const titleInput = screen.getByTestId('bug-title-input')
      const severitySelect = screen.getByTestId('bug-severity-select')
      const descriptionInput = screen.getByTestId('bug-description-input')
      const submitButton = screen.getByTestId('submit-bug-button')
      
      await userEvent.type(titleInput, 'New test bug')
      await userEvent.selectOptions(severitySelect, 'high')
      await userEvent.type(descriptionInput, 'Test description')
      await userEvent.click(submitButton)
      
      expect(screen.getByText('New test bug')).toBeInTheDocument()
      expect(screen.getByTestId('total-bugs')).toHaveTextContent('5')
    })

    // THIS TEST WILL FAIL - DEMONSTRATES THE EMPTY INPUT BUG
    test('DEMO BUG: should not allow adding bugs with empty title but does', async () => {
      render(<BugTracker />)
      const addButton = screen.getByTestId('add-bug-button')
      await userEvent.click(addButton)
      
      const submitButton = screen.getByTestId('submit-bug-button')
      
      // Leave title empty and try to submit
      await userEvent.click(submitButton)
      
      // The bug count should not increase
      expect(screen.getByTestId('total-bugs')).toHaveTextContent('4')
      
      // The bug list should still have 4 items
      expect(screen.getAllByTestId(/^bug-\d+$/)).toHaveLength(4)
    })

    test('updates bug statistics after adding a bug', async () => {
      render(<BugTracker />)
      const addButton = screen.getByTestId('add-bug-button')
      await userEvent.click(addButton)
      
      const titleInput = screen.getByTestId('bug-title-input')
      const severitySelect = screen.getByTestId('bug-severity-select')
      const submitButton = screen.getByTestId('submit-bug-button')
      
      await userEvent.type(titleInput, 'Critical system failure')
      await userEvent.selectOptions(severitySelect, 'critical')
      await userEvent.click(submitButton)
      
      expect(screen.getByTestId('total-bugs')).toHaveTextContent('5')
      expect(screen.getByTestId('critical-bugs')).toHaveTextContent('2')
      expect(screen.getByTestId('open-bugs')).toHaveTextContent('4')
    })
  })

  describe('Bug Severity Display', () => {
    test('displays severity badges with correct styling', () => {
      render(<BugTracker />)
      
      // Check that each bug has the correct severity text
      const bug1 = screen.getByTestId('bug-1')
      expect(bug1).toHaveTextContent('high')
      
      const bug2 = screen.getByTestId('bug-2')
      expect(bug2).toHaveTextContent('medium')
      
      const bug3 = screen.getByTestId('bug-3')
      expect(bug3).toHaveTextContent('critical')
      
      const bug4 = screen.getByTestId('bug-4')
      expect(bug4).toHaveTextContent('low')
    })
  })

  describe('Bug Status Display', () => {
    test('shows correct status icons and text', () => {
      render(<BugTracker />)
      
      // Check that status text appears in bugs
      const bug1 = screen.getByTestId('bug-1')
      expect(bug1).toHaveTextContent('Status: open')
      
      const bug2 = screen.getByTestId('bug-2')
      expect(bug2).toHaveTextContent('Status: in-progress')
      
      const bug3 = screen.getByTestId('bug-3')
      expect(bug3).toHaveTextContent('Status: open')
    })
  })

  describe('Form Validation', () => {
    test('form inputs accept user input correctly', async () => {
      render(<BugTracker />)
      const addButton = screen.getByTestId('add-bug-button')
      await userEvent.click(addButton)
      
      const titleInput = screen.getByTestId('bug-title-input')
      const descriptionInput = screen.getByTestId('bug-description-input')
      
      await userEvent.type(titleInput, 'Test title')
      await userEvent.type(descriptionInput, 'Test description')
      
      expect(titleInput).toHaveValue('Test title')
      expect(descriptionInput).toHaveValue('Test description')
    })

    test('severity selector has all options', async () => {
      render(<BugTracker />)
      const addButton = screen.getByTestId('add-bug-button')
      await userEvent.click(addButton)
      
      const severitySelect = screen.getByTestId('bug-severity-select')
      const options = severitySelect.querySelectorAll('option')
      
      expect(options).toHaveLength(4)
      expect(options[0]).toHaveValue('critical')
      expect(options[1]).toHaveValue('high')
      expect(options[2]).toHaveValue('medium')
      expect(options[3]).toHaveValue('low')
    })
  })

  describe('Accessibility', () => {
    test('has proper data-testid attributes for testing', () => {
      render(<BugTracker />)
      
      expect(screen.getByTestId('total-bugs')).toBeInTheDocument()
      expect(screen.getByTestId('critical-bugs')).toBeInTheDocument()
      expect(screen.getByTestId('open-bugs')).toBeInTheDocument()
      expect(screen.getByTestId('in-progress-bugs')).toBeInTheDocument()
      expect(screen.getByTestId('filter-all')).toBeInTheDocument()
      expect(screen.getByTestId('filter-critical')).toBeInTheDocument()
      expect(screen.getByTestId('add-bug-button')).toBeInTheDocument()
      expect(screen.getByTestId('bug-list')).toBeInTheDocument()
    })

    test('filter buttons show bug counts', () => {
      render(<BugTracker />)
      
      expect(screen.getByTestId('filter-critical')).toHaveTextContent('Critical (1)')
      expect(screen.getByTestId('filter-high')).toHaveTextContent('High (1)')
      expect(screen.getByTestId('filter-medium')).toHaveTextContent('Medium (1)')
      expect(screen.getByTestId('filter-low')).toHaveTextContent('Low (1)')
    })
  })
})