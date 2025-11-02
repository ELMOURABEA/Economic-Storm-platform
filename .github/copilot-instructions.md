# Copilot Instructions for Economic Storm Platform

## Project Overview

The **Economic Storm Platform** is a comprehensive enterprise solution designed for:
- 💼 **Economic Projects**: Project management and tracking
- 📊 **Marketing**: Campaign management and analytics  
- 🤝 **Business Development**: Strategic partnerships and growth
- 🗄️ **Data Bank**: All-in-One database system for enterprise data

This platform is in the **Foundation & Planning** phase, with GitHub Actions workflows and issue templates established, but the core technology stack is still to be determined.

## Repository Structure

```
Economic-Storm-platform/
├── .github/
│   ├── ISSUE_TEMPLATE/       # Issue templates for business, platform, and marketing tasks
│   └── workflows/             # CI/CD and automation workflows
├── COPILOT_GUIDE.md          # Copilot collaboration guide
├── CONTRIBUTING.md            # Contribution guidelines
├── PROJECT_STRUCTURE.md       # Planned project architecture
├── QUICK_START.md            # Getting started guide
├── README.md                 # Main documentation
├── SUMMARY.md                # Project summary
└── WORKFLOW.md               # Development workflow guidelines
```

## Current Project Status

### Completed
- ✅ Repository setup and configuration
- ✅ GitHub Actions workflows (CI/CD, Copilot Agent, Issue Management)
- ✅ Issue templates for structured task creation
- ✅ Comprehensive documentation

### Pending
- ⏳ Technology stack selection (Backend, Frontend, Database)
- ⏳ Architecture design and implementation
- ⏳ Core feature development
- ⏳ Testing framework setup

## Build and Testing

**Current State**: The repository is in planning phase with no code implementation yet.

### CI/CD Pipeline
The `.github/workflows/ci.yml` workflow:
- Validates project structure
- Checks for required documentation files
- Runs on pushes and PRs to `main` and `develop` branches

**To run CI locally**:
```bash
# Validate file structure
ls -la

# Check for required documentation
test -f README.md && echo "✅ README exists"
```

**Note**: There is currently no build process, test suite, or linter configured. When implementing features, ensure you:
1. Add appropriate testing frameworks
2. Configure linters for the chosen tech stack
3. Update CI/CD workflows accordingly

## Development Guidelines

### Creating Issues
Use the structured issue templates in `.github/ISSUE_TEMPLATE/`:
- **business-development.yml**: For business strategy, partnerships, and growth
- **platform-development.yml**: For technical implementation tasks
- **marketing.yml**: For marketing campaigns and content

Issues are automatically labeled by the Copilot Agent workflow based on keywords.

### Coding Conventions
Since the tech stack is not yet selected, follow these general principles:
- Write clear, readable, and self-documenting code
- Use meaningful names for variables, functions, and classes
- Keep functions small and focused on a single responsibility
- Add comments only for complex logic, not obvious code
- Remove debug code and commented-out code before committing

### Documentation Standards
- Update README.md for user-facing changes
- Update PROJECT_STRUCTURE.md when adding new directories or components
- Document all public APIs and interfaces
- Keep inline documentation current with code changes
- Add setup instructions for new dependencies

### Security Best Practices
- Never commit secrets, API keys, or credentials
- Validate all user inputs
- Use parameterized queries for database operations
- Implement proper authentication and authorization
- Keep dependencies updated and scan for vulnerabilities

## Workflows and Automation

### Available GitHub Actions Workflows

1. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
   - Triggers: Push, PR to main/develop
   - Purpose: Validate project structure and readiness

2. **Copilot Agent** (`.github/workflows/copilot-agent.yml`)
   - Triggers: New issues, issue comments
   - Purpose: Auto-label issues and provide task analysis

3. **Issue Management** (`.github/workflows/create-issues.yml`)
   - Triggers: Manual dispatch
   - Purpose: Batch create development tasks

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch for features
- Feature branches: `feature/description` or `copilot/description`

