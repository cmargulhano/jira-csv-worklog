import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    jiraBaseUrl: process.env.JIRA_BASE_URL,
    jiraUsername: process.env.JIRA_USER_NAME,
    jiraToken: process.env.JIRA_TOKEN,
};