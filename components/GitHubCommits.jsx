import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

const GitHubCommits = () => {
  const [commitCount, setCommitCount] = useState(null);
  const username = "alitkovsky"; // Your GitHub username
  const repo = ""; // Your repository name
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // Optional

  useEffect(() => {
    const fetchCommitCount = async () => {
      const endpoint = "https://api.github.com/graphql";

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const query = gql`
        {
          repository(owner: "${username}", name: "${repo}") {
            object(expression: "main") {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
        }
      `;

      try {
        const data = await request(endpoint, query, null, headers);
        const commitCount = data.repository.object.history.totalCount;
        setCommitCount(commitCount);
      } catch (error) {
        console.error("Error fetching commit data:", error);
      }
    };

    fetchCommitCount();
  }, [username, repo, token]);

  return (
    <div>
      {commitCount !== null ? (
        <p>Total Commits: {commitCount}</p>
      ) : (
        <p>Loading commit data...</p>
      )}
    </div>
  );
};

export default GitHubCommits;