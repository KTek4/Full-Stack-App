const fs = require('fs');
const path = require('path');

function replaceAssertWith(directory) {
    // Read all files and subdirectories in the given directory
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // If it's a directory, recursively process it
            replaceAssertWith(fullPath);
        } else if (file.endsWith('.ts')) {
            // If it's a TypeScript file, process it
            let content = fs.readFileSync(fullPath, 'utf8');
            const updatedContent = content.replace(/\bassert\b/g, 'with');
            
            if (content !== updatedContent) {
                fs.writeFileSync(fullPath, updatedContent, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
}

// Replace "your-project-directory" with the directory path containing your TypeScript files
const projectDirectory = path.resolve(
    'C:/Users/krana/Desktop/UofM-VIRT-FSF-PT-08-2024-U-LOLC/18-MERN-and-Authentication'
  );
replaceAssertWith(projectDirectory);