### Pull Request Process
1. Reference the related issue number (e.g., "Fixes #123")
2. Provide clear description of changes
3. Ensure CI/CD pipeline passes
4. Respond to review feedback promptly
5. Keep PRs focused and reasonably sized

## Technology Stack Guidance

When implementing the platform, consider:

### Backend Options
- **Node.js + Express**: Fast development, JavaScript ecosystem
- **Python + FastAPI**: Clean syntax, great for data processing
- **Go**: High performance, strong concurrency

### Frontend Options
- **React**: Component-based, large community
- **Vue.js**: Easy to learn, great documentation
- **Next.js**: React with SSR, built-in routing

### Database (All-in-One Data Bank)
- **PostgreSQL**: Robust, advanced features, complex queries
- **MongoDB**: Flexible schema, rapid development
- **MySQL**: Widely used, good performance

## Working with Copilot

### Best Use Cases
- ✅ Generating boilerplate code
- ✅ Writing documentation
- ✅ Creating test cases
- ✅ Refactoring suggestions
- ✅ Code explanations

### Review Carefully
- ⚠️ Security-critical code
- ⚠️ Complex business logic
- ⚠️ Database queries and migrations
- ⚠️ Production configurations
- ⚠️ Authentication/authorization code

### Collaboration Tips
1. **Be Specific**: Provide clear, detailed issue descriptions
2. **Iterate**: Use Copilot suggestions as starting points
3. **Review**: Always review and test generated code
4. **Context**: Include relevant context in comments
5. **Learn**: Understand patterns in Copilot's suggestions

## Task Assignment Guidelines

### Suitable for Copilot Agent
- Bug fixes in isolated components
- Adding new documentation
- Creating issue templates
- Writing tests for existing code
- Refactoring for code quality
- Setting up initial project structure

### Requires Human Expertise
- Selecting the technology stack
- Designing system architecture
- Making business-critical decisions
- Complex cross-component changes
- Security audit and implementation
- Production incident response

## File and Directory Conventions

### When Adding New Code
- Create appropriate directory structure as outlined in `PROJECT_STRUCTURE.md`
- Follow the planned structure: `src/backend/`, `src/frontend/`, `tests/`, etc.
- Add README files for new major components
- Update `.gitignore` for build artifacts and dependencies

### Documentation Files
- Keep all major documentation in the root directory
- Use `.md` (Markdown) format for documentation
- Link related documents to each other
- Update table of contents when adding new sections

## Common Commands (To Be Updated)

Once the tech stack is chosen, this section will include:
- Installation commands
- Build commands
- Test commands
- Linting commands
- Deployment commands

## Deployment Considerations

### Environments
- **Development**: Local development environment
- **Staging**: Pre-production testing
- **Production**: Live environment (future)

### When Implementing Deployment
- Use environment variables for configuration
- Implement health check endpoints
- Set up monitoring and logging
- Create rollback procedures
- Document deployment process

## Getting Help

### Resources
- [README.md](../README.md) - Project overview
- [COPILOT_GUIDE.md](../COPILOT_GUIDE.md) - Copilot collaboration details
- [WORKFLOW.md](../WORKFLOW.md) - Development workflow
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [PROJECT_STRUCTURE.md](../PROJECT_STRUCTURE.md) - Architecture and structure

### Support Channels
- Create an issue with the appropriate template
- Check existing issues and discussions
- Review documentation first
- Tag maintainers for urgent issues

## Important Notes

1. **Early Stage**: This project is in planning phase. Many implementation details are not yet finalized.

2. **Documentation First**: Before implementing features, ensure relevant documentation is created or updated.

3. **Issue-Driven Development**: All work should be tracked through GitHub issues using the provided templates.

4. **Minimal Changes**: Make small, focused changes that are easy to review and test.

5. **Communication**: Keep issues updated with progress and blockers.

---

**Remember**: The Economic Storm Platform is designed to be AI-friendly. Use clear documentation, structured issues, and incremental development to maximize Copilot's effectiveness in assisting with development! 🚀
