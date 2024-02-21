const [path, ...options] = Bun.argv.slice(2);

const filename = path.split('/').pop().replace(/\.(js|ts)$/, "");

const build = await Bun.build({
    entrypoints: [
        path.includes("src/") ? path :
            "src/" + filename + ".js"
    ],
    outdir: './dist',
    minify: options.includes("--minify"),
});

if (!build.success) {
    console.error(filename, "build failed.\n", error);
    process.exit(1);
}

console.log(
    "\njs successfully built at:",
    "\n  ./dist/" + filename + ".js"
);

if (!options.includes("--html"))
    process.exit(0);

await Bun.write(`./dist/${filename}.html`, `\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename.replace(/(\.|-|_)/g, " ")}</title>
</head>
<body><script src="${filename}.js"></script></body>
</html>
`);

console.log(
    "\nhtml successfully built at:",
    "\n  ./dist/" + filename + ".html"
);
