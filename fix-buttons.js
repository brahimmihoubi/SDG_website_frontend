import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl, rounded with rounded-[10px]
  // specifically inside button tags
  content = content.replace(/<button([^>]*)className=(["']{1,2}|`)(.*?)(["']{1,2}|`)([^>]*)>/g, (match, before, quote1, classes, quote2, after) => {
    let newClasses = classes.replace(/\brounded-(?:sm|md|lg|xl|2xl|3xl|full)\b/g, '').replace(/\brounded\b/g, '');
    newClasses = newClasses.replace(/\s+/g, ' ').trim() + ' rounded-[10px]';
    return `<button${before}className=${quote1}${newClasses}${quote2}${after}>`;
  });

  // Specifically inside a and Link tags that look like buttons (have px- and py- and bg-)
  content = content.replace(/<(a|Link)([^>]*)className=(["']{1,2}|`)(.*?)(["']{1,2}|`)([^>]*)>/g, (match, tag, before, quote1, classes, quote2, after) => {
    if (classes.includes('px-') && classes.includes('py-') && classes.includes('bg-')) {
      let newClasses = classes.replace(/\brounded-(?:sm|md|lg|xl|2xl|3xl|full)\b/g, '').replace(/\brounded\b/g, '');
      newClasses = newClasses.replace(/\s+/g, ' ').trim() + ' rounded-[10px]';
      return `<${tag}${before}className=${quote1}${newClasses}${quote2}${after}>`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
