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
 * @param {number} [quantity] - How many releases will be returned.
 */
export async function GetSortedReleases(repositoryAuthor, repositoryName, quantity = 100) {
    const data = await GithubGraphQL(`
        query($owner: String!, $repo: String!, $quantity: Int!) {
            repository(owner: $owner, name: $repo) {
                    releases(last: $quantity, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                    tagName,
                    publishedAt
                }
                }
            }
        }    
    `, {
        owner: repositoryAuthor,
        repo: repositoryName,
        quantity
    });

    return data;
}