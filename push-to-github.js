import { Octokit } from '@octokit/rest';
import fs from 'fs';

// Replace with your GitHub token and details
const GITHUB_TOKEN = 'your_personal_access_token';
const REPO_NAME = 'your-repo-name';
const USERNAME = 'your-username';

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function createAndPushRepo() {
  try {
    // Create private repository
    await octokit.rest.repos.createForAuthenticatedUser({
      name: REPO_NAME,
      private: true
    });

    // Get all files
    const files = [
      'index.html',
      'style.css',
      'script.js',
      'package.json',
      'package-lock.json'
    ];

    // Create initial commit
    for (const file of files) {
      const content = fs.readFileSync(file, 'base64');
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: USERNAME,
        repo: REPO_NAME,
        path: file,
        message: `Add ${file}`,
        content: content,
        branch: 'main'
      });
    }

    console.log('Repository created and files pushed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

createAndPushRepo();
