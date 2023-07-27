import { graphql } from "@octokit/graphql";

/**
 * @param {string} query 
 * @param {Object} variables 
 */
export async function GithubGraphQL(query, variables) {
    const data = await graphql(query, {
        ...variables,
        headers: {
            authorization: `token ${process.env.GITHUB_TOKEN}`
        }
    });

    return data;
}

/**
 * @param {string} repositoryAuthor 
 * @param {string} repositoryName 
 */
export async function GetSortedReleases(repositoryAuthor, repositoryName) {
    const data = await GithubGraphQL(`
        query($owner: String!, $repo: String!) {
            repository(owner: $owner, name: $repo) {
                    releases(last: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                    tagName,
                    publishedAt
                }
                }
            }
        }    
    `, {
        owner: repositoryAuthor,
        repo: repositoryName
    });

    return data;
}