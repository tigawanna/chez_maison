const fs = require('fs');
const path = require('path');

// remeber to install colors package
// npm -D i colors
// require("colors");
// import fs from 'fs';
// import path from 'path';

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please specify a component name.');
  process.exit(1);
}


//  generate directory path for new page in /src/page/componentName
// const pageDirectoryPath = path.join(__dirname, 'src', 'pages', componentName);
const pageDirectoryPath = `./src/pages/${componentName.toLocaleLowerCase()}`;

// check if path already exists
if (fs.existsSync(pageDirectoryPath)) {
  console.error(
    `Page ${pageDirectoryPath} already exists.`.red
  );
  process.exit(1);
}

fs.mkdirSync(pageDirectoryPath);

const componentLayoutContent = `
import { Outlet } from "react-router-dom";
interface ${componentName}LayoutProps {

}

export default function ${componentName}Layout({}:${componentName}LayoutProps){
  return (
    <div className='w-full h-full'>
      <Outlet/>
    </div>
  );
};


`;

const componentContent = `

interface ${componentName}Props {

}

export default function ${componentName}({}:${componentName}Props){
  return (
    <div className='w-full h-full min-h-screen  flex items-center justify-center'>
      ${componentName} component
    </div>
  );
};


`;

fs.writeFileSync(`${pageDirectoryPath}/${componentName}Layout.tsx`,componentLayoutContent);
fs.writeFileSync(`${pageDirectoryPath}/${componentName}.tsx`, componentContent);

console.log(`Created directory: ${pageDirectoryPath}`);
console.log(`Created component file: ${componentName}Layout.tsx`, `${componentName}.tsx`);
