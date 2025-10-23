# GitHub Copilot Instructions

## Project Overview

**Economic-Storm-platform** is a comprehensive enterprise platform designed for economic projects, marketing, and business development. It provides an all-in-one solution with integrated database banking capabilities.

### Key Features
- Economic project management
- Marketing tools and analytics
- Business development capabilities
- Integrated database banking system
- Enterprise-grade data management

## Tech Stack

This project is in its early stages. When adding new features or components, please:
- Follow modern best practices for the chosen technology stack
- Ensure all dependencies are secure and up-to-date
- Document all architectural decisions

## Coding Guidelines

### General Principles
- Write clean, maintainable, and well-documented code
- Follow SOLID principles and design patterns where appropriate
- Prioritize security and data privacy in all implementations
- Write comprehensive tests for new features
- Keep functions small and focused on a single responsibility

### Code Style
- Use consistent naming conventions across the codebase
- Add meaningful comments for complex logic
- Ensure code is self-documenting where possible
- Follow language-specific style guides and linting rules

### Security Best Practices
- Never commit sensitive data, credentials, or API keys
- Validate and sanitize all user inputs
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization
- Keep dependencies updated to address security vulnerabilities
- Follow the principle of least privilege for database access

### Database Guidelines
- Design normalized database schemas
- Use transactions for related operations
- Implement proper indexing for performance
- Document database schema changes
- Use migration scripts for schema updates

## Project Structure

The repository is currently minimal and will grow as the platform develops:

```
Economic-Storm-platform/
├── .github/          # GitHub configuration and workflows
│   └── AGENTS.md     # This file - Copilot instructions
├── LICENSE           # Project license
└── README.md         # Project documentation
```

## Development Workflow

When working on issues or features:

1. **Understand the Requirements**: Fully read and comprehend the issue before starting
2. **Plan Your Approach**: Create a minimal-change plan
3. **Make Incremental Changes**: Implement changes in small, focused commits
4. **Test Thoroughly**: Ensure all changes are tested and validated
5. **Document Updates**: Update documentation to reflect changes
6. **Security Review**: Verify no security vulnerabilities are introduced

## Testing Guidelines

- Write unit tests for all business logic
- Include integration tests for API endpoints
- Test edge cases and error handling
- Maintain high code coverage (aim for 80%+)
- Run all tests before submitting changes

## Documentation

- Keep README.md up-to-date with project setup instructions
- Document all public APIs and interfaces
- Include inline comments for complex algorithms
- Maintain a changelog for significant changes
- Create user guides for new features

## Business Domain Context

This platform serves enterprise customers with needs in:
- **Economic Analysis**: Tools for financial modeling and forecasting
- **Marketing Automation**: Campaign management and analytics
- **Business Development**: CRM and pipeline management
- **Banking Integration**: Secure financial transactions and data management

## Pull Request Guidelines

When creating or reviewing pull requests:
- Provide clear descriptions of changes
- Link related issues
- Ensure all CI/CD checks pass
- Request reviews from appropriate team members
- Address feedback promptly and professionally

## Questions and Support

If you encounter ambiguity or need clarification:
- Check existing documentation first
- Review similar implementations in the codebase
- Ask specific questions in issue comments
- Defer to the repository maintainers for architectural decisions

## Additional Resources

- [GitHub Copilot Best Practices](https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results)
- [Enterprise Development Guidelines](https://github.com/ELMOURABEA/Economic-Storm-platform)
