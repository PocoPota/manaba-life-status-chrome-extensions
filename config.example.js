// GitHub API Configuration
// Copy this file to config.js and fill in your actual values

const CONFIG = {
  // Your GitHub Personal Access Token (repo scope required)
  // Create at: https://github.com/settings/tokens
  GITHUB_TOKEN: 'your_personal_access_token_here',

  // Your GitHub username
  GITHUB_USERNAME: 'your_github_username',

  // Your repository name
  GITHUB_REPO: 'your_repo_name',

  // Workflow file name
  WORKFLOW_FILE: 'update-status.yml',

  // Default branch
  BRANCH: 'main',

  // API endpoint for workflow dispatch
  get API_URL() {
    return `https://api.github.com/repos/${this.GITHUB_USERNAME}/${this.GITHUB_REPO}/actions/workflows/${this.WORKFLOW_FILE}/dispatches`;
  }
};
