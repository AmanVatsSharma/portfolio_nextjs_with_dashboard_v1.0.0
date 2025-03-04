import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'AmanVatsSharma';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
    headers: GITHUB_TOKEN ? {
        Authorization: `Bearer ${GITHUB_TOKEN}`
    } : {}
});

export interface GithubStats {
    totalContributions: number;
    repositoriesContributedTo: number;
    totalCommits: number;
    pullRequests: number;
    issuesClosed: number;
    lastActivity: Array<{
        type: string;
        repo: string;
        message: string;
        date: string;
    }>;
}

export const fetchGithubStats = async (): Promise<GithubStats> => {
    try {
        // Fetch user's events
        const eventsResponse = await githubApi.get(`/users/${GITHUB_USERNAME}/events`);
        const events = eventsResponse.data;

        // Process last activities
        const lastActivity = events.slice(0, 5).map(event => ({
            type: event.type,
            repo: event.repo.name,
            message: event.type === 'PushEvent' ? event.payload.commits?.[0]?.message : event.payload.description,
            date: event.created_at
        }));

        // Fetch user's repos
        const reposResponse = await githubApi.get(`/users/${GITHUB_USERNAME}/repos`);
        const repos = reposResponse.data;

        // Calculate total commits (approximate from available data)
        const totalCommits = events.filter(event => event.type === 'PushEvent').length;

        return {
            totalContributions: events.length,
            repositoriesContributedTo: repos.length,
            totalCommits,
            pullRequests: events.filter(event => event.type === 'PullRequestEvent').length,
            issuesClosed: events.filter(event => event.type === 'IssuesEvent' && event.payload.action === 'closed').length,
            lastActivity
        };
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return {
            totalContributions: 0,
            repositoriesContributedTo: 0,
            totalCommits: 0,
            pullRequests: 0,
            issuesClosed: 0,
            lastActivity: []
        };
    }
}; 