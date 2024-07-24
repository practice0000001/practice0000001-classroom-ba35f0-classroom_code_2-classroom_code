import express from "express";
import fileUpload from "express-fileupload";
import { Octokit } from "@octokit/rest";

const app = express();
const octokit = new Octokit({ auth: "your_github_token" });

app.use(fileUpload());

app.post("/upload", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  const content = file.data.toString("base64");
  const repoOwner = "practice0000001";
  const repoName = "classroom";
  const branchName = "main";
  const filePath = `uploads/${file.name}`;

  try {
    // Get the latest commit SHA
    const { data: refData } = await octokit.git.getRef({
      owner: repoOwner,
      repo: repoName,
      ref: `heads/${branchName}`,
    });
    const latestCommitSha = refData.object.sha;

    // Get the tree SHA
    const { data: commitData } = await octokit.git.getCommit({
      owner: repoOwner,
      repo: repoName,
      commit_sha: latestCommitSha,
    });
    const treeSha = commitData.tree.sha;

    // Create a new blob for the file
    const { data: blobData } = await octokit.git.createBlob({
      owner: repoOwner,
      repo: repoName,
      content: content,
      encoding: "base64",
    });
    const newBlobSha = blobData.sha;

    // Create a new tree with the new blob
    const { data: newTreeData } = await octokit.git.createTree({
      owner: repoOwner,
      repo: repoName,
      base_tree: treeSha,
      tree: [
        {
          path: filePath,
          mode: "100644",
          type: "blob",
          sha: newBlobSha,
        },
      ],
    });
    const newTreeSha = newTreeData.sha;

    // Create a new commit with the new tree
    const { data: newCommitData } = await octokit.git.createCommit({
      owner: repoOwner,
      repo: repoName,
      message: `Add ${file.name}`,
      tree: newTreeSha,
      parents: [latestCommitSha],
    });
    const newCommitSha = newCommitData.sha;

    // Update the reference to point to the new commit
    await octokit.git.updateRef({
      owner: repoOwner,
      repo: repoName,
      ref: `heads/${branchName}`,
      sha: newCommitSha,
    });

    // Create a pull request
    await octokit.pulls.create({
      owner: repoOwner,
      repo: repoName,
      title: `Add ${file.name}`,
      head: branchName,
      base: "main",
    });

    res.send("File uploaded and pull request created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file and creating pull request");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
