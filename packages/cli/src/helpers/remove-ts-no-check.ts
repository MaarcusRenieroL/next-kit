import fs from "fs";
import path from "path";

function removeTsNoCheckInFiles(directoryPath: string): void {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      removeTsNoCheckInFiles(filePath); // Recursively handle subdirectories
    } else {
      const data = fs.readFileSync(filePath, "utf8");
      // Remove "// @ts-nocheck" line using regex
      const updatedData = data.replace(/\/\/\s*@ts-nocheck\s*\n?/g, "");
      fs.writeFileSync(filePath, updatedData, "utf8");
    }
  });
}

export const removeTsNoCheck = (projectDir: string) => {
  removeTsNoCheckInFiles(projectDir);
};

export function removeTsNoCheckCommentFromContent(content: string): string {
  // Remove the @ts-nocheck comment if it exists
  const updatedContent = content.replace(/\/\/\s?@ts-nocheck\s?/g, "");
  return updatedContent;
}
