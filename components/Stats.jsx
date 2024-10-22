"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";

// const GitHubAllCommits = () => {
//    const [commitCount, setCommitCount] = useState(null);
//    const username = "alitkovsky"; // Your GitHub username
//    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // Your personal access token

//    useEffect(() => {
//      const fetchCommitCounts = async () => {
//        try {
//          const headers = {
//            Authorization: `token ${token}`, // GitHub token for authentication
//          };

//          // 1. Fetch all repositories for the user
//          const reposResponse = await axios.get(
//            `https://api.github.com/users/${username}/repos?per_page=100`,
//            { headers }
//          );
//          const repositories = reposResponse.data;

//          let totalCommits = 0;

//          // 2. Loop through each repository and fetch the commits
//          const commitPromises = repositories.map(async (repo) => {
//            const commitResponse = await axios.get(
//              `https://api.github.com/repos/${username}/${repo.name}/commits`,
//              { headers }
//            );
//            // Add the number of commits in this repo to the total count
//            return commitResponse.data.length;
//          });
 
//          const commitCounts = await Promise.all(commitPromises);
//          totalCommits = commitCounts.reduce((sum, count) => sum + count, 0);

//          setCommitCount(totalCommits);
//        } catch (error) {
//          console.error("Error fetching commit data:", error);
//        }
//      };

//      fetchCommitCounts();
//    }, [username, token]);

//    return (
//      <>
//        {commitCount !== null ? (
//          <span>{commitCount}</span>
//        ) : (
//          <span></span>
//        )}
//      </>
//    );
//  };

const stats = [
   {
      num: 5,
      text: "Projects completed",
   },
   {
      num: 5,
      text: "Technologies mastered",
   },
];

const Stats = () => {
   const [commitCount, setCommitCount] = useState(null);
   const username = "alitkovsky"; // Your GitHub username
   const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // Your personal access token

   useEffect(() => {
     const fetchCommitCounts = async () => {
       try {
         const headers = {
           Authorization: `token ${token}`, // GitHub token for authentication
         };

         // 1. Fetch all repositories for the user
         const reposResponse = await axios.get(
           `https://api.github.com/users/${username}/repos?per_page=100`,
           { headers }
         );
         const repositories = reposResponse.data;

         let totalCommits = 0;

         // 2. Loop through each repository and fetch the commits
         const commitPromises = repositories.map(async (repo) => {
           const commitResponse = await axios.get(
             `https://api.github.com/repos/${username}/${repo.name}/commits`,
             { headers }
           );
           // Add the number of commits in this repo to the total count
           return commitResponse.data.length;
         });

         const commitCounts = await Promise.all(commitPromises);
         totalCommits = commitCounts.reduce((sum, count) => sum + count, 0);

         setCommitCount(totalCommits);
       } catch (error) {
         console.error("Error fetching commit data:", error);
       }
     };

     fetchCommitCounts();
   }, [username, token]);

   const [experience, setExperience] = useState("");

   useEffect(() => {
      const calculateExperience = () => {
        const startDate = new Date("2023-10-01");
        const currentDate = new Date();

        // Calculate the difference in months and years
        const diffInMonths =
          (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
          currentDate.getMonth() -
          startDate.getMonth();

        // Determine the experience text
        if (diffInMonths < 12) {
          setExperience(`${diffInMonths}`);
        } else {
          const years = Math.floor(diffInMonths / 12);
          setExperience(`${years}`);
        }
      };

      calculateExperience();
    }, []);

  return (
   <section className="pt-12 pb-12 xl:pt-4 xl:pb-0">
      <div className="container mx-auto">
         <div className="flex flex-wrap gap-6 max-w-auto mx-auto">
         <div
               className="flex flex-1 gap-4 items-center justify-start"
            ><CountUp
            end={experience}
            delay={2}
            duration={6}
            className="text-4xl xl:text-6xl font-extrabold"
         />
               <p
                  className="max-w-[100px] leading-snug text-white/80"
               >
                  Year of experience
               </p>
            </div>
            {stats.map((item, index) => {
               return (
                  <div
                     key={index}
                     className="flex flex-1 gap-4 items-center justify-start"
                  >
                     <CountUp
                        end={item.num}
                        delay={2}
                        duration={6}
                        className="text-4xl xl:text-6xl font-extrabold"
                     />
                     <p className="max-w-[100px] leading-snug text-white/80">{item.text}</p>
                  </div>
               )
            })}
            <div
               className="flex flex-1 gap-4 items-center justify-start"
            >
               <CountUp
                  end={commitCount}
                  delay={2}
                  duration={6}
                  className="text-4xl xl:text-6xl font-extrabold"
               />
               <p className="max-w-[100px] leading-snug text-white/80">
                  Commits on GitHub
               </p>
            </div>
         </div>
      </div>
   </section>
  )
};

export default Stats;